# TECNO CHILE - E-commerce Prototype

## Descripción del Proyecto
Prototipo funcional de tienda en línea para "Tecno Chile", desarrollado como evaluación final del Módulo 4: Fundamentos de Programación en Javascript. El sitio incluye landing page responsivo y página de productos con funcionalidad completa de carrito de compras. El código JavaScript ha sido refactorizado para ser compatible con ECMAScript 5 (ES5).

## Integrantes del Equipo
- María Teresa de la Fuente
- Daniela Garrido Olivares
- Gonzalo Román Reyes

## Repositorio
🔗 [https://github.com/Daniela-Garrido/finalmodulo4.git]

## Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES5)
- **Frameworks/Librerías**: 
  - Bootstrap 5 (para diseño responsivo y componentes UI)
  - Animate.css (para animaciones)
  - Font Awesome (para íconos)
- **Almacenamiento**: LocalStorage (para persistencia de datos del usuario)

## Estructura del Proyecto
```bash
finalmodulo4/
├── assets/
│ ├── css/ # Estilos personalizados
│ ├── img/ # Imágenes del proyecto
│ └── js/ # Scripts JavaScript
├── index.html # Landing page principal
├── productos.json # Archivo de datos de los productos
├── products.html # Página de productos
└── README.md # Documentación
```
## Funcionalidades Implementadas

### ✅ Navegación y Estructura
- Navbar responsive con enlaces a todas las secciones
- Footer con íconos de redes sociales y enlaces importantes
- Diseño completamente responsivo (mobile-first)

### ✅ Landing Page (index.html)
- Sección hero con carrusel de imágenes.
- Sección "Productos Destacados" con cards interactivas, mostrando los primeros 6 productos del archivo JSON.
- Sección "Sobre Nosotros" con información de la empresa.
- Área de contacto con formulario y mapa integrado.

### ✅ Página de Productos (products.html)
- Sistema de cards de productos generadas dinámicamente con JavaScript
- Filtrado de productos mediante un campo de búsqueda, que filtra tanto por nombre como por descripción

### ✅ Carrito de Compras
- Agregar/eliminar productos individualmente.
- Gestión de la cantidad de productos dentro del carrito, con botones para aumentar y disminuir la cantidad de cada ítem.
- Cálculo automático del total del carrito.
- Control de stock: Los productos se agregan al carrito solo si hay stock disponible. Se muestra una advertencia si se intenta agregar más unidades de las existentes.
- Botón "Vaciar Carrito" que remueve todos los items.
- Persistencia de datos usando localStorage.
- Notificación de compra: Se realiza una verificación de stock antes de finalizar la compra y se notifica al usuario si un producto se ha agotado.

### ✅ Interacción con el Usuario
- Solicitud de nombre/apellido al ingresar al sitio, almacenado en localStorage.
- Mensaje personalizado de bienvenida.
- Tooltips en los botones de "Agregar" de las cards.
- Animaciones en elementos interactivos.
---

## Requerimientos

### 1. Crear el sitio web en base a HTML5.
- Cumplimiento: Sí. El proyecto está estructurado con archivos index.html y products.html que utilizan la sintaxis de HTML5.

### 2. Agregar un listado de productos a la venta desde un archivo Json.

- Cumplimiento: Sí. Los productos se cargan desde un archivo JSON llamado productos.json a través de una solicitud XMLHttpRequest en el archivo script.js. Esta función (cargarProductos) se encarga de obtener y procesar los datos de los productos antes de mostrarlos en la página.

### 3. Controlar el mensaje a mostrar según stock.

- Cumplimiento: Sí. La función mostrarProductos verifica la propiedad stock de cada producto. Dependiendo del valor, muestra mensajes específicos como "Agotado", "¡Última unidad!", o el número de unidades restantes si el stock es bajo. Además, el botón para agregar al carrito se deshabilita si el producto no tiene stock disponible.

### 4. Crear un carro de compra para dar la posibilidad de comprar.

- Cumplimiento: Sí. El proyecto incluye un carrito de compras funcional que se muestra en un offcanvas de Bootstrap. Los productos se pueden agregar desde la página de productos y se listan en el carrito con su precio y cantidad. El botón "Comprar" inicia el proceso de compra.

### 5. Permitir modificar la cantidad de productos en el carro de compras.

- Cumplimiento: Sí. En el carrito, cada producto tiene botones para aumentar (+) o disminuir (-) la cantidad de unidades. La función modificarCantidad maneja esta lógica, asegurando que la cantidad no sea menor a 1 ni exceda el stock disponible del producto.

### 6. Rebajar el stock de los productos comprados.

- Cumplimiento: Sí. La función comprarCarrito recorre los productos en el carrito y resta la cantidad comprada del stock de cada producto. Este cambio se realiza de forma simulada en el código, pero demuestra la funcionalidad.

### 7. Enviar un correo al responsable, indicando cuando un producto se encuentra sin stock, después de una venta.

- Cumplimiento: Sí. Dentro de la función comprarCarrito, después de rebajar el stock, se verifica si el stock de algún producto se ha agotado (stock <= 0). En ese caso, se muestra una alerta y se simula el envío de un correo electrónico a un responsable mediante un mensaje en la consola.
