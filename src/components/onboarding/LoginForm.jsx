import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClosedEyeIcon, OpenEyeIcon } from "@/components/Svgs"
import { useAuth } from "../../context/authContext"
import { PATH_NAMES } from "../../constants/paths.constant"
import { toast } from "react-toastify"
import ButtonSpinner from "../ButtonSpinners"
import { useForm } from "@/hooks/useForm"
import { signInValidation } from "@/services/validations"
import { useMutation } from "react-query"
import httpService from "@/utils/httpService"
import { SIGN_IN } from "@/constants/endpoints.constant"
import { CustomInput } from "../Form/CustomInput"
import { Box, Button } from '@chakra-ui/react'

const LoginForm = () => {
  const { login } = useAuth()


  // react hoook form implementation
  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => httpService.post(SIGN_IN, data),
    onError: (error) => {
      toast.error('An Error occurred');
      console.log(error);
    },
    onSuccess: (data) => {
      toast.success('Login successful!');
      login(data.data);
    }
  })
  const { renderForm } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validationSchema: signInValidation,
    submit: (data) => {
      console.log(data);
      mutate(data);
    },
  });


  return renderForm(
    <>
      <CustomInput name="username" placeholder="Username" type="text" />
      <Box height='15px' />
      <CustomInput name="password" placeholder="Password" type="password" isPassword />
      <Box height='15px' />

      <div className="flex justify-between text-xs p-0.5">
        <Link to="/forgot-password" className="text-chasescrollBlue">
          Forgot password
        </Link>
        <p className="text-chasescrollTextGrey opacity-70">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-chasescrollBlue">
            Sign up
          </Link>
        </p>
      </div>

     <Button type="submit" isLoading={isLoading} bg='brand.chasescrollButtonBlue' height='50px' borderRadius='md' color='white' marginTop='20px' width='100%'>Sign in</Button>
    </>
  )
}

export default LoginForm
