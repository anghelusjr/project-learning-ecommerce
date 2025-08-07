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