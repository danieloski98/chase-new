import React from 'react'
import CONFIG from '../../../../config'
import httpService from '../../../../utils/httpService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

interface Props {
    data: any,
    setShow: any
}

function RefundModal(props: Props) {
    const {
        data,
        setShow
    } = props 

    const [eventUser, setEventUser] = React.useState({} as any)


    const { isLoading } = useQuery(['geteventuserbyticket'], () => httpService.get('/events/get-event-members/'+data?.id), {
        onError: (error: AxiosError<any, any>) => {
          toast.error(error.response?.data);
        }, 
        onSuccess: (data) => {
            console.log(data);
            
            setEventUser(data.data.content);
        }
    })    

    const clickHandler = async()=> {
        const response = await httpService.post("/payments/refundEvent")

        console.log(response);
        
    }

    const clickHandlerById = async(item: any)=> {
        const response = await httpService.post("/payments/refundEvent")

        console.log(response);
        
    }

    return (
        <div className=' w-full mt-6 ' >
            <div className=" w-full flex items-center  mb-6 " > 
                <div className=' w-fit px-6 flex ' >
                    <button onClick={()=> setShow(false)} > 
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M24.9234 2.7557C25.3871 2.29196 25.3871 1.54007 24.9234 1.07633C24.4596 0.612579 23.7078 0.612579 23.244 1.07633L13.0003 11.32L2.75668 1.07633C2.29293 0.612583 1.54105 0.612583 1.0773 1.07633C0.613555 1.54008 0.613555 2.29196 1.0773 2.75571L11.321 12.9994L1.07735 23.243C0.613598 23.7067 0.613598 24.4586 1.07735 24.9224C1.54109 25.3861 2.29298 25.3861 2.75672 24.9224L13.0003 14.6788L23.244 24.9224C23.7077 25.3861 24.4596 25.3861 24.9233 24.9224C25.3871 24.4586 25.3871 23.7067 24.9233 23.243L14.6797 12.9994L24.9234 2.7557Z"
                            fill="black"
                            />
                        </svg>
                    </button>
                </div> 
                <p className=" font-bold text-2xl text-center " >Refund all users</p>
            </div>  
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
                <button className=' text-[#5D70F9] font-medium  absolute right-2 top-2' >Continue</button>
            </div>
            <div className=' w-full mt-6 flex flex-col gap-4 ' > 
                {!isLoading && (
                    <> 
                        {eventUser?.map((item: any, index: number)=> {
                            return(
                                <div key={index} className=' W-full flex justify-between ' >
                                    <div className=' flex gap-3 ' > 
                                        <div className=' w-[57px] h-[57px] rounded-b-[36px] rounded-tl-[36px] bg-slate-500 '  >
                
                                        </div>
                                        <div className='' >
                                            <p className=' text-xl font-semibold ' >{item?.user?.firstName+" "+item?.user?.lastName}</p>
                                            <p className=' text-xs font-medium text-[#2E2B2B] ' >{item?.user?.username}</p>
                                        </div>
                                    </div>
                                    <button className=' px-4 h-[40px] text-white rounded-lg bg-red-600 ml-auto ' >
                                        Refund
                                    </button>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        </div>
    )
}

export default RefundModal
