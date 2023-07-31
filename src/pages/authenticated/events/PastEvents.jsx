import React, { useEffect } from "react"
import PageWrapper from "@/components/PageWrapper"
import PastEvent from "@/components/events/PastEvent"
import { FindEvent, ArrowRight, LeftArrow } from "@/components/Svgs"
import CONFIG from "@/config"
import { GET_PAST_EVENTS } from "../../../constants/endpoints.constant"
import { useFetch } from "../../../hooks/useFetch"

const PastEvents = () => {
  const [pastEvents, setPastEvents] = useState([])
  const [Loading, setLoading] = useState(true)
  const { userName, token } = useAuth()
  const { sendRequest } = useFetch()

  const getTopEvents = async () => {
    const pastEvents = await sendRequest(GET_PAST_EVENTS, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    console.log(pastEvents);
    // if (pastEvents && pastEvents.content) {
    //   setPastEvents(pastEvents.content)
    //   setLoading(false)
    //   console.log(pastEvents.content);
    // }
  }

  React.useEffect(() => {
    getTopEvents()
  }, [])

  return (
    <PageWrapper>
      {() => (
        <div className="grid gap-2 px-2 relative">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center justify-center">
              <LeftArrow />
              <h1 className="text-2xl font-bold py-4">Past Events</h1>
              <ArrowRight />
            </div>
            <FindEvent />
          </div>
          {Loading && ( 
              <Loader position={true} /> 
          )}
          {!Loading && (
            <div className="flex flex-wrap items-center justify-center gap-2 overflow-auto py-2">
              <p>Drop</p>
              {pastEvents.map((suggest, index) => (
                <div key={index}>{suggest}</div>
              ))}
              {pastEvents?.length < 1 && (
                <p className=" text-center py-6 text-lg font-semibold " >
                  No Records Founded
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

export default PastEvents
