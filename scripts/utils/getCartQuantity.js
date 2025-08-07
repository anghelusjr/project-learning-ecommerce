import { cart } from '../../data/cart.js'
import {saveToStorage} from '../../data/cart.js'

export function getCartQuantity() {
  let quantity = 0;

  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });
  saveToStorage();
  return quantity;
}