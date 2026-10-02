# Sistema Integral de Gestión Comercial, Ventas, Compras e Inventario — Plastiquería Jireh

> **Giro de Negocio:** Plastiquería y Distribuidora Mayorista / Minorista de Descartables  
> **Comercialización:** Bolsas plásticas y biodegradables, tapers térmicos, vasos descartables, cubiertos, sorbetes, contenedores para delivery, stretch film, papel manteca, aluminio, bolsas de basura y menaje plástico.  
> **Arquitectura:** Desacoplada (Backend Spring Boot + MySQL + Seguridad RBAC + Frontend SPA + Modo Offline Portátil).

---

## 📌 1. Visión General del Sistema

El **Sistema de Ventas, Compras e Inventario Plastiquería Jireh** es una solución ERP/POS comercial de nivel empresarial diseñada específicamente para las operaciones de una plastiquería y distribuidora. Resuelve los principales retos del rubro:

1. **Venta Multi-Presentación (Mayorista y Minorista):** Administra diferentes presentaciones para un mismo producto (Millar, Ciento, Paquete, Rollo, Fardo, Caja, Unidad) con factores de equivalencia y precios diferenciados sin duplicar registros en la base de datos.
2. **Punto de Venta (POS) Rápido:** Compatible con lectores físicos de códigos de barras (entrada de teclado), selección de presentación en vivo, cálculo en tiempo real de vuelto y emisión de tickets/boletas de venta.
3. **Control de Inventario y Kárdex Valorado:** Trazabilidad completa de entradas por compras, salidas por ventas, devoluciones y mermas con cálculo de existencias en tiempo real y alertas de stock bajo y agotado.
4. **Seguridad RBAC (Role-Based Access Control):** Control de acceso granular por privilegios tanto en frontend (ocultamiento dinámico de botones y menús) como en backend (interceptor de seguridad con código HTTP `403 Forbidden`).
5. **Finanzas y Caja:** Flujo obligatorio de apertura de turno, registro de ingresos/egresos, arqueo de cierre con cálculo de diferencia (faltante/sobrante), y seguimiento de cuentas por cobrar (créditos a clientes) y cuentas por pagar (proveedores).
6. **Rentabilidad y Utilidad Real:** Cálculo de la **Utilidad Bruta** real (`Ingresos de Ventas - Costo de Mercadería Vendida`) evitando confundir ingresos brutos con ganancia neta.
7. **Arquitectura Dual:** Puede ejecutarse en modo completo conectado a MySQL y Spring Boot, o en modo portátil sin dependencias para presentaciones académicas o demostraciones.

---

## 🛠️ 2. Tecnologías Utilizadas

| Capa / Componente | Tecnología | Detalle |
| :--- | :--- | :--- |
| **Backend** | Java 17 LTS | Core de la aplicación |
| **Framework** | Spring Boot 4.x | Web MVC, Spring Data JPA, Hibernate, Bean Validation |
| **Seguridad** | RBAC Custom & BCrypt | `@RequirePermission`, `AuthInterceptor` (HTTP 403) |
| **Base de Datos** | MySQL 8.0+ | Modelo relacional íntegro, llaves foráneas e índices |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Interfaz SPA moderna, temas oscuros y responsivos |
| **Gestor de Compilación** | Apache Maven | Maven Wrapper incluido (`mvnw.cmd` / `mvnw`) |

---

## 🏢 3. Módulos del Sistema

El menú lateral está organizado en 7 secciones empresariales:

### 📊 PRINCIPAL
- **Dashboard:** KPIs de ventas del día, ventas del mes, compras, utilidad estimada, valorización de inventario, distribución porcentual de métodos de pago (Efectivo, Yape/Plin, Tarjetas), alertas de stock bajo y últimas ventas emitidas.
- **Punto de Venta (POS):** Búsqueda por nombre o lector de código de barras, selector de presentación (Unidad, Ciento, Millar, etc.), selección de cliente o venta rápida a Consumidor Final, métodos de pago múltiples (Efectivo, Billetera Digital, Tarjeta, Crédito), calculadora de vuelto en tiempo real e impresión de comprobante térmico.

### 🧾 VENTAS
- **Historial de Ventas:** Visualización de comprobantes emitidos, detalle de venta y anulación de ventas con restitución automática al stock y registro de auditoría.
- **Cotizaciones:** Emisión de cotizaciones para clientes mayoristas y catering, con botón **"⚡ Convertir en Venta"** en 1 clic sin volver a digitar.
- **Devoluciones:** Registro de mercadería devuelta por clientes con retorno automático al inventario y generación del movimiento en Kárdex.
- **Clientes:** Directorio de clientes clasificados en Minoristas, Mayoristas y Empresas, con soporte para DNI y RUC.

### 📦 INVENTARIO
- **Catálogo de Productos:** Gestión de productos con múltiples presentaciones y precios mayoristas, stock actual, stock mínimo y semáforos de estado (🟢 Normal, 🟡 Bajo, 🔴 Agotado). Baja lógica de productos.
- **Categorías & Marcas:** Clasificación de descartables (Pamolsa, Reyplast, Darnel, Peruplast, Baplast, etc.).
- **Movimientos de Stock:** Bitácora inmutable de entradas, salidas, ajustes y motivos.
- **Kárdex Valorado:** Kárdex por producto con filtro de entradas, salidas y saldo físico valorado.

### 🛒 COMPRAS
- **Registro de Compras:** Ingreso de mercadería por facturas de distribuidores con incremento automático de existencias y opción de compra al crédito.
- **Órdenes de Compra:** Gestión de órdenes de reabastecimiento con botón **"⚡ Recibir Mercadería"** para convertir en compra real.
- **Proveedores:** Catálogo de fabricantes con RUC, contacto y dirección.

