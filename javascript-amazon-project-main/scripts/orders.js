import {orders} from '../data/orders.js';
import {loadProductsFetch, getProduct} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


  async function loadPage(){
    try{
      await loadProductsFetch();
      renderOrderSummary();
    } catch(err){
      console.log('Unexpected error. Please try again later.');
    }
  }

loadPage();

function renderOrderSummary() {
  const orderHtml = orderHeaderHtml();
  const orderSummaryElement = document.querySelector('.js-orders-grid');
  orderSummaryElement.innerHTML = orderHtml;
}

function orderHeaderHtml() {
  let orderHeader = '';

  orders.forEach((orderItem) => {
    orderHeader += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderItem.orderTime}</div>
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

        ${orderDetailsGrid(orderItem.products)}
      </div> 
    `;
  });

  return orderHeader;
}
function orderDetailsGrid(products) {
  let orderDetailsHtml = '';

  for (let i = 0; i < products.length; i++) {
    const productData = products[i];
    const matchedProduct = getProduct(productData.productId);

    if (matchedProduct) {
      orderDetailsHtml += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${matchedProduct.image}">
          </div>

          <div class="product-details"> 
            <div class="product-name">${matchedProduct.name}</div>
            <div class="product-delivery-date">
              Arriving on: ${productData.estimatedDeliveryTime || ''}
            </div>
            <div class="product-quantity">
              Quantity: ${productData.quantity || 1}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
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