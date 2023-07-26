import React, { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import OverlayWrapper from "@/components/OverlayWrapper"
import { CLOSE_ENTITY } from "@/constants"
import ProfilePhoto from "@/components/ProfilePhoto"
import { GET_USER_CONNECTION_LIST, SHARE_POST } from "../../../constants/endpoints.constant"
import ButtonSpinner from "../../../components/ButtonSpinners"
import CONFIG from "../../../config"
import { toast } from "react-toastify"
import { Avatar } from '@chakra-ui/react'

const Share = ({ closeShareModal }) => {
  const [searchText, setSearchText] = useState("")
  const [shareWith, setShareWith] = useState([])
  const [userFriendsList, setUserFriendsList] = useState([])
  const { sendRequest, isLoading } = useFetch()
  const { token, userId } = useAuth()

  const handleChange = ({ target: { value } }) => {
    setSearchText(value)
  }

  const updateShareList = (id) => {
    setShareWith((prevShareWith) => {
      const index = prevShareWith.indexOf(id);

      if (index !== -1) {
        return prevShareWith.filter((item) => item !== id);
      } else {
        return [...prevShareWith, id];
      }
    });
  };

  const getUserFriendsList = async () => {
    const response = await sendRequest(
      `${GET_USER_CONNECTION_LIST}${userId}${searchText ? `?searchText=${searchText}` : ''}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (response) {
      setUserFriendsList(response)
    }
  }

  const sharePost = async () => {
    const response = await sendRequest(
      SHARE_POST,
      "POST",
      {
        publicPost: true,
        postType: "public",
        shareID: userId,
        shareWith
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (response) {
      toast.success("Post shared successfully!")
      closeShareModal()
    }
  }

  useEffect(() => {
    getUserFriendsList()
  }, [searchText])

  return (
    <OverlayWrapper handleClose={closeShareModal}>
      <div className="relative flex flex-col mx-4 gap-3 px-6 border border-opacity-10 bg-white shadow-lg pt-8 pb-6 w-full max-w-xl rounded-lg h-96">
        <div className="bg-white absolute rounded-t-lg flex flex-col gap-2 px-6 py-2 top-0 left-0 w-full">
          <div className="w-full flex items-stretch">
            <div className="basis-1/4 py-1.5 flex justify-start items-center">
              <span
                className="cursor-pointer px-2 -ml-2"
                onClick={closeShareModal}
              >
                {CLOSE_ENTITY}
              </span>
            </div>
            <div className="basis-2/4 py-3 flex justify-center font-bold">
              Share with friends
            </div>
            <div className="basis-1/4 py-3 flex items-center justify-end font-bold text-xs text-chasescrollBlue">
              <span className="cursor-pointer" onClick={sharePost}>Share</span>
            </div>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="Search by username"
            className="outline-none w-full border border-chasescrollPurple border-opacity-30 rounded-md px-6 py-2 text-sm"
          />
        </div>

        <div className="mt-20 flex flex-col gap-2 overflow-auto pr-2 h-full">
          {!isLoading ? userFriendsList?.map((friend) => (
            <div
              key={friend?.userId}
              className="flex items-center justify-between rounded-lg bg-transparent px-2 py-1.5 hover:bg-[#f2f2f2]"
            >
              <div className="flex items-center gap-3">
                { friend.data.imgMain.value && (
                  <ProfilePhoto image={`${CONFIG.RESOURCE_URL}${friend?.data?.imgMain?.value}`} />
                )}
                { !friend.data.imgMain.value && (
                  <Avatar 
                    name={`${friend?.firstName} ${friend?.lastName}`}
                    size='md'
                  />
                )}
                {/* <ProfilePhoto image={`${CONFIG.RESOURCE_URL}${friend?.data?.imgMain?.value}`} /> */}
                <div className="flex flex-col justify-between">
                  <p className="font-bold text-sm">{friend?.firstName} {friend?.lastName}</p>
                  <p className="text-chasescrollTextGrey text-[10px]">
                    @{friend?.username}
                  </p>
                </div>
              </div>
              <button
                className="py-2 px-4 rounded-md text-chasescrollDarkBlue bg-chasescrollPalePurple text-xs"
                onClick={() => updateShareList(friend?.userId)}
              >
                {shareWith.includes(friend?.userId) ? 'Remove' : 'Add'}
              </button>
            </div>
          )) : (
            <div className="flex items-center justify-center h-full w-full">
              <ButtonSpinner />
            </div>
          )}
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default Share
