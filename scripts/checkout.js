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