CREATE DATABASE IF NOT EXISTS jireh
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE jireh;

CREATE TABLE IF NOT EXISTS rol (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    estado BIT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_rol_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(40) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombres VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(120) NOT NULL,
    telefono VARCHAR(20),
    estado BIT NOT NULL,
    rol_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_usuario_usuario (usuario),
    UNIQUE KEY uk_usuario_correo (correo),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cliente (
    id BIGINT NOT NULL AUTO_INCREMENT,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(80),
    apellidos VARCHAR(80),
    razon_social VARCHAR(120),
    telefono VARCHAR(20),
    correo VARCHAR(120),
    direccion VARCHAR(180),
    PRIMARY KEY (id),
    UNIQUE KEY uk_cliente_documento (numero_documento)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS proveedor (
    id BIGINT NOT NULL AUTO_INCREMENT,
    ruc VARCHAR(20) NOT NULL,
    razon_social VARCHAR(120) NOT NULL,
    contacto VARCHAR(120),
    telefono VARCHAR(20),
    correo VARCHAR(120),
    direccion VARCHAR(180),
    PRIMARY KEY (id),
    UNIQUE KEY uk_proveedor_ruc (ruc)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categoria (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    descripcion VARCHAR(200),
    estado BIT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_categoria_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS marca (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    descripcion VARCHAR(200),
    estado BIT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_marca_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS unidad_medida (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    abreviatura VARCHAR(10) NOT NULL,
    estado BIT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_unidad_nombre (nombre),
    UNIQUE KEY uk_unidad_abreviatura (abreviatura)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS producto (
    id BIGINT NOT NULL AUTO_INCREMENT,
    codigo VARCHAR(30) NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    descripcion VARCHAR(250),
    precio_compra DECIMAL(12,2) NOT NULL,
    precio_venta DECIMAL(12,2) NOT NULL,
    stock_minimo INT NOT NULL,
    estado BIT NOT NULL,
    categoria_id BIGINT NOT NULL,
    marca_id BIGINT NOT NULL,
    unidad_medida_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_producto_codigo (codigo),
    CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria (id),
    CONSTRAINT fk_producto_marca FOREIGN KEY (marca_id) REFERENCES marca (id),
    CONSTRAINT fk_producto_unidad FOREIGN KEY (unidad_medida_id) REFERENCES unidad_medida (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inventario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    stock_actual INT NOT NULL,
    stock_maximo INT NOT NULL,
    ubicacion VARCHAR(80),
    fecha_actualizacion DATETIME(6) NOT NULL,
    producto_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_inventario_producto (producto_id),
    CONSTRAINT fk_inventario_producto FOREIGN KEY (producto_id) REFERENCES producto (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS metodo_pago (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    estado BIT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_metodo_pago_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS compra (
    id BIGINT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(30) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    igv DECIMAL(12,2) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    proveedor_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_compra_numero (numero),
    CONSTRAINT fk_compra_proveedor FOREIGN KEY (proveedor_id) REFERENCES proveedor (id),
    CONSTRAINT fk_compra_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_compra (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    compra_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detalle_compra_compra FOREIGN KEY (compra_id) REFERENCES compra (id),
    CONSTRAINT fk_detalle_compra_producto FOREIGN KEY (producto_id) REFERENCES producto (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS venta (
    id BIGINT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(30) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    igv DECIMAL(12,2) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    cliente_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    metodo_pago_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_venta_numero (numero),
    CONSTRAINT fk_venta_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    CONSTRAINT fk_venta_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    CONSTRAINT fk_venta_metodo_pago FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_venta (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    descuento DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    venta_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detalle_venta_venta FOREIGN KEY (venta_id) REFERENCES venta (id),
    CONSTRAINT fk_detalle_venta_producto FOREIGN KEY (producto_id) REFERENCES producto (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comprobante (
    id BIGINT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(20) NOT NULL,
    serie VARCHAR(10) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    fecha_emision DATETIME(6) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    venta_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_comprobante_venta (venta_id),
    CONSTRAINT fk_comprobante_venta FOREIGN KEY (venta_id) REFERENCES venta (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movimiento_inventario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    tipo_movimiento VARCHAR(30) NOT NULL,
    cantidad INT NOT NULL,
    stock_anterior INT NOT NULL,
    stock_posterior INT NOT NULL,
    motivo VARCHAR(250),
    fecha DATETIME(6) NOT NULL,
    producto_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_movimiento_producto FOREIGN KEY (producto_id) REFERENCES producto (id),
    CONSTRAINT fk_movimiento_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

-- =======================================================================
-- DATOS INICIALES PARA PLASTIQUERÍA Y DISTRIBUIDORA DE DESCARTABLES JIREH
-- =======================================================================

-- 1. Roles
INSERT INTO rol (id, nombre, descripcion, estado) VALUES
(1, 'ADMINISTRADOR', 'Acceso total al sistema', 1),
(1, 'SUPER_ADMIN', 'Acceso total y configuración del sistema', 1),
(2, 'ADMINISTRADOR', 'Gestión operativa, comercial y financiera', 1),
(3, 'CAJERO', 'Punto de Venta POS, cobros y caja personal', 1),
(4, 'VENDEDOR', 'Cotizaciones, ventas y catálogo de clientes', 1),
(5, 'ALMACENERO', 'Control de existencias, recepción y kárdex', 1),
(6, 'COMPRAS', 'Proveedores, órdenes de compra y abastecimiento', 1),
(7, 'GERENTE', 'Consulta de tableros, reportes y métricas de rentabilidad', 1)
ON DUPLICATE KEY UPDATE descripcion=VALUES(descripcion), estado=VALUES(estado);

-- 2. Usuarios del Sistema
INSERT INTO usuario (id, usuario, contrasena, nombres, apellidos, correo, telefono, estado, rol_id) VALUES
(1, 'admin', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi54r48w6N98g4a2tP83vXq/1XoK8m6', 'Administrador General', 'Jireh', 'admin@jireh.com', '987654321', 1, 1),
(2, 'vendedor', 'vendedor123', 'Rosa María', 'Medina Paredes', 'vendedor@jireh.com', '987112233', 1, 4),
(3, 'almacenero', 'almacen123', 'Carlos Eduardo', 'Gutiérrez Ríos', 'almacen@jireh.com', '987445566', 1, 5),
(4, 'cajero', 'cajero123', 'Lucía Fernanda', 'Rojas Quispe', 'caja@jireh.com', '987556677', 1, 3),
(5, 'compras', 'compras123', 'Roberto Antonio', 'Vargas Soria', 'compras@jireh.com', '987667788', 1, 6),
(6, 'gerente', 'gerente123', 'Ing. Patricia', 'Navarro Flores', 'gerencia@jireh.com', '987778899', 1, 7)
ON DUPLICATE KEY UPDATE nombres=VALUES(nombres), apellidos=VALUES(apellidos), rol_id=VALUES(rol_id);

-- 3. Categorías de Plastiquería
INSERT INTO categoria (id, nombre, descripcion, estado) VALUES
(1, 'Bolsas Plásticas y Biodegradables', 'Bolsas camiseta, chequera, de basura y herméticas', 1),
(2, 'Envases y Contenedores Térmicos', 'Tapers para comida, domos y envases delivery', 1),
(3, 'Vasos y Copas Descartables', 'Vasos plásticos transparentes, polipapel y café', 1),
(4, 'Cubiertos y Cañitas', 'Cucharas, tenedores, cuchillos y sorbetes', 1),
(5, 'Rollos y Embalaje', 'Stretch film, papel manteca, aluminio y cintas', 1),
(6, 'Artículos y Menaje Plástico', 'Baldes, tinas, tapers multiuso y organizadores', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- 4. Marcas del Rubro Plásticos y Descartables
INSERT INTO marca (id, nombre, descripcion, estado) VALUES
(1, 'Pamolsa', 'Líder en envases térmicos, vasos y cubiertos', 1),
(2, 'Reyplast', 'Artículos y menaje plástico para el hogar', 1),
(3, 'Darnel', 'Línea de envases y descartables de alta calidad', 1),
(4, 'Peruplast', 'Películas plásticas y stretch film', 1),
(5, 'Baplast', 'Bolsas plásticas y biodegradables', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- 5. Unidades de Medida
INSERT INTO unidad_medida (id, nombre, abreviatura, estado) VALUES
(1, 'Ciento', 'CTO', 1),
(2, 'Millar', 'MIL', 1),
(3, 'Paquete', 'PAQ', 1),
(4, 'Rollo', 'ROL', 1),
(5, 'Unidad', 'UND', 1),
(6, 'Caja', 'CJA', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- 6. Métodos de Pago
INSERT INTO metodo_pago (id, nombre, descripcion, estado) VALUES
(1, 'Efectivo', 'Pago en efectivo en caja', 1),
(2, 'Billetera Digital (Yape / Plin)', 'Pago móvil con QR o número', 1),
(3, 'Tarjeta Débito/Crédito', 'Terminal POS Visa / Mastercard', 1),
(4, 'Transferencia Bancaria', 'Cuentas BCP / BBVA / Interbank', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- 7. Clientes Frecuentes
INSERT INTO cliente (id, tipo_documento, numero_documento, nombres, apellidos, razon_social, telefono, correo, direccion) VALUES
(1, 'DNI', '45892147', 'Juan Carlos', 'Pérez Gómez', NULL, '987654321', 'juan.perez@gmail.com', 'Av. Las Flores 342, Lima'),
(2, 'RUC', '20601234567', NULL, NULL, 'Restaurante y Pollería El Buen Gusto S.A.C.', '014523698', 'compras@elbuengusto.pe', 'Av. Próceres 580, Lima'),
(3, 'DNI', '72145896', 'María Elena', 'Torres Silva', 'Pastelería Delicias', '974125896', 'maria.torres@delicias.pe', 'Calle Los Pinos 120, Lima'),
(4, 'RUC', '20558963214', NULL, NULL, 'Comercial & Eventos Festiva E.I.R.L.', '951236874', 'contacto@festiva.pe', 'Av. República 890, Lima')
ON DUPLICATE KEY UPDATE numero_documento=VALUES(numero_documento);

-- 8. Proveedores
INSERT INTO proveedor (id, ruc, razon_social, contacto, telefono, correo, direccion) VALUES
(1, '20100041235', 'Pamolsa Perú S.A.', 'Área Comercial', '016145000', 'ventas@pamolsa.com.pe', 'Av. Elmer Faucett 3450, Callao'),
(2, '20100125896', 'Reyplast Plásticos S.A.C.', 'Ventas Corporativas', '013264500', 'corporativo@reyplast.com.pe', 'Av. Separadora Industrial 1280, Ate'),
(3, '20512345897', 'Baplast Bolsas & Empaques E.I.R.L.', 'Carlos Barrientos', '998877665', 'ventas@baplast.pe', 'Jr. Carabaya 450, Lima')
ON DUPLICATE KEY UPDATE ruc=VALUES(ruc);

-- 9. Catálogo de Productos (Plastiquería y Descartables)
INSERT INTO producto (id, codigo, nombre, descripcion, precio_compra, precio_venta, stock_minimo, estado, categoria_id, marca_id, unidad_medida_id) VALUES
(1, 'PLAS-001', 'Bolsa Camiseta Biodegradable 1 1/2 Kg Blanca', 'Fardo de bolsas camiseta resistentes para comercio', 17.50, 24.00, 20, 1, 1, 5, 2),
(2, 'PLAS-002', 'Taper Térmico Rectangular CT4 con Tapa Bisagra', 'Envase térmico espumado para comida y delivery', 21.00, 28.50, 25, 1, 2, 1, 1),
(3, 'PLAS-003', 'Vaso Plástico Transparente 10 oz para Jugo', 'Vasos desechables transparentes reforzados', 6.20, 9.00, 30, 1, 3, 3, 1),
(4, 'PLAS-004', 'Film Plástico / Stretch Film 18 Pulgadas (Embalaje)', 'Rollo de film estirable para paletizado y embalaje', 27.00, 36.00, 10, 1, 5, 4, 4),
(5, 'PLAS-005', 'Cucharas Descartables Blancas Reforzadas', 'Cucharas de poliestireno para postres y comidas', 3.80, 5.50, 25, 1, 4, 1, 1),
(6, 'PLAS-006', 'Bolsa de Basura Negra Extra Pesada 35x40', 'Paquete de bolsas para tachos grandes y residuos', 5.50, 8.00, 20, 1, 1, 5, 3),
(7, 'PLAS-007', 'Contenedor Domo Redondo para Torta Mediana', 'Base negra con tapa domo transparente alta', 32.00, 44.00, 15, 1, 2, 3, 1),
(8, 'PLAS-008', 'Balde Plástico 20 Litros con Asa Metálica y Tapa', 'Balde industrial multiusos de alta densidad', 15.00, 22.00, 8, 1, 6, 2, 5)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion), precio_compra=VALUES(precio_compra), precio_venta=VALUES(precio_venta), stock_minimo=VALUES(stock_minimo);

-- 10. Inventario Inicial
INSERT INTO inventario (id, stock_actual, stock_maximo, ubicacion, fecha_actualizacion, producto_id) VALUES
(1, 110, 300, 'Almacén A - Estante 1', NOW(), 1),
(2, 85, 200, 'Almacén B - Rack 2', NOW(), 2),
(3, 18, 150, 'Almacén B - Estante 4', NOW(), 3),
(4, 32, 80, 'Almacén C - Pallet 1', NOW(), 4),
(5, 9, 150, 'Almacén B - Gaveta 3', NOW(), 5),
(6, 64, 180, 'Almacén A - Estante 4', NOW(), 6),
(7, 45, 120, 'Almacén B - Estante 1', NOW(), 7),
(8, 24, 60, 'Zona de Menaje - Piso', NOW(), 8)
ON DUPLICATE KEY UPDATE stock_actual=VALUES(stock_actual), stock_maximo=VALUES(stock_maximo), ubicacion=VALUES(ubicacion);

-- =======================================================================
-- TABLAS AVANZADAS PARA SISTEMA COMERCIAL INTEGRAL PLASTIQUERÍA JIREH
-- =======================================================================

-- 11. Permisos RBAC
CREATE TABLE IF NOT EXISTS permiso (
    id BIGINT NOT NULL AUTO_INCREMENT,
    codigo VARCHAR(60) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    PRIMARY KEY (id),
    UNIQUE KEY uk_permiso_codigo (codigo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rol_permiso (
    rol_id BIGINT NOT NULL,
    permiso_id BIGINT NOT NULL,
    PRIMARY KEY (rol_id, permiso_id),
    CONSTRAINT fk_rp_rol FOREIGN KEY (rol_id) REFERENCES rol (id) ON DELETE CASCADE,
    CONSTRAINT fk_rp_permiso FOREIGN KEY (permiso_id) REFERENCES permiso (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 12. Presentaciones Mayoristas y Minoristas de Productos
CREATE TABLE IF NOT EXISTS producto_presentacion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    producto_id BIGINT NOT NULL,
    nombre_presentacion VARCHAR(80) NOT NULL,
    factor_equivalencia DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    precio_costo DECIMAL(12,2) NOT NULL,
    precio_venta DECIMAL(12,2) NOT NULL,
    precio_mayorista DECIMAL(12,2),
    codigo_barras VARCHAR(50),
    es_default BIT NOT NULL DEFAULT 0,
    estado BIT NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_pp_producto FOREIGN KEY (producto_id) REFERENCES producto (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 13. Cotizaciones
CREATE TABLE IF NOT EXISTS cotizacion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(30) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    vigencia_dias INT DEFAULT 15,
    subtotal DECIMAL(12,2) NOT NULL,
    igv DECIMAL(12,2) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    observaciones VARCHAR(250),
    cliente_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_cotizacion_numero (numero),
    CONSTRAINT fk_cotiz_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    CONSTRAINT fk_cotiz_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_cotizacion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cotizacion_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    nombre_presentacion VARCHAR(80),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    descuento DECIMAL(12,2) DEFAULT 0,
    subtotal DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detcot_cotizacion FOREIGN KEY (cotizacion_id) REFERENCES cotizacion (id) ON DELETE CASCADE,
    CONSTRAINT fk_detcot_producto FOREIGN KEY (producto_id) REFERENCES producto (id)
) ENGINE=InnoDB;

-- 14. Devoluciones de Venta
CREATE TABLE IF NOT EXISTS devolucion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(30) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    motivo VARCHAR(250) NOT NULL,
    total_devuelto DECIMAL(12,2) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PROCESADA',
    venta_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_devolucion_numero (numero),
    CONSTRAINT fk_dev_venta FOREIGN KEY (venta_id) REFERENCES venta (id),
    CONSTRAINT fk_dev_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_devolucion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    devolucion_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detdev_devolucion FOREIGN KEY (devolucion_id) REFERENCES devolucion (id) ON DELETE CASCADE,
    CONSTRAINT fk_detdev_producto FOREIGN KEY (producto_id) REFERENCES producto (id)
) ENGINE=InnoDB;

-- 15. Órdenes de Compra
CREATE TABLE IF NOT EXISTS orden_compra (
    id BIGINT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(30) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    fecha_esperada DATE,
    subtotal DECIMAL(12,2) NOT NULL,
    igv DECIMAL(12,2) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    observaciones VARCHAR(250),
    proveedor_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_oc_numero (numero),
    CONSTRAINT fk_oc_proveedor FOREIGN KEY (proveedor_id) REFERENCES proveedor (id),
    CONSTRAINT fk_oc_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_orden_compra (
    id BIGINT NOT NULL AUTO_INCREMENT,
    orden_compra_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detoc_oc FOREIGN KEY (orden_compra_id) REFERENCES orden_compra (id) ON DELETE CASCADE,
    CONSTRAINT fk_detoc_producto FOREIGN KEY (producto_id) REFERENCES producto (id)
) ENGINE=InnoDB;

-- 16. Caja y Arqueos
CREATE TABLE IF NOT EXISTS caja (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    fecha_apertura DATETIME(6) NOT NULL,
    fecha_cierre DATETIME(6),
    monto_inicial DECIMAL(12,2) NOT NULL,
    total_ventas_efectivo DECIMAL(12,2) DEFAULT 0,
    total_ventas_digital DECIMAL(12,2) DEFAULT 0,
    total_ingresos DECIMAL(12,2) DEFAULT 0,
    total_egresos DECIMAL(12,2) DEFAULT 0,
    monto_esperado DECIMAL(12,2) DEFAULT 0,
    monto_contado DECIMAL(12,2),
    diferencia DECIMAL(12,2),
    estado VARCHAR(20) NOT NULL DEFAULT 'ABIERTA',
    observaciones VARCHAR(250),
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_caja_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movimiento_caja (
    id BIGINT NOT NULL AUTO_INCREMENT,
    caja_id BIGINT NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    concepto VARCHAR(200) NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    metodo_pago_id BIGINT,
    fecha DATETIME(6) NOT NULL,
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_movcaja_caja FOREIGN KEY (caja_id) REFERENCES caja (id) ON DELETE CASCADE,
    CONSTRAINT fk_movcaja_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

-- 17. Cuentas por Cobrar (Créditos a Clientes)
CREATE TABLE IF NOT EXISTS cuenta_cobrar (
    id BIGINT NOT NULL AUTO_INCREMENT,
    venta_id BIGINT NOT NULL,
    cliente_id BIGINT NOT NULL,
    monto_total DECIMAL(12,2) NOT NULL,
    monto_pagado DECIMAL(12,2) DEFAULT 0,
    saldo_pendiente DECIMAL(12,2) NOT NULL,
    fecha_emision DATETIME(6) NOT NULL,
    fecha_vencimiento DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    PRIMARY KEY (id),
    CONSTRAINT fk_cxc_venta FOREIGN KEY (venta_id) REFERENCES venta (id),
    CONSTRAINT fk_cxc_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS abono_cuenta_cobrar (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cuenta_cobrar_id BIGINT NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    metodo_pago_id BIGINT NOT NULL,
    nota VARCHAR(200),
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_abocxc_cxc FOREIGN KEY (cuenta_cobrar_id) REFERENCES cuenta_cobrar (id) ON DELETE CASCADE,
    CONSTRAINT fk_abocxc_metodo FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago (id),
    CONSTRAINT fk_abocxc_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

-- 18. Cuentas por Pagar (Créditos con Proveedores)
CREATE TABLE IF NOT EXISTS cuenta_pagar (
    id BIGINT NOT NULL AUTO_INCREMENT,
    compra_id BIGINT NOT NULL,
    proveedor_id BIGINT NOT NULL,
    monto_total DECIMAL(12,2) NOT NULL,
    monto_pagado DECIMAL(12,2) DEFAULT 0,
    saldo_pendiente DECIMAL(12,2) NOT NULL,
    fecha_emision DATETIME(6) NOT NULL,
    fecha_vencimiento DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    PRIMARY KEY (id),
    CONSTRAINT fk_cxp_compra FOREIGN KEY (compra_id) REFERENCES compra (id),
    CONSTRAINT fk_cxp_proveedor FOREIGN KEY (proveedor_id) REFERENCES proveedor (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS abono_cuenta_pagar (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cuenta_pagar_id BIGINT NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    metodo_pago_id BIGINT NOT NULL,
    nota VARCHAR(200),
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_abocxp_cxp FOREIGN KEY (cuenta_pagar_id) REFERENCES cuenta_pagar (id) ON DELETE CASCADE,
    CONSTRAINT fk_abocxp_metodo FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago (id),
    CONSTRAINT fk_abocxp_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

-- 19. Auditoría del Sistema
CREATE TABLE IF NOT EXISTS auditoria (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT,
    username VARCHAR(60) NOT NULL,
    modulo VARCHAR(60) NOT NULL,
    accion VARCHAR(60) NOT NULL,
    entidad VARCHAR(60),
    entidad_id BIGINT,
    descripcion VARCHAR(300),
    fecha_hora DATETIME(6) NOT NULL,
    ip_origen VARCHAR(45),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- 20. Configuración de Empresa
CREATE TABLE IF NOT EXISTS empresa_config (
    id BIGINT NOT NULL,
    razon_social VARCHAR(150) NOT NULL,
    nombre_comercial VARCHAR(150) NOT NULL,
    ruc VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(30),
    correo VARCHAR(100),
    moneda_simbolo VARCHAR(10) DEFAULT 'S/',
    moneda_nombre VARCHAR(30) DEFAULT 'Soles',
    igv_porcentaje DECIMAL(5,2) DEFAULT 18.00,
    mensaje_ticket VARCHAR(250),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =======================================================================
-- DATOS SEMILLA PARA PERMISOS, PRESENTACIONES Y CONFIGURACIÓN DE EMPRESA
-- =======================================================================

-- Permisos del Sistema
INSERT INTO permiso (id, codigo, nombre, modulo, descripcion) VALUES
(1, 'DASHBOARD_VER', 'Ver Tablero Ejecutivo', 'Dashboard', 'Visualización de métricas, tarjetas y gráficos'),
(2, 'PRODUCTO_VER', 'Consultar Productos', 'Inventario', 'Ver catálogo y detalle de productos'),
(3, 'PRODUCTO_CREAR', 'Crear Producto', 'Inventario', 'Registrar nuevos productos en el catálogo'),
(4, 'PRODUCTO_EDITAR', 'Modificar Producto', 'Inventario', 'Actualizar datos, precios y categorías'),
(5, 'PRODUCTO_DESACTIVAR', 'Desactivar Producto', 'Inventario', 'Baja lógica de productos sin eliminar historial'),
(6, 'INVENTARIO_VER', 'Ver Stock', 'Inventario', 'Consultar existencias y semáforos de stock'),
(7, 'INVENTARIO_AJUSTAR', 'Ajustar Inventario', 'Inventario', 'Entradas, salidas manuales y mermas'),
(8, 'KARDEX_VER', 'Consultar Kárdex', 'Inventario', 'Historial detallado físico y valorizado'),
(9, 'VENTA_VER', 'Historial de Ventas', 'Ventas', 'Consultar comprobantes y ventas realizadas'),
(10, 'VENTA_CREAR', 'Emitir Venta (POS)', 'Ventas', 'Uso del punto de venta y emisión de boletas/tickets'),
(11, 'VENTA_ANULAR', 'Anular Venta', 'Ventas', 'Cancelación de ventas y restitución de stock'),
(12, 'VENTA_DESCUENTO', 'Aplicar Descuentos', 'Ventas', 'Permiso para otorgar rebajas en caja'),
(13, 'VENTA_DEVOLVER', 'Devoluciones de Venta', 'Ventas', 'Recepción de mercadería devuelta por clientes'),
(14, 'COTIZACION_VER', 'Ver Cotizaciones', 'Ventas', 'Consultar propuestas comerciales'),
(15, 'COTIZACION_CREAR', 'Emitir y Convertir Cotización', 'Ventas', 'Crear cotizaciones y convertirlas a venta'),
(16, 'COMPRA_VER', 'Ver Compras', 'Compras', 'Consultar compras a proveedores'),
(17, 'COMPRA_CREAR', 'Registrar Compra', 'Compras', 'Ingresar facturas de compras y sumar stock'),
(18, 'COMPRA_ANULAR', 'Anular Compra', 'Compras', 'Cancelar compras recibidas'),
(19, 'ORDEN_COMPRA_VER', 'Ver Órdenes de Compra', 'Compras', 'Consultar solicitudes a proveedores'),
(20, 'ORDEN_COMPRA_CREAR', 'Generar Órdenes de Compra', 'Compras', 'Crear y aprobar órdenes de abastecimiento'),
(21, 'CAJA_VER', 'Consultar Caja', 'Finanzas', 'Ver estado y arqueo de caja'),
(22, 'CAJA_ABRIR', 'Apertura de Caja', 'Finanzas', 'Registrar fondo de sencillo inicial'),
(23, 'CAJA_CERRAR', 'Cierre y Arqueo de Caja', 'Finanzas', 'Cierre diario de turno y balance'),
(24, 'CAJA_INGRESO', 'Registrar Ingreso a Caja', 'Finanzas', 'Entradas extraordinarias de dinero'),
(25, 'CAJA_EGRESO', 'Registrar Egreso de Caja', 'Finanzas', 'Gastos menores, viáticos o pagos'),
(26, 'CLIENTE_VER', 'Ver Directorio Clientes', 'Clientes', 'Consultar clientes registrados'),
(27, 'CLIENTE_CREAR', 'Registrar Cliente', 'Clientes', 'Alta rápida desde POS o módulo'),
(28, 'CLIENTE_EDITAR', 'Editar Cliente', 'Clientes', 'Actualizar teléfonos, RUC o direcciones'),
(29, 'PROVEEDOR_VER', 'Ver Proveedores', 'Proveedores', 'Directorio de empresas distribuidoras'),
(30, 'PROVEEDOR_CREAR', 'Registrar Proveedor', 'Proveedores', 'Crear proveedores con RUC'),
(31, 'PROVEEDOR_EDITAR', 'Editar Proveedor', 'Proveedores', 'Actualizar condiciones comerciales'),
(32, 'FINANZAS_VER', 'Ver Cuentas y Cobranzas', 'Finanzas', 'Cuentas por cobrar y pagar'),
(33, 'REPORTE_VENTAS', 'Reportes de Ventas', 'Reportes', 'Ventas por periodo, cliente y medio de pago'),
(34, 'REPORTE_COMPRAS', 'Reportes de Compras', 'Reportes', 'Adquisiciones y gastos a proveedores'),
(35, 'REPORTE_INVENTARIO', 'Reporte Inventario Valorizado', 'Reportes', 'Valor total en almacén a precio de costo'),
(36, 'REPORTE_GANANCIAS', 'Reporte de Utilidad Real', 'Reportes', 'Utilidad bruta = Ventas - Costo de ventas'),
(37, 'USUARIO_VER', 'Ver Usuarios', 'Sistema', 'Consultar lista de colaboradores'),
(38, 'USUARIO_CREAR', 'Registrar Usuario', 'Sistema', 'Crear nuevos accesos'),
(39, 'USUARIO_EDITAR', 'Editar Usuario', 'Sistema', 'Modificar roles, claves y datos'),
(40, 'USUARIO_DESACTIVAR', 'Desactivar Usuario', 'Sistema', 'Bloquear acceso al sistema'),
(41, 'ROL_GESTIONAR', 'Gestionar Roles', 'Sistema', 'Crear y configurar roles y privilegios'),
(42, 'PERMISO_GESTIONAR', 'Configurar Permisos', 'Sistema', 'Asignación granular por perfil'),
(43, 'AUDITORIA_VER', 'Ver Logs de Auditoría', 'Sistema', 'Trazabilidad de operaciones críticas'),
(44, 'CONFIG_EMPRESA', 'Configurar Empresa', 'Sistema', 'Razón social, RUC, logo y mensaje ticket')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), modulo=VALUES(modulo), descripcion=VALUES(descripcion);

-- Asignación de Permisos a SUPER_ADMIN (Todos los 44 permisos)
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 1, id FROM permiso;

-- Asignación de Permisos a ADMINISTRADOR (Todos excepto auditoría profunda)
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 2, id FROM permiso WHERE codigo NOT IN ('AUDITORIA_VER');

-- Asignación a CAJERO
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 3, id FROM permiso WHERE codigo IN (
    'DASHBOARD_VER', 'VENTA_VER', 'VENTA_CREAR', 'CLIENTE_VER', 'CLIENTE_CREAR',
    'PRODUCTO_VER', 'CAJA_VER', 'CAJA_ABRIR', 'CAJA_CERRAR'
);

-- Asignación a VENDEDOR
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 4, id FROM permiso WHERE codigo IN (
    'DASHBOARD_VER', 'VENTA_VER', 'VENTA_CREAR', 'VENTA_DESCUENTO', 'COTIZACION_VER',
    'COTIZACION_CREAR', 'PRODUCTO_VER', 'CLIENTE_VER', 'CLIENTE_CREAR', 'CLIENTE_EDITAR'
);

-- Asignación a ALMACENERO
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 5, id FROM permiso WHERE codigo IN (
    'DASHBOARD_VER', 'PRODUCTO_VER', 'PRODUCTO_CREAR', 'PRODUCTO_EDITAR', 'INVENTARIO_VER',
    'INVENTARIO_AJUSTAR', 'KARDEX_VER', 'REPORTE_INVENTARIO', 'COMPRA_VER'
);

-- Asignación a COMPRAS
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 6, id FROM permiso WHERE codigo IN (
    'DASHBOARD_VER', 'PROVEEDOR_VER', 'PROVEEDOR_CREAR', 'PROVEEDOR_EDITAR', 'ORDEN_COMPRA_VER',
    'ORDEN_COMPRA_CREAR', 'COMPRA_VER', 'COMPRA_CREAR', 'PRODUCTO_VER', 'INVENTARIO_VER'
);

-- Asignación a GERENTE
INSERT IGNORE INTO rol_permiso (rol_id, permiso_id)
SELECT 7, id FROM permiso WHERE codigo IN (
    'DASHBOARD_VER', 'VENTA_VER', 'COTIZACION_VER', 'COMPRA_VER', 'ORDEN_COMPRA_VER',
    'PRODUCTO_VER', 'INVENTARIO_VER', 'KARDEX_VER', 'CLIENTE_VER', 'PROVEEDOR_VER',
    'CAJA_VER', 'FINANZAS_VER', 'REPORTE_VENTAS', 'REPORTE_COMPRAS', 'REPORTE_INVENTARIO',
    'REPORTE_GANANCIAS'
);

-- Presentaciones de Productos (Venta Mayorista y Minorista)
INSERT INTO producto_presentacion (id, producto_id, nombre_presentacion, factor_equivalencia, precio_costo, precio_venta, precio_mayorista, codigo_barras, es_default, estado) VALUES
(1, 1, 'Millar (1000 und)', 1.00, 17.50, 24.00, 21.00, '775000100101', 1, 1),
(2, 1, 'Ciento (100 und)', 0.10, 1.80, 2.80, 2.50, '775000100102', 0, 1),
(3, 1, 'Fardo x 10 Millares', 10.00, 170.00, 220.00, 195.00, '775000100103', 0, 1),

(4, 2, 'Ciento (100 und)', 1.00, 21.00, 28.50, 26.00, '775000200201', 1, 1),
(5, 2, 'Paquete x 25 und', 0.25, 5.50, 8.00, 7.20, '775000200202', 0, 1),
(6, 2, 'Caja x 500 und', 5.00, 100.00, 135.00, 125.00, '775000200203', 0, 1),

(7, 3, 'Ciento (100 und)', 1.00, 6.20, 9.00, 8.00, '775000300301', 1, 1),
(8, 3, 'Paquete x 50 und', 0.50, 3.20, 4.80, 4.30, '775000300302', 0, 1),
(9, 3, 'Millar (1000 und)', 10.00, 58.00, 82.00, 75.00, '775000300303', 0, 1),

(10, 4, 'Rollo Individual', 1.00, 27.00, 36.00, 32.00, '775000400401', 1, 1),
(11, 4, 'Caja x 4 Rollos', 4.00, 105.00, 138.00, 125.00, '775000400402', 0, 1),

(12, 5, 'Ciento (100 und)', 1.00, 3.80, 5.50, 4.80, '775000500501', 1, 1),
(13, 5, 'Millar (1000 und)', 10.00, 36.00, 50.00, 45.00, '775000500502', 0, 1),

(14, 6, 'Paquete x 10 und', 1.00, 5.50, 8.00, 7.00, '775000600601', 1, 1),
(15, 6, 'Fardo x 100 und (10 paq)', 10.00, 52.00, 72.00, 65.00, '775000600602', 0, 1)
ON DUPLICATE KEY UPDATE nombre_presentacion=VALUES(nombre_presentacion), precio_venta=VALUES(precio_venta), precio_mayorista=VALUES(precio_mayorista);

-- Configuración de Plastiquería Jireh
INSERT INTO empresa_config (id, razon_social, nombre_comercial, ruc, direccion, telefono, correo, moneda_simbolo, moneda_nombre, igv_porcentaje, mensaje_ticket) VALUES
(1, 'PLASTIQUERÍA Y DESCARTABLES JIREH E.I.R.L.', 'PLASTIQUERÍA JIREH', '20608945123', 'Av. Central 742, Mercado Mayorista, Lima', '01 458-9214 / 987 654 321', 'contacto@plastiqueriajireh.pe', 'S/', 'Soles', 18.00, '¡Gracias por su compra! Distribución mayorista y minorista de plásticos y descartables.')
ON DUPLICATE KEY UPDATE razon_social=VALUES(razon_social), ruc=VALUES(ruc), mensaje_ticket=VALUES(mensaje_ticket);

-- Caja Abierta de Demostración
INSERT INTO caja (id, nombre, fecha_apertura, fecha_cierre, monto_inicial, total_ventas_efectivo, total_ventas_digital, total_ingresos, total_egresos, monto_esperado, monto_contado, diferencia, estado, observaciones, usuario_id) VALUES
(1, 'Caja Principal 01', NOW(), NULL, 150.00, 82.50, 45.00, 0.00, 15.00, 217.50, NULL, 0.00, 'ABIERTA', 'Turno mañana aperturado con sencillo para cambio', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

