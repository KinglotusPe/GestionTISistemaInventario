import { initialData } from './mockData.js';

export const API_BASE_URL = 'http://localhost:8080/api';
const STORAGE_KEY = 'jireh_sistema_data_v1';

// Inicializar estado local si no existe
function getLocalStore() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveLocalStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let isBackendOnline = false;

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    isBackendOnline = res.ok;
  } catch {
    isBackendOnline = false;
  }
  return isBackendOnline;
}

export function isOnlineMode() {
  return isBackendOnline;
}

// ==================== PRODUCTOS ====================
export async function getProductos() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/productos`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo fetch a backend, usando datos locales:", e);
    }
  }
  return getLocalStore().productos;
}

export async function guardarProducto(producto) {
  const store = getLocalStore();
  if (!producto.id) {
    producto.id = Date.now();
    producto.codigo = producto.codigo || `PROD-${String(store.productos.length + 1).padStart(3, '0')}`;
    producto.stockActual = Number(producto.stockActual) || 0;
    producto.stockMinimo = Number(producto.stockMinimo) || 5;
    producto.stockMaximo = Number(producto.stockMaximo) || 100;
    producto.precioCompra = Number(producto.precioCompra) || 0;
    producto.precioVenta = Number(producto.precioVenta) || 0;
    producto.estado = true;
    store.productos.unshift(producto);

    // Registrar movimiento inicial de stock
    if (producto.stockActual > 0) {
      store.movimientos.unshift({
        id: Date.now() + 1,
        tipoMovimiento: "ENTRADA",
        cantidad: producto.stockActual,
        stockAnterior: 0,
        stockPosterior: producto.stockActual,
        motivo: "Inventario inicial por alta de producto",
        fecha: new Date().toISOString(),
        productoId: producto.id,
        usuarioId: 1
      });
    }
  } else {
    const index = store.productos.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      store.productos[index] = { ...store.productos[index], ...producto };
    }
  }
  saveLocalStore(store);
  return producto;
}

export async function eliminarProducto(id) {
  const store = getLocalStore();
  store.productos = store.productos.filter(p => p.id !== id);
  saveLocalStore(store);
  return true;
}

// ==================== CLIENTES ====================
export async function getClientes() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/clientes`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo fetch a clientes:", e);
    }
  }
  return getLocalStore().clientes;
}

export async function guardarCliente(cliente) {
  const store = getLocalStore();
  if (!cliente.id) {
    cliente.id = Date.now();
    store.clientes.unshift(cliente);
  } else {
    const idx = store.clientes.findIndex(c => c.id === cliente.id);
    if (idx !== -1) store.clientes[idx] = { ...store.clientes[idx], ...cliente };
  }
  saveLocalStore(store);
  return cliente;
}

// ==================== VENTAS ====================
export async function getVentas() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ventas`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo fetch a ventas:", e);
    }
  }
  return getLocalStore().ventas;
}

export async function registrarVenta(ventaData) {
  const store = getLocalStore();
  const ventaId = Date.now();
  const numVenta = `VNT-${String(store.ventas.length + 101).padStart(6, '0')}`;

  const nuevaVenta = {
    id: ventaId,
    numero: numVenta,
    fecha: new Date().toISOString(),
    clienteId: ventaData.clienteId,
    usuarioId: 1,
    metodoPagoId: ventaData.metodoPagoId,
    subtotal: ventaData.subtotal,
    igv: ventaData.igv,
    total: ventaData.total,
    estado: "COMPLETADA",
    detalles: ventaData.detalles
  };

  // Descontar inventario y registrar movimientos
  ventaData.detalles.forEach(item => {
    const prod = store.productos.find(p => p.id === item.productoId);
    if (prod) {
      const anterior = prod.stockActual;
      prod.stockActual = Math.max(0, prod.stockActual - item.cantidad);
      store.movimientos.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        tipoMovimiento: "SALIDA",
        cantidad: item.cantidad,
        stockAnterior: anterior,
        stockPosterior: prod.stockActual,
        motivo: `Venta ${numVenta}`,
        fecha: new Date().toISOString(),
        productoId: prod.id,
        usuarioId: 1
      });
    }
  });

  store.ventas.unshift(nuevaVenta);
  saveLocalStore(store);
  return nuevaVenta;
}

// ==================== MOVIMIENTOS & CATALOGOS ====================
export async function getMovimientos() {
  return getLocalStore().movimientos;
}

export function getCategorias() {
  return getLocalStore().categorias;
}

export function getMarcas() {
  return getLocalStore().marcas;
}

export function getUnidadesMedida() {
  return getLocalStore().unidadesMedida;
}

export function getMetodosPago() {
  return getLocalStore().metodosPago;
}

export function resetMockData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
}
