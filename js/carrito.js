const firebaseConfig = {
    apiKey: "AIzaSyBOwh38pY_Fum4N5Mb86EBG8sJppzZvQRo",
    authDomain: "bloc-videojuegos-825d7.firebaseapp.com",
    projectId: "bloc-videojuegos-825d7",
    storageBucket: "bloc-videojuegos-825d7.firebasestorage.app",
    messagingSenderId: "1022480906907",
    appId: "1:1022480906907:web:a3f3aa87645fe81953643e"
};

// INICIAR FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let itemsAdded = [];

// AGREGAR PRODUCTO
const agregarProducto = async (nombre, precio, imgSrc) => {
    try {
        await db.collection("carrito").add({ nombre, precio, imgSrc });
        await cargarCarrito();
    } catch (error) {
        console.error("Error al agregar el producto", error);
    }
};

// CARGAR CARRITO
const cargarCarrito = async () => {
    const lista = document.querySelector('.cart-content');
    lista.innerHTML = "";
    itemsAdded = [];

    let total = 0;
    const productos = await db.collection("carrito").get();

    productos.forEach(doc => {
        const item = doc.data();
        total += item.precio;

        const div = document.createElement("div");
        div.classList.add("cart-box");
        div.innerHTML = `
            <img src="${item.imgSrc || ''}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${item.nombre}</div>
                <div class="cart-price">$${item.precio}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="bx bxs-trash-alt cart-remove"></i>
        `;

        div.querySelector(".cart-remove").addEventListener("click", async () => {
            try {
                await db.collection("carrito").doc(doc.id).delete();
                await cargarCarrito();
            } catch (error) {
                console.error("No se puede eliminar", error);
            }
        });

        lista.appendChild(div);
        itemsAdded.push({ title: item.nombre, price: item.precio });
    });

    const totalCompra = document.querySelector('.total-price');
    totalCompra.textContent = "$" + total.toFixed(2);
};

// BOTONES DE PRODUCTOS
const botonesAgregar = document.querySelectorAll(".add-cart");
botonesAgregar.forEach(btn => {
    btn.addEventListener("click", async () => {
        const producto = btn.parentElement;
        const nombre = producto.querySelector(".product-title").textContent;
        const precioTexto = producto.querySelector(".product-price").textContent;
        const precio = parseFloat(precioTexto.replace("$", "").replace(",", ""));
        const imgSrc = producto.querySelector(".product-img").src;

        if (itemsAdded.find(el => el.title === nombre)) {
            alert("Este artículo ya está en el carrito");
            return;
        }

        await agregarProducto(nombre, precio, imgSrc);
        btn.disabled = true;
        btn.textContent = "Agregado";
    });
});

// CAMBIAR CANTIDAD
const cambiarCantidad = () => {
    const cantidades = document.querySelectorAll(".cart-quantity");
    cantidades.forEach(input => {
        input.addEventListener("change", () => {
            if (isNaN(input.value) || input.value < 1) {
                input.value = 1;
            }
            input.value = Math.floor(input.value);
            actualizarTotal();
        });
    });
};

// ACTUALIZAR TOTAL
const actualizarTotal = () => {
    const cajas = document.querySelectorAll(".cart-box");
    let total = 0;

    cajas.forEach(caja => {
        const precio = parseFloat(caja.querySelector(".cart-price").textContent.replace("$", ""));
        const cantidad = parseInt(caja.querySelector(".cart-quantity").value);
        total += precio * cantidad;
    });

    const totalCompra = document.querySelector(".total-price");
    totalCompra.textContent = "$" + total.toFixed(2);
};

// COMPRAR
const botonComprar = document.querySelector(".btn-buy");
botonComprar.addEventListener("click", async () => {
    if (itemsAdded.length === 0) {
        alert("¡El carrito está vacío!");
        return;
    }

    try {
        const snapshot = await db.collection("carrito").get();
        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        document.querySelector(".cart-content").innerHTML = "";
        alert("¡Gracias por su compra!");
        itemsAdded = [];
        actualizarTotal();
    } catch (error) {
        console.error("Error al finalizar la compra", error);
        alert("Hubo un problema al finalizar la compra.");
    }
});

// MOSTRAR Y OCULTAR CARRITO
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector("#cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.toggle("active"));
closeCart.addEventListener("click", () => cart.classList.remove("active"));

// INICIAR
window.onload = () => {
    cargarCarrito();
};