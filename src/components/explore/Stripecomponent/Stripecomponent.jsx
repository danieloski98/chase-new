import React from "react"; 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import OverlayWrapper from "../../OverlayWrapper";
import { CLOSE_ENTITY } from "../../../constants";

const stripePromise = loadStripe("pk_test_y8r2StarGdVHlq3DP1AraugF");

const Stripecomponent = (props) => {

    const {
        config,
        clientKey,
        closeModal,
        handleClose,
        getData
    } = props

    const [clientSecret, setClientSecret] = React.useState("");
    const [configData, setconfigData] = React.useState("");
	// const options = {
	// 	mode: 'payment',
	// 	amount: Number(config?.amount) * 100,
	// 	currency: 'usd',
	// 	// Fully customizable with appearance API.
	// 	appearance: {
	// 	/*...*/
	// 	},
	// };

    React.useEffect(()=> {
        setClientSecret(clientKey)
        setconfigData(config)
    }, [])

    console.log(clientKey);

    return ( 
		<OverlayWrapper handleClose={closeModal}> 
			<div className="p-4 w-full h-full flex items-center justify-center">
				<div className="w-full max-w-sm bg-white rounded-md flex flex-col gap-4 p-6 pt-16 shadow-lg relative border border-gray-100">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 left-6 text-2xl text-gray-800"
                    >
                        {CLOSE_ENTITY}
                    </button>  
					<p className="text-lg font-bold">Payment Form</p>
                    {clientSecret.length !== 0 && (
                        <div className="flex flex-col gap-8 py-8">  
                            <>
                                {clientSecret && stripePromise && (
                                    <Elements stripe={stripePromise} options={{clientSecret}} >
                                        <CheckoutForm config={configData} closeModal={closeModal} getData={getData} />
                                    </Elements>    
                                )}
                            </>
                        </div>
                    )}
                </div>
            </div>
        </OverlayWrapper>
    );
};

export default Stripecomponent;