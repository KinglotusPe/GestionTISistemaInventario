/**
 * Catálogo y datos iniciales para Plastiquería y Distribuidora de Descartables "Jireh"
 */
export const initialData = {
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
