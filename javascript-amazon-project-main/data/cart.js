export const cart = [];


export function addToCart(productId, quantityValue ){
  let matchingItem;

   cart.forEach((cartItem) =>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
   });

   if(matchingItem){
    matchingItem.quantityValue += quantityValue;
   }else{
    cart.push({
      productId, quantityValue
   });
   };
}

export function updateCartQuantity(){
  let quantity = 0;

   cart.forEach((cartItem) =>{
   quantity += cartItem.quantityValue;
   })

   document.querySelector('.js-cart-quantity').innerHTML = quantity;
   console.log('Let quantity: ', quantity);
}