### 💵 FINANZAS
- **Caja & Arqueo:** Apertura de turno con fondo inicial, registro de ingresos manuales, gastos menores (egresos), y cierre con arqueo (efectivo contado vs esperado y cálculo de diferencia).
- **Cuentas por Cobrar:** Control de ventas a crédito a clientes mayoristas y registro de abonos parciales.
- **Cuentas por Pagar:** Deudas pendientes con proveedores de plásticos y cronograma de pagos.

### 📈 REPORTES
- **Reportes y Rentabilidad:** Ventas periódicas, costo de mercadería vendida, **Utilidad Bruta real**, valorización de almacén y ranking Top 5 de productos más vendidos.

### 🛡️ SISTEMA
- **Usuarios:** Altas, bajas, asignación de roles y estados de cuenta.
- **Roles y Permisos (RBAC):** Matriz dinámica de 44 permisos configurables mediante casillas de verificación (checkboxes).
- **Auditoría:** Registro inmutable de eventos críticos (inicios de sesión, cambios de precio, anulaciones, arqueos).
- **Datos de Empresa:** Configuración de Razón Social, RUC comercial, impuestos (IGV 18%) y mensaje de pie del ticket de venta.

---

## 🔐 4. Matriz de Roles y Privilegios (RBAC)

El sistema incluye 7 perfiles predeterminados configurables:

| Rol | Usuario de Prueba | Contraseña | Alcance y Privilegios Principales |
| :--- | :--- | :--- | :--- |
| **SUPER_ADMIN** | `admin` | `admin` | Acceso total e irrestricto a todos los módulos y seguridad. |
| **ADMINISTRADOR** | *(creable)* | — | Control comercial, compras, ventas, caja, inventario y reportes. |
| **CAJERO** | `cajero` | `cajero123` | Punto de Venta (POS), clientes, apertura y cierre de su caja de turno. |
| **VENDEDOR** | `vendedor` | `vendedor123` | Cotizaciones, ventas POS, descuentos y directorio de clientes. |
| **ALMACENERO** | `almacenero` | `almacen123` | Control de existencias, productos, recepción y kárdex físico. |
| **COMPRAS** | `compras` | `compras123` | Proveedores, órdenes de compra y abastecimiento de almacén. |
| **GERENTE** | `gerente` | `gerente123` | Tableros de consulta, kárdex, auditoría y reportes de utilidad bruta. |

---

## 🚀 5. Instrucciones de Ejecución

### Opción A: Ejecución Completa (Spring Boot + MySQL + Frontend)
1. Inicie su servicio MySQL e importe la base de datos:
   - Doble clic en `3_IMPORTAR_BD_MYSQL.bat` (o ejecute `database/jireh.sql` en MySQL Workbench / DBeaver).
2. Verifique sus credenciales en `backend/src/main/resources/application.properties` (por defecto: `root` / `root`).
3. Inicie el sistema completo con 1 solo clic:
   - Doble clic en **`1_INICIAR_SISTEMA_COMPLETO.bat`**.
   - El sistema compilará el backend, iniciará Spring Boot en el puerto `8080` y abrirá la aplicación en `http://localhost:8080/`.

### Opción B: Modo Demostración Portátil (100% Offline / Universidad)
Ideal para laboratorios o presentaciones donde no se tiene acceso de administrador o no está instalado MySQL/Java:
- Doble clic en **`2_MODO_OFFLINE_UNIVERSIDAD.bat`** (o abra directamente `frontend/index.html` en Chrome, Edge o Firefox).
- El sistema cargará el motor offline en memoria (`localStorage`) con el catálogo completo de Plastiquería Jireh, POS, caja, kárdex, roles y cotizaciones.

### Opción C: Ejecución Manual por Terminal
```bash
# Compilar backend
cd backend
.\mvnw.cmd compile

# Iniciar servidor Spring Boot
.\mvnw.cmd spring-boot:run
```
La aplicación web y la API REST quedarán disponibles en `http://localhost:8080/`.

---

## 📊 6. Formato de Ticket Térmico de Venta

```text
==================================================
           PLASTIQUERÍA JIREH E.I.R.L.
              RUC: 20608945123
   Av. Central 742, Mercado Mayorista, Lima
             Telf: 01 458-9214
==================================================
VENTA: VNT-000101            FECHA: 02/10/2026
CLIENTE: Restaurante El Buen Gusto S.A.C.
CAJERO: Lucía Rojas (CAJERO)
--------------------------------------------------
CANT/PRES       DESCRIPCIÓN                TOTAL
2 x Millar      Bolsa Camiseta 1 1/2 Kg    S/ 48.00
2 x Ciento      Cucharas Descartables      S/ 11.00
1 x Ciento      Taper Térmico CT4          S/ 28.50
--------------------------------------------------
SUBTOTAL:                                  S/ 74.15
I.G.V. (18%):                              S/ 13.35
TOTAL A PAGAR:                             S/ 87.50
MONTO RECIBIDO:                            S/ 100.00
VUELTO:                                    S/ 12.50
==================================================
¡Gracias por su compra en Plastiquería Jireh!
Distribución mayorista y minorista de plásticos.
==================================================
```

---

## 📄 7. Licencia y Créditos
Desarrollado para **Plastiquería Jireh**.  
Curso: **Gestión de Proyectos en TI**
Repositorio Oficial: [https://github.com/KinglotusPe/GestionTISistemaInventario](https://github.com/KinglotusPe/GestionTISistemaInventario)
