import { cart, removeFromCart, updateDeliveryOption, updateQuantity} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader, updateCartQuantity } from './checkoutHeader.js';




export function renderOrderSummary() {

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId; 
        const matchingProduct = getProduct(productId);


        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);


        const dateString = calculateDeliveryDate(deliveryOption);


        cartSummaryHTML +=
        `
            <div class="cart-item-container js_cart_item_container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${matchingProduct.id}">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                        <span>
                            Quantity: 
                            <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js_update_link" data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <input class="quantity_input js-quantity-input-${matchingProduct.id}"> 
                        <span class="save_quantity_link link_primary js_save_link" data-product-id="${matchingProduct.id}">
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js_delete_link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                    </div>
            </div>
        `
    });
                
    document.querySelector('.js_order_summary').innerHTML = cartSummaryHTML;



    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = ``;
        
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option js_delivery_option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"  data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
            `
        });

        return html;
    }



    document.querySelectorAll('.js_update_link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.add('is_editing_quantity');

            document.querySelectorAll('.js_save_link').forEach((link) => {
                link.addEventListener('click', () => {
                    const productId = link.dataset.productId;

                    const container = document.querySelector(`.js-cart-item-container-${productId}`);

                    container.classList.remove('is_editing_quantity');

                    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

                    const newQuantity = Number(quantityInput.value);

                    updateQuantity(productId, newQuantity);

                    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

                    quantityLabel.innerHTML = newQuantity;
                    updateCartQuantity();

                    renderCheckoutHeader();
                    renderOrderSummary();
                    renderPaymentSummary();
                })
            });
        });
    });



    document.querySelectorAll('.js_delete_link').forEach((link) => {
        link.addEventListener('click', () => { //when clicked, remove product from cart, then update the html 
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderCheckoutHeader(); //checkout items number is updated here when user deletes a certain cart item

            renderPaymentSummary();

        });
    });



    document.querySelectorAll('.js_delivery_option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId); //these arguments point to the values from the line before this one
                
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}
