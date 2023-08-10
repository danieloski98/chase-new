import { Button, Heading, VStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import httpService from '../../../utils/httpService';
import { toast } from 'react-toastify';
import Logo from '../../../assets/images/chasescroll-logo.png';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

function PaymentVerification() {
    const query = useQuery();
    const orderCode = query.get('orderCode');
    const orderId = query.get('orderId');

    // mutations 
    const payStackMutation = useMutation({
        mutationFn: (data: string) => httpService.post(`/payments/verifyPaystackTx?orderCode=${data}`),
        onSuccess: (data) => {
            toast.success('Payment verified');
        },
        onError: (error: any) => {
            toast.error(error);
        },
    });

    const stripeMutation = useMutation({
        mutationFn: (data: string) => httpService.post(`/payments/stripePaySuccess?orderId=${data}`),
        onSuccess: (data) => {
            toast.success('Payment verified');
        },
        onError: (error: any) => {
            toast.error(error);
        },
    });

    const verifyPayment = React.useCallback(() => {
        if (orderCode) {
            console.log(`Making paystack payment`);
            payStackMutation.mutate(orderCode);
            return;
        }

        if (orderId) {
            console.log(`Making stripe payment`);
            stripeMutation.mutate(orderId);
            return;
        }
    }, [orderCode, orderId, payStackMutation, stripeMutation]);


  return (
    <VStack width='100%' height='100vh' bg='white' alignItems={'center'}>
        <VStack width={['100%', '40%']} spacing={3} height={'100%'} bg='whitesmoke' justifyContent='center' paddingX={['20px', '0px']}>
            <Image src={Logo} width='100px' height='100px' />
            <Heading size='md' textAlign='center' color='brand.chasescrollBlue'>Chasescroll</Heading>
            <Heading>Verify Your Payment</Heading>
            <Text textAlign='center'>Click on the button below to verify and complete your payment.</Text>
            <Button isLoading={ payStackMutation.isLoading || stripeMutation.isLoading } onClick={verifyPayment} width={['100%', '60%']} height='50px' bg='brand.chasescrollBlue' color='white'>Verify</Button>
        </VStack>
    </VStack>
  )
}

export default PaymentVerification