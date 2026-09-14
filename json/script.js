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

// Mostrar productos en el catálogo
function mostrarProductos() {
    if (!productList) return;
    productList.innerHTML = '';
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
    cartList.innerHTML += `<h3 class="stext" style="margin-top: 1rem; color: var(--accent-color);">Total: $${total}</h3>`;
}

// --- Funciones de Validación, Descuento y Usuarios (Agregadas en EV1) ---

function validar() {
    const edadInput = document.getElementById("edad") ? document.getElementById("edad").value : null;
    if (!edadInput || Number(edadInput) < 18) {
        alert("ERROR: Debe ser mayor de 18 años");
        return false;
    }
    return true;
}

function descuento(precio) {
    const correoElem = document.getElementById("correo");
    if (!correoElem) return precio;
    
    const correo = correoElem.value;
    if (correo.includes("@duocuc.cl")) {
        return precio * 0.80; // 20% de descuento
    }
    return precio;
}

function registro() {
    const nombre = document.getElementById("nombre") ? document.getElementById("nombre").value : "";
    const correo = document.getElementById("correo") ? document.getElementById("correo").value : "";
    const pass1 = document.getElementById("contraseña") ? document.getElementById("contraseña").value : "";
    const pass2 = document.getElementById("contraseña2") ? document.getElementById("contraseña2").value : "";

    if (pass1 !== pass2 || !pass1) {
        alert("ERROR: Las contraseñas no coinciden");
        return;
    }

    console.log("Usuario registrado");
    localStorage.setItem("nombre", JSON.stringify(nombre));
    localStorage.setItem("correo", JSON.stringify(correo));
    localStorage.setItem("contraseña", JSON.stringify(pass1));
}

function login() {
    const correo = document.getElementById("correo") ? document.getElementById("correo").value : "";
    const pass1 = document.getElementById("contraseña") ? document.getElementById("contraseña").value : "";
    
    const correoGuardado = JSON.parse(localStorage.getItem("correo"));
    const passGuardada = JSON.parse(localStorage.getItem("contraseña"));

    if (correo === correoGuardado && pass1 === passGuardada) {
        console.log("Login exitoso");
    } else {
        alert("Credenciales incorrectas");
    }
}

// Inicializar la interfaz al cargar
mostrarProductos();
mostrarCarrito();