import React from "react"
import { CalendarIcon, LocationIcon_2 } from "@/components/Svgs"
import CONFIG from "../../../config"
import { formatDate } from "../../../utils/helpers"
import { Avatar } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import useInfinteScroller from "../../../hooks/useInfinteScroller"
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import DownloadTicketModal from "../../../components/explore/modals/DownloadTicketModal"
import { EVENT_TYPE } from "../../../constants"

const SecondaryEvents = ({ events }) => {
  const navigate = useNavigate();


  const [page, setPage] = React.useState(0)

  const { userId } = useParams() 
  const { token, setEventData } = useAuth()

  const [proceedWithDownload, setProceedWithDownload] = React.useState(false)
  const { results, isLoading, lastChildRef } = useInfinteScroller({url:'/events/joined-events/'+userId, pageNumber:page, setPageNumber:setPage})

  const viewTicket = () => setProceedWithDownload(false) 
  const handleClose = () => {
    setProceedWithDownload(false) 
  }
  // console.log(data);
  const [ticketinfo , setticketinfo] = React.useState({})  
  const { sendRequest } = useFetch()

  const [userInfo , setUserInfo] = React.useState({})  

  const [ eventInfo , setEventInfo] = React.useState({})  

  const [eventId , setEventId] = React.useState("")  

  const clickHandler =(item)=> {
    setEventId(item.id)
    setProceedWithDownload(true)
    setEventInfo(item)
  }

  const fetchProfileInfo = async () => {
    const data = await sendRequest(
      "/user/publicprofile/"+userId,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    ) 
    if(data){ 

      setUserInfo(data) 
    }
  }   

  const getEventTicket = () => {
      
    sendRequest(
        `/events/get-users-tickets?userID=${userId}&eventID=${eventId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      ).then((data) => { 
        setticketinfo(data?.content) 
      }) 
  }
  
  React.useEffect(()=>{
    getEventTicket() 
  }, [eventInfo?.id]) 


  React.useEffect(()=>{ 
    fetchProfileInfo()
  }, []) 

  const EventInfo =(props)=> {    
    const {
      item,
      index,
      user
    } = props

    const { userId } = useAuth()

    return(
      <div
        className="flex flex-col items-center justify-center p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full"
      >
        <div className="flex flex-col md:flex-row gap-6 w-full items-center">
          <div className="rounded-b-[32px] rounded-tl-[32px] h-40 w-40 overflow-hidden">
            <img
              src={`${CONFIG.RESOURCE_URL}${item.currentPicUrl}`}
              alt="descriptive photograph"
              className=" w-full h-full cursor-pointer object-cover"
              onClick={() => navigate(`/events/${item.id}`)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 
            onClick={() => navigate(`/events/${item.id}`)}
            className="text-lg font-medium text-center md:text-left cursor-pointer">
              {item?.eventName}
            </h2>
            <div className="flex">
              <span className="mr-1">
                <CalendarIcon />
              </span>
              <p className="text-gray-600 text-sm">{formatDate(new Date(item.startDate))}</p>
            </div>
            <div className="flex items-center">
              <span className="mr-1">
                <LocationIcon_2 />
              </span>
              <p className="text-blue-600 text-sm">{item.location.address ?? item.location.link}</p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className="mr-1">Category:</span>
                <span className="text-blue-600">{item.eventType}</span>
              </div>
            </div>
            {user === userId && (
              <span onClick={()=> clickHandler(item)} className=" text-blue-500 hover:text-blue-600 font-bold w-fit cursor-pointer">
                View Ticket
              </span>
            )}
          </div>
        </div> 
      </div>
    )
  }

  return (
    <div className="mb-[100px] mx-auto flex flex-col gap-4">
      {results?.map(
        (event, i) => {
          if (results?.length === i + 1) {
            return (
              <div key={i} ref={lastChildRef} className="w-full max-w-2xl mx-auto " >
                <EventInfo item={event} index={i} user={userId} />
              </div>
            )
          } else {
            return (
              <div key={i} className="w-full max-w-2xl mx-auto " >
                <EventInfo item={event} index={i} />
              </div>
            )
          }
      })} 

      {proceedWithDownload&& (
        <DownloadTicketModal
          firstName={ticketinfo?.length > 0 ? ticketinfo[0]?.createdBy?.firstName : userInfo?.firstName}
          lastName={ticketinfo?.length > 0 ?  ticketinfo[0]?.createdBy?.lastName : userInfo?.lastName}
          userName={ticketinfo?.length > 0 ? ticketinfo[0]?.createdBy?.firstName+" "+ticketinfo[0]?.createdBy?.lastName : userInfo?.firstName+" "+userInfo?.lastName}
          banner={`${CONFIG.RESOURCE_URL}${eventInfo.currentPicUrl}`}
          length={ticketinfo?.length > 0 ? ticketinfo?.length :1}
          eventName={eventInfo?.eventName}
          location={eventInfo?.location?.locationDetails}
          currency={eventInfo?.currency}
          ticketFee={
            (eventInfo?.isFree)
              ? EVENT_TYPE.free
              : ticketinfo[0]?.boughtPrice
          }
          profile={`${ticketinfo?.length > 0 ? ticketinfo[0]?.createdBy?.data?.imgMain?.value : userInfo?.data?.imgMain?.value}`}
          type={ticketinfo[0]?.ticketType}
          convener={eventInfo?.createdBy?.firstName+" "+eventInfo?.createdBy?.lastName}
          date={eventInfo.startDate}
          orderId={ticketinfo[0]?.id}
          closeModal={viewTicket}
          handleClose={handleClose}
        />
        )}
    </div>
  )
}

export default SecondaryEvents
