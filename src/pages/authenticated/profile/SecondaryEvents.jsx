import React from "react"
import { CalendarIcon, LocationIcon_2 } from "@/components/Svgs"
import CONFIG from "../../../config"
import { formatDate } from "../../../utils/helpers"
import { Avatar } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import useInfinteScroller from "../../../hooks/useInfinteScroller"

const SecondaryEvents = ({ events }) => {
  const navigate = useNavigate();


  const [page, setPage] = React.useState(0)

  const { userId } = useParams() 

  const { results, isLoading, lastChildRef } = useInfinteScroller({url:'/events/joined-events/'+userId, pageNumber:page, setPageNumber:setPage})

  // console.log(data);

  return (
    <div className="mb-[100px] mx-auto flex flex-col gap-4">
      {results?.map(
        (event, i) => {
          if (results?.length === i + 1) {
            return (
              <div
                className="flex flex-col items-center justify-center p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full max-w-2xl mx-auto"
                key={event.id}
                ref={lastChildRef}
              >
                <div className="flex flex-col md:flex-row gap-6 w-full items-center">
                  <div className="rounded-b-[32px] rounded-tl-[32px] h-40 w-40 overflow-hidden">
                    <img
                      src={`${CONFIG.RESOURCE_URL}${event.currentPicUrl}`}
                      alt="descriptive photograph"
                      className=" w-full h-full cursor-pointer object-cover"
                      onClick={() => navigate(`/event/${event.id}`)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="text-lg font-medium text-center md:text-left cursor-pointer">
                      {event.eventName}
                    </h2>
                    <div className="flex">
                      <span className="mr-1">
                        <CalendarIcon />
                      </span>
                      <p className="text-gray-600 text-sm">{formatDate(new Date(event.startDate))}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">
                        <LocationIcon_2 />
                      </span>
                      <p className="text-blue-600 text-sm">{event.location.address ?? event.location.link}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <span className="mr-1">Category:</span>
                        <span className="text-blue-600">{event.eventType}</span>
                      </div>
                    </div>
                    <span className=" text-blue-500 hover:text-blue-600 font-bold w-fit cursor-pointer">
                      View Ticket
                    </span>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div
                className="flex flex-col items-center justify-center p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full max-w-2xl mx-auto"
                key={event.id}
              >
                <div className="flex flex-col md:flex-row gap-6 w-full items-center">
                  <div className="rounded-b-[32px] rounded-tl-[32px] h-40 w-40 overflow-hidden">
                    <img
                      src={`${CONFIG.RESOURCE_URL}${event.currentPicUrl}`}
                      alt="descriptive photograph"
                      className=" w-full h-full cursor-pointer object-cover"
                      onClick={() => navigate(`/event/${event.id}`)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="text-lg font-medium text-center md:text-left cursor-pointer">
                      {event.eventName}
                    </h2>
                    <div className="flex">
                      <span className="mr-1">
                        <CalendarIcon />
                      </span>
                      <p className="text-gray-600 text-sm">{formatDate(new Date(event.startDate))}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">
                        <LocationIcon_2 />
                      </span>
                      <p className="text-blue-600 text-sm">{event.location.address ?? event.location.link}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <span className="mr-1">Category:</span>
                        <span className="text-blue-600">{event.eventType}</span>
                      </div>
                    </div>
                    <span className=" text-blue-500 hover:text-blue-600 font-bold w-fit cursor-pointer">
                      View Ticket
                    </span>
                  </div>
                </div>
              </div>
            )
          }
      })}
    </div>
  )
}

export default SecondaryEvents
