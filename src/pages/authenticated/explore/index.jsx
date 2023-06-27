import { Link } from "react-router-dom"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { PATH_NAMES } from "@/constants"
import PageWrapper from "@/components/PageWrapper"
import { useAuth } from "../../../context/authContext"
import { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/useFetch"
import {
  GET_SUGGESTED_FRIENDS,
  GET_TOP_EVENTS,
} from "../../../constants/endpoints.constant"
import CarouselEvent from "../../../components/explore/CarouselEvent"
import Suggestion from "../../../components/explore/Suggestion"
import CONFIG from "../../../config"

const Explore = () => {
  const splideOptions = {
    type: "loop",
    arrows: false,
    focus: "center",
    autoplay: true,
    padding: "5rem",
  }

  const [topEvents, setTopEvents] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const { userName, token } = useAuth()
  const { sendRequest } = useFetch()

  const getTopEvents = async () => {
    const topEvents = await sendRequest(GET_TOP_EVENTS, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    if (topEvents) setTopEvents(topEvents?.content)
  }

  const getSuggestions = async () => {
    const suggestions = await sendRequest(GET_SUGGESTED_FRIENDS, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    if (suggestions) setSuggestions(suggestions?.content)
  }

  useEffect(() => {
    getTopEvents()
    getSuggestions()
  }, [])

  return (
    <PageWrapper>
      {() => (
        <div className="py-9 flex flex-col gap-4">
          <header className="flex flex-col gap-4 px-4">
            <h1 className="text-3xl font-bold text-blue-900">Hello {userName}</h1>
            <p className="text-chasescrollBlue font-bold">Top Events</p>
          </header>

          <section className="w-full mx-auto text-chasescrollBlue">
            <Splide aria-label="My Favorite Images" options={splideOptions}>
              {topEvents?.map(event => (
                <SplideSlide
                  key={event?.id}
                  className="flex items-center w-full cursor-pointer"
                >
                  <Link
                    to={
                      event?.maxPrice === null || event?.minPrice === null
                        ? `${PATH_NAMES.freeTickets}/${event?.id}`
                        : `${PATH_NAMES.tickets}/${event?.id}`
                    }
                    className="flex items-center w-full cursor-pointer"
                  >
                    <CarouselEvent
                      image={`${CONFIG.RESOURCE_URL}/${event?.currentPicUrl}`}
                      caption={event?.eventType}
                    />
                  </Link>
                </SplideSlide>
              ))}
            </Splide>
          </section>

          <section className="px-4 pb-8">
            <div className="flex justify-between">
              <h3 className="text-sm font-bold">People you may know</h3>
              <Link
                to={PATH_NAMES.suggestions}
                className="text-sm text-chasescrollBlue font-bold"
              >
                See all
              </Link>
            </div>
            <div className="flex gap-4 overflow-auto py-4">
              {suggestions.length && suggestions?.slice(0, 6)?.map(suggestion => (
                <div key={suggestion?.userId} className="w-40 rounded-b-3xl rounded-tl-3xl">
                  <Suggestion
                    key={suggestion.id}
                    userId={suggestion?.userId}
                    firstName={suggestion?.firstName}
                    lastName={suggestion?.lastName}
                    publicProfile={suggestion?.publicProfile}
                    img={`${CONFIG.RESOURCE_URL}${suggestion?.data?.imgMain?.value}`}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </PageWrapper>
  )
}

export default Explore
