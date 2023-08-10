import PageWrapper from "@/components/PageWrapper"
import { PAID_TICKET_INFO } from "@/constants"
import TicketPageTemplate from "./TicketPageTemplate"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { GET_ALL_PUBLIC_EVENTS_TO_JOIN, VERIFY_PAYSTACK_PAYMENT, VERIFY_STRIPE_PAYMENT } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import { toast } from "react-toastify"

const PaidTicketPage = () => {
  const { id, orderId, orderCode } = useParams()
  const [event, setEvent] = useState({})

  const { token } = useAuth()
  const { sendRequest } = useFetch()

  const getEvent = () => {
    sendRequest(
      `${GET_ALL_PUBLIC_EVENTS_TO_JOIN}?id=${id}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((data) => {
      setEvent(data?.content[0])
    })
  }

  const verifyStripePayment = () => {
    try {
      sendStripeRequest(
        `${VERIFY_STRIPE_PAYMENT}?orderId=${orderId}`,
        "POST",
        null,
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        toast.success(response?.message)
      })
    } catch (error) {
      toast.error(error?.message)
    }
  }

  const verifyPaystackPayment = () => {
    try {
      sendStripeRequest(
        `${VERIFY_PAYSTACK_PAYMENT}?orderCode=${orderCode}`,
        "POST",
        null,
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        toast.success(response?.message)
      })
    } catch (error) {
      toast.error(error?.message)
    }
  }

  useEffect(() => {
    getEvent()
  }, [])

  useEffect(() => {
    if (orderId) verifyStripePayment()
    else if (orderCode) verifyPaystackPayment()
  }, [orderId, orderCode])

  return (
    <PageWrapper>
      {() => (
        <TicketPageTemplate
          data={event}
          eventID={event?.id}
          isBought={event?.isBought}
          eventName={event?.eventName}
          about={event?.eventDescription}
          banner={event?.picUrls ? event?.currentPicUrl : ""}
          isFree={event?.isFree}
          timeAndDate={event?.startDate}
          location={event?.location}
          locationType={event?.locationType}
          convener={event?.createdBy?.firstName+" "+event?.createdBy?.lastName}
          username={event?.createdBy?.username}
          userId={event?.createdBy?.userId}
          ticketInfo={event?.productTypeData}
          eventLogo={event?.createdBy?.data?.imgMain?.value}
          price={event?.productTypeData}
          currency={event?.currency}
          isOrganizer={event?.isOrganizer}
          minPrice={event?.minPrice}
          maxPrice={event?.maxPrice}
        />
      )}
    </PageWrapper>
  )
}

export default PaidTicketPage
