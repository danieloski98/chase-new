// import React from 'react'
import {LocationIcon } from '../../../../../../components/Svgs' 

interface Props {
    location: any,
    locationType: string, 
}

function EventLocation(props: Props) {
    const {
        location,
        locationType
    } = props

    return ( 
        <div className=' pb-2  w-full flex flex-col items-center border-b rounded-b-lg  px-2  ' >
            <p className=' text-sm mt-4 font-medium text-center ' >Event location</p>
            <div className=' flex w-full items-center gap-3 mt-3 ' >
                <LocationIcon className="" />
                <div className='  ' >
                    <p className=' font-bold text-[#3C41F0]' >{location?.locationDetails ? (location.locationDetails?.length >= 17 ? location.locationDetails : location.locationDetails):
                      location?.link ? (location.link?.length >= 17 ? location.link : location.link): "To Be Announced"}</p>
                    <p className=' font-medium text-sm text-[#6B6B6B] ' >{locationType}</p>
                </div>
            </div>
        </div>
    )
}

export default EventLocation
