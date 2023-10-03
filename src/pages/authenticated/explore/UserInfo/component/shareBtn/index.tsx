// import React from 'react'
import { LuShare2 } from 'react-icons/lu'

interface Props { }

function ShareBtn(props: Props) {
    const { } = props

    return (
        <> 
            <button className=' flex items-center font-medium text-[20px] text-[#3C41F0] gap-2 ' >
                Share
                <LuShare2 size={24} color="#3C41F0" />
            </button>
        </>
    )
}

export default ShareBtn
