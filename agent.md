# PROMPT MAESTRO — MEJORA INTEGRAL DEL SISTEMA DE GESTIÓN DE INVENTARIO Y VENTAS PARA PLASTIQUERÍA JIREH

Quiero que actúes como un **arquitecto de software senior, desarrollador Full Stack senior, especialista en Spring Boot, MySQL, seguridad RBAC, sistemas POS, inventarios y experiencia de usuario**.

Debes trabajar directamente sobre mi proyecto existente:

**Repositorio:**
https://github.com/KinglotusPe/GestionTISistemaInventario

## 1. OBJETIVO GENERAL

Quiero convertir el proyecto actual en un **Sistema Integral de Gestión Comercial, Ventas, Compras e Inventario para una Plastiquería**, moderno, profesional, seguro y completamente funcional.

NO quiero crear otro proyecto desde cero.

Primero debes:

1. Analizar completamente el repositorio existente.
2. Identificar las tecnologías utilizadas.
3. Revisar frontend, backend y base de datos.
4. Identificar las funcionalidades que ya existen.
5. Detectar código incompleto, duplicado o con errores.
6. Mantener las funcionalidades existentes que funcionen correctamente.
7. Mejorar progresivamente el proyecto existente.
8. Respetar en lo posible la estructura y arquitectura actual.
9. No eliminar funcionalidades funcionales sin una justificación técnica.
10. Crear las nuevas tablas, entidades, servicios, controladores, DTO, validaciones y componentes frontend que sean necesarios.

El resultado debe parecer un **software comercial real para una plastiquería**, no una simple demostración académica.

---

# 2. CONTEXTO DEL NEGOCIO

El sistema pertenece a una:

## PLASTIQUERÍA / DISTRIBUIDORA

Comercializa productos como:

- bolsas plásticas;
- bolsas biodegradables;
- bolsas por kilo;
- vasos descartables;
- vasos de diferentes capacidades;
- platos descartables;
- cubiertos;
- sorbetes;
- taper;
- envases térmicos;
- envases para delivery;
- recipientes;
- tecnopor;
- papel film;
- papel aluminio;
- servilletas;
- bolsas de basura;
- productos de embalaje;
- productos de limpieza;
- productos descartables;
- productos vendidos por unidad;
- paquetes;
- docenas;
- cientos;
- millares;
- cajas;
- rollos;
- kilos.

El sistema deberá soportar correctamente estas diferentes presentaciones.

---

# 3. INTERFAZ GENERAL

Quiero modernizar completamente el diseño.

Usar como referencia visual un sistema administrativo/POS moderno con:

- menú lateral oscuro;
- iconos profesionales;
- categorías en el menú;
- opción seleccionada resaltada;
- sidebar plegable;
- dashboard profesional;
- tarjetas estadísticas;
- gráficos;
- tablas modernas;
- formularios claros;
- modales;
- notificaciones;
- diseño responsive;
- aspecto empresarial.

No copiar literalmente otro sistema.

Adaptar todo específicamente a una **plastiquería**.

El menú lateral debe organizarse aproximadamente así:

### PRINCIPAL
- Dashboard
- Punto de Venta

### VENTAS
- Ventas
- Cotizaciones
- Devoluciones
- Clientes

### INVENTARIO
- Productos
- Categorías
- Marcas
- Unidades / Presentaciones
- Inventario
- Movimientos de Inventario
- Kardex
- Stock Bajo

### COMPRAS
- Compras
- Proveedores
- Órdenes de Compra

### FINANZAS
- Caja
- Movimientos de Caja
- Cuentas por Cobrar
- Cuentas por Pagar

### REPORTES
- Reporte de Ventas
- Reporte de Compras
- Reporte de Inventario
- Reporte de Ganancias
- Productos más vendidos
- Stock bajo
- Kardex
- Reporte por usuario
- Reporte por cliente
- Reporte por proveedor

### SISTEMA
- Usuarios
- Roles
- Permisos
- Auditoría
- Configuración
- Datos de la Empresa

Las opciones del menú deben mostrarse u ocultarse dependiendo de los permisos del usuario conectado.

---

# 4. DASHBOARD

Crear un dashboard empresarial moderno.

Mostrar tarjetas con:

- ventas del día;
- ingresos del día;
- ventas del mes;
- utilidad estimada;
- compras del mes;
- número de productos;
- productos con stock bajo;
- productos agotados;
- cantidad de clientes;
- cantidad de proveedores;
- cuentas por cobrar;
- cuentas por pagar.

Agregar gráficos como:

### Ventas
Gráfico de ventas:

- últimos 7 días;
- últimos 30 días;
- mensual;
- anual.

### Productos más vendidos

Top 5 o Top 10.

Mostrar:

