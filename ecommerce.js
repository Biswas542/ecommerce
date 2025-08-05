document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
        { id: 1, name: 'Premium Watch', price: 150.00, image: 'https://via.placeholder.com/280x220/007bff/FFFFFF?text=Watch' },
        { id: 2, name: 'Noise-Cancelling Headphones', price: 99.50, image: 'https://via.placeholder.com/280x220/28a745/FFFFFF?text=Headphones' },
        { id: 3, name: 'Smart Home Speaker', price: 75.00, image: 'https://via.placeholder.com/280x220/dc3545/FFFFFF?text=Speaker' },
        { id: 4, name: 'Portable Power Bank', price: 45.00, image: 'https://via.placeholder.com/280x220/ffc107/FFFFFF?text=Power+Bank' },
        { id: 5, name: 'Ergonomic Mouse', price: 60.00, image: 'https://via.placeholder.com/280x220/17a2b8/FFFFFF?text=Mouse' },
        { id: 6, name: 'Stylish Backpack', price: 85.00, image: 'https://via.placeholder.com/280x220/6c757d/FFFFFF?text=Backpack' },
        { id: 7, name: 'Bluetooth Earbuds', price: 55.00, image: 'https://via.placeholder.com/280x220/6610f2/FFFFFF?text=Earbuds' },
        { id: 8, name: 'Fitness Tracker', price: 120.00, image: 'https://via.placeholder.com/280x220/e83e8c/FFFFFF?text=Tracker' }
    ];

    const productGrid = document.querySelector('.product-grid');
    const cartCountEl = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const closeBtn = document.querySelector('.close-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    let cart = [];

    // Function to render products on the page
    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Function to render cart items
    function renderCart() {
        cartItemsEl.innerHTML = '';
        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        } else {
            let total = 0;
            cart.forEach(item => {
                total += item.price;
                const cartItemEl = document.createElement('div');
                cartItemEl.classList.add('cart-item');
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                `;
                cartItemsEl.appendChild(cartItemEl);
            });
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
        }
        cartCountEl.textContent = cart.length;
    }

    // Add to cart functionality
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);
            if (productToAdd) {
                cart.push(productToAdd);
                renderCart();
            }
        }
    });

    // Remove from cart functionality
    cartItemsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            renderCart();
        }
    });

    // Modal functionality
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    renderProducts();
});