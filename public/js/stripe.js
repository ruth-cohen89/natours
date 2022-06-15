/* eslint-disable */
import axios from 'axios'
const Stripe = require('stripe');
import { showAlert, hideAlert } from './alerts'

export const bookTour = async (tourId) => {
  try {
    const stripe = window.Stripe("pk_test_51Kc3R6GVbNtop8FTTLJXyCoKliw3LhASX2BNQgwlobX90nrqSInOlZick4AFB8iqcnEJeYYFc1W34UMDTpLUw8aC00M3XsCxro");
    const session = await axios(
        `/api/v1/bookings/checkout-session/${tourId}`
    );
    
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    });
    
  } catch (err) {
      showAlert('error', err);
  }
}
