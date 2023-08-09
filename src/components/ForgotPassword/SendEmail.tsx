import { Heading, Text, VStack, Input, Button } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { SEND_EMAIL_TO_USER } from '../../constants/endpoints.constant'
import { VERIFICATION_PAGE } from '../../pages/unauthenticated/onboarding/ForgotPassword'
import httpService from '../../utils/httpService'

interface IProps {
  change: (data: string) => void
  email: string;
  setEmail: (data: string) => void
}

function SendEmail({ change, email, setEmail }: IProps) {
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpService.post(SEND_EMAIL_TO_USER, data),
    onError: (error:any) => {
      toast.error('An error occurred');
    },
    onSuccess: (data) => {
      toast.success('Email Sent, check your mail');
      change(VERIFICATION_PAGE.VERIFY_CODE);
    }
  });
  const handleSubmit = React.useCallback(() => {
    mutate({
      userEmail: email,
      emailType: 2,
    })
  }, [email, mutate]);
  return (
    <VStack width={['100%', '50%']} height={'200px'} >
      <Heading size='md'>Forgot Password</Heading>
      <Text textAlign='center'>Let us help you change your passworrd, enter the email of the account.</Text>
      <Input placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} width='100%' height='50px' backgroundColor='whitesmoke' borderRadius='10px' />
      <Button isLoading={isLoading} onClick={handleSubmit} backgroundColor='brand.chasescrollBlue'  color='white' width='100%' height='45px'>Submit</Button>
    </VStack>
  )
}

export default SendEmail