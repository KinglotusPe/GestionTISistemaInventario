/**
 * Catálogo y datos maestros completos para Plastiquería y Distribuidora de Descartables "Jireh"
 * Soporta modo Online (Spring Boot + MySQL) y modo Offline (Universidad / Demostración)
 */
export const initialData = {
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
    mensajeTicket: "¡Gracias por su compra! Distribución mayorista y minorista de plásticos y descartables."
  },
  roles: [
    { id: 1, nombre: "SUPER_ADMIN", descripcion: "Acceso total y configuración del sistema", estado: true, permisoCodigos: ["*"] },
    { id: 2, nombre: "ADMINISTRADOR", descripcion: "Gestión operativa, comercial y financiera", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "VENTA_CREAR", "VENTA_ANULAR", "VENTA_DESCUENTO", "COTIZACION_VER", "COTIZACION_CREAR", "VENTA_DEVOLVER", "PRODUCTO_VER", "PRODUCTO_CREAR", "PRODUCTO_EDITAR", "PRODUCTO_DESACTIVAR", "INVENTARIO_VER", "INVENTARIO_AJUSTAR", "KARDEX_VER", "COMPRA_VER", "COMPRA_CREAR", "ORDEN_COMPRA_VER", "ORDEN_COMPRA_CREAR", "PROVEEDOR_VER", "PROVEEDOR_CREAR", "PROVEEDOR_EDITAR", "CLIENTE_VER", "CLIENTE_CREAR", "CLIENTE_EDITAR", "CAJA_VER", "CAJA_ABRIR", "CAJA_CERRAR", "CAJA_INGRESO", "CAJA_EGRESO", "FINANZAS_VER", "REPORTE_VENTAS", "REPORTE_COMPRAS", "REPORTE_INVENTARIO", "REPORTE_GANANCIAS", "USUARIO_VER", "USUARIO_CREAR", "USUARIO_EDITAR", "USUARIO_DESACTIVAR", "ROL_GESTIONAR", "PERMISO_GESTIONAR", "CONFIG_EMPRESA"] },
    { id: 3, nombre: "CAJERO", descripcion: "Punto de Venta POS, cobros y caja personal", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "VENTA_CREAR", "CLIENTE_VER", "CLIENTE_CREAR", "PRODUCTO_VER", "CAJA_VER", "CAJA_ABRIR", "CAJA_CERRAR"] },
    { id: 4, nombre: "VENDEDOR", descripcion: "Cotizaciones, ventas y catálogo de clientes", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "VENTA_CREAR", "VENTA_DESCUENTO", "COTIZACION_VER", "COTIZACION_CREAR", "PRODUCTO_VER", "CLIENTE_VER", "CLIENTE_CREAR", "CLIENTE_EDITAR"] },
    { id: 5, nombre: "ALMACENERO", descripcion: "Control de existencias, recepción y kárdex", estado: true, permisoCodigos: ["DASHBOARD_VER", "PRODUCTO_VER", "PRODUCTO_CREAR", "PRODUCTO_EDITAR", "INVENTARIO_VER", "INVENTARIO_AJUSTAR", "KARDEX_VER", "REPORTE_INVENTARIO", "COMPRA_VER"] },
    { id: 6, nombre: "COMPRAS", descripcion: "Proveedores, órdenes de compra y abastecimiento", estado: true, permisoCodigos: ["DASHBOARD_VER", "PROVEEDOR_VER", "PROVEEDOR_CREAR", "PROVEEDOR_EDITAR", "ORDEN_COMPRA_VER", "ORDEN_COMPRA_CREAR", "COMPRA_VER", "COMPRA_CREAR", "PRODUCTO_VER", "INVENTARIO_VER"] },
    { id: 7, nombre: "GERENTE", descripcion: "Consulta de tableros, reportes y métricas de rentabilidad", estado: true, permisoCodigos: ["DASHBOARD_VER", "VENTA_VER", "COTIZACION_VER", "COMPRA_VER", "ORDEN_COMPRA_VER", "PRODUCTO_VER", "INVENTARIO_VER", "KARDEX_VER", "CLIENTE_VER", "PROVEEDOR_VER", "CAJA_VER", "FINANZAS_VER", "REPORTE_VENTAS", "REPORTE_COMPRAS", "REPORTE_INVENTARIO", "REPORTE_GANANCIAS"] }
  ],
  usuarios: [
    { id: 1, usuario: "admin", contrasena: "admin", nombres: "Administrador General", apellidos: "Jireh", correo: "admin@jireh.com", telefono: "987654321", rolId: 1, rolNombre: "SUPER_ADMIN", estado: true },
    { id: 2, usuario: "vendedor", contrasena: "vendedor123", nombres: "Rosa María", apellidos: "Medina Paredes", correo: "vendedor@jireh.com", telefono: "987112233", rolId: 4, rolNombre: "VENDEDOR", estado: true },
    { id: 3, usuario: "almacenero", contrasena: "almacen123", nombres: "Carlos Eduardo", apellidos: "Gutiérrez Ríos", correo: "almacen@jireh.com", telefono: "987445566", rolId: 5, rolNombre: "ALMACENERO", estado: true },
    { id: 4, usuario: "cajero", contrasena: "cajero123", nombres: "Lucía Fernanda", apellidos: "Rojas Quispe", correo: "caja@jireh.com", telefono: "987556677", rolId: 3, rolNombre: "CAJERO", estado: true },
    { id: 5, usuario: "compras", contrasena: "compras123", nombres: "Roberto Antonio", apellidos: "Vargas Soria", correo: "compras@jireh.com", telefono: "987667788", rolId: 6, rolNombre: "COMPRAS", estado: true },
    { id: 6, usuario: "gerente", contrasena: "gerente123", nombres: "Ing. Patricia", apellidos: "Navarro Flores", correo: "gerencia@jireh.com", telefono: "987778899", rolId: 7, rolNombre: "GERENTE", estado: true }
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
    { id: 4, nombre: "Transferencia Bancaria", descripcion: "BCP, BBVA, Interbank", estado: true }
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
      unidadMedidaNombre: "Millar",
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
      unidadMedidaNombre: "Ciento",
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
      unidadMedidaNombre: "Ciento",
      stockMinimo: 30,
      stockActual: 18,
      stockMaximo: 150,
      ubicacion: "Almacén B - Estante 4",
      estado: true,
      presentaciones: [
        { id: 7, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 1.0, precioCosto: 6.20, precioVenta: 9.00, precioMayorista: 8.00, codigoBarras: "775000300301", esDefault: true },
        { id: 8, nombrePresentacion: "Paquete x 50 und", factorEquivalencia: 0.5, precioCosto: 3.20, precioVenta: 4.80, precioMayorista: 4.30, codigoBarras: "775000300302", esDefault: false },
        { id: 9, nombrePresentacion: "Millar (1000 und)", factorEquivalencia: 10.0, precioCosto: 58.00, precioVenta: 82.00, precioMayorista: 75.00, codigoBarras: "775000300303", esDefault: false }
      ]
    },
    {
      id: 4,
      codigo: "PLAS-004",
      codigoBarras: "775000400401",
      nombre: "Film Plástico / Stretch Film 18 Pulgadas (Embalaje)",
      descripcion: "Rollo de film estirable para paletizado y protección",
      precioCompra: 27.00,
      precioVenta: 36.00,
      categoriaId: 5,
      categoriaNombre: "Rollos y Embalaje",
      marcaId: 4,
      marcaNombre: "Peruplast",
      unidadMedidaId: 4,
      unidadMedidaNombre: "Rollo",
      stockMinimo: 10,
      stockActual: 32,
      stockMaximo: 80,
      ubicacion: "Almacén C - Pallet 1",
      estado: true,
      presentaciones: [
        { id: 10, nombrePresentacion: "Rollo Individual", factorEquivalencia: 1.0, precioCosto: 27.00, precioVenta: 36.00, precioMayorista: 32.00, codigoBarras: "775000400401", esDefault: true },
        { id: 11, nombrePresentacion: "Caja x 4 Rollos", factorEquivalencia: 4.0, precioCosto: 105.00, precioVenta: 138.00, precioMayorista: 125.00, codigoBarras: "775000400402", esDefault: false }
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
      unidadMedidaNombre: "Ciento",
      stockMinimo: 25,
      stockActual: 9,
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
      descripcion: "Paquete de bolsas para tachos grandes y residuos",
      precioCompra: 5.50,
      precioVenta: 8.00,
      categoriaId: 1,
      categoriaNombre: "Bolsas Plásticas y Biodegradables",
      marcaId: 5,
      marcaNombre: "Baplast",
      unidadMedidaId: 3,
      unidadMedidaNombre: "Paquete",
      stockMinimo: 20,
      stockActual: 64,
      stockMaximo: 180,
      ubicacion: "Almacén A - Estante 4",
      estado: true,
      presentaciones: [
        { id: 14, nombrePresentacion: "Paquete x 10 und", factorEquivalencia: 1.0, precioCosto: 5.50, precioVenta: 8.00, precioMayorista: 7.00, codigoBarras: "775000600601", esDefault: true },
        { id: 15, nombrePresentacion: "Fardo x 100 und (10 paq)", factorEquivalencia: 10.0, precioCosto: 52.00, precioVenta: 72.00, precioMayorista: 65.00, codigoBarras: "775000600602", esDefault: false }
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
      unidadMedidaNombre: "Ciento",
      stockMinimo: 15,
      stockActual: 45,
      stockMaximo: 120,
      ubicacion: "Almacén B - Estante 1",
      estado: true,
      presentaciones: [
        { id: 16, nombrePresentacion: "Ciento (100 und)", factorEquivalencia: 1.0, precioCosto: 32.00, precioVenta: 44.00, precioMayorista: 39.00, codigoBarras: "775000700701", esDefault: true }
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
      unidadMedidaNombre: "Unidad",
      stockMinimo: 8,
      stockActual: 24,
      stockMaximo: 60,
      ubicacion: "Zona de Menaje - Piso",
      estado: true,
      presentaciones: [
        { id: 17, nombrePresentacion: "Unidad", factorEquivalencia: 1.0, precioCosto: 15.00, precioVenta: 22.00, precioMayorista: 19.50, codigoBarras: "775000800801", esDefault: true }
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
      estado: "COMPLETADA",
      detalles: [
        { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg", cantidad: 2, precioUnitario: 24.00, subtotal: 48.00 },
        { productoId: 5, productoCodigo: "PLAS-005", productoNombre: "Cucharas Descartables Blancas", cantidad: 2, precioUnitario: 5.50, subtotal: 11.00 },
        { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg", cantidad: 1, precioUnitario: 24.00, subtotal: 24.00 }
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
      estado: "COMPLETADA",
      detalles: [
        { productoId: 2, productoCodigo: "PLAS-002", productoNombre: "Taper Térmico Rectangular CT4", cantidad: 2, precioUnitario: 28.50, subtotal: 57.00 },
        { productoId: 6, productoCodigo: "PLAS-006", productoNombre: "Bolsa de Basura Negra Extra Pesada", cantidad: 2, precioUnitario: 8.00, subtotal: 16.00 }
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
        { productoId: 1, productoCodigo: "PLAS-001", productoNombre: "Bolsa Camiseta Biodegradable", cantidad: 5, precioUnitario: 21.00, subtotal: 105.00 },
        { productoId: 3, productoCodigo: "PLAS-003", productoNombre: "Vaso Plástico 10 oz", cantidad: 10, precioUnitario: 7.55, subtotal: 75.50 }
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
    montoEsperado: 208.00, // Inicial 150 + Efectivo 73 - Egresos 15
    montoContado: null,
    diferencia: 0.00,
    estado: "ABIERTA",
    observaciones: "Turno mañana aperturado con sencillo",
    movimientos: [
      { id: 1, tipo: "APERTURA", concepto: "Fondo inicial de sencillo", monto: 150.00, fecha: new Date(Date.now() - 28800000).toISOString() },
      { id: 2, tipo: "VENTA", concepto: "Venta VNT-000101 (Yape)", monto: 83.00, fecha: new Date(Date.now() - 3600000 * 2).toISOString() },
      { id: 3, tipo: "VENTA", concepto: "Venta VNT-000102 (Efectivo)", monto: 73.00, fecha: new Date(Date.now() - 3600000 * 5).toISOString() },
      { id: 4, tipo: "EGRESO", concepto: "Compra de útiles y cinta de embalaje", monto: 15.00, fecha: new Date(Date.now() - 7200000).toISOString() }
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
    {
      id: 1,
      tipoMovimiento: "ENTRADA",
      cantidad: 50,
      stockAnterior: 60,
      stockPosterior: 110,
      motivo: "Recepción de mercadería Baplast - Factura F001-4432",
      fecha: new Date(Date.now() - 86400000).toISOString(),
      productoId: 1,
      productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg",
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
      productoNombre: "Bolsa Camiseta Biodegradable 1 1/2 Kg",
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
      productoNombre: "Taper Térmico Rectangular CT4",
      usuarioId: 1
    }
  ],
  auditorias: [
    {
      id: 1,
      username: "admin",
      modulo: "SEGURIDAD",
      accion: "LOGIN",
      descripcion: "Inicio de sesión administrativo exitoso",
      fechaHora: new Date(Date.now() - 3600000 * 8).toISOString(),
      ipOrigen: "127.0.0.1"
    },
    {
      id: 2,
      username: "admin",
      modulo: "VENTAS",
      accion: "REGISTRAR_VENTA",
      descripcion: "Venta emitida VNT-000101 Total S/ 83.00",
      fechaHora: new Date(Date.now() - 3600000 * 2).toISOString(),
      ipOrigen: "127.0.0.1"
    }
  ]
};
