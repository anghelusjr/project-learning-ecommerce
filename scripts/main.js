import {cart, addToCart, updateCartQuantity} from "../data/cart.js";
import {products, loadProductsFetch} from "../data/products.js";

loadProductsFetch().then(()=>{
  renderProductsGrid();
})
function renderProductsGrid(){
        let productHTML = '';

        products.forEach((product) =>{

          productHTML += `
          
              <div class="product-container">
                  <div class="product-image-container">
                    <img class="product-image"
                      src="${product.image}">
                  </div>

                  <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                  </div>

                  <div class="product-rating-container">
                    <img class="product-rating-stars"
                      src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                      ${product.rating.count}
                    </div>
                  </div>

                  <div class="product-price">
                    ${product.getPrice()}
                  </div>

                  <div class="product-quantity-container">
                    <select class="js-quantity-select-${product.id}">
                      <option selected value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  ${product.extraInfoHtml()}


                  <div class="product-spacer"></div>

                  <div class="added-to-cart js-added-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                  </div>

                  <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id ="${product.id}">
                    Add to Cart
                  </button>
                </div>`
        })
        document.querySelector('.js-product-grid').innerHTML = productHTML;
        const clearIDs = {};
        document.querySelectorAll('.js-add-to-cart-button').forEach((button) =>{
          button.addEventListener('click', () =>{
            const {productId} = button.dataset;
            const quantityElement =  document.querySelector(`.js-quantity-select-${productId}`);
            const quantityValue = Number(quantityElement.value);
            const addedMessage = document.querySelector(`.js-added-cart-${productId}`);
            addedMessage.classList.add('added-to-cart-visible');

            if(clearIDs[productId]){
              clearTimeout(clearIDs[productId]);
            }
            
            clearIDs[productId] = setTimeout(()=>{
              addedMessage.classList.remove('added-to-cart-visible');
            }, 2000);


            addToCart(productId, quantityValue);
            updateCartQuantity();
          })
      })
}