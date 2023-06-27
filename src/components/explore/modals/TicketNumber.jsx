import OverlayWrapper from "@/components/OverlayWrapper"
import { MinusIcon, PlusIcon, CloseIcon } from "@/components/Svgs"
import concert from "@/assets/images/concert.jpeg"

const TicketNumber = () => {
  return (
    <OverlayWrapper>
      <div className="w-1/4 flex flex-col gap-2">
        <div className="flex items-center gap-1 border rounded-lg">
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
        <div className="border rounded-lg my-2">
        <div className="mx-auto w-1/2 text-base text-chasescrollTextGrey my-2 ">
          <h3 className="text-center">Number of Tickets</h3>
          <div className="flex justify-between mb-2">
            <MinusIcon />
            <h1 className="text-4xl text-black">1</h1>
            <MinusIcon />

          </div>
        </div>
        <form className="grid gap-4 text-chasescrollTextGrey mb-6 px-3">
            <div className="flex justify-between py-2 border-b">
              <label>Buying for myself?</label>
              <input type="radio" name="number" id="" />
            </div>
            <div className="flex justify-between border-b py-2">
              <label>Buy for someone else?</label>
              <input type="radio" name="number" id="" />
            </div>
          </form>
        </div>
        <button className="bg-chasescrollBlue text-white border font-bold text-sm w-full rounded-md py-2">
          {" "}
          Pay now
        </button>
      </div>
    </OverlayWrapper>
  )
}

export default TicketNumber
