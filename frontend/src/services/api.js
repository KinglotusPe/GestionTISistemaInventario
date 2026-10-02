import { initialData } from './mockData.js';

export const API_BASE_URL = 'http://localhost:8080/api';
const STORAGE_KEY = 'jireh_sistema_data_v2';
const AUTH_KEY = 'jireh_auth_user';

// ==================== STORAGE LOCAL ====================
export function getLocalStore() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }
}

export function saveLocalStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetMockData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return JSON.parse(JSON.stringify(initialData));
}

// ==================== ESTADO BACKEND & AUTH ====================
let isBackendOnline = false;

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE_URL}/dashboard/resumen`, {
      signal: controller.signal,
      headers: getAuthHeaders()
    });
    clearTimeout(timeoutId);
    isBackendOnline = res.ok || res.status === 403 || res.status === 401;
  } catch {
    isBackendOnline = false;
  }
  return isBackendOnline;
}

export function isOnlineMode() {
  return isBackendOnline;
}

export function getCurrentUser() {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) {
    // Default demo user: SuperAdmin
    const defaultUser = {
      id: 1,
      usuario: "admin",
      nombres: "Administrador General",
      apellidos: "Jireh",
      correo: "admin@jireh.com",
      rolId: 1,
      rolNombre: "SUPER_ADMIN",
      rol: "SUPER_ADMIN",
      permisos: ["*"]
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(AUTH_KEY);
  } else {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }
}

export function getAuthHeaders() {
  const user = getCurrentUser();
  const headers = { 'Content-Type': 'application/json' };
  if (user) {
    headers['X-User-Role'] = user.rolNombre || user.rol || 'SUPER_ADMIN';
    if (user.permisos && Array.isArray(user.permisos)) {
      headers['X-User-Permissions'] = user.permisos.join(',');
    }
  }
  return headers;
}

export async function login(usuario, contrasena) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
        return data;
      }
    } catch (e) {
      console.warn("Fallo login online, verificando offline:", e);
    }
  }

  // Fallback Offline
  const store = getLocalStore();
  const usr = store.usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase() && u.contrasena === contrasena);
  if (!usr) {
    throw new Error("Credenciales inválidas");
  }
  if (!usr.estado) {
    throw new Error("El usuario se encuentra inactivo. Contacte al Administrador.");
  }
  const rol = store.roles.find(r => r.id === usr.rolId);
  const permisos = rol ? (rol.permisoCodigos || []) : [];

  const loginResponse = {
    id: usr.id,
    usuario: usr.usuario,
    nombres: usr.nombres,
    apellidos: usr.apellidos,
    correo: usr.correo,
    rolId: usr.rolId,
    rolNombre: rol ? rol.nombre : "USUARIO",
    rol: rol ? rol.nombre : "USUARIO",
    permisos: permisos
  };
  setCurrentUser(loginResponse);

  // Registrar auditoria offline
  registrarAuditoriaLocal("SEGURIDAD", "LOGIN", `Inicio de sesión usuario: ${usr.usuario}`);
  return loginResponse;
}

export function logout() {
  const usr = getCurrentUser();
  if (usr) {
    registrarAuditoriaLocal("SEGURIDAD", "LOGOUT", `Cierre de sesión: ${usr.usuario}`);
  }
  localStorage.removeItem(AUTH_KEY);
}

// ==================== DASHBOARD ====================
export async function getDashboardResumen() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/resumen`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Dashboard online error:", e);
    }
  }

  // Calculo real en memoria (Offline)
  const store = getLocalStore();
  const hoyStr = new Date().toISOString().split('T')[0];

  const ventasHoy = store.ventas.filter(v => v.fecha && v.fecha.startsWith(hoyStr) && v.estado === 'COMPLETADA');
  const totalVentasHoy = ventasHoy.reduce((sum, v) => sum + (v.total || 0), 0);

  const totalVentasMes = store.ventas.filter(v => v.estado === 'COMPLETADA').reduce((sum, v) => sum + (v.total || 0), 0);
  const totalComprasMes = store.compras.reduce((sum, c) => sum + (c.total || 0), 0);

  // Utilidad estimada = Ventas Mes - Costo Estimado
  const costoMercaderiaVendida = totalVentasMes * 0.72; // promedio descartables
  const utilidadEstimada = totalVentasMes - costoMercaderiaVendida;

  const totalProductos = store.productos.length;
  const productosStockBajo = store.productos.filter(p => p.stockActual <= p.stockMinimo && p.stockActual > 0).length;
  const productosAgotados = store.productos.filter(p => p.stockActual <= 0).length;

  const totalClientes = store.clientes.length;
  const totalProveedores = store.proveedores.length;

  const totalCuentasCobrar = store.cuentasCobrar.filter(c => c.estado !== 'PAGADA').reduce((sum, c) => sum + (c.saldoPendiente || 0), 0);
  const totalCuentasPagar = store.cuentasPagar.filter(c => c.estado !== 'PAGADA').reduce((sum, c) => sum + (c.saldoPendiente || 0), 0);

  const totalInventarioValorizado = store.productos.reduce((sum, p) => sum + (p.stockActual * p.precioCompra), 0);

  return {
    totalVentasHoy,
    totalVentasMes,
    utilidadEstimada,
    totalComprasMes,
    totalProductos,
    productosStockBajo,
    productosAgotados,
    totalClientes,
    totalProveedores,
    totalCuentasCobrar,
    totalCuentasPagar,
    totalInventarioValorizado,
    porcentajeEfectivo: 45.0,
    porcentajeDigital: 40.0,
    porcentajeOtros: 15.0
  };
}

