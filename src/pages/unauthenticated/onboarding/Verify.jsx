import { useState } from "react"
import PinInput from "react-pin-input"
import MiniScreensWrapper from "@/components/onboarding/MiniScreensWrapper"
import { VERIFY_TOKEN } from "@/constants/endpoints.constant"
import { useFetch } from "@/hooks/useFetch"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "../../../constants/paths.constant"
import { ToastContainer, toast } from "react-toastify";

const Verify = ({ togglePasswordVisibility }) => {
  const [pin, setPin] = useState("")

  const { sendRequest, isLoading, error } = useFetch()
  const navigate = useNavigate()

  const verifyToken = async () => {
    const response = await sendRequest(VERIFY_TOKEN, "POST", {
      token: pin
    })
    if (response?.statusCode === 0) {
      if (togglePasswordVisibility) {
        togglePasswordVisibility()
      } else {
        navigate(PATH_NAMES.login)
      }
    } else {
      toast.error(response?.statusDescription);
    }
  }

  return (
    <MiniScreensWrapper
      title="Email Verification"
      description="A six digits code has been sent to your email for verification"
      action="Verify"
      handleClick={verifyToken}
    >
      <PinInput
        length={6}
        initialValue=""
        onChange={(value, index) => {
          setPin(value)
        }}
        type="numeric"
        inputMode="number"
        inputStyle={{
          borderColor: "#3C41F0",
          fontSize: "30px",
          borderRadius: "6px",
        }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
    </MiniScreensWrapper>
  )
}

export default Verify
