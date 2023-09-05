import {Carousel} from '3d-react-carousal'; 
import React from 'react';
import { useQuery } from 'react-query';
import httpService from '../../../utils/httpService'; 
import CONFIG from '../../../config';
import Loader from '../../../components/Loader';


function CarouselTab(props) {
    const {} = props  



  const [dataInfo, setData] = React.useState([])

  // react query
    const { isLoading } = useQuery(['get-top-events'], () => httpService.get('/events/get-top-events'), {
        onError: (error) => {
            toast.error(error.response?.data);
        }, 
        onSuccess: (data) => {
            console.log(data);
            setData(data.data.content);
        }
    }) 

    let slides = [
        <img  src="https://picsum.photos/800/300/?random" alt="1" />,
        <img  src="https://picsum.photos/800/301/?random" alt="2" />  ,
        <img  src="https://picsum.photos/800/302/?random" alt="3" />  ,
        <img  src="https://picsum.photos/800/303/?random" alt="4" />  ,
        <img src="https://picsum.photos/800/304/?random" alt="5" />   ];

        
    return (  
        <div className=' relative w-full h-56 lg:h-[400px] ' >
            {isLoading && (
                <Loader />
            )}
            {!isLoading && ( 
                <Carousel slides={
                    dataInfo?.map((item)=> {
                        return(  
                            <> 
                                <div className="flex  flex-col pb-0 w-full relative rounded-[32px]"> 
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
                                        <p className="text-center font-bold w-full lg:h-4/5  bg-chasescrollBlue text-white p-2 rounded-b-[36px]">
                                            {item?.eventName}
                                        </p>
                                    )}
                                </div>
                            </>
                        )
                    })
                } autoplay={true} interval={8000}/>
            )} 
        </div>
    )
}

export default CarouselTab
