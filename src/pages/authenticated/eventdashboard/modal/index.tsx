// import React from 'react'
import { useQuery } from "react-query";
// import pic from "../../../../assets/images/identify.png"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import httpService from "../../../../utils/httpService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import React from "react"; 
import { formatNumberWithK } from "../../../../utils/helpers";

interface Props {
    data: any,
    setShow: any,
    setRefund: any
}

function EventDashboardModal(props: Props) {
    const {
        data,
        setRefund
    } = props

      const [history, setHistory] = React.useState([] as any)

      const { isLoading } = useQuery(['history'+data?.id], () => httpService.get('/payments/analytics/tickets', {
        params: {
            eventID: data?.id
        }
      }), {
        onError: (error: AxiosError<any, any>) => {
          toast.error(error.response?.data);
        }, 
        onSuccess: (data) => {
            // console.log(data);
            
            setHistory(data.data);
        }
      }) 

      console.log(data);
      
    // const getFormatedPrice =(value)=> {
    //     if (value < 1000) {
    //         return value.toString();
    //     } else if (value < 1000000) {
    //         return (value / 1000).toStringAsFixed(1) + "K";
    //     } else if (value < 1000000000) {
    //         return (value / 1000000).toStringAsFixed(1) + "M";
    //     } else if (value < 1000000000000) {
    //         return (value / 1000000000).toStringAsFixed(1) + "B";
    //     } else if (value < 1000000000000000) {
    //         return (value / 1000000000000).toStringAsFixed(1) + "T";
    //     }
    //     return "";
    // }


    console.log(history.tickets);
    
      
    return (
        <div className=' w-full flex flex-col items-center py-6 ' >
            {!isLoading && ( 
                <div className=' max-w-[700px] flex flex-col relative items-center ' >
                    <p className=" text-center font-semibold mb-6 " >{data?.eventName}</p>

                    {/* <div className=' w-full flex justify-center relative ' > 
                        {data?.interestedUsers?.slice(0, 3)?.map((attendee: any) => (
                            <div className="w-8 h-8 -mr-3">
                            {attendee?.data?.imgMain?.value ?
                                <img
                                key={attendee.id}
                                src={`${CONFIG.RESOURCE_URL}${attendee?.data?.imgMain?.value}`}
                                className="w-8 h-8 -mr-4 rounded-b-full rounded-tl-full"
                                alt=""
                                /> :   
                                <div className="w-8 h-8 -mr-4 rounded-b-full rounded-tl-full bg-yellow-500  flex justify-center items-center">
                                <p className=" font-extrabold text-sm text-black capitalize " >{attendee?.firstName?.slice(0, 1)}</p> 
                                <p className=" font-extrabold text-sm text-black capitalize " >{attendee?.lastName?.slice(0, 1)}</p>
                                </div> 
                            }
                            </div>
                        ))}
                    </div> */}
                    {/* <img src={pic} alt="image" className="w-[80px] mt-6" /> */}
                    <div className=" mt-8 w-full " >
                        {/* <div className=" flex gap-3 text-sm font-normal " >
                            <p>Total</p>
                            <p>{formatNumber(history?.totalActiveSales, history?.currency === "USD" ? "$" : "₦")}</p>
                        </div> */}
                        <div role="button" onClick={()=> setRefund(true)} className=" text-white bg-[#E90303] px-2 py-[2px] mt-1 items-center w-fit flex text-[13px] font-normal gap-1 rounded-md " >
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group">
                                    <path id="Vector" d="M0.75 14.75V2.75C0.75 2.35218 0.908035 1.97064 1.18934 1.68934C1.47064 1.40804 1.85218 1.25 2.25 1.25H9.75C10.1478 1.25 10.5294 1.40804 10.8107 1.68934C11.092 1.97064 11.25 2.35218 11.25 2.75V14.75L9 13.25L7.5 14.75L6 13.25L4.5 14.75L3 13.25L0.75 14.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path id="Vector_2" d="M8.25 9.5V8C8.25 7.60218 8.09196 7.22064 7.81066 6.93934C7.52936 6.65804 7.14782 6.5 6.75 6.5H3.75M3.75 6.5L5.25 5M3.75 6.5L5.25 8" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>
                            Refund
                        </div>
                    </div>
                    <div className=" w-full border-t border-b border-[#D0D4EB] flex justify-center mt-8 py-7 px-4 " >
                        <div className=" rounded-[36px] px-8 py-6 w-fit bg-[#D0F2D9] " >
                            <div className=" flex items-center gap-2 " > 
                                <div className=" w-10 h-10 bg-[#101828] rounded-full flex justify-center items-center " >
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="vuesax/linear/ticket">
                                            <g id="ticket">
                                                <path id="Vector" d="M20 12.5C20 11.12 21.12 10 22.5 10V9C22.5 5 21.5 4 17.5 4H7.5C3.5 4 2.5 5 2.5 9V9.5C3.88 9.5 5 10.62 5 12C5 13.38 3.88 14.5 2.5 14.5V15C2.5 19 3.5 20 7.5 20H17.5C21.5 20 22.5 19 22.5 15C21.12 15 20 13.88 20 12.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path id="Vector_2" d="M10.5 4L10.5 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <p className=" text-[15px] font-medium " >Tickets</p>
                            </div>
                            <div className=" flex pt-7 items-center " >
                                <div className=" pt-[3px] px-4 border-r border-black " >
                                    <p className=" font-normal text-xs text-center " >Created</p>
                                    <p className=" text-[30px]  font-medium text-center " >{formatNumberWithK(history?.totalNumberOfTickets)}</p>
                                </div>
                                <div className=" pt-[3px] px-4 border-r border-black " >
                                    <p className=" font-normal text-xs text-center " >Sold</p>
                                    <p className=" text-[30px]  font-medium text-center " >{history?.currency === "USD" ? "$" : "₦"+formatNumberWithK(history?.totalActiveSales)}</p>
                                </div>
                                <div className=" pt-[3px] px-4 border-r border-black " >
                                    <p className=" font-normal text-xs text-center " >Cancelled</p>
                                    <p className=" text-[30px]  font-medium text-center " >{history?.currency === "USD" ? "$" : "₦"+formatNumberWithK(history?.totalRefunds)}</p>
                                </div>
                                <div className=" pt-[3px] px-4  " >
                                    <p className=" font-normal text-xs text-center " >Available</p>
                                    <p className=" text-[30px]  font-medium text-center " >{formatNumberWithK(history?.totalNumberOfAvailableTickets)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {(history?.totalNumberOfAvailableTickets === history?.totalNumberOfTickets) && ( */}
                        <div className=" w-full border-b border-[#D0D4EB] mt-8 py-7 px-4 " >
                            <ResponsiveContainer width="100%" height={500}>
                                <BarChart
                                    width={500}
                                    height={300} 
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    data={history.tickets} 
                                >
                                    <XAxis dataKey="ticketType" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />

                                        <Bar dataKey="totalActiveSales" stackId="a" fill="#B7B00E" />
                                        <Bar dataKey="totalRefund" stackId="a" fill="#E90303" />
                                        <Bar dataKey="totalPendingSales" fill="#ffc658" />
                                    {/* <Bar dataKey="totalActiveSales" fill="#B7B00E" background={{ fill: '#eee' }} />
                                    <Bar dataKey="totalRefund" fill="#E90303" background={{ fill: '#eee' }} />
                                    <Bar dataKey="totalPendingSales" fill="#DB9E00" background={{ fill: '#eee' }} /> */}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    {/* )} */}
                </div>
            )}
        </div>
    )
}

export default EventDashboardModal 