- producto;
- cantidad vendida;
- monto generado.

### Categorías con mayor venta

### Métodos de pago

Porcentaje vendido mediante:

- efectivo;
- Yape;
- Plin;
- transferencia;
- tarjeta;
- otros.

### Alertas

Mostrar:

- productos sin stock;
- productos bajo stock mínimo;
- cuentas por cobrar vencidas;
- compras pendientes;
- cotizaciones próximas a vencer.

Todo debe obtener datos reales de la base de datos.

NO utilizar números estáticos en el frontend.

---

# 5. PUNTO DE VENTA — POS

Crear un Punto de Venta rápido y profesional.

Debe permitir:

### Buscar productos por:
- nombre;
- código;
- código de barras;
- categoría.

Permitir lector físico de código de barras, ya que normalmente funciona como entrada de teclado.

### Carrito

Mostrar:

- producto;
- presentación;
- cantidad;
- precio;
- descuento;
- subtotal.

Permitir:

- aumentar cantidad;
- disminuir cantidad;
- eliminar producto;
- cambiar presentación;
- aplicar descuento permitido;
- aplicar descuento general.

### Cliente

Permitir:

- seleccionar cliente;
- consumidor final;
- registrar cliente rápidamente desde POS.

### Métodos de pago

Permitir:

- efectivo;
- Yape;
- Plin;
- transferencia;
- tarjeta;
- pago mixto.

En efectivo solicitar:

- monto recibido;
- vuelto.

Ejemplo:

Total: S/ 48.50

Cliente entrega:

S/ 50.00

Vuelto:

S/ 1.50

---

# 6. VENTA MAYORISTA Y MINORISTA

Esto es MUY IMPORTANTE para una plastiquería.

Un producto puede tener:

- precio unitario;
- precio por paquete;
- precio por ciento;
- precio por millar;
- precio por caja;
- precio mayorista.

Ejemplo:

Vaso descartable 7 oz

Unidad: S/ 0.15

Paquete x 50: S/ 6.00

Ciento: S/ 11.00

Millar: S/ 95.00

El sistema debe permitir administrar diferentes precios y unidades de presentación.

Diseñar correctamente el modelo de datos para evitar duplicar productos innecesariamente.

Considerar una estructura como:

Producto

ProductoPresentacion

UnidadMedida

PrecioPresentacion

o una solución equivalente técnicamente mejor.

---

# 7. PRODUCTOS

Cada producto debe incluir como mínimo:

- ID;
- código interno;
- código de barras;
- nombre;
- descripción;
- categoría;
- marca;
- unidad base;
- presentaciones;
- precio de compra;
- precio de venta;
- precio mayorista;
- stock;
- stock mínimo;
- stock máximo;
- estado;
- imagen;
- fecha de creación;
- fecha de modificación.

Opcionalmente:

- ubicación física;
- pasillo;
- estante;
- observaciones.

Estados:

- Activo
- Inactivo

No eliminar físicamente productos que tengan movimientos.

Usar baja lógica.

---

# 8. CATEGORÍAS

CRUD completo:

- crear;
- editar;
- visualizar;
- activar;
- desactivar.

Ejemplos:

- Bolsas
- Vasos
- Envases
- Platos
- Cubiertos
- Tecnopor
- Embalaje
- Limpieza
- Servilletas
- Otros

---

# 9. INVENTARIO

Crear gestión profesional del inventario.

Mostrar:

- código;
- producto;
- categoría;
- presentación;
- stock actual;
- stock mínimo;
- stock máximo;
- estado.

Indicadores:

🟢 Stock normal

🟡 Stock bajo

🔴 Sin stock

Permitir filtros por:

- nombre;
- categoría;
- marca;
- stock;
- estado.

---

# 10. MOVIMIENTOS DE INVENTARIO

Cada cambio de stock debe generar automáticamente un movimiento.

Tipos:

- COMPRA;
- VENTA;
- DEVOLUCIÓN DE VENTA;
- DEVOLUCIÓN DE COMPRA;
- AJUSTE POSITIVO;
- AJUSTE NEGATIVO;
- MERMA;
- INVENTARIO INICIAL.

Guardar:

- ID;
- producto;
- presentación;
- tipo;
- cantidad anterior;
- cantidad;
- cantidad resultante;
- motivo;
- documento relacionado;
- usuario responsable;
- fecha y hora.

Ningún movimiento importante debe desaparecer.

---

# 11. KARDEX

Crear Kardex por producto.

Mostrar:

| Fecha | Tipo | Documento | Entrada | Salida | Stock | Usuario |

Debe permitir filtrar:

- producto;
- fecha inicial;
- fecha final.

Y exportar:

- PDF;
- Excel.

---

# 12. VENTAS

Crear módulo de historial de ventas.

Mostrar:

