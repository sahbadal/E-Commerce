document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cartItems');

    cartItemsContainer.innerHTML = `
        <div class="cartItems-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br />
        <hr />
    `;

    let subtotal = 0;

    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cartItems-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <p>${item.quantity}</p>
            <p>$${total}</p>
            <p class="cross" onclick="removeFromCart('${item.id}')">X</p>
        `;

        cartItemsContainer.appendChild(cartItem);
        cartItemsContainer.appendChild(document.createElement('hr'));
    });

    updateCartTotals(subtotal);
}

function updateCartTotals(subtotal) {
    const deliveryFee = 2; // Assuming delivery fee is $2
    const subtotalElement = document.getElementById('subtotal-amount');
    const totalElement = document.getElementById('total-amount');

    if (subtotalElement) {
        subtotalElement.innerText = `$${subtotal}`;
    } else {
        console.error("Subtotal element not found");
    }

    if (totalElement) {
        totalElement.innerText = `$${subtotal + deliveryFee}`;
    } else {
        console.error("Total element not found");
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}
const proceed = document.getElementById("proceed-btn");
proceed.addEventListener("click", () => {
    alert("Your Order is Placed");
})