// ==================== PRODUCTOS & PRESENTACIONES ====================
export async function getProductos() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/productos`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getProductos online:", e);
    }
  }
  return getLocalStore().productos;
}

export async function guardarProducto(producto) {
  if (isBackendOnline) {
    try {
      const method = producto.id ? 'PUT' : 'POST';
      const url = producto.id ? `${API_BASE_URL}/productos/${producto.id}` : `${API_BASE_URL}/productos`;
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(producto)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarProducto online:", e);
    }
  }

  const store = getLocalStore();
  const cat = store.categorias.find(c => c.id === Number(producto.categoriaId));
  const mar = store.marcas.find(m => m.id === Number(producto.marcaId));
  const und = store.unidadesMedida.find(u => u.id === Number(producto.unidadMedidaId));

  producto.categoriaNombre = cat ? cat.nombre : "";
  producto.marcaNombre = mar ? mar.nombre : "";
  producto.unidadMedidaNombre = und ? und.nombre : "";
  producto.precioCompra = Number(producto.precioCompra) || 0;
  producto.precioVenta = Number(producto.precioVenta) || 0;
  producto.stockActual = Number(producto.stockActual) || 0;
  producto.stockMinimo = Number(producto.stockMinimo) || 5;
  producto.stockMaximo = Number(producto.stockMaximo) || 100;
  producto.estado = producto.estado !== undefined ? producto.estado : true;

  if (!producto.id) {
    producto.id = Date.now();
    producto.codigo = producto.codigo || `PLAS-${String(store.productos.length + 1).padStart(3, '0')}`;
    if (!producto.presentaciones || producto.presentaciones.length === 0) {
      producto.presentaciones = [
        {
          id: Date.now() + 1,
          nombrePresentacion: und ? und.nombre : "Unidad Base",
          factorEquivalencia: 1.0,
          precioCosto: producto.precioCompra,
          precioVenta: producto.precioVenta,
          precioMayorista: producto.precioVenta * 0.9,
          codigoBarras: producto.codigoBarras || `775${Date.now().toString().slice(-9)}`,
          esDefault: true
        }
      ];
    }
    store.productos.unshift(producto);

    if (producto.stockActual > 0) {
      store.movimientos.unshift({
        id: Date.now() + 2,
        tipoMovimiento: "ENTRADA",
        cantidad: producto.stockActual,
        stockAnterior: 0,
        stockPosterior: producto.stockActual,
        motivo: "Inventario inicial - Creación de producto",
        fecha: new Date().toISOString(),
        productoId: producto.id,
        productoNombre: producto.nombre,
        usuarioId: getCurrentUser() ? getCurrentUser().id : 1
      });
    }
    registrarAuditoriaLocal("PRODUCTOS", "CREAR", `Creó producto: ${producto.nombre}`);
  } else {
    const idx = store.productos.findIndex(p => p.id === producto.id);
    if (idx !== -1) {
      store.productos[idx] = { ...store.productos[idx], ...producto };
      registrarAuditoriaLocal("PRODUCTOS", "EDITAR", `Actualizó producto: ${producto.nombre}`);
    }
  }
  saveLocalStore(store);
  return producto;
}

export async function eliminarProducto(id) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn("Fallo eliminarProducto online:", e);
    }
  }

  const store = getLocalStore();
  const prod = store.productos.find(p => p.id === id);
  if (prod) {
    prod.estado = false; // Baja lógica requerida en Plastiquería
    registrarAuditoriaLocal("PRODUCTOS", "DESACTIVAR", `Desactivó producto: ${prod.nombre}`);
  }
  saveLocalStore(store);
  return true;
}

export async function guardarPresentacion(productoId, presentacion) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/productos/${productoId}/presentaciones`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(presentacion)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarPresentacion online:", e);
    }
  }

  const store = getLocalStore();
  const prod = store.productos.find(p => p.id === productoId);
  if (prod) {
    if (!prod.presentaciones) prod.presentaciones = [];
    if (!presentacion.id) {
      presentacion.id = Date.now();
      prod.presentaciones.push(presentacion);
    } else {
      const pIdx = prod.presentaciones.findIndex(pr => pr.id === presentacion.id);
      if (pIdx !== -1) prod.presentaciones[pIdx] = presentacion;
      else prod.presentaciones.push(presentacion);
    }
    saveLocalStore(store);
  }
  return presentacion;
}

// ==================== CATALOGOS ====================
export function getCategorias() {
  return getLocalStore().categorias;
}

export function guardarCategoria(cat) {
  const store = getLocalStore();
  if (!cat.id) {
    cat.id = Date.now();
    cat.estado = true;
    store.categorias.push(cat);
  } else {
    const idx = store.categorias.findIndex(c => c.id === cat.id);
    if (idx !== -1) store.categorias[idx] = { ...store.categorias[idx], ...cat };
  }
  saveLocalStore(store);
  return cat;
}

export function getMarcas() {
  return getLocalStore().marcas;
}

export function guardarMarca(marca) {
  const store = getLocalStore();
  if (!marca.id) {
    marca.id = Date.now();
    marca.estado = true;
    store.marcas.push(marca);
  } else {
    const idx = store.marcas.findIndex(m => m.id === marca.id);
    if (idx !== -1) store.marcas[idx] = { ...store.marcas[idx], ...marca };
  }
  saveLocalStore(store);
  return marca;
}

export function getUnidadesMedida() {
  return getLocalStore().unidadesMedida;
}

export function getMetodosPago() {
  return getLocalStore().metodosPago;
}