- código;
- comprobante;
- cliente;
- vendedor;
- fecha;
- método de pago;
- subtotal;
- descuento;
- total;
- estado.

Estados:

- COMPLETADA;
- ANULADA;
- DEVUELTA PARCIALMENTE;
- DEVUELTA.

Filtros:

- fecha;
- cliente;
- vendedor;
- comprobante;
- método de pago;
- estado.

Permitir abrir el detalle de una venta.

---

# 13. COTIZACIONES

Agregar módulo de cotizaciones.

Debe permitir:

- seleccionar cliente;
- agregar productos;
- cantidades;
- precios;
- descuentos;
- observaciones;
- fecha;
- vigencia;
- total.

Estados:

- PENDIENTE;
- APROBADA;
- RECHAZADA;
- VENCIDA;
- CONVERTIDA_EN_VENTA.

Debe existir un botón:

**Convertir en Venta**

Al convertirla:

- cargar productos;
- cantidades;
- cliente;
- precios;
- descuentos.

No volver a digitar la información.

---

# 14. DEVOLUCIONES

Agregar devoluciones de ventas.

Permitir:

- buscar venta;
- seleccionar productos;
- seleccionar cantidad;
- indicar motivo;
- registrar devolución.

Al aprobar una devolución:

- retornar automáticamente la cantidad correspondiente al inventario;
- crear MovimientoInventario;
- registrar usuario;
- registrar fecha;
- mantener trazabilidad.

---

# 15. CLIENTES

Campos:

- ID;
- tipo de documento;
- DNI;
- RUC;
- nombres;
- apellidos / razón social;
- teléfono;
- dirección;
- correo;
- tipo de cliente;
- límite de crédito;
- estado.

Tipos:

- consumidor final;
- minorista;
- mayorista;
- empresa.

No exigir DNI para consumidor final.

---

# 16. PROVEEDORES

Campos:

- RUC;
- razón social;
- representante;
- teléfono;
- correo;
- dirección;
- productos suministrados;
- observaciones;
- estado.

Permitir:

- crear;
- editar;
- ver historial de compras;
- consultar deuda pendiente.

---

# 17. COMPRAS

Crear módulo completo.

Registrar:

- proveedor;
- número de documento;
- tipo de comprobante;
- fecha;
- productos;
- cantidad;
- unidad;
- precio de compra;
- subtotal;
- IGV si corresponde;
- total;
- forma de pago.

Al confirmar compra:

1. Registrar Compra.
2. Registrar DetalleCompra.
3. Incrementar inventario.
4. Crear MovimientoInventario.
5. Actualizar costos cuando corresponda.
6. Registrar usuario responsable.

---

# 18. ÓRDENES DE COMPRA

Estados:

- BORRADOR;
- PENDIENTE;
- APROBADA;
- RECIBIDA;
- CANCELADA.

Permitir convertir una orden aprobada en compra.

---

# 19. CAJA

Crear módulo de caja.

Antes de vender debe existir una caja abierta para el usuario cuando la configuración lo requiera.

Funciones:

### Apertura
Registrar:

- usuario;
- fecha;
- monto inicial.

### Ingresos
- ventas;
- otros ingresos.

### Egresos
- gastos;
- pagos;
- retiros.

### Cierre

Mostrar:

- monto inicial;
- ventas efectivo;
- ventas Yape;
- ventas Plin;
- transferencias;
- tarjetas;
- ingresos;
- egresos;
- efectivo esperado;
- efectivo contado;
- diferencia.

Guardar el arqueo.

Estados:

- ABIERTA;
- CERRADA.

Un cajero no debe poder modificar una caja cerrada.

---

# 20. CUENTAS POR COBRAR

Cuando una venta sea a crédito:

registrar:

- cliente;
- venta;
- total;
- monto pagado;
- saldo;
- fecha límite;
- estado.

Estados:

- PENDIENTE;
- PARCIAL;
- PAGADA;
- VENCIDA.

Permitir registrar abonos.

Mantener historial de pagos.

---

# 21. CUENTAS POR PAGAR

Similar al módulo anterior pero para proveedores y compras.

---

# 22. REPORTES

Crear un centro de reportes.

### Ventas

- ventas diarias;
- semanales;
- mensuales;
- por fechas;
- por usuario;
- por cliente;
- por producto;
- por categoría;
- por método de pago.

### Inventario

- inventario actual;
- stock bajo;
- productos agotados;
- movimientos;
- Kardex;
- valorización de inventario.

### Compras

- por proveedor;
- por periodo;
- por producto.

### Rentabilidad

Mostrar:

- ventas;
- costo de productos vendidos;
- utilidad bruta.

No confundir ventas con ganancias.

Utilidad aproximada:

Utilidad bruta =
Ingresos de ventas - costo de mercadería vendida.

