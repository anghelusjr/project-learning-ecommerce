import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import  isSatSun from './utils/is-weekend.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

