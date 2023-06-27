import PageWrapper from "@/components/PageWrapper"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "@/constants"
import Event from "@/components/events/Event"
import Category from "@/components/events/Category"
import img from "@/assets/images/eventimg.png"
import TrendingEvents from "@/components/events/TrendingEvents"
import { FindEvent } from "@/components/Svgs"
import Menu from "../../pages/authenticated/events/Menu"


const Events = () => {

  const EVENTS_ARRAY = Array(2).fill(<TrendingEvents />)
  return (
    <PageWrapper>
      {() => (
        <div className="grid gap-2 px-2">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold py-4">
              Find Events
            </div>
            <FindEvent />
          </div>

          <div>
            <div className="flex justify-between">
              <h3 className="text-base font-medium">Event Category</h3>
              <Link to={PATH_NAMES.suggestions}>
                <h3 className="text-sm text-chasescrollBlue font-bold">
                  See all
                </h3>{" "}
              </Link>
            </div>
            <Category />
          </div>

          <div>
            <Event />
          </div>

          <div>
            <div className="flex justify-between mt-4 mx-2">
              <h3 className="text-base font-medium">Trending Event</h3>
              <Link to={PATH_NAMES.events}>
                <h3 className="text-sm text-chasescrollBlue font-bold">
                  See all
                </h3>{" "}
              </Link>
            </div>
            <div className="grid grid-cols-2 place-items-center">
              {EVENTS_ARRAY.map((suggest, index) => (
                <div key={index}>{suggest}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default Events
