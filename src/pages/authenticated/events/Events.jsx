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
// import { toast } from "react-toastify"
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
import useInfinteScroller from "../../../hooks/useInfinteScroller"
import { Spinner } from "@chakra-ui/react";
import MyEventTab from "./components/MyEvent"
import PastEventsTab from "./components/PastEvent"
import SavedEventTab from "./components/SavedEvent"
import EventCarousel from "../../../components/exploreComponents/eventCarousel"

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
  const [newUrl, setNewUrl] = useState("")
  const { userName, token, userId, setEventCategory } = useAuth()
  const { sendRequest } = useFetch()

  const getMyEvents = React.useCallback(async () => {
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
  }, [sendRequest, token, userId])

  const getEventsCategory = React.useCallback(() => {
    sendRequest(
      GET_EVENTS_TYPES,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    ).then((data) => {
      setCategory(data)
      // setFilter(data[0])
    })
  }, [sendRequest, token])

  const getPastEvents = React.useCallback(async () => {
    sendRequest(
      GET_PAST_EVENTS,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
      ).then((data) => { 
        setPastEvents(data?.content)
        // setFilter(data[0])
      })
      // console.log(pastEvents);
    // if (pastEvents.content) {
    //   console.log(pastEvents);
    //   setPastEvents(pastEvents.content)
    // }
  }, [sendRequest, token])

  const getSavedEvents = React.useCallback(async () => {
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
  }, [sendRequest, token, userId])

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
    refetch()
    getPastEvents()
    getSavedEvents()
  }
  
  useEffect(() => {
    getMyEvents()
    getPastEvents()
    getSavedEvents()
    getEventsCategory()
  }, [getEventsCategory, getMyEvents, getPastEvents, getSavedEvents, view])

  useEffect(()=> {
    setEventCategory(filter)
  }, [filter, setEventCategory])

  const splideOptions = {
    type: "loop",
    arrows: false,
    focus: "center",
    autoplay: true,
    padding: "5rem",
    delay:"5000"
  }

  const [page, setPage] = useState(0) 

  const { results, isLoading, lastChildRef, refetch } = useInfinteScroller({url: newUrl, pageNumber:page, setPageNumber:setPage})

  React.useEffect(()=> {
      if(view === "Saved Events"){
        setNewUrl("/events/get-saved-events?typeID="+userId)
      } else if (view === "My Events"){
        setNewUrl("/events/joined-events/"+userId)
      } else {
        setNewUrl("/events/get-past-events")
      }
      refetch()
  }, [refetch, userId, view]) 

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
            <Link to={PATH_NAMES.createEvent} className=" flex items-center gap-3 " > 
              <FindEvent />
              Create Events
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
                <div className=" w-full mt-12 lg:block hidden " > 
                  <EventCarousel />
                </div>
              )}
              <TrendingEvents />
            </>
          )}

          {view === "My Events" && (
            <MyEventTab />
          )}

          {view === "Passed Events" && (
            <PastEventsTab />
          )}

          {view === "Saved Events" && (
            <SavedEventTab />
          )}
          {/* {!isLoading && (
            <>  
              {view === "Saved Events" && (
                <div className="mb-[100px] flex flex-col gap-5 mx-auto">  
                  {results.map((event, i) => { 
                    if (results.length === i + 1) {
                      return( 
                        <EventTiles event={event} ref={lastChildRef} getdata={getSavedEvents}  />
                      )
                    } else {
                      return( 
                        <EventTiles event={event} getdata={getSavedEvents}  />
                      )
                    }
                  })} 
                </div>
              )}

            </>
          )} */}
          {/* {!isLoading && (
            <>
              {results.length < 0 && (

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
          )} */}
        </div>
      )}
    </PageWrapper>
  )
}

export default Events



