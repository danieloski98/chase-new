import React from 'react'
import { CreditWallet, DebitWallet, OtherPurchase, TicketPurchase } from '../Svgs'
import { formatNumber, formatTime, formatDate } from '@/utils/helpers'
import { CURRENCY, TRANSACTION_PURPOSE, TRANSACTION_STATUS } from '@/constants'
import moment from 'moment'

const PaymentRecord = ({
	description,
	title,
	timestamp,
	payableAmount,
	value,
	currency,
	purpose,
	status
}) => {
	const { payForTicket, fundWallet, cashout } = TRANSACTION_PURPOSE
	const { started, paid, cancelled, error, refunded } = TRANSACTION_STATUS
	const { USD, NGN } = CURRENCY 

	console.log(timestamp);
	return (
		<div className='w-full flex gap-2.5 items-start'>
			{purpose === payForTicket ? (
				<TicketPurchase />
			) : purpose === fundWallet ? (
				<CreditWallet />
			) : purpose === cashout ? (
				<DebitWallet />
			):(
				<OtherPurchase />
			)}
			<div className="flex flex-col gap-1 w-full">
				<div className="flex justify-between items-center text-base text-gray-600">
					<span className="font-medium">{
						description ??
							title ??
							purpose === payForTicket
							? 'Ticket Purchase'
							: purpose === fundWallet
								? 'Fund Wallet'
								: cashout && 'Withdrawal'
					}</span>
					<span className="">
						{purpose === fundWallet ||
							purpose === payForTicket
							? "+ "
							: purpose === cashout && "- "}
						{formatNumber(payableAmount/100 ?? value/100, currency === USD ? "$" : "₦")}
					</span>
				</div>
				<div className="flex justify-between items-center text-xs">
					<small className="text-gray-500">
						{formatDate(new Date(...timestamp))} - {formatTime(new Date(...timestamp))}
					</small>
					<small>
						{status === paid && <span className='bg-green-200 text-green-800 px-2 py-0.5 rounded-lg'>paid</span>}
						{status === started && <span className='bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-lg'>pending</span>}
						{status === cancelled && <span className='bg-red-200 text-red-800 px-2 py-0.5 rounded-lg'>cancelled</span>}
						{status === refunded && <span className='bg-red-200 text-red-800 px-2 py-0.5 rounded-lg'>refunded</span>}
						{status === error && <span className='bg-red-200 text-red-800 px-2 py-0.5 rounded-lg'>failed</span>}
					</small>

				</div>
			</div>
		</div>
	)
}

export default PaymentRecord