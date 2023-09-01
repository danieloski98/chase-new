import React, { forwardRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Popover, Transition } from "@headlessui/react"
// import img from "@/assets/images/suggestprofile.png"
import { HollowEllipsisIcon } from "@/components/Svgs"
import { SUGGESTION_MENU } from "@/constants"
import { isEven } from "../../utils/helpers"
import { useFetch } from "../../hooks/useFetch"
import { BLOCK_USER, REMOVE_FRIEND, SEND_FRIEND_REQUEST } from "../../constants/endpoints.constant"
import { useAuth } from "../../context/authContext"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import {Avatar} from "@chakra-ui/react"
import useInfinteScroller from "../../hooks/useInfinteScroller"
 
const Suggestion = forwardRef
(({
  mutuals = 0,
  data,
  firstName,
  lastName,
  publicProfile = false,
  userId,
  img,
  check, 
}, ref) => {
  const [isConnected, setIsConnected] = useState(false)
  const [Loading, setLoading] = useState("0")
  const [isFriend, setisFriend] = useState(data?.joinStatus)
  const { token } = useAuth()
  const { sendRequest } = useFetch()

  const navigate = useNavigate(); 

  const sendFriendRequest = async () => {
    const response = await sendRequest(
      SEND_FRIEND_REQUEST,
      "POST",
      { toUserID: userId },
      { Authorization: `Bearer ${token}` }
    )
    if (response){  
      setisFriend("CONNECTED") 
       setIsConnected(state => !state)}
  }

  const blockSuggestion = async () => {
    const response = await sendRequest(
      BLOCK_USER,
      "POST",
      {
        blockType: "USER",
        id: userId,
      },
      { Authorization: `Bearer ${token}` }
    )
    // if (response) console.log(response)
  }

  const friendPerson = async () => {
    setLoading(userId)
    const data = await sendRequest(
      `${SEND_FRIEND_REQUEST}`,
      "POST",
      { toUserID: userId },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message); 
      setisFriend("CONNECTFriend") 
      setLoading("0")
    }
  }

  const unfriendPerson = async () => {
    setLoading(userId)
    const data = await sendRequest(
      `${REMOVE_FRIEND}${userId}`,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message); 
      setisFriend("pending") 
      setLoading("0")
    }
  }  

  console.log(isFriend);

  return (
    <div ref={ref} className="flex flex-col gap-3 bg-chasescrollWhite rounded-b-3xl rounded-tl-3xl border border-chasescrollLightGrey shadow-lg px-3 pt-3 pb-6 w-40">
      <Popover className="relative w-fit self-end">
        <Popover.Button className="flex outline-none">
          <div className="flex self-end text-chasescrollBlue">
            <span className="cursor-pointer p-1 -mr-1">
              <HollowEllipsisIcon />
            </span>
          </div>
        </Popover.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute z-10 right-0 bg-white w-32 border border-gray-200 rounded-lg shadow-lg">
            {SUGGESTION_MENU.map((item, index) => (
              <div
                key={item.id}
                onClick={blockSuggestion}
                className={`text-center text-sm w-full px-2 py-3 cursor-pointer border-gray-200
                ${index !== SUGGESTION_MENU.length - 1
                    ? "border-b"
                    : "border-none"
                  } ${isEven(index) ? "text-black" : "text-red-500"}`}
              >
                {item.label}
              </div>
            ))}
          </Popover.Panel>
        </Transition>
      </Popover>

      <div className="flex flex-col lg:gap-2 gap-1 items-center">
        <div className="rounded-b-full rounded-tl-full w-20 h-20 border border-chasescrollBlue">
          {/* {check ?  
            <img 
              onClick={() => navigate(`/profile/${userId}`)}
              src={img} 
              alt="" 
              className="rounded-b-full object-cover rounded-tl-full w-full h-full cursor-pointer" />
              :
            <div onClick={() => navigate(`/profile/${userId}`)} className="rounded-b-full rounded-tl-full w-full h-full cursor-pointer bg-yellow-400 ">

            </
          } */}
          {data?.data?.imgMain?.value &&  
						<img src={`https://chaseenv.chasescroll.com//resource-api/download/${data?.data?.imgMain?.value}`} alt="profiles" className="h-full w-full rounded-b-full rounded-tl-full" />
					}
					{!data?.data?.imgMain?.value && (
						<Avatar
							src={`https://chaseenv.chasescroll.com//resource-api/download/${data?.data?.imgMain?.value}`}
							name={`${data?.firstName} ${data?.lastName}`}
							className="h-full w-full rounded-b-full rounded-tl-full cursor-pointer"
							size='md'
							onClick={() => navigate(`/profile/${`${data?.userId}`}`)}
						/> 
					)}
        </div>
        <h1 onClick={() => navigate(`/profile/${userId}`)} className="font-bold text-center text-sm cursor-pointer">{firstName} {lastName}</h1>
        <h3 className="text-chasescrollGrey text-xs">
          {mutuals} Mutual Connection{mutuals === 1 ? "" : "s"}
        </h3>
        {(isFriend === "FRIEND_REQUEST_SENT" ||  isFriend === "pending" )?
          <button
            onClick={unfriendPerson}
            className={`flex items-center font-semibold justify-center rounded-md py-2 text-xs lg:text-sm w-28 transition-all ${isFriend === "FRIEND_REQUEST_SENT"
              ? "text-white bg-[#F04F4F]"
              : "bg-chasescrollBlue text-white"
              }`}
          >
            {Loading === userId ? "Loading..":isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isConnected ? "Connected" : "Connect"}
          </button>
           :(isFriend === "CONNECTED" || isFriend === "CONNECTFriend" )? (
            <button
            onClick={unfriendPerson}
            className={`flex items-center font-semibold justify-center rounded-md py-2 text-xs lg:text-sm w-28 transition-all ${isFriend === "FRIEND_REQUEST_SENT"
              ? "text-white bg-[#F04F4F]":
              isFriend === "CONNECTFriend" ? "text-white bg-[#F04F4F]" : "bg-chasescrollBlue text-white"
              }`}
          >
              {Loading === userId ? "Loading": isFriend === "CONNECTFriend" ? "Pending": "Disconnected"} 	
            </button>
          ):
          <button
            onClick={friendPerson}
            className={`flex items-center font-semibold justify-center rounded-md py-2 text-xs lg:text-sm w-28 transition-all ${isFriend === "FRIEND_REQUEST_SENT"
              ? "text-white bg-[#F04F4F]"
              : "bg-chasescrollBlue text-white"
              }`}
          >
            {Loading === userId? "Loading..": "Connect"}
          </button>
        }
      </div>
    </div>
  )
})

Suggestion.propTypes = {
  name: PropTypes.string,
  mutuals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  publicProfile: PropTypes.bool,
  userId: PropTypes.string
}

export default Suggestion
