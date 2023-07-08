import React, { useEffect, useState } from 'react'
import { CalendarIcon, CaretLeftIcon, LocationIcon_2 } from '../Svgs'
import PageWrapper from '../PageWrapper'
import { PATH_NAMES } from '../../constants/paths.constant'
import CONFIG from '../../config'
import { Link } from 'react-router-dom'
import { formatTime, formatTimestampToDate } from '../../utils/helpers'
import { useAuth } from '../../context/authContext'
import { useFetch } from '../../hooks/useFetch'
import { GET_ALL_PUBLIC_EVENTS_TO_JOIN } from '../../constants/endpoints.constant'

const EventsToAdd = ({ addEvent, toggleEvents }) => {
	const [events, setEvents] = useState([])

	const { token, userId } = useAuth()
	const { sendRequest } = useFetch()

	const getAllEvents = () => {
		sendRequest(
			`${GET_ALL_PUBLIC_EVENTS_TO_JOIN}?createdBy=${userId}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		).then(data => {
			setEvents(data?.content)
		})
	}

	useEffect(() => {
		getAllEvents()
	}, [])
	return (
		<div className='flex flex-col gap-6'>
			<div className="flex gap-10 px-4 py-6">
				<span className="cursor-pointer" onClick={toggleEvents}>
					<CaretLeftIcon />
				</span>
				<p className='text-xl'>Choose event to add to your community</p>
			</div>
			<div className="flex flex-col">
				{events.map(event => (
					<div
						onClick={() => {
							addEvent(event?.id)
							toggleEvents()
						}}
						className="cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
						key={event?.id}
					>
						<div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2">
							<img
								src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
								alt="descriptive photograph"
								className="w-56 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]"
							/>
							<div className="flex flex-col gap-2">
								<h2 className="text-lg font-medium text-center md:text-left">
									{event?.eventName}
								</h2>
								<div className="flex">
									<span className="mr-1">
										<CalendarIcon />
									</span>
									<p className="text-gray-600 text-sm">
										{formatTimestampToDate(event?.startDate)}. {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
									</p>
								</div>
								<div className="flex items-center">
									<span className="mr-1">
										<LocationIcon_2 />
									</span>
									<p className="text-gray-600 text-sm">
										{event?.location?.address}
									</p>
								</div>
								<div className="flex items-center">
									{/* <div className="flex items-center mr-4">
                        <span className="mr-1">Category:</span>
                        <span className="text-blue-600">{event?.category}</span>
                      </div> */}
									<button className="bg-blue-100 text-blue-600 text-sm px-2">
										{event?.status}
									</button>
								</div>
								<p className="text-gray-600 text-sm flex items-center gap-2">
									Category: <span className=" text-blue-500 hover:text-blue-600 font-bold cursor-pointer">
										{event?.eventType}
									</span>
									<span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
										{event?.isOrganizer ? "Organizer" : "Attending"}
									</span>
								</p>

							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default EventsToAdd