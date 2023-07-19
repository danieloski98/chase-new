import React from 'react'
import OverlayWrapper from './OverlayWrapper'
import { Button } from '@chakra-ui/react'

function LogoutModal({ handleClose, logout }: {
    handleClose: () => void,
    logout: () => void,
}) {
  return (
    <OverlayWrapper handleClose={handleClose}>
      <div className="w-64 h-auto bg-white p-6 shadow-md rounded-md">
        <h3 className='text-center'>Are you sure you want to logout?</h3>
        <div className='flex w-full justify-between mt-6'>
            <Button onClick={logout} color='red.500' bg='white' width='100px' >Yes</Button>
            <Button onClick={handleClose} color='black' bg="white" width='100px'>Cancel</Button>
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default LogoutModal