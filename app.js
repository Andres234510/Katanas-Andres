let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} ha sido añadido al carrito.`);
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price} USD</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${subtotal} USD</td>
                <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    document.getElementById("total").textContent = `Total: $${total} USD`;
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert("Gracias por su compra!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Si estamos en la página del carrito, renderizamos el carrito al cargar la página
if (document.getElementById("cartItems")) {
    renderCart();
}

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    cartCount.textContent = cart.length;
}

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} ha sido añadido al carrito.`);
}

// Llamar a updateCartCount al cargar la página
updateCartCount();


function showProductDetails(imageSrc, title, price) {
    document.getElementById("modalImage").src = imageSrc;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalPrice").textContent = `$${price} USD`;
    
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

