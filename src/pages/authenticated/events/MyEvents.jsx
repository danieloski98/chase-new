import PageWrapper from "@/components/PageWrapper"
import MyEvent from "@/components/events/MyEvent"
import { FindEvent, ArrowRight, LeftArrow } from "@/components/Svgs"
import CONFIG from "@/config"
import { GET_JOINED_EVENTS } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([])
  const { userName, token } = useAuth()
  const { sendRequest } = useFetch()

  const getMyEvents = async () => {
    const MyEvents = await sendRequest(GET_JOINED_EVENTS, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    if (MYeVENTS && MYeVENTS.content) {
      setMyEvents(MYeVENTS.content)
    }
  }

  useEffect(() => {
    getMyEvents()
  }, [])

  return (
    <PageWrapper>
      {() => (
        <div className="grid gap-2 px-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center justify-center">
              <LeftArrow />
              <h1 className="text-2xl font-bold py-4">Find Events</h1>
              <ArrowRight />
            </div>
            <FindEvent />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 overflow-auto py-2">
            {myEvents.map((suggest, index) => (
              <div key={index}>{suggest}</div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default MyEvents
