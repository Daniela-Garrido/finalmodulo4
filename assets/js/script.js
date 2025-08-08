
//json
const productos = [
    { id: 1, nombre: "Mouse", descripcion: "Mouse inalambrico con bateria de color negro", precio: 1500, urlImagen: "./assets/img/img1.png" },
    { id: 2, nombre: "Teclado", descripcion: "Teclado mecánico, inalambrico con luces RGB", precio: 3000, urlImagen: "./assets/img/img2.png" },
    { id: 3, nombre: "Monitor", descripcion: "Monitor 4K 27 pulgadas", precio: 12000, urlImagen: "./assets/img/img3.png" },
    { id: 4, nombre: "Auriculares", descripcion: "Auriculares inalambricos con cancelación de ruido", precio: 4500, urlImagen: "./assets/img/img4.png" },
    { id: 5, nombre: "Mouse", descripcion: "Mouse inalambrico con bateria de color negro", precio: 1500, urlImagen: "./assets/img/img1.png" },
    { id: 6, nombre: "Teclado", descripcion: "Teclado mecánico, inalambrico con luces RGB", precio: 3000, urlImagen: "./assets/img/img2.png" },
    { id: 7, nombre: "Monitor", descripcion: "Monitor 4K 27 pulgadas", precio: 12000, urlImagen: "./assets/img/img3.png" },
    { id: 8, nombre: "Auriculares", descripcion: "Auriculares inalambricos con cancelación de ruido", precio: 4500, urlImagen: "./assets/img/img4.png" },
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
        const user = prompt("Ingrese su nombre");
        bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
        localStorage.setItem("user", user);
    }
}

//card
function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";
    lista.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "20rem";
        card.innerHTML = `
        <img src="${producto.urlImagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        </div>`;
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

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement("li");
        li.className = "list-group-item border-bottom border-2 p-2 d-flex justify-content-between m-3 align-items-center";
        li.innerHTML = `
            <span>${item.nombre} - $<span>${item.precio}</span></span>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>`;
        listaCarrito.appendChild(li);
    });
    totalCarrito.innerText = total;
    document.getElementById("contadorCarrito").innerText = carrito.length;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
});


const btnCarrito = document.getElementById("btnCarrito");
const offcanvasCarrito = new bootstrap.Offcanvas(document.getElementById('offcanvasCarrito'));
btnCarrito.addEventListener("click", () => {
    offcanvasCarrito.toggle();
});