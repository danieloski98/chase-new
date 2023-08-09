import { Heading, Text, VStack, Input, Button, PinInput, PinInputField, HStack } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { SEND_EMAIL_TO_USER, VERIFY_TOKEN } from '../../constants/endpoints.constant'
import { VERIFICATION_PAGE } from '../../pages/unauthenticated/onboarding/ForgotPassword'
import httpService from '../../utils/httpService'

interface IProps {
  change: (data: string) => void;
  token: string;
  setToken: (data: string) => void
}

function VerifyCode({ change, token, setToken }: IProps) {
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpService.post(VERIFY_TOKEN, data),
    onError: (error:any) => {
      toast.error(error.response?.data);
    },
    onSuccess: (data) => {
        console.log(data.data);
      toast.success(data.data.message);
      change(VERIFICATION_PAGE.CHANGE_PASSWORD);
    }
  });
  const handleSubmit = React.useCallback(() => {
    mutate({
      token
    })
  }, [token, mutate]);
  return (
    <VStack width={['100%', '50%']} height={'200px'} spacing={4} >
      <Heading size='md'>Verify Code</Heading>
      <Text textAlign='center'>Enter the code sent to your email.</Text>
        <HStack>
            <PinInput otp  size='lg' value={token} onChange={(e) => setToken(e)} >
                <PinInputField borderColor='brand.chasescrollBlue' />
                <PinInputField borderColor='brand.chasescrollBlue' />
                <PinInputField borderColor='brand.chasescrollBlue' />
                <PinInputField borderColor='brand.chasescrollBlue' />
                <PinInputField borderColor='brand.chasescrollBlue' />
                <PinInputField borderColor='brand.chasescrollBlue' />
            </PinInput>
        </HStack>
      <Button isLoading={isLoading} onClick={handleSubmit} backgroundColor='brand.chasescrollBlue'  color='white' width='100%' height='45px'>Submit</Button>
    </VStack>
  )
}

export default VerifyCode