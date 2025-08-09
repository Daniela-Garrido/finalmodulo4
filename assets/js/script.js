
//json
const productos = [
    { id: 1, nombre: "Mouse", descripcion: "Mouse inalambrico con bateria de color negro", precio: 15000, urlImagen: "./assets/img/img1.png" },
    { id: 2, nombre: "Teclado", descripcion: "Teclado mecánico, inalambrico con luces RGB", precio: 25000, urlImagen: "./assets/img/img2.png" },
    { id: 3, nombre: "Monitor", descripcion: "Monitor 4K 27 pulgadas", precio: 12000, urlImagen: "./assets/img/img3.png" },
    { id: 4, nombre: "Auriculares", descripcion: "Auriculares inalambricos con cancelación de ruido", precio: 20000, urlImagen: "./assets/img/img4.png" },
    { id: 5, nombre: "Mouse", descripcion: "Mouse inalambrico con bateria de color negro", precio: 20000, urlImagen: "./assets/img/img1.png" },
    { id: 6, nombre: "Teclado", descripcion: "Teclado mecánico, inalambrico con luces RGB", precio: 30000, urlImagen: "./assets/img/img2.png" },
    { id: 7, nombre: "Monitor", descripcion: "Monitor 4K 27 pulgadas", precio: 12000, urlImagen: "./assets/img/img3.png" },
    { id: 8, nombre: "Auriculares", descripcion: "Auriculares inalambricos con cancelación de ruido", precio: 45000, urlImagen: "./assets/img/img4.png" },
    { id: 9, nombre: "Audífonos JBL", descripcion: "Audífonos Bluetooth, color azul", precio: 70000, urlImagen: "assets/img/Audif_01_D06621.png" },
    { id: 10, nombre: "Audífonos TWS", descripcion: "Audífono inalámbrico estéreo, color negro", precio: 50000, urlImagen: "assets/img/Audif_02_D08529.png" },
    { id: 11, nombre: "Audífonos BWOO", descripcion: "Audífonos alámbricos, color acero", precio: 25000, urlImagen: "assets/img/Audif_03_D04355.png" },
    { id: 12, nombre: "Teclado Klip", descripcion: "Teclado USB, color negro", precio: 15000, urlImagen: "assets/img/Tecl_01_D05411.png" },
    { id: 13, nombre: "Teclado Xtrike", descripcion: "Teclado gaming, retroiluminado", precio: 25000, urlImagen: "assets/img/Tecl_02_D04377.png" },
    { id: 14, nombre: "Teclado Vmax", descripcion: "Teclado Bluetooth, color negro ", precio: 35000, urlImagen: "assets/img/Tecl_03_D05751.png" },
    { id: 15, nombre: "Mouse Logitech", descripcion: "Mouse inalámbrico, color azul", precio: 15000, urlImagen: "assets/img/Mouse_01_D01625.png" },
];

let carrito = [];

//se pide el nombre del usuario 
//guardado en localStorage

const bienvenida = document.getElementById("bienvenida");
if (bienvenida) {
    if (localStorage.getItem("user")) {
        const user = localStorage.getItem("user");
        bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
    }
    else {
        const user = prompt("Ingrese su nombre y apellido");
        bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
        localStorage.setItem("user", user);
    }
}

// Modifica la función mostrarProductos para aceptar un límite
function mostrarProductos(lista, limite = null) {
    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";

    // Aplicar límite si se especifica
    const productosAMostrar = limite ? lista.slice(0, limite) : lista;

    productosAMostrar.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "20rem";
        card.innerHTML = `
        <img src="${producto.urlImagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
           <p class="card-text mt-auto fw-bold">
            ${producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </p>
            <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        </div>`;
        contenedor.appendChild(card);
    });
}

// Llamada inicial - esto se ejecutará en ambas páginas
if (document.getElementById("productos-contenedor")) {
    // En index.html mostraremos solo 6 productos
    if (window.location.pathname.includes("index.html")) {
        mostrarProductos(productos, 6);
    }
    // En products.html mostraremos todos los productos
    else if (window.location.pathname.includes("products.html")) {
        mostrarProductos(productos);
    }
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");
    if (listaCarrito && totalCarrito && contadorCarrito) {
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach((item, index) => {
            total += item.precio;
            const li = document.createElement("li");
            li.className = "list-group-item border-bottom border-2 p-2 d-flex justify-content-between m-3 align-items-center";
            li.innerHTML = `
                <span>${item.nombre} - $<span>${item.precio.toLocaleString()}</span></span>
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>`;
            listaCarrito.appendChild(li);
        });
        totalCarrito.innerText = `$${total.toLocaleString()}`;
        contadorCarrito.innerText = carrito.length;
    }
}

//busqueda en pagina de productos 
const filtroProductos = document.getElementById("filtroProductos");
if (filtroProductos){
    filtroProductos.addEventListener("input", (e) =>{
        const productosFiltrados = productos.filter(producto =>{
            return producto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        });
        mostrarProductos(productosFiltrados);
    })
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });
}

const btnCarrito = document.getElementById("btnCarrito");
if (btnCarrito) {
    const offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
    btnCarrito.addEventListener("click", () => {
        offcanvascarrito.toggle();
    });
}

cargarCarritoDesdeLocalStorage();