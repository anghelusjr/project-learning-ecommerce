
class Cart{
  cartItems;
  #localStorageKey;

    constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
    }
    #loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
            if(!this.cartItems){
              this.cartItems = [{
                      id: "Id-admin-user1",
                      quantity: 2,
                      deliveryOptionId: '3'
                    },{
                      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
                      quantity: 37,
                      deliveryOptionId: '3'
                    },{
                      id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
                      quantity: 10,
                      deliveryOptionId: '1'
                    }
                  ];
              }
    }
    saveToStorage(){
          localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId, quantityValue ){
            let matchingItem;

            this.cartItems.forEach((cartItem) =>{
              if(productId === cartItem.id){
                matchingItem = cartItem;
              }
            });

            if(matchingItem){
              matchingItem.quantity += quantityValue;
            }else{
              this.cartItems.push({
                id: productId, quantity: quantityValue, deliveryOptionId: '2'
            });
            };

            this.saveToStorage();
    }
    saveToCart(productId, quantityValue ){
    let matchingItem;

    this.cartItems.forEach((cartItem) =>{
      if(productId === cartItem.id){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity = quantityValue;
    }else{
      this.cartItems.push({
        id: productId, quantity: quantityValue
    });
    };

    this.saveToStorage();
    }
    updateCartQuantity(){
    let quantity = 0;

    this.cartItems.forEach((cartItem) =>{
    quantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = quantity;
    this.saveToStorage();
    return quantity;
    }
    removeCart(cartId){
    const newCartArray = [];

    this.cartItems.forEach((cartItem) =>{
      if(cartItem.id !== cartId){
        newCartArray.push(cartItem);
      }
    });
    this.cartItems = newCartArray;
    this.saveToStorage();
    }
    updateDeliveryOption(productId, deliveryOptionId){
          let matchingItem;

          this.cartItems.forEach((cartItem) =>{
            if(productId === cartItem.id){
              matchingItem = cartItem;
            }
          });

          matchingItem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage();
    }
}
  const cart = new Cart('cart-oop');
  const businessCart = new Cart('cart-business');










