import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import { FiMinus } from 'react-icons/fi'

function PreviewVideo({ src, deleteImg  }: {
    src: string,
    deleteImg: () => void
}) {
  return (
    <Box width='70px' height='60px' borderRadius='10px' borderWidth='1px' borderColor='grey' position='relative'>
        <Flex onClick={deleteImg} top='-5px' right='-5px' justifyContent='center' position='absolute' alignItems='center' width='20px' height='20px' borderRadius='10px' bg='red'>
            <FiMinus color='white' fontSize='white' />
        </Flex>
        <video className='w-[60px] h-[60px] rounded-[10px]'>
            <source type='video/mp4' src={src} />
        </video>
        {/* <Image src={src} width='100%' height='100%' borderRadius='10px' /> */}
    </Box>
  )
}

export default PreviewVideo