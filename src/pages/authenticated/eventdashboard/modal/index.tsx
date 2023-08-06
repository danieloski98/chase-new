// import React from 'react'
import { useQuery } from "react-query";
// import pic from "../../../../assets/images/identify.png"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import httpService from "../../../../utils/httpService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import React from "react";
import CONFIG from "../../../../config";

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

    const dataGraph = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

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
      
      
    return (
        <div className=' w-full flex flex-col items-center py-6 ' >
            {!isLoading && ( 
                <div className=' max-w-[700px] flex flex-col relative items-center ' >
                    <p className=" text-center font-semibold mb-6 " >{data?.eventName}</p>

                    <div className=' w-full flex justify-center relative ' > 
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
                    </div>
                    {/* <img src={pic} alt="image" className="w-[80px] mt-6" /> */}
                    <div className=" mt-8 w-full " >
                        <div className=" flex gap-3 text-sm font-normal " >
                            <p>Total</p>
                            <p>$13,600</p>
                        </div>
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
                                    <p className=" text-[30px]  font-medium text-center " >150</p>
                                </div>
                                <div className=" pt-[3px] px-4 border-r border-black " >
                                    <p className=" font-normal text-xs text-center " >Sold</p>
                                    <p className=" text-[30px]  font-medium text-center " >{history?.totalActiveSales}</p>
                                </div>
                                <div className=" pt-[3px] px-4 border-r border-black " >
                                    <p className=" font-normal text-xs text-center " >Cancelled</p>
                                    <p className=" text-[30px]  font-medium text-center " >{history?.totalRefunds}</p>
                                </div>
                                <div className=" pt-[3px] px-4  " >
                                    <p className=" font-normal text-xs text-center " >Available</p>
                                    <p className=" text-[30px]  font-medium text-center " >{history?.totalPendingSales}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full border-b border-[#D0D4EB] mt-8 py-7 px-4 " >

                        <ResponsiveContainer width={500} height={500}>
                            <BarChart
                            width={400}
                            height={300}
                            data={history.tickets}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                            >
                            <XAxis dataKey="ticketType" scale="point" padding={{ left: 10, right: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="totalActiveSales" fill="#B7B00E" background={{ fill: '#eee' }} />
                            <Bar dataKey="totalRefunds" fill="#E90303" background={{ fill: '#eee' }} />
                            <Bar dataKey="totalPendingSales" fill="#DB9E00" background={{ fill: '#eee' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventDashboardModal 

