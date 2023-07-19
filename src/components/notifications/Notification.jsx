import React, { useEffect, useState } from 'react'
import CONFIG from '../../config'
import { READ_NOTIFICATIONS } from '../../constants/endpoints.constant'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../context/authContext'
import Toggle from 'react-toggle'
import ProfilePhoto from '../ProfilePhoto'
import { formatTimeAgo } from '../../utils/helpers'
import { Avatar } from '@chakra-ui/react'

const Notification = ({ notification, getNotifications }) => {
	const [isRead, setIsRead] = useState(false)
	const { token } = useAuth()
	const { sendRequest } = useFetch()

	const toggleRead = async (id) => {
		const notification = await sendRequest(
			`${READ_NOTIFICATIONS}?read=${!isRead}&notificationIDs=${id}`,
			'PUT',
			null,
			{ Authorization: `Bearer ${token}` }
		)
		if (notification.updated) {
			setIsRead(state => !state)
			getNotifications()
		}
	}

	useEffect(() => {
		setIsRead(notification.status === "READ")
	}, [notification])

	return (
		<div className={`rounded-xl p-4 flex items-center justify-between w-full bg-chasescrollBlue ${isRead ? 'bg-opacity-5' : 'bg-opacity-20'}`}>
			<div className="flex items-center gap-4 max-w-[75%]">
				{/* <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${notification.createdBy.data.imgMain.value}`} /> */}
				<Avatar 
					src={`${CONFIG.RESOURCE_URL}/${notification.createdBy.data.imgMain.value}`}
					name={notification.title}
				/>
				<div className="flex flex-col">
					<p className="font-bold text-chasescrollDarkBlue text-lg">
						{notification.title}
					</p>
					<p className="text-chasescrollTextGrey text-xs">
						{notification.message}
					</p>
				A</div>
			</div>
			<p className="text-chasescrollBlue text-xs flex items-center gap-4">
				{formatTimeAgo(notification.createdDate)}
				{/* <Toggle
					checked={isRead}
					className="custom-classname"
					onChange={() => toggleRead(notification.id)}
				/> */}
			</p>
		</div>
	)
}

export default Notification