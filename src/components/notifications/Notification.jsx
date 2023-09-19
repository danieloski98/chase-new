import React, { forwardRef, useEffect, useState } from 'react'
import CONFIG from '../../config'
import { READ_NOTIFICATIONS } from '../../constants/endpoints.constant'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../context/authContext'
import Toggle from 'react-toggle'
import ProfilePhoto from '../ProfilePhoto'
import { formatTimeAgo } from '../../utils/helpers'
import { Avatar } from '@chakra-ui/react'
import MyNetwork from '../../pages/authenticated/profile/MyNetwork'
import { useNavigate } from 'react-router-dom'

const Notification = forwardRef(({ notification, getNotifications, setShow, setType },ref) => {
	const [isRead, setIsRead] = useState(false) 
	const { token, setnotification, userId } = useAuth()
	const { sendRequest } = useFetch()

	const navigate = useNavigate()

	const toggleRead = async (item) => { 
		const notification = await sendRequest(
			`${READ_NOTIFICATIONS}?read=${!isRead}&notificationIDs=${item?.id}`,
			'PUT',
			null,
			{ Authorization: `Bearer ${token}` }
		)
		if (notification.updated) {
			setIsRead(state => !state)	
			console.log(item?.title);
			setType(item?.title)
			//setShow()  
			getNotifications() 	
		}

		if (item.type === 'CHAT') {
			navigate(`/message?messageId=${item.typeID}`);
		}
		if (item.type === 'FRIEND_REQUEST') {
			navigate(`/profile/${userId}?page=request`)
		}

	}

	useEffect(() => {
		setIsRead(notification.status === "READ")
	}, [notification])  

	return (
		<button ref={ref} onClick={() => toggleRead(notification)} className={`rounded-xl p-4 flex items-center justify-between w-full bg-chasescrollBlue ${isRead ? 'bg-opacity-5' : 'bg-opacity-20'}`}>
			<div className="flex items-center gap-4 max-w-[75%]">
				{/* <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${notification.createdBy.data.imgMain.value}`} /> */}
				<Avatar  
					onClick={setShow}
					src={`${CONFIG.RESOURCE_URL}/${notification?.createdBy?.data?.imgMain?.value}`}
					name={notification?.createdBy?.firstName+" "+notification?.createdBy?.lastName}
				/>
				<div className="flex flex-col w-full">
					<p className="font-bold text-left text-chasescrollDarkBlue text-lg">
						{notification.title} { notification.type === "CHAT" && <span>from {notification.createdBy.username}</span>}
					</p>
					<p className="text-chasescrollTextGrey text-left text-xs">
						{notification.message.length > 50 ? notification.message.slice(0, 50) + "..." : notification.message}
					</p>
				</div>
			</div>
			<p className="text-chasescrollBlue text-xs flex items-center gap-4">
				{formatTimeAgo(notification.createdDate)}
				{/* <Toggle
					checked={isRead}
					className="custom-classname"
					onChange={() => toggleRead(notification.id)}
				/> */}
			</p>
		</button>  
	)
})

export default Notification