import React from 'react'
import OverlayWrapper from '../../OverlayWrapper'
import { CaretLeftIcon, DebitCardIcon, PayStackLogo, StripeLogo, WalletIcon } from '../../Svgs'
import ButtonSpinner from '../../ButtonSpinners'
import { usePaystackPayment } from 'react-paystack'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import httpService from '../../../utils/httpService' 
import Stripecomponent from '../Stripecomponent/Stripecomponent'

const SelectPaymentOptions = ({ paystackLoading, stripeLoading, closeModal, handleClose, goBack, payWithPaystack, payWithStripe, currency, config, stripeconfig, client }) => {
	
	const initializePayment = usePaystackPayment(config);
	const [loading, setLoading] = React.useState(false) 

	const [orderCode, setOrderCode] = React.useState("")
	    // mutations 
	const payStackMutation = useMutation({
		mutationFn: (data) => httpService.post(`/payments/verifyWebPaystackTx?orderCode=${data}`),
		onSuccess: (data) => {
			toast.success('Payment verified');
			setLoading(false)
			closeModal()
		},
		onError: (error) => {
			toast.error(error);
			setLoading(false)
			closeModal()
		},
	});

	const stripeMutation = useMutation({
		mutationFn: (data) => httpService.post(`/payments/stripePaySuccess?orderId=${data}`),
		onSuccess: (data) => {
			toast.success('Payment verified');
			setLoading(false)
			closeModal()
		},
		onError: (error) => {
			toast.error(error);
			setLoading(false)
			closeModal()
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
            console.log(`Making paystack payment`);
            payStackMutation.mutate(orderCode);
            return;
        }

        // if (orderId) {
        //     console.log(`Making stripe payment`);
        //     stripeMutation.mutate(orderId);
        //     return;
        // }
    }, [orderCode]);
 
	
	return (
		<OverlayWrapper handleClose={handleClose}>
			<div className="p-4 w-full h-full flex items-center justify-center">
				<div className="w-full max-w-sm bg-white rounded-md flex flex-col gap-4 p-6 pt-16 shadow-lg relative border border-gray-100">
					<button
						className="cursor-pointer z-10 absolute top-6 left-4"
						onClick={() => {
							closeModal()
							goBack()
						}}
					>
						<CaretLeftIcon />
					</button>
					<p className="text-lg font-bold">Payment Options</p>
					<div className="flex flex-col gap-8 py-8">  
						{!stripeconfig?.amount && (
							<> 
								{currency !== "NGN" && (
									<div onClick={() => {
										payWithStripe()
									}} className="p-8 rounded-lg transition hover:bg-chasescrollLightGrey border flex justify-between items-center gap-4 font-bold cursor-pointer">
										<StripeLogo />
										{stripeLoading && <ButtonSpinner />}
									</div>
								)}
								{currency === "NGN" && (
									<div onClick={() => {
										payWithPaystack()
									}} className="p-8 rounded-lg transition hover:bg-chasescrollLightGrey border flex justify-between items-center gap-4 font-bold cursor-pointer">
										<PayStackLogo />
										{paystackLoading && <ButtonSpinner />}
									</div>
								)}
							</> 
						)}
						{stripeconfig?.amount > 0 && (
							<Stripecomponent clientSecret={client} config={stripeconfig} />
						)}
					</div>
				</div>
			</div>
		</OverlayWrapper>
	)
}

export default SelectPaymentOptions