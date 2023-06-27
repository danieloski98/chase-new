import React, { useState, useEffect } from "react"
// import DatePicker from "react-datepicker"
// import TimePicker from "react-time-picker"
import GroupAvatar from "@/assets/svg/group-avatar.svg"

import {
  ClockIcon,
  CalenderIcon,
  OpenFolderIcon,
  QuestionIcon,
} from "@/components/Svgs"
import OverlayWrapper from "../OverlayWrapper"
import { CalendarIcon, CloseIcon } from "../Svgs"
import { DatePicker } from "antd"
import { convertToISO } from "../../utils/helpers"
import CommunityFunnel from "./CommunityFunnel"
import CONFIG from "../../config"
import { CLOSE_ENTITY } from "../../constants"

const EventTicket = ({ formData, setFormData, handleChange, handleSubmit }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFree, setIsFree] = useState(false)
  const [showFunnel, setShowFunnel] = useState(false)
  const [funnel, setFunnel] = useState(null)

  // const [categories, setCategories] = useState([])

  const toggleTooltip = () => setShowTooltip(state => !state);
  const toggleFunnel = () => setShowFunnel(state => !state);
  const toggleStatus = () => {
    setIsFree(state => !state)
    if (isFree) {
      setFormData(data => ({
        ...data,

      }))
    }
  }

  const handleExpirationDateSelect = (date, dateString) => {
    setFormData(data => ({
      ...data,
      expirationDate: convertToISO(dateString)
    }))
  }

  return (
    <div className="py-6 flex flex-col justify-center items-center relative mx-auto w-full max-w-2xl">
      {showTooltip && (
        <OverlayWrapper handleClose={toggleTooltip}>
          <div className="flex w-fit h-fit p-4">
            <div className="bg-white border shadow-lg rounded-[32px] p-8 w-full max-w-xl flex flex-col gap-4 justify-center">
              <h1 className="text-xl font-bold">
                Why & how to add community funnel?
              </h1>
              <p className="leading-5">
                Link your event to a new or existing community so that all
                your attendees will be added automatically into a community.
                Here, they can ask questions, you can share future events and
                also network with other event attendees. You can organically
                grow any community of your choice, share pictures, videos,
                engage attendees in one on one chat or group chat.
              </p>
              <button
                onClick={toggleTooltip}
                className="text-lg font-bold text-chasescrollBlue"
              >
                Ok
              </button>
            </div>
          </div>
        </OverlayWrapper>
      )}
      {showFunnel && (
        <CommunityFunnel
          toggleFunnel={toggleFunnel}
          funnel={funnel}
          setFunnel={setFunnel}
          setFormData={setFormData}
        />
      )}
      <div className="flex flex-col justify-center ">
        <div className="flex gap-2">
          <label
            className={`text-[#667085] border rounded-lg hover:text-chasescrollBlue hover:bg-chasescrollBlue hover:bg-opacity-[5%] cursor-pointer basis-1/3 p-2 flex justify-center items-center gap-2 ${!isFree
              ? "bg-chasescrollBlue bg-opacity-[5%] text-chasescrollBlue"
              : ""
              }`}
            htmlFor="isPaid"
          >
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 text-sm md:text-base"
              checked={!isFree}
              id="isPaid"
              onChange={toggleStatus}
            />
            Paid
          </label>
          <label
            className={`text-[#667085] border rounded-lg hover:text-chasescrollBlue hover:bg-chasescrollBlue hover:bg-opacity-[5%] cursor-pointer basis-1/3 p-2 flex justify-center items-center gap-2 ${isFree
              ? "bg-chasescrollBlue bg-opacity-[5%] text-chasescrollBlue"
              : ""
              }`}
            htmlFor="isFree"
          >
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 text-sm md:text-base"
              checked={isFree}
              id="isFree"
              onChange={toggleStatus}
            />
            Free
          </label>
        </div>

        <div className="mt-4">
          <h1>Ticket Category</h1>
          <div className="flex gap-2 mt-4 ">
            <button className="">
              <label
                className={`text-[#667085] border rounded-lg px-6 md:px-16 py-2 hover:text-chasescrollBlue hover:bg-chasescrollBlue hover:bg-opacity-[5%] ${formData.isRegular
                  ? "bg-chasescrollBlue bg-opacity-[5%] text-chasescrollBlue"
                  : ""
                  }`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-3 w-3 mr-2 text-blue-600 text-sm md:text-base"
                  checked={formData.isRegular}
                  name="isRegular"
                  onChange={e => handleChange("isRegular", e.target.checked)}
                />
                Regular
              </label>
            </button>
            <button className="">
              <label
                className={`text-[#667085] border rounded-lg px-6 md:px-16 py-2 hover:text-chasescrollBlue hover:bg-chasescrollBlue hover:bg-opacity-[5%] ${formData.isGold
                  ? "bg-chasescrollBlue bg-opacity-[5%] text-chasescrollBlue"
                  : ""
                  }`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-3 w-3 mr-2 text-blue-600 text-sm md:text-base"
                  checked={formData.isGold}
                  name="isGold"
                  onChange={e => handleChange("isGold", e.target.checked)}
                />
                Gold
              </label>
            </button>
            <button className="">
              <label
                className={`text-[#667085] border rounded-lg px-6 md:px-16 py-2 hover:text-chasescrollBlue hover:bg-chasescrollBlue hover:bg-opacity-[5%] ${formData.isExclusive
                  ? "bg-chasescrollBlue bg-opacity-[5%] text-chasescrollBlue"
                  : ""
                  }`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-3 w-3 mr-2 text-blue-600 text-sm md:text-base"
                  checked={formData.isExclusive}
                  name="isExclusive"
                  onChange={e =>
                    handleChange("isExclusive", e.target.checked)
                  }
                />
                VIP
              </label>
            </button>
          </div>
        </div>

        <div className="my-4">
          <label className="block text-gray-700 font-medium mb-2">
            Enter Price
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="block text-xs md:text-sm w-1/3 px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter amount"
              value={formData.regularPrice}
              name="regularPrice"
              onChange={e => handleChange("regularPrice", e.target.value)}
            />
            <input
              type="text"
              className="block text-xs md:text-sm w-1/3 px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter amount"
              value={formData.goldPrice}
              name="goldPrice"
              onChange={e => handleChange("goldPrice", e.target.value)}
            />
            <input
              type="text"
              className="block text-xs md:text-sm w-1/3 px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter amount"
              value={formData.vipPrice}
              name="vipPrice"
              onChange={e => handleChange("vipPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Indicate total number of tickets available to be sold for your
            events
          </label>
          <input
            type="text"
            className="block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder=" Type in available quantity"
            value={formData.totalTicketAvailable}
            name="totalTicketAvailable"
            onChange={e =>
              handleChange("totalTicketAvailable", e.target.value)
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Indicate the minimum and maximum number of tickets each user can
            purchase for your event
          </label>
          <input
            type="text"
            className="block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Type in minimum no of Tickets"
            value={formData.minTicketBuy}
            name="minTicketBuy"
            onChange={e => handleChange("minTicketBuy", e.target.value)}
          />
          <input
            type="text"
            className="block mt-4 w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Type in maximum no. of Tickets"
            value={formData.maxTicketBuy}
            name="maxTicketBuy"
            onChange={e => handleChange("maxTicketBuy", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <h1>Ticket Expiration Date</h1>
          <div className="flex border w-fit">
            <div className="justify-center items-center flex px-4">
              <CalendarIcon />
            </div>
            <div className="flex flex-col gap-2 p-2">
              {" "}
              <p className="text-xs text-[#D0D4EB]">
                {" "}
                End <span className="text-[#F04F4F]">*</span>
              </p>
              <DatePicker
                showTime
                format="YYYY-MM-DD h:mm a"
                onChange={handleExpirationDateSelect}
                className="text-xs md:text-sm px-2 w-40"
                placeholder="End date and time"
              />
            </div>
          </div>
        </div>

        <div className="flex mt-2 justify-between">
          <div className="flex cursor-pointer" onClick={toggleFunnel}>
            <OpenFolderIcon />
            <span className="text-chasescrollBlue underline hover:text-chasescrollDarkBlue ml-2">
              Select community funnel
            </span>
          </div>
          <div className="cursor-pointer " onClick={toggleTooltip}>
            <QuestionIcon />
          </div>
        </div>

        {/* TODO: add funnel */}
        {/* <div className="mt-4 flex rounded-xl shadow-lg pl-4 py-4">
            <img src={GroupAvatar} alt="Group Avatar" />
            <div className="ml-2">
              <h1 className="font-bold">BTC Blockchain Community</h1>
              <span className="text-[#2E2B2B] opacity-60">2k+ Members</span>
            </div>
          </div> */}
      </div>
      {funnel && (
        <div className="flex justify-between p-2 rounded-lg shadow-lg w-full max-w-md self-start my-4">
          <div className="flex gap-2">
            <img
              alt="community funnel banner"
              src={funnel?.data?.imgSrc === "string" || !funnel?.data?.imgSrc ? `https://ui-avatars.com/api/?background=random&name=${funnel?.data?.name}&length=1` : `${CONFIG.RESOURCE_URL}${funnel?.data?.imgSrc}`}
              className="object-cover rounded-b-full rounded-tl-full w-8 h-8"
            />
            <div className="flex flex-col">
              <p className="text-base">{funnel?.data?.name}</p>
              <p className="text-xs">{funnel?.data?.description}</p>
            </div>
          </div>
          <span
            className="cursor-pointer"
            onClick={() => setFunnel(null)}
          >
            {CLOSE_ENTITY}
          </span>
        </div>
      )}
      <div className="flex justify-center my-4 w-full">
        {/* <button onClick={handleBack}>Back</button> */}
        <button
          className="w-full py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default EventTicket
