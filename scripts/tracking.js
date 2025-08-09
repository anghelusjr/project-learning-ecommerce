import { loadProductsFetch, getProduct } from '../data/products.js';
import { orders } from '../data/orders.js';
import { getDateFormat } from './utils/dateFormat.js';


async function initializeProductPage() {
  try {
    await loadProductsFetch();
    renderOrderProduct();
  } catch (err) {
    console.log('Unexpected error. Please try again later.', err);
  }
}

initializeProductPage();

function renderOrderProduct() {
  
  let productDetailsHTML = '';
  const productUrl = new URLSearchParams(window.location.search)
  .get('productId');
  const orderUrl = new URLSearchParams(window.location.search)
  .get('orderId');
  const productDetails = getProduct(productUrl)
  let deliveryTime;
  let quantity;
  
  orders.forEach((orderItem) =>{
    orderItem.products.forEach((product) =>{

      if(orderItem.id === orderUrl){

        if(product.productId === productUrl){
         quantity = product.quantity;
         deliveryTime = product.estimatedDeliveryTime;
        }
      }
    })

    const dateFormated = getDateFormat(deliveryTime, 'dddd, MMMM D' )
    
    
    console.log(deliveryTime)
      productDetailsHTML = `

          <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
              View all orders
            </a>

            <div class="delivery-date">
              Arriving on ${dateFormated}
            </div>

            <div class="product-info">
              ${productDetails.name}
            </div>

            <div class="product-info">
              Quantity: ${quantity}
            </div>

            <img class="product-image" src="${productDetails.image}">

            <div class="progress-labels-container">
              <div class="progress-label">
                Preparing
              </div>
              <div class="progress-label current-status">
                Shipped
              </div>
              <div class="progress-label">
                Delivered
              </div>
            </div>

            <div class="progress-bar-container">
              <div class="progress-bar"></div>
            </div>
          </div>
      `
    })

  document.querySelector('.js-main')
    .innerHTML = productDetailsHTML;
}