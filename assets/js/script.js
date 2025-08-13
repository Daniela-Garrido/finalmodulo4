// Variable global para los productos
var productos = [];

// Cargar productos desde el JSON
function cargarProductos() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './productos.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    productos = data.productos;
                    mostrarProductosSegunPagina();
                } catch (e) {
                    console.error('Error parsing JSON!', e);
                }
            } else {
                console.error('Error loading products!');
            }
        }
    };
    xhr.send();
}

// Mostrar productos según la página
function mostrarProductosSegunPagina() {
    var contenedor = document.getElementById("productos-contenedor");
    if (contenedor) {
        if (window.location.pathname.includes("index.html")) {
            mostrarProductos(productos.slice(0, 6));
        } else if (window.location.pathname.includes("products.html")) {
            mostrarProductos(productos);
        }
    }
}

// Función para mostrar productos
function mostrarProductos(listaProductos) {
    var contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";

    listaProductos.forEach(function(producto) {
        var card = document.createElement("div");
        card.className = "card";
        card.style.width = "20rem";
        
        // Control de stock
        var botonAgregar = '';
        var mensajeStock = '';
        
        if (producto.stock <= 0) {
            mensajeStock = '<p class="text-danger">Agotado</p>';
        } else if (producto.stock === 1) {
            mensajeStock = '<p class="text-warning">¡Última unidad!</p>';
        } else if (producto.stock < 4) {
            mensajeStock = '<p class="text-warning">Solo quedan ' + producto.stock + ' unidades</p>';
        }
        
        if (producto.stock > 0) {
            botonAgregar = '<button type="button" class="btn btn-primary mt-auto" ' +
                'data-bs-toggle="tooltip" data-bs-placement="top" ' +
                'data-bs-custom-class="custom-tooltip" ' +
                'data-bs-title="Añadir al carrito" ' +
                'onclick="agregarAlCarrito(' + producto.id + ')">Agregar</button>';
        } else {
            botonAgregar = '<button type="button" class="btn btn-secondary mt-auto" disabled>Agotado</button>';
        }

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
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Carrito de compras
var carrito = [];

function cargarCarritoDesdeLocalStorage() {
    var carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function agregarAlCarrito(id) {
    var producto = productos.find(function(p) { return p.id === id; });
    
    if (producto.stock <= 0) {
        alert('Este producto está agotado');
        return;
    }
    
    // Verificar si el producto ya está en el carrito
    var itemExistente = carrito.find(function(item) { return item.id === id; });
    
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

function actualizarCarrito() {
    var listaCarrito = document.getElementById("listaCarrito");
    var totalCarrito = document.getElementById("totalCarrito");
    var contadorCarrito = document.getElementById("contadorCarrito");

    if (listaCarrito && totalCarrito && contadorCarrito) {
        listaCarrito.innerHTML = "";
        var total = 0;
        var cantidadTotal = 0;

        carrito.forEach(function(item, index) {
            var subtotal = item.precio * item.cantidad;
            total += subtotal;
            cantidadTotal += item.cantidad;

            var tr = document.createElement("tr");
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

function modificarCantidad(index, cambio) {
    var item = carrito[index];
    var producto = productos.find(function(p) { return p.id === item.id; });
    
    var nuevaCantidad = item.cantidad + cambio;
    
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

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

function comprarCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        return;
    }
    
    // Verificar stock antes de comprar
    var sinStock = [];
    
    carrito.forEach(function(item) {
        var producto = productos.find(function(p) { return p.id === item.id; });
        if (producto.stock < item.cantidad) {
            sinStock.push(item.nombre);
        }
    });
    
    if (sinStock.length > 0) {
        alert("Los siguientes productos no tienen suficiente stock: " + sinStock.join(", "));
        return;
    }
    
    // Actualizar stock
    carrito.forEach(function(item) {
        var producto = productos.find(function(p) { return p.id === item.id; });
        producto.stock -= item.cantidad;
        
        // Notificar si el producto quedó sin stock
        if (producto.stock <= 0) {
            alert('El producto ' + producto.nombre + ' se ha agotado. Se notificará al responsable.');
            // Simular envío de correo
            console.log('Correo enviado al responsable: Producto ' + producto.nombre + ' agotado');
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
var filtroProductos = document.getElementById("filtroProductos");
if (filtroProductos) {
    filtroProductos.addEventListener("input", function(e) {
        var termino = e.target.value.toLowerCase();
        var productosFiltrados = productos.filter(function(producto) {
            return producto.nombre.toLowerCase().includes(termino) || 
                   producto.descripcion.toLowerCase().includes(termino);
        });
        mostrarProductos(productosFiltrados);
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", function() {
    cargarProductos();
    cargarCarritoDesdeLocalStorage();
    
    // Configurar botones del carrito
    var vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    }
    
    var comprarCarritoBtn = document.getElementById("comprarCarrito");
    if (comprarCarritoBtn) {
        comprarCarritoBtn.addEventListener("click", comprarCarrito);
    }
    
    var btnCarrito = document.getElementById("btnCarrito");
    if (btnCarrito) {
        var offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
        btnCarrito.addEventListener("click", function() {
            offcanvascarrito.toggle();
        });
    }
    
    // Configurar formulario de contacto
    var formContacto = document.getElementById('formContacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            var campos = e.target.querySelectorAll('input, textarea');
            var camposVacios = false;
            
            campos.forEach(function(campo) {
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
    var image = document.querySelector('.hover-animate');
    if (image) {
        image.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        image.addEventListener('animationend', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    }
    
    // Bienvenida
    var bienvenida = document.getElementById("bienvenida");
    if (bienvenida) {
        if (localStorage.getItem("user")) {
            var user = localStorage.getItem("user");
            bienvenida.innerHTML = "Bienvenido " + user + " a nuestra tienda digital.";
        } else {
            var user = prompt("Ingrese su nombre y apellido");
            bienvenida.innerHTML = "Bienvenido " + user + " a nuestra tienda digital.";
            localStorage.setItem("user", user);
        }
    }
});