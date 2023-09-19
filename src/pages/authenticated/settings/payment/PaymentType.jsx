import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import httpService from "../../../../utils/httpService";


const PaymentType =({  config, getData, setConfig }) => {
	
	const initializePayment = usePaystackPayment(config);
	const [loading, setLoading] = React.useState(false) 
	const [stripeModal, setstripeModal] = React.useState(false) 
    const queryClient = useQueryClient()  
	const { id, orderId } = useParams()

	const navigate = useNavigate()
	const Paystack_key = import.meta.env.PAYSTACK_KEY

	const [orderCode, setOrderCode] = React.useState("")
	    // mutations 
	const payStackMutation = useMutation({
		mutationFn: (data) => httpService.get(`/payments/api/wallet/verifyFundWalletWeb?transactionID=${orderCode}`),
		onSuccess: (data) => {
			// queryClient.invalidateQueries(['EventInfo'+id])
			getData() 
			toast.success('Payment verified');
			setLoading(false)   
			setConfig({ 
				email: "",
				amount: 0,
				reference: "",
				publicKey: Paystack_key,
			})
		},
		onError: (error) => {
			toast.error(error);
			setLoading(false) 
		},
	}); 
	
	const onSuccess = (reference) => {
		setLoading(true)
		setOrderCode(reference?.reference)
	}; 
  

	
	// you can call this function anything
	const onClose = () => {
	  // implementation for  whatever you want to do when the Paystack dialog closed.
	  console.log('closed')
	}

	React.useEffect(()=> { 
		if(config?.reference?.length !== 0) {  
			initializePayment(onSuccess, onClose) 
		} 
	}, [config])


	React.useEffect(()=> { 
        if (orderCode) { 
			setLoading(true)
            payStackMutation.mutate(orderCode);
            return;
        } 
    }, [orderCode]);
 
    return(
        <>
        </>
    )
}

export default PaymentType