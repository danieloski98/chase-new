import Barcode from "react-barcode"
import PropTypes from "prop-types"
import { COMPANY_NAME, EVENT_TYPE } from "../../../constants"
import OverlayWrapper from "../../OverlayWrapper"
import { CaretLeftIcon } from "../../Svgs"
import profileAvatar from "@/assets/svg/bitmoji-profile-avatar.svg"
import { formatDate, formatNumber, formatTime } from "../../../utils/helpers"

const DownloadTicketModal = ({
  userName,
  banner,
  eventName,
  location,
  orderId,
  date,
  time,
  ticketFee,
  closeModal,
  handleClose,
  type,
  length,
  currency,
  profile
}) => {
  return (
    <OverlayWrapper handleClose={handleClose}>
      <div className="p-4 w-full h-full flex flex-col items-center justify-center gap-1">
        <div className="w-full max-w-sm bg-white rounded-t-md flex flex-col gap-2 p-6 shadow-lg relative border border-gray-100">
          <div className="flex text-center text-lg relative">
            <button
              className="cursor-pointer z-10 absolute -left-2 top-0.5"
              onClick={closeModal}
            >
              <CaretLeftIcon />
            </button>
            <p className="w-full text-center">Ticket Details</p>
          </div>
          <div className="flex items-center gap-4 py-2">
            <img
              src={banner}
              alt=""
              className="rounded-b-3xl rounded-tl-3xl -rounded-b-3xl w-36"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">{eventName}</p>
              <p className="text-xs text-chasescrollBlue">{location}</p>
            </div>
          </div>
          <div className="border border-dashed border-gray-400"></div>
          <div className="flex">
            <div className="p-4 basis-1/2 w-full flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-2">
                <h3 className="text-chasescrollBlue font-bold">Place</h3>
                <p className="text-chasescrollTextGrey">{location}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-chasescrollBlue font-bold">Order ID</h3>
                <p className="text-chasescrollTextGrey">{orderId}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-chasescrollBlue font-bold">Date</h3>
                <p className="text-chasescrollTextGrey">
                  {formatDate(date, "MMM DD, YYYY")}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-chasescrollBlue font-bold">Ticket Fee</h3>
                <p className="text-chasescrollTextGrey">
                  {ticketFee === EVENT_TYPE.free
                    ? EVENT_TYPE.free
                    : formatNumber(ticketFee, currency === "USD" ? "$" : "₦")}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-chasescrollBlue font-bold">Ticket Type</h3>
                <p className="text-chasescrollTextGrey">
                  {ticketFee === EVENT_TYPE.free
                    ? EVENT_TYPE.free
                    : type}
                </p>
              </div>
            </div>
            <div className="p-4 basis-1/2 w-full flex flex-col gap-4 text-xs justify-between">
              <img src={profile} alt="" className="w-24 h-24 rounded-full object-cover" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-chasescrollBlue font-bold">Name</h3>
                  <p className="text-chasescrollTextGrey">{userName}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-chasescrollBlue font-bold">Time</h3>
                  <p className="text-chasescrollTextGrey">{formatTime(time)}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-chasescrollBlue font-bold">Number</h3>
                  <p className="text-chasescrollTextGrey">{length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-dashed border-gray-400"></div>
          <div className="w-fit max-w-sm self-center">
            <Barcode
              value={`Powered by ${COMPANY_NAME}`}
              width={1}
              height={80}
              fontSize={12}
            />
          </div>
        </div>
        {/* <button className="shadow-lg w-full max-w-sm text-sm text-white text-center px-4 py-3 bg-chasescrollBlue rounded-b-md">
          Download Ticket
        </button> */}
      </div>
    </OverlayWrapper>
  )
}

DownloadTicketModal.propTypes = {
  userName: PropTypes.string,
  banner: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  eventName: PropTypes.string,
  location: PropTypes.string,
  orderId: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  ticketFee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closeModal: PropTypes.string,
}

export default DownloadTicketModal
