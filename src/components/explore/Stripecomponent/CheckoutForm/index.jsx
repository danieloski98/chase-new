import React from "react";
import { ElementsConsumer, CardElement, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "../CardSection";
import { useMutation } from "react-query";
import httpService from "../../../../utils/httpService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function InjectedCheckoutForm(props) {  

    const {
        config
    } = props 

    const navigate = useNavigate()

    function CheckoutForm() {
        const stripe = useStripe();
        const elements = useElements();
      
        const [message, setMessage] = React.useState(null);
        const [isProcessing, setIsProcessing] =  React.useState(false);


        const stripeMutation = useMutation({
            mutationFn: (data) => httpService.post(`/payments/stripePaySuccess?orderId=${data}`),
            onSuccess: (data) => {
                toast.success('Payment verified');
                navigate(0)
                // setLoading(false)
                // closeModal()
            },
            onError: (error) => {
                toast.error(error);
                // setLoading(false)
                // closeModal()
            },
        });
	
      
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            if (!stripe || !elements) {
                // Stripe.js has not yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
            }
        
            setIsProcessing(true);
        
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}`,
                },
                redirect: "if_required"
            });

            // console.log(paymentIntent);

            if(paymentIntent?.status === "succeeded"){ 
                stripeMutation.mutate(config?.reference);
            }
      
        //   if (error.type === "card_error" || error.type === "validation_error") {
        //     setMessage(error.message);
        //   } else {
        //     setMessage("An unexpected error occured.");
        //   }
      
          setIsProcessing(false);
        };
      
        return (
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button className={` bg-chasescrollBlue mt-6 font-semibold text-white w-full p-3 text-sm rounded-lg `} disabled={isProcessing || !stripe || !elements} id="submit">
              <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        );
      }

    return ( 
        <CheckoutForm />
    );
}