// ==================== CLIENTES ====================
export async function getClientes() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/clientes`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getClientes online:", e);
    }
  }
  return getLocalStore().clientes;
}

export async function guardarCliente(cliente) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/clientes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cliente)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarCliente online:", e);
    }
  }

  const store = getLocalStore();
  if (!cliente.id) {
    cliente.id = Date.now();
    store.clientes.unshift(cliente);
    registrarAuditoriaLocal("CLIENTES", "CREAR", `Registró cliente: ${cliente.nombres || cliente.razonSocial}`);
  } else {
    const idx = store.clientes.findIndex(c => c.id === cliente.id);
    if (idx !== -1) store.clientes[idx] = { ...store.clientes[idx], ...cliente };
    registrarAuditoriaLocal("CLIENTES", "EDITAR", `Modificó cliente: ${cliente.nombres || cliente.razonSocial}`);
  }
  saveLocalStore(store);
  return cliente;
}

// ==================== PROVEEDORES ====================
export async function getProveedores() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras/proveedores`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getProveedores online:", e);
    }
  }
  return getLocalStore().proveedores;
}

export async function guardarProveedor(proveedor) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras/proveedores`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(proveedor)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarProveedor online:", e);
    }
  }

  const store = getLocalStore();
  if (!proveedor.id) {
    proveedor.id = Date.now();
    proveedor.estado = true;
    store.proveedores.unshift(proveedor);
    registrarAuditoriaLocal("PROVEEDORES", "CREAR", `Registró proveedor: ${proveedor.razonSocial}`);
  } else {
    const idx = store.proveedores.findIndex(p => p.id === proveedor.id);
    if (idx !== -1) store.proveedores[idx] = { ...store.proveedores[idx], ...proveedor };
    registrarAuditoriaLocal("PROVEEDORES", "EDITAR", `Modificó proveedor: ${proveedor.razonSocial}`);
  }
  saveLocalStore(store);
  return proveedor;
}

// ==================== VENTAS & POS ====================
export async function getVentas() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ventas`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getVentas online:", e);
    }
  }
  return getLocalStore().ventas;
}

export async function registrarVenta(ventaData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ventas`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ventaData)
      });
      if (res.ok) return await res.json();
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Error al procesar venta en servidor");
    } catch (e) {
      console.warn("Fallo registrarVenta online, intentando offline:", e);
      if (e.message && e.message.includes("servidor")) throw e;
    }
  }

  // Verificación de stock y registro Offline
  const store = getLocalStore();
  const ventaId = Date.now();
  const numVenta = `VNT-${String(store.ventas.length + 101).padStart(6, '0')}`;
  const currentUser = getCurrentUser();

  // Validar stock de cada detalle
  for (const item of ventaData.detalles) {
    const prod = store.productos.find(p => p.id === item.productoId);
    if (!prod) throw new Error(`Producto con ID ${item.productoId} no encontrado`);
    const factor = item.factorEquivalencia || 1.0;
    const baseQty = item.cantidad * factor;
    if (prod.stockActual < baseQty) {
      throw new Error(`Stock insuficiente para '${prod.nombre}'. Disponible: ${prod.stockActual}, requerido: ${baseQty}`);
    }
  }

  // Descontar inventario y generar movimientos de Kardex
  for (const item of ventaData.detalles) {
    const prod = store.productos.find(p => p.id === item.productoId);
    const factor = item.factorEquivalencia || 1.0;
    const baseQty = item.cantidad * factor;
    const stockAnterior = prod.stockActual;
    prod.stockActual = Math.round((prod.stockActual - baseQty) * 100) / 100;

    store.movimientos.unshift({
      id: Date.now() + Math.floor(Math.random() * 1000),
      tipoMovimiento: "SALIDA",
      cantidad: baseQty,
      stockAnterior: stockAnterior,
      stockPosterior: prod.stockActual,
      motivo: `Venta POS ${numVenta} (${item.presentacionNombre || 'Unidad'})`,
      fecha: new Date().toISOString(),
      productoId: prod.id,
      productoNombre: prod.nombre,
      usuarioId: currentUser ? currentUser.id : 1
    });
  }

  // Impacto en Caja Activa si está abierta
  if (store.cajaActiva && store.cajaActiva.estado === 'ABIERTA') {
    const esEfectivo = Number(ventaData.metodoPagoId) === 1;
    if (esEfectivo) {
      store.cajaActiva.totalVentasEfectivo += ventaData.total;
      store.cajaActiva.montoEsperado += ventaData.total;
    } else {
      store.cajaActiva.totalVentasDigital += ventaData.total;
    }
    store.cajaActiva.totalIngresos += ventaData.total;
    if (!store.cajaActiva.movimientos) store.cajaActiva.movimientos = [];
    store.cajaActiva.movimientos.push({
      id: Date.now() + 1,
      tipo: "VENTA",
      concepto: `Venta ${numVenta} (${esEfectivo ? 'Efectivo' : 'Digital'})`,
      monto: ventaData.total,
      fecha: new Date().toISOString()
    });
  }

  // Si fue venta a Crédito, crear Cuenta por Cobrar
  if (ventaData.metodoPagoId === 5 || ventaData.esCredito) {
    store.cuentasCobrar.unshift({
      id: Date.now() + 5,
      ventaId: ventaId,
      ventaNumero: numVenta,
      clienteId: ventaData.clienteId,
      clienteNombre: ventaData.clienteNombre || "Cliente Crédito",
      montoTotal: ventaData.total,
      montoPagado: 0.00,
      saldoPendiente: ventaData.total,
      fechaEmision: new Date().toISOString(),
      fechaVencimiento: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
      estado: "PENDIENTE"
    });
  }

  const cliente = store.clientes.find(c => c.id === Number(ventaData.clienteId));
  const metodo = store.metodosPago.find(m => m.id === Number(ventaData.metodoPagoId));

  const nuevaVenta = {
    id: ventaId,
    numero: numVenta,
    fecha: new Date().toISOString(),
    clienteId: ventaData.clienteId,
    clienteNombre: cliente ? (cliente.razonSocial || `${cliente.nombres} ${cliente.apellidos}`.trim()) : "Consumidor Final",
    usuarioId: currentUser ? currentUser.id : 1,
    metodoPagoId: ventaData.metodoPagoId,
    metodoPagoNombre: metodo ? metodo.nombre : "Efectivo",
    subtotal: ventaData.subtotal,
    igv: ventaData.igv,
    total: ventaData.total,
    montoRecibido: ventaData.montoRecibido || ventaData.total,
    vuelto: ventaData.vuelto || 0.00,
    estado: "COMPLETADA",
    detalles: ventaData.detalles
  };

  store.ventas.unshift(nuevaVenta);
  registrarAuditoriaLocal("VENTAS", "REGISTRAR_VENTA", `Venta ${numVenta} por S/ ${ventaData.total.toFixed(2)}`);
  saveLocalStore(store);
  return nuevaVenta;
}

export async function anularVenta(id, motivo) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/ventas/${id}/anular?motivo=${encodeURIComponent(motivo || 'Anulación solicitada')}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn("Fallo anularVenta online:", e);
    }
  }

  const store = getLocalStore();
  const v = store.ventas.find(vt => vt.id === id);
  if (!v || v.estado === 'ANULADA') return false;

  v.estado = 'ANULADA';
  v.motivoAnulacion = motivo;

  // Devolver mercadería al inventario
  for (const item of (v.detalles || [])) {
    const prod = store.productos.find(p => p.id === item.productoId);
    if (prod) {
      const qty = item.cantidad * (item.factorEquivalencia || 1.0);
      const ant = prod.stockActual;
      prod.stockActual += qty;

      store.movimientos.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        tipoMovimiento: "ENTRADA",
        cantidad: qty,
        stockAnterior: ant,
        stockPosterior: prod.stockActual,
        motivo: `Anulación de Venta ${v.numero}`,
        fecha: new Date().toISOString(),
        productoId: prod.id,
        productoNombre: prod.nombre,
        usuarioId: getCurrentUser() ? getCurrentUser().id : 1
      });
    }
  }

  registrarAuditoriaLocal("VENTAS", "ANULAR_VENTA", `Anulación de venta ${v.numero}: ${motivo}`);
  saveLocalStore(store);
  return true;
}

// ==================== COTIZACIONES ====================
export async function getCotizaciones() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/cotizaciones`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getCotizaciones online:", e);
    }
  }
  return getLocalStore().cotizaciones;
}

