import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { FiMinus } from 'react-icons/fi'

function PreviewFile({ src, deleteImg  }: {
    src: string,
    deleteImg: () => void
}) {
    console.log(`this is from the file ${src}`)
  return (
    <Box width='70px' height='60px' borderRadius='10px' display='flex' borderWidth='1px' borderColor='grey' justifyContent='center' alignItems='center'>
        <Flex onClick={deleteImg} top='-5px' right='-5px' justifyContent='center' position='absolute' alignItems='center' width='20px' height='20px' borderRadius='10px' bg='red'>
            <FiMinus color='white' fontSize='white' />
        </Flex>
        <Text>{src.split('.')[1].toUpperCase()}</Text>
    </Box>
  )
}

export default PreviewFile