Exportar reportes cuando sea razonable a:

- PDF;
- Excel.

---

# 23. SISTEMA DE ROLES Y PRIVILEGIOS

Esto es uno de los requisitos PRINCIPALES.

Implementar:

# RBAC — ROLE BASED ACCESS CONTROL

NO quiero simplemente:

ADMIN / USER.

Quiero roles y permisos configurables.

Crear:

- Usuario
- Rol
- Permiso
- UsuarioRol
- RolPermiso

o equivalente usando las mejores prácticas de Spring Security.

Ejemplos de permisos:

### Dashboard
- DASHBOARD_VER

### Productos
- PRODUCTO_VER
- PRODUCTO_CREAR
- PRODUCTO_EDITAR
- PRODUCTO_DESACTIVAR

### Inventario
- INVENTARIO_VER
- INVENTARIO_AJUSTAR
- KARDEX_VER

### Ventas
- VENTA_VER
- VENTA_CREAR
- VENTA_ANULAR
- VENTA_DESCUENTO
- VENTA_DEVOLVER

### Compras
- COMPRA_VER
- COMPRA_CREAR
- COMPRA_EDITAR
- COMPRA_ANULAR

### Caja
- CAJA_VER
- CAJA_ABRIR
- CAJA_CERRAR
- CAJA_INGRESO
- CAJA_EGRESO

### Clientes
- CLIENTE_VER
- CLIENTE_CREAR
- CLIENTE_EDITAR

### Proveedores
- PROVEEDOR_VER
- PROVEEDOR_CREAR
- PROVEEDOR_EDITAR

### Reportes
- REPORTE_VENTAS
- REPORTE_COMPRAS
- REPORTE_INVENTARIO
- REPORTE_GANANCIAS

### Usuarios
- USUARIO_VER
- USUARIO_CREAR
- USUARIO_EDITAR
- USUARIO_DESACTIVAR

### Seguridad
- ROL_GESTIONAR
- PERMISO_GESTIONAR
- AUDITORIA_VER

---

# 24. ROLES PREDETERMINADOS

Crear inicialmente:

## SUPER ADMINISTRADOR

Acceso absoluto al sistema.

Puede:

- administrar usuarios;
- roles;
- permisos;
- configuraciones;
- productos;
- ventas;
- compras;
- caja;
- inventario;
- reportes;
- auditoría.

---

## ADMINISTRADOR

Puede manejar la operación comercial.

Pero algunas opciones críticas pueden reservarse al Super Administrador.

---

## CAJERO

Puede:

- usar POS;
- registrar ventas;
- buscar productos;
- buscar clientes;
- abrir su caja;
- cerrar su caja;
- registrar cliente;
- consultar sus propias ventas.

No puede:

- cambiar costos;
- modificar inventario;
- crear usuarios;
- modificar roles;
- ver configuración crítica;
- eliminar ventas;
- modificar compras;
- ver reportes financieros globales.

---

## VENDEDOR

Puede:

- cotizar;
- vender;
- consultar productos;
- registrar clientes;
- consultar sus ventas.

---

## ALMACENERO

Puede:

- visualizar productos;
- inventario;
- registrar recepción de mercadería;
- consultar Kardex;
- realizar ajustes si posee permiso.

No puede:

- visualizar ganancias;
- administrar usuarios;
- modificar precios sin permiso.

---

## COMPRAS

Puede:

- gestionar proveedores;
- órdenes de compra;
- compras;
- consultar stock.

---

## GERENTE

Puede consultar:

- dashboard;
- ventas;
- compras;
- inventario;
- rentabilidad;
- reportes.

Puede configurarse principalmente como rol de consulta.

---

# 25. PERMISOS GRANULARES

Los permisos no deben funcionar solamente ocultando botones.

Esto es CRÍTICO.

Debe haber protección en:

### FRONTEND

Ocultar:

- módulos;
- botones;
- acciones.

Ejemplo:

Si el usuario no posee:

PRODUCTO_CREAR

no mostrar:

"+ Nuevo producto"

Pero esto NO es suficiente.

### BACKEND

Cada endpoint también debe comprobar permisos.

Ejemplo conceptual:

@PreAuthorize("hasAuthority('PRODUCTO_CREAR')")

Nunca confiar únicamente en el frontend.

Si un usuario intenta ingresar manualmente a un endpoint sin autorización:

devolver:

HTTP 403 Forbidden.

---

# 26. GESTIÓN DE USUARIOS

Pantalla:

**Usuarios**

Mostrar:

- nombre;
- username;
- correo;
- rol;
- estado;
- último acceso;
- fecha creación.

Acciones:

- crear;
- editar;
- cambiar rol;
- activar;
- desactivar;
- restablecer contraseña.

