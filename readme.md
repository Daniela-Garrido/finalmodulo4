# Proyecto Tecno Chile MOD5 - ABPRO3

## Integrantes del Equipo
- María Teresa de la Fuente
- Daniela Garrido Olivares
- Gonzalo Román Reyes

## Repositorio: https://github.com/Daniela-Garrido/finalmodulo4/tree/M5AE4-ABPRO3

## Descripción del Proyecto: 
"Tecno Chile" es una aplicación web para la gestión de productos e inventario de una tienda de tecnología. Se ha desarrollado para migrar una base de código de JavaScript ES5 a ES6 y para implementar un sistema CRUD (Crear, Leer, Actualizar, Eliminar) interactuando con una API.

### La aplicación consta de dos secciones principales:

- Una página de usuario (index.html y products.html) con listados de productos y filtros.

- Un panel de administración (admin.html) para el manejo del inventario (requiere implementación en el backend).

## Características Principales

- Novedades en la Lógica de Carga de Datos
1. Carga Robusta de Productos: La aplicación ahora prioriza la carga de productos directamente desde la API. Solo si la llamada a la API falla (por problemas de red o conexión), recurre a los productos guardados en el almacenamiento local (localStorage) como un mecanismo de respaldo. Esto asegura que la aplicación siempre intente mostrar la información más actualizada y, al mismo tiempo, proporcione una experiencia de usuario sin interrupciones incluso si el servidor no está disponible.

2. Manejo de Errores Mejorado: La función de carga (cargarProductos) incluye un manejo de errores más sofisticado. Si la llamada a la API no tiene éxito, se muestra un mensaje de advertencia en la consola y, si no hay datos en el localStorage, un mensaje de error se renderiza en la interfaz de usuario, informando al usuario que los productos no pudieron ser cargados.
---


### Requerimientos Cumplidos
Estos puntos abordan directamente los requerimientos específicos del proyecto, incluyendo las nuevas mejoras:

1. Uso de la API para la Carga de Productos: La aplicación obtiene el catálogo de productos a través de una petición asíncrona (fetch) a la API en http://localhost:3000/api/productos.

2. Manejo de la Persistencia: El carrito de compras se mantiene en el localStorage, lo que permite que el usuario retome su compra. Los datos del carrito se actualizan dinámicamente.

3. Actualización de Stock Mediante API: Al comprar, la aplicación envía una solicitud PATCH al servidor para cada producto, actualizando el stock permanentemente. Si un producto llega a 0, se simula una notificación.

4. Gestión de Peticiones y Errores: La función de compra utiliza Promise.all() para gestionar múltiples peticiones y los bloques try...catch para manejar fallos de conexión o falta de stock, garantizando una operación robusta.
---
### Cómo Ejecutar el Proyecto
Para ejecutar la aplicación, debes tener tanto el frontend como el backend activos.

1. Iniciar el Servidor (Backend):
En una terminal, navega a la carpeta de tu proyecto (PROXY-SERVER) y ejecuta el servidor de la API con el siguiente comando:

```Bash
node index.js
```
Asegúrate de que el servidor esté escuchando en el puerto 3000 y que la política CORS esté habilitada.

2. Abrir la Aplicación (Frontend):
Dado que la aplicación debe conectarse a un servidor, es necesario ejecutarla también en un servidor local. Para esto, se recomienda usar la extensión Live Server en Visual Studio Code.

- Instala la extensión "Live Server" desde el marketplace de VS Code.

- Abre tu archivo index.html o products.html.

- Haz clic derecho en el editor y selecciona "Open with Live Server".

Esto abrirá tu sitio en una URL como http://127.0.0.1:5500/. El sitio se conectará automáticamente a la API y cargará los productos más recientes.

---