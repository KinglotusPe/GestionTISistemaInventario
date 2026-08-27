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

