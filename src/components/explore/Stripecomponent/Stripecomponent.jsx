import React from "react"; 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_y8r2StarGdVHlq3DP1AraugF");

const App = (props) => {

    const {
        config,
        clientSecret
    } = props

    // const [clientSecret, setClientSecret] = useState("");
	const options = {
		mode: 'payment',
		amount: Number(config?.amount) * 100,
		currency: 'usd',
		// Fully customizable with appearance API.
		appearance: {
		/*...*/
		},
	};

    return ( 
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{clientSecret}} >
                    <CheckoutForm config={config} />
                </Elements>    
            )}
        </>
    );
};

export default App;