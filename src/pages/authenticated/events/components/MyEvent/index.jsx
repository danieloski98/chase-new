import React from 'react'
import useInfinteScroller from '../../../../../hooks/useInfinteScroller'
import { formatTime, formatTimestampToDate } from '../../../../../utils/helpers'
import { Spinner } from "@chakra-ui/react";
import { useAuth } from '../../../../../context/authContext';
import { Link, useNavigate } from "react-router-dom"
import { PATH_NAMES } from '../../../../../constants/paths.constant';
import CONFIG from '../../../../../config';
import { BookmarkIcon, BookmarkIconFill, CalendarIcon, LocationIcon_2 } from "../../../../../components/Svgs"
import { useFetch } from '../../../../../hooks/useFetch';
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from 'react-query';

function MyEventTab() {
    
    const { userName, token, userId, setEventCategory } = useAuth()
    
    const [page, setPage] = React.useState(0) 

    const navigate = useNavigate()
    // '/events/events'+"?createdBy="+userId
    const { results, isLoading, lastChildRef, refetch } = useInfinteScroller({url: "/events/joined-events/"+userId, pageNumber:page, setPageNumber:setPage}) 
    
    // const { userId, token, eventCategory } = useAuth()
    const { sendRequest } = useFetch()

	const queryClient = useQueryClient() 


	const addfriend = useMutation({
		mutationFn: (data) => httpService.delete("/events/delete-event/"+eventID, data),
		onError: (error) => {
		  toast.error(error.response?.data?.message);
		},
		onSuccess: (data) => {
		  toast.success(data.data?.message)
		//   queryClient.invalidateQueries(['getconnect'])
		//   setLoading("0")
		}
	}); 

    const deleteEvent = async (eventID) => {
        // setLoading(userId)
        const data = await sendRequest(
            "/events/delete-event/"+eventID,
            "DELETE",
            null,
            { Authorization: `Bearer ${token}` }
        )
        if (data) {
          toast.success(data.message); 
          refetch() 
        }
    }

    return (
        <>
            {!isLoading && ( 
                <div className="mb-[100px] mx-auto">
                    {results.map((event, i) =>  { 
                    if (results.length === i + 1) {
                        return (
                        <div
                            ref={lastChildRef}
                            // to={`${PATH_NAMES.event}/${event.id}`}
                            className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
                            key={event?.id}
                        >
                            <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2"> 
                            <div  role='button' onClick={()=> navigate(`${PATH_NAMES.event}/${event.id}`)}  className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]">
                                {event?.currentPicUrl ? (
                                <img
                                    src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
                                    alt="descriptive photograph"
                                    className=" w-full h-full rounded-b-[32px] rounded-tl-[32px] object-cover "
                                />
                                ): (
                                <div className=" w-full h-full rounded-b-[32px] flex justify-center items-center rounded-tl-[32px] bg-slate-400" >
                                    <p className=" text-2xl capitalize " >{event?.eventName?.slice(0,2)}</p>
                                </div>
                                )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 role='button' onClick={()=> navigate(`${PATH_NAMES.event}/${event.id}`)} className="text-lg font-medium text-center md:text-left">
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
                                {!event?.ticketBought && (
                                    <svg xmlns="http://www.w3.org/2000/svg"  className=' fill-black w-6 ' viewBox="0 0 30 30" >    
                                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/>
                                    </svg>
                                )} 
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
                                    {event?.eventType?.replace("_", " ")}
                                </span>
                                <span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
                                    {event?.isOrganizer ? "Organizer" : "Attending"}
                                </span>
                                </p>

                            </div>
                            </div>
                        </div>
                        )} else {
                        return (
                        <div
                            // to={`${PATH_NAMES.event}/${event.id}`}
                            className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
                            key={event?.id}
                        >
                            <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2">
                            {/* <img
                                src={`${CONFIG.RESOURCE_URL}${event?.picUrls[0]}`}
                                alt="descriptive photograph"
                                className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]"
                            /> */}
                            <div role='button' onClick={()=> navigate(`${PATH_NAMES.event}/${event.id}`)} className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]">
                                {event?.currentPicUrl ? (
                                <img
                                    src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
                                    alt="descriptive photograph"
                                    className=" w-full h-full rounded-b-[32px] rounded-tl-[32px] object-cover "
                                />
                                ): (
                                <div className=" w-full h-full rounded-b-[32px] flex justify-center items-center rounded-tl-[32px] bg-slate-400" >
                                    <p className=" text-2xl capitalize " >{event?.eventName?.slice(0,2)}</p>
                                </div>
                                )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2  role='button' onClick={()=> navigate(`${PATH_NAMES.event}/${event.id}`)}  className="text-lg font-medium text-center md:text-left">
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
                                    {!event?.ticketBought && (
                                        <svg xmlns="http://www.w3.org/2000/svg"  className=' fill-black w-6 ' viewBox="0 0 30 30" >    
                                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/>
                                        </svg>
                                    )}  
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
                                    {event?.eventType?.replace("_", " ")}
                                </span>
                                <span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
                                    {event?.isOrganizer ? "Organizer" : "Attending"}
                                </span>
                                </p>

                            </div>
                            </div>
                        </div>
                    )} 
                    })}
                </div>
            )}
            {!isLoading && (
                <>
                    {results.length < 1 && ( 
                        <div className="w-full h-32 flex justify-center items-center">
                            <p className=" font-semibold " >No Records Found</p>
                        </div>
                    )}
                </>
            )}
            
            {isLoading && (
                <div className="w-full h-32 flex justify-center items-center">
                    <Spinner size='md' color='brand.chasescrollButtonBlue' />
                </div>
            )}
        </>
    )
}

export default MyEventTab
