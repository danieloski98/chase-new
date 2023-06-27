import OverlayWrapper from "@/components/OverlayWrapper"
import concert from "@/assets/images/concert.jpeg"
import { ProfileIcon, BarCode } from "@/components/Svgs"

const CancelTicket = () => {
  return (
    <OverlayWrapper>
    <div>
      <div className="border px-6 py-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-36 h-24 px-2 my-1">
            <img
              src={concert}
              alt=""
              className="rounded-b-[32px] rounded-tl-[32px]"
            />
          </div>
          <div>
            <h2 className="font-bold text-base">Netflix Oscar awards</h2>
            <h3 className="text-sm text-chasescrollBlue">
              O2 Arena squad London.{" "}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b-2 border-t-2 border-dashed place-items-center py-4">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <h2 className="text-sm text-chasescrollBlue font-bold">
                Place
              </h2>
              <h3 className="font-light text-sm">02 Arena Squad, London</h3>
            </div>
            <div className="grid gap-1">
              <h2 className="text-sm text-chasescrollBlue font-bold">
                Order ID
              </h2>
              <h3 className="font-light text-sm">#5634785</h3>
            </div>
            <div className="grid gap-1">
              <h2 className="text-sm text-chasescrollBlue font-bold">Date</h2>
              <h3 className="font-light text-sm">Oct 20,2023</h3>
            </div>
            <div className="grid gap-1">
              <h2 className="text-sm text-chasescrollBlue font-bold">
                Ticket Fee
              </h2>
              <h3 className="font-light text-sm">$200</h3>
            </div>
          </div>
          <div className="grid gap-2">
            <ProfileIcon />
            <div className="grid gap-1">
              <h2 className="text-sm text-chasescrollBlue font-bold">Name</h2>
              <h3 className="font-light text-sm">David John Samuels</h3>
            </div>

            <div className="grid gap-1">
              <h2 className="text-sm text-chasescrollBlue font-bold">Time</h2>
              <h3 className="font-light text-sm">3:00PM</h3>
            </div>
          </div>
        </div>

        <div>
          <BarCode />
          <h3 className="font-bold text-sm text-center">
            Powered by Chasescroll
          </h3>
        </div>
      </div>

      <button className="bg-red-600 text-white border font-bold text-sm w-full rounded-md py-2 mt-8">
        {" "}
        Cancel Ticket
      </button>
    </div>
  </OverlayWrapper>
  )
}

export default CancelTicket