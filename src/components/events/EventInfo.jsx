import React, { useState } from "react"
import {
  PHYSICAL_LOCATION_OPTIONS,
  ONLINE_PLATFORM_OPTIONS,
} from "@/constants/index"
import { ClockIcon, CalendarIcon } from "@/components/Svgs"
import { DatePicker } from "antd"
import { convertToISO } from "../../utils/helpers"
import { toast } from "react-toastify"

const EventInfo = ({ formData, handleChange, setFormData, handleContinue }) => {
  const [toBeAnnounced, setToBeAnnounced] = useState(false)
  const [selectType, setSelectType] = useState("")

  const handleStartDateSelect = (date, dateString) => {  
    setFormData(data => ({
      ...data,
      startDate: Date.parse(new Date(date?.$d).toJSON()),
      startTime: Date.parse(new Date(date?.$d).toJSON())
    }))
  }

  const handleEndDateSelect = (date, dateString) => {
    setFormData(data => ({
      ...data,
      endDate: Date.parse(new Date(date?.$d).toJSON()),
      endTime: Date.parse(new Date(date?.$d).toJSON()),
    }))
  } 

  // location: {
  //   link: "",
  //   address: "",
  //   locationDetails: "",
  //   latlng: "",
  //   placeIds: ""
  // },
  const clickHandler =()=> {
    if(!formData?.startDate){
      toast.error("Enter Event Starting Date")
    } else if(!formData?.endDate){
      toast.error("Enter Event Ending Date")
    } else if(!formData?.location?.locationDetails && !formData?.location?.link){
      toast.error("Enter Event Location") 
    }  else {
      handleContinue()
    } 
  }

  console.log();

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
                    format="DD-MM-YYYY h:mm a"
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
                    format="DD-MM-YYYY h:mm a"
                    onChange={handleEndDateSelect}
                    className="text-xs md:text-sm px-2 w-40"
                    placeholder="End date and time"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End of Event Date */}

          {!formData?.location?.toBeAnnounced && (
            <div className="mt-2">
              <h1 className="text-base font-bold">Location Type</h1>
              <div className="">
                <div className="flex flex-row justify-between border-b p-2">
                  <label className="block text-[#667085] font-bold">
                    Location
                  </label>
                  <select
                    className="text-sm underline text-chasescrollDarkBlue w-36" 
                    onChange={(e)=> setSelectType(e.target.value)}
                    value={formData?.location?.link ? "Online Location" : formData?.location?.link ? "Physical Location": ""}
                  >
                    <option value="" className="text-xs">add location</option>
                    <option>Physical Location</option>
                    <option>Online Location</option>
                    {/* {PHYSICAL_LOCATION_OPTIONS.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}
                  </select>
                </div>
                {(selectType === "Physical Location" || formData?.location?.locationDetails) &&( 
                  <input
                    type="text"
                    placeholder="Enter Event Location"
                    className="border w-full mt-4 text-sm rounded-md text-chasescrollTextGrey p-3"
                    name="locationDetails"
                    onChange={({ target: { value } }) => setFormData(data => ({
                      ...data,
                      location: {
                        ...data.location,
                        locationDetails: value
                      }
                    }))}
                    value={formData?.location?.locationDetails}
                  />
                )}

                {/* <div className="mt-4 flex flex-row justify-between border-b p-2">
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
                </div>  */}
                {(selectType === "Online Location" || formData?.location?.link )&&( 
                  <input
                    type="text"
                    placeholder="Enter Online Link"
                    className="border w-full mt-4 text-sm rounded-md text-chasescrollTextGrey p-3"
                    name="organizer"
                    onChange={({ target: { value } }) => setFormData(data => ({
                      ...data,
                      location: {
                        ...data.location,
                        link: value
                      }
                    }))}
                    value={formData?.location?.link}
                  />
                )}
              </div>
            </div>
          )}
          <div className="flex justify-between border-b py-4 px-2">
            <label className="text-[#667085]">To be announced</label>
            <input
              type="checkbox"
              className="form-checkbox mt-2 mr-2 h-4 w-4 text-blue-600"
              value={toBeAnnounced}
              checked={formData?.location?.toBeAnnounced}
              onChange={({ target: { checked } }) => setFormData(data => ({
                ...data,
                location: {
                  ...data.location,
                  toBeAnnounced: checked
                }
              }))}
            />
          </div>

          {/* End of Location Type */}

          <div className="mt-3 mb-2">
            <h1 className="text-base font-bold">Venue Details</h1>
            <textarea
              placeholder="Example: Behind Chervon gas station "
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

          {/* <div className="mt-3 mb-2">
            <h1 className="text-base font-bold">Location Map</h1>
            <div className="overflow-auto rounded-lg h-[189px]">
              <Map location={formData?.location} zoomLevel={17} />
            </div>
          </div> */}
          {/* End of Map */}
        </div>
      </div>

      <div className="flex items-center justify-center text-chasescrollBlue  text-base md:text-lg pt-4 font-bold my-4">
        {/* <button onClick={handleBack}>Back</button> */}
        <button
          type="submit"
          className="hover:text-xl"
          onClick={() => clickHandler()}
          id="continueButton"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default EventInfo
