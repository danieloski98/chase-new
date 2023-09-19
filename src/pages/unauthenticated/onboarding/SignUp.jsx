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
import { useForm } from '../../../hooks/useForm';
import { signUpValidation } from "@/services/validations"
import { CustomInput } from "@/components/Form/CustomInput"
import { Box, Button } from "@chakra-ui/react"
import { useMutation } from "react-query"
import httpService from "@/utils/httpService"
import { COLORS } from "@/utils/colors"

const SignUp = () => {
 
  const [phone, setPhone] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const { sendRequest } = useFetch()


  const toggleTermsVisibility = () => setShowTerms(state => !state);

  // react hook form
  const sendMail = useMutation({
    mutationFn: (data) => httpService.post(SEND_EMAIL_TO_USER, data),
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data);
    },
    onSuccess: (data) => {
      console.log(data.data);
      toast.success('Account created, a code has been sent to your email');
      navigate(PATH_NAMES.verify);
    }
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => httpService.post(SIGN_UP, data),
    onError: (error) => { 
      toast.error(error.response.data);
    },
    onSuccess: (data) => { 
      sendMail.mutate({
        userEmail: values.email,
        emailType: 1,
      });
    }
  });
  const { renderForm, formState, values } = useForm({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      dob: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema: signUpValidation,
    submit: (data) => {
      if (!termsAccepted) {
        toast.warning('You must accept the terms and conditions');
        return;
      }
      if (!formState.isValid) {
        toast.warning('You must fillin the form correctly');
        return;
      }
      if (phone === '') {
        toast.warning('Your phone number is required');
        return;
      }
      const obj = {
        ...data,
        data: {
          mobilePhone: {
            "objectPublic": true,
            "value": phone,
          },
        }
      }
      mutate(obj);
    }
  });


  const toggleTermsAcceptance = () => {
    setTermsAccepted(state => !state)
  }

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return renderForm(
    <>
      {showTerms ? (
        <TermsAndConditions handleClose={toggleTermsVisibility} />
      ) : (
        <div
          className="flex flex-col justify-center items-center p-4 relative"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="absolute font-bold text-2xl top-8 left-8 cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            {CLOSE_ENTITY}
          </div>
          <div className="flex flex-col gap-4 mt-16 mb-4 rounded-b-3xl rounded-tl-3xl p-6 ">
            <h2 className="text-4xl text-chasescrollBlue font-bold text-left lg:text-center">
              Sign Up
            </h2>

            <p className="text-chasescrollTextGrey w-full max-w-sm text-sm text-center">
              Have an account already?{" "}
              <Link to="/" className="text-chasescrollBlue">
                Login
              </Link>
            </p>
            
              <CustomInput name='firstName' placeholder="FirsName" type="text" isPassword={false} />
              {/* <Box height='15px' /> */}

              <CustomInput name='lastName' placeholder="lastName" type="text" isPassword={false} />
              {/* <Box height='15px' /> */}

              <CustomInput name='email' placeholder="Email" type="email" isPassword={false} />
              {/* <Box height='15px' /> */}

              <CustomInput name='username' placeholder="username" type="text" isPassword={false} />
              {/* <Box height='15px' /> */}
             
            
              <PhoneInput
                className="w-full rounded-lg border border-gray-400 outline-none px-3 text-chasescrollTextGrey"
                placeholder="Phone number"
                defaultCountry="NG"
                name="mobilePhone"
                required
                value={phone}
                
                onChange={(e) => setPhone(e)}
              />

              <CustomInput name='dob' placeholder="Date of Birth" type="date" isPassword={false} />
              {/* <Box height='15px' /> */}
              {/* <input
                className="w-full rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
                placeholder="Select date of birth"
                name="dateOfBirth"
                onChange={handleChange}
                type="date"
                value={userDetails.dateOfBirth}
                required
                minLength={4}
              /> */}
              <CustomInput name='password' placeholder="Password" type="password" isPassword />
              {/* <Box height='15px' /> */}

              <CustomInput name='confirmPassword' placeholder="Confirm Password" type="password" isPassword />
              {/* <Box height='15px' /> */}

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
                  <a
                    href='https://chasescroll.com/terms'
                    className="text-chasescrollBlue"
                    target="_blank"
                  >
                    Terms of service
                  </a>{" "}
                  as well as the{" "}
                  <a href="https://chasescroll.com/privacy-poilcy" target="_blank" className="text-chasescrollBlue">
                    Privacy Policy
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Button disabled={!formState.isValid} _disabled={{ backgroundColor: 'grey' }} type="submit" isLoading={isLoading} _active={{ bg: COLORS.chasescrollButtonBlue }} height='50px' borderRadius='md' color='white' marginTop='20px' width='100%'>Sign up</Button>
              </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SignUp
