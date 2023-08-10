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
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { Avatar } from "@chakra-ui/react"

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
      eventID: eventID,
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
    const splideOptions = {
      type: "loop",
      arrows: false,
      focus: "center",
      autoplay: true,
      padding: "5rem",
      delay:"5000"
    }


  const unsaveEvent = eventID => {
    sendRequest(
      "/events/remove-saved-event", "POST", {
      eventID: eventID ,
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
    getAllEvents()
  }

  const handleEvent= item => {
    if(item?.isSaved){
      unsaveEvent(item?.id)
    } else {
      saveEvent(item?.id)
    }
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  let t1

  useEffect(() => {
    // setCount(count => count + 1)
    if (count === allEvents.length) {
      setCount(0)
    }
    if (count < 0) {
      setCount(allEvents.length - 1)
    }
    clearTimeout(t1);
  }, [count])
  // useEffect(()=> { 
  //   setTimeout(() => {  
  //     setCount(state => state + 1)
  //     clearTimeout(t1);
  //   }, 6000);  
  // }, [count])

  return (
    // Wrapper
    // <div className=" h-[70vh] sm:h-[80vh] md:h-[65vh] w-full py-6 gap-4 flex justify-center items-center relative md:w-[80vw] overflow-hidden">
    //   
    //   <div className="absolute bottom-0 w-[30px] flex justify-between">
    //     <button
    //       className="w-[10px] h-[10px] bg-red-500 rounded-full"
    //       onClick={() => setCount(state => state - 1)}
    //     ></button>
    //     <button
    //       className="w-[10px] h-[10px] bg-blue-500 rounded-full"
    //       onClick={() => setCount(state => state + 1)}
    //     ></button>
    //   </div>
    // </div>

    <Splide aria-label="My Favorite Images" options={splideOptions}>
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
        // const next =
        //   "translate-x-[100%] scale-[0.8] opacity-[0] ease-in-out duration-200 md:opacity-[1]"
        // const prev =
        //   "-translate-x-[100%] scale-[0.8] opacity-[0] ease-in-out duration-200 md:opacity-[1]"
        // const active =
        //   "translate-x-0 opacity-[1] scale-[0.9] ease-in-out duration-200"
        // let position = "translate-x-[200%] opacity-[0] ease-in-out duration-200"
        // if (count === index) {
        //   position = active
        // }
        // if (index === count - 1) {
        //   position = prev
        // }
        // if (index === count + 1) {
        //   position = next
        // }
        // if (count === 0 && index === allEvents.length - 1) {
        //   position = prev
        // }
        // let position = `translate-x-[${index * 100}%]`

        return (
          // Single components

          <SplideSlide
            key={id}
            className="flex items-center flex-col w-full cursor-pointer lg:px-7 "> 
            <div className=" w-full  border rounded-b-[32px] rounded-tl-[32px] px-6 pt-3 pb-5  " >
              <div className="relative w-full ">
                <div className="rounded-b-[32px] w-full rounded-tl-[32px] overflow-hidden">
                  <img
                    src={`${CONFIG.RESOURCE_URL}${currentPicUrl}`}
                    alt=""
                    className="w-full h-[300px] object-cover "
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

              <div className="flex justify-between text-lg font-bold mt-4">
                <Link to={`${PATH_NAMES.event}/${item.id}`}>
                  <p className="  text-[20px] font-bold " >{eventName}</p>  
                </Link>
                <h2>{currency === "USD" ? "$" : "₦"}{maxPrice}</h2>
              </div>
              <div className="flex gap-2 text-chasescrollBrown font-medium text-sm items-center">
                <LocationPin />
                <p>{location.address}</p>
              </div>

              <div className="flex justify-between items-center">
                {interestedUsers.slice(0, 3).length && (
                  <div className="flex items-center justify-end">
                    <div
                      className={`w-auto flex items-center justify-end ${interestedUsers.slice(3).length < 1 ? "mr-3" : "m-0"
                        }`}
                    >
                      {interestedUsers.slice(0, 3).map(attendee => (
                        <div className="w-8 h-8 -mr-3">
                          {attendee?.data?.imgMain?.value ?
                            <img
                              key={attendee.id}
                              src={`${CONFIG.RESOURCE_URL}${attendee?.data?.imgMain?.value}`}
                              className="w-8 h-8 -mr-4 rounded-b-full rounded-tl-full"
                              alt=""
                            /> :   
                            <div className="w-8 h-8 -mr-4 rounded-b-full rounded-tl-full bg-yellow-500  flex justify-center items-center">
                              <p className=" font-extrabold text-sm text-black capitalize " >{attendee?.firstName?.slice(0, 1)}</p> 
                              <p className=" font-extrabold text-sm text-black capitalize " >{attendee?.lastName?.slice(0, 1)}</p>
                            </div> 
                          }
                        </div>
                      ))}

                    </div>
                    &nbsp;&nbsp;
                    <p className="text-chasescrollDarkBlue">Interested</p>
                  </div>
                )}

                <div className="flex flex-row gap-2"> 
                  <div className="cursor-pointer" onClick={() => handleEvent(item)}>
                    {item.isSaved && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"  fill='black' stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" fill='black' stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    }
                    { !item.isSaved && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg> 
                    }
                    {/* {item?.isSaved ? <BookmarkIconFill /> : <BookmarkIcon />} */}
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
          // <div
          //   to={`${PATH_NAMES.event}/${item.id}`}
          //   key={id}
          //   className={`border rounded-b-[32px] rounded-tl-[32px] w-full md:w-[70%] px-6 py-4 grid absolute ${position}`}
          // >
          // </div>
        )
      })}
    </Splide>
  )
}

export default AllEvents
