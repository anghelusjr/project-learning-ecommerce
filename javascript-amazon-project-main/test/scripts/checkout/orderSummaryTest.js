import {renderOrderSummary} from '../../../scripts/checkout/orderSummary.js'
import { cart} from '../../../data/cart.js'
import { getProduct } from '../../../data/products.js';
import { deliveryOptions } from '../../../data/deliveryOption.js';
import { loadProducts } from '../../../data/products.js';


describe('Test suites: Product Inside of The Cart', () =>{
  const productId2 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
  const productId3 = 'dd82ca78-a18b-4e2a-9250-31e67412f98d';


  beforeAll((done)=>{
    loadProducts(() =>{
      done();
    });
  });


  beforeEach(() =>{
    spyOn(localStorage, 'getItem').and.callFake(() =>{
      return JSON.stringify([{
          id: "Id-admin-user1",
          quantity: 2,
          deliveryOptionId: '3'
        },
        {
          id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
          quantity: 37,
          deliveryOptionId: '3'
        },
        { 
          id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
          quantity: 10,
          deliveryOptionId: '1'
        }]);
    });
  });

  it('Checking Default Cart Item', () =>{
    expect(cart[0].id).toEqual(productId2);
     expect(cart[1].id).toEqual(productId3);
  });

  it('Getting Product Inside The Cart', () =>{
    expect(getProduct(productId2).id).toEqual(cart[0].id);
    expect(getProduct(productId3).id).toEqual(cart[1].id);
  });
})