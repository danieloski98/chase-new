import React, { useState } from "react"
import chasescrollLogo from "@/assets/images/chasescroll-logo.png"
import { ChevronLeft } from "@/components/Svgs"
import PageWrapper from "@/components/PageWrapper"
import { previousPage } from "@/constants/index"
import { CHANGE_PASSWORD } from "../../../constants/endpoints.constant"
import { useFetch } from "../../../hooks/useFetch"
import ButtonSpinner from "../../../components/ButtonSpinners"
import { toast } from "react-toastify";


function ChangePassword() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  })

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails(info => ({
      ...info,
      [name]: value,
    }))
  }

  const { sendRequest, isLoading } = useFetch()

  const changePassword = async event => {
    event.preventDefault()
    const response = await sendRequest(CHANGE_PASSWORD, "PUT", {
      email: userDetails.email,
      password: userDetails.password
    })
    if (response?.statusCode === 0) {
      toast.success('Password changed successfully!');
    }
  }
  return (
    <PageWrapper>
      {() => (
        <div className=" w-full items-center justify-center flex flex-col p-4 bg-white">
          <div className="flex items-center w-full h-full mb-4 p-2 ">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {ChevronLeft()}{" "}
            </span>
            <p className="text-gray-600 text-lg">Change Password</p>
          </div>
          <div className="flex items-center justify-center w-full h-[70vh]">
            <form onSubmit={changePassword} className="w-full sm:w-1/2 overflow-auto">
              <div className="flex flex-col justify-center items-center mb-6">
                <img
                  src={chasescrollLogo}
                  alt="Profile Image"
                  className="w-1/4 h-25 sm:rounded-b-[32px] sm:rounded-tl-[32px]"
                />
                <span className="text-blue-800 text-lg">Chasescroll</span>
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="name"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-lg w-full"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-lg w-full"
                  placeholder="New Password"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-chasescrollBlue border border-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {isLoading ? <ButtonSpinner /> : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default ChangePassword
