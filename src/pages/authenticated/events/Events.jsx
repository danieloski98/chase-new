import React, { useState, useEffect } from "react"
import PageWrapper from "@/components/PageWrapper"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "@/constants/paths.constant"
import Event from "@/components/events/Event"
import Category from "@/components/events/Category"
import TrendingEvents from "@/components/events/TrendingEvents"
import { FindEvent } from "@/components/Svgs"
import { EVENT_CATEGORY } from "@/constants"
import AllEvents from "@/components/events/AllEvents"
import CONFIG from "@/config"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import {
  GET_EVENTS_TYPES,
  GET_JOINED_EVENTS,
  GET_PAST_EVENTS,
  GET_SAVED_EVENTS,
  GET_TOP_EVENTS,
  REMOVE_SAVED_EVENT,
  SAVE_EVENT,
} from "../../../constants/endpoints.constant"
import { BookmarkIcon, BookmarkIconFill, CalendarIcon, LocationIcon_2 } from "../../../components/Svgs"
import { EventList2 } from "../../../constants"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import { formatTime, formatTimestampToDate } from "../../../utils/helpers"
import { toast } from "react-toastify"
import EventTiles from "../../../components/eventTiles"
import Loader from "../../../components/Loader"

const Events = () => {
  const [category, setCategory] = useState([])
  const [filter, setFilter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState("")

  const EVENTS_ARRAY = Array(1).fill(<TrendingEvents />)

  const [myEvents, setMyEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [topEvents, setTopEvents] = useState([])
  const [savedEvents, setSavedEvents] = useState([])
  const { userName, token, userId, setEventCategory } = useAuth()
  const { sendRequest } = useFetch()

  const getMyEvents = async () => {
    const myEvents = await sendRequest(
      `${GET_JOINED_EVENTS}${userId}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (myEvents && myEvents.content) {
      setMyEvents(myEvents.content)
    }
  }

  const getEventsCategory = () => {
    sendRequest(
      GET_EVENTS_TYPES,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    ).then((data) => {
      setCategory(data)
      // setFilter(data[0])
    })
  }

  const getPastEvents = async () => {
    const pastEvents = await sendRequest(
      GET_PAST_EVENTS,
      "GET",
      null,
      { Authorization: `Bearer ${token}` })
    if (pastEvents && pastEvents.content) {
      setPastEvents(pastEvents.content)
    }
  }

  const getSavedEvents = async () => {
    setLoading(true)
    const savedEvents = await sendRequest(
      `${GET_SAVED_EVENTS}?typeID=${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (savedEvents && savedEvents.content) {
      setSavedEvents(savedEvents.content)
    } 
    setLoading(false)
  }

  const unSaveEvent = eventID => {
    sendRequest(
      REMOVE_SAVED_EVENT,
      "DELETE",
      {
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
      getSavedEvents()
    })
  }


  const handleViewChange = ({ target: { value } }) => {
    setView(value)
    getPastEvents()
    getSavedEvents()
  }
  
  useEffect(() => {
    getMyEvents()
    getPastEvents()
    getSavedEvents()
    getEventsCategory()
  }, [view])

  useEffect(()=> {
    setEventCategory(filter)
  }, [filter])

  const splideOptions = {
    type: "loop",
    arrows: false,
    focus: "center",
    autoplay: true,
    padding: "5rem",
    delay:"5000"
  }

  return (
    <PageWrapper>
      {() => (
        <div className="flex flex-col gap-2 pb-32 md:pb-16">
          <div className="flex justify-between items-center mt-5 px-4 lg:px-8">
            <select
              className="text-base font-bold !bg-white py-4 outline-none"
              onChange={handleViewChange}
            >
              <option value="">Find Events</option>
              <option value="My Events">My Events</option>
              <option value="Passed Events">Past Events</option>
              <option value="Saved Events">Saved Events</option>
            </select>
            <Link to={PATH_NAMES.createEvent}>
              <FindEvent />
            </Link>
          </div>

          {view === "" && (
            <>
              <div>
                <div className="flex justify-between">
                  <h3 className="text-base font-medium mt-4 mb-6 pl-8">Event Category</h3> 
                </div>
                <Category
                  category={category}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
              {!filter && ( 
                <div className=" w-full lg:block hidden " > 
                  <AllEvents /> 
                </div>
              )}
              <TrendingEvents />
            </>
          )}

          {view === "My Events" && (
            <div className="mb-[100px] mx-auto">
              {myEvents.map(event => (
                <Link
                  to={`${PATH_NAMES.event}/${event.id}`}
                  className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
                  key={event?.id}
                >
                  <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2">
                    <img
                      src={`${CONFIG.RESOURCE_URL}${event?.picUrls[0]}`}
                      alt="descriptive photograph"
                      className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]"
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
                </Link>
              ))}
            </div>
          )}

          {view === "Past Events" && (
            <div className="mb-[100px] mx-auto">
              {pastEvents.map(event => (
                <div
                  className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-fit mx-auto"
                  key={event?.id}
                >
                  <div className="flex flex-col md:flex-row gap-10 w-full items-center mb-2">
                    <div className="rounded-b-[32px] rounded-tl-[32px] h-[130px] w-[200px] overflow-hidden">
                      <img
                        src={event?.picUrls[0]}
                        alt="descriptive photograph"
                        className=" w-full h-full "
                      />
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
                        <p className="text-gray-600 text-sm capitalize">
                          {event?.locationType}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <span className="mr-1">Category:</span>
                          <span className="text-blue-600">
                            {event?.eventType}
                          </span>
                        </div>
                        <button className="bg-blue-100 text-blue-600 text-sm px-2">
                          {event?.status}
                        </button>
                      </div>
                      <div className=" text-blue-500 hover:text-blue-600 font-bold py-2 px-4 rounded cursor-pointer">
                        View Ticket
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "Saved Events" && (
            <div className="mb-[100px] flex flex-col gap-5 mx-auto">
              {loading && (
                <Loader />
              )}
              {!loading && (
                <> 
                  {savedEvents.map(event => (
                    <EventTiles event={event} getdata={getSavedEvents}  />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

export default Events

