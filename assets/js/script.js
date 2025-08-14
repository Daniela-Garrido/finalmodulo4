// Variable global para los productos
let productos = [];
let carrito = [];

// Clases
class Producto {
    constructor(id, nombre, descripcion, precio, urlImagen, stock, categoria, etiqueta) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.urlImagen = urlImagen;
        this.stock = stock;
        this.categoria = categoria; // Nuevo campo
        this.etiqueta = etiqueta;   // Nuevo campo
    }
}

class CarritoItem {
    constructor(id, nombre, precio, cantidad, stockDisponible) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.stockDisponible = stockDisponible;
    }
}

/* Cargar productos desde el JSON
const cargarProductos = async () => {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        productos = data.productos.map(p => new Producto(p.id, p.nombre, p.descripcion, p.precio, p.urlImagen, p.stock, p.categoria, p.etiqueta));
        mostrarProductosSegunPagina();
    } catch (error) {
        console.error('Error cargando o procesando los productos:', error);
    }
}; SE CAMBIA POR EL CODIGO DE ABAJO */

const cargarProductos = async () => {
    try {
        // Primero intentar cargar desde localStorage
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            productos = JSON.parse(productosGuardados).map(p => new Producto(
                p.id, p.nombre, p.descripcion, p.precio, p.urlImagen,
                p.stock, p.categoria, p.etiqueta
            ));
            mostrarProductosSegunPagina();
            return;
        }

        // Si no hay en localStorage, cargar desde JSON
        const response = await fetch('./productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');

        const data = await response.json();
        productos = data.productos.map(p => new Producto(
            p.id, p.nombre, p.descripcion, p.precio, p.urlImagen,
            p.stock, p.categoria, p.etiqueta
        ));

        // Guardar en localStorage para futuras cargas
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductosSegunPagina();
    } catch (error) {
        console.error('Error cargando o procesando los productos:', error);
    }
};

// Mostrar productos según la página
const mostrarProductosSegunPagina = () => {
    const contenedor = document.getElementById("productos-contenedor");
    if (contenedor) {
        if (window.location.pathname.includes("index.html")) {
            mostrarProductos(productos.slice(0, 6));
        } else if (window.location.pathname.includes("products.html")) {
            mostrarProductos(productos);
        }
    }
};

// Función para mostrar productos
const mostrarProductos = (listaProductos) => {
    const contenedor = document.getElementById("productos-contenedor");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        let botonAgregar = '';
        let mensajeStock = '';

        if (producto.stock <= 0) {
            mensajeStock = '<p class="text-danger">Agotado</p>';
        } else if (producto.stock === 1) {
            mensajeStock = '<p class="text-warning">¡Última unidad!</p>';
        } else if (producto.stock < 4) {
            mensajeStock = `<p class="text-warning">Solo quedan ${producto.stock} unidades</p>`;
        }

        if (producto.stock > 0) {
            botonAgregar = `<button type="button" class="btn btn-primary mt-auto" 
                            data-bs-toggle="tooltip" data-bs-placement="top" 
                            data-bs-custom-class="custom-tooltip" 
                            data-bs-title="Añadir al carrito" 
                            onclick="agregarAlCarrito(${producto.id})">Agregar</button>`;
        } else {
            botonAgregar = `<button type="button" class="btn btn-secondary mt-auto" disabled>Agotado</button>`;
        }

        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "20rem";

        card.innerHTML = `
            <img src="${producto.urlImagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                ${mensajeStock}
                <p class="card-text mt-auto fw-bold">
                    ${producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </p>
                ${botonAgregar}
            </div>`;
        contenedor.appendChild(card);
    });

    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

// Carrito de compras
const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado).map(item => new CarritoItem(item.id, item.nombre, item.precio, item.cantidad, item.stockDisponible));
        actualizarCarrito();
    }
};

const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);

    if (producto.stock <= 0) {
        alert('Este producto está agotado');
        return;
    }

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        if (itemExistente.cantidad >= producto.stock) {
            alert('No hay suficiente stock disponible');
            return;
        }
        itemExistente.cantidad += 1;
    } else {
        const nuevoItem = new CarritoItem(producto.id, producto.nombre, producto.precio, 1, producto.stock);
        carrito.push(nuevoItem);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
};

const actualizarCarrito = () => {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");

    if (listaCarrito && totalCarrito && contadorCarrito) {
        listaCarrito.innerHTML = "";
        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            cantidadTotal += Number(item.cantidad);

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre} (${item.cantidad})</td>
                <td>${subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="modificarCantidad(${index}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="modificarCantidad(${index}, 1)">+</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
                </td>
            `;
            listaCarrito.appendChild(tr);
        });

        totalCarrito.innerText = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
        contadorCarrito.innerText = cantidadTotal;
    }
};

const modificarCantidad = (index, cambio) => {
    const item = carrito[index];
    const producto = productos.find(p => p.id === item.id);

    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad < 1) {
        eliminarDelCarrito(index);
        return;
    }

    if (nuevaCantidad > producto.stock) {
        alert('No hay suficiente stock disponible');
        return;
    }

    item.cantidad = nuevaCantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
};

const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
};

const vaciarCarrito = () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
};

const comprarCarrito = () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    const sinStock = carrito.filter(item => {
        const producto = productos.find(p => p.id === item.id);
        return producto.stock < item.cantidad;
    });

    if (sinStock.length > 0) {
        const nombresSinStock = sinStock.map(item => item.nombre).join(", ");
        alert(`Los siguientes productos no tienen suficiente stock: ${nombresSinStock}`);
        return;
    }

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        producto.stock -= item.cantidad;

        if (producto.stock <= 0) {
            alert(`El producto ${producto.nombre} se ha agotado. Se notificará al responsable.`);
            console.log(`Correo enviado al responsable: Producto ${producto.nombre} agotado`);
        }
    });

    alert("¡Compra realizada con éxito! Stock actualizado.");
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    mostrarProductosSegunPagina();
};



/*const filtrarProductos = (criterios) => {
  const terminoBusqueda = criterios.textoLibre?.toLowerCase() || '';
  
  return productos.filter(producto => {
    // Filtro por texto libre (busca en nombre, descripción, categoría y etiqueta)
    const coincideTexto = !terminoBusqueda || 
      producto.nombre.toLowerCase().includes(terminoBusqueda) ||
      producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
      producto.categoria.toLowerCase().includes(terminoBusqueda) ||
      producto.etiqueta.toLowerCase().includes(terminoBusqueda);
    
    // Filtro por categoría
    const coincideCategoria = !criterios.categoria || 
      producto.categoria === criterios.categoria;
    
    // Filtro por precio
    const precioMin = criterios.precioMin || 0;
    const precioMax = criterios.precioMax || Infinity;
    const coincidePrecio = producto.precio >= precioMin && producto.precio <= precioMax;
    
    return coincideTexto && coincideCategoria && coincidePrecio;
  });
};*/

/*Ventajas de la Versión Mejorada
a. Lógica más Clara
La versión mejorada separa claramente cada condición de filtrado en variables descriptivas (coincideTexto, coincideCategoria, coincidePrecio).

Elimina la variable coincide que se iba modificando secuencialmente, lo que puede ser confuso.

b. Operadores Nullish y Valores por Defecto
Usa el operador ?. para manejar casos donde textoLibre podría ser null o undefined.

Establece valores por defecto (|| '' y || Infinity) que simplifican las comparaciones.

c. Evaluación Más Eficiente
La versión original evalúa todas las condiciones incluso cuando coincide ya es false.

La versión mejorada evalúa cada condición independientemente y las combina al final, lo que puede ser más eficiente en algunos casos.

d. Búsqueda en Más Campos
La versión mejorada busca el texto libre también en la categoría (además de nombre, descripción y etiqueta), lo que hace las búsquedas más completas.

e. Retorno Directo del Resultado
La versión mejorada retorna directamente el array filtrado, dejando la función mostrarProductos fuera, lo que sigue mejor el principio de responsabilidad única.

f. Manejo de Case Sensitivity Consistente
Todas las comparaciones de texto se hacen en minúsculas de manera consistente.

g. Mejor Manejo de Límites de Precio
Usa Infinity como valor por defecto para el precio máximo, lo que evita tener que hacer comprobaciones adicionales.*/



// Búsqueda y Filtrado de productos
const filtrarProductos = (criterios) => {
    const productosFiltrados = productos.filter(producto => {
        let coincide = true;

        // Filtro por Texto Libre (Nombre, Descripción, Etiqueta)
        if (criterios.textoLibre) {
            const termino = criterios.textoLibre.toLowerCase();
            coincide = coincide && (
                producto.nombre.toLowerCase().includes(termino) ||
                producto.descripcion.toLowerCase().includes(termino) ||
                (producto.etiqueta && producto.etiqueta.toLowerCase().includes(termino))
            );
        }

        // Filtro por Categoría
        if (criterios.categoria) {
            coincide = coincide && producto.categoria && producto.categoria.toLowerCase() === criterios.categoria.toLowerCase();
        }

        // Filtro por Precio
        if (criterios.precioMin) {
            coincide = coincide && producto.precio >= criterios.precioMin;
        }
        if (criterios.precioMax) {
            coincide = coincide && producto.precio <= criterios.precioMax;
        }

        return coincide;
    });

    mostrarProductos(productosFiltrados);
};

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarritoDesdeLocalStorage();

    // Obtener todos los elementos de filtro y el botón de búsqueda
    const filtroTextoLibre = document.getElementById("filtroTextoLibre");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const filtroPrecioMin = document.getElementById("filtroPrecioMin");
    const filtroPrecioMax = document.getElementById("filtroPrecioMax");
    const botonBuscar = document.getElementById("botonBuscar");

    // Crear una función que capture todos los valores de filtro
    const aplicarFiltros = () => {
        const criterios = {
            textoLibre: filtroTextoLibre.value,
            categoria: filtroCategoria.value,
            precioMin: filtroPrecioMin.value ? Number(filtroPrecioMin.value) : null,
            precioMax: filtroPrecioMax.value ? Number(filtroPrecioMax.value) : null
        };
        filtrarProductos(criterios);
    };

    // Añadir event listener al botón de búsqueda
    if (botonBuscar) {
        botonBuscar.addEventListener("click", aplicarFiltros);
    }

    // Opcional: También puedes mantener el filtrado en tiempo real para el texto libre
    if (filtroTextoLibre) {
        filtroTextoLibre.addEventListener("input", aplicarFiltros);
    }

    // Configurar botones del carrito
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    }

    const comprarCarritoBtn = document.getElementById("comprarCarrito");
    if (comprarCarritoBtn) {
        comprarCarritoBtn.addEventListener("click", comprarCarrito);
    }

    const btnCarrito = document.getElementById("btnCarrito");
    if (btnCarrito) {
        const offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
        btnCarrito.addEventListener("click", () => {
            offcanvascarrito.toggle();
        });
    }

    // Configurar formulario de contacto
    const formContacto = document.getElementById('formContacto');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            const campos = e.target.querySelectorAll('input, textarea');
            let camposVacios = false;

            campos.forEach(campo => {
                if (!campo.value.trim()) {
                    camposVacios = true;
                    campo.classList.add('error');
                } else {
                    campo.classList.remove('error');
                }
            });

            if (camposVacios) {
                alert('Por favor, complete todos los campos del formulario');
            } else {
                alert('Mensaje enviado exitosamente!');
                e.target.reset();
            }
        });
    }

    // Animación imagen quienes somos
    const image = document.querySelector('.hover-animate');
    if (image) {
        image.addEventListener('mouseenter', function () {
            this.classList.add('animate__animated', 'animate__pulse');
        });

        image.addEventListener('animationend', function () {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    }

    // Bienvenida
    const bienvenida = document.getElementById("bienvenida");
    if (bienvenida) {
        let user = localStorage.getItem("user") || prompt("Ingrese su nombre y apellido");
        bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
        if (user && !localStorage.getItem("user")) {
            localStorage.setItem("user", user);
        }
    }
});