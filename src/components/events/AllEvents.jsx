import React, { useState, useEffect } from "react"
import { EVENT_CATEGORY } from "@/constants"
import { NewDownloadIcon, BookmarkIcon, LocationPin } from "@/components/Svgs"
import { GET_ALL_PUBLIC_EVENTS_TO_JOIN, SAVE_EVENT } from "../../constants/endpoints.constant"
import { useAuth } from "../../context/authContext"
import { useFetch } from "../../hooks/useFetch"
import CONFIG from "../../config"
import { formatTimestampToDate } from "../../utils/helpers"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "../../constants/paths.constant"
import { toast } from "react-toastify"
import { BookmarkIconFill } from "../Svgs"

const AllEvents = () => {
  const [count, setCount] = useState(0)

  const [allEvents, setAllEvents] = useState([])
  const { userId, token } = useAuth()
  const { sendRequest } = useFetch()

  const getAllEvents = async () => {
    const allEvents = await sendRequest(
      GET_ALL_PUBLIC_EVENTS_TO_JOIN,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (allEvents && allEvents.content) {
      setAllEvents(allEvents.content)
    }
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

  useEffect(() => {
    // setCount(count => count + 1)
    if (count === allEvents.length) {
      setCount(0)
    }
    if (count < 0) {
      setCount(allEvents.length - 1)
    }
  }, [count])

  return (
    // Wrapper
    <div className="h-[50vh] sm:h-[80vh] md:h-[65vh] w-full flex justify-center items-center relative md:w-[80vw] overflow-hidden">
      {allEvents.map((item, index) => {
        const {
          location,
          startDate,
          id,
          picUrls,
          currentPicUrl,
          endDate,
          maxPrice,
          eventName,
          currency,
          interestedUsers,
          productTypeData,
        } = item
        const next =
          "translate-x-[100%] scale-[0.8] opacity-[0] ease-in-out duration-200 md:opacity-[1]"
        const prev =
          "-translate-x-[100%] scale-[0.8] opacity-[0] ease-in-out duration-200 md:opacity-[1]"
        const active =
          "translate-x-0 opacity-[1] scale-[0.9] ease-in-out duration-200"
        let position = "translate-x-[200%] opacity-[0] ease-in-out duration-200"
        if (count === index) {
          position = active
        }
        if (index === count - 1) {
          position = prev
        }
        if (index === count + 1) {
          position = next
        }
        if (count === 0 && index === allEvents.length - 1) {
          position = prev
        }
        // let position = `translate-x-[${index * 100}%]`

        return (
          // Single components
          <div
            to={`${PATH_NAMES.event}/${item.id}`}
            key={id}
            className={`border rounded-b-[32px] rounded-tl-[32px] w-full md:w-2/4 px-6 py-4 mx-auto grid gap-2 absolute ${position}`}
          >
            <div className="relative">
              <div className="rounded-b-[32px] rounded-tl-[32px] overflow-hidden">
                <img
                  src={`${CONFIG.RESOURCE_URL}${currentPicUrl}`}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="absolute bottom-5 left-5 rounded-bl-[32px] rounded-tl-sm w-fit bg-white font-bold p-2">
                <h1 className="text-xl max-w-[6rem] px-2">
                  {formatTimestampToDate(startDate)}
                </h1>
                {/* <h2 className="text-center text-xl">
                  {formatTimestampToDate(endDate)}
                </h2> */}
              </div>
            </div>

            <div className="flex justify-between text-lg font-medium">
              <Link to={`${PATH_NAMES.event}/${item.id}`}>{eventName}</Link>
              <h2>{currency === "USD" ? "$" : "₦"}{maxPrice}</h2>
            </div>
            <div className="flex gap-2 text-chasescrollBrown items-center">
              <LocationPin />
              <p>{location.address}</p>
            </div>

            <div className="flex justify-between items-center">
              {interestedUsers.slice(0, 3).length && (
                <div className="flex items-center justify-end">
                  <div
                    className={`w-fit flex items-center justify-end ${interestedUsers.slice(3).length < 1 ? "mr-3" : "m-0"
                      }`}
                  >
                    {interestedUsers.slice(0, 3).map(attendee => (
                      <div className="w-8 h-8 -mr-3">
                        {/* <img
                          key={attendee.id}
                          src={`${CONFIG.RESOURCE_URL}${attendee.data.imgMain.value}`}
                          className="w-8 h-8 -mr-3 rounded-b-full rounded-tl-full"
                          alt=""
                        /> */}
                      </div>
                    ))}

                  </div>
                  &nbsp;&nbsp;
                  <p className="text-chasescrollDarkBlue">Interested</p>
                </div>
              )}

              <div className="flex flex-row gap-2">
                {/* <NewDownloadIcon /> */}
                <div className="cursor-pointer" onClick={() => saveEvent(event?.id)}>
                  {item?.isSaved ? <BookmarkIconFill /> : <BookmarkIcon />}
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div className="absolute bottom-0 w-[30px] flex justify-between">
        <button
          className="w-[10px] h-[10px] bg-red-500 rounded-full"
          onClick={() => setCount(state => state - 1)}
        ></button>
        <button
          className="w-[10px] h-[10px] bg-blue-500 rounded-full"
          onClick={() => setCount(state => state + 1)}
        ></button>
      </div>
    </div>
  )
}

export default AllEvents
