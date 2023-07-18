import React, { useState } from "react"
import { Link } from "react-router-dom"
import illustration from "@/assets/svg/sign-in-illustration-2.svg"
import playStore from "@/assets/images/play-store.png"
import appleStore from "@/assets/images/apple-store.png"
import { ONBOARDING_FOOTER } from "@/constants"
import TermsAndConditions from "@/components/onboarding/TermsAndConditions"
import { PATH_NAMES } from "@/constants/paths.constant"
import LoginForm from "@/components/onboarding/LoginForm"
import { GoogleIcon } from "../../../components/Svgs"
import { toast } from "react-toastify"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, googleAuthProvider } from "../../../config/firebase"

const Onboarding = () => {
  const [showTerms, setShowTerms] = useState(false)

  const toggleTermsVisibility = () => setShowTerms(state => !state)

  const signInWithGoogle = React.useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(result);
      if (credential) {
        console.log(credential.idToken)
        toast.success("e don sup!")
      }
    } catch (error) {
      toast.error(error)
    }
  }, [])

  return (
    <>
      {showTerms ? (
        <TermsAndConditions handleClose={toggleTermsVisibility} />
      ) : (
        <div
          className="flex flex-col gap-10 items-center justify-between pt-16 pb-16 lg:pb-0 w-full"
          style={{ minHeight: "100vh" }}
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 items-center justify-between w-full max-w-5xl">
            <div className="px-4 flex flex-col items-center w-full gap-12">
              <div className="w-full max-w-sm h-80">
                <img src={illustration} alt="" className="w-full" />
              </div>
              <div className="w-full max-w-[400px] flex flex-col gap-2">
                <p className="text-2xl md:text-3xl font-medium text-center text-chasescrollDarkBlue">
                  Your well-tailored virtual Community.
                </p>
                <p className="text-2xl md:text-2xl text-center">
                  An efficient ecosystem for event management.
                </p>
              </div>
              <div className="flex gap-5 justify-center flex-wrap">
                <img src={playStore} alt="" />
                <img src={appleStore} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center p-4">
              <div className="flex flex-col gap-8 border rounded-b-3xl rounded-tl-3xl p-6 w-full max-w-[463px]">
                <h2 className="text-2xl lg:text-4xl text-chasescrollDarkBlue font-bold text-center">
                  Chasescroll
                </h2>
                <p className="text-md font-normal text-center">
                  Welcome back, login to your account
                </p>
                <LoginForm />
              </div>
              <button
                onClick={signInWithGoogle}
                className="flex gap-4 bg-gray-200 items-center justify-center rounded-lg px-12 py-2.5 font-bold text-sm cursor-pointer"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
              <small className="text-chasescrollTextGrey text-center">
                <span className="font-bold">Create a page</span> for events,
                Community and Business.
              </small>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-4 w-full pb-4">
            <div className="w-full border"></div>
            <div className="flex gap-4 justify-center items-center text-sm text-center text-chasescrollTextGrey">
              {ONBOARDING_FOOTER.map((item, index) =>
                item.path === PATH_NAMES.signUp ? (
                  <Link
                    key={index}
                    to={item.path}
                    className="text-chasescrollBlue"
                  >
                    {item.label}
                  </Link>
                ) : item.label === "Terms and conditions" ? (
                  <span
                    key={index}
                    className="cursor-pointer"
                    onClick={toggleTermsVisibility}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className=""
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Onboarding
