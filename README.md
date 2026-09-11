# Sistema de Gestión de Ventas e Inventario - Plastiquería Jireh

> **Curso:** Gestión de Proyectos en TI  
> **Proyecto:** Sistema Integral de Ventas, Compras y Control de Inventarios  
> **Giro de Negocio:** Plastiquería y Distribuidora de Descartables (Bolsas, Tapers térmicos, Vasos, Cubiertos y Embalaje)  
> **Arquitectura:** Desacoplada (Backend API REST + Frontend Web + Base de Datos Relacional)

---

## 📌 Descripción del Proyecto

El **Sistema de Ventas e Inventario Jireh** es una solución de software orientada a optimizar y automatizar los procesos comerciales y de almacén de **Plastiquería Jireh**, negocio dedicado a la comercialización por mayor y menor de productos descartables, bolsas plásticas/biodegradables, envases térmicos para delivery y menaje plástico. Permite gestionar de forma centralizada las ventas en mostrador (POS), compras a distribuidores (Pamolsa, Reyplast, Darnel), control de stock por millares, cientos y paquetes, emisión de comprobantes electrónicos y trazabilidad de almacén.

---

## 📁 Estructura del Repositorio

El proyecto se encuentra organizado de forma modular para facilitar su mantenimiento, despliegue y evaluación:

```text
Sistema_ventas_inventario/
│
├── backend/                             # API REST en Spring Boot (Java 17 / Maven)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/jireh/Sistema/
│   │   │   │   ├── config/              # Configuraciones (Seguridad, CORS, etc.)
│   │   │   │   ├── controller/          # Controladores REST (@RestController)
│   │   │   │   ├── dto/                 # Objetos de Transferencia de Datos (DTO)
│   │   │   │   ├── entity/              # Entidades JPA del modelo relacional
│   │   │   │   ├── exception/           # Manejo global de excepciones
│   │   │   │   ├── repository/          # Interfaces Spring Data JPA
│   │   │   │   ├── service/             # Lógica de negocio (Servicios)
│   │   │   │   └── SistemaVentasInventarioJirehApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties # Credenciales y configuración de BD
│   │   └── test/                        # Pruebas unitarias y de integración
│   ├── pom.xml                          # Dependencias de Maven
│   ├── mvnw                             # Wrapper Maven para Linux/macOS
│   └── mvnw.cmd                         # Wrapper Maven para Windows
│
├── frontend/                            # Aplicación Web / Interfaz de Usuario
│   ├── public/                          # Recursos estáticos (favicons, imágenes)
│   └── src/
│       ├── assets/                      # Iconos, imágenes y fuentes
│       ├── components/                  # Componentes de interfaz (common, layout)
│       ├── pages/                       # Vistas principales del sistema
│       ├── services/                    # Conexión con la API REST (api.js)
│       └── styles/                      # Hojas de estilo
│
├── database/                            # Persistencia y scripts SQL
│   └── jireh.sql                        # Script DDL y DML (tablas y datos iniciales)
│
├── docs/                                # Documentación del proyecto (diagramas, actas)
│
├── .gitignore                           # Exclusiones de control de versiones
└── README.md                            # Documento principal del proyecto
```

---

## 🛠️ Tecnologías Utilizadas

| Capa / Módulo | Tecnología / Herramienta | Versión / Detalle |
| :--- | :--- | :--- |
| **Backend** | Java | 17 LTS |
| **Framework** | Spring Boot | 4.x (Web, JPA, Validation) |
| **Persistencia** | Spring Data JPA / Hibernate | ORM y mapeo relacional |
| **Base de Datos** | MySQL Server | 8.0+ |
| **Gestor de Dependencias** | Apache Maven | 3.9+ (con `mvnw`) |
| **Frontend** | Arquitectura Web Modular | Conexión HTTP / REST |
| **Control de Versiones** | Git / GitHub | Monorepositorio estructurado |

---

## 🚀 Guía de Instalación y Ejecución Local

Sigue estos pasos en orden para poner en marcha el proyecto en tu entorno local:

### 1. Preparar la Base de Datos (MySQL)

1. Inicia tu servidor local de **MySQL** (puerto predeterminado `3306`).
2. Abre tu gestor de preferencia (**MySQL Workbench**, **DBeaver** o terminal).
3. Ejecuta el script de base de datos ubicado en [`database/jireh.sql`](file:///d:/GestionTI/Sistema_ventas_inventario/database/jireh.sql):

```bash
# Opción por terminal de comandos:
mysql -u root -p < database/jireh.sql
```

Esto creará la base de datos `jireh` con todas sus tablas, restricciones de clave foránea y registros iniciales.

---

### 2. Configurar y Ejecutar el Backend (Spring Boot)

1. Abre el archivo [`backend/src/main/resources/application.properties`](file:///d:/GestionTI/Sistema_ventas_inventario/backend/src/main/resources/application.properties) y verifica que el usuario y la contraseña coincidan con tu servidor MySQL local:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jireh?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD_AQUI
```

2. Ejecuta el backend desde la terminal:

```powershell
# En Windows (PowerShell / CMD)
cd backend
.\mvnw.cmd spring-boot:run
```

*O bien, ábrelo en tu IDE favorito (IntelliJ IDEA, VS Code, Eclipse) y ejecuta la clase principal:*  
`SistemaVentasInventarioJirehApplication.java`

El servidor iniciará por defecto en: `http://localhost:8080`

---

### 3. Frontend

El módulo [`frontend/`](file:///d:/GestionTI/Sistema_ventas_inventario/frontend) contiene la estructura base para la interfaz de usuario.
- En [`frontend/src/services/api.js`](file:///d:/GestionTI/Sistema_ventas_inventario/frontend/src/services/api.js) se encuentra configurada la URL base del backend (`http://localhost:8080/api`) para consumir los endpoints REST.

---

## 🧩 Módulos y Entidades del Sistema

El modelo de datos y de negocio cubre los requerimientos funcionales del sistema:

1. **Seguridad y Accesos:**
   - `Usuario`: Credenciales, estado y datos de cuenta.
   - `Rol`: Perfiles y niveles de permiso dentro del sistema.

2. **Catálogo de Productos e Inventario:**
   - `Producto`: Código de barra, descripción, precio de compra y venta.
   - `Categoria`, `Marca`, `UnidadMedida`: Clasificación y presentación de productos.
   - `Inventario`: Control de stock actual, mínimo y máximo por producto.
   - `MovimientoInventario`: Trazabilidad de entradas, salidas y ajustes de almacén.

3. **Gestión de Ventas:**
   - `Cliente`: Registro de compradores y datos de facturación.
   - `Venta`: Transacción de venta, fecha, totales, estado.
   - `DetalleVenta`: Ítems vendidos, cantidades, precios unitarios y subtotal.
   - `Comprobante`: Boletas, facturas o tickets emitidos.
   - `MetodoPago`: Efectivo, tarjeta, transferencia, etc.

4. **Gestión de Compras:**
   - `Proveedor`: Proveedores autorizados de mercadería.
   - `Compra`: Órdenes de abastecimiento y costos totales.
   - `DetalleCompra`: Detalle de productos adquiridos y cálculo de costo.
