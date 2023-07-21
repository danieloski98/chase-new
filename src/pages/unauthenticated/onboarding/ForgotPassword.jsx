import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import chasescrollLogo from "@/assets/images/chasescroll-logo-large.png"
import { ClosedEyeIcon, OpenEyeIcon } from "@/components/Svgs"
import Verify from "./Verify"
import { useFetch } from "@/hooks/useFetch"
import { SEND_EMAIL_TO_USER, CHANGE_PASSWORD } from "@/constants/endpoints.constant"
import { PATH_NAMES } from "@/constants/paths.constant";
import ButtonSpinner from "@/components/ButtonSpinners";
import { useAuth } from "../../../context/authContext";
import { FiX } from 'react-icons/fi'

const ForgotPassword = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const { sendRequest, isLoading, error } = useFetch()
  const { token } = useAuth()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(state => !state)
    toggleVerificationVisibility()
  }
  const toggleVerificationVisibility = () => {
    setShowVerification(state => !state)
  }


  const handleChange = ({ target: { name, value } }) => {
    setUserDetails(info => ({
      ...info,
      [name]: value,
    }))
  }

  const verifyEmail = async event => {
    event.preventDefault()
    const response = await sendRequest(SEND_EMAIL_TO_USER, "POST", {
      userEmail: userDetails.email,
      emailType: 1
    },
      { Authorization: `Bearer ${token}` })
    if (response?.statusCode === 0) {
      toggleVerificationVisibility()
    } else {
      toast.error(response?.error_description);
    }
  }

  const changePassword = async event => {
    event.preventDefault()
    const response = await sendRequest(CHANGE_PASSWORD, "PUT", {
      email: userDetails.email,
      password: userDetails.password
    })
    if (response?.statusCode === 0) {
      toast.success('Password changed successfully!');
      setTimeout(() => navigate(PATH_NAMES.root), 5000)
    }
  }

  return (
    <>
      {showVerification ? (
        <Verify togglePasswordVisibility={togglePasswordVisibility} />
      ) : (
        <>
          <div
            className="flex flex-col gap-10  p-8"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-full h-10">
              <p className="text-3xl cursor-pointer" onClick={() => navigate('/')}>
                <FiX />
              </p>
            </div>

          <div className="flex-1 w-full h-full flex flex-col items-center justify-center">


          <div className="flex flex-col gap-8 w-full max-w-[463px]">
              <img src={chasescrollLogo} alt="" className="self-center w-28" />
              <p className="text-chasescrollDarkBlue font-bold text-3xl text-center">
                Forgot Password
              </p>
              {showPassword ? (
                <form
                  onSubmit={changePassword}
                  className="flex flex-col min-w-[320px] max-w-[463px] w-full gap-4"
                >
                  <div className="relative w-full">
                    <input
                      className="w-full rounded-lg border border-purple-100 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey focus:outline"
                      placeholder="New Password"
                      name="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      value={userDetails.password}
                    />
                    <div
                      className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey"
                      onClick={togglePasswordVisibility}
                    >
                      {!showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                    </div>
                  </div>
                  <button
                    disabled={isLoading}
                    className="bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-2xl flex items-center justify-center"
                  >
                    {isLoading ? <ButtonSpinner /> : "Next"}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={verifyEmail}
                  className="flex flex-col min-w-[320px] max-w-[463px] w-full gap-4"
                >
                  <input
                    className="w-full rounded-lg border border-purple-100 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey focus:outline"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                  <button
                    disabled={isLoading}
                    className="bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-2xl flex items-center justify-center"
                  >
                    {isLoading ? <ButtonSpinner /> : "Next"}
                  </button>
                </form>
              )}
            </div>

          </div>


          </div>
        </>
      )}
    </>
  )
}

export default ForgotPassword
