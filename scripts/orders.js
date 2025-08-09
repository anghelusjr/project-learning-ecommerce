import {orders, getOrder} from '../data/orders.js';
import {loadProductsFetch, getProduct} from '../data/products.js';
import { getDateFormat } from './utils/dateFormat.js';
import {formatCurrency} from './utils/money.js';
import { getCartQuantity } from './utils/getCartQuantity.js';
import {addToCart, saveToStorage} from '../data/cart.js'


  async function initializeProductPage(){
    try{
      await loadProductsFetch();
      renderOrderSummary();
    } catch(err){
      console.log('Unexpected error. Please try again later.', err);
    }
  }

initializeProductPage();

function renderOrderSummary() {
  const orderHtml = orderHeaderHtml();
  const orderSummaryElement = document.querySelector('.js-orders-grid');
  orderSummaryElement.innerHTML = orderHtml;
  document.querySelector('.cart-quantity').innerHTML = getCartQuantity();

  document.querySelectorAll('.js-buy-again-button').forEach((button) =>{  
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    addToCart(productId, 1)
    saveToStorage();
    initializeProductPage(); 
  })
});

}


function orderHeaderHtml() {
  let orderHeader = '';
  orders.forEach((orderItem) => {
  const date = getDateFormat(orderItem.orderTime, 'YYYY-  MMM-DD hh:mma')

    orderHeader += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${date}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orderItem.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderItem.id}</div>
          </div>
        </div>   

        ${orderDetailsGrid(orderItem.products, orderItem)}
      </div> 
    `;
  });

  return orderHeader;
}
function orderDetailsGrid(products, orderItem) {
  let orderDetailsHtml = '';

  for (let i = 0; i < products.length; i++) {
    const productData = products[i];
    const matchedProduct = getProduct(productData.productId);
    const deliveryTime = productData.estimatedDeliveryTime
    const date = getDateFormat(deliveryTime, 'YYYY MMM DD');
  

    if (matchedProduct) {
      orderDetailsHtml += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${matchedProduct.image}">
          </div>

          <div class="product-details"> 
            <div class="product-name">${matchedProduct.name}</div>
            <div class="product-delivery-date">
              Arriving on: ${date || ''}
            </div>
            <div class="product-quantity">
              Quantity: ${productData.quantity || 1}
            </div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${productData.productId}>
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href=tracking.html?productId=${productData.productId}&orderId=${orderItem.id}>
              <button class="track-package-button button-secondary js-track-package-button">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    }
  }

  return orderDetailsHtml;
}

 