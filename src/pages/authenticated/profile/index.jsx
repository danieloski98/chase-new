import React, { useEffect, useState } from "react"
import PageWrapper from "@/components/PageWrapper"
import banner from "@/assets/images/concert.jpeg"
import CONFIG from "@/config"
import { MoreSquare } from "@/components/Svgs"
import { SettingsOptionPopup } from "./modals/SettingsPopup"
import Posts from "./Posts"
import MyNetwork from "./MyNetwork"
import SecondaryEvents from "./SecondaryEvents"
import SecondaryCommunity from "./SecondaryCommunity"
import SecondaryNavbar from "./SecondaryNavbar"
import { PATH_NAMES } from "../../../constants"
import { Link, useParams } from "react-router-dom"
import { SecondMenuIcon } from "../../../components/Svgs"
import { useFetch } from "../../../hooks/useFetch"
import { GET_FRIEND_REQUESTS, GET_JOINED_EVENTS, GET_JOINED_GROUPS, GET_USER_CONNECTION_LIST, GET_USER_MEDIA_POSTS, GET_USER_PRIVATE_PROFILE, REMOVE_FRIEND, SEND_FRIEND_REQUEST } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"

const Profile_1 = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [profile, setProfile] = useState({})
  const [displayConnect, setDisplayConnect] = useState(true)
  const [posts, setPosts] = useState([])
  const [network, setNetwork] = useState([])
  const [ownNetwork, setOwnNetwork] = useState([])
  const [events, setEvents] = useState([])
  const [communities, setCommunities] = useState([])
  const [activeComponent, setActiveComponent] = useState("component1")

  const { userId } = useParams()

  const { sendRequest } = useFetch()
  const { token, userId: currentUserId } = useAuth()

  const self = userId === currentUserId

  const fetchProfileInfo = async () => {
    const data = await sendRequest(
      GET_USER_PRIVATE_PROFILE,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setProfile(data)
  }

  const fetchPosts = async () => {
    const data = await sendRequest(
      `${GET_USER_MEDIA_POSTS}?userID=${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setPosts(data)
  }

  const fetchOwnNetwork = async () => {
    if (userId) {
      const data = await sendRequest(
        `${GET_USER_CONNECTION_LIST}${currentUserId}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      )
      if (data) setOwnNetwork(data)
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

  const fetchEvents = async () => {
    const data = await sendRequest(
      `${GET_JOINED_EVENTS}${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setEvents(data)
  }

  const fetchCommunities = async () => {
    const data = await sendRequest(
      `${GET_JOINED_GROUPS}?userID=${userId}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setCommunities(data)
  }

  const friendPerson = async (userId) => {
    const data = await sendRequest(
      `${SEND_FRIEND_REQUEST}${userId}`,
      "POST",
      { toUserID: userId },
      { Authorization: `Bearer ${token}` }
    )
    if (data) {
      toast.success(data.message);
      fetchNetwork()
    }
  }

  const unfriendPerson = async (userId) => {
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
  }

  useEffect(() => {
    fetchProfileInfo()
    fetchPosts()
    fetchNetwork()
    fetchOwnNetwork()
    fetchEvents()
    fetchCommunities()
  }, [])

  useEffect(() => {
    if (ownNetwork) {
      const isMyFriend = ownNetwork.some(connect => connect.userId === userId)

      if (isMyFriend) setDisplayConnect(false)
      else setDisplayConnect(true)
    }
  }, [network])

  console.log(displayConnect)

  const handleButtonClick = componentName => {
    if (
      componentName.type === "component1" ||
      componentName.type === "component2" ||
      componentName.type === "component3" ||
      componentName.type === "component4"
    ) {
      setActiveComponent(componentName.type)
    }
  }

  let componentToRender

  switch (activeComponent) {
    case "component1":
      componentToRender = <Posts posts={posts?.content} />
      break
    case "component2":
      componentToRender = (
        <MyNetwork
          network={network}
          fetchNetwork={fetchNetwork}
          self={self}
          friendPerson={friendPerson}
          unfriendPerson={unfriendPerson}
        />
      )
      break
    case "component3":
      componentToRender = <SecondaryEvents events={events} />
      break
    case "component4":
      componentToRender = <SecondaryCommunity communities={communities} />
      break
    default:
      componentToRender = <Posts posts={posts} />
  }

  const handleShowOptions = () => {
    setShowOptions(state => !state)
  }

  return (
    <PageWrapper>
      {() => (
        <>
          <div>
            <section className="flex flex-col mb-5 pb-6 w-full text-chasescrollBlue border-b-2 border-b-gray-200 h-fit">
              <div className="grid place-items-center relative">
                <div className="h-96 w-full relative">
                  <img
                    src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
                    alt="user cover background"
                    className="w-full h-full object-cover"
                  />
                  <div className="backdrop-blur-md absolute inset-0 flex justify-start items-end pb-40 md:pb-32 px-4">
                    <img
                      src={`${CONFIG.RESOURCE_URL}${profile?.data?.imgMain?.value}`}
                      alt="user profile photo"
                      className="border-2 border-white w-40 h-40 rounded-b-full rounded-tl-full shadow-md object-cover"
                    />
                  </div>
                </div>
                <div className="absolute flex justify-between top-6 left-0 right-0 px-4 w-full">
                  <div className="text-white"></div>
                  <div
                    onClick={handleShowOptions}
                    className="cursor-pointer hover:bg-white hover:bg-opacity-70"
                  >
                    <SecondMenuIcon />
                  </div>
                </div>

                <div className="px-4 py-4 md:py-6 absolute flex flex-col gap-4 md:flex-row justify-center md:justify-between w-full bg-black bg-opacity-50 font-bold bottom-0">
                  <div className="text-white self-start flex flex-col">
                    <h2 className="capitalize">{profile?.firstName} {profile?.lastName}</h2>
                    <small>@{profile?.username}</small>
                    <small>{profile?.email}</small>
                  </div>
                  {!self && (
                    <div className="flex items-center gap-4 justify-center text-sm md:text-base">
                      {displayConnect ? (
                        <button
                          className="w-40 bg-chasescrollBlue text-white px-3 md:px-4 py-3 rounded-md"
                          onClick={friendPerson}
                        >
                          Connect
                        </button>
                      ) : (
                        <button
                          className="w-40 bg-chasescrollBlue text-white px-3 md:px-4 py-3 rounded-md"
                          onClick={unfriendPerson}
                        >
                          Disconnect
                        </button>
                      )}
                      <Link
                        to={`${PATH_NAMES.message}/${userId}`}
                        className="w-40 bg-white text-blue-500 px-4 py-3 rounded-md text-center"
                      >
                        Chat
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <SecondaryNavbar
                activeComponent={activeComponent}
                handleButtonClick={handleButtonClick}
                networkCount={network.length}
                postCount={posts?.content?.length}
                eventCount={events?.content?.length}
                communityCount={communities?.content?.length}
              />
            </section>
            <div className="px-2">
              {componentToRender}
            </div>
          </div>
          {showOptions && (
            <SettingsOptionPopup handleShowOptions={handleShowOptions} />
          )}
        </>
      )}
    </PageWrapper>
  )
}

export default Profile_1