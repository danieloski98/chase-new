import React, { useState } from "react"
import {
  PHYSICAL_LOCATION_OPTIONS,
  ONLINE_PLATFORM_OPTIONS,
} from "@/constants/index"
import { ClockIcon, CalendarIcon } from "@/components/Svgs"
import { DatePicker } from "antd"
import { convertToISO } from "../../utils/helpers"

const EventInfo = ({ formData, handleChange, setFormData, handleContinue }) => {
  const [toBeAnnounced, setToBeAnnounced] = useState(false)

  const handleStartDateSelect = (date, dateString) => {
    setFormData(data => ({
      ...data,
      endDate: Date.parse(convertToISO(dateString)),
      endTime: Date.parse(convertToISO(dateString))
    }))
  }

  const handleEndDateSelect = (date, dateString) => {
    setFormData(data => ({
      ...data,
      startDate: Date.parse(convertToISO(dateString)),
      startTime: Date.parse(convertToISO(dateString))
    }))
  }

  return (
    <div>
      <div className="w-full h-full flex justify-center items-center mx-auto">
        <div className="bg-white rounded-xs shadow-xs px-4 md:p-8">
          <div className="">
            <h1 className="text-sm font-bold my-1">Event Date and Time</h1>

            <div className="flex flex-row gap-4 md:gap-8">
              <div className="flex border">
                <div className="justify-center items-center flex px-4">
                  <CalendarIcon />
                </div>
                <div className="w-fit flex flex-col gap-2 p-2">
                  {" "}
                  <p className="text-xs text-[#D0D4EB]">
                    {" "}
                    Start <span className="text-[#F04F4F]">*</span>
                  </p>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD h:mm a"
                    onChange={handleStartDateSelect}
                    className="text-xs md:text-sm px-2 w-40"
                    placeholder="Start date and time"
                  />
                </div>
              </div>

              <div className="flex border">
                <div className="justify-center items-center flex px-4">
                  <CalendarIcon />
                </div>
                <div className="w-fit flex flex-col gap-2 p-2">
                  {" "}
                  <p className="text-xs text-[#D0D4EB]">
                    {" "}
                    End <span className="text-[#F04F4F]">*</span>
                  </p>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD h:mm a"
                    onChange={handleEndDateSelect}
                    className="text-xs md:text-sm px-2 w-40"
                    placeholder="End date and time"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End of Event Date */}

          {!toBeAnnounced && (
            <div className="mt-2">
              <h1 className="text-base font-bold">Location Type</h1>
              <div className="">
                <div className="flex flex-row justify-between border-b p-2">
                  <label className="block text-[#667085] font-bold">
                    Physical Location
                  </label>
                  <select
                    className="text-sm underline text-chasescrollDarkBlue w-28"
                    onChange={({ target: { value } }) => setFormData(data => ({
                      ...data,
                      location: {
                        ...data.location,
                        locationDetails: value
                      }
                    }))}
                  >
                    <option value="" className="text-xs">add location</option>
                    {PHYSICAL_LOCATION_OPTIONS.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex flex-row justify-between border-b p-2">
                  <label className="block text-[#667085] font-bold ">
                    Online Event
                  </label>
                  <select
                    className="text-sm underline text-chasescrollDarkBlue w-28"
                    onChange={({ target: { value } }) => setFormData(data => ({
                      ...data,
                      location: {
                        ...data.location,
                        locationDetails: value
                      }
                    }))}
                  >
                    <option value="" className="text-xs">add location</option>
                    {ONLINE_PLATFORM_OPTIONS.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between border-b py-4 px-2">
            <label className="text-[#667085]">To be announced</label>
            <input
              type="checkbox"
              className="form-checkbox mt-2 mr-2 h-4 w-4 text-blue-600"
              value={toBeAnnounced}
              checked={toBeAnnounced}
              onChange={() => setToBeAnnounced(state => !state)}
            />
          </div>

          {/* End of Location Type */}

          <div className="mt-3 mb-2">
            <h1 className="text-base font-bold">Venue Location</h1>
            <textarea
              placeholder="Church of 8 wheels, Oak Street"
              className="border w-full px-4 py-2 outline-none"
              rows={4}
              cols={48}
              value={formData?.location?.address}
              onChange={({ target: { value } }) => setFormData(data => ({
                ...data,
                location: {
                  ...data.location,
                  address: value
                }
              }))}
            />
          </div>
          {/* End of Venue */}

          <div className="mt-3 mb-2">
            <h1 className="text-base font-bold">Location Map</h1>
            <div className="overflow-auto rounded-lg h-[189px]">
              {/* <Map location={formData?.location} zoomLevel={17} /> */}
            </div>
          </div>
          {/* End of Map */}
        </div>
      </div>

      <div className="flex items-center justify-center text-chasescrollBlue  text-base md:text-lg font-bold my-4">
        {/* <button onClick={handleBack}>Back</button> */}
        <button
          type="submit"
          className="hover:text-xl"
          onClick={() => handleContinue()}
          id="continueButton"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default EventInfo
