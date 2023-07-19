import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { REMOVE_FRIEND, SEND_FRIEND_REQUEST } from '../../constants/endpoints.constant'
import { useAuth } from '../../context/authContext'
import { useFetch } from '../../hooks/useFetch'
import CONFIG from '../../config'
import { Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const ExplorePerson = ({ person }) => {
	const [isConnected, setIsConnected] = useState(false)
	const { token } = useAuth()
	const { sendRequest } = useFetch()
	const navigate = useNavigate()

	const unfriend = userId => {
		sendRequest(
			`${REMOVE_FRIEND}/${userId}`,
			'DELETE',
			null,
			{ Authorization: `Bearer ${token}` }
		)
	}

	const sendFriendRequest = async () => {
		const response = await sendRequest(
			SEND_FRIEND_REQUEST,
			"POST",
			{ toUserID: person.userId },
			{ Authorization: `Bearer ${token}` }
		)
		if (response) setIsConnected(state => !state)
	}

	return (
		<li className="flex py-4 md:gap-96 border-b">
			<div className="flex py-4 w-full">
				<div className="h-auto w-auto rounded-b-full rounded-tl-full border border-chasescrollBlue overflow-hidden">
					{/* <img src={`${CONFIG.RESOURCE_URL}${person?.data?.imgMain?.value}`} alt="profiles" className="h-full w-full rounded-b-full rounded-tl-full" /> */}
					<Avatar 
						srrc={`${CONFIG.RESOURCE_URL}${person?.data?.imgMain?.value}`}
						name={`${person?.firstName} ${person?.lastName}`}
						className="h-full w-full rounded-b-full rounded-tl-full cursor-pointer"
						size='md'
						onClick={() => navigate(`/profile/${`${person?.userId}`}`)}
					/>
				</div>
				<div className="flex flex-col pl-4">
					<h1 onClick={() => navigate(`/profile/${`${person?.userId}`}`)} className='cursor-pointer'>{person?.firstName} {person?.lastName}</h1>
					<span className="text-[#2E2B2B] text-opacity-[67%]">
						{person?.username}
					</span>
				</div>
			</div>
			<div className="flex justify-end h-1/2">
				{isConnected ? (
					<button
						className="text-[#F04F4F] text-xs md:text-sm hover:text-red-600 shadow-lg bg-white font-bold py-1 md:py-2 px-8 rounded"
						onClick={() => unfriend(person.userId)}
					>
						Remove
					</button>
				) : (
					<button
						className="text-[#1732F7] text-xs md:text-sm hover:text-blue-500 shadow-lg bg-[#E2E5F3] font-bold py-1 md:py-2 px-8 rounded"
						onClick={sendFriendRequest}
					>
						Add
					</button>
				)}
			</div>
		</li>
	)
}

ExplorePerson.propTypes = {
	person: PropTypes.object
}

export default ExplorePerson