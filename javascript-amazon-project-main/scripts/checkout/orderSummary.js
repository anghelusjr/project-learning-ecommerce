import { cart, removeCart, saveToCart, saveToStorage, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';


 export function renderOrderSummary(){
      document.querySelector('.js-order-summary').innerHTML = '';
      updateCartQuantity();

      cart.forEach((cartItem) =>{
        const cartId = cartItem.id;
        let generatedHTML = '';
        const matchingItem = getProduct(cartId);

        console.log(matchingItem);  
        
            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOption(deliveryOptionId); 

            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');


            generatedHTML +=  `
                <div class="cart-item-container-${matchingItem.id} js-cart-item-container-id-${matchingItem.id}">
                    <div class="delivery-date">
                      Delivery date: ${dateString}
                    </div>

                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${matchingItem.image}">

                      <div class="cart-item-details">
                        <div class="product-name">
                          ${matchingItem.name}
                        </div>
                        <div class="product-price">
                          ${matchingItem.getPrice()}
                        </div>
                        <div class="product-quantity">
                          <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                          </span>
                          <span class="update-quantity-link link-primary js-update-quantity-link" data-update-id = "${matchingItem.id}">
                            Update
                          </span>
                          <input class = "quantity-input js-quantity-input-${matchingItem.id}"><span class ="save-quantity-link link-primary" data-save-id = "${matchingItem.id}">Save</span>
                          <span class="delete-quantity-link link-primary js-delete-link" data-delete-id = "${matchingItem.id}">
                            Delete
                          </span>
                        </div>
                      </div>
                      <div class="delivery-options">


                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryDateHTML(matchingItem, cartItem)}

              </div>
            </div>
          </div>
              
              `
              genHTML(generatedHTML);
      });

      function deliveryDateHTML(matchingItem, cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOption) =>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceTotal = deliveryOption.priceCents === 0 ? 'FREE'  : `$${formatCurrency(deliveryOption.priceCents)} -`;

        let isChecked = deliveryOption.id === cartItem.deliveryOptionId



          html += `<div class="delivery-option js-delivery-option"
                    data-product-id ="${matchingItem.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input" 
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceTotal} Shipping
                    </div>
                  </div>
                </div>`;

        })

      
                    
        return html;     
      }

      function genHTML(generatedHTML){
        const checkoutGridElement = document.querySelector('.order-summary');
        checkoutGridElement.innerHTML += generatedHTML;
      }


      document.querySelectorAll('.js-delete-link').forEach((deleteLink) =>{
      deleteLink.addEventListener('click', () =>{
        
        const {deleteId} = deleteLink.dataset;
        removeCart(deleteId);
        const cartContainer = document.querySelector(`.js-cart-item-container-id-${deleteId}`);
        renderOrderSummary();
        renderPaymentSummary();
      }) 
      })

      function updateCartQuantity(){
        let quantity = 0;

        cart.forEach((cartItem) =>{
        quantity += cartItem.quantity;
        })

        document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} item`;
      }


      document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) =>{
      updateLink.addEventListener('click', () =>{
      const {updateId} = updateLink.dataset;
      const cartContainerElement = document.querySelector(`.cart-item-container-${updateId}`);
      cartContainerElement.classList.add('is-editing-quantity');
      document.querySelector(`.js-quantity-label-${updateId}`).innerHTML = '';
      const inputQuantityElement = document.querySelector(`.js-quantity-input-${updateId}`);
      inputQuantityElement.value = '';
      })
      })


      document.querySelectorAll('.save-quantity-link').forEach((saveLink) =>{
        saveLink.addEventListener('click', () =>{
          const {saveId} = saveLink.dataset;
          const cartContainerElement = document.querySelector(`.cart-item-container-${saveId}`);
          cartContainerElement.classList.remove('is-editing-quantity');

          const inputQuantityElement = document.querySelector(`.js-quantity-input-${saveId}`);
          const quantityElement = document.querySelector(`.js-quantity-label-${saveId}`);
          const saveValueQuantity = Number(inputQuantityElement.value);
          quantityElement.innerHTML = saveValueQuantity;
        saveToCart(saveId, saveValueQuantity)
          updateCartQuantity();
          renderPaymentSummary();
          saveToStorage();
        })
      })

      document.querySelectorAll('.js-delivery-option').forEach((element) =>{
        element.addEventListener('click', () =>{
          const {productId, deliveryOptionId } = element.dataset;
          
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      })
  } 
