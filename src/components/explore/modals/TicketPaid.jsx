import OverlayWrapper from "@/components/OverlayWrapper"
import logo from "../../../../assets/images/chasescroll-logo.png"
import {
  ArrowLeft,
  PayStackLogo,
  LockIcon,
} from "@/components/Svgs"

const TicketPaid = () => {
  return (
    <OverlayWrapper>
      <div className="flex flex-col rounded-lg text-center gap-2">
        <div className="flex mb-2 text-2xl bg-transparent py-2">
          Card Details
        </div>
        <div className="rounded-lg border">
          <form className="grid gap-4 mx-4 rounded-lg">
            <div className="grid py-2 px-2">
              <label className="text-left">Card Name</label>
              <input type="text" name="" id="" className="border-2 rounded" />
            </div>
            <div className="grid px-2">
              <label className="text-left">Card Number</label>
              <input
                type="password"
                value="*********"
                name=""
                id=""
                className="border-2 rounded"
              />
            </div>

            <div className="flex justify-between">
              <div className="grid py-2 px-2 gap-2">
                <label className="text-left">CVV</label>
                <input
                  type="password"
                  value="*********"
                  name=""
                  id=""
                  className="border-2 rounded"
                />
              </div>

              <div className="grid py-2 gap-2 px-2">
                <label className="text-left">Expiry Date</label>
                <input
                  type="password"
                  value="*********"
                  name=""
                  id=""
                  className="border-2 rounded"
                />
              </div>
            </div>

            <div className="flex flex-row py-2 px-2 gap-1 font-bold">
              <input type="checkbox" value="*********" name="" id="" />
              <label className="text-left text-sm">save card information</label>
            </div>
          </form>
        </div>
        <button className="bg-chasescrollBlue border text-white font-bold text-base w-full rounded-lg py-2">
          {" "}
          Pay $200
        </button>

        <div className="mx-auto grid gap-1 font-bold my-2 rounded-lg shadow-inner px-2">
          <div className="flex flex-row gap-2 my-2 justify-center items-center">
            <LockIcon />
            <h3>secured with stripe</h3>
          </div>
          <h3 className="text-xs">You can pay with</h3>
          <div className="flex flex-row gap-2 justify-center items-center ">
            <PayStackLogo />
            <h3>paystack</h3>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center">
            <PayStackLogo />
            <h3>wallet</h3>
          </div>
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default TicketPaid
