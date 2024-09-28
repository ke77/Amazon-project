import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";



async function loadPage() {
    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);
    } catch(error) {
        console.log(error);
        console.log('unexpected error. please try again later');
    }
        renderCheckoutHeader();
        renderPaymentSummary();
        renderOrderSummary();
}
loadPage();