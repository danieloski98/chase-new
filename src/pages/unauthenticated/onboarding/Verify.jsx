import { useState } from "react"
import PinInput from "react-pin-input"
import MiniScreensWrapper from "@/components/onboarding/MiniScreensWrapper"
import { VERIFY_TOKEN } from "@/constants/endpoints.constant"
import { useFetch } from "@/hooks/useFetch"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "../../../constants/paths.constant"
import { ToastContainer, toast } from "react-toastify";
import { VERIFY_ACCOUNT_OTP } from "@/constants/endpoints.constant"
import { useMutation } from "react-query"
import httpService from "@/utils/httpService"

const Verify = ({ togglePasswordVisibility }) => {
  const [pin, setPin] = useState("")

  const { sendRequest, isLoading, error } = useFetch()
  const navigate = useNavigate()

  // react query
  const { isLoading: isVerifyLoading, mutate, data } = useMutation({
    mutationFn: () => httpService.post(VERIFY_TOKEN, {
      token: pin,
    }),
    onError: (error) => {
      toast.error(error?.response?.data?.statusDescription);
    },
    onSuccess: (data) => {
      toast.success('Account successfully verified');
      navigate('/');
    } 
  }); 

  return (
    <MiniScreensWrapper
      title="Email Verification"
      description="A six digits code has been sent to your email for verification"
      action="Verify"
      handleClick={mutate}
      isLoading={isVerifyLoading}
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
