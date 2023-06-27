import React, { useState } from "react"
import PageWrapper from "@/components/PageWrapper"
import { ChevronLeft } from "@/components/Svgs"
import { previousPage } from "@/constants/index"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import { toast } from "react-toastify";
import ButtonSpinner from "../../../components/ButtonSpinners"
import { UPDATE_PROFILE } from "../../../constants/endpoints.constant"

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

function PersonalInfoForm() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState(GENDERS[0].value)
  const [isPhonePublic, setIsPhonePublic] = useState(false)
  const [isEmailPublic, setIsEmailPublic] = useState(false)

  const { sendRequest, isLoading } = useFetch()
  const { token, userId } = useAuth()

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePhoneChange = event => {
    setPhone(event.target.value)
  }

  const handleGenderChange = event => {
    setGender(event.target.value)
  }

  const handlePhonePublicToggle = () => {
    setIsPhonePublic(isPhonePublic => !isPhonePublic)
  }

  const handleEmailPublicToggle = () => {
    setIsEmailPublic(isEmailPublic => !isEmailPublic)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const data = await sendRequest(
      UPDATE_PROFILE,
      "PUT",
      {
        publicProfile: isPhonePublic || isEmailPublic,
        email,
        data: {
          mobilePhone: {
            objectPublic: isPhonePublic,
            value: phone
          },
          gender: {
            value: gender
          },
          webAddress: {
            objectPublic: isEmailPublic,
            value: email
          },
        }
      },
      { Authorization: `Bearer ${token}` }
    )
    if (data) toast.success('Profile updated successfully!');
  }

  return (
    <PageWrapper>
      {() => (
        <div className=" w-full items-center justify-center flex flex-col p-4 bg-white">
          <div className="flex items-center w-full mb-4 p-2 ">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {ChevronLeft()}{" "}
            </span>
            <p className="text-gray-700 text-lg">Personal Information</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full sm:w-1/2 overflow-auto">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Enter your phone"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
                className="  border border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline"
              >
                {GENDERS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-4 bg-blue-">
              <input
                type="date"
                id="name"
                name="name"
                className="border border-gray-400 p-2 rounded-lg w-full bg-blue-100 bg-opacity-50"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4 flex items-center w-full">
              <label
                htmlFor="emailPublicToggle"
                className="flex w-full justify-between items-center cursor-pointer"
              >
                <span className="mr-2">Make Phone Public:</span>
                <div className="relative flex justify-between items-center">
                  {/* <input
                  type="checkbox"
                  id="emailPublicToggle"
                  name="emailPublicToggle"
                  checked={isEmailPublic}
                  onChange={handleEmailPublicToggle}
                  className="hidden"
                /> */}
                  <div onClick={handlePhonePublicToggle}>
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className={`toggle__dot absolute w-6 h-6 rounded-full shadow -bottom-1 transition ${isPhonePublic ? "right-0 bg-chasescrollBlue" : "left-0 bg-white"}`}></div>
                  </div>
                </div>
              </label>
            </div>
            <div className="mb-4 flex items-center w-full">
              <label
                htmlFor="emailPublicToggle"
                className="flex w-full justify-between items-center cursor-pointer"
              >
                <span className="mr-2">Make Email Public:</span>
                <div className="relative flex justify-between items-center">
                  {/* <input
                  type="checkbox"
                  id="emailPublicToggle"
                  name="emailPublicToggle"
                  checked={isEmailPublic}
                  onChange={handleEmailPublicToggle}
                  className="hidden"
                /> */}
                  <div className="" onClick={handleEmailPublicToggle}>
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className={`toggle__dot absolute w-6 h-6 rounded-full shadow -bottom-1 transition ${isEmailPublic ? "right-0 bg-chasescrollBlue" : "left-0 bg-white"}`}></div>
                  </div>
                </div>
              </label>
            </div>

            <div className="my-4">
              <button
                type="submit"
                className="w-full bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg"
              >
                {isLoading ? <ButtonSpinner /> : "Done"}
              </button>
            </div>
          </form>
        </div>
      )}
    </PageWrapper>
  )
}

export default PersonalInfoForm
