const firebaseConfig = {
    apiKey: "AIzaSyBOwh38pY_Fum4N5Mb86EBG8sJppzZvQRo",
    authDomain: "bloc-videojuegos-825d7.firebaseapp.com",
    projectId: "bloc-videojuegos-825d7",
    storageBucket: "bloc-videojuegos-825d7.firebasestorage.app",
    messagingSenderId: "1022480906907",
    appId: "1:1022480906907:web:a3f3aa87645fe81953643e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para guardar producto en Firebase
async function guardarProductoEnFirebase(nombre, precio) {
    try {
        await db.collection("carrito").add({ nombre, precio });
        console.log("Producto guardado en Firebase:", nombre, precio);
    } catch (error) {
        console.error("Error al guardar en Firebase:", error);
    }
}

// ABRIR Y CERRAR CARRITO
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector("#cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// INICIAR CUANDO EL DOCUMENTO ESTÉ LISTO
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}

function start() {
    addEvents();
}

function update() {
    addEvents();
    updateTotal();
}

function addEvents() {
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });
}

const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buyOrden);

let itemsAdded = [];

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let priceText = product.querySelector(".product-price").textContent;
    let price = parseFloat(priceText.replace("$", "").replace(",", ""));
    let imgSrc = product.querySelector(".product-img").src;

    let newToAdd = { title, price, imgSrc };

    if (itemsAdded.find((el) => el.title === newToAdd.title)) {
        alert("Este Artículo Ya Existe");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    let carBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = carBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    // Guardar en Firebase
    guardarProductoEnFirebase(title, price);

    cart.classList.add("active");
    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) => el.title !== this.parentElement.querySelector(".cart-product-title").innerHTML
    );
    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}

function handle_buyOrden() {
    if (itemsAdded.length <= 0) {
        alert("¡Aún no hay ningún pedido para realizar!\nPor favor haga un pedido primero");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Su pedido se realizó exitosamente");
    itemsAdded = [];
    update();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector(".total-price");
    let total = 0;

    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total;
}

function cartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">$${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    </div>
    `;
}
