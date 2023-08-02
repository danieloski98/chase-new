import { useState } from "react"
import PropTypes from "prop-types"
import ProfilePhoto from "../ProfilePhoto"
import avatar from "@/assets/images/avatar.png"
import { EmptyHeartIcon, FilledHeartIcon } from "../Svgs"
import { formatNumberWithK } from "@/utils/helpers"
import { formatComment, formatTimeAgo } from "../../utils/helpers"
import { LIKE_FEED_COMMENT } from "../../constants/endpoints.constant"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "../../constants/paths.constant"
import PageWrapper from "../PageWrapper"

const Comment = ({ comment, time, likeCount, likeStatus, id, replyPerson, user }) => {
  const [isLiked, setIsLiked] = useState(likeStatus === "LIKED")
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
  const { token } = useAuth()
  const { sendRequest } = useFetch()

  const toggleLike = async () => {
    const response = await sendRequest(`${LIKE_FEED_COMMENT}/${id}`, "POST", null, {
      Authorization: `Bearer ${token}`,
    })
    if (response) {
      setIsLiked(response?.likeStatus === "LIKED")
      setNumOfLikes(response?.likeCount)
    }
  }

  return (
    <div>
        <div className="flex gap-3 w-full">
        <ProfilePhoto image={avatar} />
        <div className="flex flex-col w-full">
          <div className="w-full text-sm">
            {comment}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4 text-[10px] items-center">
              <span>{formatTimeAgo(time?.millis)}</span>
              <span>{formatNumberWithK(numOfLikes)} like{numOfLikes > 1 || numOfLikes === 0 ? "s" : ""}</span>
              <span
                className="text-chasescrollPurple cursor-pointer"
                onClick={() => replyPerson(user?.username)}
              >
                Reply
              </span>
            </div>
            <div className="cursor-pointer" onClick={() => toggleLike(id)}>
              {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
  likes: PropTypes.number,
  liked: PropTypes.bool,
  replyPerson: PropTypes.func,
  user: PropTypes.object,
}

export default Comment
