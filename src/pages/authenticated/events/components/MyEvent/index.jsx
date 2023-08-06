import React from 'react'
import useInfinteScroller from '../../../../../hooks/useInfinteScroller'
import { formatTime, formatTimestampToDate } from '../../../../../utils/helpers'
import { Spinner } from "@chakra-ui/react";
import { useAuth } from '../../../../../context/authContext';
import { Link } from "react-router-dom"
import { PATH_NAMES } from '../../../../../constants/paths.constant';
import CONFIG from '../../../../../config';
import { BookmarkIcon, BookmarkIconFill, CalendarIcon, LocationIcon_2 } from "../../../../../components/Svgs"

function MyEventTab() {
    
    const { userName, token, userId, setEventCategory } = useAuth()
    
    const [page, setPage] = React.useState(0) 

    const { results, isLoading, lastChildRef, refetch } = useInfinteScroller({url: "/events/joined-events/"+userId, pageNumber:page, setPageNumber:setPage})

    return (
        <>
            {!isLoading && ( 
                <div className="mb-[100px] mx-auto">
                    {results.map((event, i) =>  { 
                    if (results.length === i + 1) {
                        return (
                        <Link
                            ref={lastChildRef}
                            to={`${PATH_NAMES.event}/${event.id}`}
                            className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
                            key={event?.id}
                        >
                            <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2"> 
                            <div className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]">
                                {event?.picUrls?.length > 0 ? (
                                <img
                                    src={`${CONFIG.RESOURCE_URL}${event?.picUrls[0]}`}
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
                                    {event?.eventType?.replace("_", " ")}
                                </span>
                                <span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
                                    {event?.isOrganizer ? "Organizer" : "Attending"}
                                </span>
                                </p>

                            </div>
                            </div>
                        </Link>
                        )} else {
                        return (
                        <Link
                            to={`${PATH_NAMES.event}/${event.id}`}
                            className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
                            key={event?.id}
                        >
                            <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2">
                            {/* <img
                                src={`${CONFIG.RESOURCE_URL}${event?.picUrls[0]}`}
                                alt="descriptive photograph"
                                className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]"
                            /> */}
                            <div className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]">
                                {event?.picUrls?.length > 0 ? (
                                <img
                                    src={`${CONFIG.RESOURCE_URL}${event?.picUrls[0]}`}
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
                                    {event?.eventType?.replace("_", " ")}
                                </span>
                                <span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
                                    {event?.isOrganizer ? "Organizer" : "Attending"}
                                </span>
                                </p>

                            </div>
                            </div>
                        </Link>
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
