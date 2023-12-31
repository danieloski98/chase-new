import { Heading, Text, VStack, Input, InputGroup, InputLeftElement, Button, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { CHANGE_PASSWORD, SEND_EMAIL_TO_USER } from '../../constants/endpoints.constant'
import httpService from '../../utils/httpService'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface IProps {
  token: string
}

function ChangePassword({ token }: IProps) {
    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const navigate = useNavigate();
    const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpService.put('/chasescroll/verification/change-password', data),
    onError: (error:any) => {
      toast.error('An error occurred');
    },
    onSuccess: (data) => {
      toast.success(data.data.statusDescription);
      navigate('/');
    }
  });
  const handleSubmit = React.useCallback(() => {
    if (password.length < 8 || confirm.length < 8 ) {
        toast.warning('Input a password with at least 8 characters and numbers');
        return;
    }
    if (confirm !== password) {
        toast.warning('Password does not match!');
        return;
    }
    mutate({
      token,
      password,
    })
  }, [confirm, token, mutate, password]);
  return (
    <VStack width={['100%', '50%']} height={'auto'} >
      <Heading size='md'>Reset Password</Heading>
      <Text textAlign='center'>Set a strong password</Text>

      <InputGroup>
        <InputRightElement>
         { showPassword && <FiEyeOff fontSize='25px' onClick={() => setShowPassword(!showPassword)} /> }
         { !showPassword &&  <FiEye fontSize='25px' onClick={() => setShowPassword(!showPassword)} /> }
        </InputRightElement>
        <Input placeholder='Enter Password' type={showPassword ? 'text':'password'} value={password} onChange={(e) => setPassword(e.target.value)} width='100%' height='50px' backgroundColor='whitesmoke' borderRadius='10px' />
      </InputGroup>

      <InputGroup>
        <InputRightElement>
         { showConfirm && <FiEyeOff fontSize='25px' onClick={() => setShowConfirm(!showConfirm)} /> }
         { !showConfirm &&  <FiEye fontSize='25px' onClick={() => setShowConfirm(!showConfirm)} /> }
        </InputRightElement>
        <Input placeholder='Confirm password' type={showConfirm ? 'text':'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} width='100%' height='50px' backgroundColor='whitesmoke' borderRadius='10px' />
      </InputGroup>

      <Button isLoading={isLoading} onClick={handleSubmit} backgroundColor='brand.chasescrollBlue'  color='white' width='100%' height='55px'>Submit</Button>
    </VStack>
  )
}

export default ChangePassword