/**
 * =========================================================================
 * PLASTIQUERÍA Y DISTRIBUIDORA JIREH — SISTEMA INTEGRAL DE GESTIÓN (ERP & POS)
 * Arquitectura Dual: Online (Spring Boot + MySQL) / Offline (Demostración Local)
 * =========================================================================
 */

(function () {
  'use strict';

  const API_BASE_URL = 'http://localhost:8080/api';
  const STORAGE_KEY = 'jireh_sistema_data_v3';
  const AUTH_KEY = 'jireh_auth_user_session_v3';

  // ==================== 1. DATOS MAESTROS DE INICIO ====================
  const defaultInitialData = {
    empresaConfig: {
      id: 1,
      razonSocial: "PLASTIQUERÍA Y DESCARTABLES JIREH E.I.R.L.",
      nombreComercial: "PLASTIQUERÍA JIREH",
      ruc: "20608945123",
      direccion: "Av. Central 742, Mercado Mayorista, Lima",
      telefono: "01 458-9214 / 987 654 321",
      correo: "contacto@plastiqueriajireh.pe",
      monedaSimbolo: "S/",
      monedaNombre: "Soles",
      igvPorcentaje: 18.00,
      mensajeTicket: "¡Gracias por su preferencia! Distribución mayorista y minorista de plásticos y descartables."
    },
    roles: [
      { id: 1, nombre: "SUPER_ADMIN", descripcion: "Acceso total y configuración del sistema", estado: true, permisoCodigos: ["*"] },
      { id: 2, nombre: "ADMINISTRADOR", descripcion: "Gestión operativa, comercial y financiera", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "VENTA_CREAR", "VENTA_ANULAR", "VENTA_DESCUENTO", "COTIZACION_VER", "COTIZACION_CREAR", "VENTA_DEVOLVER", "PRODUCTO_VER", "PRODUCTO_CREAR", "PRODUCTO_EDITAR", "PRODUCTO_DESACTIVAR", "INVENTARIO_VER", "INVENTARIO_AJUSTAR", "KARDEX_VER", "COMPRA_VER", "COMPRA_CREAR", "ORDEN_COMPRA_VER", "ORDEN_COMPRA_CREAR", "PROVEEDOR_VER", "PROVEEDOR_CREAR", "PROVEEDOR_EDITAR", "CLIENTE_VER", "CLIENTE_CREAR", "CLIENTE_EDITAR", "CAJA_VER", "CAJA_ABRIR", "CAJA_CERRAR", "CAJA_INGRESO", "CAJA_EGRESO", "FINANZAS_VER", "REPORTE_VENTAS", "REPORTE_COMPRAS", "REPORTE_INVENTARIO", "REPORTE_GANANCIAS", "USUARIO_VER", "USUARIO_CREAR", "USUARIO_EDITAR", "USUARIO_DESACTIVAR", "ROL_GESTIONAR", "PERMISO_GESTIONAR", "CONFIG_EMPRESA"] },
      { id: 3, nombre: "CAJERO", descripcion: "Punto de Venta POS, cobros y caja de turno", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "VENTA_CREAR", "CLIENTE_VER", "CLIENTE_CREAR", "PRODUCTO_VER", "CAJA_VER", "CAJA_ABRIR", "CAJA_CERRAR"] },
      { id: 4, nombre: "VENDEDOR", descripcion: "Cotizaciones, ventas y catálogo de clientes", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "VENTA_CREAR", "VENTA_DESCUENTO", "COTIZACION_VER", "COTIZACION_CREAR", "PRODUCTO_VER", "CLIENTE_VER", "CLIENTE_CREAR", "CLIENTE_EDITAR"] },
      { id: 5, nombre: "ALMACENERO", descripcion: "Control de existencias, recepción y kárdex", estado: true, permisoCodigos: ["DASHBOARD_VER", "PRODUCTO_VER", "PRODUCTO_CREAR", "PRODUCTO_EDITAR", "INVENTARIO_VER", "INVENTARIO_AJUSTAR", "KARDEX_VER", "REPORTE_INVENTARIO", "COMPRA_VER"] },
      { id: 6, nombre: "COMPRAS", descripcion: "Proveedores, órdenes de compra y compras", estado: true, permisoCodigos: ["DASHBOARD_VER", "PROVEEDOR_VER", "PROVEEDOR_CREAR", "PROVEEDOR_EDITAR", "ORDEN_COMPRA_VER", "ORDEN_COMPRA_CREAR", "COMPRA_VER", "COMPRA_CREAR", "PRODUCTO_VER", "INVENTARIO_VER"] },
      { id: 7, nombre: "GERENTE", descripcion: "Reportes gerenciales y rentabilidad de ventas", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "COTIZACION_VER", "COMPRA_VER", "ORDEN_COMPRA_VER", "PRODUCTO_VER", "INVENTARIO_VER", "KARDEX_VER", "CLIENTE_VER", "PROVEEDOR_VER", "CAJA_VER", "FINANZAS_VER", "REPORTE_VENTAS", "REPORTE_COMPRAS", "REPORTE_INVENTARIO", "REPORTE_GANANCIAS"] }
    ],
    usuarios: [
      { id: 1, usuario: "admin", contrasena: "admin", nombres: "Administrador General", apellidos: "Jireh", correo: "admin@jireh.com", rolId: 1, rolNombre: "SUPER_ADMIN", estado: true },
      { id: 2, usuario: "cajero", contrasena: "cajero123", nombres: "Lucía Fernanda", apellidos: "Rojas Quispe", correo: "caja@jireh.com", rolId: 3, rolNombre: "CAJERO", estado: true },
      { id: 3, usuario: "vendedor", contrasena: "vendedor123", nombres: "Rosa María", apellidos: "Medina Paredes", correo: "vendedor@jireh.com", rolId: 4, rolNombre: "VENDEDOR", estado: true },
      { id: 4, usuario: "almacenero", contrasena: "almacen123", nombres: "Carlos Eduardo", apellidos: "Gutiérrez Ríos", correo: "almacen@jireh.com", rolId: 5, rolNombre: "ALMACENERO", estado: true },
      { id: 5, usuario: "compras", contrasena: "compras123", nombres: "Roberto Antonio", apellidos: "Vargas Soria", correo: "compras@jireh.com", rolId: 6, rolNombre: "COMPRAS", estado: true },
      { id: 6, usuario: "gerente", contrasena: "gerente123", nombres: "Ing. Patricia", apellidos: "Navarro Flores", correo: "gerencia@jireh.com", rolId: 7, rolNombre: "GERENTE", estado: true }
    ],
    categorias: [
      { id: 1, nombre: "Bolsas Plásticas y Biodegradables", descripcion: "Bolsas camiseta, chequera, basura y herméticas", estado: true },
      { id: 2, nombre: "Envases y Contenedores Térmicos", descripcion: "Tapers para comida, domos y envases delivery", estado: true },
      { id: 3, nombre: "Vasos y Copas Descartables", descripcion: "Vasos plásticos transparentes, polipapel y café", estado: true },
      { id: 4, nombre: "Cubiertos y Cañitas", descripcion: "Cucharas, tenedores, cuchillos y sorbetes", estado: true },
      { id: 5, nombre: "Rollos y Embalaje", descripcion: "Stretch film, papel manteca, aluminio y cintas", estado: true },
      { id: 6, nombre: "Artículos y Menaje Plástico", descripcion: "Baldes, tinas, taper multiuso y organizadores", estado: true }
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
      { id: 4, nombre: "Transferencia Bancaria", descripcion: "BCP, BBVA, Interbank", estado: true },
      { id: 5, nombre: "Venta al Crédito", descripcion: "Cuenta por cobrar", estado: true }
    ],
    clientes: [
      { id: 1, tipoDocumento: "DNI", numeroDocumento: "45892147", nombres: "Juan Carlos", apellidos: "Pérez Gómez", razonSocial: "", telefono: "987654321", correo: "juan.perez@gmail.com", direccion: "Av. Las Flores 342, Lima", tipoCliente: "MINORISTA" },
      { id: 2, tipoDocumento: "RUC", numeroDocumento: "20601234567", nombres: "", apellidos: "", razonSocial: "Restaurante y Pollería El Buen Gusto S.A.C.", telefono: "014523698", correo: "compras@elbuengusto.pe", direccion: "Av. Próceres 580, Lima", tipoCliente: "EMPRESA" },
      { id: 3, tipoDocumento: "DNI", numeroDocumento: "72145896", nombres: "María Elena", apellidos: "Torres Silva (Pastelería Delicias)", razonSocial: "", telefono: "974125896", correo: "maria.torres@delicias.pe", direccion: "Calle Los Pinos 120, Lima", tipoCliente: "MAYORISTA" },
      { id: 4, tipoDocumento: "RUC", numeroDocumento: "20558963214", nombres: "", apellidos: "", razonSocial: "Comercial & Eventos Festiva E.I.R.L.", telefono: "951236874", correo: "contacto@festiva.pe", direccion: "Av. República 890, Lima", tipoCliente: "MAYORISTA" }
    ],
    proveedores: [
      { id: 1, ruc: "20100041235", razonSocial: "Pamolsa Perú S.A.", contacto: "Área Comercial", telefono: "016145000", correo: "ventas@pamolsa.com.pe", direccion: "Av. Elmer Faucett 3450, Callao", estado: true },
      { id: 2, ruc: "20100125896", razonSocial: "Reyplast Plásticos S.A.C.", contacto: "Ventas Corporativas", telefono: "013264500", correo: "corporativo@reyplast.com.pe", direccion: "Av. Separadora Industrial 1280, Ate", estado: true },
      { id: 3, ruc: "20512345897", razonSocial: "Baplast Bolsas & Empaques E.I.R.L.", contacto: "Carlos Barrientos", telefono: "998877665", correo: "ventas@baplast.pe", direccion: "Jr. Carabaya 450, Lima", estado: true }
    ],
    productos: [
      {
        id: 1,
        codigo: "PLAS-001",
        codigoBarras: "775000100101",
        nombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg Blanca",
        descripcion: "Fardo de bolsas camiseta resistentes para comercio",
        precioCompra: 17.50,
        precioVenta: 24.00,
        categoriaId: 1,
        categoriaNombre: "Bolsas Plásticas y Biodegradables",
        marcaId: 5,
        marcaNombre: "Baplast",
        unidadMedidaId: 2,
        stockMinimo: 20,
        stockActual: 110,
        stockMaximo: 300,
        ubicacion: "Almacén A - Estante 1",
        estado: true,
        presentaciones: [
          { id: 1, nombrePresentacion: "Millar (1000 und)", factorEquivalencia: 1.0, precioCosto: 17.50, precioVenta: 24.00, precioMayorista: 21.00, codigoBarras: "775000100101", esDefault: true },
          { id: 2, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 0.1, precioCosto: 1.80, precioVenta: 2.80, precioMayorista: 2.50, codigoBarras: "775000100102", esDefault: false },
          { id: 3, nombrePresentacion: "Fardo x 10 Millares", factorEquivalencia: 10.0, precioCosto: 170.00, precioVenta: 220.00, precioMayorista: 195.00, codigoBarras: "775000100103", esDefault: false }
        ]
      },
      {
        id: 2,
        codigo: "PLAS-002",
        codigoBarras: "775000200201",
        nombre: "Taper Térmico Rectangular CT4 con Tapa Bisagra",
        descripcion: "Envase térmico espumado para comida y delivery",
        precioCompra: 21.00,
        precioVenta: 28.50,
        categoriaId: 2,
        categoriaNombre: "Envases y Contenedores Térmicos",
        marcaId: 1,
        marcaNombre: "Pamolsa",
        unidadMedidaId: 1,
        stockMinimo: 25,
        stockActual: 85,
        stockMaximo: 200,
        ubicacion: "Almacén B - Rack 2",
        estado: true,
        presentaciones: [
          { id: 4, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 1.0, precioCosto: 21.00, precioVenta: 28.50, precioMayorista: 26.00, codigoBarras: "775000200201", esDefault: true },
          { id: 5, nombrePresentacion: "Paquete x 25 und", factorEquivalencia: 0.25, precioCosto: 5.50, precioVenta: 8.00, precioMayorista: 7.20, codigoBarras: "775000200202", esDefault: false },
          { id: 6, nombrePresentacion: "Caja x 500 und", factorEquivalencia: 5.0, precioCosto: 100.00, precioVenta: 135.00, precioMayorista: 125.00, codigoBarras: "775000200203", esDefault: false }
        ]
      },
      {
        id: 3,
        codigo: "PLAS-003",
        codigoBarras: "775000300301",
        nombre: "Vaso Plástico Transparente 10 oz para Jugo",
        descripcion: "Vasos desechables transparentes reforzados",
        precioCompra: 6.20,
        precioVenta: 9.00,
        categoriaId: 3,
        categoriaNombre: "Vasos y Copas Descartables",
        marcaId: 3,
        marcaNombre: "Darnel",
        unidadMedidaId: 1,
        stockMinimo: 30,
        stockActual: 18, // ALERTA BAJO STOCK
        stockMaximo: 150,
        ubicacion: "Almacén B - Estante 4",
        estado: true,
        presentaciones: [
          { id: 7, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 1.0, precioCosto: 6.20, precioVenta: 9.00, precioMayorista: 8.20, codigoBarras: "775000300301", esDefault: true },
          { id: 8, nombrePresentacion: "Millar (1000 und)", factorEquivalencia: 10.0, precioCosto: 58.00, precioVenta: 82.00, precioMayorista: 75.00, codigoBarras: "775000300302", esDefault: false }
        ]
      },
      {
        id: 4,
        codigo: "PLAS-004",
        codigoBarras: "775000400401",
        nombre: "Film Plástico / Stretch Film 18 Pulgadas Embalaje",
        descripcion: "Rollo de film estirable para paletizado y protección",
        precioCompra: 27.00,
        precioVenta: 36.00,
        categoriaId: 5,
        categoriaNombre: "Rollos y Embalaje",
        marcaId: 4,
        marcaNombre: "Peruplast",
        unidadMedidaId: 4,
        stockMinimo: 10,
        stockActual: 32,
        stockMaximo: 80,
        ubicacion: "Almacén C - Pallet 1",
        estado: true,
        presentaciones: [
          { id: 10, nombrePresentacion: "Rollo Individual", factorEquivalencia: 1.0, precioCosto: 27.00, precioVenta: 36.00, precioMayorista: 32.50, codigoBarras: "775000400401", esDefault: true },
          { id: 11, nombrePresentacion: "Caja x 4 Rollos", factorEquivalencia: 4.0, precioCosto: 104.00, precioVenta: 138.00, precioMayorista: 125.00, codigoBarras: "775000400402", esDefault: false }
        ]
      },
      {
        id: 5,
        codigo: "PLAS-005",
        codigoBarras: "775000500501",
        nombre: "Cucharas Descartables Blancas Reforzadas",
        descripcion: "Cucharas de poliestireno para postres y comidas",
        precioCompra: 3.80,
        precioVenta: 5.50,
        categoriaId: 4,
        categoriaNombre: "Cubiertos y Cañitas",
        marcaId: 1,
        marcaNombre: "Pamolsa",
        unidadMedidaId: 1,
        stockMinimo: 25,
        stockActual: 9, // ALERTA CRITICA
        stockMaximo: 150,
        ubicacion: "Almacén B - Gaveta 3",
        estado: true,
        presentaciones: [
          { id: 12, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 1.0, precioCosto: 3.80, precioVenta: 5.50, precioMayorista: 4.80, codigoBarras: "775000500501", esDefault: true },
          { id: 13, nombrePresentacion: "Millar (1000 und)", factorEquivalencia: 10.0, precioCosto: 36.00, precioVenta: 50.00, precioMayorista: 45.00, codigoBarras: "775000500502", esDefault: false }
        ]
      },
      {
        id: 6,
        codigo: "PLAS-006",
        codigoBarras: "775000600601",
        nombre: "Bolsa de Basura Negra Extra Pesada 35x40",
        descripcion: "Paquete de bolsas para tachos industriales y residuos",
        precioCompra: 5.50,
        precioVenta: 8.00,
        categoriaId: 1,
        categoriaNombre: "Bolsas Plásticas y Biodegradables",
        marcaId: 5,
        marcaNombre: "Baplast",
        unidadMedidaId: 3,
        stockMinimo: 20,
        stockActual: 64,
        stockMaximo: 180,
        ubicacion: "Almacén A - Estante 4",
        estado: true,
        presentaciones: [
          { id: 14, nombrePresentacion: "Paquete x 10 und", factorEquivalencia: 1.0, precioCosto: 5.50, precioVenta: 8.00, precioMayorista: 7.00, codigoBarras: "775000600601", esDefault: true }
        ]
      },
      {
        id: 7,
        codigo: "PLAS-007",
        codigoBarras: "775000700701",
        nombre: "Contenedor Domo Redondo para Torta Mediana",
        descripcion: "Base negra con tapa domo transparente alta",
        precioCompra: 32.00,
        precioVenta: 44.00,
        categoriaId: 2,
        categoriaNombre: "Envases y Contenedores Térmicos",
        marcaId: 3,
        marcaNombre: "Darnel",
        unidadMedidaId: 1,
        stockMinimo: 15,
        stockActual: 45,
        stockMaximo: 120,
        ubicacion: "Almacén B - Estante 1",
        estado: true,
        presentaciones: [
          { id: 15, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 1.0, precioCosto: 32.00, precioVenta: 44.00, precioMayorista: 39.00, codigoBarras: "775000700701", esDefault: true }
        ]
      },
      {
        id: 8,
        codigo: "PLAS-008",
        codigoBarras: "775000800801",
        nombre: "Balde Plástico 20 Litros con Asa Metálica y Tapa",
        descripcion: "Balde industrial multiusos de alta densidad",
        precioCompra: 15.00,
        precioVenta: 22.00,
        categoriaId: 6,
        categoriaNombre: "Artículos y Menaje Plástico",
        marcaId: 2,
        marcaNombre: "Reyplast",
        unidadMedidaId: 5,
        stockMinimo: 8,
        stockActual: 24,
        stockMaximo: 60,
        ubicacion: "Zona de Menaje - Piso",
        estado: true,
        presentaciones: [
          { id: 16, nombrePresentacion: "Unidad", factorEquivalencia: 1.0, precioCosto: 15.00, precioVenta: 22.00, precioMayorista: 19.50, codigoBarras: "775000800801", esDefault: true }
        ]
      }
    ],
    ventas: [
      {
        id: 1,
        numero: "VNT-000101",
        fecha: new Date(Date.now() - 3600000 * 2).toISOString(),
        clienteId: 2,
        clienteNombre: "Restaurante y Pollería El Buen Gusto S.A.C.",
        usuarioId: 1,
        metodoPagoId: 2,
        metodoPagoNombre: "Billetera Digital (Yape / Plin)",
        subtotal: 70.34,
        igv: 12.66,
        total: 83.00,
        montoRecibido: 83.00,
        vuelto: 0.00,
        estado: "COMPLETADA",
        detalles: [
          { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg", presentacionNombre: "Millar (1000 und)", factorEquivalencia: 1.0, cantidad: 2, precioUnitario: 24.00, subtotal: 48.00 },
          { productoId: 5, productoCodigo: "PLAS-005", productoNombre: "Cucharas Descartables Blancas", presentacionNombre: "Ciento (100 und)", factorEquivalencia: 1.0, cantidad: 2, precioUnitario: 5.50, subtotal: 11.00 },
          { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg", presentacionNombre: "Millar (1000 und)", factorEquivalencia: 1.0, cantidad: 1, precioUnitario: 24.00, subtotal: 24.00 }
        ]
      },
      {
        id: 2,
        numero: "VNT-000102",
        fecha: new Date(Date.now() - 3600000 * 5).toISOString(),
        clienteId: 3,
        clienteNombre: "María Elena Torres Silva (Pastelería Delicias)",
        usuarioId: 1,
        metodoPagoId: 1,
        metodoPagoNombre: "Efectivo",
        subtotal: 61.86,
        igv: 11.14,
        total: 73.00,
        montoRecibido: 100.00,
        vuelto: 27.00,
        estado: "COMPLETADA",
        detalles: [
          { productoId: 2, productoCodigo: "PLAS-002", productoNombre: "Taper Térmico Rectangular CT4", presentacionNombre: "Ciento (100 und)", factorEquivalencia: 1.0, cantidad: 2, precioUnitario: 28.50, subtotal: 57.00 },
          { productoId: 6, productoCodigo: "PLAS-006", productoNombre: "Bolsa de Basura Negra Extra Pesada", presentacionNombre: "Paquete x 10 und", factorEquivalencia: 1.0, cantidad: 2, precioUnitario: 8.00, subtotal: 16.00 }
        ]
      }
    ],
    cotizaciones: [
      {
        id: 1,
        numero: "COT-000101",
        fecha: new Date(Date.now() - 86400000).toISOString(),
        vigenciaDias: 15,
        subtotal: 180.50,
        igv: 32.49,
        total: 212.99,
        estado: "PENDIENTE",
        observaciones: "Cotización para catering y eventos de fin de semana",
        clienteId: 4,
        clienteNombre: "Comercial & Eventos Festiva E.I.R.L.",
        detalles: [
          { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable", presentacionNombre: "Millar", factorEquivalencia: 1.0, cantidad: 5, precioUnitario: 21.00, subtotal: 105.00 },
          { productoId: 3, productoCodigo: "PLAS-003", productoNombre: "Vaso Plástico 10 oz", presentacionNombre: "Ciento", factorEquivalencia: 1.0, cantidad: 10, precioUnitario: 7.55, subtotal: 75.50 }
        ]
      }
    ],
    devoluciones: [
      {
        id: 1,
        numero: "DEV-000101",
        fecha: new Date(Date.now() - 43200000).toISOString(),
        ventaId: 1,
        ventaNumero: "VNT-000101",
        clienteNombre: "Restaurante El Buen Gusto",
        motivo: "Empaque llegó abierto durante el traslado",
        totalDevuelto: 24.00,
        estado: "PROCESADA",
        detalles: [
          { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable", cantidad: 1, precioUnitario: 24.00, subtotal: 24.00 }
        ]
      }
    ],
    compras: [
      {
        id: 1,
        numero: "COM-000101",
        fecha: new Date(Date.now() - 172800000).toISOString(),
        proveedorId: 1,
        proveedorRuc: "20100041235",
        proveedorRazonSocial: "Pamolsa Perú S.A.",
        subtotal: 420.00,
        igv: 75.60,
        total: 495.60,
        estado: "REGISTRADA",
        detalles: [
          { productoId: 2, productoCodigo: "PLAS-002", productoNombre: "Taper Térmico CT4", cantidad: 20, precioUnitario: 21.00, subtotal: 420.00 }
        ]
      }
    ],
    ordenesCompra: [
      {
        id: 1,
        numero: "OC-000101",
        fecha: new Date().toISOString(),
        fechaEsperada: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        proveedorId: 3,
        proveedorRazonSocial: "Baplast Bolsas & Empaques E.I.R.L.",
        subtotal: 350.00,
        igv: 63.00,
        total: 413.00,
        estado: "PENDIENTE",
        observaciones: "Reposición de bolsas camiseta para inicio de mes",
        detalles: [
          { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable", cantidad: 20, precioUnitario: 17.50, subtotal: 350.00 }
        ]
      }
    ],
    cajaActiva: {
      id: 1,
      nombre: "Caja Principal 01",
      fechaApertura: new Date(Date.now() - 28800000).toISOString(),
      fechaCierre: null,
      montoInicial: 150.00,
      totalVentasEfectivo: 73.00,
      totalVentasDigital: 83.00,
      totalIngresos: 156.00,
      totalEgresos: 15.00,
      montoEsperado: 208.00,
      montoContado: null,
      diferencia: 0.00,
      estado: "ABIERTA",
      observaciones: "Turno mañana aperturado con sencillo",
      movimientos: [
        { id: 1, tipo: "APERTURA", concepto: "Fondo inicial de sencillo", monto: 150.00, fecha: new Date(Date.now() - 28800000).toISOString() },
        { id: 2, tipo: "VENTA", concepto: "Venta VNT-000101 (Yape)", monto: 83.00, fecha: new Date(Date.now() - 3600000 * 2).toISOString() },
        { id: 3, tipo: "VENTA", concepto: "Venta VNT-000102 (Efectivo)", monto: 73.00, fecha: new Date(Date.now() - 3600000 * 5).toISOString() },
        { id: 4, tipo: "EGRESO", concepto: "Compra de cinta de embalaje", monto: 15.00, fecha: new Date(Date.now() - 7200000).toISOString() }
      ]
    },
    cuentasCobrar: [
      {
        id: 1,
        ventaId: 1,
        ventaNumero: "VNT-000095",
        clienteId: 2,
        clienteNombre: "Restaurante El Buen Gusto",
        montoTotal: 150.00,
        montoPagado: 50.00,
        saldoPendiente: 100.00,
        fechaEmision: new Date(Date.now() - 86400000 * 4).toISOString(),
        fechaVencimiento: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0],
        estado: "PARCIAL"
      }
    ],
    cuentasPagar: [
      {
        id: 1,
        compraId: 1,
        compraNumero: "COM-000088",
        proveedorId: 1,
        proveedorRazonSocial: "Pamolsa Perú S.A.",
        montoTotal: 495.60,
        montoPagado: 200.00,
        saldoPendiente: 295.60,
        fechaEmision: new Date(Date.now() - 86400000 * 6).toISOString(),
        fechaVencimiento: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
        estado: "PARCIAL"
      }
    ],
    movimientos: [
      { id: 1, tipoMovimiento: "ENTRADA", cantidad: 50, stockAnterior: 60, stockPosterior: 110, motivo: "Recepción de mercadería Baplast - F001-4432", fecha: new Date(Date.now() - 86400000).toISOString(), productoId: 1, productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg", usuarioId: 1 },
      { id: 2, tipoMovimiento: "SALIDA", cantidad: 2, stockAnterior: 112, stockPosterior: 110, motivo: "Venta VNT-000101", fecha: new Date(Date.now() - 3600000 * 2).toISOString(), productoId: 1, productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg", usuarioId: 1 },
      { id: 3, tipoMovimiento: "SALIDA", cantidad: 2, stockAnterior: 87, stockPosterior: 85, motivo: "Venta VNT-000102", fecha: new Date(Date.now() - 3600000 * 5).toISOString(), productoId: 2, productoNombre: "Taper Térmico Rectangular CT4", usuarioId: 1 }
    ],
    auditorias: [
      { id: 1, username: "admin", modulo: "SEGURIDAD", accion: "LOGIN", descripcion: "Inicio de sesión administrativo exitoso", fechaHora: new Date(Date.now() - 3600000 * 8).toISOString(), ipOrigen: "127.0.0.1" },
      { id: 2, username: "admin", modulo: "VENTAS", accion: "REGISTRAR_VENTA", descripcion: "Venta emitida VNT-000101 Total S/ 83.00", fechaHora: new Date(Date.now() - 3600000 * 2).toISOString(), ipOrigen: "127.0.0.1" }
    ]
  };

  // ==================== 2. MOTOR DE ALMACENAMIENTO Y API ====================
  function getStore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInitialData));
      return JSON.parse(JSON.stringify(defaultInitialData));
    }
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInitialData));
      return JSON.parse(JSON.stringify(defaultInitialData));
    }
  }

  function saveStore(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  let isBackendOnline = false;

  async function checkBackend() {
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 1200);
      const res = await fetch(`${API_BASE_URL}/dashboard/resumen`, { signal: c.signal, headers: getAuthHeaders() });
      clearTimeout(t);
      isBackendOnline = res.ok || res.status === 403 || res.status === 401;
    } catch {
      isBackendOnline = false;
    }
    updateConnectionBadge();
    return isBackendOnline;
  }

  function updateConnectionBadge() {
    const badge = document.getElementById('backendStatusBadge');
    if (!badge) return;
    if (isBackendOnline) {
      badge.innerHTML = `<span class="status-dot"></span> Modo En Línea (Spring Boot / MySQL)`;
      badge.style.background = 'var(--success-subtle)';
      badge.style.color = '#065f46';
    } else {
      badge.innerHTML = `<span class="status-dot" style="background:#f59e0b; animation:none;"></span> Modo Portátil / Local (Demostración)`;
      badge.style.background = '#fef3c7';
      badge.style.color = '#92400e';
    }
  }

  // ==================== 3. AUTENTICACIÓN Y SESIONES RBAC ====================
  function getLoggedUser() {
    try {
      const data = sessionStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  function setLoggedUser(user) {
    if (!user) sessionStorage.removeItem(AUTH_KEY);
    else sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  function getAuthHeaders() {
    const usr = getLoggedUser();
    const h = { 'Content-Type': 'application/json' };
    if (usr) {
      h['X-User-Role'] = usr.rolNombre || usr.rol || 'SUPER_ADMIN';
      if (usr.permisos && Array.isArray(usr.permisos)) {
        h['X-User-Permissions'] = usr.permisos.join(',');
      }
    }
    return h;
  }

  function hasPermission(codigo) {
    const usr = getLoggedUser();
    if (!usr) return false;
    if (usr.rolNombre === 'SUPER_ADMIN' || (usr.permisos && usr.permisos.includes('*'))) return true;
    return usr.permisos && usr.permisos.includes(codigo);
  }

  // ==================== 4. ESTADO DE LA APLICACIÓN ====================
  let state = {
    currentView: 'dashboard',
    cart: [],
    selectedPosCategory: '',
    posSearchQuery: '',
    currentUser: null
  };

  // ==================== 5. INICIALIZACIÓN DE LA UI ====================
  function initApp() {
    setupModals();

    const storedUser = getLoggedUser();
    if (!storedUser) {
      showLoginModal(true);
    } else {
      state.currentUser = storedUser;
      showLoginModal(false);
      applyPermissionsToUI();
      updateUserUI();
      switchView('dashboard');
    }

    // Verificar backend asíncronamente
    checkBackend().then(() => {
      if (state.currentUser) {
        renderCurrentView();
      }
    });

    // Auto-focus barcode input in POS
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F2') {
        e.preventDefault();
        switchView('pos');
        const posInput = document.getElementById('searchPosInput');
        if (posInput) posInput.focus();
      }
    });

    // Enter en buscador POS
    const posInput = document.getElementById('searchPosInput');
    if (posInput) {
      posInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          buscarYAgregarPorCodigo(posInput.value.trim());
        }
      });
      posInput.addEventListener('input', (e) => {
        state.posSearchQuery = e.target.value.toLowerCase().trim();
        renderPosProducts();
      });
    }

    // Buscador Inventario
    const invInput = document.getElementById('searchInventarioInput');
    if (invInput) {
      invInput.addEventListener('input', renderInventario);
    }
    const invCat = document.getElementById('filterCategoriaSelect');
    if (invCat) {
      invCat.addEventListener('change', renderInventario);
    }

    // Buscador Ventas
    const vntInput = document.getElementById('searchVentasInput');
    if (vntInput) {
      vntInput.addEventListener('input', renderVentas);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  // ==================== 6. RUTINAS DE AUTENTICACIÓN ====================
  function showLoginModal(show) {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) {
      overlay.style.display = show ? 'flex' : 'none';
    }
    if (show) {
      document.body.classList.remove('is-authenticated');
    } else {
      document.body.classList.add('is-authenticated');
    }
    const alert = document.getElementById('loginAlert');
    if (alert) alert.style.display = 'none';
  }

  async function handleLogin() {
    const userField = document.getElementById('loginUser');
    const passField = document.getElementById('loginPass');
    const alert = document.getElementById('loginAlert');
    const alertText = document.getElementById('loginAlertText');
    const spinner = document.getElementById('loginSpinner');
    const btnText = document.getElementById('btnLoginText');

    const u = userField ? userField.value.trim() : '';
    const p = passField ? passField.value.trim() : '';

    if (!u || !p) {
      if (alert && alertText) {
        alertText.textContent = "Por favor ingrese usuario y contraseña";
        alert.style.display = 'flex';
      }
      return;
    }

    if (spinner) spinner.style.display = 'inline-block';
    if (btnText) btnText.textContent = "Verificando...";

    try {
      let loginData = null;
      if (isBackendOnline) {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: u, contrasena: p })
          });
          if (res.ok) loginData = await res.json();
        } catch (e) {
          console.warn("Fallo login online:", e);
        }
      }

      if (!loginData) {
        // Validación local (demostración / offline)
        const store = getStore();
        const usr = store.usuarios.find(user => user.usuario.toLowerCase() === u.toLowerCase() && user.contrasena === p);
        if (!usr) throw new Error("Credenciales inválidas");
        if (!usr.estado) throw new Error("Usuario inactivo. Contacte al Administrador.");

        const rol = store.roles.find(r => r.id === usr.rolId);
        loginData = {
          id: usr.id,
          usuario: usr.usuario,
          nombres: usr.nombres,
          apellidos: usr.apellidos,
          correo: usr.correo,
          rolId: usr.rolId,
          rolNombre: rol ? rol.nombre : "USUARIO",
          rol: rol ? rol.nombre : "USUARIO",
          permisos: rol ? (rol.permisoCodigos || []) : []
        };
      }

      setLoggedUser(loginData);
      state.currentUser = loginData;
      showLoginModal(false);
      applyPermissionsToUI();
      updateUserUI();
      switchView('dashboard');
      showToast(`Bienvenido(a), ${loginData.nombres || loginData.usuario}!`);
      registrarAuditoria("SEGURIDAD", "LOGIN", `Ingreso al sistema: ${loginData.usuario}`);
    } catch (err) {
      if (alert && alertText) {
        alertText.textContent = err.message || "Usuario o contraseña incorrectos";
        alert.style.display = 'flex';
      }
    } finally {
      if (spinner) spinner.style.display = 'none';
      if (btnText) btnText.textContent = "Ingresar al Sistema";
    }
  }

  function logout() {
    registrarAuditoria("SEGURIDAD", "LOGOUT", `Cierre de sesión de ${state.currentUser?.usuario || 'usuario'}`);
    setLoggedUser(null);
    state.currentUser = null;
    showLoginModal(true);
    const userField = document.getElementById('loginUser');
    const passField = document.getElementById('loginPass');
    if (userField) userField.value = '';
    if (passField) passField.value = '';
  }

  function fillCredentials(user, pass) {
    const userField = document.getElementById('loginUser');
    const passField = document.getElementById('loginPass');
    if (userField) userField.value = user;
    if (passField) passField.value = pass;
    handleLogin();
  }

  function togglePasswordVisibility() {
    const passField = document.getElementById('loginPass');
    if (passField) {
      passField.type = passField.type === 'password' ? 'text' : 'password';
    }
  }

  function updateUserUI() {
    const usr = state.currentUser;
    if (!usr) return;
    const nameElem = document.getElementById('sidebarUserName');
    const avatarElem = document.getElementById('sidebarUserAvatar');
    const roleBadge = document.getElementById('sidebarRoleBadge');

    if (nameElem) nameElem.textContent = `${usr.nombres} ${usr.apellidos || ''}`.trim() || usr.usuario;
    if (avatarElem) {
      const initial = (usr.nombres ? usr.nombres.charAt(0) : usr.usuario.charAt(0)).toUpperCase();
      avatarElem.textContent = initial;
    }
    if (roleBadge) {
      roleBadge.textContent = usr.rolNombre || usr.rol || 'USUARIO';
    }
  }

  function applyPermissionsToUI() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
      const perm = item.getAttribute('data-permission');
      if (perm && !hasPermission(perm)) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    });

    // Ocultar categorías vacías en sidebar
    const categories = document.querySelectorAll('.sidebar-nav .nav-category');
    categories.forEach(cat => {
      let next = cat.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('nav-category')) {
        if (next.classList.contains('nav-item') && next.style.display !== 'none') {
          hasVisible = true;
          break;
        }
        next = next.nextElementSibling;
      }
      cat.style.display = hasVisible ? 'block' : 'none';
    });
  }

  // ==================== 7. CONTROL DE NAVEGACIÓN Y VISTAS ====================
  function switchView(viewName) {
    const targetSection = document.getElementById(`view-${viewName}`);
    if (!targetSection) return;

    // Verificar permiso asociado al nav-item si existe
    const navItem = document.getElementById(`nav-${viewName}`);
    if (navItem) {
      const perm = navItem.getAttribute('data-permission');
      if (perm && !hasPermission(perm)) {
        showToast("No tiene permisos suficientes para acceder a este módulo.", "warning");
        return;
      }
    }

    state.currentView = viewName;

    // Actualizar secciones
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    targetSection.classList.add('active');

    // Actualizar nav active
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => btn.classList.remove('active'));
    if (navItem) navItem.classList.add('active');

    // Títulos de topbar
    updateTopbarTitles(viewName);

    // Renderizar datos correspondientes
    renderCurrentView();
  }

  function updateTopbarTitles(view) {
    const title = document.getElementById('currentViewTitle');
    const subtitle = document.getElementById('currentViewSubtitle');
    const map = {
      dashboard: ["Dashboard General", "Métricas comerciales, rentabilidad e inventario de Plastiquería Jireh"],
      pos: ["Punto de Venta (POS)", "Facturación ágil, lector de código de barras y múltiples presentaciones"],
      ventas: ["Historial de Ventas", "Comprobantes emitidos, notas de venta y anulación de ventas"],
      cotizaciones: ["Cotizaciones Comerciales", "Presupuestos para clientes y conversión directa en ventas"],
      devoluciones: ["Devoluciones de Ventas", "Gestión de devoluciones con restitución automática al kárdex"],
      clientes: ["Directorio de Clientes", "Gestión de clientes minoristas, mayoristas y corporativos"],
      inventario: ["Catálogo de Productos", "Múltiples presentaciones (millar, ciento, paquete, rollo) y control de stock"],
      categorias: ["Categorías y Marcas", "Clasificación de productos y líneas descartables"],
      movimientos: ["Movimientos de Inventario", "Auditoría en tiempo real de entradas, salidas y mermas"],
      kardex: ["Kárdex Valorado", "Control físico y valorización de inventario por producto"],
      compras: ["Registro de Compras", "Ingreso de mercadería por facturas y aumento de inventario"],
      ordenes: ["Órdenes de Compra", "Planificación de reabastecimiento y conversión a compras"],
      proveedores: ["Proveedores", "Directorio de fabricantes de plásticos y empaques"],
      caja: ["Control de Caja y Arqueo", "Apertura de turno, ingresos/egresos y balance de efectivo contado"],
      'cuentas-cobrar': ["Cuentas por Cobrar", "Control de créditos a clientes y registro de abonos"],
      'cuentas-pagar': ["Cuentas por Pagar", "Obligaciones con proveedores y pagos realizados"],
      reportes: ["Centro de Reportes", "Ventas, valorización de inventario y utilidad bruta real"],
      usuarios: ["Gestión de Usuarios", "Cuentas de acceso, credenciales y asignación de roles"],
      roles: ["Roles y Permisos (RBAC)", "Configuración granular de privilegios y seguridad"],
      auditoria: ["Auditoría del Sistema", "Historial inmutable de operaciones y eventos críticos"],
      empresa: ["Configuración de Empresa", "Datos comerciales, RUC, impuestos y pie de ticket"]
    };
    if (map[view] && title && subtitle) {
      title.textContent = map[view][0];
      subtitle.textContent = map[view][1];
    }
  }

  function toggleSidebar() {
    const s = document.getElementById('mainSidebar');
    if (s) s.classList.toggle('collapsed');
  }

  function renderCurrentView() {
    switch (state.currentView) {
      case 'dashboard': renderDashboard(); break;
      case 'pos': renderPos(); break;
      case 'ventas': renderVentas(); break;
      case 'cotizaciones': renderCotizaciones(); break;
      case 'devoluciones': renderDevoluciones(); break;
      case 'clientes': renderClientes(); break;
      case 'inventario': renderInventario(); break;
      case 'categorias': renderCategorias(); break;
      case 'movimientos': renderMovimientos(); break;
      case 'kardex': renderKardex(); break;
      case 'compras': renderCompras(); break;
      case 'ordenes': renderOrdenes(); break;
      case 'proveedores': renderProveedores(); break;
      case 'caja': renderCaja(); break;
      case 'cuentas-cobrar': renderCuentasCobrar(); break;
      case 'cuentas-pagar': renderCuentasPagar(); break;
      case 'reportes': renderReportes(); break;
      case 'usuarios': renderUsuarios(); break;
      case 'roles': renderRoles(); break;
      case 'auditoria': renderAuditoria(); break;
      case 'empresa': renderEmpresa(); break;
    }
  }

  // ==================== 8. RENDERIZADORES DE MÓDULOS ====================

  // ----- 8.1 DASHBOARD -----
  function renderDashboard() {
    const store = getStore();
    const hoyStr = new Date().toISOString().split('T')[0];

    const ventasCompletadas = store.ventas.filter(v => v.estado === 'COMPLETADA');
    const ventasHoy = ventasCompletadas.filter(v => v.fecha && v.fecha.startsWith(hoyStr));
    const totalHoy = ventasHoy.reduce((s, v) => s + (v.total || 0), 0);
    const totalMes = ventasCompletadas.reduce((s, v) => s + (v.total || 0), 0);

    // Utilidad real = Suma de (precioVenta - costo) de cada item vendido
    let utilidadReal = 0;
    ventasCompletadas.forEach(v => {
      (v.detalles || []).forEach(d => {
        const prod = store.productos.find(p => p.id === d.productoId);
        const costoBase = prod ? prod.precioCompra : (d.precioUnitario * 0.7);
        const gananciaItem = (d.precioUnitario - costoBase) * d.cantidad;
        utilidadReal += Math.max(0, gananciaItem);
      });
    });

    const stockBajoCount = store.productos.filter(p => p.stockActual <= p.stockMinimo && p.estado).length;
    const invValor = store.productos.reduce((s, p) => s + (p.stockActual * p.precioCompra), 0);

    const kpiVentas = document.getElementById('kpiTotalVentas');
    if (kpiVentas) kpiVentas.textContent = `S/ ${totalHoy.toFixed(2)}`;
    const kpiMes = document.getElementById('kpiVentasMes');
    if (kpiMes) kpiMes.textContent = `S/ ${totalMes.toFixed(2)}`;
    const kpiUtil = document.getElementById('kpiUtilidadMes');
    if (kpiUtil) kpiUtil.textContent = `S/ ${utilidadReal.toFixed(2)}`;
    const kpiAlerta = document.getElementById('kpiStockAlerta');
    if (kpiAlerta) kpiAlerta.textContent = stockBajoCount;
    const kpiInv = document.getElementById('kpiInventarioValor');
    if (kpiInv) kpiInv.textContent = `S/ ${invValor.toFixed(2)}`;

    // Créditos
    const saldocc = store.cuentasCobrar.filter(c => c.estado !== 'PAGADA').reduce((s, c) => s + c.saldoPendiente, 0);
    const saldocp = store.cuentasPagar.filter(c => c.estado !== 'PAGADA').reduce((s, c) => s + c.saldoPendiente, 0);
    const dashCC = document.getElementById('dashCuentasCobrar');
    if (dashCC) dashCC.textContent = `S/ ${saldocc.toFixed(2)}`;
    const dashCP = document.getElementById('dashCuentasPagar');
    if (dashCP) dashCP.textContent = `S/ ${saldocp.toFixed(2)}`;

    // Tabla Alertas Stock
    const tbodyAlertas = document.getElementById('dashboardAlertasStockTable');
    if (tbodyAlertas) {
      const prodsAlerta = store.productos.filter(p => p.stockActual <= p.stockMinimo).slice(0, 5);
      if (prodsAlerta.length === 0) {
        tbodyAlertas.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">🟢 No hay alertas de stock bajo actualmente</td></tr>`;
      } else {
        tbodyAlertas.innerHTML = prodsAlerta.map(p => `
          <tr>
            <td><code>${p.codigo}</code></td>
            <td><strong>${p.nombre}</strong></td>
            <td style="font-weight:700; color:${p.stockActual <= 0 ? 'var(--danger)' : 'var(--warning)'};">${p.stockActual}</td>
            <td>${p.stockMinimo}</td>
            <td><span class="badge-stock ${p.stockActual <= 0 ? 'badge-stock-agotado' : 'badge-stock-bajo'}">${p.stockActual <= 0 ? '🔴 AGOTADO' : '🟡 STOCK BAJO'}</span></td>
          </tr>
        `).join('');
      }
    }

    // Tabla Últimas Ventas
    const tbodyVentas = document.getElementById('dashboardUltimasVentasTable');
    if (tbodyVentas) {
      const ultimas = store.ventas.slice(0, 5);
      tbodyVentas.innerHTML = ultimas.map(v => `
        <tr>
          <td><strong>${v.numero}</strong></td>
          <td>${formatearFechaCorta(v.fecha)}</td>
          <td>${v.clienteNombre || 'Consumidor Final'}</td>
          <td style="font-weight:800; color:var(--primary);">S/ ${(v.total || 0).toFixed(2)}</td>
          <td><span class="badge badge-${v.estado === 'COMPLETADA' ? 'success' : 'warning'}">${v.estado}</span></td>
        </tr>
      `).join('');
    }
  }

  // ----- 8.2 PUNTO DE VENTA (POS) -----
  function renderPos() {
    renderPosCategoryPills();
    renderPosProducts();
    renderPosSelects();
    renderCart();
  }

  function renderPosCategoryPills() {
    const store = getStore();
    const container = document.getElementById('posCategoryPills');
    if (!container) return;
    const pills = store.categorias.map(c => `
      <button class="btn-secondary ${state.selectedPosCategory === c.id ? 'active' : ''}" 
              onclick="window.app.filterPosByCategory(${c.id})" 
              style="font-size:0.75rem; padding:0.35rem 0.75rem; white-space:nowrap;">
        ${c.nombre}
      </button>
    `).join('');
    container.innerHTML = `
      <button class="btn-secondary ${state.selectedPosCategory === '' ? 'active' : ''}" 
              onclick="window.app.filterPosByCategory('')" 
              style="font-size:0.75rem; padding:0.35rem 0.75rem;">
        Todos
      </button>
      ${pills}
    `;
  }

  function filterPosByCategory(catId) {
    state.selectedPosCategory = catId ? Number(catId) : '';
    renderPosCategoryPills();
    renderPosProducts();
  }

  function renderPosProducts() {
    const store = getStore();
    const grid = document.getElementById('posProductsGrid');
    if (!grid) return;

    let prods = store.productos.filter(p => p.estado);
    if (state.selectedPosCategory) {
      prods = prods.filter(p => p.categoriaId === state.selectedPosCategory);
    }
    if (state.posSearchQuery) {
      prods = prods.filter(p =>
        p.nombre.toLowerCase().includes(state.posSearchQuery) ||
        (p.codigo && p.codigo.toLowerCase().includes(state.posSearchQuery)) ||
        (p.codigoBarras && p.codigoBarras.toLowerCase().includes(state.posSearchQuery))
      );
    }

    if (prods.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No se encontraron productos en el catálogo</div>`;
      return;
    }

    grid.innerHTML = prods.map(p => {
      const presOptions = (p.presentaciones || []).map((pr, idx) => `
        <option value="${pr.id}" data-precio="${pr.precioVenta}" data-factor="${pr.factorEquivalencia}">
          ${pr.nombrePresentacion} — S/ ${pr.precioVenta.toFixed(2)}
        </option>
      `).join('');

      return `
        <div class="pos-product-card" id="pos-card-${p.id}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <span class="badge" style="font-size:0.7rem; background:#f1f5f9; color:#475569;">${p.codigo}</span>
            <span class="badge-stock ${p.stockActual <= 0 ? 'badge-stock-agotado' : (p.stockActual <= p.stockMinimo ? 'badge-stock-bajo' : 'badge-stock-normal')}">
              Stock: ${p.stockActual}
            </span>
          </div>
          <h4 style="font-size:0.88rem; font-weight:700; margin:0.4rem 0 0.2rem 0; min-height:2.4rem; line-height:1.2;">${p.nombre}</h4>
          
          <div class="pos-card-presentations">
            <label style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">Presentación / Unidad:</label>
            <select class="pos-presentation-select" id="pos-pres-select-${p.id}">
              ${presOptions || `<option value="0" data-precio="${p.precioVenta}" data-factor="1">Unidad Base — S/ ${p.precioVenta.toFixed(2)}</option>`}
            </select>
          </div>

          <button class="btn-primary" style="width:100%; margin-top:0.6rem; justify-content:center; font-size:0.8rem; padding:0.45rem;"
                  onclick="window.app.addPosCardToCart(${p.id})">
            + Agregar al Carrito
          </button>
        </div>
      `;
    }).join('');
  }

  function buscarYAgregarPorCodigo(code) {
    if (!code) return;
    const store = getStore();
    const prod = store.productos.find(p =>
      p.estado && (
        (p.codigoBarras && p.codigoBarras.toLowerCase() === code.toLowerCase()) ||
        (p.codigo && p.codigo.toLowerCase() === code.toLowerCase()) ||
        (p.presentaciones && p.presentaciones.some(pr => pr.codigoBarras && pr.codigoBarras.toLowerCase() === code.toLowerCase()))
      )
    );

    if (prod) {
      // Si la coincidencia fue por código de barras de una presentación específica, seleccionarla
      let presId = null;
      if (prod.presentaciones) {
        const matchedPres = prod.presentaciones.find(pr => pr.codigoBarras && pr.codigoBarras.toLowerCase() === code.toLowerCase());
        if (matchedPres) presId = matchedPres.id;
      }
      addToCart(prod.id, presId);
      const input = document.getElementById('searchPosInput');
      if (input) input.value = '';
      state.posSearchQuery = '';
      renderPosProducts();
      showToast(`Agregado: ${prod.nombre}`);
    } else {
      showToast("Producto o código de barras no encontrado", "warning");
    }
  }

  function addPosCardToCart(productId) {
    const sel = document.getElementById(`pos-pres-select-${productId}`);
    const presId = sel ? Number(sel.value) : null;
    addToCart(productId, presId);
  }

  function addToCart(productId, presentationId) {
    const store = getStore();
    const prod = store.productos.find(p => p.id === productId);
    if (!prod) return;

    let pres = null;
    if (prod.presentaciones && prod.presentaciones.length > 0) {
      if (presentationId) {
        pres = prod.presentaciones.find(pr => pr.id === presentationId);
      }
      if (!pres) pres = prod.presentaciones.find(pr => pr.esDefault) || prod.presentaciones[0];
    }

    const presNombre = pres ? pres.nombrePresentacion : "Unidad";
    const precio = pres ? pres.precioVenta : prod.precioVenta;
    const factor = pres ? pres.factorEquivalencia : 1.0;

    // Verificar si ya existe en el carrito la misma presentación
    const existing = state.cart.find(item => item.productoId === productId && item.presentacionId === (pres ? pres.id : 0));
    const cantActual = existing ? existing.cantidad : 0;
    const baseRequerida = (cantActual + 1) * factor;

    if (prod.stockActual < baseRequerida) {
      showToast(`Stock insuficiente. Solo quedan ${prod.stockActual} unidades disponibles.`, "warning");
      return;
    }

    if (existing) {
      existing.cantidad += 1;
      existing.subtotal = existing.cantidad * existing.precioUnitario;
    } else {
      state.cart.push({
        productoId: prod.id,
        productoCodigo: prod.codigo,
        productoNombre: prod.nombre,
        presentacionId: pres ? pres.id : 0,
        presentacionNombre: presNombre,
        factorEquivalencia: factor,
        precioUnitario: precio,
        cantidad: 1,
        subtotal: precio
      });
    }

    renderCart();
  }

  function updateCartQty(idx, delta) {
    const item = state.cart[idx];
    if (!item) return;
    const store = getStore();
    const prod = store.productos.find(p => p.id === item.productoId);

    const nuevaCant = item.cantidad + delta;
    if (nuevaCant <= 0) {
      state.cart.splice(idx, 1);
    } else {
      const baseRequerida = nuevaCant * item.factorEquivalencia;
      if (prod && prod.stockActual < baseRequerida) {
        showToast(`Stock insuficiente para '${prod.nombre}'. Disponible: ${prod.stockActual}`, "warning");
        return;
      }
      item.cantidad = nuevaCant;
      item.subtotal = item.cantidad * item.precioUnitario;
    }
    renderCart();
  }

  function removeFromCart(idx) {
    state.cart.splice(idx, 1);
    renderCart();
  }

  function renderCart() {
    const list = document.getElementById('cartItemsList');
    if (!list) return;

    if (state.cart.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:2.5rem 1rem;color:var(--text-muted);">Carrito vacío. Escanee o seleccione artículos.</div>`;
      updateCartTotals(0);
      const btn = document.getElementById('btnFinalizarVenta');
      if (btn) btn.disabled = true;
      return;
    }

    list.innerHTML = state.cart.map((it, idx) => `
      <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid #f1f5f9;">
        <div style="flex:1; min-width:0; padding-right:0.5rem;">
          <div style="font-weight:700; font-size:0.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${it.productoNombre}</div>
          <div style="font-size:0.72rem; color:var(--text-muted);">${it.presentacionNombre} | S/ ${it.precioUnitario.toFixed(2)}</div>
        </div>
        <div style="display:flex; align-items:center; gap:0.35rem;">
          <button class="btn-secondary" style="padding:0.15rem 0.45rem; font-size:0.75rem;" onclick="window.app.updateCartQty(${idx}, -1)">-</button>
          <span style="font-weight:800; font-size:0.85rem; width:20px; text-align:center;">${it.cantidad}</span>
          <button class="btn-secondary" style="padding:0.15rem 0.45rem; font-size:0.75rem;" onclick="window.app.updateCartQty(${idx}, 1)">+</button>
        </div>
        <div style="text-align:right; min-width:65px; font-weight:800; font-size:0.85rem; color:var(--primary);">
          S/ ${it.subtotal.toFixed(2)}
        </div>
        <button class="btn-secondary" style="padding:0.15rem 0.4rem; color:var(--danger); border:none;" onclick="window.app.removeFromCart(${idx})">✕</button>
      </div>
    `).join('');

    const total = state.cart.reduce((s, it) => s + it.subtotal, 0);
    updateCartTotals(total);
    const btn = document.getElementById('btnFinalizarVenta');
    if (btn) btn.disabled = false;
  }

  function updateCartTotals(total) {
    const subtotal = total / 1.18;
    const igv = total - subtotal;

    const subElem = document.getElementById('cartSubtotal');
    if (subElem) subElem.textContent = `S/ ${subtotal.toFixed(2)}`;
    const igvElem = document.getElementById('cartIgv');
    if (igvElem) igvElem.textContent = `S/ ${igv.toFixed(2)}`;
    const totElem = document.getElementById('cartTotal');
    if (totElem) totElem.textContent = `S/ ${total.toFixed(2)}`;

    calcularVuelto();
  }

  function calcularVuelto() {
    const total = state.cart.reduce((s, it) => s + it.subtotal, 0);
    const inputRecibido = document.getElementById('posMontoRecibido');
    const labelVuelto = document.getElementById('posVueltoLabel');
    if (!labelVuelto) return;

    const recibido = inputRecibido ? parseFloat(inputRecibido.value) || 0 : 0;
    const vuelto = Math.max(0, recibido - total);
    labelVuelto.textContent = `S/ ${vuelto.toFixed(2)}`;
  }

  function onPaymentMethodChange() {
    const sel = document.getElementById('posMetodoPagoSelect');
    const cashCard = document.getElementById('posCashCalcCard');
    if (sel && cashCard) {
      cashCard.style.display = sel.value === '1' ? 'block' : 'none';
    }
  }

  function renderPosSelects() {
    const store = getStore();
    const cliSel = document.getElementById('posClienteSelect');
    if (cliSel) {
      cliSel.innerHTML = `
        <option value="0">Consumidor Final (Venta Rápida)</option>
        ${store.clientes.map(c => `
          <option value="${c.id}">${c.razonSocial || `${c.nombres} ${c.apellidos}`.trim()} (${c.numeroDocumento || 'S/D'})</option>
        `).join('')}
      `;
    }

    const metSel = document.getElementById('posMetodoPagoSelect');
    if (metSel) {
      metSel.innerHTML = store.metodosPago.map(m => `
        <option value="${m.id}">${m.nombre}</option>
      `).join('');
      onPaymentMethodChange();
    }
  }

  async function procesarVenta() {
    if (state.cart.length === 0) return;
    const cliSel = document.getElementById('posClienteSelect');
    const metSel = document.getElementById('posMetodoPagoSelect');
    const recInput = document.getElementById('posMontoRecibido');

    const total = state.cart.reduce((s, it) => s + it.subtotal, 0);
    const subtotal = total / 1.18;
    const igv = total - subtotal;
    const clienteId = cliSel ? Number(cliSel.value) : 0;
    const metodoId = metSel ? Number(metSel.value) : 1;
    const montoRecibido = metodoId === 1 ? (parseFloat(recInput.value) || total) : total;
    const vuelto = Math.max(0, montoRecibido - total);

    const store = getStore();
    const cli = store.clientes.find(c => c.id === clienteId);
    const clienteNombre = cli ? (cli.razonSocial || `${cli.nombres} ${cli.apellidos}`.trim()) : "Consumidor Final";

    // Validar que la caja esté abierta si cobra en efectivo
    if (metodoId === 1 && (!store.cajaActiva || store.cajaActiva.estado !== 'ABIERTA')) {
      showToast("Debe aperturar la caja del día antes de cobrar en efectivo.", "warning");
      switchView('caja');
      return;
    }

    const payload = {
      clienteId: clienteId || null,
      clienteNombre: clienteNombre,
      metodoPagoId: metodoId,
      subtotal: subtotal,
      igv: igv,
      total: total,
      montoRecibido: montoRecibido,
      vuelto: vuelto,
      detalles: state.cart.map(it => ({
        productoId: it.productoId,
        productoCodigo: it.productoCodigo,
        productoNombre: it.productoNombre,
        presentacionNombre: it.presentacionNombre,
        factorEquivalencia: it.factorEquivalencia,
        cantidad: it.cantidad,
        precioUnitario: it.precioUnitario,
        subtotal: it.subtotal
      }))
    };

    try {
      // Intentar online si está disponible
      if (isBackendOnline) {
        try {
          const res = await fetch(`${API_BASE_URL}/ventas`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
          });
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Error al emitir venta en backend");
          }
        } catch (e) {
          console.warn("Fallo post venta online, procesando offline:", e);
        }
      }

      // Procesar localmente
      const ventaId = Date.now();
      const numVenta = `VNT-${String(store.ventas.length + 101).padStart(6, '0')}`;
      const nuevaVenta = {
        id: ventaId,
        numero: numVenta,
        fecha: new Date().toISOString(),
        clienteId: clienteId,
        clienteNombre: clienteNombre,
        usuarioId: state.currentUser ? state.currentUser.id : 1,
        metodoPagoId: metodoId,
        metodoPagoNombre: store.metodosPago.find(m => m.id === metodoId)?.nombre || 'Efectivo',
        subtotal: subtotal,
        igv: igv,
        total: total,
        montoRecibido: montoRecibido,
        vuelto: vuelto,
        estado: "COMPLETADA",
        detalles: payload.detalles
      };

      // Descontar inventario y generar movimientos Kardex
      payload.detalles.forEach(it => {
        const prod = store.productos.find(p => p.id === it.productoId);
        if (prod) {
          const baseQty = it.cantidad * it.factorEquivalencia;
          const ant = prod.stockActual;
          prod.stockActual = Math.max(0, prod.stockActual - baseQty);
          store.movimientos.unshift({
            id: Date.now() + Math.floor(Math.random() * 1000),
            tipoMovimiento: "SALIDA",
            cantidad: baseQty,
            stockAnterior: ant,
            stockPosterior: prod.stockActual,
            motivo: `Venta POS ${numVenta} (${it.presentacionNombre})`,
            fecha: new Date().toISOString(),
            productoId: prod.id,
            productoNombre: prod.nombre,
            usuarioId: state.currentUser ? state.currentUser.id : 1
          });
        }
      });

      // Impacto en caja activa
      if (store.cajaActiva && store.cajaActiva.estado === 'ABIERTA') {
        if (metodoId === 1) {
          store.cajaActiva.totalVentasEfectivo += total;
          store.cajaActiva.montoEsperado += total;
        } else {
          store.cajaActiva.totalVentasDigital += total;
        }
        store.cajaActiva.totalIngresos += total;
        store.cajaActiva.movimientos.push({
          id: Date.now(),
          tipo: "VENTA",
          concepto: `Venta ${numVenta} (${nuevaVenta.metodoPagoNombre})`,
          monto: total,
          fecha: new Date().toISOString()
        });
      }

      // Si es a crédito
      if (metodoId === 5) {
        store.cuentasCobrar.unshift({
          id: Date.now(),
          ventaId: ventaId,
          ventaNumero: numVenta,
          clienteId: clienteId,
          clienteNombre: clienteNombre,
          montoTotal: total,
          montoPagado: 0.00,
          saldoPendiente: total,
          fechaEmision: new Date().toISOString(),
          fechaVencimiento: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
          estado: "PENDIENTE"
        });
      }

      store.ventas.unshift(nuevaVenta);
      saveStore(store);

      showToast(`¡Venta ${numVenta} emitida exitosamente!`);
      mostrarTicketModal(nuevaVenta);

      // Limpiar carrito
      state.cart = [];
      renderCart();
      if (recInput) recInput.value = '';
    } catch (err) {
      showToast(err.message || "Error al procesar la venta", "warning");
    }
  }

  function mostrarTicketModal(venta) {
    const store = getStore();
    const cfg = store.empresaConfig || defaultInitialData.empresaConfig;
    const content = document.getElementById('ticketModalContent');
    if (!content) return;

    content.innerHTML = `
      <div style="font-family:'Courier New', monospace; font-size:0.8rem; line-height:1.3; color:#0f172a; padding:0.5rem;">
        <div style="text-align:center; margin-bottom:0.75rem;">
          <h3 style="font-size:1.05rem; font-weight:800; margin:0;">${cfg.nombreComercial}</h3>
          <p style="margin:0; font-size:0.75rem;">${cfg.razonSocial}</p>
          <p style="margin:0; font-size:0.75rem;">RUC: ${cfg.ruc}</p>
          <p style="margin:0; font-size:0.72rem;">${cfg.direccion}</p>
          <p style="margin:0; font-size:0.72rem;">Telf: ${cfg.telefono}</p>
        </div>
        <div style="border-top:1px dashed #94a3b8; border-bottom:1px dashed #94a3b8; padding:0.4rem 0; margin-bottom:0.5rem;">
          <div><strong>VENTA:</strong> ${venta.numero}</div>
          <div><strong>FECHA:</strong> ${formatearFecha(venta.fecha)}</div>
          <div><strong>CLIENTE:</strong> ${venta.clienteNombre}</div>
          <div><strong>MÉTODO:</strong> ${venta.metodoPagoNombre || 'Efectivo'}</div>
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:0.5rem; font-size:0.75rem;">
          <thead>
            <tr style="border-bottom:1px solid #cbd5e1; text-align:left;">
              <th>Cant/Pres</th>
              <th>Descripción</th>
              <th style="text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${venta.detalles.map(d => `
              <tr>
                <td>${d.cantidad} x ${d.presentacionNombre || 'UND'}</td>
                <td>${d.productoNombre}</td>
                <td style="text-align:right;">S/ ${d.subtotal.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="border-top:1px dashed #94a3b8; padding-top:0.4rem; font-size:0.82rem;">
          <div style="display:flex; justify-content:space-between;">
            <span>Op. Gravada:</span>
            <span>S/ ${(venta.subtotal || 0).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>I.G.V. (18%):</span>
            <span>S/ ${(venta.igv || 0).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.95rem; margin-top:0.25rem;">
            <span>TOTAL:</span>
            <span>S/ ${(venta.total || 0).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:0.2rem;">
            <span>Recibido:</span>
            <span>S/ ${(venta.montoRecibido || venta.total).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--success);">
            <span>Vuelto:</span>
            <span>S/ ${(venta.vuelto || 0).toFixed(2)}</span>
          </div>
        </div>
        <div style="text-align:center; margin-top:1rem; border-top:1px dashed #94a3b8; padding-top:0.5rem; font-size:0.72rem;">
          <p style="margin:0;">${cfg.mensajeTicket}</p>
        </div>
      </div>
    `;

    openModal('modalTicket');
  }

  // ----- 8.3 HISTORIAL DE VENTAS -----
  function renderVentas() {
    const store = getStore();
    const tbody = document.getElementById('ventasTableBody');
    if (!tbody) return;

    const q = (document.getElementById('searchVentasInput')?.value || '').toLowerCase().trim();
    let list = store.ventas;
    if (q) {
      list = list.filter(v => v.numero.toLowerCase().includes(q) || (v.clienteNombre && v.clienteNombre.toLowerCase().includes(q)));
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No se encontraron registros de ventas</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(v => `
      <tr>
        <td><strong>${v.numero}</strong></td>
        <td>${formatearFecha(v.fecha)}</td>
        <td>${v.clienteNombre || 'Consumidor Final'}</td>
        <td><span class="badge" style="background:#f1f5f9; color:#334155;">${v.metodoPagoNombre || 'Efectivo'}</span></td>
        <td style="font-weight:800; color:var(--primary);">S/ ${v.total.toFixed(2)}</td>
        <td><span class="badge badge-${v.estado === 'COMPLETADA' ? 'success' : (v.estado === 'ANULADA' ? 'danger' : 'warning')}">${v.estado}</span></td>
        <td>
          <button class="btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="window.app.verTicketVenta(${v.id})">🧾 Ticket</button>
          ${v.estado === 'COMPLETADA' && hasPermission('VENTA_ANULAR') ? `
            <button class="btn-secondary" style="padding:0.25rem 0.5rem; font-size:0.75rem; color:var(--danger);" onclick="window.app.confirmarAnularVenta(${v.id})">✕ Anular</button>
          ` : ''}
        </td>
      </tr>
    `).join('');
  }

  function verTicketVenta(id) {
    const store = getStore();
    const v = store.ventas.find(vt => vt.id === id);
    if (v) mostrarTicketModal(v);
  }

  function confirmarAnularVenta(id) {
    const store = getStore();
    const v = store.ventas.find(vt => vt.id === id);
    if (!v) return;

    const motivo = prompt(`¿Está seguro de ANULAR la venta ${v.numero}? Ingrese el motivo:`, "Error de digitación / Devolución inmediata");
    if (!motivo) return;

    v.estado = "ANULADA";
    v.motivoAnulacion = motivo;

    // Retorno al inventario
    (v.detalles || []).forEach(d => {
      const prod = store.productos.find(p => p.id === d.productoId);
      if (prod) {
        const qty = d.cantidad * (d.factorEquivalencia || 1.0);
        const ant = prod.stockActual;
        prod.stockActual += qty;
        store.movimientos.unshift({
          id: Date.now() + Math.floor(Math.random() * 100),
          tipoMovimiento: "ENTRADA",
          cantidad: qty,
          stockAnterior: ant,
          stockPosterior: prod.stockActual,
          motivo: `Anulación de Venta ${v.numero}: ${motivo}`,
          fecha: new Date().toISOString(),
          productoId: prod.id,
          productoNombre: prod.nombre,
          usuarioId: state.currentUser ? state.currentUser.id : 1
        });
      }
    });

    registrarAuditoria("VENTAS", "ANULAR_VENTA", `Anulación de ${v.numero}: ${motivo}`);
    saveStore(store);
    showToast(`Venta ${v.numero} anulada. Mercadería restituida a inventario.`);
    renderVentas();
  }

  // ----- 8.4 COTIZACIONES -----
  function renderCotizaciones() {
    const store = getStore();
    const tbody = document.getElementById('cotizacionesTableBody');
    if (!tbody) return;

    if (store.cotizaciones.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No hay cotizaciones registradas</td></tr>`;
      return;
    }

    tbody.innerHTML = store.cotizaciones.map(c => `
      <tr>
        <td><strong>${c.numero}</strong></td>
        <td>${formatearFechaCorta(c.fecha)}</td>
        <td>${c.clienteNombre}</td>
        <td>${c.vigenciaDias || 15} días</td>
        <td style="font-weight:800; color:var(--primary);">S/ ${c.total.toFixed(2)}</td>
        <td><span class="badge badge-${c.estado === 'PENDIENTE' ? 'warning' : 'success'}">${c.estado}</span></td>
        <td>
          ${c.estado === 'PENDIENTE' ? `
            <button class="btn-primary" style="padding:0.25rem 0.55rem; font-size:0.75rem;" onclick="window.app.convertirCotizacion(${c.id})">⚡ Convertir en Venta</button>
          ` : '<span style="color:var(--text-muted);font-size:0.75rem;">Procesada</span>'}
        </td>
      </tr>
    `).join('');

    // Rellenar selectores del modal de cotizaciones
    const selCli = document.getElementById('modalCotCliente');
    if (selCli) {
      selCli.innerHTML = store.clientes.map(cl => `<option value="${cl.id}">${cl.razonSocial || `${cl.nombres} ${cl.apellidos}`}</option>`).join('');
    }
    const selProd = document.getElementById('modalCotProducto');
    if (selProd) {
      selProd.innerHTML = store.productos.filter(p => p.estado).map(pr => `<option value="${pr.id}">${pr.nombre} (S/ ${pr.precioVenta.toFixed(2)})</option>`).join('');
    }
  }

  function crearNuevaCotizacion() {
    const store = getStore();
    const cliId = Number(document.getElementById('modalCotCliente').value);
    const prodId = Number(document.getElementById('modalCotProducto').value);
    const cant = Number(document.getElementById('modalCotCantidad').value) || 1;
    const obs = document.getElementById('modalCotObs').value;

    const cli = store.clientes.find(c => c.id === cliId);
    const prod = store.productos.find(p => p.id === prodId);

    const sub = prod.precioVenta * cant;
    const num = `COT-${String(store.cotizaciones.length + 101).padStart(6, '0')}`;

    store.cotizaciones.unshift({
      id: Date.now(),
      numero: num,
      fecha: new Date().toISOString(),
      vigenciaDias: 15,
      subtotal: sub / 1.18,
      igv: sub - (sub / 1.18),
      total: sub,
      estado: "PENDIENTE",
      observaciones: obs,
      clienteId: cliId,
      clienteNombre: cli ? (cli.razonSocial || `${cli.nombres} ${cli.apellidos}`) : "Cliente",
      detalles: [
        {
          productoId: prod.id,
          productoCodigo: prod.codigo,
          productoNombre: prod.nombre,
          presentacionNombre: "Unidad Base",
          factorEquivalencia: 1.0,
          cantidad: cant,
          precioUnitario: prod.precioVenta,
          subtotal: sub
        }
      ]
    });

    saveStore(store);
    closeModal('modalNuevaCotizacion');
    showToast(`Cotización ${num} registrada`);
    renderCotizaciones();
  }

  function convertirCotizacion(id) {
    const store = getStore();
    const cot = store.cotizaciones.find(c => c.id === id);
    if (!cot) return;

    // Cargar directamente al carrito de POS y abrir POS
    state.cart = cot.detalles.map(d => ({ ...d }));
    switchView('pos');
    cot.estado = "CONVERTIDA_EN_VENTA";
    saveStore(store);
    showToast(`Cotización ${cot.numero} cargada al carrito del POS`);
  }

  // ----- 8.5 DEVOLUCIONES -----
  function renderDevoluciones() {
    const store = getStore();
    const tbody = document.getElementById('devolucionesTableBody');
    if (!tbody) return;

    if (store.devoluciones.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No hay devoluciones registradas</td></tr>`;
      return;
    }

    tbody.innerHTML = store.devoluciones.map(d => `
      <tr>
        <td><strong>${d.numero}</strong></td>
        <td>${formatearFecha(d.fecha)}</td>
        <td>${d.ventaNumero}</td>
        <td>${d.clienteNombre}</td>
        <td style="font-weight:800; color:var(--danger);">S/ ${d.totalDevuelto.toFixed(2)}</td>
        <td>${d.motivo}</td>
        <td><span class="badge badge-success">${d.estado}</span></td>
      </tr>
    `).join('');

    const selVenta = document.getElementById('modalDevVenta');
    if (selVenta) {
      selVenta.innerHTML = store.ventas.filter(v => v.estado === 'COMPLETADA').map(v => `
        <option value="${v.id}">${v.numero} — ${v.clienteNombre} (S/ ${v.total.toFixed(2)})</option>
      `).join('');
    }
  }

  function procesarDevolucion() {
    const store = getStore();
    const vId = Number(document.getElementById('modalDevVenta').value);
    const cant = Number(document.getElementById('modalDevCantidad').value) || 1;
    const monto = parseFloat(document.getElementById('modalDevMonto').value) || 0;
    const motivo = document.getElementById('modalDevMotivo').value;

    const v = store.ventas.find(vt => vt.id === vId);
    if (!v) return;

    const num = `DEV-${String(store.devoluciones.length + 101).padStart(6, '0')}`;
    const firstItem = (v.detalles && v.detalles[0]) || { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Artículo" };

    // Restituir mercadería
    const prod = store.productos.find(p => p.id === firstItem.productoId);
    if (prod) {
      const ant = prod.stockActual;
      prod.stockActual += cant;
      store.movimientos.unshift({
        id: Date.now(),
        tipoMovimiento: "ENTRADA",
        cantidad: cant,
        stockAnterior: ant,
        stockPosterior: prod.stockActual,
        motivo: `Devolución ${num} de Venta ${v.numero}: ${motivo}`,
        fecha: new Date().toISOString(),
        productoId: prod.id,
        productoNombre: prod.nombre,
        usuarioId: state.currentUser ? state.currentUser.id : 1
      });
    }

    store.devoluciones.unshift({
      id: Date.now(),
      numero: num,
      fecha: new Date().toISOString(),
      ventaId: v.id,
      ventaNumero: v.numero,
      clienteNombre: v.clienteNombre,
      motivo: motivo,
      totalDevuelto: monto,
      estado: "PROCESADA",
      detalles: [{ productoId: firstItem.productoId, productoNombre: firstItem.productoNombre, cantidad: cant, subtotal: monto }]
    });

    v.estado = "DEVUELTA PARCIALMENTE";
    saveStore(store);
    closeModal('modalNuevaDevolucion');
    showToast(`Devolución ${num} aprobada. Stock restituido.`);
    renderDevoluciones();
  }

  // ----- 8.6 CLIENTES -----
  function renderClientes() {
    const store = getStore();
    const tbody = document.getElementById('clientesTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.clientes.map(c => `
      <tr>
        <td><strong>${c.tipoDocumento || 'DNI'}</strong>: ${c.numeroDocumento || 'S/D'}</td>
        <td><strong>${c.razonSocial || `${c.nombres} ${c.apellidos}`}</strong></td>
        <td><span class="badge" style="background:#f1f5f9; color:#334155;">${c.tipoCliente || 'MINORISTA'}</span></td>
        <td>${c.telefono || '-'}</td>
        <td>${c.correo || '-'}</td>
        <td>${c.direccion || '-'}</td>
      </tr>
    `).join('');
  }

  function guardarNuevoCliente() {
    const store = getStore();
    const tipoDoc = document.getElementById('modalClienteTipoDoc').value;
    const numDoc = document.getElementById('modalClienteNumDoc').value.trim();
    const nombre = document.getElementById('modalClienteNombre').value.trim();
    const tipo = document.getElementById('modalClienteTipo').value;
    const telf = document.getElementById('modalClienteTelefono').value.trim();
    const dir = document.getElementById('modalClienteDireccion').value.trim();

    store.clientes.unshift({
      id: Date.now(),
      tipoDocumento: tipoDoc,
      numeroDocumento: numDoc,
      nombres: tipoDoc === 'RUC' ? '' : nombre,
      apellidos: '',
      razonSocial: tipoDoc === 'RUC' ? nombre : '',
      telefono: telf,
      direccion: dir,
      tipoCliente: tipo
    });

    saveStore(store);
    closeModal('modalNuevoCliente');
    showToast(`Cliente '${nombre}' registrado`);
    renderClientes();
    renderPosSelects();
  }

  // ----- 8.7 INVENTARIO & PRODUCTOS -----
  function renderInventario() {
    const store = getStore();
    const tbody = document.getElementById('inventarioTableBody');
    if (!tbody) return;

    // Rellenar select filtro categorías
    const catSel = document.getElementById('filterCategoriaSelect');
    if (catSel && catSel.options.length <= 1) {
      catSel.innerHTML = `<option value="">Todas las Categorías</option>` + store.categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
    }

    const q = (document.getElementById('searchInventarioInput')?.value || '').toLowerCase().trim();
    const catId = catSel ? catSel.value : '';

    let list = store.productos;
    if (catId) list = list.filter(p => p.categoriaId === Number(catId));
    if (q) list = list.filter(p => p.nombre.toLowerCase().includes(q) || (p.codigo && p.codigo.toLowerCase().includes(q)) || (p.codigoBarras && p.codigoBarras.includes(q)));

    tbody.innerHTML = list.map(p => {
      const presChips = (p.presentaciones || []).map(pr => `
        <span class="presentation-chip">
          ${pr.nombrePresentacion}: <strong>S/ ${pr.precioVenta.toFixed(2)}</strong> (May: S/ ${(pr.precioMayorista || pr.precioVenta * 0.9).toFixed(2)})
        </span>
      `).join('');

      return `
        <tr style="opacity: ${p.estado ? '1' : '0.5'};">
          <td><code>${p.codigo}</code><br><small style="color:var(--text-muted);">${p.codigoBarras || ''}</small></td>
          <td>
            <strong>${p.nombre}</strong><br>
            <small style="color:var(--text-muted);">${p.marcaNombre || 'Genérica'} • Ubic: ${p.ubicacion || 'Almacén'}</small>
          </td>
          <td><span class="badge" style="background:#f1f5f9; color:#475569;">${p.categoriaNombre || 'General'}</span></td>
          <td style="max-width:320px;">${presChips || `<span class="presentation-chip">Base: <strong>S/ ${p.precioVenta.toFixed(2)}</strong></span>`}</td>
          <td style="font-weight:700;">S/ ${p.precioVenta.toFixed(2)}</td>
          <td style="font-weight:800; font-size:1.05rem; color:${p.stockActual <= p.stockMinimo ? 'var(--warning)' : 'var(--text-main)'};">
            ${p.stockActual}
          </td>
          <td>${p.stockMinimo}</td>
          <td>
            <span class="badge-stock ${p.stockActual <= 0 ? 'badge-stock-agotado' : (p.stockActual <= p.stockMinimo ? 'badge-stock-bajo' : 'badge-stock-normal')}">
              ${p.stockActual <= 0 ? '🔴 AGOTADO' : (p.stockActual <= p.stockMinimo ? '🟡 STOCK BAJO' : '🟢 NORMAL')}
            </span>
          </td>
          <td>
            ${p.estado ? `
              <button class="btn-secondary" style="padding:0.2rem 0.5rem; font-size:0.75rem; color:var(--danger);" onclick="window.app.desactivarProducto(${p.id})">Desactivar</button>
            ` : `
              <button class="btn-secondary" style="padding:0.2rem 0.5rem; font-size:0.75rem; color:var(--success);" onclick="window.app.activarProducto(${p.id})">Activar</button>
            `}
          </td>
        </tr>
      `;
    }).join('');

    // Cargar selects en modal nuevo producto
    const modalCat = document.getElementById('modalProdCategoria');
    if (modalCat) modalCat.innerHTML = store.categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
    const modalMar = document.getElementById('modalProdMarca');
    if (modalMar) modalMar.innerHTML = store.marcas.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
    const modalUnd = document.getElementById('modalProdUnidad');
    if (modalUnd) modalUnd.innerHTML = store.unidadesMedida.map(u => `<option value="${u.id}">${u.nombre} (${u.abreviatura})</option>`).join('');
  }

  function guardarNuevoProducto() {
    const store = getStore();
    const codigo = document.getElementById('modalProdCodigo').value.trim();
    const barras = document.getElementById('modalProdBarras').value.trim();
    const nombre = document.getElementById('modalProdNombre').value.trim();
    const catId = Number(document.getElementById('modalProdCategoria').value);
    const marId = Number(document.getElementById('modalProdMarca').value);
    const undId = Number(document.getElementById('modalProdUnidad').value);
    const ubicacion = document.getElementById('modalProdUbicacion').value.trim();
    const pCompra = parseFloat(document.getElementById('modalProdPrecioCompra').value) || 0;
    const pVenta = parseFloat(document.getElementById('modalProdPrecioVenta').value) || 0;
    const stock = Number(document.getElementById('modalProdStockActual').value) || 0;
    const stockMin = Number(document.getElementById('modalProdStockMinimo').value) || 10;

    const cat = store.categorias.find(c => c.id === catId);
    const mar = store.marcas.find(m => m.id === marId);
    const und = store.unidadesMedida.find(u => u.id === undId);

    const nuevoId = Date.now();
    const nuevoProd = {
      id: nuevoId,
      codigo: codigo,
      codigoBarras: barras || `775${Date.now().toString().slice(-9)}`,
      nombre: nombre,
      categoriaId: catId,
      categoriaNombre: cat ? cat.nombre : '',
      marcaId: marId,
      marcaNombre: mar ? mar.nombre : '',
      unidadMedidaId: undId,
      ubicacion: ubicacion,
      precioCompra: pCompra,
      precioVenta: pVenta,
      stockActual: stock,
      stockMinimo: stockMin,
      stockMaximo: 200,
      estado: true,
      presentaciones: [
        {
          id: Date.now() + 1,
          nombrePresentacion: und ? und.nombre : "Unidad Base",
          factorEquivalencia: 1.0,
          precioCosto: pCompra,
          precioVenta: pVenta,
          precioMayorista: pVenta * 0.9,
          codigoBarras: barras || `775${Date.now().toString().slice(-9)}`,
          esDefault: true
        }
      ]
    };

    store.productos.unshift(nuevoProd);

    if (stock > 0) {
      store.movimientos.unshift({
        id: Date.now() + 2,
        tipoMovimiento: "ENTRADA",
        cantidad: stock,
        stockAnterior: 0,
        stockPosterior: stock,
        motivo: "Inventario inicial por alta de producto",
        fecha: new Date().toISOString(),
        productoId: nuevoId,
        productoNombre: nombre,
        usuarioId: state.currentUser ? state.currentUser.id : 1
      });
    }

    registrarAuditoria("PRODUCTOS", "CREAR", `Registró nuevo producto: ${nombre}`);
    saveStore(store);
    closeModal('modalNuevoProducto');
    showToast(`Producto '${nombre}' registrado con éxito`);
    renderInventario();
  }

  function desactivarProducto(id) {
    const store = getStore();
    const p = store.productos.find(pr => pr.id === id);
    if (!p) return;
    p.estado = false;
    registrarAuditoria("PRODUCTOS", "DESACTIVAR", `Desactivó producto: ${p.nombre}`);
    saveStore(store);
    showToast(`Producto '${p.nombre}' desactivado`);
    renderInventario();
  }

  function activarProducto(id) {
    const store = getStore();
    const p = store.productos.find(pr => pr.id === id);
    if (!p) return;
    p.estado = true;
    registrarAuditoria("PRODUCTOS", "ACTIVAR", `Activó producto: ${p.nombre}`);
    saveStore(store);
    showToast(`Producto '${p.nombre}' activado`);
    renderInventario();
  }

  // ----- 8.8 CATEGORÍAS & MARCAS -----
  function renderCategorias() {
    const store = getStore();
    const tbCat = document.getElementById('categoriasTableBody');
    if (tbCat) {
      tbCat.innerHTML = store.categorias.map(c => `
        <tr>
          <td><strong>${c.nombre}</strong></td>
          <td>${c.descripcion || '-'}</td>
          <td><span class="badge badge-success">Activo</span></td>
        </tr>
      `).join('');
    }

    const tbMar = document.getElementById('marcasTableBody');
    if (tbMar) {
      tbMar.innerHTML = store.marcas.map(m => `
        <tr>
          <td><strong>${m.nombre}</strong></td>
          <td>${m.descripcion || '-'}</td>
          <td><span class="badge badge-success">Activo</span></td>
        </tr>
      `).join('');
    }
  }

  function promptCrearCategoria() {
    const nombre = prompt("Ingrese el nombre de la nueva categoría:");
    if (!nombre) return;
    const desc = prompt("Descripción de la categoría:", "Línea descartable");
    const store = getStore();
    store.categorias.push({ id: Date.now(), nombre: nombre.trim(), descripcion: desc, estado: true });
    saveStore(store);
    showToast(`Categoría '${nombre}' creada`);
    renderCategorias();
  }

  function promptCrearMarca() {
    const nombre = prompt("Ingrese el nombre de la nueva marca:");
    if (!nombre) return;
    const desc = prompt("Descripción de la marca:", "Fabricante nacional");
    const store = getStore();
    store.marcas.push({ id: Date.now(), nombre: nombre.trim(), descripcion: desc, estado: true });
    saveStore(store);
    showToast(`Marca '${nombre}' creada`);
    renderCategorias();
  }

  // ----- 8.9 MOVIMIENTOS & KÁRDEX -----
  function renderMovimientos() {
    const store = getStore();
    const tbody = document.getElementById('movimientosTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.movimientos.map(m => `
      <tr>
        <td>${formatearFecha(m.fecha)}</td>
        <td><span class="badge badge-${m.tipoMovimiento === 'ENTRADA' ? 'success' : (m.tipoMovimiento === 'SALIDA' ? 'warning' : 'danger')}">${m.tipoMovimiento}</span></td>
        <td><strong>${m.productoNombre || 'Producto'}</strong></td>
        <td style="font-weight:800;">${m.cantidad}</td>
        <td>${m.stockAnterior} ➔ <strong>${m.stockPosterior}</strong></td>
        <td>${m.motivo}</td>
      </tr>
    `).join('');
  }

  function renderKardex() {
    const store = getStore();
    const sel = document.getElementById('kardexProductoSelect');
    if (sel && sel.options.length === 0) {
      sel.innerHTML = store.productos.map(p => `<option value="${p.id}">${p.codigo} — ${p.nombre}</option>`).join('');
    }
    cargarKardexProducto();
  }

  function cargarKardexProducto() {
    const sel = document.getElementById('kardexProductoSelect');
    if (!sel) return;
    const prodId = Number(sel.value);
    const store = getStore();
    const tbody = document.getElementById('kardexTableBody');
    if (!tbody) return;

    const movs = store.movimientos.filter(m => m.productoId === prodId);
    if (movs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem;">No hay registros en el Kárdex para este producto</td></tr>`;
      return;
    }

    tbody.innerHTML = movs.map(m => `
      <tr>
        <td>${formatearFecha(m.fecha)}</td>
        <td><strong>${m.tipoMovimiento}</strong></td>
        <td>${m.motivo}</td>
        <td style="color:var(--success); font-weight:700;">${m.tipoMovimiento === 'ENTRADA' ? m.cantidad : '-'}</td>
        <td style="color:var(--danger); font-weight:700;">${m.tipoMovimiento === 'SALIDA' ? m.cantidad : '-'}</td>
        <td style="font-weight:800; font-size:1.05rem;">${m.stockPosterior}</td>
      </tr>
    `).join('');
  }

  // ----- 8.10 COMPRAS & ÓRDENES -----
  function renderCompras() {
    const store = getStore();
    const tbody = document.getElementById('comprasTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.compras.map(c => `
      <tr>
        <td><strong>${c.numero}</strong></td>
        <td>${formatearFecha(c.fecha)}</td>
        <td><strong>${c.proveedorRazonSocial}</strong></td>
        <td>${c.proveedorRuc || '-'}</td>
        <td style="font-weight:800; color:var(--primary);">S/ ${c.total.toFixed(2)}</td>
        <td><span class="badge badge-success">${c.estado}</span></td>
      </tr>
    `).join('');

    // Selects en modal nueva compra
    const selProv = document.getElementById('modalCompProveedor');
    if (selProv) selProv.innerHTML = store.proveedores.map(p => `<option value="${p.id}">${p.razonSocial}</option>`).join('');
    const selProd = document.getElementById('modalCompProducto');
    if (selProd) selProd.innerHTML = store.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
  }

  function procesarCompra() {
    const store = getStore();
    const provId = Number(document.getElementById('modalCompProveedor').value);
    const prodId = Number(document.getElementById('modalCompProducto').value);
    const cant = Number(document.getElementById('modalCompCantidad').value) || 1;
    const costo = parseFloat(document.getElementById('modalCompCosto').value) || 0;
    const esCredito = document.getElementById('modalCompEsCredito').checked;

    const prov = store.proveedores.find(p => p.id === provId);
    const prod = store.productos.find(p => p.id === prodId);

    const total = cant * costo;
    const num = `COM-${String(store.compras.length + 101).padStart(6, '0')}`;

    // Aumentar stock de producto
    if (prod) {
      const ant = prod.stockActual;
      prod.stockActual += cant;
      prod.precioCompra = costo;
      store.movimientos.unshift({
        id: Date.now(),
        tipoMovimiento: "ENTRADA",
        cantidad: cant,
        stockAnterior: ant,
        stockPosterior: prod.stockActual,
        motivo: `Compra ${num} - Proveedor: ${prov ? prov.razonSocial : ''}`,
        fecha: new Date().toISOString(),
        productoId: prod.id,
        productoNombre: prod.nombre,
        usuarioId: state.currentUser ? state.currentUser.id : 1
      });
    }

    if (esCredito) {
      store.cuentasPagar.unshift({
        id: Date.now(),
        compraId: Date.now(),
        compraNumero: num,
        proveedorId: provId,
        proveedorRazonSocial: prov ? prov.razonSocial : "Proveedor",
        montoTotal: total,
        montoPagado: 0.00,
        saldoPendiente: total,
        fechaEmision: new Date().toISOString(),
        fechaVencimiento: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
        estado: "PENDIENTE"
      });
    }

    store.compras.unshift({
      id: Date.now(),
      numero: num,
      fecha: new Date().toISOString(),
      proveedorId: provId,
      proveedorRuc: prov ? prov.ruc : "",
      proveedorRazonSocial: prov ? prov.razonSocial : "Proveedor",
      subtotal: total / 1.18,
      igv: total - (total / 1.18),
      total: total,
      estado: "REGISTRADA",
      detalles: [{ productoId: prodId, productoNombre: prod.nombre, cantidad: cant, precioUnitario: costo, subtotal: total }]
    });

    saveStore(store);
    closeModal('modalNuevaCompra');
    showToast(`Compra ${num} registrada. Stock incrementado.`);
    renderCompras();
  }

  function renderOrdenes() {
    const store = getStore();
    const tbody = document.getElementById('ordenesTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.ordenesCompra.map(o => `
      <tr>
        <td><strong>${o.numero}</strong></td>
        <td>${formatearFechaCorta(o.fecha)}</td>
        <td>${o.fechaEsperada || '-'}</td>
        <td><strong>${o.proveedorRazonSocial}</strong></td>
        <td style="font-weight:800;">S/ ${o.total.toFixed(2)}</td>
        <td><span class="badge badge-${o.estado === 'PENDIENTE' ? 'warning' : 'success'}">${o.estado}</span></td>
        <td>
          ${o.estado === 'PENDIENTE' ? `
            <button class="btn-primary" style="padding:0.25rem 0.55rem; font-size:0.75rem;" onclick="window.app.convertirOrden(${o.id})">⚡ Recibir Mercadería</button>
          ` : '<span style="font-size:0.75rem; color:var(--text-muted);">Completada</span>'}
        </td>
      </tr>
    `).join('');

    const selProv = document.getElementById('modalOcProveedor');
    if (selProv) selProv.innerHTML = store.proveedores.map(p => `<option value="${p.id}">${p.razonSocial}</option>`).join('');
    const selProd = document.getElementById('modalOcProducto');
    if (selProd) selProd.innerHTML = store.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
  }

  function crearOrdenCompra() {
    const store = getStore();
    const provId = Number(document.getElementById('modalOcProveedor').value);
    const prodId = Number(document.getElementById('modalOcProducto').value);
    const cant = Number(document.getElementById('modalOcCantidad').value) || 1;
    const costo = parseFloat(document.getElementById('modalOcCosto').value) || 0;

    const prov = store.proveedores.find(p => p.id === provId);
    const prod = store.productos.find(p => p.id === prodId);

    const total = cant * costo;
    const num = `OC-${String(store.ordenesCompra.length + 101).padStart(6, '0')}`;

    store.ordenesCompra.unshift({
      id: Date.now(),
      numero: num,
      fecha: new Date().toISOString(),
      fechaEsperada: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      proveedorId: provId,
      proveedorRazonSocial: prov ? prov.razonSocial : "Proveedor",
      subtotal: total / 1.18,
      igv: total - (total / 1.18),
      total: total,
      estado: "PENDIENTE",
      detalles: [{ productoId: prodId, productoNombre: prod.nombre, cantidad: cant, precioUnitario: costo, subtotal: total }]
    });

    saveStore(store);
    closeModal('modalNuevaOrdenCompra');
    showToast(`Orden de compra ${num} generada`);
    renderOrdenes();
  }

  function convertirOrden(id) {
    const store = getStore();
    const oc = store.ordenesCompra.find(o => o.id === id);
    if (!oc) return;

    // Convertir a compra e incrementar stock
    const numCom = `COM-${String(store.compras.length + 101).padStart(6, '0')}`;
    (oc.detalles || []).forEach(d => {
      const prod = store.productos.find(p => p.id === d.productoId);
      if (prod) {
        const ant = prod.stockActual;
        prod.stockActual += d.cantidad;
        store.movimientos.unshift({
          id: Date.now(),
          tipoMovimiento: "ENTRADA",
          cantidad: d.cantidad,
          stockAnterior: ant,
          stockPosterior: prod.stockActual,
          motivo: `Recepción de Orden ${oc.numero} (Compra ${numCom})`,
          fecha: new Date().toISOString(),
          productoId: prod.id,
          productoNombre: prod.nombre,
          usuarioId: state.currentUser ? state.currentUser.id : 1
        });
      }
    });

    store.compras.unshift({
      id: Date.now(),
      numero: numCom,
      fecha: new Date().toISOString(),
      proveedorId: oc.proveedorId,
      proveedorRazonSocial: oc.proveedorRazonSocial,
      subtotal: oc.subtotal,
      igv: oc.igv,
      total: oc.total,
      estado: "REGISTRADA",
      detalles: oc.detalles
    });

    oc.estado = "RECIBIDA";
    saveStore(store);
    showToast(`Orden ${oc.numero} convertida en Compra ${numCom}. Stock actualizado.`);
    renderOrdenes();
  }

  // ----- 8.11 PROVEEDORES -----
  function renderProveedores() {
    const store = getStore();
    const tbody = document.getElementById('proveedoresTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.proveedores.map(p => `
      <tr>
        <td><strong>${p.ruc}</strong></td>
        <td><strong>${p.razonSocial}</strong></td>
        <td>${p.contacto || '-'}</td>
        <td>${p.telefono || '-'}</td>
        <td>${p.correo || '-'}</td>
        <td>${p.direccion || '-'}</td>
      </tr>
    `).join('');
  }

  function guardarNuevoProveedor() {
    const store = getStore();
    const ruc = document.getElementById('modalProvRuc').value.trim();
    const razon = document.getElementById('modalProvRazon').value.trim();
    const contacto = document.getElementById('modalProvContacto').value.trim();
    const telf = document.getElementById('modalProvTelefono').value.trim();
    const dir = document.getElementById('modalProvDireccion').value.trim();

    store.proveedores.unshift({
      id: Date.now(),
      ruc: ruc,
      razonSocial: razon,
      contacto: contacto,
      telefono: telf,
      direccion: dir,
      estado: true
    });

    saveStore(store);
    closeModal('modalNuevoProveedor');
    showToast(`Proveedor '${razon}' registrado`);
    renderProveedores();
  }

  // ----- 8.12 CAJA & ARQUEO -----
  function renderCaja() {
    const store = getStore();
    const c = store.cajaActiva;

    const estadoElem = document.getElementById('cajaEstadoLabel');
    const iniElem = document.getElementById('cajaMontoInicialLabel');
    const efecElem = document.getElementById('cajaVentasEfectivoLabel');
    const digElem = document.getElementById('cajaVentasDigitalLabel');
    const espElem = document.getElementById('cajaMontoEsperadoLabel');
    const btnAccion = document.getElementById('btnCajaAccionPrincipal');

    if (c && c.estado === 'ABIERTA') {
      if (estadoElem) { estadoElem.textContent = "ABIERTA"; estadoElem.style.color = "var(--success)"; }
      if (iniElem) iniElem.textContent = `S/ ${(c.montoInicial || 0).toFixed(2)}`;
      if (efecElem) efecElem.textContent = `S/ ${(c.totalVentasEfectivo || 0).toFixed(2)}`;
      if (digElem) digElem.textContent = `S/ ${(c.totalVentasDigital || 0).toFixed(2)}`;
      if (espElem) espElem.textContent = `S/ ${(c.montoEsperado || 0).toFixed(2)}`;
      if (btnAccion) {
        btnAccion.textContent = "🔒 Cerrar Turno & Arqueo";
        btnAccion.style.background = "var(--danger)";
      }
    } else {
      if (estadoElem) { estadoElem.textContent = "CERRADA"; estadoElem.style.color = "var(--danger)"; }
      if (iniElem) iniElem.textContent = "S/ 0.00";
      if (efecElem) efecElem.textContent = "S/ 0.00";
      if (digElem) digElem.textContent = "S/ 0.00";
      if (espElem) espElem.textContent = "S/ 0.00";
      if (btnAccion) {
        btnAccion.textContent = "🔓 Aperturar Caja del Día";
        btnAccion.style.background = "var(--primary)";
      }
    }

    const tbody = document.getElementById('cajaMovimientosTableBody');
    if (tbody) {
      const movs = c ? (c.movimientos || []) : [];
      if (movs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:2rem;">No hay movimientos registrados en este turno</td></tr>`;
      } else {
        tbody.innerHTML = movs.map(m => `
          <tr>
            <td>${formatearFecha(m.fecha)}</td>
            <td><span class="badge badge-${m.tipo === 'EGRESO' ? 'danger' : 'success'}">${m.tipo}</span></td>
            <td>${m.concepto}</td>
            <td style="font-weight:800; color:${m.tipo === 'EGRESO' ? 'var(--danger)' : 'var(--primary)'};">
              ${m.tipo === 'EGRESO' ? '-' : '+'} S/ ${m.monto.toFixed(2)}
            </td>
          </tr>
        `).join('');
      }
    }
  }

  function handleCajaAccionPrincipal() {
    const store = getStore();
    if (store.cajaActiva && store.cajaActiva.estado === 'ABIERTA') {
      // Preparar modal de cierre y arqueo
      const c = store.cajaActiva;
      document.getElementById('cierreFondoInicial').textContent = `S/ ${c.montoInicial.toFixed(2)}`;
      document.getElementById('cierreVentasEfectivo').textContent = `S/ ${c.totalVentasEfectivo.toFixed(2)}`;
      const netoOtros = (c.totalIngresos - c.totalVentasEfectivo - c.totalVentasDigital) - c.totalEgresos;
      document.getElementById('cierreNetoOtros').textContent = `S/ ${netoOtros.toFixed(2)}`;
      document.getElementById('cierreEfectivoEsperado').textContent = `S/ ${c.montoEsperado.toFixed(2)}`;
      document.getElementById('modalCierreContado').value = c.montoEsperado.toFixed(2);
      calcularDiferenciaCierre();
      openModal('modalCierreCaja');
    } else {
      openModal('modalAperturaCaja');
    }
  }

  function abrirCaja() {
    const store = getStore();
    const monto = parseFloat(document.getElementById('modalCajaMontoInicial').value) || 0;
    const obs = document.getElementById('modalCajaObs').value;

    store.cajaActiva = {
      id: Date.now(),
      nombre: "Caja Principal POS",
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
      observaciones: obs,
      movimientos: [
        { id: Date.now(), tipo: "APERTURA", concepto: "Fondo inicial de sencillo", monto: monto, fecha: new Date().toISOString() }
      ]
    };

    registrarAuditoria("CAJA", "APERTURA", `Apertura de turno con S/ ${monto.toFixed(2)}`);
    saveStore(store);
    closeModal('modalAperturaCaja');
    showToast(`Caja aperturada con S/ ${monto.toFixed(2)}`);
    renderCaja();
  }

  function guardarMovimientoCaja() {
    const store = getStore();
    if (!store.cajaActiva || store.cajaActiva.estado !== 'ABIERTA') {
      showToast("No hay una caja abierta.", "warning");
      return;
    }
    const tipo = document.getElementById('modalMovCajaTipo').value;
    const monto = parseFloat(document.getElementById('modalMovCajaMonto').value) || 0;
    const concepto = document.getElementById('modalMovCajaConcepto').value.trim();

    if (tipo === 'EGRESO') {
      store.cajaActiva.totalEgresos += monto;
      store.cajaActiva.montoEsperado -= monto;
    } else {
      store.cajaActiva.totalIngresos += monto;
      store.cajaActiva.montoEsperado += monto;
    }

    store.cajaActiva.movimientos.push({
      id: Date.now(),
      tipo: tipo,
      concepto: concepto,
      monto: monto,
      fecha: new Date().toISOString()
    });

    registrarAuditoria("CAJA", tipo, `${tipo}: ${concepto} por S/ ${monto.toFixed(2)}`);
    saveStore(store);
    closeModal('modalMovimientoCaja');
    showToast(`Movimiento de caja registrado: ${tipo} S/ ${monto.toFixed(2)}`);
    renderCaja();
  }

  function calcularDiferenciaCierre() {
    const store = getStore();
    if (!store.cajaActiva) return;
    const esperado = store.cajaActiva.montoEsperado;
    const contado = parseFloat(document.getElementById('modalCierreContado').value) || 0;
    const dif = contado - esperado;

    const label = document.getElementById('cierreDiferenciaLabel');
    if (label) {
      if (dif === 0) {
        label.textContent = "S/ 0.00 (Cuadrado Exacto)";
        label.style.color = "var(--success)";
      } else if (dif > 0) {
        label.textContent = `+ S/ ${dif.toFixed(2)} (Sobrante)`;
        label.style.color = "var(--primary)";
      } else {
        label.textContent = `- S/ ${Math.abs(dif).toFixed(2)} (Faltante)`;
        label.style.color = "var(--danger)";
      }
    }
  }

  function procesarCierreCaja() {
    const store = getStore();
    if (!store.cajaActiva || store.cajaActiva.estado !== 'ABIERTA') return;
    const contado = parseFloat(document.getElementById('modalCierreContado').value) || 0;
    const obs = document.getElementById('modalCierreObs').value;
    const dif = contado - store.cajaActiva.montoEsperado;

    store.cajaActiva.fechaCierre = new Date().toISOString();
    store.cajaActiva.montoContado = contado;
    store.cajaActiva.diferencia = dif;
    store.cajaActiva.estado = "CERRADA";
    store.cajaActiva.observacionesCierre = obs;

    registrarAuditoria("CAJA", "CIERRE", `Cierre de turno. Esperado S/ ${store.cajaActiva.montoEsperado.toFixed(2)}, Contado S/ ${contado.toFixed(2)}, Dif: S/ ${dif.toFixed(2)}`);
    saveStore(store);
    closeModal('modalCierreCaja');
    showToast(`Turno cerrado y arqueado correctamente.`);
    renderCaja();
  }

  // ----- 8.13 CUENTAS POR COBRAR / PAGAR -----
  function renderCuentasCobrar() {
    const store = getStore();
    const tbody = document.getElementById('cuentasCobrarTableBody');
    if (!tbody) return;

    if (store.cuentasCobrar.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:2rem;">No hay cuentas por cobrar pendientes</td></tr>`;
      return;
    }

    tbody.innerHTML = store.cuentasCobrar.map(c => `
      <tr>
        <td><strong>${c.ventaNumero}</strong></td>
        <td>${c.clienteNombre}</td>
        <td>S/ ${c.montoTotal.toFixed(2)}</td>
        <td style="color:var(--success);">S/ ${c.montoPagado.toFixed(2)}</td>
        <td style="font-weight:800; color:var(--primary);">S/ ${c.saldoPendiente.toFixed(2)}</td>
        <td>${c.fechaVencimiento || '-'}</td>
        <td><span class="badge-stock badge-${c.estado.toLowerCase()}">${c.estado}</span></td>
        <td>
          ${c.estado !== 'PAGADA' ? `
            <button class="btn-primary" style="padding:0.25rem 0.55rem; font-size:0.75rem;" onclick="window.app.abrirModalAbonoCobrar(${c.id})">💵 Abonar</button>
          ` : '<span style="font-size:0.75rem; color:var(--success); font-weight:700;">✓ Pagada</span>'}
        </td>
      </tr>
    `).join('');
  }

  function abrirModalAbonoCobrar(id) {
    const store = getStore();
    const c = store.cuentasCobrar.find(item => item.id === id);
    if (!c) return;
    document.getElementById('abonoCobrarCuentaId').value = c.id;
    document.getElementById('abonoCobrarClienteLabel').textContent = `Cliente: ${c.clienteNombre} — Saldo pendiente: S/ ${c.saldoPendiente.toFixed(2)}`;
    document.getElementById('abonoCobrarMonto').value = c.saldoPendiente.toFixed(2);
    openModal('modalAbonoCobrar');
  }

  function procesarAbonoCobrar() {
    const store = getStore();
    const id = Number(document.getElementById('abonoCobrarCuentaId').value);
    const monto = parseFloat(document.getElementById('abonoCobrarMonto').value) || 0;
    const c = store.cuentasCobrar.find(item => item.id === id);
    if (!c) return;

    c.montoPagado += monto;
    c.saldoPendiente = Math.max(0, c.montoTotal - c.montoPagado);
    c.estado = c.saldoPendiente === 0 ? "PAGADA" : "PARCIAL";

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

    saveStore(store);
    closeModal('modalAbonoCobrar');
    showToast(`Abono de S/ ${monto.toFixed(2)} registrado exitosamente`);
    renderCuentasCobrar();
  }

  function renderCuentasPagar() {
    const store = getStore();
    const tbody = document.getElementById('cuentasPagarTableBody');
    if (!tbody) return;

    if (store.cuentasPagar.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:2rem;">No hay cuentas por pagar registradas</td></tr>`;
      return;
    }

    tbody.innerHTML = store.cuentasPagar.map(c => `
      <tr>
        <td><strong>${c.compraNumero}</strong></td>
        <td><strong>${c.proveedorRazonSocial}</strong></td>
        <td>S/ ${c.montoTotal.toFixed(2)}</td>
        <td style="color:var(--success);">S/ ${c.montoPagado.toFixed(2)}</td>
        <td style="font-weight:800; color:var(--danger);">S/ ${c.saldoPendiente.toFixed(2)}</td>
        <td>${c.fechaVencimiento || '-'}</td>
        <td><span class="badge-stock badge-${c.estado.toLowerCase()}">${c.estado}</span></td>
        <td>
          ${c.estado !== 'PAGADA' ? `
            <button class="btn-primary" style="padding:0.25rem 0.55rem; font-size:0.75rem;" onclick="window.app.abrirModalAbonoPagar(${c.id})">💸 Pagar</button>
          ` : '<span style="font-size:0.75rem; color:var(--success); font-weight:700;">✓ Pagada</span>'}
        </td>
      </tr>
    `).join('');
  }

  function abrirModalAbonoPagar(id) {
    const store = getStore();
    const c = store.cuentasPagar.find(item => item.id === id);
    if (!c) return;
    document.getElementById('abonoPagarCuentaId').value = c.id;
    document.getElementById('abonoPagarProveedorLabel').textContent = `Proveedor: ${c.proveedorRazonSocial} — Deuda pendiente: S/ ${c.saldoPendiente.toFixed(2)}`;
    document.getElementById('abonoPagarMonto').value = c.saldoPendiente.toFixed(2);
    openModal('modalAbonoPagar');
  }

  function procesarAbonoPagar() {
    const store = getStore();
    const id = Number(document.getElementById('abonoPagarCuentaId').value);
    const monto = parseFloat(document.getElementById('abonoPagarMonto').value) || 0;
    const c = store.cuentasPagar.find(item => item.id === id);
    if (!c) return;

    c.montoPagado += monto;
    c.saldoPendiente = Math.max(0, c.montoTotal - c.montoPagado);
    c.estado = c.saldoPendiente === 0 ? "PAGADA" : "PARCIAL";

    saveStore(store);
    closeModal('modalAbonoPagar');
    showToast(`Pago de S/ ${monto.toFixed(2)} registrado al proveedor`);
    renderCuentasPagar();
  }

  // ----- 8.14 REPORTES & RENTABILIDAD -----
  function renderReportes() {
    const store = getStore();
    const ventas = store.ventas.filter(v => v.estado === 'COMPLETADA');
    const totalVentas = ventas.reduce((s, v) => s + v.total, 0);

    let costoTotal = 0;
    const productSalesMap = {};

    ventas.forEach(v => {
      (v.detalles || []).forEach(d => {
        const prod = store.productos.find(p => p.id === d.productoId);
        const costoUnit = prod ? prod.precioCompra : (d.precioUnitario * 0.7);
        costoTotal += (costoUnit * d.cantidad);

        if (!productSalesMap[d.productoId]) {
          productSalesMap[d.productoId] = {
            id: d.productoId,
            codigo: d.productoCodigo || (prod ? prod.codigo : 'PLAS'),
            nombre: d.productoNombre || (prod ? prod.nombre : 'Producto'),
            cantidad: 0,
            monto: 0
          };
        }
        productSalesMap[d.productoId].cantidad += d.cantidad;
        productSalesMap[d.productoId].monto += d.subtotal;
      });
    });

    const utilidadBruta = Math.max(0, totalVentas - costoTotal);

    document.getElementById('repIngresosVentas').textContent = `S/ ${totalVentas.toFixed(2)}`;
    document.getElementById('repCostoMercaderia').textContent = `S/ ${costoTotal.toFixed(2)}`;
    document.getElementById('repUtilidadBruta').textContent = `S/ ${utilidadBruta.toFixed(2)}`;

    // Top 5 Productos
    const topArray = Object.values(productSalesMap).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5);
    const tbody = document.getElementById('repTopProductosTableBody');
    if (tbody) {
      if (topArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:1.5rem;">Aún no hay suficientes ventas registradas</td></tr>`;
      } else {
        tbody.innerHTML = topArray.map((p, idx) => `
          <tr>
            <td><strong>#${idx + 1}</strong></td>
            <td><code>${p.codigo}</code></td>
            <td><strong>${p.nombre}</strong></td>
            <td style="font-weight:700;">${p.cantidad} presentaciones</td>
            <td style="font-weight:800; color:var(--primary);">S/ ${p.monto.toFixed(2)}</td>
          </tr>
        `).join('');
      }
    }
  }

  // ----- 8.15 USUARIOS -----
  function renderUsuarios() {
    const store = getStore();
    const tbody = document.getElementById('usuariosTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.usuarios.map(u => `
      <tr>
        <td><strong>${u.usuario}</strong></td>
        <td>${u.nombres} ${u.apellidos || ''}</td>
        <td>${u.correo || '-'}</td>
        <td><span class="user-role-badge admin">${u.rolNombre || 'USUARIO'}</span></td>
        <td><span class="badge badge-${u.estado ? 'success' : 'danger'}">${u.estado ? 'Activo' : 'Inactivo'}</span></td>
        <td>
          <button class="btn-secondary" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="window.app.toggleEstadoUsuario(${u.id})">
            ${u.estado ? 'Desactivar' : 'Activar'}
          </button>
        </td>
      </tr>
    `).join('');

    const selRol = document.getElementById('modalUsrRol');
    if (selRol) {
      selRol.innerHTML = store.roles.map(r => `<option value="${r.id}">${r.nombre} (${r.descripcion})</option>`).join('');
    }
  }

  function guardarNuevoUsuario() {
    const store = getStore();
    const u = document.getElementById('modalUsrUsuario').value.trim();
    const p = document.getElementById('modalUsrPassword').value.trim();
    const n = document.getElementById('modalUsrNombres').value.trim();
    const a = document.getElementById('modalUsrApellidos').value.trim();
    const c = document.getElementById('modalUsrCorreo').value.trim();
    const rId = Number(document.getElementById('modalUsrRol').value);

    const rol = store.roles.find(r => r.id === rId);

    store.usuarios.push({
      id: Date.now(),
      usuario: u,
      contrasena: p,
      nombres: n,
      apellidos: a,
      correo: c,
      rolId: rId,
      rolNombre: rol ? rol.nombre : "USUARIO",
      estado: true
    });

    registrarAuditoria("USUARIOS", "CREAR", `Creó nuevo usuario: ${u}`);
    saveStore(store);
    closeModal('modalNuevoUsuario');
    showToast(`Usuario '${u}' creado correctamente`);
    renderUsuarios();
  }

  function toggleEstadoUsuario(id) {
    const store = getStore();
    const u = store.usuarios.find(usr => usr.id === id);
    if (!u) return;
    if (u.usuario === 'admin') {
      showToast("No se puede desactivar al SuperAdmin", "warning");
      return;
    }
    u.estado = !u.estado;
    registrarAuditoria("USUARIOS", "CAMBIO_ESTADO", `Usuario ${u.usuario} marcado como ${u.estado ? 'Activo' : 'Inactivo'}`);
    saveStore(store);
    showToast(`Estado de ${u.usuario} modificado`);
    renderUsuarios();
  }

  // ----- 8.16 ROLES & PERMISOS (RBAC) -----
  const listaPermisosBase = [
    { modulo: "Dashboard", items: [{ codigo: "DASHBOARD_VER", nombre: "Ver Tablero Principal" }] },
    {
      modulo: "Ventas y POS", items: [
        { codigo: "VENTA_VER", nombre: "Ver Historial de Ventas" },
        { codigo: "VENTA_CREAR", nombre: "Crear Ventas en POS" },
        { codigo: "VENTA_ANULAR", nombre: "Anular Ventas" },
        { codigo: "VENTA_DESCUENTO", nombre: "Aplicar Descuentos" },
        { codigo: "COTIZACION_VER", nombre: "Ver Cotizaciones" },
        { codigo: "COTIZACION_CREAR", nombre: "Crear Cotizaciones" },
        { codigo: "VENTA_DEVOLVER", nombre: "Gestionar Devoluciones" }
      ]
    },
    {
      modulo: "Inventario y Productos", items: [
        { codigo: "PRODUCTO_VER", nombre: "Ver Catálogo" },
        { codigo: "PRODUCTO_CREAR", nombre: "Registrar Productos" },
        { codigo: "PRODUCTO_EDITAR", nombre: "Modificar Precios y Stock" },
        { codigo: "PRODUCTO_DESACTIVAR", nombre: "Desactivar Productos" },
        { codigo: "INVENTARIO_VER", nombre: "Ver Existencias" },
        { codigo: "INVENTARIO_AJUSTAR", nombre: "Ajustar Stock Manual" },
        { codigo: "KARDEX_VER", nombre: "Consultar Kárdex" }
      ]
    },
    {
      modulo: "Compras y Proveedores", items: [
        { codigo: "COMPRA_VER", nombre: "Ver Compras" },
        { codigo: "COMPRA_CREAR", nombre: "Registrar Compras" },
        { codigo: "ORDEN_COMPRA_VER", nombre: "Ver Órdenes de Compra" },
        { codigo: "ORDEN_COMPRA_CREAR", nombre: "Crear Órdenes de Compra" },
        { codigo: "PROVEEDOR_VER", nombre: "Ver Proveedores" },
        { codigo: "PROVEEDOR_CREAR", nombre: "Registrar Proveedores" }
      ]
    },
    {
      modulo: "Finanzas y Caja", items: [
        { codigo: "CAJA_VER", nombre: "Ver Caja Activa" },
        { codigo: "CAJA_ABRIR", nombre: "Apertura de Caja" },
        { codigo: "CAJA_CERRAR", nombre: "Cierre y Arqueo" },
        { codigo: "CAJA_INGRESO", nombre: "Registrar Ingresos" },
        { codigo: "CAJA_EGRESO", nombre: "Registrar Egresos" },
        { codigo: "FINANZAS_VER", nombre: "Cuentas por Cobrar y Pagar" }
      ]
    },
    {
      modulo: "Reportes y Seguridad", items: [
        { codigo: "REPORTE_VENTAS", nombre: "Reporte de Ventas" },
        { codigo: "REPORTE_INVENTARIO", nombre: "Reporte de Inventario" },
        { codigo: "REPORTE_GANANCIAS", nombre: "Reporte de Rentabilidad" },
        { codigo: "USUARIO_VER", nombre: "Ver Usuarios" },
        { codigo: "ROL_GESTIONAR", nombre: "Administrar Roles y Permisos" },
        { codigo: "AUDITORIA_VER", nombre: "Ver Auditoría del Sistema" },
        { codigo: "CONFIG_EMPRESA", nombre: "Configuración de Empresa" }
      ]
    }
  ];

  function renderRoles() {
    const store = getStore();
    const sel = document.getElementById('rbacRolSelect');
    if (sel && sel.options.length === 0) {
      sel.innerHTML = store.roles.map(r => `<option value="${r.id}">${r.nombre} — ${r.descripcion}</option>`).join('');
    }
    cargarPermisosDeRol();
  }

  function cargarPermisosDeRol() {
    const sel = document.getElementById('rbacRolSelect');
    if (!sel) return;
    const rolId = Number(sel.value);
    const store = getStore();
    const rol = store.roles.find(r => r.id === rolId);
    if (!rol) return;

    const container = document.getElementById('rbacGridContainer');
    if (!container) return;

    const esSuperAdmin = rol.nombre === 'SUPER_ADMIN';
    const permisosRol = rol.permisoCodigos || [];

    container.innerHTML = listaPermisosBase.map(mod => `
      <div class="rbac-module-card">
        <div class="rbac-module-header">
          <span>📁</span> <span>${mod.modulo}</span>
        </div>
        <div class="rbac-perm-list">
          ${mod.items.map(p => {
      const checked = esSuperAdmin || permisosRol.includes('*') || permisosRol.includes(p.codigo);
      return `
              <label class="rbac-perm-item">
                <input type="checkbox" class="rbac-checkbox" value="${p.codigo}" 
                       ${checked ? 'checked' : ''} 
                       ${esSuperAdmin ? 'disabled' : ''}>
                <span>${p.nombre}</span>
              </label>
            `;
    }).join('')}
        </div>
      </div>
    `).join('');
  }

  function guardarPermisosRol() {
    const sel = document.getElementById('rbacRolSelect');
    if (!sel) return;
    const rolId = Number(sel.value);
    const store = getStore();
    const rol = store.roles.find(r => r.id === rolId);
    if (!rol) return;

    if (rol.nombre === 'SUPER_ADMIN') {
      showToast("El SuperAdmin mantiene todos los permisos de forma inmutable.", "warning");
      return;
    }

    const checks = document.querySelectorAll('.rbac-checkbox:checked');
    const seleccionados = Array.from(checks).map(c => c.value);

    rol.permisoCodigos = seleccionados;
    registrarAuditoria("SEGURIDAD", "MODIFICAR_ROL", `Actualizó matriz de permisos para rol ${rol.nombre}`);
    saveStore(store);

    // Si el usuario actual tiene este rol, actualizar su sesión
    if (state.currentUser && state.currentUser.rolId === rolId) {
      state.currentUser.permisos = seleccionados;
      setLoggedUser(state.currentUser);
      applyPermissionsToUI();
    }

    showToast(`Permisos guardados para el rol ${rol.nombre}`);
  }

  // ----- 8.17 AUDITORÍA -----
  function renderAuditoria() {
    const store = getStore();
    const tbody = document.getElementById('auditoriaTableBody');
    if (!tbody) return;

    tbody.innerHTML = store.auditorias.map(a => `
      <tr>
        <td>${formatearFecha(a.fechaHora)}</td>
        <td><strong>${a.username}</strong></td>
        <td><span class="badge" style="background:#f1f5f9; color:#334155;">${a.modulo}</span></td>
        <td><strong>${a.accion}</strong></td>
        <td>${a.descripcion}</td>
        <td><code>${a.ipOrigen || '127.0.0.1'}</code></td>
      </tr>
    `).join('');
  }

  function registrarAuditoria(modulo, accion, descripcion) {
    const store = getStore();
    store.auditorias.unshift({
      id: Date.now() + Math.floor(Math.random() * 100),
      username: state.currentUser ? state.currentUser.usuario : "sistema",
      modulo: modulo,
      accion: accion,
      descripcion: descripcion,
      fechaHora: new Date().toISOString(),
      ipOrigen: "127.0.0.1"
    });
    saveStore(store);
  }

  // ----- 8.18 CONFIGURACIÓN DE EMPRESA -----
  function renderEmpresa() {
    const store = getStore();
    const cfg = store.empresaConfig || defaultInitialData.empresaConfig;

    document.getElementById('cfgRazonSocial').value = cfg.razonSocial || '';
    document.getElementById('cfgNombreComercial').value = cfg.nombreComercial || '';
    document.getElementById('cfgRuc').value = cfg.ruc || '';
    document.getElementById('cfgDireccion').value = cfg.direccion || '';
    document.getElementById('cfgTelefono').value = cfg.telefono || '';
    document.getElementById('cfgCorreo').value = cfg.correo || '';
    document.getElementById('cfgMoneda').value = cfg.monedaSimbolo || 'S/';
    document.getElementById('cfgIgv').value = cfg.igvPorcentaje || 18.0;
    document.getElementById('cfgMensajeTicket').value = cfg.mensajeTicket || '';
  }

  function guardarEmpresa() {
    const store = getStore();
    store.empresaConfig = {
      razonSocial: document.getElementById('cfgRazonSocial').value.trim(),
      nombreComercial: document.getElementById('cfgNombreComercial').value.trim(),
      ruc: document.getElementById('cfgRuc').value.trim(),
      direccion: document.getElementById('cfgDireccion').value.trim(),
      telefono: document.getElementById('cfgTelefono').value.trim(),
      correo: document.getElementById('cfgCorreo').value.trim(),
      monedaSimbolo: document.getElementById('cfgMoneda').value.trim(),
      igvPorcentaje: parseFloat(document.getElementById('cfgIgv').value) || 18.0,
      mensajeTicket: document.getElementById('cfgMensajeTicket').value.trim()
    };
    registrarAuditoria("CONFIGURACION", "EDITAR_EMPRESA", "Datos de la empresa actualizados");
    saveStore(store);
    showToast("Datos de Plastiquería Jireh actualizados con éxito");
  }

  // ==================== 9. GESTIÓN DE MODALES Y EVENTOS ====================
  function setupModals() {
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.closest('.modal-overlay');
        if (m) m.classList.remove('active');
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(ov => {
      ov.addEventListener('click', (e) => {
        if (e.target === ov && ov.id !== 'loginOverlay') {
          ov.classList.remove('active');
        }
      });
    });

    // Menú de navegación lateral
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        if (view) switchView(view);
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

  // ==================== 10. UTILITARIOS DE FORMATO ====================
  function formatearFecha(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    return `${d.toLocaleDateString('es-PE')} ${d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
  }

  function formatearFechaCorta(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleDateString('es-PE');
  }

  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span>${type === 'warning' ? '⚠️' : '✅'}</span> <span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.3s ease';
      setTimeout(() => t.remove(), 300);
    }, 2800);
  }

  // ==================== 11. OBJETO GLOBAL APP ====================
  window.app = {
    switchView,
    toggleSidebar,
    handleLogin,
    logout,
    fillCredentials,
    togglePasswordVisibility,
    openModal,
    closeModal,
    filterPosByCategory,
    addPosCardToCart,
    addToCart,
    updateCartQty,
    removeFromCart,
    calcularVuelto,
    onPaymentMethodChange,
    procesarVenta,
    verTicketVenta,
    confirmarAnularVenta,
    crearNuevaCotizacion,
    convertirCotizacion,
    procesarDevolucion,
    guardarNuevoCliente,
    guardarNuevoProducto,
    desactivarProducto,
    activarProducto,
    promptCrearCategoria,
    promptCrearMarca,
    cargarKardexProducto,
    procesarCompra,
    crearOrdenCompra,
    convertirOrden,
    guardarNuevoProveedor,
    handleCajaAccionPrincipal,
    abrirCaja,
    guardarMovimientoCaja,
    calcularDiferenciaCierre,
    procesarCierreCaja,
    abrirModalAbonoCobrar,
    procesarAbonoCobrar,
    abrirModalAbonoPagar,
    procesarAbonoPagar,
    guardarNuevoUsuario,
    toggleEstadoUsuario,
    cargarPermisosDeRol,
    guardarPermisosRol,
    guardarEmpresa
  };

})();
