import PhoneInput from "react-phone-number-input"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import chasescrollLogo from "@/assets/images/chasescroll-logo-large.png"
import TermsAndConditions from "@/components/onboarding/TermsAndConditions"
import {
  ClosedEyeIcon,
  OpenEyeIcon,
} from "@/components/Svgs"
import { CLOSE_ENTITY } from "@/constants"
import { useFetch } from "../../../hooks/useFetch"
import { SEND_EMAIL_TO_USER, SIGN_UP } from "../../../constants/endpoints.constant"
import { PATH_NAMES } from "../../../constants/paths.constant"
import { toast } from "react-toastify"

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    password: "",
    confirmPassword: "",
    data: {
      mobilePhone: {
        objectPublic: true,
        value: ""
      }
    }
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showVerifyPassword, setShowVerifyPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const { sendRequest } = useFetch()

  const togglePasswordVisibility = () => setShowPassword(state => !state)
  const toggleVerifyPasswordVisibility = () =>
    setShowVerifyPassword(state => !state)
  const toggleTermsVisibility = () => setShowTerms(state => !state)

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails(info => ({
      ...info,
      [name]: value,
    }))
  }

  const setPhoneNumber = event => {
    setUserDetails(details => ({
      ...details,
      data: {
        ...details.data,
        mobilePhone: {
          ...details.data.mobilePhone,
          value: event?.target?.value
        },
      }
    }))
  }

  const submitDetails = async () => {
    const response = await sendRequest(SEND_EMAIL_TO_USER, "POST", {
      userEmail: userDetails.email,
      emailType: 2
    })
    if (response?.statusCode === 0) {
      sendRequest(SIGN_UP, "POST", userDetails);
      toast.success('Sign up successful!');
      setTimeout(() => navigate(PATH_NAMES.verify), 5000)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    delete userDetails.confirmPassword
    submitDetails()
  }

  const toggleTermsAcceptance = () => {
    setTermsAccepted(state => !state)
  }

  const disabled =
    userDetails.password !== userDetails.confirmPassword ||
    userDetails.password.length < 4 ||
    userDetails.confirmPassword.length < 4 ||
    !termsAccepted

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {showTerms ? (
        <TermsAndConditions handleClose={toggleTermsVisibility} />
      ) : (
        <div
          className="flex flex-col justify-center items-center gap-4 p-4 relative"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="absolute font-bold text-2xl top-8 left-8 cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            {CLOSE_ENTITY}
          </div>
          <div className="flex flex-col gap-8 mt-16 mb-4 rounded-b-3xl rounded-tl-3xl p-6 ">
            <h2 className="text-4xl text-chasescrollBlue font-bold text-left lg:text-center">
              Sign Up
            </h2>

            <p className="text-chasescrollTextGrey w-full max-w-sm text-sm text-center">
              Have an account already?{" "}
              <Link to="/" className="text-chasescrollBlue">
                Login
              </Link>
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col max-w-sm w-full gap-4 text-sm"
            >
              <input
                className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                placeholder="First name"
                name="firstName"
                onChange={handleChange}
                type="text"
                value={userDetails.firstName}
                required
              />
              <input
                className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                placeholder="Last name"
                name="lastName"
                onChange={handleChange}
                type="text"
                value={userDetails.lastName}
                required
              />
              <input
                className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                type="email"
                value={userDetails.email}
                required
              />
              <input
                onChange={handleChange}
                type="text"
                className="w-full rounded-lg border border-gray-400 focus:outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                placeholder="Username"
                name="username"
                value={userDetails.username}
                required
              />
              <PhoneInput
                className="w-full rounded-lg border border-gray-400 outline-none px-3 text-chasescrollTextGrey"
                placeholder="Phone number"
                defaultCountry="NG"
                name="mobilePhone"
                required
                value={userDetails.mobilePhone}
                onChange={setPhoneNumber}
              />
              <input
                className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                placeholder="Select date of birth"
                name="dateOfBirth"
                onChange={handleChange}
                type="date"
                value={userDetails.dateOfBirth}
                required
                minLength={4}
              />
              <div className="relative w-full">
                <input
                  className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  value={userDetails.password}
                  required
                  minLength={4}
                />
                <div
                  className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey opacity-70"
                  onClick={togglePasswordVisibility}
                >
                  {!showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </div>
              </div>
              <div className="relative w-full">
                <input
                  className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 text-chasescrollTextGrey"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  value={userDetails.confirmPassword}
                />
                <div
                  className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey opacity-70"
                  onClick={toggleVerifyPasswordVisibility}
                >
                  {!showVerifyPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm px-0.5">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={termsAccepted}
                  onChange={toggleTermsAcceptance}
                  id=""
                  className="w-4 h-4 mt-0.5"
                />
                <div className="text-chasescrollTextGrey">
                  I accept the{" "}
                  <button
                    onClick={toggleTermsVisibility}
                    className="text-chasescrollBlue"
                  >
                    Terms of service
                  </button>{" "}
                  as well as the{" "}
                  <Link to="/privacy-policy" className="text-chasescrollBlue">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <button
                  disabled={disabled}
                  className={`${disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                    } bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-xl`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default SignUp
