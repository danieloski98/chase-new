import { useEffect, useState } from "react"
import PageWrapper from "@/components/PageWrapper"
import { RANDOMCOMMUNITIES, REQUEST, COMMUNITY_TABS } from "@/constants"
import { AddIcon, CancelIcon2, SearchIcon } from "../../../components/Svgs"
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import { GET_ALL_PUBLIC_GROUPS_TO_JOIN, GET_GROUP_REQUESTS, JOIN_GROUP } from "../../../constants/endpoints.constant"
import CONFIG from "../../../config"
import { toast } from "react-toastify"
import { GET_JOINED_GROUPS } from "../../../constants/endpoints.constant"
import { LEAVE_GROUP } from "../../../constants/endpoints.constant"
import Loader from "../../../components/Loader"
import { PATH_NAMES } from "../../../constants/paths.constant"
import { Link } from "react-router-dom"

const Communities = () => {
  const [activeTab, setActiveTab] = useState(COMMUNITY_TABS[0])
  const [communities, setCommunities] = useState()
  const [myCommunities, setMyCommunities] = useState()
  const [joinedCommunities, setJoinedCommunities] = useState()
  const [requestedCommunities, setRequestedCommunities] = useState()
  const [filter, setFilter] = useState("")

  const { sendRequest } = useFetch()
  const { token, userId } = useAuth()

  const fetchCommunities = async () => {
    const data = await sendRequest(
      GET_ALL_PUBLIC_GROUPS_TO_JOIN,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setCommunities(data)
  }

  const fetchMyCommunities = async () => {
    const data = await sendRequest(
      `${GET_JOINED_GROUPS}?userID=${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setMyCommunities(data)
  }

  const fetchMyRequests = async () => {
    const data = await sendRequest(
      `${GET_GROUP_REQUESTS}${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setRequestedCommunities(data)
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
      fetchMyCommunities()
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
      fetchMyCommunities()
      fetchMyCommunities()
    }
  }

  const handleAcceptRequest = () => {
  }

  const handleDeclineRequest = () => {
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  useEffect(() => {
    fetchCommunities()
    fetchMyCommunities()
    fetchMyRequests()
  }, [])

  // useEffect(() => {
  //   fetchCommunities()
  // }, [filter])

  return (
    <PageWrapper>
      {() => (
        <div className="mx-auto pb-20 flex flex-col ">
          <Link to={PATH_NAMES.createCommunity} className="self-end p-4">
            <AddIcon className="inline-block" />
          </Link>
          <div className="flex border-b-2 border-grey-100 mb-4">
            <button
              className={`px-4 py-3 text-sm lg:text-lg basis-1/3 text-center  ${activeTab === COMMUNITY_TABS[0]
                ? "bg-[#5D70F9] text-white"
                : "bg-white text-gray-800 hover:bg-gray-300"
                }`}
              onClick={() => handleTabClick(COMMUNITY_TABS[0])}
            >
              My Communities
            </button>
            <button
              className={`px-4 py-3 text-sm lg:text-lg basis-1/3 text-center  ${activeTab === COMMUNITY_TABS[1]
                ? "bg-[#5D70F9] text-white"
                : "bg-white text-gray-800 hover:bg-gray-300"
                }`}
              onClick={() => {
                handleTabClick(COMMUNITY_TABS[1])
              }}
            >
              Find Community
            </button>
            <button
              className={`flex items-center justify-center px-4 py-3 text-sm lg:text-lg basis-1/3 text-center ${activeTab === COMMUNITY_TABS[2]
                ? "bg-[#5D70F9] text-white"
                : "bg-white text-gray-800 hover:bg-gray-300"
                }`}
              onClick={() => {
                handleTabClick(COMMUNITY_TABS[2])
              }}
            >
              Requests
            </button>
          </div>

          <div className="px-4">
            {activeTab === COMMUNITY_TABS[0] && (
              <div className="flex flex-col items-center">
                {myCommunities?.content?.map(community => (
                  <div
                    key={community.id}
                    className="py-4 flex items-center gap-4 w-full max-w-2xl"
                  >
                    <div className="border-chasescrollBlue border-l-4 rounded-b-full rounded-tl-full">
                      <img
                        src={community.data.imgSrc ? `${CONFIG.RESOURCE_URL}/${community.data.imgSrc}` : `https://ui-avatars.com/api/?background=random&name=${community.data.name}&length=1`}
                        alt={community.name}
                        className="flex-grow w-24 max-w-[96px] h-24 object-cover border-l-4 border-white rounded-b-full rounded-tl-full"
                      />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col gap-3">
                        <Link to={`${PATH_NAMES.community}/${community.id}`} className="font-medium text-lg md:text-2xl">
                          {community.data.name}
                        </Link>
                        <div className="text-sm md:text-base opacity-[50%]">
                          {community.data.description}
                        </div>
                      </div>
                      <button
                        className="text-xs md:text-sm bg-[#5D70F9] hover:bg-blue-700 text-white font-bold px-4 py-2 md:py-[10px] md:px-[42px] rounded-lg"
                        onClick={() => handleLeaveCommunity(community.id, community.creator.userId)}
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === COMMUNITY_TABS[1] && (
              <div className="w-full flex flex-col items-center">
                <div className="text-chasescrollTextGrey w-full max-w-xs flex items-center gap-2 rounded-lg border pl-4 border-chasescrollBlue mb-4">
                  <SearchIcon />
                  <input
                    type="text"
                    className="p-2 outline-none"
                    value={filter}
                    onChange={({ target: { value } }) => setFilter(value)}
                  />
                </div>
                {communities?.content?.map(community => (
                  <div
                    key={community.id}
                    className="py-4 flex items-center gap-4 w-full max-w-2xl border-b border-blue-600 border-opacity-40"
                  >
                    <div className="border-chasescrollBlue border-l-8 rounded-b-full rounded-tl-full">
                      <img
                        src={community.data.imgSrc ? `${CONFIG.RESOURCE_URL}/${community.data.imgSrc}` : `https://ui-avatars.com/api/?background=random&name=${community.data.name}&length=1`}
                        alt={community.name}
                        className="flex-grow w-24 max-w-[96px] h-24 object-cover border-l-4 border-white rounded-b-full rounded-tl-full"
                      />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col gap-3">
                        <Link to={`${PATH_NAMES.community}/${community.id}`} className="font-medium text-lg md:text-2xl">
                          {community.data.name}
                        </Link>
                        <div className="text-sm md:text-base opacity-[50%]">
                          {community.data.description}
                        </div>
                      </div>
                      <button
                        className="text-xs md:text-sm bg-[#5D70F9] hover:bg-blue-700 text-white font-bold px-4 py-2 md:py-[10px] md:px-[42px] rounded-lg"
                        onClick={() => handleJoinCommunity(community.id, community.creator.userId)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}


            {activeTab === COMMUNITY_TABS[2] && (
              <div className="flex justify-center">
                {requestedCommunities?.content?.length < 1 ? (
                  <div className="flex h-[80vh] justify-center items-center">
                    <p className="text-center text-gray-500 text-[20px] md:text-[48px] whitespace-pre-line max-w-xl">
                      You have no requests to join any of your communities
                    </p>
                  </div>
                ) : (
                  <ul>
                    {requestedCommunities?.content?.map(community => (
                      <li
                        key={community?.id}
                        className="py-2 mb-8 flex flex-row-reverse md:items-center border-b"
                      >
                        <div className="order-2 md:order-1">
                          <div className="ml-4 whitespace-pre-line max-w-md md:max-w-3xl flex flex-col gap-4">
                            <Link to={`${PATH_NAMES.community}/${community?.id}`} className="font-medium text-lg md:text-2xl">
                              {community?.data?.name}
                            </Link>
                            <div className="text-sm md:text-base opacity-[50%]">
                              {community?.description}
                            </div>
                            {/* <p className="text-gray-500">
                            {community.members} Members
                          </p> */}
                            <div className="flex items-center">
                              <button
                                className="text-xs md:text-sm bg-[#5D70F9] hover:bg-blue-700 text-white font-bold px-4 py-2 md:py-[10px] md:px-[42px] rounded-lg"
                                onClick={() => handleAcceptRequest(community)}
                              >
                                Accept
                              </button>
                              <button
                                className="hover:scale-50 pl-6"
                                onClick={() => handleDeclineRequest(community)}
                              >
                                <CancelIcon2 className="h-8 w-8" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="order-2 md:order-1">
                          <img
                            src={community.image}
                            alt={community.name}
                            className="flex-grow max-w-[150px] max-h-[110px] object"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrapper >
  )
}

export default Communities
