import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './PaymentForm.CSS';

/**
 * PaymentForm Component
 * @returns
 */
const PaymentForm = () => {
      const stripe = useStripe()
      const elements = useElements()
      console.log('paymentform',stripe,elements)
      return (
            <form
                  style={{marginTop: '20px'}}
                  onSubmit={async e => {
                        e.preventDefault()
                        console.log('PAYMENTSTRIPE');
                        if (!stripe || !elements) return
                        const result = await stripe.confirmPayment({
                              elements,
                              redirect: 'if_required',
                        })
                        console.log('PAYMENTRESULTSTRIPE',result)
                  }}
            >
                  <PaymentElement />
            </form>
      )
}

export default PaymentForm;