import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import {
  BlueCalendarIcon,
  MessageIcon,
  LocationIcon,
  AddProfileIcon,
} from "@/components/Svgs"
import Map from "@/components/map"
import { EVENT_TYPE, PATH_NAMES, POLICY } from "@/constants"
import { formatDate, formatNumber, formatTime } from "@/utils/helpers"
import { CaretLeftIcon } from "@/components/Svgs"
import TicketPaymentModal from "@/components/explore/modals/TicketPaymentModal"
import DownloadTicketModal from "@/components/explore/modals/DownloadTicketModal"
import RefundPolicy from "@/components/explore/modals/RefundPolicy"
import SelectPaymentMethod from "../../../components/explore/modals/SelectPaymentMethod"
import CONFIG from "../../../config"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import { CREATE_TICKET, PAY_WITH_PAYSTACK, PAY_WITH_STRIPE, VERIFY_PAYSTACK_PAYMENT, VERIFY_STRIPE_PAYMENT } from "../../../constants/endpoints.constant"
import SelectPaymentOptions from "../../../components/explore/modals/SelectPaymentOptions"

const TicketPageTemplate = ({
  banner,
  eventID,
  eventName,
  eventLogo,
  attendees,
  price,
  convener,
  timeAndDate,
  location,
  locationType,
  about,
  isFree,
  currency,
  isOrganizer,
  isBought,
  minPrice,
  maxPrice,
}) => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [proceedWithDownload, setProceedWithDownload] = useState(false)
  const [proceedWithPurchase, setProceedWithPurchase] = useState(false)
  const [showRefundPolicy, setShowRefundPolicy] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [ticketCount, setTicketCount] = useState(1)

  const { token } = useAuth()
  const { sendRequest: sendPaystackRequest, isLoading: paystackLoading } = useFetch()
  const { sendRequest: sendStripeRequest, isLoading: stripeLoading } = useFetch()

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

  const payWithPaystack = () => {
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
      sendPaystackRequest(
        `${PAY_WITH_PAYSTACK}?orderCode=${data?.orderCode}&email=${data?.email}&amount=${data?.orderTotal}&currency=${currency}`,
        "POST",
        null,
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        window.open(response?.checkout, "_blank");
      })
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
      sendStripeRequest(
        `${PAY_WITH_STRIPE}?orderId=${data?.orderId}`,
        "POST",
        null,
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        window.open(response?.checkout, "_blank");
      })
    })
  }

  const isDisabled = !isFree && !selectedCategory?.ticketPrice

  return (
    <>
      {proceedWithDownload && (
        <DownloadTicketModal
          userName="Peter Obi"
          banner={`${CONFIG.RESOURCE_URL}${banner}`}
          eventName={eventName}
          location={location?.address}
          ticketFee={
            isFree
              ? EVENT_TYPE.free
              : selectedCategory?.ticketPrice
          }
          convener={convener}
          date={timeAndDate}
          orderId="#5634785"
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
          about={about}
          toggleModal={buyTicket}
          toggleRefundPolicy={toggleRefundPolicy}
          ticketPrice={selectedCategory?.ticketPrice}
          categoryType={selectedCategory.ticketType}
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
        />
      )}
      <div className="pl-4 lg:pl-12 pt-9 pb-24 pr-4 flex flex-col gap-2 relative">
        <button
          onClick={() => navigate(PATH_NAMES.explore)}
          className="absolute top-9 left-2 p-2"
        >
          <CaretLeftIcon />
        </button>
        <img
          src={`${CONFIG.RESOURCE_URL}${banner}`}
          alt="ticket banner"
          className="w-full h-72 object-cover rounded-b-[36px] rounded-tl-[36px]"
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
              <div className="bg-green-600 text-white px-3 py-2 rounded-3xl text-sm">Attending</div>
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
              <img
                src={`${CONFIG.RESOURCE_URL}${eventLogo}`}
                alt="convener logo"
                className="w-12 h-12 object-cover rounded-b-full rounded-tl-full bg-black"
              />
              <div className="flex flex-col gap-1">
                <h3>Convener</h3>
                <p className="text-xs font-bold">{convener}</p>
              </div>
            </div>
            {!isOrganizer && (
              <div className="flex flex-row gap-4 justify-center items-center">
                <button className="p-2">
                  <AddProfileIcon className="w-6 h-6" />
                </button>
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
                  Event date and time
                </div>
                <div className="">
                  <h3 className="text-chasescrollDarkBlue font-bold">
                    {formatDate(timeAndDate)}
                  </h3>
                  <p className="text-xs font-bold">
                    {formatTime(timeAndDate)} (GMT+1)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 rounded-lg lg:px-2 lg:py-3 lg:w-80 w-full items-center lg:items-end lg:border-b border-gray-300">
              <LocationIcon className="w-16" />
              <div className="flex flex-col gap-2">
                <div className="hidden lg:block text-xs text-gray-500">
                  Event location
                </div>
                <div className="">
                  <h3 className="text-chasescrollDarkBlue font-bold">
                    {location?.address}
                  </h3>
                  <p className="text-xs font-bold">{locationType}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-end lg:w-[430px] w-full">
              <div className="hidden lg:block text-xs text-gray-500 lg:ml-2">
                Select ticket type
              </div>
              {!isOrganizer ? (
                <div className="flex items-center gap-2 lg:px-2 lg:pb-3 rounded-lg lg:border-b border-gray-300">
                  {isFree ? (
                    <button className="bg-chasescrollBlue text-white border border-chasescrollBlue text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-4 py-2.5">
                      {EVENT_TYPE.free.toUpperCase()}
                    </button>
                  ) : (
                    price?.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelection(category)}
                        className={`border border-chasescrollBlue text-xs lg:text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-2 lg:px-4 py-2 lg:py-2.5 transition-all capitalize ${category.ticketPrice === selectedCategory?.ticketPrice
                          ? "text-white bg-chasescrollBlue"
                          : "text-chasescrollBlue bg-white"
                          }`}
                      >
                        {category?.ticketType} {formatNumber(category?.ticketPrice, currency === "USD" ? "$" : "₦")}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 lg:px-2 lg:pb-3 rounded-lg lg:border-b border-gray-300">
                  <button
                    className="border border-chasescrollBlue text-xs lg:text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-2 lg:px-4 py-2 lg:py-2.5 transition-all capitalize text-white bg-chasescrollBlue"
                  >
                    My Dashboard
                  </button>
                  <button
                    className="border border-chasescrollBlue text-xs lg:text-sm flex items-center justify-center gap-2 rounded-lg shadow-md w-full px-2 lg:px-4 py-2 lg:py-2.5 transition-all capitalize bg-white text-chasescrollBlue"
                  >
                    Edit Event
                  </button>
                </div>
              )}

            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">About this event</h2>
            <p className="text-sm leading-6">{about}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Location </h2>
            <div className="overflow-auto rounded-lg">
              {/* <Map location={location} zoomLevel={17} /> */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              disabled={isDisabled}
              onClick={isFree ? viewTicket : buyTicket}
              className={`${isDisabled ? "cursor-not-allowed opacity-50" : ""
                } bg-chasescrollBlue text-white w-96 p-3 text-sm rounded-lg`}
            >
              {isFree ? "View" : "Buy"} Ticket
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
