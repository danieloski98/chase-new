import React, { useState } from "react"
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
import { Box, Button, Input } from '@chakra-ui/react'
import OverlayWrapper from "../OverlayWrapper"

const LoginForm = (props) => { 

  const {
    modal,
    close
  } = props

  const { login } = useAuth()

  const [showModal, setShowModal] = React.useState(false)
  const [Loading, setLoading] = React.useState(false)
  const [FirstName, setFirstName] = React.useState("")
  const [LastName, setLastName] = React.useState("")
  const [UserName, setUserName] = React.useState("")
  const navigate = useNavigate()

  // react hoook form implementation
  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => httpService.post(SIGN_IN, data),
    onError: (error) => {
      toast.error('Invalid credentials, please check and try again');
      console.log(error);
    },
    onSuccess: (data) => {
      const userId = localStorage.getItem('userId'); 
      if(data?.data?.message === "This email is not verified"){ 
        navigate(PATH_NAMES.verify);
      }else { 
        if (userId !== null) {
          if (data.data.user_id !== userId) {
            toast.warn('Another user is logged in, the user has to logout their account');
            return;
          } else {
            toast.success('Login successful!');
            login(data.data, modal);
            
            if(!modal){
              close()
            }
          }
        } else {
          toast.success('Login successful!');
          login(data.data, modal);
  
          if(!modal){
            close()
          }
        }
      }
    }
  })
  const { renderForm } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validationSchema: signInValidation,
    submit: (data) => { 
      mutate(data);
    },
  });

  const clickHandler =async()=> {
    setLoading(true); 
    if(!FirstName){
      toast.error("Enter First Name")
    } else if(!LastName) {
      toast.error("Enter Last Name")
    } else if(!UserName) {
      toast.error("Enter User Name")
    } else {  
        const response = await httpService.put(UPDATE_PROFILE, {
          firstName: FirstName,
          lastName: LastName,
          username: UserName,
        })
        if (response) { 
          toast.success('Profile updated successfully!'); 
        } else {
          toast.error('Something went wrong!');
        } 

    }
    setLoading(false);
  } 

  return renderForm(
    <>
      <CustomInput name="username" placeholder="Username Or Email" type="text" />
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
