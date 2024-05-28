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

function addToCart(productId, productName, productPrice, productImage) {
    console.log('Adding product to cart:', productId);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const cartLink = document.querySelector('nav ul li a[href="/Frontend/public/cart.html"]');
    if (cartLink) {
        cartLink.innerHTML = `Cart (${cartCount})`;
    }
}


