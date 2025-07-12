import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
import  isSatSun from './utils/is-weekend.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

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