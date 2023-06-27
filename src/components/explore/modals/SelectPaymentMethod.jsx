import React from 'react'
import OverlayWrapper from '../../OverlayWrapper'
import { CaretLeftIcon, DebitCardIcon, WalletIcon } from '../../Svgs'

const SelectPaymentMethod = ({ closeModal, handleClose, goBack, togglePaymentOptions }) => {
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
					<p className="text-lg font-bold">Select Payment Method</p>
					<div className="flex flex-col gap-8 py-8">
						<div onClick={() => {
							closeModal()
							togglePaymentOptions()
						}} className="p-8 rounded-lg bg-chasescrollLightGrey border flex items-center gap-4 font-bold cursor-pointer">
							<DebitCardIcon />
							Pay with card
						</div>
						{/* TODO: when wallet is available */}
						{/* <div className="p-8 rounded-lg bg-chasescrollLightGrey border flex items-center gap-4 font-bold">
							<WalletIcon />
							Pay with wallet
						</div> */}
					</div>
				</div>
			</div>
		</OverlayWrapper>
	)
}

export default SelectPaymentMethod