No almacenar contraseñas en texto plano.

Utilizar:

BCrypt o mecanismo seguro equivalente compatible con Spring Security.

---

# 27. GESTIÓN DE ROLES

Crear interfaz:

**Roles y Permisos**

Debe permitir:

Crear rol personalizado.

Ejemplo:

Rol:

SUPERVISOR

Seleccionar mediante checkbox:

☑ Dashboard

☑ Ver productos

☑ Ver inventario

☑ Ver ventas

☑ Crear venta

☐ Anular venta

☐ Usuarios

☐ Configuración

Guardar permisos.

Así la administración no dependerá de roles codificados permanentemente en el código.

---

# 28. AUTENTICACIÓN Y SEGURIDAD

Revisar primero el mecanismo actual.

Si todavía no existe autenticación segura completa, implementar utilizando la arquitectura más apropiada del proyecto.

Preferiblemente:

- Spring Security;
- JWT si se adapta a la arquitectura REST actual;
- refresh token si resulta necesario;
- BCrypt;
- autorización RBAC;
- expiración de sesión/token.

Implementar:

- login;
- logout;
- usuario autenticado;
- rol;
- permisos;
- protección de endpoints.

No exponer contraseñas.

No guardar secretos en repositorio.

Mover credenciales sensibles a:

- variables de entorno;
- configuración segura.

---

# 29. AUDITORÍA

Crear módulo:

**Auditoría del sistema**

Registrar operaciones importantes.

Ejemplos:

- inicio de sesión;
- cierre de sesión;
- creación de producto;
- modificación de precio;
- ajuste de inventario;
- creación de venta;
- anulación de venta;
- devolución;
- apertura de caja;
- cierre de caja;
- creación de usuario;
- cambio de rol;
- cambio de permisos.

Guardar:

- usuario;
- acción;
- módulo;
- entidad;
- ID entidad;
- descripción;
- fecha;
- hora.

Opcionalmente:

- IP;
- valores anteriores;
- valores nuevos.

Los usuarios normales no deben poder borrar auditorías.

---

# 30. CONFIGURACIÓN DE EMPRESA

Crear pantalla:

**Configuración > Empresa**

Campos:

- razón social;
- nombre comercial;
- RUC;
- dirección;
- teléfono;
- correo;
- logo;
- moneda;
- IGV;
- información del ticket.

Moneda predeterminada:

S/

Soles peruanos.

---

# 31. COMPROBANTES

El sistema debe poder generar inicialmente:

- ticket;
- nota de venta;
- cotización.

Preparar arquitectura para futuras integraciones con comprobantes electrónicos.

No afirmar que una boleta o factura tiene validez SUNAT si no existe integración real con SUNAT/OSE/PSE.

---

# 32. TICKET DE VENTA

Formato aproximado:

PLASTIQUERÍA JIREH

RUC: XXXXXXXX

Dirección

----------------------------

VENTA: V000012

Fecha:

Cajero:

Cliente:

----------------------------

Producto

Cantidad x precio

Subtotal

----------------------------

SUBTOTAL

DESCUENTO

TOTAL

PAGO

VUELTO

----------------------------

Gracias por su compra.

Debe poder:

- visualizarse;
- imprimirse;
- descargarse como PDF si corresponde.

---

# 33. BÚSQUEDAS Y FILTROS

Todas las tablas importantes deben tener:

- buscador;
- paginación;
- ordenamiento;
- filtros.

No descargar miles de registros para filtrarlos solamente en navegador cuando la cantidad de datos pueda crecer.

Implementar paginación desde backend cuando corresponda.

---

# 34. VALIDACIONES

Agregar validaciones backend y frontend.

Ejemplos:

- producto sin nombre → no permitido;
- cantidad negativa → no permitido;
- precio negativo → no permitido;
- stock negativo → impedir salvo política explícita;
- venta sin productos → no permitido;
- compra sin proveedor → no permitido;
- username repetido → no permitido;
- código de barras repetido → advertir/impedir según modelo;
- RUC inválido → validar formato;
- descuento mayor al autorizado → impedir.

El BACKEND debe ser la autoridad final.

---

# 35. TRANSACCIONES

Operaciones críticas deben utilizar transacciones.

Especialmente:

- venta + detalle + reducción de stock;
- compra + detalle + aumento de stock;
- devolución + stock;
- pago + cuenta por cobrar;
- cierre de caja.

Si falla una parte:

hacer rollback.

Nunca permitir que se registre una venta sin descontar inventario correctamente.

---

# 36. CONCURRENCIA DE STOCK

Evitar que dos ventas simultáneas permitan vender más stock del disponible.

Revisar una estrategia apropiada usando:

- transacciones;
- locking;
- control optimista;
- validación atómica;