export async function guardarCotizacion(cotData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/cotizaciones`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cotData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarCotizacion online:", e);
    }
  }

  const store = getLocalStore();
  const numCot = `COT-${String(store.cotizaciones.length + 101).padStart(6, '0')}`;
  const cliente = store.clientes.find(c => c.id === Number(cotData.clienteId));

  const nuevaCot = {
    id: Date.now(),
    numero: numCot,
    fecha: new Date().toISOString(),
    vigenciaDias: cotData.vigenciaDias || 15,
    subtotal: cotData.subtotal,
    igv: cotData.igv,
    total: cotData.total,
    estado: "PENDIENTE",
    observaciones: cotData.observaciones || "Cotización por mayor/menor",
    clienteId: cotData.clienteId,
    clienteNombre: cliente ? (cliente.razonSocial || `${cliente.nombres} ${cliente.apellidos}`.trim()) : "Cliente",
    detalles: cotData.detalles
  };

  store.cotizaciones.unshift(nuevaCot);
  registrarAuditoriaLocal("COTIZACIONES", "CREAR", `Generó cotización: ${numCot}`);
  saveLocalStore(store);
  return nuevaCot;
}

export async function convertirCotizacionAVenta(id) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/cotizaciones/${id}/convertir`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo convertirCotizacion online:", e);
    }
  }

  const store = getLocalStore();
  const cot = store.cotizaciones.find(c => c.id === id);
  if (!cot) throw new Error("Cotización no encontrada");

  // Registrar venta con los datos de la cotización
  const ventaPayload = {
    clienteId: cot.clienteId,
    clienteNombre: cot.clienteNombre,
    metodoPagoId: 1, // Efectivo por default
    subtotal: cot.subtotal,
    igv: cot.igv,
    total: cot.total,
    detalles: cot.detalles.map(d => ({
      productoId: d.productoId,
      productoCodigo: d.productoCodigo,
      productoNombre: d.productoNombre,
      presentacionNombre: d.presentacionNombre || "Unidad",
      factorEquivalencia: d.factorEquivalencia || 1.0,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal
    }))
  };

  const venta = await registrarVenta(ventaPayload);
  cot.estado = "CONVERTIDA_EN_VENTA";
  saveLocalStore(store);
  return venta;
}

// ==================== DEVOLUCIONES ====================
export async function getDevoluciones() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/devoluciones`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getDevoluciones online:", e);
    }
  }
  return getLocalStore().devoluciones;
}

export async function registrarDevolucion(devData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/devoluciones`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(devData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo registrarDevolucion online:", e);
    }
  }

  const store = getLocalStore();
  const numDev = `DEV-${String(store.devoluciones.length + 101).padStart(6, '0')}`;
  const v = store.ventas.find(vt => vt.id === Number(devData.ventaId));

  // Restituir productos al stock y registrar Kardex
  for (const item of devData.detalles) {
    const prod = store.productos.find(p => p.id === item.productoId);
    if (prod) {
      const ant = prod.stockActual;
      prod.stockActual += item.cantidad;

      store.movimientos.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        tipoMovimiento: "ENTRADA",
        cantidad: item.cantidad,
        stockAnterior: ant,
        stockPosterior: prod.stockActual,
        motivo: `Devolución de Venta ${v ? v.numero : ''}: ${devData.motivo}`,
        fecha: new Date().toISOString(),
        productoId: prod.id,
        productoNombre: prod.nombre,
        usuarioId: getCurrentUser() ? getCurrentUser().id : 1
      });
    }
  }

  const nuevaDev = {
    id: Date.now(),
    numero: numDev,
    fecha: new Date().toISOString(),
    ventaId: devData.ventaId,
    ventaNumero: v ? v.numero : "VNT-EXT",
    clienteNombre: v ? v.clienteNombre : "Cliente",
    motivo: devData.motivo,
    totalDevuelto: devData.totalDevuelto,
    estado: "PROCESADA",
    detalles: devData.detalles
  };

  if (v) v.estado = "DEVUELTA PARCIALMENTE";
  store.devoluciones.unshift(nuevaDev);
  registrarAuditoriaLocal("DEVOLUCIONES", "REGISTRAR", `Devolución ${numDev} por S/ ${devData.totalDevuelto}`);
  saveLocalStore(store);
  return nuevaDev;
}

// ==================== COMPRAS & PROVEEDORES ====================
export async function getCompras() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getCompras online:", e);
    }
  }
  return getLocalStore().compras;
}

export async function registrarCompra(compraData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(compraData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo registrarCompra online:", e);
    }
  }

  const store = getLocalStore();
  const numCom = `COM-${String(store.compras.length + 101).padStart(6, '0')}`;
  const prov = store.proveedores.find(p => p.id === Number(compraData.proveedorId));
  const currentUser = getCurrentUser();

  // Aumentar stock de productos y Kardex
  for (const item of compraData.detalles) {
    const prod = store.productos.find(p => p.id === item.productoId);
    if (prod) {
      const ant = prod.stockActual;
      prod.stockActual += item.cantidad;
      // Actualizar precio de compra de referencia si se especifica
      if (item.precioUnitario > 0) prod.precioCompra = item.precioUnitario;

      store.movimientos.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        tipoMovimiento: "ENTRADA",
        cantidad: item.cantidad,
        stockAnterior: ant,
        stockPosterior: prod.stockActual,
        motivo: `Compra mercadería ${numCom} - Proveedor: ${prov ? prov.razonSocial : ''}`,
        fecha: new Date().toISOString(),
        productoId: prod.id,
        productoNombre: prod.nombre,
        usuarioId: currentUser ? currentUser.id : 1
      });
    }
  }

  // Si es a Crédito, crear Cuenta por Pagar
  if (compraData.esCredito) {
    store.cuentasPagar.unshift({
      id: Date.now() + 10,
      compraId: Date.now(),
      compraNumero: numCom,
      proveedorId: compraData.proveedorId,
      proveedorRazonSocial: prov ? prov.razonSocial : "Proveedor",
      montoTotal: compraData.total,
      montoPagado: 0.00,
      saldoPendiente: compraData.total,
      fechaEmision: new Date().toISOString(),
      fechaVencimiento: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
      estado: "PENDIENTE"
    });
  }

  const nuevaCompra = {
    id: Date.now(),
    numero: numCom,
    fecha: new Date().toISOString(),
    proveedorId: compraData.proveedorId,
    proveedorRuc: prov ? prov.ruc : "",
    proveedorRazonSocial: prov ? prov.razonSocial : "Proveedor",
    subtotal: compraData.subtotal,
    igv: compraData.igv,
    total: compraData.total,
    estado: "REGISTRADA",
    detalles: compraData.detalles
  };

  store.compras.unshift(nuevaCompra);
  registrarAuditoriaLocal("COMPRAS", "REGISTRAR_COMPRA", `Compra ${numCom} por S/ ${compraData.total}`);
  saveLocalStore(store);
  return nuevaCompra;
}

export async function getOrdenesCompra() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras/ordenes`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getOrdenesCompra online:", e);
    }
  }
  return getLocalStore().ordenesCompra;
}

export async function crearOrdenCompra(ordenData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras/ordenes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ordenData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo crearOrdenCompra online:", e);
    }
  }

  const store = getLocalStore();
  const numOC = `OC-${String(store.ordenesCompra.length + 101).padStart(6, '0')}`;
  const prov = store.proveedores.find(p => p.id === Number(ordenData.proveedorId));

  const nuevaOC = {
    id: Date.now(),
    numero: numOC,
    fecha: new Date().toISOString(),
    fechaEsperada: ordenData.fechaEsperada || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    proveedorId: ordenData.proveedorId,
    proveedorRazonSocial: prov ? prov.razonSocial : "Proveedor",
    subtotal: ordenData.subtotal,
    igv: ordenData.igv,
    total: ordenData.total,
    estado: "PENDIENTE",
    observaciones: ordenData.observaciones || "Reposición de stock",
    detalles: ordenData.detalles
  };

  store.ordenesCompra.unshift(nuevaOC);
  registrarAuditoriaLocal("ORDENES_COMPRA", "CREAR", `Generó orden de compra: ${numOC}`);
  saveLocalStore(store);
  return nuevaOC;
}

export async function convertirOrdenACompra(id) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras/ordenes/${id}/convertir`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo convertirOrden online:", e);
    }
  }

  const store = getLocalStore();
  const oc = store.ordenesCompra.find(o => o.id === id);
  if (!oc) throw new Error("Orden de compra no encontrada");

  const compra = await registrarCompra({
    proveedorId: oc.proveedorId,
    subtotal: oc.subtotal,
    igv: oc.igv,
    total: oc.total,
    detalles: oc.detalles
  });

  oc.estado = "RECIBIDA";
  saveLocalStore(store);
  return compra;
}

// ==================== CAJA & ARQUEO ====================
export async function getCajaActiva() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/caja/activa`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getCajaActiva online:", e);
    }
  }
  return getLocalStore().cajaActiva;
}

export async function abrirCaja(cajaData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/caja/abrir`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cajaData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo abrirCaja online:", e);
    }
  }

  const store = getLocalStore();
  const monto = Number(cajaData.montoInicial) || 0;
  store.cajaActiva = {
    id: Date.now(),
    nombre: cajaData.nombre || "Caja Principal POS",
    fechaApertura: new Date().toISOString(),
    fechaCierre: null,
    montoInicial: monto,
    totalVentasEfectivo: 0.00,
    totalVentasDigital: 0.00,
    totalIngresos: 0.00,
    totalEgresos: 0.00,
    montoEsperado: monto,
    montoContado: null,
    diferencia: 0.00,
    estado: "ABIERTA",
    observaciones: cajaData.observaciones || "Apertura turno",
    movimientos: [
      { id: Date.now(), tipo: "APERTURA", concepto: "Saldo inicial de caja", monto: monto, fecha: new Date().toISOString() }
    ]
  };

  registrarAuditoriaLocal("CAJA", "APERTURA", `Aperturó caja con S/ ${monto.toFixed(2)}`);
  saveLocalStore(store);
  return store.cajaActiva;
}

export async function registrarMovimientoCaja(movData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/caja/movimiento`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(movData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo registrarMovimientoCaja online:", e);
    }
  }

  const store = getLocalStore();
  if (!store.cajaActiva || store.cajaActiva.estado !== 'ABIERTA') {
    throw new Error("No hay una caja abierta actualmente para registrar movimientos.");
  }

  const monto = Number(movData.monto) || 0;
  if (movData.tipo === 'EGRESO') {
    store.cajaActiva.totalEgresos += monto;
    store.cajaActiva.montoEsperado -= monto;
  } else {
    store.cajaActiva.totalIngresos += monto;
    store.cajaActiva.montoEsperado += monto;
  }

  store.cajaActiva.movimientos.push({
    id: Date.now(),
    tipo: movData.tipo,
    concepto: movData.concepto,
    monto: monto,
    fecha: new Date().toISOString()
  });

  registrarAuditoriaLocal("CAJA", movData.tipo, `${movData.tipo}: ${movData.concepto} - S/ ${monto}`);
  saveLocalStore(store);
  return store.cajaActiva;
}

export async function cerrarCaja(cierreData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/caja/cerrar`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cierreData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo cerrarCaja online:", e);
    }
  }

  const store = getLocalStore();
  if (!store.cajaActiva || store.cajaActiva.estado !== 'ABIERTA') {
    throw new Error("No hay una caja abierta para cerrar");
  }

  const contado = Number(cierreData.montoContado) || 0;
  const dif = contado - store.cajaActiva.montoEsperado;

  store.cajaActiva.fechaCierre = new Date().toISOString();
  store.cajaActiva.montoContado = contado;
  store.cajaActiva.diferencia = dif;
  store.cajaActiva.estado = "CERRADA";
  store.cajaActiva.observacionesCierre = cierreData.observaciones || "Cierre de turno normal";

  registrarAuditoriaLocal("CAJA", "CIERRE", `Cierre de caja. Esperado: S/ ${store.cajaActiva.montoEsperado.toFixed(2)}, Contado: S/ ${contado.toFixed(2)}, Dif: S/ ${dif.toFixed(2)}`);
  saveLocalStore(store);
  return store.cajaActiva;
}

// ==================== FINANZAS (CUENTAS POR COBRAR / PAGAR) ====================
export async function getCuentasCobrar() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/finanzas/cuentas-cobrar`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getCuentasCobrar online:", e);
    }
  }
  return getLocalStore().cuentasCobrar;
}

export async function registrarAbonoCliente(abonoData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/finanzas/cuentas-cobrar/abono`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(abonoData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo registrarAbonoCliente online:", e);
    }
  }

  const store = getLocalStore();
  const c = store.cuentasCobrar.find(item => item.id === Number(abonoData.cuentaId));
  if (!c) throw new Error("Cuenta por cobrar no encontrada");

  const monto = Number(abonoData.monto) || 0;
  c.montoPagado += monto;
  c.saldoPendiente = Math.max(0, c.montoTotal - c.montoPagado);
  c.estado = c.saldoPendiente === 0 ? "PAGADA" : "PARCIAL";

  // Registrar en movimientos de caja si está abierta
  if (store.cajaActiva && store.cajaActiva.estado === 'ABIERTA') {
    store.cajaActiva.totalIngresos += monto;
    store.cajaActiva.montoEsperado += monto;
    store.cajaActiva.movimientos.push({
      id: Date.now(),
      tipo: "INGRESO",
      concepto: `Cobranza Crédito Venta ${c.ventaNumero} (${c.clienteNombre})`,
      monto: monto,
      fecha: new Date().toISOString()
    });
  }

  registrarAuditoriaLocal("FINANZAS", "ABONO_CLIENTE", `Abono de S/ ${monto} a Venta ${c.ventaNumero}`);
  saveLocalStore(store);
  return c;
}

