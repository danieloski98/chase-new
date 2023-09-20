import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import {
  BlueCalendarIcon,
  MessageIcon,
  LocationIcon,
  AddProfileIcon,
} from "@/components/Svgs"
import { usePaystackPayment } from 'react-paystack';
import Map from "@/components/map"
import { EVENT_TYPE, POLICY } from "@/constants"
import { PATH_NAMES } from "@/constants/paths.constant"
import { formatDate, formatNumber, formatTime } from "@/utils/helpers"
import { CaretLeftIcon } from "@/components/Svgs"
import TicketPaymentModal from "@/components/explore/modals/TicketPaymentModal"
import DownloadTicketModal from "@/components/explore/modals/DownloadTicketModal"
import RefundPolicy from "@/components/explore/modals/RefundPolicy"
import SelectPaymentMethod from "../../../components/explore/modals/SelectPaymentMethod"
import CONFIG from "../../../config"
import { useAuth } from "../../../context/authContext"
import { toast } from "react-toastify"
import { useFetch } from "../../../hooks/useFetch"
import { CREATE_TICKET, PAY_WITH_PAYSTACK, PAY_WITH_STRIPE, SEND_FRIEND_REQUEST, VERIFY_PAYSTACK_PAYMENT, VERIFY_STRIPE_PAYMENT } from "../../../constants/endpoints.constant"
import SelectPaymentOptions from "../../../components/explore/modals/SelectPaymentOptions"
import { AxiosError } from "axios"
import httpService from "../../../utils/httpService"
import { useQuery } from "react-query"
import Stripecomponent from "../../../components/explore/Stripecomponent/Stripecomponent";

