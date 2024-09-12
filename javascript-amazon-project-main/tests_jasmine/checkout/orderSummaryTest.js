import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { loadProducts } from '../../data/products.js';




describe('test suite: renderOrderSummary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";


    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js_test_container').innerHTML = `
            <div class="js_checkout_header_middle_section"></div>
            <div class="js_order_summary"></div>
            <div class="js_payment_summary"></div>
        `;


        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1',
                // priceCents: 1090
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2',
                // priceCents: 2095
            }]);
        });

        loadFromStorage();
        renderOrderSummary();
    });

    it('displays the cart', () => {

        expect(document.querySelectorAll('.js_cart_item_container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

    });



    it('removes a product', () => {

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js_cart_item_container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        
    });



    it('checks if product name is displayed correctly', () => {
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
    });



    it('checks if price is displayed correctly', () => {
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');
    });

    

    it('updates delivery option', () => {
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();
        // console.log(document.querySelector(`.js-delivery-option-${productId1}-3`));
        expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector('.js_payment_summary_shipping').innerText).toEqual('$14.98');
        expect(document.querySelector('.js_payment_summary_total').innerText).toEqual('$63.50');
    });
    
    // afterEach(() => {
    //     document.querySelector('.js_test_container').innerHTML = '';
    // });

});


