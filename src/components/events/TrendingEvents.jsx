import {
  DownloadIconSmall,
  BookmarkIconSmall,
  LocationPin,
  CalendarMini,
} from "@/components/Svgs"
import img from "@/assets/images/eventimg.png"
import { formatTime, formatTimestampToDate } from "../../utils/helpers"
import { useState, useEffect } from "react"
import { GET_ALL_PUBLIC_EVENTS_TO_JOIN, GET_TOP_EVENTS, SAVE_EVENT } from "../../constants/endpoints.constant"
import { useAuth } from "../../context/authContext"
import { useFetch } from "../../hooks/useFetch"
import { shuffleArray } from "../../utils/shuffleArray"
import CONFIG from "../../config"
import { BookmarkIconSmallFill } from "../Svgs"
import { toast } from "react-toastify"
import { PATH_NAMES } from "../../constants"
import { Link } from "react-router-dom"

const TrendingEvents = () => {
  const [allEvents, setAllEvents] = useState([])
  const { userId, token } = useAuth()
  const { sendRequest } = useFetch()

  const getAllEvents = () => {
    sendRequest(
      GET_ALL_PUBLIC_EVENTS_TO_JOIN,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    ).then(data => {
      setAllEvents(data?.content)
    })
  }

  const saveEvent = eventID => {
    sendRequest(
      SAVE_EVENT, "POST", {
      eventID,
      typeID: userId,
      type: "EVENT"
    }, {
      Authorization: `Bearer ${token}`,
    }).then(response => {
      if (response?.updated) {
        toast.success(response?.message)
      } else {
        toast.error(response?.message)
      }
    })
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <div className="mx-auto flex gap-6 flex-wrap">
      {allEvents.map(event => (
        <div className="mx-auto my-2 gap-4" key={event?.id}>
          <div className="border rounded-b-[32px] rounded-tl-[32px] w-96 px-2 py-4 gap-2">
            <div className="flex gap-2">
              <img
                src={`${CONFIG.RESOURCE_URL}/${event?.picUrls}`}
                alt=""
                className="rounded-b-[32px] rounded-tl-[32px] w-32"
              />

              <div className="grid gap-1 w-3/5">
                <div className="flex justify-between text-sm font-medium border-b py-2">
                  <Link to={`${PATH_NAMES.event}/${event?.id}`}>{event?.eventName}</Link>
                  <h2>${event?.maxPrice}</h2>
                </div>
                <div className="flex gap-1 text-chasescrollBrown font-medium text-xs items-center">
                  <CalendarMini />
                  <p>
                    {formatTimestampToDate(event?.startDate)}{" "}
                    <span className="px-2">at</span>
                    {formatTime(event?.startTime)}
                  </p>
                </div>

                <div className="flex justify-between text-xs border-b py-2">
                  <div className="flex gap-1 text-chasescrollBlue items-center">
                    <LocationPin />
                    <p>{event?.location.address}</p>
                  </div>

                  <div className="flex flex-row gap-1">
                    {/* <DownloadIconSmall /> */}
                    <div className="cursor-pointer" onClick={() => saveEvent(event?.id)}>
                      {event?.isSaved ? <BookmarkIconSmallFill /> : <BookmarkIconSmall />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrendingEvents
