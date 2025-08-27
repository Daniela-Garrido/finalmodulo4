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
        this.categoria = categoria;
        this.etiqueta = etiqueta;
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

// Cargar productos desde la API y usar localStorage como respaldo
const cargarProductos = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/productos');
        
        if (!response.ok) {
            throw new Error('La API no respondió correctamente.');
        }

        const data = await response.json();
        
        productos = data.map(p => new Producto(
            p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.stock, p.categoria, p.etiqueta
        ));

        localStorage.setItem('productos', JSON.stringify(productos));
        
        console.log('Productos cargados con éxito desde la API.');

    } catch (error) {
        console.error('Error al cargar productos desde la API:', error);
        
        console.log('Intentando cargar productos desde el almacenamiento local...');
        const productosEnLocalStorage = localStorage.getItem('productos');

        if (productosEnLocalStorage) {
            productos = JSON.parse(productosEnLocalStorage).map(p => new Producto(
                p.id, p.nombre, p.descripcion, p.precio, p.urlImagen, p.stock, p.categoria, p.etiqueta
            ));
            console.log('Productos cargados desde el almacenamiento local.');
        } else {
            console.warn('No hay productos disponibles ni en la API ni en el almacenamiento local.');
            const contenedor = document.getElementById("productos-contenedor");
            if (contenedor) {
                contenedor.innerHTML = '<p class="text-danger text-center mt-5">No se pudieron cargar los productos. Por favor, intente más tarde.</p>';
            }
        }
    }
    
    mostrarProductosSegunPagina();
};

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarritoDesdeLocalStorage();
    
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

    // Configurar filtro y búsqueda
    const filtroTextoLibre = document.getElementById("filtroTextoLibre");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const filtroPrecioMin = document.getElementById("filtroPrecioMin");
    const filtroPrecioMax = document.getElementById("filtroPrecioMax");
    const botonBuscar = document.getElementById("botonBuscar");

    const aplicarFiltros = () => {
        const criterios = {
            textoLibre: filtroTextoLibre.value,
            categoria: filtroCategoria.value,
            precioMin: filtroPrecioMin.value ? Number(filtroPrecioMin.value) : null,
            precioMax: filtroPrecioMax.value ? Number(filtroPrecioMax.value) : null
        };
        const productosFiltrados = filtrarProductos(criterios);
        mostrarProductos(productosFiltrados);
    };

    if (botonBuscar) {
        botonBuscar.addEventListener("click", aplicarFiltros);
    }

    if (filtroTextoLibre) {
        filtroTextoLibre.addEventListener("input", aplicarFiltros);
    }
});

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

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado).map(item => new CarritoItem(item.id, item.nombre, item.precio, item.cantidad, item.stockDisponible));
        actualizarCarrito();
    }
};

const agregarAlCarrito = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    if (producto.stock <= 0) {
        alert("¡Este producto está agotado!");
        return;
    }

    const itemExistente = carrito.find(item => item.id === productoId);
    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad++;
        } else {
            alert(`No hay más stock disponible para ${producto.nombre}.`);
            return;
        }
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

// Se corrige esta función para que sea asíncrona y use la API
const comprarCarrito = async () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    try {
        const promesasActualizacion = carrito.map(item => {
            const producto = productos.find(p => p.id === item.id);
            if (!producto || producto.stock < item.cantidad) {
                throw new Error(`No hay suficiente stock para el producto: ${item.nombre}.`);
            }
            // Enviar la petición PATCH al servidor para cada producto
            return fetch(`http://localhost:3000/api/productos/${item.id}/stock`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cantidad: -item.cantidad })
            });
        });

        // Esperar a que todas las peticiones se completen
        const respuestas = await Promise.all(promesasActualizacion);

        for (const res of respuestas) {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al actualizar el stock en el servidor.');
            }
        }

        alert("¡Compra realizada con éxito! Stock actualizado en el servidor.");
        
        // Vaciar el carrito después de una compra exitosa
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
        
        // Volver a cargar los productos desde el servidor para reflejar los cambios
        await cargarProductos();
        
    } catch (error) {
        console.error('Error durante la compra:', error);
        alert(error.message);
    }
};

// Se corrige esta función para que use la API y maneje errores
const actualizarStockEnServidor = async (productoId, cantidadComprada) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto || producto.stock < cantidadComprada) {
        throw new Error(`No hay suficiente stock para el producto: ${producto.nombre}.`);
    }

    try {
        const response = await fetch(`http://localhost:3000/api/productos/${productoId}/stock`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cantidad: -cantidadComprada })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el stock');
        }

        const productoActualizado = await response.json();
        const index = productos.findIndex(p => p.id === productoActualizado.id);
        if (index !== -1) {
            productos[index].stock = productoActualizado.stock;
        }
        
        if (productoActualizado.stock <= 0) {
            await notificarResponsable(productoActualizado.nombre);
        }

        return productoActualizado;
        
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        throw error;
    }
};

const notificarResponsable = async (nombreProducto) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Simulando envío de correo: Notificando al responsable que el producto "${nombreProducto}" se ha quedado sin stock.`);
            resolve();
        }, 1000);
    });
};

const filtrarProductos = (criterios) => {
    const terminoBusqueda = criterios.textoLibre?.toLowerCase() || '';
  
    return productos.filter(producto => {
        const coincideTexto = !terminoBusqueda || 
            producto.nombre.toLowerCase().includes(terminoBusqueda) ||
            producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
            producto.categoria.toLowerCase().includes(terminoBusqueda) ||
            producto.etiqueta.toLowerCase().includes(terminoBusqueda);
    
        const coincideCategoria = !criterios.categoria || 
            producto.categoria === criterios.categoria;
    
        const precioMin = criterios.precioMin || 0;
        const precioMax = criterios.precioMax || Infinity;
        const coincidePrecio = producto.precio >= precioMin && producto.precio <= precioMax;
    
        return coincideTexto && coincideCategoria && coincidePrecio;
    });
};