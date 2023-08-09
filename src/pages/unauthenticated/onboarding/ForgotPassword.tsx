import { VStack, Image } from '@chakra-ui/react';
import React from 'react'
import chasescrollLogo from "@/assets/images/chasescroll-logo-large.png"
import SendEmail from '../../../components/ForgotPassword/SendEmail';
import VerifyCode from '../../../components/ForgotPassword/VerifyCode';
import ChangePassword from '../../../components/ForgotPassword/ChangePassword';


export enum VERIFICATION_PAGE {
    VERIFY_EMAIL = 'verify-email',
    VERIFY_CODE = 'verify-code',
    CHANGE_PASSWORD = 'change-password'
}

function ForgotPassword() {
    const [page, setPage] = React.useState(VERIFICATION_PAGE.VERIFY_EMAIL);
    const [email, setEmail] = React.useState('');
    const [token, setToken] = React.useState('');

    const switchPages = React.useCallback(() => {
        switch(page) {
            case VERIFICATION_PAGE.VERIFY_EMAIL: {
                return <SendEmail change={(data: any) => setPage(data)} email={email} setEmail={(e) => setEmail(e)} />
            }
            case VERIFICATION_PAGE.VERIFY_CODE: {
                return <VerifyCode change={(data: any) => setPage(data)} token={token} setToken={(d) => setToken(d)} />
            }
            case VERIFICATION_PAGE.CHANGE_PASSWORD: {
                return <ChangePassword token={token} />
            }
        }
    }, [email, page, token]);
  return (
    <VStack width='100%' height='100vh' alignItems='center' justifyContent='center' bg='white'>
        <VStack width={['100%', '50%']} height={'auto'} bg='white' paddingX={['20px', '0px']}>
            <Image src={chasescrollLogo} width='130px' height='130px' />
            {switchPages()}
        </VStack>
    </VStack>
  )
}

export default ForgotPassword