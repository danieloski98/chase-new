import React from 'react'   
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from "axios";
import httpService from '../../utils/httpService';
import { toast } from "react-toastify";
import { Avatar } from '@chakra-ui/react';

interface Iprops {
	person: any,
	refetch: any,
}

const ExplorePerson = React.forwardRef(
	(props: Iprops, ref: any) => { 

	const {
		person 
	} = props
 
	const navigate = useNavigate()
	const [loading, setLoading] = React.useState("0")
	const [isFriend, setisFriend] = React.useState(person?.joinStatus)


	const unfriend = useMutation({
		mutationFn: () => httpService.delete("/user/remove-friend/"+person?.userId, {}),
		onError: (error: AxiosError<any, any>) => {
		  toast.error(error.response?.data?.message);
		},
		onSuccess: (data: AxiosResponse<any>) => {
		  toast.success(data.data?.message) 
		  setLoading("0")
		  setisFriend("pending") 
		}
	});

	const addfriend = useMutation({
		mutationFn: (data: any) => httpService.post("/user/send-friend-request", data),
		onError: (error: AxiosError<any, any>) => {
		  toast.error(error.response?.data?.message);
		},
		onSuccess: (data: AxiosResponse<any>) => {
		  toast.success(data.data?.message) 
		  setLoading("0")
		  setisFriend("CONNECTFriend") 
		}
	}); 

	const handleadd = React.useCallback(() => {
		setLoading(person?.userId) 
		addfriend.mutate({toUserID: person?.userId}) 
	}, [])   

	const handleRemove = React.useCallback(() => {
		setLoading(person?.userId) 
		unfriend.mutate() 
	}, []) 

	return (
		<li ref={ref} className="flex py-4 px-4 justify-between w-full items-center border-b">
			<div className="flex py-4 w-full items-center ">
				<div className="h-auto w-fit rounded-b-full rounded-tl-full  overflow-hidden">
					{person?.data?.imgMain?.value &&  
						<img onClick={() => navigate(`/profile/${`${person?.userId}`}`)} role='button' src={`https://chaseenv.chasescroll.com//resource-api/download/${person?.data?.imgMain?.value}`} alt="profiles" className="h-[57px] w-[57px] rounded-b-full rounded-tl-full" />
					}
					{!person?.data?.imgMain?.value && (
						<Avatar 
							src={`https://chaseenv.chasescroll.com//resource-api/download/${person?.data?.imgMain?.value}`}
							name={`${person?.firstName} ${person?.lastName}`}
							className="h-[57px] w-[57px] rounded-b-full rounded-tl-full cursor-pointer"
							size='md'
							onClick={() => navigate(`/profile/${`${person?.userId}`}`)}
						/> 
					)} 
				</div>
				<div className="flex flex-col pl-4">
					<h1 onClick={() => navigate(`/profile/${`${person?.userId}`}`)} className='cursor-pointer text-[20px] '>{person?.firstName} {person?.lastName}</h1>
					<span className="text-[#2E2B2B] text-[12px] font-normal text-opacity-[67%]">
						{person?.username}
					</span>
				</div>
			</div>
			<div className="flex justify-end pl-4 h-1/2">
				{isFriend === "FRIEND_REQUEST_SENT" ? (
					<button
						className="text-[#F04F4F] text-xs md:text-sm hover:text-red-600 shadow-lg bg-white font-semibold py-1 md:py-2 w-40 rounded"
						onClick={handleRemove}
					>
						{loading === person?.userId ? "Loading": "Pending"} 	
					</button>
				) :isFriend === "CONNECTED" ? (
					<button
						className="text-[#F04F4F] text-xs md:text-sm hover:text-red-600 shadow-lg bg-white font-semibold py-1 md:py-2 w-40 rounded"
						onClick={handleRemove}
					>
						{loading === person?.userId ? "Loading": "Disconnected"} 	
					</button>
				) :isFriend === "CONNECTFriend" ? (
					<button
						className="text-[#F04F4F] text-xs md:text-sm hover:text-red-600 shadow-lg bg-white font-semibold py-1 md:py-2 w-40 rounded"
						onClick={handleRemove}
					>
						{loading === person?.userId ? "Loading": "Pending"} 	
					</button>
				)  : (
					<button
						className="text-[#1732F7] text-xs md:text-sm hover:text-blue-500 shadow-lg bg-[#E2E5F3] font-semibold py-1 md:py-2 w-40 rounded"
						onClick={handleadd}
					>
						{loading === person?.userId ? "Loading": "Connect"} 	
					</button>
				)}
			</div>
		</li>
	)
})

// ExplorePerson.propTypes = {
// 	person: PropTypes.object
// }

export default ExplorePerson