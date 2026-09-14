// Lista de productos predefinidos
const productos = [
    { id: 1, nombre: "Catan", precio: 500, imagen: "imagenes/catan.png" },
    { id: 2, nombre: "Carcassonne", precio: 900, imagen: "imagenes/carcassonne.png" },
    { id: 3, nombre: "Mando Xbox serie X", precio: 2500, imagen: "imagenes/mando xbox.png" },
    { id: 4, nombre: "Play Station 5", precio: 1200, imagen: "imagenes/play 5.png" },
    { id: 5, nombre: "Mouse Logitech G502", precio: 1500, imagen: "imagenes/mouse.png" },
    { id: 6, nombre: "Notebook ASUS ROG Strix", precio: 1000, imagen: "imagenes/notebook.png" },
    { id: 7, nombre: "Silla Gamer", precio: 3500, imagen: "imagenes/silla.png" },
    { id: 8, nombre: "Mouse Pad", precio: 800, imagen: "imagenes/mousepad.png" },
    { id: 9, nombre: "Auriculares Gamer", precio: 2700, imagen: "imagenes/audifonos hyper x.png" },
    { id: 10, nombre: "Nintendo Switch 2", precio: 2100, imagen: "imagenes/Nintendo-Switch-2-New-Gaming-Console.png" }
];
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart-list');
  
  // Mostrar productos
  function mostrarProductos() {
    productList.innerHTML = [];
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <strong class="stext">${producto.nombre}</strong>
            <p class="product-price">$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productList.appendChild(div);
    });
}

// Funciones del Carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
}

function disminuirCantidad(id) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(i => i.id !== id);
        }
        guardarCarrito();
        mostrarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    if (!cartList) return;
    cartList.innerHTML = '';

    if (carrito.length === 0) {
        cartList.innerHTML = '<p class="stext">El carrito está vacío.</p>';
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <strong class="stext">${item.nombre}</strong>
            <p class="stext">$${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}</p>
            <div class="cart-controls">
                <button onclick="agregarAlCarrito(${item.id})">+</button>
                <button onclick="disminuirCantidad(${item.id})">-</button>
                <button style="background:#e63946;" onclick="eliminarDelCarrito(${item.id})">✕</button>
            </div>
        `;
        cartList.appendChild(div);
    });

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    cartList.innerHTML += `<h3 class="ptext">Total: $${total}</h3>`;
  }
  
  // Inicializar
  mostrarProductos();
  mostrarCarrito();
  
