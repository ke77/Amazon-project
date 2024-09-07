import { calculateCartQuantity } from '../../data/cart.js';


// console.log(document.querySelector('.js_checkout_header_middle_section'));

export function renderCheckoutHeader() {
    let checkoutHeaderHTML = '';

    checkoutHeaderHTML += 
    `
        Checkout (<a class="return-to-home-link js_return_to_home_link"
        href="amazon.html"></a>)
    `;


    document.querySelector('.js_checkout_header_middle_section')
        .innerHTML = checkoutHeaderHTML;


    updateCartQuantity();    
}


export function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js_return_to_home_link')
        .innerHTML = `${cartQuantity} items`;
}


