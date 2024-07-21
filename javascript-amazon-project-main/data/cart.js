export const cart = [];


// my code block (Ex)
let selectValue;
document.querySelectorAll('.js_select_button').forEach((selectButton) => {
    selectButton.addEventListener('click', () => {
        // console.log(selectButton.value);
        // console.log(selectButton.productId);
        const productId = selectButton.dataset.productId;
        selectValue = selectButton.value;
        console.log(selectValue);


        // get option value here
        // then add value to quantity value. so when 'add to cart' is clicked, it updates that value
        
    });
});



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
                quantity: 1
            });
        }


}