// {view === "My Events" && (
//   <div className="mb-[100px] mx-auto">
//     {results.map((event, i) =>  { 
//       if (results.length === i + 1) {
//         return (
//           <Link
//             ref={lastChildRef}
//             to={`${PATH_NAMES.event}/${event.id}`}
//             className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
//             key={event?.id}
//           >
//             <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2"> 
//               <div className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]">
//                 {event?.picUrls?.length > 0 ? (
//                   <img
//                     src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
//                     alt="descriptive photograph"
//                     className=" w-full h-full rounded-b-[32px] rounded-tl-[32px] object-cover "
//                   />
//                 ): (
//                   <div className=" w-full h-full rounded-b-[32px] flex justify-center items-center rounded-tl-[32px] bg-slate-400" >
//                     <p className=" text-2xl capitalize " >{event?.eventName?.slice(0,2)}</p>
//                   </div>
//                 )
//                 }
//               </div>
//               <div className="flex flex-col gap-2">
//                 <h2 className="text-lg font-medium text-center md:text-left">
//                   {event?.eventName}
//                 </h2>
//                 <div className="flex">
//                   <span className="mr-1">
//                     <CalendarIcon />
//                   </span>
//                   <p className="text-gray-600 text-sm">
//                     {formatTimestampToDate(event?.startDate)}. {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="mr-1">
//                     <LocationIcon_2 />
//                   </span>
//                   <p className="text-gray-600 text-sm">
//                     {event?.location?.address}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   {/* <div className="flex items-center mr-4">
//                   <span className="mr-1">Category:</span>
//                   <span className="text-blue-600">{event?.category}</span>
//                 </div> */}
//                   <button className="bg-blue-100 text-blue-600 text-sm px-2">
//                     {event?.status}
//                   </button>
//                 </div>
//                 <p className="text-gray-600 text-sm flex items-center gap-2">
//                   Category: <span className=" text-blue-500 hover:text-blue-600 font-bold cursor-pointer">
//                     {event?.eventType?.replace("_", " ")}
//                   </span>
//                   <span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
//                     {event?.isOrganizer ? "Organizer" : "Attending"}
//                   </span>
//                 </p>

//               </div>
//             </div>
//           </Link>
//         )} else {
//         return (
//           <Link
//             to={`${PATH_NAMES.event}/${event.id}`}
//             className="flex flex-col items-center justify-center mb-4 py-4 px-6 bg-white shadow rounded-b-[32px] rounded-tl-[32px] w-full mx-auto max-w-xl"
//             key={event?.id}
//           >
//             <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-2">
//               {/* <img
//                 src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
//                 alt="descriptive photograph"
//                 className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]"
//               /> */}
//               <div className="w-44 h-40 object-cover rounded-b-[32px] rounded-tl-[32px]">
//                 {event?.picUrls?.length > 0 ? (
//                   <img
//                     src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
//                     alt="descriptive photograph"
//                     className=" w-full h-full rounded-b-[32px] rounded-tl-[32px] object-cover "
//                   />
//                 ): (
//                   <div className=" w-full h-full rounded-b-[32px] flex justify-center items-center rounded-tl-[32px] bg-slate-400" >
//                     <p className=" text-2xl capitalize " >{event?.eventName?.slice(0,2)}</p>
//                   </div>
//                 )
//                 }
//               </div>
//               <div className="flex flex-col gap-2">
//                 <h2 className="text-lg font-medium text-center md:text-left">
//                   {event?.eventName}
//                 </h2>
//                 <div className="flex">
//                   <span className="mr-1">
//                     <CalendarIcon />
//                   </span>
//                   <p className="text-gray-600 text-sm">
//                     {formatTimestampToDate(event?.startDate)}. {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="mr-1">
//                     <LocationIcon_2 />
//                   </span>
//                   <p className="text-gray-600 text-sm">
//                     {event?.location?.address}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   {/* <div className="flex items-center mr-4">
//                   <span className="mr-1">Category:</span>
//                   <span className="text-blue-600">{event?.category}</span>
//                 </div> */}
//                   <button className="bg-blue-100 text-blue-600 text-sm px-2">
//                     {event?.status}
//                   </button>
//                 </div>
//                 <p className="text-gray-600 text-sm flex items-center gap-2">
//                   Category: <span className=" text-blue-500 hover:text-blue-600 font-bold cursor-pointer">
//                     {event?.eventType?.replace("_", " ")}
//                   </span>
//                   <span className="bg-chasescrollBgBlue text-chasescrollBlue px-2 py-1 rounded-md">
//                     {event?.isOrganizer ? "Organizer" : "Attending"}
//                   </span>
//                 </p>

//               </div>
//             </div>
//           </Link>
//       )} 
//     })}
//   </div>
// )}