según la arquitectura actual.

---

# 37. DISEÑO RESPONSIVE

Debe funcionar correctamente en:

- PC;
- laptop;
- tablet.

Prioridad principal:

Desktop / POS.

En pantallas pequeñas:

- sidebar plegable;
- tablas adaptables;
- formularios ordenados;
- botones visibles.

---

# 38. EXPERIENCIA DE USUARIO

Agregar:

- confirmaciones;
- alertas;
- mensajes de éxito;
- mensajes de error;
- loaders;
- estados vacíos;
- tooltips cuando sean necesarios.

Ejemplos:

"Venta registrada correctamente."

"Stock insuficiente."

"¿Está seguro de anular la venta V-000123?"

No utilizar `alert()` del navegador como interfaz final cuando pueda utilizarse un modal/toast profesional.

---

# 39. DISEÑO DEL SIDEBAR

Estilo visual:

Fondo azul oscuro / negro azulado.

Logo superior:

**PJ**

o logo de Plastiquería Jireh.

Texto:

PLASTIQUERÍA JIREH

Sistema de Gestión

Secciones pequeñas:

PRINCIPAL

VENTAS

INVENTARIO

COMPRAS

FINANZAS

REPORTES

SISTEMA

Iconos coherentes.

La opción activa debe tener:

- fondo ligeramente más claro;
- indicador visual;
- icono y texto destacados.

---

# 40. BARRA SUPERIOR

Agregar:

- botón abrir/cerrar sidebar;
- buscador opcional;
- notificaciones;
- nombre del usuario;
- rol;
- avatar;
- menú desplegable.

Menú:

- Mi perfil
- Cambiar contraseña
- Cerrar sesión

---

# 41. BASE DE DATOS

Antes de modificarla:

ANALIZAR `database/jireh.sql`.

No recrear tablas que ya existen innecesariamente.

Crear solamente:

- tablas faltantes;
- relaciones faltantes;
- índices necesarios;
- constraints;
- columnas justificadas.

Mantener integridad referencial.

Utilizar:

- FOREIGN KEY;
- UNIQUE;
- NOT NULL;

cuando corresponda.

Agregar índices para campos buscados frecuentemente, por ejemplo:

- código;
- código de barras;
- nombre;
- fecha;
- cliente;
- proveedor;
- venta.

---

# 42. DATOS DE PRUEBA

Crear datos iniciales coherentes.

Ejemplo:

### Usuario

admin

Rol:

SUPER_ADMIN

No usar una contraseña insegura permanente para producción.

Puede existir una contraseña inicial documentada únicamente para desarrollo y exigir cambio cuando corresponda.

### Productos

Crear algunos productos de prueba de plastiquería.

Ejemplos:

- Vaso descartable 7 oz
- Taper térmico N.º 5
- Bolsa 10x15
- Bolsa negra 20x30
- Plato descartable
- Cuchara descartable

---

# 43. BACKEND

Mantener la arquitectura organizada.

Por ejemplo:

controller/

service/

repository/

entity/

dto/

config/

security/

exception/

mapper/

No colocar toda la lógica en controladores.

Controladores:

reciben solicitudes.

Services:

contienen reglas de negocio.

Repositories:

persistencia.

DTO:

comunicación API.

No retornar entidades JPA directamente cuando pueda generar:

- exposición innecesaria;
- referencias circulares;
- problemas de seguridad.

---

# 44. MANEJO GLOBAL DE ERRORES

Utilizar o mejorar:

@ControllerAdvice

Crear respuestas consistentes.

Ejemplo:

{
  "timestamp": "...",
  "status": 400,
  "error": "BAD_REQUEST",
  "message": "Stock insuficiente",
  "path": "/api/ventas"
}

No devolver stack traces al cliente en producción.

---

# 45. API REST

Mantener convenciones consistentes.

Ejemplo:

GET /api/productos

GET /api/productos/{id}

POST /api/productos

PUT /api/productos/{id}

PATCH /api/productos/{id}/estado

GET /api/ventas

POST /api/ventas

GET /api/ventas/{id}

POST /api/ventas/{id}/anular

POST /api/ventas/{id}/devoluciones

GET /api/inventario

GET /api/inventario/kardex/{productoId}

GET /api/dashboard/resumen

GET /api/reportes/ventas

Adaptar nombres al código existente.

No crear endpoints duplicados si ya existe una implementación correcta.

---

# 46. PRUEBAS

Agregar pruebas para procesos críticos.

Como mínimo:

### Venta

- venta válida;
- venta sin stock;
- actualización de inventario;
- cálculo de total.

### Compra

- registro correcto;
- incremento de inventario.

### Seguridad

- acceso autorizado;
- acceso sin permiso → 403.

### Usuarios

- username duplicado.

### Caja

