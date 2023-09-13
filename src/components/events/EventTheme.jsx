import { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import Dropzone from "@/components/events/Dropzone"
import { ClosedEyeIcon, OpenEyeIcon, DropDownMenu } from "@/components/Svgs"
import { useAuth } from "../../context/authContext"
import { useFetch } from "../../hooks/useFetch"
import { GET_EVENTS_TYPES } from "../../constants/endpoints.constant"
import { PictureIcon, VideoCameraIcon } from "../Svgs"
import { toast } from "react-toastify"

const EventTheme = ({
  formData,
  handleChange,
  handleFileChange,
  setImage,
  selectedImage,
  setSelectedImage,
  handleContinue, 
}) => {
  const [types, setTypes] = useState([])

  const { token } = useAuth()
  const { sendRequest } = useFetch()

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      setImage(file)
      setSelectedImage(file.name);
    })
  }, [])


  const getEventsCategory = () => {
    sendRequest(
      GET_EVENTS_TYPES,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    ).then((data) => { 
      setTypes(data)
    })
  }
  

  useEffect(() => {
    getEventsCategory()
  }, []) 

  const clickHandler =()=> {
    if(!formData?.eventName){
      toast.error("Enter Event Name")
    } else if(!formData?.eventType){
      toast.error("Enter Event Type")
    } else if(!formData?.eventDescription){
      toast.error("Enter Event Description")
    } else {
      handleContinue()
    }
  }

  return (
    <div className="px-4 mx-auto">
      <div>
        <h1 className="text-base md:text-xl font-bold">Event Cover Image</h1>
        <h3 className="text-xs md:text-base md:opacity-50 ">
          Add photos/posters that describes details of your events. you can add
          upto 10 images
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 max-w-fit mx-auto">
        <div className="grid gap-4 w-full max-w-sm text-chasescrollTextGrey">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center border border-dashed border-chasescrollPalePurple w-full max-w-[361px] h-[228px]">
              {/* <Dropzone
                onDrop={onDrop}
                accept={"image/*"}
                onChange={handleFileChange}
                name="picUrls"
              >

              </Dropzone> */}
              <label htmlFor="image" className="grid place-items-center gap-4">
                <p className="dropzone-content text-sm md:text-sm">
                  Click to upload image
                </p>
                <div className="flex items-center justify-center gap-2">
                  {/* <VideoCameraIcon /> */}
                  <PictureIcon />
                </div>
                {selectedImage}
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="text-xs text-center text-chasescrollGray flex justify-between w-full">
              <div>
                <h3>Image size:</h3>
                <h3>2160 x 1080px</h3>
              </div>
              <div>
                <h3>Max. file size:</h3>
                <h3>10MB</h3>
              </div>
              <div>
                <h3>Image type:</h3>
                <h3>JPEG/PNG</h3>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold">
              Basic Event Details
            </h1>
            <h3 className="text-xs md:text-sm text-chasescrollTextGray">
              This section highlights details that should attract attendees to your event
            </h3>
          </div>

          <div className="grid text-sm relative">
            <label className="text-sm absolute left-6 -top-2 bg-white px-2">
              Event Title <span className="text-chasescrollRed"> *</span>
            </label>
            <input
              type="text"
              placeholder="Give a title that has a clear description of your event"
              className="border text-sm rounded-md text-chasescrollTextGrey p-3"
              name="eventName"
              onChange={handleChange}
              value={formData?.eventName}
            />
          </div>

          <div className="grid text-sm relative">
            <label className="absolute text-xs md:text-sm left-6 -top-2 bg-white px-2">
              Organizer <span className="text-chasescrollRed"> *</span>
            </label>
            <input
              type="text"
              placeholder="Tell attendees who is hosting Event"
              className="border text-sm rounded-md text-chasescrollTextGrey p-3"
              name="organizer"
              onChange={handleChange}
              value={formData?.organizer}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-sm text-chasescrollTextGrey">
          <select
            name="eventType"
            id="eventType"
            className="p-2 border rounded-md text-sm cursor-pointer outline-none"
            onChange={handleChange}
            value={formData?.eventType}
          >
            <option value="">Event Type</option>
            {types?.sort()?.map(type => (
              <option value={type}>
                {type.split("_").join(" ")}
              </option>
            ))}
          </select>
          <label htmlFor="eventDescription" className="border text-sm w-full p-2 rounded-md">
            <p className="text-sm text-chasescrollTextGrey mb-2">
              Event Description
            </p>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData?.eventDescription}
              onChange={handleChange}
              className="outline-none w-full h-20 text-sm"
            />
          </label>
          <div className="grid gap-2 ">
            <h2 className="font-bold text-sm px-2">Join Type</h2>
            <label htmlFor="publicSetting" className="flex justify-between border-b text-sm p-2 cursor-pointer">
              <p className="text-sm">
                Public
              </p>
              <input
                type="radio"
                id="publicSetting"
                name="joinSetting"
                value="public"
                onChange={handleChange}
                checked={formData?.joinSetting === "public"}

              />
            </label>
            <label htmlFor="privateSetting" className="flex justify-between border-b text-sm p-2 cursor-pointer">
              <p className="text-sm">
                Private
              </p>
              <input
                type="radio"
                id="privateSetting"
                name="joinSetting"
                value="private"
                onChange={handleChange}
                checked={formData?.joinSetting === "private"}
              />
            </label>
          </div>

          <div className="grid gap-2 ">
            <h2 className="font-bold text-sm px-2">Event Visibility</h2>
            <label htmlFor="publicVisibility" className="flex justify-between border-b text-sm p-2 cursor-pointer">
              <p className="text-sm">
                Public
              </p>
              <input
                type="radio"
                id="publicVisibility"
                name="isPublic"
                value={true}
                onChange={handleChange}
                checked={formData?.isPublic}
              />
            </label>
            <label htmlFor="privateVisibility" className="flex justify-between border-b text-sm p-2 cursor-pointer">
              <p className="text-sm">
                Private
              </p>
              <input
                type="radio"
                id="privateVisibility"
                name="isPublic"
                value={false}
                onChange={handleChange}
                checked={!formData?.isPublic}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid md:mx-56">
        <h2 className="font-bold text-sm px-2 mb-3">Attendee Visibility</h2>
        <div className="flex justify-between">
          <label htmlFor="showAttendees" className={`flex justify-between rounded w-32 px-4 py-2 cursor-pointer ${formData?.attendeesVisibility ? "bg-chasescrollGray bg-opacity-[45%]" : "border"}`}>
            <div className="grid">
              <OpenEyeIcon />
              <h3>Show</h3>
            </div>

            <input
              type="radio"
              id="showAttendees"
              name="attendeesVisibility"
              value={true}
              onChange={handleChange}
              checked={formData?.attendeesVisibility}
            />
          </label>
          <label htmlFor="hideAttendees" className={`flex justify-between rounded w-32 px-4 py-2 cursor-pointer ${!formData?.attendeesVisibility ? "bg-chasescrollGray bg-opacity-[45%]" : "border"}`}>
            <div className="grid">
              <ClosedEyeIcon />
              <h3>Hide</h3>
            </div>

            <input
              id="hideAttendees"
              type="radio"
              name="attendeesVisibility"
              value={false}
              onChange={handleChange}
              checked={!formData?.attendeesVisibility}
            />
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center  text-base md:text-lg font-bold my-4">
        {/* <button onClick={handleBack}>Back</button> */}
        <button
          type="submit"
          className={`hover:text-xl ${!formData?.eventName || 
            !formData?.eventType ||
            !formData?.eventDescription ||
            !formData?.joinSetting ||
            !formData?.attendeesVisibility
            ? "text-red-500 transition animate-pulse cursor-not-allowed"
            : "text-chasescrollBlue"
            }`}
          onClick={clickHandler} 
          id="continueButton"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

EventTheme.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
}

export default EventTheme
