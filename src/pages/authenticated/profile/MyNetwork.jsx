import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { MyConnect } from "@/constants"
import CONFIG from "../../../config"
import { ACCEPT_FRIEND_REQUEST, DECLINE_REQUEST, GET_FRIEND_REQUESTS, GET_USER_CONNECTION_LIST, REMOVE_FRIEND, SEND_FRIEND_REQUEST } from "../../../constants/endpoints.constant"
import { toast } from "react-toastify";
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import { REJECT_FRIEND_REQUEST } from "../../../constants/endpoints.constant"
import { PATH_NAMES } from "../../../constants/paths.constant"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Avatar } from '@chakra-ui/react';
import Loader from "../../../components/Loader"
import useInfinteScroller from "../../../hooks/useInfinteScroller"

const MyNetwork = (props) => {
  const [activeTab, setActiveTab] = useState("Connects")
  const [requests, setRequests] = useState([])
  const [network, setNetwork] = useState([])
  // const [isLoading, setIsLoading] = React.useState(true)
  const { sendRequest } = useFetch() 
  const navigate = useNavigate()

  const { userId } = useParams()
  const { token, userId: currentUserId } = useAuth()
 
  const self = userId === currentUserId

  const handleTabChange = tab => {
    setActiveTab(tab)
  }

  const fetchRequests = async () => {
    const data = await sendRequest(
      GET_FRIEND_REQUESTS,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setRequests(data)
    // setIsLoading(false)
  }

  const acceptRequest = async (id) => {
    const data = await sendRequest(
      ACCEPT_FRIEND_REQUEST,
      "POST",
      { friendRequestID: id },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchRequests()
    }
  }

  const rejectRequest = async (id) => {
    const data = await sendRequest(
      REJECT_FRIEND_REQUEST,
      "DELETE",
      { friendRequestID: id },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchRequests()
    }
  }

  const fetchNetwork = async () => {
    if (userId) {
      const data = await sendRequest(
        `${GET_USER_CONNECTION_LIST}${userId}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      )
      if (data) setNetwork(data)
    }
  }


  const friendPerson = async (item) => {
    // setLoading(true)
    const data = await sendRequest(
      `${SEND_FRIEND_REQUEST}`,
      "POST",
      { toUserID: userId },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchNetwork()
      refetch()
      fetchProfileInfo()
    }
    // setLoading(false)
  }

  const unfriendPerson = async (item) => {
    // setLoading(true)
    const data = await sendRequest(
      `${REMOVE_FRIEND}${userId}`,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchNetwork()
      refetch()
      fetchProfileInfo()
    }
    // setLoading(false)
  }

  useEffect(()=>{
    fetchNetwork()
    fetchRequests()
    if(props.active){
      setActiveTab(props.active)
    } 
    refetch()
  }, [userId])

  
  const [page, setPage] = React.useState(0)
  const { results, isLoading, lastChildRef, refetch, data } = useInfinteScroller({url:'/user/friend-requests', pageNumber:page, setPageNumber:setPage})


  return (
    <div className="flex justify-center px-4  w-full max-w-md mx-auto">

      {isLoading && (
        <> 
          {props?.active  === "Requests" && ( 
            <div className=" w-full py-6 flex justify-center " >
                <Loader />
            </div>
          )}
        </>
      )}
        <div className="flex flex-col justify-center w-full mb-[100px]">
          {self && (
            <div className="flex justify-center items-center px-1 py-1 bg-[#EFEFF0] rounded-lg mx-auto">
              <button
                className={`text-sm sm:text-base font-bold py-2 px-6 ${activeTab === "Connects"
                  ? "bg-white rounded-tl-md rounded-bl-md text-chasescrollBlue py-2 px-6 "
                  : "text-gray-400"
                  }`}
                onClick={() => {
                  handleTabChange("Connects")
                  fetchNetwork()
                }}
              >
                Connects
              </button>
              <button
                className={`text-sm sm:text-base font-bold py-2 px-6 ${activeTab === "Requests"
                  ? "bg-white rounded-tr-md rounded-br-md text-chasescrollBlue py-2 px-6 "
                  : "text-gray-400"
                  }`}
                onClick={() => {
                  handleTabChange("Requests")
                  fetchRequests()
                }}
              >
                Requests
              </button>
            </div>
          )}

          {!isLoading && (
            <>
            
            {activeTab === "Requests" && (
                <div className="flex flex-col gap-6 justify-center items-center mt-10 mb-[100px] w-full">
                  {results?.map(
                    ({ toUserID, id }, i) => { 
                      if (results?.length === i + 1) {
                        return (
                          <div
                            className="flex justify-between items-center w-full"
                            key={id}
                            ref={lastChildRef}
                          >
                            <Link
                              to={`${PATH_NAMES.profile}/${id}`} 
                              className="flex gap-2 items-center"
                            >
                              {/* <img src={`${CONFIG.RESOURCE_URL}${toUserID?.data?.imgMain?.value}`} alt="" className="w-12 h-12 rounded-b-full rounded-tl-full border border-chasescrollBlue object-cover" /> */}

                              <Avatar 
                                src={`${CONFIG.RESOURCE_URL}${toUserID?.data?.imgMain?.value}`}
                                name={`${toUserID?.firstName} ${toUserID?.lastName}`}
                              />
                              <div className="inline-flex flex-col">
                                <p className="text-l text-black-800 capitalize">
                                  {toUserID?.firstName} {toUserID?.lastName}
                                </p>
                                <small className="text-gray-500">@{toUserID?.username}</small>
                              </div>
                            </Link>
                            <div className="flex gap-2">
                              <button
                                className="px-4 py-2 bg-chasescrollBlue text-white rounded-md shadow-md font-bold"
                                onClick={() => acceptRequest(id)}
                              >
                                <span className="text-sm">Accept</span>
                              </button>
                              <button
                                className="px-4 py-2 text-red-600 bg-pink-100 rounded-md shadow-md font-bold"
                                onClick={() => rejectRequest(id)}
                              >
                                <span className="text-sm">Reject</span>
                              </button>
                            </div>
                          </div>
                        )
                      } else { 
                        return (
                          <div
                            className="flex justify-between items-center w-full"
                            key={id}
                          >
                            <Link
                              to={`${PATH_NAMES.profile}/${id}`} 
                              className="flex gap-2 items-center"
                            >
                              {/* <img src={`${CONFIG.RESOURCE_URL}${toUserID?.data?.imgMain?.value}`} alt="" className="w-12 h-12 rounded-b-full rounded-tl-full border border-chasescrollBlue object-cover" /> */}

                              <Avatar 
                                src={`${CONFIG.RESOURCE_URL}${toUserID?.data?.imgMain?.value}`}
                                name={`${toUserID?.firstName} ${toUserID?.lastName}`}
                              />
                              <div className="inline-flex flex-col">
                                <p className="text-l text-black-800 capitalize">
                                  {toUserID?.firstName} {toUserID?.lastName}
                                </p>
                                <small className="text-gray-500">@{toUserID?.username}</small>
                              </div>
                            </Link>
                            <div className="flex gap-2">
                              <button
                                className="px-4 py-2 bg-chasescrollBlue text-white rounded-md shadow-md font-bold"
                                onClick={() => acceptRequest(id)}
                              >
                                <span className="text-sm">Accept</span>
                              </button>
                              <button
                                className="px-4 py-2 text-red-600 bg-pink-100 rounded-md shadow-md font-bold"
                                onClick={() => rejectRequest(id)}
                              >
                                <span className="text-sm">Reject</span>
                              </button>
                            </div>
                          </div>
                        )
                      }
                    }
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "Connects" && (
            // <div className="flex flex-col w-full my-6 mb-[100px]">
            //   {data?.data?.map((profile, i) => {  
            //     if (results?.length === i + 1) {
            //       return( 
            //         <div
            //           ref={lastChildRef}
            //           className="flex justify-between items-center my-4"
            //           key={profile?.id} >
            //           <Link
            //             to={`${PATH_NAMES.profile}/${profile.userId}`}
            //             className="flex gap-2 items-center"
            //           >
            //             {/* <img
            //               src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
            //               className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
            //               alt="connection"
            //             /> */}
            //             <Avatar 
            //                 src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
            //                 className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
            //                 name={`${profile?.firstName} ${profile.lastName}`}
            //             />
            //             <div className="inline-flex flex-col">
            //               <p className="text-l text-black-800">
            //                 {profile?.firstName} {profile?.lastName}
            //               </p>
            //               <small className="text-gray-500">@{profile?.username}</small>
            //             </div>
            //           </Link>
            //           {/* {self && ( */}
            //             <>
            //               {profile?.joinStatus !== "CONNECTED" ? (
            //                 <button
            //                   className="px-4 py-2 text-red-600 bg-pink-100 shadow-lg font-bold rounded-md"
            //                   onClick={() => unfriendPerson(profile?.userId)}
            //                 >
            //                   <span className="text-sm">Disconnect</span>
            //                 </button>
            //               ) : (
            //                 <button
            //                   className="px-4 py-2 text-white bg-chasescrollBlue shadow-lg font-bold rounded-md"
            //                   onClick={() => friendPerson(profile?.userId)}
            //                 >
            //                   <span className="text-sm">Connect</span>
            //                 </button>
            //               )}
            //             </>  
            //           {/* )} */}
            //         </div>
            //       )
            //     } else { 
            //       return( 
            //           <div
            //           className="flex justify-between items-center my-4"
            //           key={profile?.id}
            //         >
            //           <Link
            //             to={`${PATH_NAMES.profile}/${profile.userId}`}
            //             className="flex gap-2 items-center"
            //           >
            //             {/* <img
            //               src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
            //               className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
            //               alt="connection"
            //             /> */}
            //             <Avatar 
            //                 src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
            //                 className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
            //                 name={`${profile?.firstName} ${profile.lastName}`}
            //             />
            //             <div className="inline-flex flex-col">
            //               <p className="text-l text-black-800">
            //                 {profile?.firstName} {profile?.lastName}
            //               </p>
            //               <small className="text-gray-500">@{profile?.username}</small>
            //             </div>
            //           </Link>
            //           {/* {self && ( */}
            //             <>
            //               {profile?.joinStatus === "CONNECTED" ? (
            //                 <button
            //                   className="px-4 py-2 text-red-600 bg-pink-100 shadow-lg font-bold rounded-md"
            //                   onClick={() => unfriendPerson(profile?.userId)}
            //                 >
            //                   <span className="text-sm">Disconnect</span>
            //                 </button>
            //               ) : (
            //                 <button
            //                   className="px-4 py-2 text-white bg-chasescrollBlue shadow-lg font-bold rounded-md"
            //                   onClick={() => friendPerson(profile?.userId)}
            //                 >
            //                   <span className="text-sm">Connect</span>
            //                 </button>
            //               )}
            //             </>  
            //           {/* )} */}
            //         </div>
            //       )
            //     }
            //   })}
            // </div>
            <ConnectTab />
          )}
        </div> 
    </div >
  )
}

const ConnectTab =()=> {
  const { userId } = useParams()
  const { token, userId: currentUserId } = useAuth()
  const { sendRequest } = useFetch() 
  const [network, setNetwork] = useState([])

  const [page, setPage] = React.useState(0)
  const { isLoading, lastChildRef, refetch, data } = useInfinteScroller({url:'/user/get-users-connections/'+userId, pageNumber:page, setPageNumber:setPage, search: true})


  const fetchNetwork = async () => {
    if (userId) {
      const data = await sendRequest(
        `${GET_USER_CONNECTION_LIST}${userId}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      )
      if (data) setNetwork(data)
    }
  }

  const friendPerson = async (item) => {
    // setLoading(true)
    const data = await sendRequest(
      `${SEND_FRIEND_REQUEST}`,
      "POST",
      { toUserID: userId },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchNetwork()
      refetch() 
    }
    // setLoading(false)
  }

  const unfriendPerson = async (item) => {
    // setLoading(true)
    const data = await sendRequest(
      `${REMOVE_FRIEND}${userId}`,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchNetwork() 
    }
    // setLoading(false)
  }

  React.useEffect(()=> {
    fetchNetwork()
  }, [])

  return( 
    <div className="flex flex-col w-full my-6 mb-[100px]">
      {network?.map((profile, i) => {   
          return( 
              <div
              className="flex justify-between items-center my-4"
              key={profile?.id}
            >
              <Link
                to={`${PATH_NAMES.profile}/${profile.userId}`}
                className="flex gap-2 items-center"
              >
                {/* <img
                  src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
                  className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
                  alt="connection"
                /> */}
                <Avatar 
                    src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
                    className="rounded-b-full rounded-tl-full object-cover w-12 h-12 border border-chasescrollBlue"
                    name={`${profile?.firstName} ${profile.lastName}`}
                />
                <div className="inline-flex flex-col">
                  <p className="text-l text-black-800">
                    {profile?.firstName} {profile?.lastName}
                  </p>
                  <small className="text-gray-500">@{profile?.username}</small>
                </div>
              </Link>
              {/* {self && ( */}
                <>
                  {profile?.joinStatus === "CONNECTED" ? (
                    <button
                      className="px-4 py-2 text-red-600 bg-pink-100 shadow-lg font-bold rounded-md"
                      onClick={() => unfriendPerson(profile?.userId)}
                    >
                      <span className="text-sm">Disconnect</span>
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 text-white bg-chasescrollBlue shadow-lg font-bold rounded-md"
                      onClick={() => friendPerson(profile?.userId)}
                    >
                      <span className="text-sm">Connect</span>
                    </button>
                  )}
                </>  
              {/* )} */}
            </div>
          )
        // }
      })}
    </div>
  )
}

MyNetwork.propTypes = {
  network: PropTypes.array
}

export default MyNetwork
