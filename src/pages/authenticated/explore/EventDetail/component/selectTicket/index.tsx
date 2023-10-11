import React from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'
import { formatNumber } from '../../../../../../utils/helpers'

interface Props {
    ticket: any,
    selectedticket: any
    setticket: any,
    currency: any
}

function SelectTicket(props: Props) {
    const {
        ticket,
        selectedticket,
        setticket,
        currency
    } = props

    const [showModal, setShowModal] = React.useState(false)

    const clickHandler = (item: any) => {
        setticket(item)
        setShowModal(false)
    }

    return (
        <div className=' relative pb-2  w-full flex gap-3 lg:pl-0 pl-5 pr-5 items-center justify-end ' >
            <div onClick={() => setShowModal(true)} role='button' className='border rounded-lg cursor-pointer border-[#5D70F9] flex justify-center items-center w-full h-[49px]  ' >
                <p className=' text-sm text-[#5D70F9] '>
                    {selectedticket?.ticketType ? selectedticket?.ticketType : "Select Ticket Type"}{" "}
                    {selectedticket?.ticketType ? formatNumber(selectedticket?.ticketPrice, currency === "USD" ? "$" : "₦") : ""}
                </p>
            </div>
            <button onClick={() => setShowModal(true)} className=' w-fit '  >
                <div className=' flex justify-center items-center w-[50px] h-[49px] border-[#5D70F9] border rounded-lg ' >
                    <LiaAngleDownSolid />
                </div>
            </button>
            {showModal && (
                <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }} className=' w-full top-[90px] lg:inset-x-0 inset-x-1 z-30 absolute bg-white border border-b-0 border-[#D0D4EB] rounded-lg ' >
                    {ticket?.map((item: any, index: number) => {
                        return (
                            <button
                                disabled={item?.totalNumberOfTickets === item?.ticketsSold ? true : false}
                                key={index} onClick={() => clickHandler(item)} className=' w-full py-[14px] border-b border-[#D0D4EB] rounded-lg ' >

                                {item?.totalNumberOfTickets === item?.ticketsSold ?
                                    item?.ticketType + " Sold Out" :
                                    item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                }
                            </button>
                        )
                    })}
                </div>
            )}
            {showModal && (
                <div onClick={() => setShowModal(false)} className=' fixed inset-0 bg-black bg-opacity-25 cursor-pointer z-20 ' />
            )}
        </div>
    )
}

export default SelectTicket