const TicketPageTemplate = ({
  banner,
  eventID,
  userBy,
  eventName,
  eventLogo,
  attendees,
  price,
  convener,
  timeAndDate,
  endtimeAndDate,
  location,
  locationType,
  about,
  isFree,
  currency,
  isOrganizer,
  isBought,
  minPrice,
  maxPrice,
  username,
  dataInfo,
  ticketBought,
  getData
}) => {
  const navigate = useNavigate() 
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [proceedWithDownload, setProceedWithDownload] = useState(false)
  const [proceedWithPurchase, setProceedWithPurchase] = useState(false)
  const [showRefundPolicy, setShowRefundPolicy] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [showStripeForm, setShowStripeForm] = useState(false)
  const [ticketCount, setTicketCount] = useState(1)

  const { token, setEventData, userId } = useAuth()
  const { sendRequest: sendPaystackRequest, isLoading: paystackLoading } = useFetch()
  const { sendRequest: sendStripeRequest, isLoading: stripeLoading } = useFetch()
	const Paystack_key = import.meta.env.VITE_PAYSTACK_KEY

  const handleCategorySelection = category => setSelectedCategory(category)
  const toggleRefundPolicy = () => setShowRefundPolicy(state => !state)
  const viewTicket = () => setProceedWithDownload(state => !state)
  const togglePaymentOptions = () => setShowPaymentOptions(state => !state)
  const togglePaymentMethods = () => setShowPaymentMethods(state => !state)
  const buyTicket = () => setProceedWithPurchase(state => !state)
  const handleClose = () => {
    setProceedWithDownload(false)
    setProceedWithPurchase(false)
    setShowRefundPolicy(false)
    setShowPaymentMethods(false)
    setShowPaymentOptions(false)
  }
  
  const handlePaymentModal =()=>{ 
    setShowPaymentOptions(false)
    setShowStripeForm(true)
  }

  const closeModal =()=> {
    setShowStripeForm(false)
  }

  const [config , setConfig] = React.useState( { 
    email: "",
    amount: 0,
    reference: "",
    publicKey: Paystack_key,
  }) 

  console.log(Paystack_key);

  const [configStripe , setConfigStripe] = React.useState({ }) 
  const [clientKey , setClientKey] = React.useState("")  
  const [ticketinfo , setticketinfo] = React.useState("")  

  const [userInfo , setUserInfo] = React.useState({})   

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
      `/events/get-users-tickets?userID=${userId}&eventID=${eventID}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((data) => { 
      setticketinfo(data?.content)
      setIsLoading(false)
    })
  }

  React.useEffect(()=>{
    getEventTicket()
    fetchProfileInfo()
  }, [getData]) 

  const payWithPaystack = async() => { 
    sendPaystackRequest(
      CREATE_TICKET,
      "POST",
      {
        eventID,
        ticketType: selectedCategory?.ticketType,
        numberOfTickets: ticketCount
      },
      { Authorization: `Bearer ${token}` }
    ).then((data) => {
        if(data?.content?.orderTotal > 0){
          setConfig({ 
            email: data?.content?.email,
            amount: (Number(data?.content?.orderTotal)*100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
            publicKey: Paystack_key,
            reference: data?.content?.orderCode
          }); 
        } 
    }) 
  }  

  const payWithStripe = () => {
    sendStripeRequest(
      CREATE_TICKET,
      "POST",
      {
        eventID,
        ticketType: selectedCategory?.ticketType,
        numberOfTickets: ticketCount
      },
      { Authorization: `Bearer ${token}` }
    ).then((data) => {   
      if(data?.content?.orderTotal > 0) {

        setConfigStripe({
          reference: data?.content?.orderId,
          amount: data?.content?.orderTotal
        })
      }
      if(!data?.content?.orderId){
        toast.error(data?.message) 
      } else { 
        sendStripeRequest(
          `${PAY_WITH_STRIPE}?orderId=${data?.content?.orderId}`,
          "POST",
          null,
          { Authorization: `Bearer ${token}` }
        ).then((response) => {
          setClientKey(response?.gatewayReferenceID)
          setShowStripeForm(true) 
          // window.open(response?.checkout, "_blank");
        }) 
      } 
    })
  }

  const isDisabled = !isFree && !selectedCategory?.ticketPrice 

  const clickHandler =()=> {
    setEventData(dataInfo)
    navigate("/event-dashboard")
  } 

  const editHandler =()=> {
    setEventData(dataInfo)
    navigate("/event/create")
  } 
  const { sendRequest } = useFetch()
  
  const friendPerson = async () => { 
    const data = await sendRequest(
      `${SEND_FRIEND_REQUEST}`,
      "POST",
      { toUserID: userBy },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);  
    }
  }   

  return (
    <>
      {proceedWithDownload && (
        <DownloadTicketModal
          firstName={ticketinfo?.length > 0 ? ticketinfo[0]?.createdBy?.firstName : userInfo?.firstName}
          lastName={ticketinfo?.length > 0 ?  ticketinfo[0]?.createdBy?.lastName : userInfo?.lastName}
          userName={ticketinfo?.length > 0 ? ticketinfo[0]?.createdBy?.firstName+" "+ticketinfo[0]?.createdBy?.lastName : userInfo?.firstName+" "+userInfo?.lastName}
          banner={`${CONFIG.RESOURCE_URL}${banner}`}
          length={ticketinfo?.length > 0 ? ticketinfo?.length :1}
          eventName={eventName}
          location={location?.locationDetails}
          currency={currency}
          ticketFee={
            (isFree)
              ? EVENT_TYPE.free
              : ticketinfo[0]?.boughtPrice
          }
          profile={`${ticketinfo?.length > 0 ? ticketinfo[0]?.createdBy?.data?.imgMain?.value : userInfo?.data?.imgMain?.value}`}
          type={ticketinfo[0]?.ticketType}
          convener={convener}
          date={timeAndDate}
          orderId={ticketinfo[0]?.id}
          closeModal={viewTicket}
          handleClose={handleClose}
        />
      )}
      {proceedWithPurchase && (
        <TicketPaymentModal
          banner={`${CONFIG.RESOURCE_URL}${banner}`}
          eventName={eventName}
          eventLogo={`${CONFIG.RESOURCE_URL}${eventLogo}`}
          convener={convener}
          timeAndDate={timeAndDate}
          location={location?.address}
          ticketLeft={Number(selectedCategory?.totalNumberOfTickets )- Number(selectedCategory?.ticketsSold)}
          about={about}
          toggleModal={buyTicket}
          minticket={selectedCategory?.minTicketBuy}
          maxticket={selectedCategory?.maxTicketBuy}
          toggleRefundPolicy={toggleRefundPolicy}
          ticketPrice={selectedCategory?.ticketPrice}
          categoryType={selectedCategory?.ticketType}
          ticketCount={ticketCount}
          setTicketCount={setTicketCount}
          currency={currency}
          handleClose={handleClose}
        />
      )}
      {showRefundPolicy && (
        <RefundPolicy
          banner={`${CONFIG.RESOURCE_URL}${banner}`}
          eventName={eventName}
          location={location?.address}
          policy={POLICY}
          closeModal={toggleRefundPolicy}
          goBack={buyTicket}
          selectPaymentMethod={togglePaymentMethods}
          handleClose={handleClose}
        />
      )}
      {showPaymentMethods && (
        <SelectPaymentMethod
          closeModal={togglePaymentMethods}
          goBack={toggleRefundPolicy}
          togglePaymentOptions={togglePaymentOptions}
          handleClose={handleClose}
        />
      )}
      {showPaymentOptions && (
        <SelectPaymentOptions
          closeModal={togglePaymentOptions}
          goBack={togglePaymentMethods}
          payWithPaystack={payWithPaystack}
          payWithStripe={payWithStripe}
          handleClose={handleClose}
          paystackLoading={paystackLoading}
          stripeLoading={stripeLoading}
          currency={currency}
          client={clientKey} 
          config={config}
          stripeform={handlePaymentModal}
          stripeconfig={configStripe}
          getData={getData}
        />
      )}
      {showStripeForm && (
        <Stripecomponent clientKey={clientKey} config={configStripe} closeModal={closeModal} getData={getData} />
      )}
      <div className="pl-4 lg:pl-12 pt-9 pb-24 pr-4 flex flex-col gap-2 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-9 z-20 left-2 p-2"
        >
          <CaretLeftIcon />
        </button>

        <div className="backdrop-blur-sm absolute inset-0 px-3 pt-9 flex justify-center items-center rounded-b-[36px] rounded-tl-[36px] h-72">
          <img
            src={`${CONFIG.RESOURCE_URL}${banner}`}
            alt="Blurred Image"
            className="h-80  blur-md w-full object-cover mx-2 rounded-b-[36px] rounded-tl-[36px]]"
          />
        </div>
        <img
          src={`${CONFIG.RESOURCE_URL}${banner}`}
          alt="ticket banner"
          className="w-full h-72 z-20 object-contain rounded-b-[36px] rounded-tl-[36px]"
        />
        <div className="flex flex-col gap-6">
          <div className="lg:px-2 flex justify-between gap-1">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{eventName}</h2>
              <p className="text-chasescrollBlue font-bold text-xl">
                {formatNumber(minPrice, currency === "USD" ? "$" : "₦")} - {formatNumber(maxPrice, currency === "USD" ? "$" : "₦")}
              </p>
            </div>
            <div className="flex justify-between items-center">
              {isBought && (
                <div className="bg-green-600 text-white px-3 py-2 rounded-3xl text-sm">Attending</div>
              )}
              {attendees?.slice(0, 3).length && (
                <div className="flex items-center justify-end">
                  <div
                    className={`w-fit flex items-center justify-end ${attendees?.slice(3).length < 1 ? "mr-3" : "m-0"
                      }`}
                  >
                    {attendees?.slice(0, 3)?.map(attendee => (
                      <div className="w-8 h-8 -mr-3">
                        <img
                          key={attendee.id}
                          src={attendee.image}
                          className="w-8 h-8 -mr-3 rounded-b-full rounded-tl-full"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                  {attendees?.slice(3)?.length > 0 && (
                    <Link
                      to="/event/attendees"
                      className="cursor-pointer rounded-b-full rounded-tl-full w-8 h-8 relative bg-chasescrollBlue text-white text-xs flex items-center justify-center"
                    >
                      +{attendees?.slice(3)?.length}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="lg:px-2 flex justify-between items-center py-4 rounded-lg lg:border-b border-gray-300">
            <div className="flex gap-2 justify-center items-center">
              {/* <img 
              role="button"
                onClick={() => navigate(`/profile/${`${userBy}`}`)}
                src={`${CONFIG.RESOURCE_URL}${eventLogo}`}
                alt="convener logo"
                className="w-12 h-12 object-cover rounded-b-full rounded-tl-full bg-black"
              /> */}
                {eventLogo&& (
                  <img src={CONFIG.RESOURCE_URL+eventLogo} alt="" className="w-16 h-16 rounded-b-[64px] rounded-tl-[64px] object-cover" /> 
                )}
                {!eventLogo && (
                  <div className=" w-16 h-16 bg-chasescrollGray rounded-b-[64px] rounded-tl-[64px] flex justify-center items-center font-bold text-[26px] " >
                      {dataInfo?.createdBy?.firstName?.charAt(0).toUpperCase()}{dataInfo?.createdBy?.lastName?.charAt(0).toUpperCase()}
                  </div>
                )}
              <div role="button"  onClick={() => navigate(`/profile/${`${userBy}`}`)} className="flex flex-col">
                <h3>{convener}</h3>
                <p className="text-xs font-bold">@{username}</p>
              </div>
            </div>
            {!isOrganizer && (
              <div className="flex flex-row gap-4 justify-center items-center">
                {dataInfo?.createdBy?.joinStatus !== "CONNECTED" && (
                  <button onClick={friendPerson} className="p-2">
                    <AddProfileIcon className="w-6 h-6" />
                  </button>
                )}
                {dataInfo?.createdBy?.joinStatus === "CONNECTED" && (
                  <p className=" text-chasescrollBlue font-bold " >Connected</p>
                )}
                {dataInfo?.createdBy?.joinStatus === "FRIEND_REQUEST_SENT" && (
                  <p className=" text-chasescrollBlue font-bold " >Pending</p>
                )} 
                <button className="p-2">
                  <MessageIcon className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          {/* <button className=""></button> */}

          <div className="flex lg:flex-row flex-col gap-4 rounded-md lg:py-2">
            <div className="flex flex-row gap-2 rounded-lg lg:px-2 lg:py-3 lg:w-80 w-full items-center lg:items-end lg:border-b border-gray-300">
              <BlueCalendarIcon className="w-12" />
              <div className="flex flex-col gap-2">
                <div className="hidden lg:block text-xs text-gray-500">
                  Event Start date and time
                </div>
                <div className="">
                  <h3 className="text-chasescrollDarkBlue lg:text-base text-sm font-bold">
                    {formatDate(timeAndDate)}
                  </h3>
                  <p className="text-xs font-bold">
                    {formatTime(timeAndDate)} (GMT+1)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 rounded-lg lg:px-2 lg:py-3 lg:w-80 w-full items-center lg:items-end lg:border-b border-gray-300">
              <BlueCalendarIcon className="w-12" />
              <div className="flex flex-col gap-2">
                <div className="hidden lg:block text-xs text-gray-500">
                  Event End date and time
                </div>
                <div className="">
                  <h3 className="text-chasescrollDarkBlue lg:text-base text-sm font-bold">
                    {formatDate(endtimeAndDate)}
                  </h3>
                  <p className="text-xs font-bold">
                    {formatTime(endtimeAndDate)} (GMT+1)
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-row gap-2 rounded-lg lg:px-2 lg:py-3 lg:w-80 w-full items-center lg:items-end lg:border-b border-gray-300">
              <LocationIcon className="w-16" />
              <div className="flex flex-col gap-2">
                <div className="hidden lg:block text-xs text-gray-500">
                  Event location
                </div>
                <div className="">
                  <h3 className="text-chasescrollDarkBlue font-bold">
                    {location?.locationDetails ? (location.locationDetails?.length >= 17 ? location.locationDetails : location.locationDetails):
                      location?.link ? (location.link?.length >= 17 ? location.link : location.link): ""}
                  </h3>
                  <p className="text-xs font-bold">{locationType}</p>
                </div>
              </div>
            </div> */}

            {!isBought && (
            <div className="flex flex-col gap-2 justify-end lg:w-[430px] w-full">
              <div className="hidden lg:block text-xs text-gray-500 lg:ml-2">
                Select ticket type
              </div>
                <> 
                  {!isOrganizer ? (
                    <div className="flex items-center gap-2 lg:px-2 lg:pb-3 rounded-lg lg:border-b border-gray-300">
                      {(isFree) ? (
                        <button className="bg-chasescrollBlue text-white border border-chasescrollBlue text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-4 py-2.5">
                          {EVENT_TYPE.free.toUpperCase()}
                        </button>
                      ) : (
                        price?.map(category => (
                          <button
                            key={category.id}
                            disabled={category?.totalNumberOfTickets === category?.ticketsSold ? true : false }
                            onClick={() => handleCategorySelection(category)}
                            className={`border border-chasescrollBlue disabled:opacity-25 disabled:cursor-not-allowed text-xs lg:text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-2 lg:px-4 py-2 lg:py-2.5 transition-all capitalize ${category.ticketPrice === selectedCategory?.ticketPrice
                              ? "text-white bg-chasescrollBlue"
                              : "text-chasescrollBlue bg-white"
                              }`}
                          >
                            {category?.totalNumberOfTickets === category?.ticketsSold ?
                                <>
                                {category?.ticketType+" "}
                                Sold Out
                                </>
                                :
                                <>
                                
                                  {category?.ticketType} {formatNumber(category?.ticketPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            }
                          </button>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 lg:px-2 lg:pb-3 rounded-lg lg:border-b border-gray-300">
                      <button
                        onClick={()=> clickHandler()}
                        className="border border-chasescrollBlue text-xs lg:text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-2 lg:px-4 py-2 lg:py-2.5 transition-all capitalize text-white bg-chasescrollBlue"
                      >
                        My Dashboard
                      </button>
                      <button
                        onClick={()=> editHandler()}
                        disabled={ticketBought}
                        className={` ${ticketBought && " opacity-40 " } border border-chasescrollBlue text-xs lg:text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-2 lg:px-4 py-2 lg:py-2.5 transition-all capitalize bg-white text-chasescrollBlue`}
                      >
                        Edit Event
                      </button>
                    </div>
                  )}
                </>

            </div>
          )}
          </div>

          <div className="flex flex-row gap-2 rounded-lg lg:px-2 lg:py-3 lg:w-80 w-full items-center lg:items-end lg:border-b border-gray-300">
            <LocationIcon className="w-16" />
            <div className="flex flex-col gap-2">
              <div className="hidden lg:block text-xs text-gray-500">
                Event location
              </div>
              <div className="">
                {!location?.link && (
                  <h3 className="text-chasescrollDarkBlue font-bold">
                    {location?.locationDetails ? (location.locationDetails?.length >= 17 ? location.locationDetails : location.locationDetails):
                      location?.link ? (location.link?.length >= 17 ? location.link : location.link): ""}
                  </h3>
                )} 
                {location?.link && (
                  <a target="_blank" href={location.link} className="text-chasescrollDarkBlue font-bold">
                    Click To Join
                  </a>
                )}
                <p className="text-xs font-bold">{locationType}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">About this event</h2>
            <p className="text-sm leading-6">{about}</p>
          </div>

          {/* <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Location </h2>
            <div className="overflow-auto rounded-lg">
              <Map location={location} zoomLevel={17} />
            </div>
          </div> */}

          <div className="flex items-center justify-center">
            <button
              disabled={isBought? false :isDisabled}
              onClick={(isFree || isBought)  ? viewTicket : buyTicket}
              className={`${isBought ?  "" :isDisabled ? "cursor-not-allowed opacity-50" : ""
                } bg-chasescrollBlue text-white w-96 p-3 text-sm rounded-lg`}
            >
              {(isFree || isBought) ? "View" : "Buy"} Ticket
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

TicketPageTemplate.propTypes = {
  ticketInfo: PropTypes.object,
}

export default TicketPageTemplate
