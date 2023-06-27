import { NewDownloadIcon, BookmarkIcon, LocationPin } from "@/components/Svgs"
import CONFIG from "../../config"

const Event = ({ eventArray }) => {
  return (
    <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {eventArray.map(event => {
        // const {
        //   address,
        //   day,
        //   id,
        //   currentPicUrl,
        //   interest,
        //   month,
        //   price,
        //   text,
        // } = event
        return (
          <div
            key={id}
            className="border rounded-b-[32px] rounded-tl-[32px]  px-6 py-4 mx-auto grid gap-2 scale-[0.9]"
          >
            <div className="relative">
              <div className="rounded-b-[32px] rounded-tl-[32px] overflow-hidden">
                <img
                  src={`${CONFIG.RESOURCE_URL}/${event?.currentPicUrl}`}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="absolute bottom-5 left-5 rounded-bl-[32px] rounded-tl-sm w-16 bg-white font-bold">
                <h1 className="text-center text-2xl">{event?.day}</h1>
                <h2 className="text-center text-xl">{event?.month}</h2>
              </div>
            </div>

            <div className="flex justify-between text-lg font-medium">
              <h1>{event?.text}</h1>
              <h2>${event?.price.toFixed(2)}</h2>
            </div>
            <div className="flex gap-2 text-chasescrollBrown items-center">
              <LocationPin />
              <p>{event?.address}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-row items-center">
                <img
                  src={`${CONFIG.RESOURCE_URL}/${event?.picUrls}`}
                  alt=""
                  className="relative w-8 h-8 -left-1 rounded-b-full rounded-tl-full"
                />
                <img
                  src={`${CONFIG.RESOURCE_URL}/${event?.picUrls}`}
                  alt=""
                  className="relative w-8 h-8 -left-2 rounded-b-full rounded-tl-full"
                />
                <img
                  src={`${CONFIG.RESOURCE_URL}/${event?.picUrls}`}
                  alt=""
                  className="relative w-8 h-8 -left-3 rounded-b-full rounded-tl-full"
                />

                <h4 className="rounded-b-full rounded-tl-full w-8 h-8 relative -left-4 bg-chasescrollBlue text-white text-sm flex items-center justify-center">
                  +{event?.interest}
                </h4>
                <p className="text-chasescrollBlue -left-3 relative">
                  Interested
                </p>
              </div>

              <div className="flex flex-row gap-2">
                <NewDownloadIcon />
                <BookmarkIcon />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Event
