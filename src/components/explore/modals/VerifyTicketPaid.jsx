import OverlayWrapper from "@/components/OverlayWrapper"
import concert from "@/assets/images/concert.jpeg"
import { DownloadIcon} from "@/components/Svgs"

const VerifyTicketPaid = () => {
  return (
    <OverlayWrapper>
      <div className="w-1/4 flex flex-col gap-1 justify-evenly ">
        <div className="flex items-center gap-2 border rounded-lg">
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

          <DownloadIcon/>
        </div>
        <div className="border rounded-lg py-8">
          <div className="mx-auto w-1/5 bg-chasescrollBlue my-2 rounded h-14 flex justify-center items-center">
            <h1 className="text-3xl text-white font-bold text-center">OTP</h1>
          </div>

          <div className="mx-auto flex flex-col items-center">
            <h1 className="font-bold text-2xl">Verification</h1>
            <p className="px-4 text-center text-sm text-chasescrollGrey">an OTP has been sent to your phone number ending with ****3142</p>
          </div>
          <form className="grid">
            <div className="flex justify-between items-center my-4 mx-8 text-sm text-chasescrollBlue font-bold">
              <input type="password" name="" id="" className="border-2 rounded-lg" />
              <label>Enter OTP</label>
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

export default VerifyTicketPaid
