import React from 'react';
import EventBlob from "../../assets/svg/eventBlob.svg"
import { EVENTS_LIST } from "../../constants"
import { CalendarIcon, UploadIcon, LocationIcon_2, BookmarkIcon } from "../Svgs"
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query';
import httpService from "@/utils/httpService";
import { toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { IEvent } from 'src/models/Events';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import SavedEvent from '../events/SavedEvent';

const SearchEventCard = (event: IEvent) => {
  const navigate = useNavigate();

  // save event
  const saveEvent = useMutation({
    mutationFn: (data: any) => httpService.post('/events/save-event', data),
    onError: (error: AxiosError<any, any>) => {
      toast.error(error.response?.data?.message);
    },
    onSuccess: (data: AxiosResponse<any>) => {
      toast.success(data.data?.message)
    }
  });

  const deletedSavedEvent = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return httpService.delete('/events/remove-saved-event', data)
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(error.response?.data?.message);
    },
    onSuccess: (data: AxiosResponse<any>) => {
      toast.success(data.data?.message)
    }
  });

  const handleSave = React.useCallback(() => {
    if (event.isSaved) {
      deletedSavedEvent.mutate({
        eventID: event.id,
        typeID: event.id,
        type: 'EVENT'
      })
    } else {
      saveEvent.mutate({
        eventID: event.id,
        typeID: event.id,
        type: 'EVENT'
      })
    }
  }, [event, deletedSavedEvent, saveEvent])

  return (
    <li key={event.id} className="border-b p-2 ">
           <div className="flex my-4 justify-between">
             <div className="flex justify-start">
               <img onClick={() => navigate(`/event/${event.id}`)} src={EventBlob} alt="profiles" className="w-full h-full cursor-pointer" />
             </div>

             <div>
               <div className="flex flex-col gap-4 w-full justify-end pl-4">
                 <h1 onClick={() => navigate(`/event/${event.id}`)}  className="border-b text-[10.5px] md:text-sm cursor-pointer">
                   {event.eventName}{" "}
                   <span className="pl-1 md:pl-4">{event.maxPrice}</span>
                 </h1>
                 <span className="flex gap-2 text-xs md:text-sm text-[#2E2B2B] text-opacity-[67%]">
                   <CalendarIcon /> 
                   <span>{new Date(event.startDate).toDateString()}</span>
                 </span>

                 <div className="flex md:gap-8">
                   <span className="flex gap-2 text-xs md:text-sm text-[#1732F7] font-bold">
                     <LocationIcon_2 /> {event.location.address}
                   </span>
                   <div className="flex gap-2">
                     <UploadIcon />
                     <span className="cursor-pointer" onClick={handleSave}>
                      { saveEvent.isLoading  && <Spinner size='md' color="brand.chasesccrollButtonBlue" /> }
                      { !saveEvent.isLoading && (
                         <span className='text-2xl'>
                         { event.isSaved && <IoBookmark /> }
                         { !event.isSaved && <IoBookmarkOutline /> }
                        </span>
                      )}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </li>
  )
}

const ExploreEvents = () => {
  const [events, setEvents] = React.useState<IEvent[]>([]);


  // react query
  const { isLoading } = useQuery(['getEventSearch'], () => httpService.get('/events/events'), {
    onError: (error: AxiosError<any, any>) => {
      toast.error(error.response?.data);
    }, 
    onSuccess: (data) => {
      setEvents(data.data.content);
    }
  })
  return (
    <div className="px-4 h-auto overflow-auto pb-96">
      { isLoading && (
        <div className="w-full h-32 flex justify-center items-center">
          <Spinner size='md' color='brand.chasescrollButtonBlue' />
        </div>
      )}
     { !isLoading && events.length > 0 && (
       <ul className="w-full max-w-xl mx-auto flex flex-col border rounded-3xl">
       {events.map(event => (
         <SearchEventCard {...event} />
       ))}
     </ul>
     )}
    </div>
  )
}

export default ExploreEvents
