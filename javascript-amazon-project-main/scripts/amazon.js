// import {cart as myCart} from '../data/cart.js'; //literally changes var name so another 'cart' var can be declared without causing naming conflicts
// import * as cartModule from '../data/cart.js' //imports everything from cart.js and puts it in a var that can be accessed as a property or method(using cartModule.cart or cartModule.addToCart('id');)

import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';



let productsHTML = '';
products.forEach((product) => { //accumulator pattern on next line
    productsHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)} 
        </div>

        <div class="product-quantity-container">
        <select class="js_select_button" data-product-id="${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js_add_to_cart" data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `;
});


document.querySelector('.js_products_grid').innerHTML = productsHTML//generates html and puts it on the page 




function updateCartQuantity() {
    // Calcultes cart quantity
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    // Updates page
    document.querySelector('.js_cart_quantity')
        .innerHTML = cartQuantity;
}
    
    
document.querySelectorAll('.js_add_to_cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
    
        addToCart(productId);
        updateCartQuantity();

    });
});