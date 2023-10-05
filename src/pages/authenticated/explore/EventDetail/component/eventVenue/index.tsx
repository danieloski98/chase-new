// import React from 'react'
import { LocationIcon } from '../../../../../../components/Svgs'

interface Props {
    location: any
}

function EventVenue(props: Props) {
    const {
        location
    } = props

    return (
        <div className=' pb-2  w-full flex flex-col items-center border-b rounded-b-lg  px-2  ' >
            <p className=' text-sm mt-4 font-medium text-center ' >Event Address</p>
            <div className=' flex w-full items-center gap-3 mt-3 ' >
                <LocationIcon className="" />
                <div className='  ' >
                    <p className={"font-bold text-[#3C41F0]"} >{location?.address}</p> 
                </div>
            </div>
        </div>
    )
}

export default EventVenue