- apertura;
- cierre;
- cálculo esperado.

---

# 47. DOCUMENTACIÓN

Actualizar README.md.

Incluir:

- descripción;
- tecnologías;
- requisitos;
- instalación;
- configuración MySQL;
- variables de entorno;
- backend;
- frontend;
- credenciales de desarrollo;
- roles;
- módulos;
- ejecución;
- estructura.

También documentar los permisos principales.

---

# 48. NO ROMPER EL PROYECTO

MUY IMPORTANTE.

Cada modificación debe hacerse de manera incremental.

Antes de modificar:

1. analizar;
2. identificar dependencias;
3. verificar uso;
4. implementar;
5. compilar;
6. probar.

Después de cada grupo importante de cambios ejecutar las validaciones disponibles.

Para backend:

compilar con Maven.

Ejemplo:

./mvnw test

o equivalente compatible con el proyecto.

Para frontend:

ejecutar:

build

lint

tests

según las herramientas instaladas.

NO dejar imports rotos.

NO dejar componentes inexistentes.

NO dejar endpoints frontend apuntando a rutas inexistentes.

NO dejar botones decorativos que no hagan nada.

---

# 49. FUNCIONES REALES, NO MOCKUPS

Este punto es obligatorio.

No quiero únicamente crear las pantallas.

Cada módulo debe conectarse realmente con:

frontend → API → backend → base de datos.

Si agregas:

"Compras"

debe existir:

- pantalla;
- endpoint;
- service;
- repository;
- entidades/tablas;
- reglas de negocio.

Si agregas:

"Roles"

debe funcionar realmente.

Si agregas:

"Reportes"

los resultados deben obtenerse de datos reales.

Evita datos hardcodeados.

---

# 50. ORDEN DE IMPLEMENTACIÓN

No intentes cambiar todo sin control.

Trabaja por fases.

## FASE 1 — AUDITORÍA DEL PROYECTO

Analizar:

- backend;
- frontend;
- BD;
- autenticación;
- entidades;
- API;
- funcionalidades existentes;
- errores.

Generar un resumen interno antes de modificar.

---

## FASE 2 — SEGURIDAD

Implementar/mejorar:

- autenticación;
- usuarios;
- roles;
- permisos;
- Spring Security;
- autorización backend;
- control frontend.

---

## FASE 3 — LAYOUT

Implementar:

- sidebar;
- header;
- menú según permisos;
- dashboard.

---

## FASE 4 — CATÁLOGO E INVENTARIO

Completar:

- productos;
- categorías;
- marcas;
- unidades;
- presentaciones;
- inventario;
- movimientos;
- Kardex.

---

## FASE 5 — VENTAS

Implementar:

- POS;
- ventas;
- clientes;
- precios mayoristas;
- métodos de pago;
- descuentos;
- cotizaciones;
- devoluciones.

---

## FASE 6 — COMPRAS

Implementar:

- proveedores;
- órdenes de compra;
- compras;
- actualización de stock.

---

## FASE 7 — CAJA Y FINANZAS

Implementar:

- apertura;
- movimientos;
- cierre;
- arqueo;
- cuentas por cobrar;
- cuentas por pagar.

---

## FASE 8 — REPORTES

Implementar:

- ventas;
- inventario;
- compras;
- utilidad;
- dashboard;
- exportación.

---

## FASE 9 — AUDITORÍA Y CONFIGURACIÓN

Implementar:

- auditoría;
- configuración;
- empresa;
- perfil.

---

## FASE 10 — PRUEBAS

Realizar:

- compilación;
- pruebas backend;
- pruebas frontend;
- revisión de rutas;
- revisión de seguridad;
- revisión de permisos;
- revisión de flujo completo.

---

# 51. FLUJOS QUE DEBEN FUNCIONAR DE PRINCIPIO A FIN

## FLUJO DE VENTA

Login Cajero

↓

Abrir Caja

↓

Punto de Venta

↓

Buscar producto

↓

Seleccionar presentación

↓

Agregar cantidad

↓

Verificar stock

↓

Seleccionar cliente

↓

Seleccionar forma de pago

↓

Confirmar

↓

Crear venta

↓

Crear detalle

↓

Descontar inventario

↓

Crear movimiento de inventario

↓

Registrar ingreso en caja

↓

Generar ticket

↓

Mostrar confirmación.

---

## FLUJO DE COMPRA

Login usuario autorizado

↓

Seleccionar proveedor

↓

Agregar productos

↓

Registrar cantidades y costos

↓

Confirmar compra

↓

Registrar Compra

↓

Registrar DetalleCompra

↓

Incrementar inventario

↓

Crear movimientos

↓

Actualizar cuentas por pagar si corresponde.

---

## FLUJO DE DEVOLUCIÓN

