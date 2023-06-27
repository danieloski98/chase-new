import OverlayWrapper from "@/components/OverlayWrapper"
import { COMPANY_NAME } from "@/constants"
import { CaretLeftIcon } from "@/components/Svgs"
import { useState } from "react"

const RefundPolicy = ({
  banner,
  eventName,
  location,
  policy,
  closeModal,
  goBack,
  selectPaymentMethod,
  handleClose,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const toggleAcceptance = () => setTermsAccepted(state => !state)

  return (
    <OverlayWrapper handleClose={handleClose}>
      <div className="p-4 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-sm bg-white rounded-md flex flex-col gap-6 p-6 pt-16 shadow-lg relative border border-gray-100">
          <button
            className="cursor-pointer z-10 absolute top-6 left-4"
            onClick={() => {
              closeModal()
              goBack()
            }}
          >
            <CaretLeftIcon />
          </button>
          <div className="flex items-center gap-4">
            <img
              src={banner}
              alt="event banner"
              className="rounded-b-3xl rounded-tl-3xl -rounded-b-3xl w-36"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">{eventName}</p>
              <p className="text-xs text-chasescrollBlue">{location}</p>
            </div>
          </div>
          <div className="border border-dashed border-gray-400"></div>
          <h1 className="text-2xl font-bold text-center">
            {COMPANY_NAME}
            <br />
            Refund Policy
          </h1>
          <div className="mx-auto flex flex-col items-center">
            <p className="text-sm text-chasescrollTextGrey">{policy}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="acceptTerms"
                value={termsAccepted}
                onChange={toggleAcceptance}
                className="w-5 h-5 cursor-pointer"
              />
              <label htmlFor="acceptTerms" className="text-xs leading-5">
                Accept. By clicking Continue, you hereby accept the{" "}
                <span className="text-chasescrollBlue cursor-pointer">
                  {COMPANY_NAME} Refund policy
                </span>
              </label>
            </div>
            <button
              disabled={!termsAccepted}
              onClick={() => {
                closeModal()
                selectPaymentMethod()
              }}
              className={`bg-chasescrollBlue text-white border font-bold text-sm w-full rounded-md py-3 ${!termsAccepted ? "opacity-30 cursor-not-allowed" : ""
                }`}
            >
              Purchase Ticket
            </button>
          </div>
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default RefundPolicy
