
//json
const productos = [
    { id: 1, nombre: "Audífonos JBL", descripcion: "Audífonos Bluetooth, color azul", precio: 70000, urlImagen: "assets/img/Audif_01_D06621.png" },
    { id: 2, nombre: "Audífonos TWS", descripcion: "Audífono inalámbrico estéreo, color negro", precio: 50000, urlImagen: "assets/img/Audif_02_D08529.png" },
    { id: 3, nombre: "Audífinos BWOO", descripcion: "Audífonos alámbricos, color acero", precio: 25000, urlImagen: "assets/img/Audif_03_D04355.png" },
    { id: 4, nombre: "Teclado Klip", descripcion: "Teclado USB, color negro", precio: 15000, urlImagen: "assets/img/Tecl_01_D05411.png" },
    { id: 5, nombre: "Teclado Xtrike", descripcion: "Teclado gaming, retroiluminado", precio: 25000, urlImagen: "assets/img/Tecl_02_D04377.png" },
    { id: 6, nombre: "Teclado Vmax", descripcion: "Teclado Bluetooth, color negro ", precio: 35000, urlImagen: "assets/img/Tecl_03_D05751.png" },
    { id: 7, nombre: "Mouse Logitech", descripcion: "Mouse inalámbrico, color azul", precio: 15000, urlImagen: "assets/img/Mouse_01_D01625.png" },
    { id: 8, nombre: "Mouse Klip", descripcion: "Mouse Ambidiestro, color negro", precio: 18000, urlImagen: "assets/img/Mouse_02_D05972.png" },
    { id: 9, nombre: "Mouse Lenovo", descripcion: "Mouse gaming, RGB ", precio: 22000, urlImagen: "assets/img/Mouse_03_D08480.png" },
    { id: 10, nombre: "Parlante Mini", descripcion: "Parlante Bluetooth color negro", precio: 70000, urlImagen: "assets/img/Parlante_01_O15371.png" },
    { id: 11, nombre: "Parlante Xaomi", descripcion: "Parlante portátil, color azul", precio: 35000, urlImagen: "assets/img/Parlante_02_O12451-1.jpg" },
    { id: 12, nombre: "Parlante Bolt", descripcion: "Parlante portátil con luz", precio: 20000, urlImagen: "assets/img/Parlante_03_O23048.webp" },
];

let carrito = [];


/* CÓDIGO DESACTIVADO EN PÁGINA DE PRODUCTOS 
se pide el nombre del usuario 
const user = prompt("Ingrese su nombre.");
document.getElementById("bienvenida").innerHTML = `Bienvenido ${user} a nuestra tienda.`;

*/

//card
function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";
    lista.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col-md-4 col-sm-6 mb-4";
        card.style.width = "18rem";
        card.innerHTML = `
         <div class="card h-100 d-flex flex-column">
    <img src="${producto.urlImagen}" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body d-flex flex-column">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.descripcion}</p>
    <p class="card-text mt-auto fw-bold">
        ${producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
    </p>
            <a href="#" class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})" >Agregar</a>
    </div > `;
        contenedor.appendChild(card);
    });
}

mostrarProductos(productos);

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

const btnCarrito = document.getElementById("btnCarrito");
const offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
btnCarrito.addEventListener("click", () => {
    offcanvascarrito.toggle();
});