// Variable global para los productos
let productos = [];

// Cargar productos desde el JSON
const cargarProductos = async () => { // **Marcada como async para usar await**
    try {
        const response = await fetch('./productos.json'); 
        if (!response.ok) { 
            throw new Error('Error loading products!');
        }

        const { productos: productosCargados } = await response.json();
        productos = productosCargados;
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
}

// Función para mostrar productos
const mostrarProductos = (listaProductos) => {
    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";

    listaProductos.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "20rem";
        
        // Control de stock
        let botonAgregar = '';
        let mensajeStock = '';
        
        if (producto.stock <= 0) {
            mensajeStock = '<p class="text-danger">Agotado</p>';
        } else if (producto.stock === 1) {
            mensajeStock = '<p class="text-warning">¡Última unidad!</p>';
        } else if (producto.stock < 4) {
            mensajeStock = '<p class="text-warning">Solo quedan ${producto.stock} unidades</p>';
        }
        
        if (producto.stock > 0) {
            botonAgregar = `
                <button type="button" class="btn btn-primary mt-auto"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Añadir al carrito"
                onclick="agregarAlCarrito(${producto.id})">Agregar</button>`;
        } else {
            botonAgregar = `<button type="button" class="btn btn-secondary mt-auto" disabled>Agotado</button>`;
        }

        const { urlImagen, nombre, descripcion, precio } = producto;

        card.innerHTML = `
            <img src="${urlImagen}" class="card-img-top" alt="${nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
                ${mensajeStock}
                <p class="card-text mt-auto fw-bold">
                    ${precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </p>
                ${botonAgregar}
            </div>`;
        contenedor.appendChild(card);
    });

    // Inicializar tooltips
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Carrito de compras
let carrito = [];

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

const agregarAlCarrito = (id)  => {
    const producto = productos.find(p => p.id === id);
    
    if (producto.stock <= 0) {
        alert('Este producto está agotado');
        return;
    }
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        if (itemExistente.cantidad >= producto.stock) {
            alert('No hay suficiente stock disponible');
            return;
        }
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            stockDisponible: producto.stock
        });
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

const actualizarCarrito = () => {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");

    if (listaCarrito && totalCarrito && contadorCarrito) {
        listaCarrito.innerHTML = "";
        var total = 0;
        var cantidadTotal = 0;

        carrito.forEach((item, index) => {
            const subtotal = Number(item.precio) * Number(item.cantidad);
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
}

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
}

const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

const vaciarCarrito = () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

const comprarCarrito = () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        return;
    }
    
    // Verificar stock antes de comprar
    const sinStock = [];
    
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto.stock < item.cantidad) {
            sinStock.push(item.nombre);
        }
    });
    
    if (sinStock.length > 0) {
        alert(`Los siguientes productos no tienen suficiente stock: ${sinStock.join(", ")}`);
        return;
    }
    
    // Actualizar stock
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        producto.stock -= item.cantidad;
        
        // Notificar si el producto quedó sin stock
        if (producto.stock <= 0) {
            alert(`El producto ${producto.nombre} se ha agotado. Se notificará al responsable.`);
            // Simular envío de correo
            console.log(`Correo enviado al responsable: Producto ${producto.nombre} agotado`);
        }
    });
    
    // Guardar cambios en productos (simulado, en un caso real haríamos una petición al servidor)
    alert("¡Compra realizada con éxito! Stock actualizado.");
    
    // Vaciar carrito
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    
    // Recargar productos para mostrar nuevos stocks
    mostrarProductosSegunPagina();
}

// Búsqueda de productos
const filtroProductos = document.getElementById("filtroProductos");
if (filtroProductos) {
    filtroProductos.addEventListener("input", (e) => {
        const termino = e.target.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(termino) || 
            producto.descripcion.toLowerCase().includes(termino)
        );
        mostrarProductos(productosFiltrados);
    });
}

// Inicialización
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
        var offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
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
                alert('Mensaje enviado exitosamente! 📨');
                e.target.reset();
            }
        });
    }
    
    // Animación imagen quienes somos
    const image = document.querySelector('.hover-animate');
    if (image) {
        image.addEventListener('mouseenter', () => {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        image.addEventListener('animationend', () => {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    }
    
    // Bienvenida
    const bienvenida = document.getElementById("bienvenida");
    if (bienvenida) {
        let user = localStorage.getItem("user");
        if (user) {
            bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
        } else {
            user = prompt("Ingrese su nombre y apellido");
            bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
            localStorage.setItem("user", user);
        }
    }
});