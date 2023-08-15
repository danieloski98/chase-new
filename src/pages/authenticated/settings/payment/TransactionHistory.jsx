import React, { useEffect, useState } from 'react'
import PageWrapper from '@/components/PageWrapper'
import { ChevronLeft } from '@/components/Svgs'
import { Link } from 'react-router-dom'
import { PATH_NAMES } from '@/constants/paths.constant'
import { useAuth } from '@/context/authContext'
import { useFetch } from '@/hooks/useFetch'
import { GET_TRANSACTIONS } from '@/constants/endpoints.constant'
import PaymentRecord from '@/components/settings/PaymentRecord'

const TransactionHistory = () => {
	const [transactions, setTransactions] = useState([])
	const { token } = useAuth()
	const { sendRequest } = useFetch()

	const getTransactions = () => {
		sendRequest(
			GET_TRANSACTIONS,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		).then((response) => setTransactions(response?.content))
	}

	useEffect(() => {
		getTransactions()
	}, [])

	console.log(transactions);

	return (
		<PageWrapper>
			{() => (
				<div className='w-full flex flex-col gap-8 p-4'>
					<Link to={PATH_NAMES.payments} className="flex gap-6 items-center">
						<ChevronLeft />
						<h1 className="text-xl font-medium">Transaction History</h1>
					</Link>
					<div className="flex flex-col gap-7 lg:px-10 max-w-md w-full">
						{transactions?.map(transaction => {
							console.log(transaction);
							return(
								<PaymentRecord
									key={transaction?.transactionID}
									{...transaction}
								/>
							)
						})}
					</div>
				</div>
			)}
		</PageWrapper>
	)
}

export default TransactionHistory