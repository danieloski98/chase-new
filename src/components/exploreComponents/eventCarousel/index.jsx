import React from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../Loader'
import { CustomCarousel } from '../../customCarousel'
import CONFIG from '../../../config'
import httpService from '../../../utils/httpService'
import { formatTimestampToDate } from '../../../utils/helpers'
import { PATH_NAMES } from '../../../constants/paths.constant'
import { LocationPin } from '../../../components/Svgs'
import { SAVE_EVENT } from '../../../constants/endpoints.constant'
import { useFetch } from '../../../hooks/useFetch'
import { useAuth } from '../../../context/authContext'

function EventCarousel() { 
        
    const [dataInfo, setData] = React.useState([])
    const navigate = useNavigate()
    const { userId, token } = useAuth()
    const { sendRequest } = useFetch()


    const [saved, setsaved] = React.useState(false)

    const unsaveEvent = eventID => {
        sendRequest("/events/remove-saved-event", "POST", {
            eventID: eventID ,
            typeID: userId,
            type: "EVENT"
        }, {
            Authorization: `Bearer ${token}`,
        }).then(response => {
            if (response?.updated) {
                toast.success(response?.message)
                setsaved(false)
            } else {
                toast.error(response?.message)
            }
        }) 
        
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
            if(response?.updated) {
                toast.success(response?.message) 
            } else {
                toast.error(response?.message)
            }
        })
    } 

    const handleEvent= item => {
        if(item?.isSaved){
            unsaveEvent(item?.id)
        } else {
            saveEvent(item?.id)
        }
    }

    // react query
    const { isLoading, isRefetching } = useQuery(['eventevents'], () => httpService.get('/events/events'), {
        onError: (error) => {
            toast.error(error.response?.data);
        }, 
        onSuccess: (data) => { 
            setData(data.data.content);
        }
    })   


    const EventInfo =(props)=> {

        const {
            item
        } = props

        return(
            <div role='button' onClick={() => navigate(`/events/${item.id}`)}  className="flex lg:h-auto flex-col pb-0 w-full relative "> 
                <div className="backdrop-blur-sm absolute inset-0 px-3 hidden lg:flex justify-center items-center rounded-tl-[32px] h-80">
                    <img
                        src={`${CONFIG.RESOURCE_URL}/${item?.currentPicUrl}`}
                        alt="Blurred Image"
                        className="h-80 blur-sm w-full object-cover rounded-tl-[16px]"
                    />
                </div>
                <img
                    src={`${CONFIG.RESOURCE_URL}/${item?.currentPicUrl}`}
                    alt=""
                    className={`w-full h-56 lg:h-80 z-30 rounded-tl-[36px] object-cover lg:object-contain ${
                        !item?.eventName ? "rounded-b-[36px]" : ""
                    }`}
                />

                <div className="absolute z-20  bottom-32 left-5 rounded-b-[32px] rounded-tl-[32px] shadow-2xl w-fit bg-white font-bold p-2">
                    <h1 className="text-base flex justify-center text-center max-w-[6rem] px-1">
                        {formatTimestampToDate(item?.startDate)}
                    </h1> 
                </div>
                <div className=' w-full px-7 bg-white pb-4 ' > 
                    <div className="flex justify-between text-lg font-bold mt-4">
                        <Link to={`${PATH_NAMES.event}/${item.id}`}>
                        <p className="  text-[20px] font-bold " >{item?.eventName}</p>  
                        </Link>
                        <h2>{item?.currency === "USD" ? "$" : "₦"}{item?.maxPrice}</h2>
                    </div>
                    <div className="flex gap-2 mt-1 text-chasescrollBrown font-medium text-sm items-center">
                        <LocationPin />
                        <p>{item?.location?.locationDetails ? (item?.location.locationDetails?.length >= 17 ? item?.location.locationDetails.slice(0, 17)+"..." : item?.location.locationDetails):
                            item?.location?.link ? (item?.location.link?.length >= 17 ? item?.location.link.slice(0, 17)+"..." : item?.location.link): ""}
                        </p>
                    </div>
                    <div className="flex justify-between mt-1 items-center">
                        {item?.interestedUsers.slice(0, 3).length && (
                            <div className="flex items-center justify-end">
                                <div
                                className={`w-auto flex items-center justify-end ${item?.interestedUsers.slice(3).length < 1 ? "mr-3" : "m-0"
                                    }`}
                                >
                                    {item?.interestedUsers.slice(0, 3).map(attendee => (
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

                        {/* <div className="flex flex-row gap-2"> 
                            <div className="cursor-pointer z-[50]" onClick={() => handleEvent(item)}>
                                {saved && 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"  fill='black' stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" fill='black' stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                }
                                {!saved && 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> 
                                } 
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
        
    return (  
        <div className=' relative w-full  lg:h-[450px] mt-8 ' >
            {(isLoading && isRefetching ) && (
                <Loader />
            )}
            {(!isLoading && !isRefetching )&& ( 
                <CustomCarousel slides={
                    dataInfo?.map((item, index)=> { 
                        return(  
                            <>   
                                <div key={index} role='button' onClick={() => navigate(`/events/${item.id}`)}  className="flex lg:h-auto flex-col pb-0 w-full relative "> 
                                    <div className="backdrop-blur-sm absolute inset-0 px-3 hidden lg:flex justify-center items-center rounded-tl-[32px] h-80">
                                        <img
                                            src={`${CONFIG.RESOURCE_URL}/${item?.currentPicUrl}`}
                                            alt="Blurred Image"
                                            className="h-80 blur-sm w-full object-cover rounded-tl-[16px]"
                                        />
                                    </div>
                                    <img
                                        src={`${CONFIG.RESOURCE_URL}/${item?.currentPicUrl}`}
                                        alt=""
                                        className={`w-full h-56 lg:h-80 z-30 rounded-tl-[36px] object-cover lg:object-contain ${
                                            !item?.eventName ? "rounded-b-[36px]" : ""
                                        }`}
                                    />

                                    <div className="absolute z-20  bottom-32 left-5 rounded-b-[32px] rounded-tl-[32px] shadow-2xl w-fit bg-white font-bold p-2">
                                        <h1 className="text-base flex justify-center text-center max-w-[6rem] px-1">
                                            {formatTimestampToDate(item?.startDate)}
                                        </h1> 
                                    </div>
                                    <div className=' w-full px-7 bg-white pb-4 ' > 
                                        <div className="flex justify-between text-lg font-bold mt-4">
                                            <Link to={`${PATH_NAMES.event}/${item.id}`}>
                                            <p className="  text-[20px] font-bold " >{item?.eventName}</p>  
                                            </Link>
                                            <h2>{item?.currency === "USD" ? "$" : "₦"}{item?.maxPrice}</h2>
                                        </div>
                                        <div className="flex gap-2 mt-1 text-chasescrollBrown font-medium text-sm items-center">
                                            <LocationPin />
                                            <p>{item?.location?.locationDetails ? (item?.location.locationDetails?.length >= 17 ? item?.location.locationDetails.slice(0, 17)+"..." : item?.location.locationDetails):
                                                item?.location?.link ? (item?.location.link?.length >= 17 ? item?.location.link.slice(0, 17)+"..." : item?.location.link): ""}
                                            </p>
                                        </div>
                                        <div className="flex justify-between mt-1 items-center">
                                            {item?.interestedUsers.slice(0, 3).length && (
                                                <div className="flex items-center justify-end">
                                                    <div
                                                    className={`w-auto flex items-center justify-end ${item?.interestedUsers.slice(3).length < 1 ? "mr-3" : "m-0"
                                                        }`}
                                                    >
                                                        {item?.interestedUsers.slice(0, 3).map(attendee => (
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

                                            {/* <div className="flex flex-row gap-2"> 
                                                <div className="cursor-pointer z-[50]" onClick={() => handleEvent(item)}>
                                                    {saved && 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"  fill='black' stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" fill='black' stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    }
                                                    {!saved && 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg> 
                                                    } 
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                } autoplay={true} interval={5000}  />
            )} 
            
        </div>
    )
}

export default EventCarousel
