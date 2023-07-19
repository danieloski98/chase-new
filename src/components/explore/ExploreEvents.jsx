import EventBlob from "../../assets/svg/eventBlob.svg"
import { EVENTS_LIST } from "../../constants"
import { CalendarIcon, UploadIcon, LocationIcon_2, BookmarkIcon } from "../Svgs"
import { useNavigate } from 'react-router-dom'

const ExploreEvents = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="w-full max-w-xl mx-auto flex flex-col border rounded-3xl">
        {EVENTS_LIST.map(event => (
          <li key={event.id} className="border-b p-2 ">
            <div className="flex my-4 justify-between">
              <div className="flex justify-start">
                <img onClick={() => navigate(`/event/${event.id}`)} src={EventBlob} alt="profiles" className="w-full h-full cursor-pointer" />
              </div>

              <div>
                <div className="flex flex-col gap-4 w-full justify-end pl-4">
                  <h1 onClick={() => navigate(`/event/${event.id}`)}  className="border-b text-[10.5px] md:text-sm cursor-pointer">
                    {event.name}{" "}
                    <span className="pl-1 md:pl-4">{event.price}</span>
                  </h1>
                  <span className="flex gap-2 text-xs md:text-sm text-[#2E2B2B] text-opacity-[67%]">
                    <CalendarIcon /> {event.date}
                  </span>

                  <div className="flex md:gap-8">
                    <span className="flex gap-2 text-xs md:text-sm text-[#1732F7] font-bold">
                      <LocationIcon_2 /> {event.location}
                    </span>
                    <div className="flex gap-2">
                      <UploadIcon />
                      <BookmarkIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExploreEvents
