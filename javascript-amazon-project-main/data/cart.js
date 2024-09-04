export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
    }, {
        productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }];
}



    // // my code block (Ex)
    // let selectValue;
    // document.querySelectorAll('.js_select_button').forEach((selectButton) => {
    //     selectButton.addEventListener('click', () => {
    //         // console.log(selectButton.value);
    //         // console.log(selectButton.productId);
    //         const productId = selectButton.dataset.productId;
    //         selectValue = selectButton.value;
    //         console.log(selectValue);


    //         // get option value here
    //         // then add value to quantity value. so when 'add to cart' is clicked, it updates that value
            
    //     });
    // });



function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart(productId) {
    let matchingItem;
    
    cart.forEach((cartItem) => { //cartItem is whole object
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}


export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}


export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}