# Proyecto Tecno Chile

## Integrantes del Equipo
- María Teresa de la Fuente
- Daniela Garrido Olivares
- Gonzalo Román Reyes

## Repositorio: https://github.com/Daniela-Garrido/finalmodulo4/tree/POOES6

## Descripción del Proyecto: 
"Tecno Chile" es una aplicación web para la gestión de productos y el inventario de una tienda de tecnología. Este proyecto se ha desarrollado como parte de un ejercicio práctico para migrar una base de código de JavaScript ES5 a ES6 y para implementar un sistema CRUD (Crear, Leer, Actualizar, Eliminar) utilizando `localStorage` para la persistencia de datos.

La aplicación consta de dos secciones principales:
- Una página principal (`index.html` y `products.html`) para los usuarios, con listados de productos y funcionalidades de filtrado.
- Un panel de administración (`admin.html`) para el manejo del inventario, donde el administrador puede crear, editar, eliminar y listar productos.

## Características Principales

### 1. Migración a ES6+

El código base ha sido completamente refactorizado para utilizar JavaScript moderno (ES6 y superior), lo que incluye:
- **Clases**: Implementación de clases para `Producto` y `CarritoItem` para una programación orientada a objetos más limpia.
- **`const` y `let`**: Uso de variables de ámbito de bloque.
- **Funciones flecha (`=>`)**: Para una sintaxis más concisa en las funciones.
- **`async/await`**: Para manejar la carga asincrónica del archivo `productos.json`.
- **Destructuring**: Para una asignación de variables más eficiente.

### 2. Gestión de Inventario (CRUD)

La sección de administración (`admin.html`) ofrece un control total sobre el inventario a través de las siguientes funcionalidades:

- **Listado de Productos**: Muestra una tabla interactiva con todos los productos, incluyendo detalles como `id`, `nombre`, `precio`, `descripción`, `categoría`, `etiqueta` y `stock`. Cada fila contiene iconos de edición y eliminación.
- **Creación de Productos**: Un formulario modal permite al administrador ingresar los datos de un nuevo producto, que se añade al inventario.
- **Edición de Productos**: Al seleccionar un producto, se precargan sus datos en el formulario modal, permitiendo su modificación (excepto el `id`).
- **Eliminación de Productos**: Al hacer clic en el icono de eliminación, se borra el producto del inventario, previa confirmación.

### 3. Funcionalidades de Filtrado y Búsqueda

En la página de productos (`products.html`), los usuarios pueden filtrar el inventario por varios criterios para encontrar rápidamente lo que buscan:
- **Categoría**: Filtra por categorías predefinidas (`Mouse`, `Teclado`, etc.).
- **Precio**: Permite buscar productos dentro de un rango de precios.
- **Búsqueda por Texto Libre**: Realiza una búsqueda flexible en los campos `nombre`, `descripción` y `etiqueta`.

### 4. Persistencia de Datos con localStorage

Para mantener la información de los productos y el carrito de compras a través de las diferentes páginas y sesiones del navegador, se utiliza la API de **localStorage**. Los datos se guardan como cadenas JSON y se deserializan al cargar la página, garantizando la persistencia.

---

### **5. Estructura y Navegación**

- El proyecto está compuesto por múltiples páginas (`index.html`, `products.html`, `admin.html`) que se comunican a través de **localStorage** para compartir la información del inventario.
- La navegación entre estas páginas está bien definida, permitiendo al usuario una experiencia fluida. Por ejemplo, en el panel de administración, el administrador puede regresar a la tienda con un solo clic.

---

### **6. Diseño y Estándares**

- El diseño de la interfaz de usuario ha sido implementado utilizando **Bootstrap 5.3** y **CSS personalizado**.
- La aplicación es **responsive**, adaptándose a diferentes tamaños de pantalla (escritorio, tablet, móvil).
- Se han incorporado iconos de la librería **Bootstrap Icons** para mejorar la usabilidad y la estética.
- La estética general del sitio es **limpia y moderna**, siguiendo estándares de diseño web actuales.

---
## Estructura del Proyecto
```
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── admin.js       
│   │   └── script.js      
│   └── img/
│       └── ...            
├── admin.html             
├── index.html              
├── products.html          
├── productos.json         
└── README.md
```

## Tecnologías Utilizadas

- **HTML5**: Estructura de la página web.
- **CSS3**: Estilos personalizados.
- **JavaScript ES6+**: Lógica principal del front-end.
- **Bootstrap 5.3**: Framework CSS para el diseño responsive y componentes UI.
- **Bootstrap Icons**: Librería de iconos para las acciones del administrador.

## Cómo Utilizar la Aplicación

1.  Clona o descarga el repositorio del proyecto.
2.  Abre el archivo `index.html` o `admin.html` en tu navegador web.
3.  La aplicación cargará los productos desde `productos.json` y los guardará en `localStorage`.
4.  Desde `admin.html`, puedes gestionar el inventario. Las modificaciones se guardarán automáticamente en `localStorage`.
5.  Desde `index.html` o `products.html`, puedes ver el catálogo de productos y utilizar los filtros de búsqueda.

---