
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      quantity: 37,
      deliveryOptionId: '3'
    },
    {
      productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
      quantity: 10,
      deliveryOptionId: '1'
    }
  ];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantityValue) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantityValue;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityValue,
      deliveryOptionId: '2'
    });
  }

  saveToStorage();
}

export function saveToCart(productId, quantityValue) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
      matchingItem.quantity = quantityValue;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityValue
    });
  }

  saveToStorage();
}

export function updateCartQuantity() {
  let quantity = 0;

  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = quantity;
  saveToStorage();
  return quantity;
}

export function removeCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

// export function loadCart(fun = () => {}) {
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('load', () => {
//     fun();
//     console.log('load cart');
//   });
//   xhr.open('GET', 'https://supersimplebackend.dev/cart');
//   xhr.send();
// }

// export async function loadCartFetch(){
//   const response = await fetch('https://supersimplebackend.dev/cart');
//   console.log(response);
// }