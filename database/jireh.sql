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
(2, 'VENDEDOR', 'Acceso a facturación, POS y ventas', 1),
(3, 'ALMACENERO', 'Control de stock y movimientos de inventario', 1)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- 2. Usuario Administrador
INSERT INTO usuario (id, usuario, contrasena, nombres, apellidos, correo, telefono, estado, rol_id) VALUES
(1, 'admin', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi54r48w6N98g4a2tP83vXq/1XoK8m6', 'Administrador', 'Jireh', 'admin@jireh.com', '987654321', 1, 1)
ON DUPLICATE KEY UPDATE usuario=VALUES(usuario);

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
ON DUPLICATE KEY UPDATE codigo=VALUES(codigo);

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
ON DUPLICATE KEY UPDATE stock_actual=VALUES(stock_actual);
