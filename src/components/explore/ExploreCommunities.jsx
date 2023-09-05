import React,{ useEffect, useState, forwardRef } from "react"
import GroupAvatar from "../../assets/svg/group-avatar.svg"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import { GET_ALL_PUBLIC_GROUPS_TO_JOIN, JOIN_GROUP, LEAVE_GROUP, REQUEST_TO_JOIN_GROUP } from "../../constants/endpoints.constant"
import CONFIG from "../../config"
import { toast } from "react-toastify"
import Loader from "../Loader"
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@chakra-ui/react'
import { Spinner } from "@chakra-ui/react";
import useInfinteScroller from "../../hooks/useInfinteScroller"
import InfiniteScrollerComponent from "../../hooks/infiniteScrollerComponent"

const ProductTile = forwardRef(
	(community, ref) => { 

    console.log(community);

    const { sendRequest } = useFetch()
    const { token, userId, searchValue } = useAuth()
    const navigate = useNavigate();
    const [ joined, setJoined] = React.useState(community.joinStatus)

  const handleJoinCommunity = async (groupID, joinID) => {
    const data = await sendRequest(
      JOIN_GROUP,
      "POST",
      {
        groupID,
        joinID,
      },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message) 
      setJoined("CONNECTED")
    }
  }

  const handleLeaveCommunity = async (groupID, userID) => {
    const data = await sendRequest(
      `${LEAVE_GROUP}?groupID=${groupID}&userID=${userID}`,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message) 
      setJoined("NOT_CONNECTED")
    }
  }
 
    return(
      <div
        ref={ref}
          key={community.id}
          className="flex items-center justify-between w-full p-3 px-5 border-b"
        >
          <div className="flex items-center w-fit gap-3 ">
            <div className=" border-white rounded-b-full rounded-tl-full w-[57px] relative">
              <div className=" border-2 border-white w-[57px] relative z-40 h-[57px] rounded-b-full rounded-tl-full " >
                <Avatar
                  src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                  name={community.data.name}
                  alt="descriptive photograph"
                  className="rounded-b-full object-cover rounded-tl-full w-full h-full "
                  onClick={() => navigate(`/communities/community/${community.id}`)}
                />
              </div>
              <svg className=" absolute border-2 border-white -bottom-[6px] -left-[6px] z-30 " width="64" height="58" viewBox="0 0 64 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.62858 31.5141C0.618593 16.8737 11.6683 4.18644 26.3088 3.17646L60.7677 0.799282L62.3222 23.3332C63.4837 40.1691 50.7771 54.7587 33.9413 55.9201L29.9663 56.1943C15.3258 57.2043 2.63856 46.1546 1.62858 31.5141Z" fill="#9DA8FB" stroke="white" stroke-width="1.5"/>
              </svg>
              <svg  className=" absolute border-2 border-white -bottom-[8px] -left-[8px] z-20 " width="56" height="51" viewBox="0 0 56 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.39995 27.6766C0.516235 14.8665 10.1845 3.76536 22.9947 2.88165L53.173 0.799774L54.5322 20.5029C55.549 35.2415 44.4252 48.0138 29.6866 49.0305L26.1949 49.2714C13.3848 50.1551 2.28367 40.4868 1.39995 27.6766Z" fill="#3C41F0" stroke="white" stroke-width="1.5"/>
              </svg>
              {/* <Avatar 
                src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                alt="descriptive photograph"
                className="rounded-b-full rounded-tl-full w-20 h-20 border-2 border-white cursor-pointer"
                name={community.data.name}
                onClick={() => navigate(`/communities/community/${community.id}`)}
              /> */}
            </div>
            <div className="flex flex-col">
              <h1 onClick={() => navigate(`/communities/community/${community.id}`)} className="text-base md:text-[20px] cursor-pointer">{community.data.name}</h1>
              <span className="text-xs text-[#2E2B2B] text-opacity-[67%]">
                {community.data.description}
              </span>
              <span
                className={
                  community.data.isPublic
                    ? "text-[#5D70F9] bg-[#D0D4EB] py-[2px] px-2 rounded-[2px] font-medium text-[8px]  text-center w-fit"
                    : "text-[#E90303] bg-[#FBCDCD] py-[2px] px-2 rounded-[2px] font-medium text-[8px]  text-center w-fit"
                }
              >
                {community.data.isPublic ? 'Public' : 'Private'}
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              {joined === "NOT_CONNECTED" ? (
                <button
                  className="text-[#fff] shadow-lg bg-[#3C41F0] font-bold py-2 px-8 rounded-[8px]"
                  onClick={() => handleJoinCommunity(community.id, userId)}
                >
                  Join
                </button>
              ) : (
                <button
                  className="text-[#fff] shadow-lg bg-[#F04F4F] font-bold py-2 px-8 rounded-[8px]"
                  onClick={() => handleLeaveCommunity(community.id, userId)}
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        </div>
    ) 
})

const ExploreCommunities = () => {
  const [communityList, setCommunityList] = useState([])
  const [loading, setLoading] = useState(false)
  const { sendRequest } = useFetch()
  const { token, userId, searchValue } = useAuth()
  const navigate = useNavigate(); 

  const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({url:`/group/find-groups?searchText=${searchValue}`, limit:10, filter: "userId"})
 

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col border rounded-3xl">
       {results?.map((community, i) => {
        if(results?.length === i + 1){
          return( 
            <ProductTile {...community} ref={ref} />
          )
        } else { 
          return( 
            <ProductTile {...community}  />
          )
        }
      })}

      {isLoading && ( 
        <div className="w-full h-32 flex justify-center items-center">
          <Spinner size='md' color='brand.chasescrollButtonBlue' />
        </div>
      )}
      {(!isLoading && results.length <= 0) && (
        <>
          {communityList?.length < 1 && (
            <div className=" w-full flex justify-center " >
                No Records Found
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ExploreCommunities
