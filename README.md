# TECNO CHILE

##Integrantes:

-María Teresa de la Fuente
-Daniela Garrido Olivares
-Roberto Escobar Vivallo
-Gonzalo Román Reyes


## Ruta de repositorio: https://github.com/Daniela-Garrido/finalmodulo4.git

## Evaluación Final - Módulo 4: Fundamentos de Programación en Javascript

###  Objetivo
Codificar piezas de software de baja/mediana complejidad
utilizando lenguaje Javascript para resolver problemáticas comunes
de acuerdo a las necesidades de la industria.

### Actividad
La empresa “Tecno Chile” es una empresa en la cual necesitan
vender sus productos en línea, para lo cual se hace necesario diseñar
un prototipo funcional que permita establecer una primera solución.
Dados los antecedentes anteriores, es necesario desarrollar una
solución tecnológica que cubra los procesos de negocio descritos
anteriormente.
Para el desarrollo web, y en esta ocasión, tu trabajo será resolver,
con los conocimientos que has adquirido, una serie de cálculos
matemáticos que se necesitan diagramar y/o programar según
corresponda.

---

## Requerimientos

1. Construir prototipo de una web del tipo tienda en línea y que tenga un comportamiento responsivo.
✅ Construcción de sitio web, tipo tienda en línea, con comportamiento responsivo. Consta de un landing page (index.html) y una página de productos (products.html). El landing page cuenta con una sección de productos destacados, una sección "Sobre nosotros", con una pequeña reseña de la empresa, y una sección de "Contacto" con los datos de la tienda, un mapa integrado y un formulario de contacto.

2. Deberá incluir la implementación de Bootstrap e implementar al menos 1 carousel, tooltips, entre otros.
✅ En ambas páginas se implementó, usando bootstrap, un carrusel en la parte superior y un tooltip en el botón "agregar" de las cards de productos

3. Deberá contener un componente Navbar con links que lleven a las diferentes secciones de la web.
✅ El sitio contiene un navbar fijo en la parte superior con links que llevan tanto de una página a otra (index.html y products.html) como a las secciones "Sobre nosotros" y "Contacto" dentro del landing page (index.html).

4. Debe tener un footer que incluya iconos de redes sociales.
✅ Ambas páginas contienen footer con links a las mismas secciones del navbar y a redes sociales. Para estas últimas se utilizaron los íconos de instagram, facebook y LinkedIn con enlaces correspondientes a las plataformas de cada una de ellas 

5. Deberá solicitar al usuario nombre y apellido, los cuales deberán ser mostrarlos en alguna sección cliente.
✅ Al entrar al sitio se le solicita a cada usuario su nombre y apellido, los cuales son almacenados en local storage, y desplegados en un mensaje de bienvenida enla página de inicio, abajo del carrusel.

6. Deberá contener una página de ventas, la cual deberá implementar card de Bootstrap, deberá agregar al carrito de compras el producto seleccionado y luego listar el nombre del producto y su precio.
✅ En la página de ventas (products.html) se despliegan los productos en cards de bootstrap creadas con Javascript, las cuales cuentan con un botón para agregar los productos seleccionados al carrito. Los productos agregados al carrito se despliegan en un panel deslizante offcanvas, al lado derecho de la pantalla, con sus respectivos id, nombre y precio.

7. Para el punto anterior, deberá crear una estructura de datos mediante arreglos. 
✅ En la página de productos (products.html) se creó una estructura de datos mediante arreglos para la creación de las cards de productos. Además, se usaron las clases de Bootstrap para que estas fueran responsivas y del mismo tamaño, independiente de la cantidad de líneas que tuviera la descripción del producto

8. De acuerdo a la tabla siguiente vas a realizar el arreglo de datos para mostrar en pantalla según lo solicitado.

9. Agregue un input donde se puedan filtrar los productos

10. Agregar un botón a cada producto para que pueda ser eliminado del carrito.

11. Calcular el precio total, sumando el precio de todos los productos agregados al carrito.

12. Botón vaciar el carrito, es decir, debe permitir remover todos los productos agregados al carro dejando la sección del carrito vacío.