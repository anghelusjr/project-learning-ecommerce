export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
          id: "Id-admin-user1",
          quantity: 2
        },
        {
          id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
          quantity: 37
        },
        {
          id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
          quantity: 10
        }
];
}






function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId, quantityValue ){
  let matchingItem;

   cart.forEach((cartItem) =>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
   });

   if(matchingItem){
    matchingItem.quantity += quantityValue;
   }else{
    cart.push({
      id: productId, quantity: quantityValue
   });
   };

   saveToStorage();
}

export function updateCartQuantity(){
  let quantity = 0;

   cart.forEach((cartItem) =>{
   quantity += cartItem.quantity;
   })

   document.querySelector('.js-cart-quantity').innerHTML = quantity;
   console.log('Let quantity: ', quantity);
}


export function removeCart(cartId){
  const newCartArray = [];

  cart.forEach((cartItem) =>{
    if(cartItem.id !== cartId){
      newCartArray.push(cartItem);
    }
  });
  cart = newCartArray;
  saveToStorage();
}
