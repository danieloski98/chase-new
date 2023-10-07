import { toast } from 'react-toastify';
import CONFIG from '../../../../config';
import { REMOVE_SAVED_EVENT } from '../../../../constants/endpoints.constant';
import { useFetch } from '../../../../hooks/useFetch';
import { IEvent } from '../../../../models/Events'
import { useAuth } from '../../../../context/authContext';
import { useQueryClient } from 'react-query';
import addEventBtn from "../../../../assets/svg/add-event.svg"

interface IProps {
    communityId: string;
    events: IEvent[];
    toggleEvents: () => void;
}

const EventsPanel = ({ events, toggleEvents, communityId }: IProps) => {
    const { sendRequest } = useFetch()
    const { token } = useAuth()
    const queryClient = useQueryClient()
  
    const removeEventFromGroup = (eventID) => {
		sendRequest(
			REMOVE_SAVED_EVENT,
			"DELETE",
			{
				eventID,
				typeID: communityId,
				type: "EVENT"
			},
			{ Authorization: `Bearer ${token}` }
		).then(response => {
			if (response?.updated) {
				toast.success(response?.message)
			} else {
				toast.error(response?.message)
			}
            queryClient.invalidateQueries(['getSavedEvent'])
		})
	}
    return (
        <div className="bg-white flex flex-nowrap overrflow-y-hidden  items-center gap-5 px-4 py-3 overflow-x-auto w-full h-[100%]">
            <img
                src={addEventBtn}
                alt="add event"
                className="cursor-pointer"
                onClick={toggleEvents}
            />
            {events?.map((event, i) => (
                <div key={i} className="relative cursor-pointer p-1 flex flex-col gap-2 border border-chasescrollBlue w-24 rounded-tl-lg rounded-b-lg">
                    <span onClick={() => removeEventFromGroup(event?.id)} className="cursor-pointer font-bold bg-white text-red-600 text-xl w-6 h-6 rounded-full flex justify-center items-center absolute -top-2 -right-2 border border-red-400">
                        -
                    </span>
                    <img
                        src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
                        className="w-full h-12 object-cover rounded-tl-md rounded-b-md"
                        alt="event banner"
                    />
                    <div className="flex flex-col">
                        <p className="text-[8px]">
                            {event?.eventName.length > 10 ? event?.eventName.slice(0, 10) : event?.eventName}
                        </p>
                        <p className="text-[6px] text-chasescrollBlue">
                            {event?.eventDescription.length > 12 ? event?.eventDescription.slice(0, 12) : event?.eventDescription}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventsPanel
