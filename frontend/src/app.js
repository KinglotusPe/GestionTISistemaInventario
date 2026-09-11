/**
 * =========================================================================
 * SISTEMA DE VENTAS E INVENTARIO JIREH - FRONTEND APP
 * Giro de Negocio: Plastiquería y Distribuidora de Descartables
 * Curso: Gestión de Proyectos en TI
 * =========================================================================
 */

// ==================== 1. DATOS INICIALES DE DEMOSTRACIÓN (PLASTIQUERÍA) ====================
const initialData = {
  categorias: [
    { id: 1, nombre: "Bolsas Plásticas y Biodegradables", descripcion: "Bolsas camiseta, chequera, basura y herméticas", estado: true },
    { id: 2, nombre: "Envases y Contenedores Térmicos", descripcion: "Tapers para comida, domos y envases delivery", estado: true },
    { id: 3, nombre: "Vasos y Copas Descartables", descripcion: "Vasos plásticos transparentes, polipapel y café", estado: true },
    { id: 4, nombre: "Cubiertos y Cañitas", descripcion: "Cucharas, tenedores, cuchillos y sorbetes", estado: true },
    { id: 5, nombre: "Rollos y Embalaje", descripcion: "Stretch film, papel manteca, aluminio y cintas", estado: true },
    { id: 6, nombre: "Artículos y Menaje Plástico", descripcion: "Baldes, tinas, tapers multiuso y organizadores", estado: true }
  ],
  marcas: [
    { id: 1, nombre: "Pamolsa", descripcion: "Envases térmicos, vasos y cubiertos", estado: true },
    { id: 2, nombre: "Reyplast", descripcion: "Artículos y menaje plástico para el hogar", estado: true },
    { id: 3, nombre: "Darnel", descripcion: "Línea descartable de alta resistencia", estado: true },
    { id: 4, nombre: "Peruplast", descripcion: "Películas, stretch film y polietileno", estado: true },
    { id: 5, nombre: "Baplast", descripcion: "Bolsas plásticas, de basura y biodegradables", estado: true }
  ],
  unidadesMedida: [
    { id: 1, nombre: "Ciento", abreviatura: "CTO", estado: true },
    { id: 2, nombre: "Millar", abreviatura: "MIL", estado: true },
    { id: 3, nombre: "Paquete", abreviatura: "PAQ", estado: true },
    { id: 4, nombre: "Rollo", abreviatura: "ROL", estado: true },
    { id: 5, nombre: "Unidad", abreviatura: "UND", estado: true },
    { id: 6, nombre: "Caja", abreviatura: "CJA", estado: true }
  ],
  metodosPago: [
    { id: 1, nombre: "Efectivo", descripcion: "Pago en efectivo en caja", estado: true },
    { id: 2, nombre: "Billetera Digital (Yape / Plin)", descripcion: "Código QR o transferencia móvil", estado: true },
    { id: 3, nombre: "Tarjeta Débito/Crédito", descripcion: "POS Visa / Mastercard", estado: true },
    { id: 4, nombre: "Transferencia Bancaria", descripcion: "BCP, BBVA, Interbank", estado: true }
  ],
  clientes: [
    { id: 1, tipoDocumento: "DNI", numeroDocumento: "45892147", nombres: "Juan Carlos", apellidos: "Pérez Gómez", razonSocial: "", telefono: "987654321", correo: "juan.perez@gmail.com", direccion: "Av. Las Flores 342, Lima" },
    { id: 2, tipoDocumento: "RUC", numeroDocumento: "20601234567", nombres: "", apellidos: "", razonSocial: "Restaurante y Pollería El Buen Gusto S.A.C.", telefono: "014523698", correo: "compras@elbuengusto.pe", direccion: "Av. Próceres 580, Lima" },
    { id: 3, tipoDocumento: "DNI", numeroDocumento: "72145896", nombres: "María Elena", apellidos: "Torres Silva (Pastelería Delicias)", razonSocial: "", telefono: "974125896", correo: "maria.torres@delicias.pe", direccion: "Calle Los Pinos 120, Lima" },
    { id: 4, tipoDocumento: "RUC", numeroDocumento: "20558963214", nombres: "", apellidos: "", razonSocial: "Comercial & Eventos Festiva E.I.R.L.", telefono: "951236874", correo: "contacto@festiva.pe", direccion: "Av. República 890, Lima" }
  ],
  productos: [
    {
      id: 1,
      codigo: "PLAS-001",
      nombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg Blanca",
      descripcion: "Fardo de bolsas camiseta resistentes para comercio",
      precioCompra: 17.50,
      precioVenta: 24.00,
      categoriaId: 1,
      marcaId: 5,
      unidadMedidaId: 2,
      stockMinimo: 20,
      stockActual: 110,
      stockMaximo: 300,
      ubicacion: "Almacén A - Estante 1",
      estado: true
    },
    {
      id: 2,
      codigo: "PLAS-002",
      nombre: "Taper Térmico Rectangular CT4 con Tapa Bisagra",
      descripcion: "Envase térmico espumado para comida y delivery",
      precioCompra: 21.00,
      precioVenta: 28.50,
      categoriaId: 2,
      marcaId: 1,
      unidadMedidaId: 1,
      stockMinimo: 25,
      stockActual: 85,
      stockMaximo: 200,
      ubicacion: "Almacén B - Rack 2",
      estado: true
    },
    {
      id: 3,
      codigo: "PLAS-003",
      nombre: "Vaso Plástico Transparente 10 oz para Jugo",
      descripcion: "Vasos desechables transparentes reforzados",
      precioCompra: 6.20,
      precioVenta: 9.00,
      categoriaId: 3,
      marcaId: 3,
      unidadMedidaId: 1,
      stockMinimo: 30,
      stockActual: 18, // ALERTA: bajo stock
      stockMaximo: 150,
      ubicacion: "Almacén B - Estante 4",
      estado: true
    },
    {
      id: 4,
      codigo: "PLAS-004",
      nombre: "Film Plástico / Stretch Film 18 Pulgadas (Embalaje)",
      descripcion: "Rollo de film estirable para paletizado y protección",
      precioCompra: 27.00,
      precioVenta: 36.00,
      categoriaId: 5,
      marcaId: 4,
      unidadMedidaId: 4,
      stockMinimo: 10,
      stockActual: 32,
      stockMaximo: 80,
      ubicacion: "Almacén C - Pallet 1",
      estado: true
    },
    {
      id: 5,
      codigo: "PLAS-005",
      nombre: "Cucharas Descartables Blancas Reforzadas",
      descripcion: "Cucharas de poliestireno para postres y comidas",
      precioCompra: 3.80,
      precioVenta: 5.50,
      categoriaId: 4,
      marcaId: 1,
      unidadMedidaId: 1,
      stockMinimo: 25,
      stockActual: 9, // ALERTA CRÍTICA
      stockMaximo: 150,
      ubicacion: "Almacén B - Gaveta 3",
      estado: true
    },
    {
      id: 6,
      codigo: "PLAS-006",
      nombre: "Bolsa de Basura Negra Extra Pesada 35x40",
      descripcion: "Paquete de bolsas para tachos industriales y residuos",
      precioCompra: 5.50,
      precioVenta: 8.00,
      categoriaId: 1,
      marcaId: 5,
      unidadMedidaId: 3,
      stockMinimo: 20,
      stockActual: 64,
      stockMaximo: 180,
      ubicacion: "Almacén A - Estante 4",
      estado: true
    },
    {
      id: 7,
      codigo: "PLAS-007",
      nombre: "Contenedor Domo Redondo para Torta Mediana",
      descripcion: "Base negra con tapa domo transparente alta",
      precioCompra: 32.00,
      precioVenta: 44.00,
      categoriaId: 2,
      marcaId: 3,
      unidadMedidaId: 1,
      stockMinimo: 15,
      stockActual: 45,
      stockMaximo: 120,
      ubicacion: "Almacén B - Estante 1",
      estado: true
    },
    {
      id: 8,
      codigo: "PLAS-008",
      nombre: "Balde Plástico 20 Litros con Asa Metálica y Tapa",
      descripcion: "Balde industrial multiusos de alta densidad",
      precioCompra: 15.00,
      precioVenta: 22.00,
      categoriaId: 6,
      marcaId: 2,
      unidadMedidaId: 5,
      stockMinimo: 8,
      stockActual: 24,
      stockMaximo: 60,
      ubicacion: "Zona de Menaje - Piso",
      estado: true
    }
  ],
  ventas: [
    {
      id: 1,
      numero: "VNT-000101",
      fecha: new Date(Date.now() - 3600000 * 2).toISOString(),
      clienteId: 2,
      usuarioId: 1,
      metodoPagoId: 2,
      subtotal: 70.34,
      igv: 12.66,
      total: 83.00,
      estado: "COMPLETADA",
      detalles: [
        { productoId: 1, cantidad: 2, precioUnitario: 24.00, subtotal: 48.00 },
        { productoId: 5, cantidad: 2, precioUnitario: 5.50, subtotal: 11.00 },
        { productoId: 1, cantidad: 1, precioUnitario: 24.00, subtotal: 24.00 }
      ]
    },
    {
      id: 2,
      numero: "VNT-000102",
      fecha: new Date(Date.now() - 3600000 * 5).toISOString(),
      clienteId: 3,
      usuarioId: 1,
      metodoPagoId: 1,
      subtotal: 61.86,
      igv: 11.14,
      total: 73.00,
      estado: "COMPLETADA",
      detalles: [
        { productoId: 2, cantidad: 2, precioUnitario: 28.50, subtotal: 57.00 },
        { productoId: 6, cantidad: 2, precioUnitario: 8.00, subtotal: 16.00 }
      ]
    }
  ],
  movimientos: [
    {
      id: 1,
      tipoMovimiento: "ENTRADA",
      cantidad: 50,
      stockAnterior: 60,
      stockPosterior: 110,
      motivo: "Recepción de mercadería Baplast - Factura F001-4432",
      fecha: new Date(Date.now() - 86400000).toISOString(),
      productoId: 1,
      usuarioId: 1
    },
    {
      id: 2,
      tipoMovimiento: "SALIDA",
      cantidad: 2,
      stockAnterior: 112,
      stockPosterior: 110,
      motivo: "Venta VNT-000101",
      fecha: new Date(Date.now() - 3600000 * 2).toISOString(),
      productoId: 1,
      usuarioId: 1
    },
    {
      id: 3,
      tipoMovimiento: "SALIDA",
      cantidad: 2,
      stockAnterior: 87,
      stockPosterior: 85,
      motivo: "Venta VNT-000102",
      fecha: new Date(Date.now() - 3600000 * 5).toISOString(),
      productoId: 2,
      usuarioId: 1
    }
  ]
};

// ==================== 2. CAPA DE SERVICIO / ALMACENAMIENTO (API + LOCAL) ====================
const API_BASE_URL = 'http://localhost:8080/api';
const STORAGE_KEY = 'jireh_plastiqueria_data_v2'; // Clave actualizada para renovar catálogo

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

async function checkBackendHealth() {
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

const api = {
  async getProductos() {
    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/productos`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn("Fallo fetch a backend:", e);
      }
    }
    return getLocalStore().productos;
  },

  async guardarProducto(producto) {
    const store = getLocalStore();
    if (!producto.id) {
      producto.id = Date.now();
      producto.codigo = producto.codigo || `PLAS-${String(store.productos.length + 1).padStart(3, '0')}`;
      producto.stockActual = Number(producto.stockActual) || 0;
      producto.stockMinimo = Number(producto.stockMinimo) || 5;
      producto.stockMaximo = Number(producto.stockMaximo) || 100;
      producto.precioCompra = Number(producto.precioCompra) || 0;
      producto.precioVenta = Number(producto.precioVenta) || 0;
      producto.estado = true;
      store.productos.unshift(producto);

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
      const idx = store.productos.findIndex(p => p.id === producto.id);
      if (idx !== -1) store.productos[idx] = { ...store.productos[idx], ...producto };
    }
    saveLocalStore(store);
    return producto;
  },

  async getClientes() {
    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/clientes`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn("Fallo fetch clientes:", e);
      }
    }
    return getLocalStore().clientes;
  },

  async guardarCliente(cliente) {
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
  },

  async getVentas() {
    if (isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/ventas`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn("Fallo fetch ventas:", e);
      }
    }
    return getLocalStore().ventas;
  },

  async registrarVenta(ventaData) {
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
  },

  async getMovimientos() {
    return getLocalStore().movimientos;
  },

  getCategorias() { return getLocalStore().categorias; },
  getMarcas() { return getLocalStore().marcas; },
  getUnidadesMedida() { return getLocalStore().unidadesMedida; },
  getMetodosPago() { return getLocalStore().metodosPago; }
};

// ==================== 3. ESTADO GLOBAL DE LA INTERFAZ ====================
const state = {
  currentView: 'dashboard',
  productos: [],
  clientes: [],
  ventas: [],
  movimientos: [],
  categorias: [],
  marcas: [],
  unidadesMedida: [],
  metodosPago: [],
  cart: [],
  selectedClienteId: 1,
  selectedMetodoPagoId: 1,
  searchTermInventario: '',
  filterCategoriaInventario: '',
  searchTermPos: ''
};

// ==================== 4. CICLO DE VIDA E INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  setupModals();
  await loadAppData();
  await updateBackendBadge();
  renderCurrentView();

  setInterval(updateBackendBadge, 30000);
});

async function updateBackendBadge() {
  const isOnline = await checkBackendHealth();
  const statusElem = document.getElementById('backendStatusBadge');
  if (statusElem) {
    if (isOnline) {
      statusElem.innerHTML = '<span class="status-dot"></span> Backend Conectado (API REST)';
      statusElem.style.backgroundColor = 'var(--success-subtle)';
      statusElem.style.color = '#065f46';
    } else {
      statusElem.innerHTML = '<span class="status-dot" style="background:#6366f1;box-shadow:none"></span> Modo Demo (Plastiquería Jireh)';
      statusElem.style.backgroundColor = '#e0e7ff';
      statusElem.style.color = '#3730a3';
    }
  }
}

async function loadAppData() {
  state.productos = await api.getProductos();
  state.clientes = await api.getClientes();
  state.ventas = await api.getVentas();
  state.movimientos = await api.getMovimientos();
  state.categorias = api.getCategorias();
  state.marcas = api.getMarcas();
  state.unidadesMedida = api.getUnidadesMedida();
  state.metodosPago = api.getMetodosPago();
}

// ==================== 5. NAVEGACIÓN ENTRE VISTAS ====================
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });
}

function switchView(viewName) {
  state.currentView = viewName;

  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-view') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) targetSection.classList.add('active');

  const titles = {
    dashboard: { title: 'Dashboard General - Plastiquería Jireh', desc: 'Resumen ejecutivo de ventas, existencias y despachos' },
    inventario: { title: 'Catálogo de Descartables y Plásticos', desc: 'Control de stock por millares, cientos, paquetes y rollos' },
    ventas: { title: 'Punto de Venta (POS)', desc: 'Facturación rápida de descartables, emisión de boletas y cobros' },
    clientes: { title: 'Directorio de Clientes Comerciales', desc: 'Restaurantes, pollerías, pastelerías y compradores frecuentes' },
    movimientos: { title: 'Kárdex de Almacén', desc: 'Trazabilidad de ingresos de mercadería, salidas por venta y mermas' }
  };

  const titleInfo = titles[viewName] || titles.dashboard;
  document.getElementById('currentViewTitle').textContent = titleInfo.title;
  document.getElementById('currentViewSubtitle').textContent = titleInfo.desc;

  renderCurrentView();
}

function renderCurrentView() {
  switch (state.currentView) {
    case 'dashboard': renderDashboard(); break;
    case 'inventario': renderInventario(); break;
    case 'ventas': renderPos(); break;
    case 'clientes': renderClientes(); break;
    case 'movimientos': renderMovimientos(); break;
  }
}

// ==================== 6. VISTA DASHBOARD ====================
function renderDashboard() {
  const totalVentasMonto = state.ventas.reduce((sum, v) => sum + v.total, 0);
  const totalStockAlerta = state.productos.filter(p => p.stockActual <= p.stockMinimo).length;
  const totalProductos = state.productos.length;
  const totalClientes = state.clientes.length;

  document.getElementById('kpiTotalVentas').textContent = `S/ ${totalVentasMonto.toFixed(2)}`;
  document.getElementById('kpiTotalProductos').textContent = totalProductos;
  document.getElementById('kpiStockAlerta').textContent = totalStockAlerta;
  document.getElementById('kpiTotalClientes').textContent = totalClientes;

  const alertasContainer = document.getElementById('dashboardAlertasStockTable');
  const prodsAlerta = state.productos.filter(p => p.stockActual <= p.stockMinimo);

  if (prodsAlerta.length === 0) {
    alertasContainer.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--success);padding:1.5rem;">✅ Todos los productos tienen stock suficiente en almacén.</td></tr>`;
  } else {
    alertasContainer.innerHTML = prodsAlerta.map(p => `
      <tr>
        <td><strong>${p.codigo}</strong></td>
        <td>${p.nombre}</td>
        <td><span class="badge ${p.stockActual === 0 ? 'badge-danger' : 'badge-warning'}">${p.stockActual} ${getAbreviaturaUnidad(p.unidadMedidaId)}</span></td>
        <td>${p.stockMinimo} ${getAbreviaturaUnidad(p.unidadMedidaId)}</td>
        <td><span class="badge badge-danger">Reabastecer</span></td>
      </tr>
    `).join('');
  }

  const ultimasVentasContainer = document.getElementById('dashboardUltimasVentasTable');
  ultimasVentasContainer.innerHTML = state.ventas.slice(0, 5).map(v => {
    const cliente = state.clientes.find(c => c.id === v.clienteId);
    const nombreCliente = cliente ? (cliente.razonSocial || `${cliente.nombres} ${cliente.apellidos}`) : 'Cliente Varios';
    return `
      <tr>
        <td><strong>${v.numero}</strong></td>
        <td>${formatearFecha(v.fecha)}</td>
        <td>${nombreCliente}</td>
        <td style="font-weight:700;color:#059669;">S/ ${v.total.toFixed(2)}</td>
        <td><span class="badge badge-success">${v.estado}</span></td>
      </tr>
    `;
  }).join('');
}

