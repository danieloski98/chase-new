import { useState, useEffect, forwardRef } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
  CommentsIcon,
  EmptyHeartIcon,
  FilledHeartIcon,
  HollowEllipsisIcon,
  ShareIcon2,
  UploadIcon,
} from "../Svgs"
import { formatNumberWithK } from "@/utils/helpers"
import { PATH_NAMES } from "@/constants/paths.constant"
import ProfilePhoto from "../ProfilePhoto"

import {
  ADD_POST_COMMENT,
  ADD_POST_SUB_COMMENT,
  GET_ALL_POST_COMMENTS,
  GET_ALL_POST_SUB_COMMENTS,
  LIKE_POST,
  SHARE_POST,
} from "../../constants/endpoints.constant"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import CONFIG from "../../config"
import Share from "../../pages/authenticated/home/Share"
import BlurredImage from "../BlurredImage"
import { formatTime, formatTimeAgo } from "../../utils/helpers"
import { COMPANY_NAME } from "../../constants"
import ThreadComment from "./ThreadComment"

const Thread = forwardRef(({
  text,
  time,
  commentCount,
  shareCount,
  likeCount,
  postID,
  setThreadId,
  toggleMoreOptions,
  toggleShare,
  likeStatus,
  user,
  image,
  caption,
}, ref) => {
  const [isLiked, setIsLiked] = useState(likeStatus === "LIKED")
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
  const [commentInput, setCommentInput] = useState("")
  const [userComments, setUserComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [isMe, setIsMe] = useState(false)
  const { token, userId } = useAuth()
  const { sendRequest } = useFetch()

  const getUserComments = async () => {
    const response = await sendRequest(
      `${GET_ALL_POST_COMMENTS}?postID=${postID}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (response) setUserComments(response?.content)
  }

  const addComment = async (event) => {
    if (event.key === 'Enter') {
      const response = await sendRequest(
        ADD_POST_COMMENT,
        "POST",
        { postID: postID, comment: commentInput },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      if (response) {
        setCommentInput("")
        getUserComments()
      }
    }
  }

  const toggleComments = () => {
    if (!showComments) {
      getUserComments()
      setShowComments(state => !state)
    } else {
      setShowComments(state => !state)
    }
  }



  useEffect(() => {
    setIsMe(user.id === userId || user.userId === userId)
  }, [])

  const likePost = async () => {
    const response = await sendRequest(`${LIKE_POST}/${postID}`, "POST", null, {
      Authorization: `Bearer ${token}`,
    })
    if (response) {
      setIsLiked(response?.likeStatus === "LIKED")
      setNumOfLikes(response?.likeCount)
    }
  }

  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-2 items-start">
        <ProfilePhoto image={user?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.otherUser?.firstName}&length=1`} />
        <div className="flex flex-col gap-4 items-end w-80">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 rounded-t-xl rounded-bl-xl shadow-md border border-gray-200 bg-white p-2">
              <p className="text-xs text-chasescrollButtonBlue">~ {user?.username}</p>
              {image && <img src={image} alt="" className="rounded-t-xl rounded-bl-xl" />}
              <p className="text-xs">{caption}</p>
              <small className="text-[10px] text-chasescrollGrey self-end">
                {formatTime(new Date(time))}
              </small>
            </div>
            <div className="flex justify-between">
              <div className="bg-white flex gap-2 items-center p-1 rounded-t-full rounded-bl-full shadow-md text-[10px] w-36">
                <img
                  src={user?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.otherUser?.firstName}&length=1`}
                  className="border border-chasescrollButtonBlue rounded-t-full rounded-bl-full w-4 h-4"
                  alt=""
                />
                <input
                  placeholder="Add comment..."
                  value={commentInput}
                  onChange={({ target: { value } }) => setCommentInput(value)}
                  className="outline-none h-4 w-full rounded-tr-full"
                  onKeyDown={addComment}
                />
              </div>
              <div className="flex items-center gap-2">
                <div onClick={likePost} className="cursor-pointer relative">
                  {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
                </div>
                <div
                  className="cursor-pointer relative"
                  onClick={toggleComments}
                >
                  <CommentsIcon />
                </div>
                <div onClick={toggleShare} className="cursor-pointer relative">
                  <ShareIcon2 />
                </div>
              </div>
            </div>
          </div>
          {showComments && (
            <div className="w-72 flex flex-col gap-4">
              {userComments?.map(comment => (
                <ThreadComment
                  key={comment?.id}
                  comment={comment}
                  getUserComments={getUserComments}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

Thread.propTypes = {
  toggleMoreOptions: PropTypes.func,
  text: PropTypes.string,
  time: PropTypes.string,
  commentCount: PropTypes.string,
  shareCount: PropTypes.string,
  likeCount: PropTypes.string,
  postID: PropTypes.string,
  image: PropTypes.string,
  setThreadId: PropTypes.string,
  user: PropTypes.object,
  likeStatus: PropTypes.bool
}

export default Thread
