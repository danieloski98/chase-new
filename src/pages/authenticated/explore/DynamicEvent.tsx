import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { GET_ALL_PUBLIC_EVENTS_TO_JOIN } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch" 
import Loader from "../../../components/Loader"
import EventDetail from "./EventDetail"

const DynamicEvent = () => {
    const { id } = useParams()
    const [event, setEvent] = useState({} as any)
    const [isLoading, setIsLoading] = useState(true)

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
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getEvent()
    }, [])

    return ( 
        <div className=" w-full h-full ">
            {isLoading && (
                <div className=" w-full h-screen flex justify-center items-center " > 
                    <Loader />
                </div>
            )}
            {!isLoading && (

                <EventDetail
                    dataInfo={event}
                    eventID={event?.id}
                    isBought={event?.isBought}
                    eventName={event?.eventName}
                    about={event?.eventDescription}
                    banner={event?.currentPicUrl ? event?.currentPicUrl : ""}
                    isFree={event?.isFree}
                    timeAndDate={event?.startDate}
                    endtimeAndDate={event?.endDate}
                    location={event?.location}
                    locationType={event?.locationType}
                    convener={event?.createdBy?.firstName + " " + event?.createdBy?.lastName}
                    username={event?.createdBy?.username}
                    userBy={event?.createdBy?.userId}
                    ticketInfo={event?.productTypeData}
                    eventLogo={event?.createdBy?.data?.imgMain?.value}
                    price={event?.productTypeData}
                    currency={event?.currency}
                    isOrganizer={event?.isOrganizer}
                    minPrice={event?.minPrice}
                    maxPrice={event?.maxPrice}
                    getData={getEvent}
                    ticketBought={event?.ticketBought} attendees={undefined} />
            )}
        </div>
        //   )}
        // </PageWrapper>
    )
}

export default DynamicEvent
