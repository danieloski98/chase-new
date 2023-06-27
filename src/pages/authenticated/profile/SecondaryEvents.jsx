import React from "react"
import { CalendarIcon, LocationIcon_2 } from "@/components/Svgs"
import CONFIG from "../../../config"
import { formatDate } from "../../../utils/helpers"

const SecondaryEvents = ({ events }) => {
  return (
    <div className="mb-[100px] mx-auto flex flex-col gap-4">
      {events?.content?.map(
        (event) => (
          <div
            className="flex flex-col items-center justify-center p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full max-w-2xl mx-auto"
            key={event.id}
          >
            <div className="flex flex-col md:flex-row gap-6 w-full items-center">
              <div className="rounded-b-[32px] rounded-tl-[32px] h-40 w-40 overflow-hidden">
                <img
                  src={`${CONFIG.RESOURCE_URL}${event.currentPicUrl}`}
                  alt="descriptive photograph"
                  className=" w-full h-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-center md:text-left">
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
      )}
    </div>
  )
}

export default SecondaryEvents
