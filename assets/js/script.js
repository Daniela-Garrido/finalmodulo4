
//json
const productos = [
    { id: 1, nombre: "mouse", descripcion: "mouse inalambrico color negro", precio: 25000, urlImagen: "https://www.jbl.cl/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc6f7b67c/01.JBL_Tune%20520BT_Product%20Image_Hero_Purple.png?sw=537&sfrm=png" },
    { id: 2, nombre: "tv", descripcion: "mouse inalambrico color negro", precio: 100000, urlImagen: "https://www.jbl.cl/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc6f7b67c/01.JBL_Tune%20520BT_Product%20Image_Hero_Purple.png?sw=537&sfrm=png" },
    { id: 3, nombre: "audifonos", descripcion: "mouse inalambrico color negro", precio: 39000, urlImagen: "https://www.jbl.cl/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc6f7b67c/01.JBL_Tune%20520BT_Product%20Image_Hero_Purple.png?sw=537&sfrm=png" },
    { id: 4, nombre: "audifonos", descripcion: "mouse inalambrico color negro", precio: 39000, urlImagen: "https://www.jbl.cl/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc6f7b67c/01.JBL_Tune%20520BT_Product%20Image_Hero_Purple.png?sw=537&sfrm=png" },
    { id: 5, nombre: "audifonos", descripcion: "mouse inalambrico color negro", precio: 39000, urlImagen: "https://www.jbl.cl/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc6f7b67c/01.JBL_Tune%20520BT_Product%20Image_Hero_Purple.png?sw=537&sfrm=png" },
    { id: 6, nombre: "audifonos", descripcion: "mouse inalambrico color negro", precio: 39000, urlImagen: "https://www.jbl.cl/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwc6f7b67c/01.JBL_Tune%20520BT_Product%20Image_Hero_Purple.png?sw=537&sfrm=png" },
];

let carrito = [];


//se pide el nombre del usuario 
const user = prompt("Ingrese su nombre.");
document.getElementById("bienvenida").innerHTML = `Bienvenido ${user} a nuestra tienda.`;


//card
function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";
    lista.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card m-2";
        card.style.width = "18rem";
        card.innerHTML = `
    <img src="${producto.urlImagen}" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">${producto.descripcion}</p>
    <p class="card-text">${producto.precio}</p>
    <a href="#" class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})" >Agregar</a>
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

const btnCarrito = document.getElementById("btnCarrito");
const offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
btnCarrito.addEventListener("click", () => {
    offcanvascarrito.toggle();
});