export async function getCuentasPagar() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/finanzas/cuentas-pagar`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getCuentasPagar online:", e);
    }
  }
  return getLocalStore().cuentasPagar;
}

export async function registrarAbonoProveedor(abonoData) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/finanzas/cuentas-pagar/abono`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(abonoData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo registrarAbonoProveedor online:", e);
    }
  }

  const store = getLocalStore();
  const cp = store.cuentasPagar.find(item => item.id === Number(abonoData.cuentaId));
  if (!cp) throw new Error("Cuenta por pagar no encontrada");

  const monto = Number(abonoData.monto) || 0;
  cp.montoPagado += monto;
  cp.saldoPendiente = Math.max(0, cp.montoTotal - cp.montoPagado);
  cp.estado = cp.saldoPendiente === 0 ? "PAGADA" : "PARCIAL";

  registrarAuditoriaLocal("FINANZAS", "PAGO_PROVEEDOR", `Pago a proveedor ${cp.proveedorRazonSocial} por S/ ${monto}`);
  saveLocalStore(store);
  return cp;
}

// ==================== MOVIMIENTOS & KARDEX ====================
export async function getMovimientos() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/inventario/movimientos`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getMovimientos online:", e);
    }
  }
  return getLocalStore().movimientos;
}

export async function getKardexByProducto(productoId) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/inventario/kardex/${productoId}`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getKardex online:", e);
    }
  }
  const movs = getLocalStore().movimientos.filter(m => m.productoId === Number(productoId));
  return movs;
}

// ==================== USUARIOS & RBAC ====================
export async function getUsuarios() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getUsuarios online:", e);
    }
  }
  return getLocalStore().usuarios;
}

export async function guardarUsuario(usuario) {
  if (isBackendOnline) {
    try {
      const method = usuario.id ? 'PUT' : 'POST';
      const url = usuario.id ? `${API_BASE_URL}/usuarios/${usuario.id}` : `${API_BASE_URL}/usuarios`;
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(usuario)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarUsuario online:", e);
    }
  }

  const store = getLocalStore();
  const rol = store.roles.find(r => r.id === Number(usuario.rolId));
  usuario.rolNombre = rol ? rol.nombre : "USUARIO";

  if (!usuario.id) {
    usuario.id = Date.now();
    usuario.estado = true;
    store.usuarios.push(usuario);
    registrarAuditoriaLocal("USUARIOS", "CREAR", `Creó usuario: ${usuario.usuario} (${usuario.rolNombre})`);
  } else {
    const idx = store.usuarios.findIndex(u => u.id === usuario.id);
    if (idx !== -1) {
      store.usuarios[idx] = { ...store.usuarios[idx], ...usuario };
      registrarAuditoriaLocal("USUARIOS", "EDITAR", `Actualizó usuario: ${usuario.usuario}`);
    }
  }
  saveLocalStore(store);
  return usuario;
}

export async function cambiarEstadoUsuario(id, estado) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${id}/estado?estado=${estado}`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn("Fallo cambiarEstadoUsuario online:", e);
    }
  }

  const store = getLocalStore();
  const usr = store.usuarios.find(u => u.id === id);
  if (usr) {
    usr.estado = estado;
    registrarAuditoriaLocal("USUARIOS", "CAMBIO_ESTADO", `Usuario ${usr.usuario} marcado como ${estado ? 'Activo' : 'Inactivo'}`);
    saveLocalStore(store);
  }
  return true;
}

export async function getRoles() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/roles`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getRoles online:", e);
    }
  }
  return getLocalStore().roles;
}

