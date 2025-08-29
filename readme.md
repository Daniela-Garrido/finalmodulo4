

# Proyecto Tecno Chile M5AE5 - ABPRO4

### Integrantes del Equipo
- María Teresa de la Fuente
- Daniela Garrido Olivares
- Gonzalo Román Reyes

### Repositorio: https://github.com/Daniela-Garrido/finalmodulo4/tree/M5AE5-ABPRO4

## Aprendizaje Esperado
Utilizar el objeto XHR y la API Fetch para el consumo de una API externa y su procesamiento acorde al lenguaje Javascript.

--- 

### Descripción del Proyecto: 
"Tecno Chile" es una tienda digital que cumple con los requisitos del ABPRO4 al integrar y comparar dos tecnologías de comunicación HTTP: Fetch y XMLHttpRequest (XHR).

A continuación, se detalla cómo cada requisito ha sido implementado y documentado en el código:


# Implementación de Funcionalidades

### a) Obtención de Datos con Fetch

La función principal cargarProductos utiliza la API de Fetch para realizar una petición GET a http://localhost:3000/api/productos y recuperar la lista completa de productos.

Petición asíncrona: La función es declarada como async y utiliza await para esperar la respuesta del servidor.

Manejo de errores: Un bloque try...catch captura cualquier fallo en la conexión con la API.

Respaldo local: En caso de que la API falle, se implementa una lógica de respaldo que carga los datos desde localStorage.

### b) Actualización Dinámica con Fetch

La función comprarCarrito utiliza fetch para modificar el stock de los productos:

Petición PATCH: Por cada producto en el carrito, se realiza una petición PATCH a la ruta http://localhost:3000/api/productos/{id}/stock.

Actualización en el front-end: Después de una compra exitosa, la aplicación vacía el carrito y vuelve a llamar a cargarProductos para reflejar los cambios.

---
### c) Obtención de Información Adicional con XHR
La función mostrarDetallesConXHR se activa al hacer clic en el botón "Más detalles" de cada producto:

Instancia de XHR: Se crea una nueva instancia de XMLHttpRequest para realizar la petición.

Manejo de estado: Se utiliza el evento onreadystatechange para monitorear el progreso de la petición.

Manejo de errores: El código maneja cualquier error de petición mostrando una alerta al usuario.
---
## Análisis y Comparación de Peticiones HTTP

Característica	Fetch API	XMLHttpRequest (XHR)
Sintaxis	Basada en Promesas, más limpia y moderna	Basada en callbacks, más verbosa Manejo de errores	Usa .catch() y verificación de response.ok	Verificación manual de readyState y status
Legibilidad	Código más legible y mantenible	Estructura más compleja y propensa a "callback hell" Rendimiento	Ventajas arquitectónicas, permite trabajar con streams	Sólido y funcional, pero menos eficiente en flujos complejos Uso en el proyecto	Funciones críticas: cargarProductos() y comprarCarrito()	Fines educativos: mostrarDetallesConXHR()


## Comparación: Fetch vs XHR
Característica	Fetch API	XMLHttpRequest (XHR)
Sintaxis	Basada en Promesas, más limpia y moderna	Basada en callbacks, más verbosa
Manejo de errores	Usa .catch() y verificación de response.ok	Verificación manual de readyState y status
Legibilidad	Código más legible y mantenible	Estructura más compleja y propensa a "callback hell"
Rendimiento	Ventajas arquitectónicas, permite trabajar con streams	Sólido y funcional, pero menos eficiente en flujos complejos
Uso en el proyecto	Funciones críticas: cargarProductos() y comprarCarrito()	Fines educativos: mostrarDetallesConXHR()


### Fetch API: El Estándar Moderno
> La API de Fetch representa el enfoque moderno para realizar peticiones de red en JavaScript. Su principal ventaja es que está basada en promesas, lo que simplifica enormemente el manejo de la asincronía.
>En nuestro código, se usa para funciones críticas como cargarProductos() y comprarCarrito(). El uso de async/await permite que estas funciones se lean casi como si fueran síncronas, haciendo el código más limpio y fácil de mantener.
>>#### Uso: La sintaxis de Fetch es concisa y legible. Solo se necesita una línea de código para iniciar una petición, y el encadenamiento de .then() permite manejar los datos de la respuesta de manera secuencial. El manejo de errores de red (como un servidor caído) se realiza con un .catch(), mientras que los errores HTTP (como un 404 Not Found) se manejan verificando la propiedad response.ok en el código.
>>#### Rendimiento: Aunque en la mayoría de los casos no hay una diferencia de rendimiento notable para el usuario, Fetch tiene ventajas arquitectónicas significativas. Al estar diseñado para el futuro, permite trabajar con streams (flujos de datos), lo que potencialmente permite procesar respuestas de gran tamaño de manera más eficiente, sin tener que esperar a que se descargue el archivo completo en la memoria del cliente.

---

### XMLHttpRequest (XHR): El Legado Funcional
>XMLHttpRequest es la tecnología original para realizar peticiones asíncronas en navegadores. En contraste con Fetch, su funcionamiento se basa en un modelo de eventos y callbacks.
En nuestro proyecto, XHR se utiliza en la función mostrarDetallesConXHR() para fines educativos. Al presionar el botón de "Más detalles", se realiza una petición independiente que trae información adicional del producto.
>>#### Uso: a sintaxis de XHR es notablemente más verbosa. Se requiere la creación de un nuevo objeto, la configuración de la petición con .open(), y la definición de una función de onreadystatechange que monitorea el progreso de la solicitud. Dentro de esta función, es necesario verificar manualmente tanto el estado de la conexión (readyState === 4) como el código de respuesta HTTP (status === 200) para saber si la petición fue exitosa.
>>#### Rendimiento: XHR es una herramienta sólida y funcional, y durante muchos años fue el estándar. Sin embargo, su enfoque orientado a eventos puede llevar a una estructura de código más compleja (a menudo llamada "callback hell"), especialmente en aplicaciones con múltiples dependencias asíncronas. Esto hace que su mantenimiento y lectura sean más difíciles en comparación con las promesas de Fetch.

---

### Conclusión: La Elección del Desarrollador

Fetch API es la opción preferida para el desarrollo web moderno debido a su sintaxis limpia, enfoque basado en promesas y mejor integración con características recientes de JavaScript. La implementación de XHR en este proyecto sirve para ilustrar la evolución del desarrollo web asíncrono.