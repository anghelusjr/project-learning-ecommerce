import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import  isSatSun from './utils/is-weekend.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import '../data/cart-class.js';

renderOrderSummary();
renderPaymentSummary();