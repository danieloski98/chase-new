import { LocationPin, CalendarMini } from "@/components/Svgs"
import img from "@/assets/images/eventimg.png"
const PastEvent = () => {
  return (
    <div className="mx-auto my-2 w-4/5">
      <div className="border rounded-b-[32px] rounded-tl-[32px] px-2 py-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="grid col-start-1 col-end-4 place-items-center">
            <img
              src={img}
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
                <span className="bg-chasescrollNavyLight text-red-500 rounded-sm px-1">
                  Attended
                </span>
              </h1>
            </div>

            <button className="flex flex-col items-center justify-center text-red-500 text-base bg-white border-b border-red-500 rounded-lg">
              Event Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PastEvent