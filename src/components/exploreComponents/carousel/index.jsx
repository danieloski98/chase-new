// import {Carousel} from '3d-react-carousal'; 
import React from 'react';
import { useQuery } from 'react-query';
import httpService from '../../../utils/httpService'; 
import CONFIG from '../../../config';
import Loader from '../../../components/Loader';
import { CustomCarousel } from '../../../components/customCarousel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'



function CarouselTab(props) {
        
    const [dataInfo, setData] = React.useState([])
    const navigate = useNavigate()

  // react query
    const { isLoading, isRefetching } = useQuery(['get-top-events'], () => httpService.get('/events/get-top-events'), {
        onError: (error) => {
            toast.error(error.response?.data);
        }, 
        onSuccess: (data) => { 
            setData(data.data.content);
        }
    })  
        
    return (  
        <div className=' relative w-full h-64 lg:h-[450px] ' >
            {(isLoading && isRefetching ) && (
                <Loader />
            )}
            {(!isLoading && !isRefetching )&& ( 
                <CustomCarousel slides={
                    dataInfo?.map((item, index)=> {
                        return(  
                            <> 
                                <div role='button' onClick={() => navigate(`/events/${item.id}`)}  className="flex h-56 lg:h-80 flex-col pb-0 w-full relative rounded-[32px]"> 
                                    <div className="backdrop-blur-sm absolute inset-0 px-3 hidden lg:flex justify-center items-center rounded-tl-[32px] h-80">
                                        <img
                                            src={`${CONFIG.RESOURCE_URL}/${item?.currentPicUrl}`}
                                            alt="Blurred Image"
                                            className="h-80 blur-sm w-full object-cover rounded-tl-[16px]"
                                        />
                                    </div>
                                    <img
                                        src={`${CONFIG.RESOURCE_URL}/${item?.currentPicUrl}`}
                                        alt=""
                                        className={`w-full h-56 lg:h-80 z-30 rounded-tl-[36px] object-cover lg:object-contain ${
                                            !item?.eventName ? "rounded-b-[36px]" : ""
                                        }`}
                                    />
                                    {item?.eventName && (
                                        <> 
                                            <p className="text-center font-bold w-full lg:h-4/5  bg-chasescrollBlue text-white lg:block hidden p-2 rounded-b-[36px]">
                                                {item?.eventName?.length > 50 ? item?.eventName.slice(0, 50)+"..." :item?.eventName}
                                            </p>
                                            <p className="text-center font-bold w-full lg:h-4/5  bg-chasescrollBlue text-white lg:hidden p-2 rounded-b-[36px]">
                                                {item?.eventName?.length > 50 ? item?.eventName.slice(0, 25)+"..." :item?.eventName}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </>
                        )
                    })
                } autoplay={true} interval={5000}  />
            )} 
            
        </div>
    )
}

export default CarouselTab
