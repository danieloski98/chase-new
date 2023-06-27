import { ViewTicket, LocationPin, CalendarMini } from "@/components/Svgs"
import img from "@/assets/images/eventimg.png"
import { useState } from "react"
import { GET_JOINED_EVENTS } from "../../constants/endpoints.constant"

const MyEvent = () => {
  const [myEvents, setMyEvents] = useState([])

  const { userName, token } = useAuth()
  const { sendRequest } = useFetch()

  const getMyEvents = async () => {
    const myEvents = await sendRequest(GET_JOINED_EVENTS, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    if (myEvents && myEvents.content) {
      setMyEvents(myEvents.content)
    }
  }

  useEffect(() => {
    getMyEvents()
  }, [])

  return (
    <div className="mx-auto my-2 w-4/5">
      {myEvents.map(event => (
        <div
          className="border rounded-b-[32px] rounded-tl-[32px] px-2 py-4"
          key={event?.id}
        >
          <div className="grid grid-cols-5 gap-4">
            <div className="grid col-start-1 col-end-4 place-items-center">
              <img
                src={event?.img}
                alt=""
                className="rounded-b-[32px] rounded-tl-[32px]"
              />
            </div>

            <div className="grid gap-2 col-start-4 col-end-6">
              <div className="text-2xl font-medium py-2">
                <h1>Libero interdum</h1>
              </div>
              <div className="flex gap-1 text-chasescrollBrown font-medium text-sm items-center">
                <CalendarMini />
                <p>Friday, Nov 25 .7pm-1am</p>
              </div>

              <div className="flex justify-between text-sm py-2 text-chasescrollBlue">
                <div className="flex gap-1 items-center">
                  <LocationPin />
                  <p>State farm arena, ATL</p>
                </div>
              </div>
              <div className="flex text-sm py-2">
                <h1 className="text-chasescrollBrown font-medium">
                  Categories: Movie{" "}
                  <span className="bg-chasescrollNavyLight font-bold text-chasescrollBlue rounded-sm px-1">
                    Attending
                  </span>
                </h1>
              </div>

              <button className="flex flex-col items-center justify-center text-white text-base bg-chasescrollBlue rounded-lg font-bold">
                <ViewTicket />
                View Ticket
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyEvent
