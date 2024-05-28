document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/product');
        const { products } = await response.json();

        const productList = document.getElementById('product-list');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <p>${product.size}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('${product._id}', '${product.name}', '${product.price}', '${product.image}')">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id, name, price: parseFloat(price), image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Cart:', cart); // Add this line for debugging
    console.log('Cart Count:', cartCount); // Add this line for debugging
    document.getElementById('cart-count').innerText = cartCount;
}
