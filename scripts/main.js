const increaseBtns = document.querySelectorAll(".increaseBtn");
const decreaseBtns = document.querySelectorAll(".decreaseBtn");
const addToCartBtns = document.querySelectorAll(".addToCartBtn");
const deleteButton = document.querySelector(".deleteButton");
const cartItems = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkoutBtn");
const purchaseSummary = document.getElementById("purchaseSummary");
const purchasedItemsList = document.getElementById("purchased-items");
let cart = [];
let purchasedItems = [];

function formatCurrency(value) {
    return value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    });
}

decreaseBtns.forEach((button) => {
    button.addEventListener('click', function () {
        const input = button.nextElementSibling;
        let currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    });
});

increaseBtns.forEach((button) => {
    button.addEventListener('click', function () {
        const input = button.previousElementSibling;
        let currentValue = parseInt(input.value);
        input.value = currentValue + 1;
    });
});

addToCartBtns.forEach((button) => {
    button.addEventListener('click', function () {
        const productItem = button.parentElement;
        const productName = productItem.querySelector('.product__name').innerText;
        const productPrice = parseFloat(productItem.querySelector('.product__price').getAttribute('data-price'));
        const productQuantity = parseInt(productItem.querySelector('.counter-product').value);

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += productQuantity;
            existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                subtotal: productQuantity * productPrice
            });
        }

        renderCart();
    });
});

function renderCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.subtotal)}</td>
    `;
        cartItems.appendChild(row);
    });
}

function renderPurchasedItems() {
    purchasedItemsList.innerHTML = '';
    purchasedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity} x ${item.name} - ${formatCurrency(item.subtotal)}`;
        purchasedItemsList.appendChild(li);
    });
}

function resetCounters() {
    const counters = document.querySelectorAll('.counter-product');
    counters.forEach(counter => {
        counter.value = 1;
    });
}


checkoutBtn.addEventListener('click', function () {
    if (cart.length > 0) {
        let total = cart.reduce((acc, item) => acc + item.subtotal, 0);
        purchaseSummary.innerText = `Has comprado ${cart.length} productos por un total de ${formatCurrency(total)}.`;

        purchasedItems = [...purchasedItems, ...cart];
        renderPurchasedItems();

        cart = [];
        renderCart();
        resetCounters();
    } else {
        purchaseSummary.innerText = 'No tienes productos en el carrito.';
    }
});

deleteButton.addEventListener('click', function () {
    cart = [];
    renderCart();
    resetCounters();
})