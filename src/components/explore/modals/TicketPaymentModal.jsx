import PropTypes from "prop-types"
import { useState } from "react"
import { CLOSE_ENTITY } from "@/constants"
import { formatNumber } from "@/utils/helpers"
import OverlayWrapper from "@/components/OverlayWrapper"
import { AddIcon, SubtractIcon } from "@/components/Svgs"

const TicketPaymentModal = ({
  eventName,
  banner,
  location,
  ticketPrice = 0,
  serviceFee = 1.77,
  categoryType,
  toggleModal,
  toggleRefundPolicy,
  ticketCount,
  setTicketCount,
  currency,
  handleClose,
}) => {
  const increaseTicketCount = () => setTicketCount(count => count + 1)
  const decreaseTicketCount = () => {
    setTicketCount(count => (count < 2 ? count : count - 1))
  }

  const disabled = ticketCount < 2

  let price = ticketPrice *ticketCount
  let service = price * 0.025

  let usdtotal =  ((((ticketPrice * ticketCount) * 1.025) + 0.39)/(1-0.059)) 
  let nairatotal = ((((ticketPrice * ticketCount) * 1.025) + 100)/(1-0.039))


  return (
    <OverlayWrapper handleClose={handleClose}>
      <div className="p-4 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-sm bg-white rounded-md flex flex-col gap-8 px-6 pt-16 pb-6 shadow-lg relative border border-gray-100">
          <button
            onClick={toggleModal}
            className="absolute top-4 left-6 text-2xl text-gray-800"
          >
            {CLOSE_ENTITY}
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
          <div className="flex flex-col gap-4 items-center">
            <p className="">Number of Tickets</p>
            <div className="flex gap-4 items-center">
              <button
                onClick={decreaseTicketCount}
                disabled={disabled}
                className={`text-black w-6 h-6 ${disabled ? "opacity-20 cursor-not-allowed" : ""
                  }`}
              >
                <SubtractIcon />
              </button>
              <div className="text-lg w-8 text-center">{ticketCount}</div>
              <button
                onClick={increaseTicketCount}
                className="text-black w-6 h-6"
              >
                <AddIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-sm">
              <p className="flex justify-between capitalize">
                {categoryType} ticket{ticketCount > 1 && "s"} [{ticketCount}]
              </p>
              <div className="flex justify-between">
                <p>Ticket Price</p>
                <p>{formatNumber(price, currency === "USD" ? "$" : "₦")}</p>
              </div>
              <div className="flex justify-between">
                <p>Service Fee</p>
                <p>{formatNumber(service, currency === "USD" ? "$" : "₦")}</p>
              </div>
              <div className="flex justify-between">
                <p>Processing Fee</p>
                <p>{formatNumber((currency === "USD" ? usdtotal - price -service :  nairatotal - price -service), currency === "USD" ? "$" : "₦")}</p>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <p>
                  {formatNumber((currency === "USD" ? usdtotal: nairatotal), currency === "USD" ? "$" : "₦")}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                toggleModal()
                toggleRefundPolicy()
              }}
              className="rounded-md bg-chasescrollBlue w-full text-white py-3"
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
    </OverlayWrapper>
  )
}

TicketPaymentModal.propTypes = {
  eventName: PropTypes.string,
  eventBanner: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  eventLocation: PropTypes.string,
  ticketPrice: PropTypes.number,
  serviceFee: PropTypes.string,
  categoryType: PropTypes.string,
  toggleModal: PropTypes.func,
  toggleRefundPolicy: PropTypes.func,
}

export default TicketPaymentModal