// ==================== 7. VISTA INVENTARIO ====================
function renderInventario() {
  const selectCat = document.getElementById('filterCategoriaSelect');
  if (selectCat && selectCat.children.length <= 1) {
    selectCat.innerHTML = '<option value="">Todas las Categorías</option>' + 
      state.categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
    selectCat.addEventListener('change', (e) => {
      state.filterCategoriaInventario = e.target.value;
      renderInventario();
    });
  }

  const searchInput = document.getElementById('searchInventarioInput');
  if (searchInput && !searchInput.dataset.initialized) {
    searchInput.dataset.initialized = 'true';
    searchInput.addEventListener('input', (e) => {
      state.searchTermInventario = e.target.value.toLowerCase();
      renderInventario();
    });
  }

  let filtrados = state.productos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(state.searchTermInventario) ||
                        p.codigo.toLowerCase().includes(state.searchTermInventario);
    const matchCat = !state.filterCategoriaInventario || String(p.categoriaId) === String(state.filterCategoriaInventario);
    return matchSearch && matchCat;
  });

  const tableBody = document.getElementById('inventarioTableBody');
  if (filtrados.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--text-muted);">No se encontraron productos coincidentes en el inventario.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtrados.map(p => {
    const cat = state.categorias.find(c => c.id === p.categoriaId)?.nombre || 'General';
    const marca = state.marcas.find(m => m.id === p.marcaId)?.nombre || '-';
    const und = getAbreviaturaUnidad(p.unidadMedidaId);
    
    let stockBadgeClass = 'badge-success';
    let stockStatus = 'Óptimo';
    if (p.stockActual === 0) {
      stockBadgeClass = 'badge-danger';
      stockStatus = 'Agotado';
    } else if (p.stockActual <= p.stockMinimo) {
      stockBadgeClass = 'badge-warning';
      stockStatus = 'Stock Bajo';
    }

    return `
      <tr>
        <td><strong>${p.codigo}</strong></td>
        <td>
          <div style="font-weight:600;">${p.nombre}</div>
          <small style="color:var(--text-muted);">${cat} • Marca: ${marca}</small>
        </td>
        <td>S/ ${p.precioCompra.toFixed(2)}</td>
        <td style="font-weight:700;color:#059669;">S/ ${p.precioVenta.toFixed(2)}</td>
        <td><strong>${p.stockActual}</strong> <small style="font-weight:600;color:#6366f1;">${und}</small></td>
        <td>${p.stockMinimo} ${und}</td>
        <td><span class="badge ${stockBadgeClass}">${stockStatus}</span></td>
        <td>
          <button class="btn-secondary" style="padding:0.3rem 0.6rem;font-size:0.75rem;" onclick="window.app.quickAddPos(${p.id})">
            + Vender
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// ==================== 8. VISTA PUNTO DE VENTA (POS) ====================
function renderPos() {
  const prodGrid = document.getElementById('posProductsGrid');
  const searchInput = document.getElementById('searchPosInput');

  if (searchInput && !searchInput.dataset.initialized) {
    searchInput.dataset.initialized = 'true';
    searchInput.addEventListener('input', (e) => {
      state.searchTermPos = e.target.value.toLowerCase();
      renderPos();
    });
  }

  const clienteSelect = document.getElementById('posClienteSelect');
  if (clienteSelect && clienteSelect.children.length === 0) {
    clienteSelect.innerHTML = state.clientes.map(c => {
      const label = c.razonSocial ? `${c.razonSocial} (${c.numeroDocumento})` : `${c.nombres} ${c.apellidos} (${c.numeroDocumento})`;
      return `<option value="${c.id}">${label}</option>`;
    }).join('');
    clienteSelect.addEventListener('change', (e) => {
      state.selectedClienteId = Number(e.target.value);
    });
  }

  const metodoSelect = document.getElementById('posMetodoPagoSelect');
  if (metodoSelect && metodoSelect.children.length === 0) {
    metodoSelect.innerHTML = state.metodosPago.map(m => `
      <option value="${m.id}">${m.nombre}</option>
    `).join('');
    metodoSelect.addEventListener('change', (e) => {
      state.selectedMetodoPagoId = Number(e.target.value);
    });
  }

  const prods = state.productos.filter(p => 
    p.nombre.toLowerCase().includes(state.searchTermPos) || 
    p.codigo.toLowerCase().includes(state.searchTermPos)
  );

  prodGrid.innerHTML = prods.map(p => {
    const isOut = p.stockActual <= 0;
    const und = getAbreviaturaUnidad(p.unidadMedidaId);
    return `
      <div class="product-card-pos ${isOut ? 'out-of-stock' : ''}" onclick="${isOut ? '' : `window.app.addToCart(${p.id})`}">
        <div>
          <span class="pos-code-badge">${p.codigo}</span>
          <div class="pos-prod-name">${p.nombre}</div>
        </div>
        <div>
          <div class="pos-prod-price">S/ ${p.precioVenta.toFixed(2)} <small style="font-size:0.75rem;color:var(--text-muted);">/${und}</small></div>
          <div class="pos-prod-stock">Stock disp: <strong>${p.stockActual} ${und}</strong></div>
        </div>
      </div>
    `;
  }).join('');

  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cartItemsList');
  const btnCheckout = document.getElementById('btnFinalizarVenta');

  if (state.cart.length === 0) {
    cartList.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted);">El carrito está vacío.<br><small>Haz clic en los productos para agregarlos.</small></div>`;
    document.getElementById('cartSubtotal').textContent = 'S/ 0.00';
    document.getElementById('cartIgv').textContent = 'S/ 0.00';
    document.getElementById('cartTotal').textContent = 'S/ 0.00';
    btnCheckout.disabled = true;
    return;
  }

  btnCheckout.disabled = false;

  let totalConIgv = 0;
  cartList.innerHTML = state.cart.map(item => {
    const prod = state.productos.find(p => p.id === item.productoId);
    const itemTotal = prod.precioVenta * item.cantidad;
    const und = getAbreviaturaUnidad(prod.unidadMedidaId);
    totalConIgv += itemTotal;

    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h5>${prod.nombre}</h5>
          <span>S/ ${prod.precioVenta.toFixed(2)} x ${item.cantidad} ${und} = <strong>S/ ${itemTotal.toFixed(2)}</strong></span>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="window.app.updateCartQty(${prod.id}, -1)">-</button>
          <span style="font-weight:700;font-size:0.9rem;min-width:18px;text-align:center;">${item.cantidad}</span>
          <button class="qty-btn" onclick="window.app.updateCartQty(${prod.id}, 1)">+</button>
          <button class="qty-btn" style="color:var(--danger);margin-left:4px;" onclick="window.app.removeFromCart(${prod.id})">×</button>
        </div>
      </div>
    `;
  }).join('');

  const subtotalSinIgv = totalConIgv / 1.18;
  const igv = totalConIgv - subtotalSinIgv;

  document.getElementById('cartSubtotal').textContent = `S/ ${subtotalSinIgv.toFixed(2)}`;
  document.getElementById('cartIgv').textContent = `S/ ${igv.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `S/ ${totalConIgv.toFixed(2)}`;
}

// ==================== 9. VISTA CLIENTES ====================
function renderClientes() {
  const tbody = document.getElementById('clientesTableBody');
  tbody.innerHTML = state.clientes.map(c => {
    const nombre = c.razonSocial || `${c.nombres} ${c.apellidos}`;
    return `
      <tr>
        <td><strong>${c.tipoDocumento}</strong>: ${c.numeroDocumento}</td>
        <td style="font-weight:600;">${nombre}</td>
        <td>${c.telefono || '-'}</td>
        <td>${c.correo || '-'}</td>
        <td>${c.direccion || '-'}</td>
      </tr>
    `;
  }).join('');
}

// ==================== 10. VISTA MOVIMIENTOS ====================
function renderMovimientos() {
  const tbody = document.getElementById('movimientosTableBody');
  tbody.innerHTML = state.movimientos.map(m => {
    const prod = state.productos.find(p => p.id === m.productoId);
    const nombreProd = prod ? prod.nombre : `Producto #${m.productoId}`;
    const und = prod ? getAbreviaturaUnidad(prod.unidadMedidaId) : '';
    const badge = m.tipoMovimiento === 'ENTRADA' ? 'badge-success' : 'badge-danger';

    return `
      <tr>
        <td>${formatearFecha(m.fecha)}</td>
        <td><span class="badge ${badge}">${m.tipoMovimiento}</span></td>
        <td><strong>${nombreProd}</strong></td>
        <td style="font-weight:700;">${m.cantidad} ${und}</td>
        <td>${m.stockAnterior} ➔ <strong>${m.stockPosterior} ${und}</strong></td>
        <td>${m.motivo || '-'}</td>
      </tr>
    `;
  }).join('');
}

// ==================== 11. ACCIONES DEL CARRITO Y COBRO ====================
function addToCart(productoId) {
  const prod = state.productos.find(p => p.id === productoId);
  if (!prod || prod.stockActual <= 0) {
    showToast('Producto sin stock disponible', 'warning');
    return;
  }

  const existing = state.cart.find(item => item.productoId === productoId);
  if (existing) {
    if (existing.cantidad + 1 > prod.stockActual) {
      showToast(`Stock máximo alcanzado (${prod.stockActual})`, 'warning');
      return;
    }
    existing.cantidad += 1;
  } else {
    state.cart.push({ productoId, cantidad: 1 });
  }

  renderCart();
  showToast(`"${prod.nombre.substring(0, 22)}..." añadido`);
}

function updateCartQty(productoId, delta) {
  const item = state.cart.find(i => i.productoId === productoId);
  const prod = state.productos.find(p => p.id === productoId);
  if (!item || !prod) return;

  const newQty = item.cantidad + delta;
  if (newQty <= 0) {
    removeFromCart(productoId);
  } else if (newQty > prod.stockActual) {
    showToast(`No puedes superar el stock actual (${prod.stockActual})`, 'warning');
  } else {
    item.cantidad = newQty;
    renderCart();
  }
}

function removeFromCart(productoId) {
  state.cart = state.cart.filter(i => i.productoId !== productoId);
  renderCart();
}

async function procesarVenta() {
  if (state.cart.length === 0) return;

  let totalConIgv = 0;
  const detalles = state.cart.map(item => {
    const prod = state.productos.find(p => p.id === item.productoId);
    const sub = prod.precioVenta * item.cantidad;
    totalConIgv += sub;
    return {
      productoId: item.productoId,
      cantidad: item.cantidad,
      precioUnitario: prod.precioVenta,
      subtotal: sub
    };
  });

  const subtotalSinIgv = totalConIgv / 1.18;
  const igv = totalConIgv - subtotalSinIgv;

  const ventaData = {
    clienteId: state.selectedClienteId,
    metodoPagoId: state.selectedMetodoPagoId,
    subtotal: Number(subtotalSinIgv.toFixed(2)),
    igv: Number(igv.toFixed(2)),
    total: Number(totalConIgv.toFixed(2)),
    detalles
  };

  const ventaRealizada = await api.registrarVenta(ventaData);

  await loadAppData();

  state.cart = [];
  renderCart();
  renderPos();

  mostrarComprobanteModal(ventaRealizada);
  showToast('¡Venta de descartables completada con éxito!');
}

function mostrarComprobanteModal(venta) {
  const cliente = state.clientes.find(c => c.id === venta.clienteId);
  const metodo = state.metodosPago.find(m => m.id === venta.metodoPagoId);

  const clienteNombre = cliente ? (cliente.razonSocial || `${cliente.nombres} ${cliente.apellidos}`) : 'Cliente General';
  const clienteDoc = cliente ? `${cliente.tipoDocumento}: ${cliente.numeroDocumento}` : '-';

  const detallesHtml = venta.detalles.map(d => {
    const prod = state.productos.find(p => p.id === d.productoId);
    const und = prod ? getAbreviaturaUnidad(prod.unidadMedidaId) : '';
    return `
      <div class="receipt-row">
        <span>${d.cantidad} ${und} x ${prod ? prod.nombre.substring(0, 20) : 'Producto'}</span>
        <span>S/ ${d.subtotal.toFixed(2)}</span>
      </div>
    `;
  }).join('');

  const modalBody = document.getElementById('ticketModalContent');
  modalBody.innerHTML = `
    <div class="receipt-paper" id="printableReceipt">
      <div class="receipt-header">
        <h4>PLASTIQUERÍA & DESCARTABLES JIREH</h4>
        <p>RUC: 20554433221</p>
        <p>Venta por Mayor y Menor en Plásticos</p>
        <p>Av. Principal 1234 - Lima</p>
        <p><strong>BOLETA DE VENTA ELECTRÓNICA</strong></p>
        <p><strong>${venta.numero}</strong></p>
      </div>

      <div class="receipt-row">
        <span>Fecha:</span>
        <span>${formatearFecha(venta.fecha)}</span>
      </div>
      <div class="receipt-row">
        <span>Cliente:</span>
        <span>${clienteNombre}</span>
      </div>
      <div class="receipt-row">
        <span>Doc:</span>
        <span>${clienteDoc}</span>
      </div>
      <div class="receipt-row">
        <span>Pago:</span>
        <span>${metodo?.nombre || 'Efectivo'}</span>
      </div>

      <div style="border-top:1px dashed #94a3b8;margin:0.75rem 0;"></div>

      ${detallesHtml}

      <div style="border-top:1px dashed #94a3b8;margin:0.75rem 0;"></div>

      <div class="receipt-row">
        <span>Op. Gravada:</span>
        <span>S/ ${venta.subtotal.toFixed(2)}</span>
      </div>
      <div class="receipt-row">
        <span>I.G.V. (18%):</span>
        <span>S/ ${venta.igv.toFixed(2)}</span>
      </div>
      <div class="receipt-row" style="font-size:1.05rem;font-weight:900;margin-top:0.4rem;">
        <span>TOTAL A PAGAR:</span>
        <span>S/ ${venta.total.toFixed(2)}</span>
      </div>

      <div style="text-align:center;margin-top:1.25rem;border-top:1px dashed #94a3b8;padding-top:0.75rem;font-size:0.75rem;">
        <p>¡Gracias por su compra en Plastiquería Jireh!</p>
        <p>Representación impresa de la Boleta Electrónica</p>
      </div>
    </div>
  `;

  openModal('modalTicket');
}

// ==================== 12. GESTIÓN DE MODALES ====================
function setupModals() {
  const btnNuevoProd = document.getElementById('btnAbrirModalNuevoProducto');
  if (btnNuevoProd) {
    btnNuevoProd.addEventListener('click', () => {
      document.getElementById('modalProdCategoria').innerHTML = state.categorias.map(c => `
        <option value="${c.id}">${c.nombre}</option>
      `).join('');
      document.getElementById('modalProdMarca').innerHTML = state.marcas.map(m => `
        <option value="${m.id}">${m.nombre}</option>
      `).join('');
      document.getElementById('modalProdUnidad').innerHTML = state.unidadesMedida.map(u => `
        <option value="${u.id}">${u.nombre} (${u.abreviatura})</option>
      `).join('');

      openModal('modalNuevoProducto');
    });
  }

  const formProd = document.getElementById('formNuevoProducto');
  if (formProd) {
    formProd.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nuevo = {
        codigo: document.getElementById('modalProdCodigo').value.trim(),
        nombre: document.getElementById('modalProdNombre').value.trim(),
        precioCompra: parseFloat(document.getElementById('modalProdPrecioCompra').value),
        precioVenta: parseFloat(document.getElementById('modalProdPrecioVenta').value),
        stockActual: parseInt(document.getElementById('modalProdStockActual').value, 10),
        stockMinimo: parseInt(document.getElementById('modalProdStockMinimo').value, 10),
        categoriaId: parseInt(document.getElementById('modalProdCategoria').value, 10),
        marcaId: parseInt(document.getElementById('modalProdMarca').value, 10),
        unidadMedidaId: parseInt(document.getElementById('modalProdUnidad').value, 10),
        ubicacion: document.getElementById('modalProdUbicacion').value.trim() || 'Almacén Central'
      };

      await api.guardarProducto(nuevo);
      await loadAppData();
      closeModal('modalNuevoProducto');
      formProd.reset();
      renderCurrentView();
      showToast('Artículo de plastiquería registrado');
    });
  }

  const btnNuevoCliente = document.getElementById('btnAbrirModalNuevoCliente');
  if (btnNuevoCliente) {
    btnNuevoCliente.addEventListener('click', () => openModal('modalNuevoCliente'));
  }

  const formCliente = document.getElementById('formNuevoCliente');
  if (formCliente) {
    formCliente.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nuevo = {
        tipoDocumento: document.getElementById('modalClienteTipoDoc').value,
        numeroDocumento: document.getElementById('modalClienteNumDoc').value.trim(),
        nombres: document.getElementById('modalClienteNombres').value.trim(),
        apellidos: document.getElementById('modalClienteApellidos').value.trim(),
        telefono: document.getElementById('modalClienteTelefono').value.trim(),
        correo: document.getElementById('modalClienteCorreo').value.trim(),
        direccion: document.getElementById('modalClienteDireccion').value.trim()
      };

      await api.guardarCliente(nuevo);
      await loadAppData();
      closeModal('modalNuevoCliente');
      formCliente.reset();
      renderCurrentView();
      showToast('Cliente guardado exitosamente');
    });
  }

  const btnCheckout = document.getElementById('btnFinalizarVenta');
  if (btnCheckout) {
    btnCheckout.addEventListener('click', procesarVenta);
  }

  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

// ==================== 13. UTILITARIOS ====================
function getAbreviaturaUnidad(unidadId) {
  return state.unidadesMedida.find(u => u.id === unidadId)?.abreviatura || 'UND';
}

function formatearFecha(isoString) {
  if (!isoString) return '-';
  const d = new Date(isoString);
  return `${d.toLocaleDateString('es-PE')} ${d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${type === 'warning' ? '⚠️' : '✅'}</span> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Objeto global para llamadas inline de la UI
window.app = {
  switchView,
  addToCart,
  updateCartQty,
  removeFromCart,
  quickAddPos: (id) => {
    switchView('ventas');
    setTimeout(() => addToCart(id), 100);
  },
  imprimirTicket: () => {
    window.print();
  }
};
