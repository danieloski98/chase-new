// import React from 'react'
import { BlueCalendarIcon } from '../../../../../../components/Svgs'
import { formatDate, formatTime } from '../../../../../../utils/helpers'

interface Props {
    date: any,
    name: string
}

function EventDate(props: Props) {
    const {
        date,
        name
    } = props

    return ( 
        <div className=' pb-2  w-full flex flex-col items-center border-b rounded-b-lg  px-2  ' >
            <p className=' text-sm mt-4 font-medium text-center ' >{name}</p>
            <div className=' flex items-center gap-3 mt-3 ' >
                <BlueCalendarIcon />
                <div className='  ' >
                    <p className=' font-bold text-[#3C41F0]' >{formatDate(date)}</p>
                    <p className=' font-medium text-sm text-[#6B6B6B] ' >{formatTime(date)}(GMT)</p>
                </div>
            </div>
        </div>
    )
}

export default EventDate
