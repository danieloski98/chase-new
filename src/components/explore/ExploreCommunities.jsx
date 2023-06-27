import { useEffect, useState } from "react"
import GroupAvatar from "../../assets/svg/group-avatar.svg"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import { GET_ALL_PUBLIC_GROUPS_TO_JOIN, JOIN_GROUP, LEAVE_GROUP, REQUEST_TO_JOIN_GROUP } from "../../constants/endpoints.constant"
import CONFIG from "../../config"
import { toast } from "react-toastify"
import Loader from "../Loader"

const ExploreCommunities = () => {
  const [communityList, setCommunityList] = useState([])
  const { sendRequest } = useFetch()
  const { token } = useAuth()

  const fetchCommunities = async () => {
    const data = await sendRequest(
      GET_ALL_PUBLIC_GROUPS_TO_JOIN,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setCommunityList(data)
  }

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
      fetchCommunities()
    }
  }

  const handleLeaveCommunity = async (groupID, userID) => {
    const data = await sendRequest(
      `${LEAVE_GROUP}?groupID=${groupID}&userID=${userID}`,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) toast.success(data.message)
  }

  useEffect(() => {
    fetchCommunities()
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col border rounded-3xl">
      {!communityList.content ? (
        <Loader />
      ) : communityList?.content?.map(community => (
        <div
          key={community.id}
          className="flex items-center justify-between w-full p-3"
        >
          <div className="flex items-center">
            <div className="border-l-2 border-chasescrollBlue rounded-b-full rounded-tl-full w-32">
              <img
                src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                alt="descriptive photograph"
                className="rounded-b-full rounded-tl-full w-20 h-20 border-2 border-white"
              />
            </div>
            <div className="flex flex-col pl-2 w-full">
              <h1 className="text-base md:text-[20px]">{community.data.name}</h1>
              <span className="text-xs text-[#2E2B2B] text-opacity-[67%]">
                {community.data.description}
              </span>
              <span
                className={
                  community.data.isPublic
                    ? "text-[#5D70F9] bg-[#D0D4EB] py-1 px-3 rounded-lg text-[8px] text-center w-fit"
                    : "text-[#E90303] bg-[#FBCDCD] py-1 px-3 rounded-lg text-[8px] text-center w-fit"
                }
              >
                {community.data.isPublic ? 'Public' : 'Private'}
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              {community.joinStatus === "NOT_CONNECTED" ? (
                <button
                  className="text-[#1732F7] hover:text-blue-500 shadow-lg bg-[#E2E5F3] font-bold py-2 px-8 rounded"
                  onClick={() => handleJoinCommunity(community.id, community.creator.userId)}
                >
                  Join
                </button>
              ) : (
                <button
                  className="text-[#F04F4F] hover:text-red-600 shadow-lg bg-white font-bold py-2 px-8 rounded"
                  onClick={() => handleLeaveCommunity(community.id, community.creator.userId)}
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExploreCommunities
