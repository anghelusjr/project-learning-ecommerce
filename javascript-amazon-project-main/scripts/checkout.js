import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import  isSatSun from './utils/is-weekend.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


renderOrderSummary();
renderPaymentSummary();
console.log(dayjs().format('dddd, MMMM D'));
console.log(isSatSun(dayjs().add(5, 'days')));