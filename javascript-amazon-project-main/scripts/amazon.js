// import {cart as myCart} from '../data/cart.js'; //literally changes var name so another 'cart' var can be declared without causing naming conflicts
// import * as cartModule from '../data/cart.js' //imports everything from cart.js and puts it in a var that can be accessed as a property or method(using cartModule.cart or cartModule.addToCart('id');)

import { addToCart, calculateCartQuantity } from '../data/cart.js';
import { products, loadProductsFetch} from '../data/products.js';




loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {

    let productsHTML = '';
    
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    // is the reason rendering isn't done twice for both 'all products' and 'fiitered prodcts'
    let filteredProducts = products;

    if(search) {
        filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(search) || product.keywords.includes(search.toLowerCase());
        });
    }

    
    filteredProducts.forEach((product) => {
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
                src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
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

            ${product.extraInfoHTML()}

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


    document.querySelector('.js_products_grid').innerHTML = productsHTML; //generates html and puts it on the page 


    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();

        // Updates page with new cart quantity
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



    function handleSearch() {
        const search = document.querySelector('.js_search_bar').value;
        window.location.href = `amazon.html?search=${search}`;
    }
    
    const searchIcon = document.querySelector('.js_search_icon');
    const searchBar = document.querySelector('.js_search_bar');
    
    searchIcon.addEventListener('click', handleSearch);
    
    searchBar.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}


loadProductsFetch(renderProductsGrid).then(() => {
    console.log('products have been fetched succefully!');
}).catch((error) => {
    console.log('an error occurred while fetching...');
    console.log(error);
});