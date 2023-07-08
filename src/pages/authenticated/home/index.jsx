import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../../hooks/useFetch"
import CONFIG from "@/config"
import PageWrapper from "@/components/PageWrapper"
import Thread from "@/components/home/Thread"
import ThreadMenu from "@/components/home/ThreadMenu"
import { AddIcon, SendIcon } from "@/components/Svgs"
import UploadImage from "@/components/home/UploadImage"
import { useAuth } from "../../../context/authContext"
import {
  CREATE_POST,
  GET_POST_LIST,
} from "../../../constants/endpoints.constant"
import imageIcon from "@/assets/svg/image.svg"
import profilePhoto from "@/assets/images/avatar.png"
import Share from "./Share"
import { toast } from "react-toastify"

const Home = () => {
  const [isThreadMenuOpen, setIsThreadMenuOpen] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showFileUploader, setShowFileUploader] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [menuAction, setMenuAction] = useState(null)
  const [threadId, setThreadId] = useState(null)
  const [userFeedData, setUserFeedData] = useState([])
  const [postFile, setPostFile] = useState()
  const [postInput, setPostInput] = useState("")
  const { sendRequest } = useFetch()
  const { userName, token } = useAuth()
  const threadListRef = useRef(null)

  const navigate = useNavigate()

  const toggleMoreOptions = () => setShowMoreOptions(state => !state)
  const toggleFileUploader = () => setShowFileUploader(state => !state)
  const toggleShare = () => setShowShareModal(state => !state)
  const handleItemClick = (action, route, threadId) => {
    setMenuAction(action)
    setIsThreadMenuOpen(!isThreadMenuOpen)
    setThreadId(threadId)
    navigate(`${route}/${threadId}`)
    console.log({ menuAction, threadId })
  }

  const getUserFeedData = async () => {
    const userFeedData = await sendRequest(GET_POST_LIST, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    if (userFeedData) setUserFeedData(userFeedData?.content)
  }

  useEffect(() => {
    getUserFeedData()
  }, [])

  const createPost = async () => {
    const response = await sendRequest(
      CREATE_POST,
      "POST",
      {
        text: postInput,
        // mediaRef: postFile,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (response) {
      toast.success("Post created Successfully")
    }
  }

  return (
    <PageWrapper toggleFileUploader={toggleFileUploader}>
      {() => (
        <>
          {showMoreOptions && (
            <ThreadMenu
              handleItemClick={handleItemClick}
              showMoreOptions={showMoreOptions}
              toggleMoreOptions={toggleMoreOptions}
              threadId={threadId}
            />
          )}
          {showFileUploader && (
            <UploadImage toggleFileUploader={toggleFileUploader} />
          )}
          {isThreadMenuOpen && (
            userFeedData?.map(post => (
              <ThreadMenu postID={post?.id} key={post?.id} />
            ))
          )}
          {showShareModal && <Share closeShareModal={toggleShare} />}

          <div
            className="flex items-center lg:items-start flex-col gap-10 py-9 px-4 lg:px-28 pb-24 h-full w-full overflow-auto"
            ref={threadListRef}
          >
            <div className="hidden md:flex flex-col gap-2 bg-white text-chasescrollBlue bg-opacity-25 w-full max-w-lg rounded-xl p-3 shadow-md">
              <div className="flex items-center bg-chasescrollPalePurple bg-opacity-30 rounded-xl pl-4">
                <div className="w-8 h-7 rounded-b-full rounded-tr-full border border-chasescrollBlue flex items-center justify-center">
                  <img
                    src={profilePhoto}
                    alt=""
                    className="w-8 h-7 object-cover rounded-b-full rounded-tr-full border border-chasescrollBlue"
                  />
                </div>
                <input
                  type="text"
                  placeholder={`Add your thought ${userName}`}
                  value={postInput}
                  onChange={e => setPostInput(e.target.value)}
                  className="outline-none bg-transparent w-full px-6 py-2.5"
                />
                <button
                  className="w-14 pl-2 pr-6 flex justify-center items-center cursor-pointer border-r border-white"
                  onClick={createPost}
                >
                  <SendIcon />
                </button>
              </div>
              <div
                onClick={toggleFileUploader}
                value={postFile}
                onChange={e => setPostFile(e.target.value)}
                className="flex gap-2 items-center text-chasescrollTextGrey cursor-pointer w-fit text-sm"
              >
                <span className="flex justify-center items-center rounded-r-lg">
                  <img src={imageIcon} className="" alt="" />
                </span>
                Add Photos/Video to your post
              </div>
            </div>
            {userFeedData?.map(post => (
              <Thread
                key={post?.id}
                postID={post?.id}
                text={post?.text}
                user={post?.user}
                time={post?.time}
                image={post?.mediaRef}
                mediaRef={post?.mediaRef}
                multipleMediaRef={post?.multipleMediaRef}
                shareCount={post?.shareCount}
                likeCount={post?.likeCount}
                commentCount={post?.commentCount}
                toggleMoreOptions={toggleMoreOptions}
                toggleShare={toggleShare}
                setThreadId={setThreadId}
                likeStatus={post?.likeStatus}
                type={post?.type}
              />
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  )
}

export default Home
