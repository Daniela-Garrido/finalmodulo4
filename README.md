# TECNO CHILE - E-commerce Prototype

## Descripción del Proyecto
Prototipo funcional de tienda en línea para "Tecno Chile", desarrollado como evaluación final del Módulo 4: Fundamentos de Programación en Javascript. El sitio incluye landing page responsivo y página de productos con funcionalidad completa de carrito de compras.

## Integrantes del Equipo
- María Teresa de la Fuente
- Daniela Garrido Olivares
- Roberto Escobar Vivallo
- Gonzalo Román Reyes

## Repositorio
🔗 [https://github.com/Daniela-Garrido/finalmodulo4.git](https://github.com/Daniela-Garrido/finalmodulo4.git)

## Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
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
├── products.html # Página de productos
└── README.md # Documentación
```
## Funcionalidades Implementadas

### ✅ Navegación y Estructura
- Navbar responsive con enlaces a todas las secciones
- Footer con íconos de redes sociales y enlaces importantes
- Diseño completamente responsivo (mobile-first)

### ✅ Landing Page (index.html)
- Sección hero con carrusel de imágenes
- Sección "Productos Destacados" con cards interactivas
- Sección "Sobre Nosotros" con información de la empresa
- Área de contacto con formulario y mapa integrado

### ✅ Página de Productos (products.html)
- Sistema de cards de productos generadas dinámicamente con JavaScript
- Filtrado de productos mediante input de búsqueda
- Carrito de compras funcional con panel deslizante (offcanvas)

### ✅ Carrito de Compras
- Agregar/eliminar productos individualmente
- Cálculo automático del total
- Botón "Vaciar Carrito" que remueve todos los items
- Persistencia de datos usando localStorage

### ✅ Interacción con el Usuario
- Solicitud de nombre/apellido al ingresar al sitio
- Mensaje personalizado de bienvenida
- Tooltips en botones importantes
- Animaciones en elementos interactivos

## Requisitos Cumplidos
| #  | Requerimiento | Estado |
|----|---------------|--------|
| 1  | Prototipo responsivo | ✅ |
| 2  | Implementación Bootstrap (carousel, tooltips) | ✅ |
| 3  | Navbar funcional | ✅ |
| 4  | Footer con redes sociales | ✅ |
| 5  | Captura y muestra nombre usuario | ✅ |
| 6  | Página de ventas con cards y carrito | ✅ |
| 7  | Estructura de datos con arreglos | ✅ |
| 8  | Arreglo de datos según tabla | ✅ |
| 9  | Filtrado de productos | ✅ |
| 10 | Eliminar productos individualmente | ✅ |
| 11 | Cálculo de precio total | ✅ |
| 12 | Vaciar carrito completamente | ✅ | 

## Requerimientos

1. Construir prototipo de una web del tipo tienda en línea y que tenga un comportamiento responsivo.
✅ Construcción de sitio web, tipo tienda en línea, con comportamiento responsivo. Consta de un landing page (index.html) y una página de productos (products.html). El landing page cuenta con una sección de productos destacados, una sección "Sobre nosotros", con una pequeña reseña de la empresa, y una sección de "Contacto" con los datos de la tienda, un mapa integrado y un formulario de contacto.

2. Deberá incluir la implementación de Bootstrap e implementar al menos 1 carousel, tooltips, entre otros.
✅ En ambas páginas se implementó, usando bootstrap, un carrusel en la parte superior y un tooltip en el botón "agregar" de las cards de productos

3. Deberá contener un componente Navbar con links que lleven a las diferentes secciones de la web.
✅ El sitio contiene un navbar fijo en la parte superior con links que llevan tanto de una página a otra (index.html y products.html) como a las secciones "Sobre nosotros" y "Contacto" dentro del landing page (index.html).

4. Debe tener un footer que incluya íconos de redes sociales.
✅ Ambas páginas contienen footer con links a las mismas secciones del navbar y a redes sociales. Para estas últimas se utilizaron los íconos de instagram, facebook y LinkedIn con enlaces correspondientes a las plataformas de cada una de ellas 

5. Deberá solicitar al usuario nombre y apellido, los cuales deberán ser mostrarlos en alguna sección cliente.
✅ Al entrar al sitio se le solicita a cada usuario su nombre y apellido, los cuales son almacenados en local storage, y desplegados en un mensaje de bienvenida enla página de inicio, abajo del carrusel.

6. Deberá contener una página de ventas, la cual deberá implementar card de Bootstrap, deberá agregar al carrito de compras el producto seleccionado y luego listar el nombre del producto y su precio.
✅ En la página de ventas (products.html) se despliegan los productos en cards de bootstrap creadas con Javascript, las cuales cuentan con un botón para agregar los productos seleccionados al carrito. Los productos agregados al carrito se despliegan en un panel deslizante offcanvas, al lado derecho de la pantalla, con sus respectivos id, nombre y precio.

7. Para el punto anterior, deberá crear una estructura de datos mediante arreglos. 
✅ En la página de productos (products.html) se creó una estructura de datos mediante arreglos para la creación de las cards de productos. Además, se usaron las clases de Bootstrap para que estas fueran responsivas y del mismo tamaño, independiente de la cantidad de líneas que tuviera la descripción del producto

8. De acuerdo a la tabla siguiente vas a realizar el arreglo de datos para mostrar en pantalla según lo solicitado.
✅ En la página de productos (products.html) se creó una estructura de datos mediante arreglos para la creación de las cards de productos.

9. Agregue un input donde se puedan filtrar los productos
✅ En la página de productos (products.html) se agregó un input donde se pueden filtrar los productos

10. Agregar un botón a cada producto para que pueda ser eliminado del carrito.
✅ En el offcanvas del carrito se agregó un botón a cada producto para que pueda ser eliminado del carrito.

11. Calcular el precio total, sumando el precio de todos los productos agregados al carrito.
✅ En el offcanvas del carrito se calcula el precio total, sumando el precio de todos los productos agregados al carrito.

12. Botón vaciar el carrito, es decir, debe permitir remover todos los productos agregados al carro dejando la sección del carrito vacío.
✅ En el offcanvas del carrito se agregó un botón vaciar el carrito, es decir, debe permitir remover todos los productos agregados al carro dejando la sección del carrito vacío.
