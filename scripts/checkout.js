import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch} from '../data/products.js';

async function loadPage(){
  try{
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
  } catch(err){
    console.log('Unexpected error. Please try again later.');
  }
}

loadPage();

// This is for learning purposes no transaction occur on this ecommerce

// loadPage().then((value) =>{
//   console.log('next step!!!!')
//   console.log(value);
// });
/*

Promise.all([
    loadProductsFetch(),
  new Promise((resolve) =>{
      loadCart(() =>{
        resolve()
      });
   })

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});

*/
// new Promise((resolve)=>{
//   loadProducts(() =>{
//     resolve('value1');
//   })

// }).then((value) =>{
//   console.log(value);
//     return new Promise((resolve) =>{
//       loadCart(() =>{
//         resolve()
//       });
//     });

// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// gridHTML += `
//   <div class="product-grid-item cart-item-container-${matchingItem.id} js-cart-item-container-id-${matchingItem.id}">
//     <img class="product-image" src="${matchingItem.image}">
//     <div class="product-name">${matchingItem.name}</div>
//     <div class="product-price">${matchingItem.getPrice()}</div>
//     <div class="product-quantity">
//       <span>
//         Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
//       </span>
//       <span class="update-quantity-link link-primary js-update-quantity-link" data-update-id="${matchingItem.id}">Update</span>
//       <input class="quantity-input js-quantity-input-${matchingItem.id}">
//       <span class="save-quantity-link link-primary" data-save-id="${matchingItem.id}">Save</span>
//       <span class="delete-quantity-link link-primary js-delete-link" data-delete-id="${matchingItem.id}">Delete</span>
//     </div>
//     <div class="delivery-options">
//       <div class="delivery-options-title">Choose a delivery option:</div>
//       ${deliveryDateHTML(matchingItem, cartItem)}
//     </div>
//   </div>
// `;