export async function getPermisos() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/roles/permisos`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getPermisos online:", e);
    }
  }

  // Lista base de permisos para Plastiquería
  return [
    { id: 1, codigo: "DASHBOARD_VER", nombre: "Ver Dashboard", modulo: "Dashboard" },
    { id: 2, codigo: "VENTA_VER", nombre: "Ver Ventas", modulo: "Ventas" },
    { id: 3, codigo: "VENTA_CREAR", nombre: "Crear Venta / POS", modulo: "Ventas" },
    { id: 4, codigo: "VENTA_ANULAR", nombre: "Anular Venta", modulo: "Ventas" },
    { id: 5, codigo: "VENTA_DESCUENTO", nombre: "Aplicar Descuentos", modulo: "Ventas" },
    { id: 6, codigo: "COTIZACION_VER", nombre: "Ver Cotizaciones", modulo: "Cotizaciones" },
    { id: 7, codigo: "COTIZACION_CREAR", nombre: "Crear y Convertir Cotizaciones", modulo: "Cotizaciones" },
    { id: 8, codigo: "VENTA_DEVOLVER", nombre: "Gestionar Devoluciones", modulo: "Devoluciones" },
    { id: 9, codigo: "PRODUCTO_VER", nombre: "Ver Productos", modulo: "Productos" },
    { id: 10, codigo: "PRODUCTO_CREAR", nombre: "Crear Producto", modulo: "Productos" },
    { id: 11, codigo: "PRODUCTO_EDITAR", nombre: "Editar Producto y Precios", modulo: "Productos" },
    { id: 12, codigo: "PRODUCTO_DESACTIVAR", nombre: "Desactivar Producto", modulo: "Productos" },
    { id: 13, codigo: "INVENTARIO_VER", nombre: "Ver Inventario", modulo: "Inventario" },
    { id: 14, codigo: "INVENTARIO_AJUSTAR", nombre: "Ajustar Stock", modulo: "Inventario" },
    { id: 15, codigo: "KARDEX_VER", nombre: "Ver Kárdex Físico", modulo: "Inventario" },
    { id: 16, codigo: "COMPRA_VER", nombre: "Ver Compras", modulo: "Compras" },
    { id: 17, codigo: "COMPRA_CREAR", nombre: "Registrar Compra", modulo: "Compras" },
    { id: 18, codigo: "ORDEN_COMPRA_VER", nombre: "Ver Órdenes de Compra", modulo: "Compras" },
    { id: 19, codigo: "ORDEN_COMPRA_CREAR", nombre: "Crear Órdenes de Compra", modulo: "Compras" },
    { id: 20, codigo: "PROVEEDOR_VER", nombre: "Ver Proveedores", modulo: "Proveedores" },
    { id: 21, codigo: "PROVEEDOR_CREAR", nombre: "Crear Proveedor", modulo: "Proveedores" },
    { id: 22, codigo: "PROVEEDOR_EDITAR", nombre: "Editar Proveedor", modulo: "Proveedores" },
    { id: 23, codigo: "CLIENTE_VER", nombre: "Ver Clientes", modulo: "Clientes" },
    { id: 24, codigo: "CLIENTE_CREAR", nombre: "Crear Cliente", modulo: "Clientes" },
    { id: 25, codigo: "CLIENTE_EDITAR", nombre: "Editar Cliente", modulo: "Clientes" },
    { id: 26, codigo: "CAJA_VER", nombre: "Ver Caja", modulo: "Caja" },
    { id: 27, codigo: "CAJA_ABRIR", nombre: "Aperturar Caja", modulo: "Caja" },
    { id: 28, codigo: "CAJA_CERRAR", nombre: "Cerrar Caja y Arqueo", modulo: "Caja" },
    { id: 29, codigo: "CAJA_INGRESO", nombre: "Registrar Ingreso Manual", modulo: "Caja" },
    { id: 30, codigo: "CAJA_EGRESO", nombre: "Registrar Egreso / Gasto", modulo: "Caja" },
    { id: 31, codigo: "FINANZAS_VER", nombre: "Cuentas por Cobrar y Pagar", modulo: "Finanzas" },
    { id: 32, codigo: "REPORTE_VENTAS", nombre: "Reporte de Ventas", modulo: "Reportes" },
    { id: 33, codigo: "REPORTE_COMPRAS", nombre: "Reporte de Compras", modulo: "Reportes" },
    { id: 34, codigo: "REPORTE_INVENTARIO", nombre: "Reporte de Inventario Valorizado", modulo: "Reportes" },
    { id: 35, codigo: "REPORTE_GANANCIAS", nombre: "Reporte de Utilidad y Rentabilidad", modulo: "Reportes" },
    { id: 36, codigo: "USUARIO_VER", nombre: "Ver Usuarios", modulo: "Seguridad" },
    { id: 37, codigo: "USUARIO_CREAR", nombre: "Crear Usuario", modulo: "Seguridad" },
    { id: 38, codigo: "USUARIO_EDITAR", nombre: "Editar Usuario", modulo: "Seguridad" },
    { id: 39, codigo: "USUARIO_DESACTIVAR", nombre: "Desactivar Usuario", modulo: "Seguridad" },
    { id: 40, codigo: "ROL_GESTIONAR", nombre: "Gestionar Roles y Permisos RBAC", modulo: "Seguridad" },
    { id: 41, codigo: "AUDITORIA_VER", nombre: "Ver Auditoría del Sistema", modulo: "Seguridad" },
    { id: 42, codigo: "CONFIG_EMPRESA", nombre: "Configuración de la Empresa", modulo: "Configuracion" }
  ];
}

export async function actualizarPermisosRol(rolId, permisoCodigos) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/roles/${rolId}/permisos`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(permisoCodigos)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo actualizarPermisosRol online:", e);
    }
  }

  const store = getLocalStore();
  const rol = store.roles.find(r => r.id === rolId);
  if (rol) {
    rol.permisoCodigos = permisoCodigos;
    registrarAuditoriaLocal("SEGURIDAD", "MODIFICAR_ROL", `Permisos actualizados para el rol ${rol.nombre}`);
    saveLocalStore(store);
  }
  return rol;
}

// ==================== AUDITORIA ====================
export async function getAuditoria() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/auditoria`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getAuditoria online:", e);
    }
  }
  return getLocalStore().auditorias;
}

function registrarAuditoriaLocal(modulo, accion, descripcion) {
  const store = getLocalStore();
  const user = getCurrentUser();
  if (!store.auditorias) store.auditorias = [];
  store.auditorias.unshift({
    id: Date.now() + Math.floor(Math.random() * 100),
    username: user ? user.usuario : "sistema",
    modulo: modulo,
    accion: accion,
    descripcion: descripcion,
    fechaHora: new Date().toISOString(),
    ipOrigen: "127.0.0.1"
  });
  saveLocalStore(store);
}

// ==================== CONFIGURACION EMPRESA ====================
export async function getEmpresaConfig() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/empresa/config`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo getEmpresaConfig online:", e);
    }
  }
  return getLocalStore().empresaConfig;
}

export async function guardarEmpresaConfig(config) {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE_URL}/empresa/config`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(config)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Fallo guardarEmpresaConfig online:", e);
    }
  }

  const store = getLocalStore();
  store.empresaConfig = { ...store.empresaConfig, ...config };
  registrarAuditoriaLocal("CONFIGURACION", "EDITAR_EMPRESA", `Datos de empresa actualizados (${config.nombreComercial})`);
  saveLocalStore(store);
  return store.empresaConfig;
}