Buscar venta

↓

Seleccionar producto

↓

Cantidad a devolver

↓

Motivo

↓

Confirmar

↓

Crear devolución

↓

Restituir stock cuando corresponda

↓

Registrar movimiento

↓

Actualizar estado de venta

↓

Registrar auditoría.

---

# 52. MATRIZ DE PERMISOS INICIAL

Crear una configuración inicial similar a:

| Función | SuperAdmin | Admin | Gerente | Cajero | Vendedor | Almacén | Compras |
|---|---|---|---|---|---|---|---|
| Dashboard | Sí | Sí | Sí | Limitado | Limitado | Limitado | Limitado |
| POS | Sí | Sí | Consulta | Sí | Sí | No | No |
| Ventas | Sí | Sí | Ver | Propias | Propias | No | No |
| Anular ventas | Sí | Sí | No | No | No | No | No |
| Productos | Sí | Sí | Ver | Ver | Ver | Sí | Ver |
| Cambiar precios | Sí | Sí | No | No | No | No | No |
| Inventario | Sí | Sí | Ver | Ver | Ver | Sí | Ver |
| Ajustar stock | Sí | Sí | No | No | No | Sí | No |
| Compras | Sí | Sí | Ver | No | No | Recepción | Sí |
| Proveedores | Sí | Sí | Ver | No | No | Ver | Sí |
| Caja | Sí | Sí | Ver | Propia | No | No | No |
| Reportes | Sí | Sí | Sí | Limitados | Limitados | Inventario | Compras |
| Usuarios | Sí | Sí | No | No | No | No | No |
| Roles | Sí | Limitado | No | No | No | No | No |
| Auditoría | Sí | Sí | Ver | No | No | No | No |
| Configuración | Sí | Limitada | No | No | No | No | No |

IMPORTANTE:

Esta tabla sirve como configuración inicial.

El administrador autorizado debe poder posteriormente modificar permisos desde:

**Sistema > Roles y Permisos.**

---

# 53. REGLAS DE NEGOCIO IMPORTANTES

Implementar como mínimo:

1. No vender cantidad superior al stock disponible.
2. Toda venta confirmada descuenta stock.
3. Toda compra confirmada incrementa stock.
4. Toda modificación manual de stock genera movimiento.
5. Toda anulación relevante genera auditoría.
6. No permitir eliminar físicamente ventas.
7. No eliminar movimientos de inventario.
8. Productos usados deben desactivarse, no eliminarse físicamente.
9. Usuarios inactivos no pueden iniciar sesión.
10. Acciones no autorizadas deben devolver 403.
11. No confiar en permisos enviados por frontend.
12. Totales deben calcularse también en backend.
13. El frontend no puede determinar por sí solo el precio final.
14. Mantener consistencia en operaciones transaccionales.
15. Registrar usuario responsable de acciones críticas.

---

# 54. RESULTADO ESPERADO

Quiero terminar con un software cuyo flujo sea similar a un sistema comercial real:

**PLASTIQUERÍA JIREH**

Sistema Integral de Gestión

Con:

✅ Dashboard

✅ Punto de Venta

✅ Ventas

✅ Cotizaciones

✅ Devoluciones

✅ Productos

✅ Categorías

✅ Marcas

✅ Presentaciones

✅ Inventario

✅ Kardex

✅ Clientes

✅ Compras

✅ Proveedores

✅ Órdenes de compra

✅ Caja

✅ Cuentas por cobrar

✅ Cuentas por pagar

✅ Reportes

✅ Usuarios

✅ Roles

✅ Permisos

✅ Auditoría

✅ Configuración

✅ Login seguro

✅ Interfaz moderna

✅ Control de acceso por privilegios

✅ Backend protegido

✅ Base de datos consistente

✅ Sistema totalmente conectado.

---

# 55. INSTRUCCIÓN FINAL

Comienza inspeccionando TODO el repositorio.

NO empieces creando otro proyecto.

NO reemplaces tecnologías solamente por preferencia personal.

NO hagas cambios masivos sin comprender el código actual.

Identifica primero:

- qué existe;
- qué funciona;
- qué está incompleto;
- qué debe corregirse;
- qué puede reutilizarse.

Después comienza la mejora por fases.

En cada fase:

1. Implementa backend.
2. Implementa base de datos si corresponde.
3. Implementa frontend.
4. Conecta frontend y backend.
5. Ejecuta pruebas.
6. Corrige errores.
7. Verifica que las funciones anteriores sigan funcionando.

Si encuentras errores durante la implementación, corrígelos antes de avanzar.

No quiero solamente recomendaciones ni fragmentos de ejemplo.

**Quiero que implementes los cambios realmente dentro del repositorio y dejes el sistema ejecutable, coherente, documentado y funcional.**