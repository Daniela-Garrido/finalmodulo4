// Clase para manejar los productos en el admin
class AdminProductos {
    constructor() {
        this.productos = [];
        this.cargarProductos();
        this.initEventListeners();
        this.mostrarProductos();
    }

    cargarProductos() {
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            this.productos = JSON.parse(productosGuardados);
        } else {
            // Cargar desde el JSON si no hay en localStorage
            fetch('./productos.json')
                .then(response => response.json())
                .then(data => {
                    this.productos = data.productos;
                    this.guardarProductos();
                    this.mostrarProductos();
                })
                .catch(error => console.error('Error al cargar productos:', error));
        }
    }

    guardarProductos() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }

    initEventListeners() {
        // Botón nuevo producto
        document.getElementById('btnNuevoProducto').addEventListener('click', () => {
            this.mostrarModal();
        });

        // Botón guardar producto
        document.getElementById('btnGuardarProducto').addEventListener('click', () => {
            this.guardarProducto();
        });
    }

    mostrarModal(producto = null) {
        const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
        const form = document.getElementById('formProducto');

        if (producto) {
            document.getElementById('modalTitulo').textContent = 'Editar Producto';
            document.getElementById('productoId').value = producto.id;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('urlImagen').value = producto.urlImagen;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('categoria').value = producto.categoria;
            document.getElementById('etiqueta').value = producto.etiqueta;
        } else {
            document.getElementById('modalTitulo').textContent = 'Nuevo Producto';
            form.reset();
            document.getElementById('productoId').value = '';
        }

        modal.show();
    }

    guardarProducto() {
        const form = document.getElementById('formProducto');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const id = document.getElementById('productoId').value;
        const productoData = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: Number(document.getElementById('precio').value),
            urlImagen: document.getElementById('urlImagen').value,
            stock: Number(document.getElementById('stock').value),
            categoria: document.getElementById('categoria').value,
            etiqueta: document.getElementById('etiqueta').value
        };

        if (id) {
            // Editar producto existente
            const index = this.productos.findIndex(p => p.id === Number(id));
            if (index !== -1) {
                this.productos[index] = { ...this.productos[index], ...productoData };
            }
        } else {
            // Crear nuevo producto
            const nuevoId = this.productos.length > 0
                ? Math.max(...this.productos.map(p => p.id)) + 1
                : 1;
            this.productos.push({ id: nuevoId, ...productoData });
        }

        this.guardarProductos();
        this.mostrarProductos();
        bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
    }

    editarProducto(id) {
        const producto = this.productos.find(p => p.id === id);
        if (producto) {
            this.mostrarModal(producto);
        }
    }

    eliminarProducto(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            this.productos = this.productos.filter(p => p.id !== id);
            this.guardarProductos();
            this.mostrarProductos();
        }
    }

    mostrarProductos() {
        const tabla = document.getElementById('tabla-productos');
        if (!tabla) return;

        tabla.innerHTML = this.productos.map(producto => `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
        <td>${producto.categoria}</td>
        <td>${producto.etiqueta}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="admin.editarProducto(${producto.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="admin.eliminarProducto(${producto.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
    }
}

// Inicializar la administración
const admin = new AdminProductos();