// import React from 'react'
import { useQuery } from "react-query"; 
import httpService from "../../../utils/httpService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import React from "react"; 
import CONFIG from "../../../config";
import Loader from "../../../components/Loader";
import EventDashboardModal from "./modal";
import PageWrapper from "../../../components/PageWrapper";
import { useAuth } from "../../../context/authContext";
import { CaretLeftIcon } from "../../../components/Svgs";
import { useNavigate } from "react-router-dom";
import RefundModal from "./refund";

interface Props {}

function EventDashboard(props: Props) {
    const {} = props 

    const [history, setHistory] = React.useState([] as any)
    const { eventData } = useAuth()

    const [show, setShow] = React.useState(false)
    const [showRefund, setShowRefund] = React.useState(false)
    const [data, setData] = React.useState({} as any)

    const { isLoading } = useQuery(['myevent'], () => httpService.get('/events/events'), {
        onError: (error: AxiosError<any, any>) => {
            toast.error(error.response?.data);
        }, 
        onSuccess: (data) => {
            setHistory(data.data.content);
        }
    }) 
      
    const clickHandler =(item: any)=> {
        setData(item)
        setShow(true)
    }

    React.useEffect(()=> {
        if(eventData){
            setData(eventData)
            setShow(true)
        }
    }, [])
    const navigate = useNavigate()
      
    return ( 
        <PageWrapper> 
            {() => (
                <> 
                    {!showRefund && ( 
                        <div className=' w-full relative flex flex-col items-center py-6 ' >
                            
                            {!show && (
                                <>
                                    {isLoading && (
                                        <Loader />
                                    )}
                                </>
                            )}

                            <div className=' max-w-[700px] relative flex flex-col items-center ' >
                                <div className=" w-full flex flex-1 items-center justify-between mb-6 " >
                                    <div className=" flex items-center gap-3 " > 
                                        {!show && (
                                            <button
                                            onClick={() => navigate(-1)} 
                                            >
                                            <CaretLeftIcon />
                                            </button>
                                        )}
                                        <p className=" font-bold text-2xl text-center " >Events Dash Board</p>
                                    </div>
                                    {show && (
                                        <div className=' w-fit px-6 flex  justify-end ' >
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
                                    )}
                                </div>
                                {!show && (
                                    <> 
                                        {!isLoading && (
                                            <div className=' max-w-full gap-4 flex flex-col items-center ' >
                                                {/* <EventTiles /> */}
                                                {history?.map((event: any, index: any)=>{
                                                    return( 
                                                        <div role="button" onClick={()=> clickHandler(event)} key={index} className=" w-full border rounded-b-[36px] gap-4 rounded-tl-[36px] flex lg:flex-row flex-col items-center py-[11px] px-[15px] " >
                                                            <div className=" w-full lg:w-fit " >
                                                                <div className=" rounded-b-[24px] rounded-tl-[24px] w-full lg:w-[152px] h-[250px] lg:h-[152px]  " >
                                                                    <img
                                                                    src={`${CONFIG.RESOURCE_URL}/${event?.picUrls}`}
                                                                    alt=""
                                                                    className="rounded-b-[24px] rounded-tl-[24px]  w-full lg:w-[152px] object-cover h-[250px] lg:h-[152px]"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className=" max-w-full w-full lg:w-[60%] h-full flex flex-col pb-4 " >
                                                                <div className=" w-full flex items-center justify-between gap-2 py-2 border-b " > 
                                                                    <p className=" font-bold text-lg " >{event.eventName?.length >= 17 ? event.eventName.slice(0, 17)+"..." : event.eventName}</p>
                                                                    <p className=" text-sm font-semibold " >{event?.currency === "USD" ? "$" : "₦"}{event?.maxPrice}</p>
                                                                </div>
                                                                <div className="flex w-full gap-2 mt-6 pt-4 lg:mt-auto" >
                                                                    <svg className=" mt-[2px] " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g id="vuesax/linear/calendar">
                                                                            <g id="vuesax/linear/calendar_2">
                                                                                <g id="calendar">
                                                                                    <path id="Vector" d="M6 1.5V3.75" stroke="#747070" stroke-width="0.9" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_2" d="M12 1.5V3.75" stroke="#747070" stroke-width="0.9" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_3" d="M2.625 6.81641H15.375" stroke="#747070" stroke-width="0.9" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_4" d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z" stroke="#747070" stroke-width="0.9" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_5" d="M11.7713 10.2734H11.778" stroke="#747070" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_6" d="M11.7713 12.5234H11.778" stroke="#747070" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_7" d="M8.99588 10.2734H9.00262" stroke="#747070" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_8" d="M8.99588 12.5234H9.00262" stroke="#747070" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_9" d="M6.22049 10.2734H6.22723" stroke="#747070" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    <path id="Vector_10" d="M6.22049 12.5234H6.22723" stroke="#747070" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </svg>  
                                                                    <p className="text-[#747070] font-medium " >Oct 20th at 09:00 am</p>
                                                                </div>
                                                                <div className="flex w-full gap-2 mt-1" >
                                                                    <svg className=" mt-[2px] " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g id="Hicon / Bold / Location">
                                                                    <g id="Location">
                                                                    <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11.0856 14.7754C12.8179 12.5663 15 9.35694 15 7.20652C15 3.64068 12.3137 0.75 9 0.75C5.68629 0.75 3 3.64068 3 7.20652C3 9.35694 5.18209 12.5663 6.91441 14.7754C7.81818 15.9279 8.27007 16.5041 9 16.5041C9.72993 16.5041 10.1818 15.9279 11.0856 14.7754ZM9 9.75C7.75736 9.75 6.75 8.74264 6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5C11.25 8.74264 10.2426 9.75 9 9.75Z" fill="#1732F7"/>
                                                                    </g>
                                                                    </g>
                                                                    </svg>
                                                                    <p className=" font-medium text-[#1732F7] " >{event?.location.address?.length >= 17 ? event?.location.address.slice(0, 17)+"..." : event?.location.address}</p>
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </>
                                )}
                                {show && (
                                    <EventDashboardModal data={data} setRefund={setShowRefund} setShow={setShow} />
                                )}
                            </div>
                        </div>
                    )}
                    {showRefund && (
                        <div className=" w-full flex justify-center " > 
                            <div className=' w-[600px] py-6 relative ' >
                                <RefundModal setShow={setShowRefund} data={data} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </PageWrapper>
    )
}

export default EventDashboard

