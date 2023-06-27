import React from 'react'
import OverlayWrapper from '../../OverlayWrapper'
import { CaretLeftIcon, DebitCardIcon, PayStackLogo, StripeLogo, WalletIcon } from '../../Svgs'
import ButtonSpinner from '../../ButtonSpinners'

const SelectPaymentOptions = ({ paystackLoading, stripeLoading, closeModal, handleClose, goBack, payWithPaystack, payWithStripe, currency }) => {
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
						<div onClick={() => {
							payWithStripe()
						}} className="p-8 rounded-lg transition hover:bg-chasescrollLightGrey border flex justify-between items-center gap-4 font-bold cursor-pointer">
							<StripeLogo />
							{stripeLoading && <ButtonSpinner />}
						</div>
						{currency === "NGN" && (
							<div onClick={() => {
								payWithPaystack()
							}} className="p-8 rounded-lg transition hover:bg-chasescrollLightGrey border flex justify-between items-center gap-4 font-bold cursor-pointer">
								<PayStackLogo />
								{paystackLoading && <ButtonSpinner />}
							</div>
						)}
					</div>
				</div>
			</div>
		</OverlayWrapper>
	)
}

export default SelectPaymentOptions