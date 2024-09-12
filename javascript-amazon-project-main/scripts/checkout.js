import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";



async function loadPage() {
    await loadProductsFetch();

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();


