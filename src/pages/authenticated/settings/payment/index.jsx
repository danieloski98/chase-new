import React from 'react'
import PageWrapper from '@/components/PageWrapper'
import { ChevronLeft } from '@/components/Svgs'
import { Link } from 'react-router-dom'
import { PATH_NAMES } from '@/constants'

const Payment = () => {
	return (
		<PageWrapper>
			{() => (
				<div className='w-full flex flex-col gap-8 p-4'>
					<Link to={PATH_NAMES.settings} className="flex gap-6 items-center">
						<ChevronLeft />
						<h1 className="text-xl font-medium">Payment</h1>
					</Link>
					<div className="flex flex-col gap-2 w-full max-w-sm text-gray-500">
						<Link
							to={PATH_NAMES.transactionHistory}
							className='border-b border-gray-200 p-2 text-lg w-full'
						>
							Payment Details
						</Link>
						<Link
							to={PATH_NAMES.transactionHistory}
							className='border-b border-gray-200 p-2 text-lg w-full'
						>
							Transaction History
						</Link>
					</div>
				</div>
			)}
		</PageWrapper>
	)
}

export default Payment