import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// import '../data/cart_oop.js';
import '../data/cart_class.js';



renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
