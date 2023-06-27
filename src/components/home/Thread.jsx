import { useState, useEffect, forwardRef } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
  CommentsIcon,
  EmptyHeartIcon,
  FilledHeartIcon,
  HollowEllipsisIcon,
  UploadIcon,
} from "../Svgs"
import { formatNumberWithK } from "@/utils/helpers"
import { PATH_NAMES } from "@/constants"
import ProfilePhoto from "../ProfilePhoto"

import {
  GET_ALL_POST_COMMENTS,
  LIKE_POST,
  SHARE_POST,
} from "../../constants/endpoints.constant"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import CONFIG from "../../config"
import Share from "../../pages/authenticated/home/Share"
import BlurredImage from "../BlurredImage"
import { formatTimeAgo } from "../../utils/helpers"
import { COMPANY_NAME } from "../../constants"
import VideoPlayer from "../VideoPlayer"
import PhotoGallery from "../PhotoGallery"

const Thread = forwardRef(({
  text,
  time,
  commentCount,
  shareCount,
  likeCount,
  postID,
  mediaRef,
  multipleMediaRef,
  setThreadId,
  toggleMoreOptions,
  toggleShare,
  user,
  likeStatus,
  type,
}, ref) => {
  const [isLiked, setIsLiked] = useState(likeStatus === "LIKED")
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
  const { token, userId } = useAuth()
  const { sendRequest } = useFetch()

  const toggleLike = async () => {
    const response = await sendRequest(`${LIKE_POST}/${postID}`, "POST", null, {
      Authorization: `Bearer ${token}`,
    })
    if (response) {
      setIsLiked(response?.likeStatus === "LIKED")
      setNumOfLikes(response?.likeCount)
    }
  }

  return (
    <div ref={ref} id={postID} className="flex flex-col gap-4 justify-between p-5 w-full max-w-lg border border-opacity-50 border-gray-200 rounded-tl-[32px] rounded-b-[32px] shadow-xl h-fit bg-white">
      <div className="flex justify-between items-stretch text-black">
        <Link
          className="flex gap-2 items-center"
          to={`${PATH_NAMES.profile}/${userId}`}
        >
          <ProfilePhoto image={user.data.imgMain.value ? `${CONFIG.RESOURCE_URL}/${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.data?.firstName}&length=1`} />
          <div className="flex flex-col capitalize">
            <small>{user.firstName} {user.lastName}</small>
            <div className="flex flex-col">
              <small>{user?.data?.city?.value ?? COMPANY_NAME}, {user?.data?.country?.value}</small>
              <small className="text-[10px] opacity-60">{formatTimeAgo(time?.millis)}</small>
            </div>
          </div>
        </Link>
        <span
          className="cursor-pointer flex pt-4 text-chasescrollBlue"
          onClick={() => {
            toggleMoreOptions()
            setThreadId(postID)
          }}
        >
          <HollowEllipsisIcon />
        </span>
      </div>
      <div
        className={`leading-5
          ${!mediaRef ? "text-chasescrollTextGrey" : "text-chasescrollBlue font-bold"}
        `}
      >
        {text}
      </div>
      <div className="flex flex-col gap-3">
        {type === "WITH_IMAGE" && multipleMediaRef?.length > 1 && (
          <div onDoubleClick={() => toggleLike(postID)}>
            <PhotoGallery images={multipleMediaRef} />
          </div>
        )}
        {type === "WITH_IMAGE" && multipleMediaRef?.length < 2 && (
          <div onDoubleClick={() => toggleLike(postID)}>
            <BlurredImage imageUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
          </div>
        )}
        {type === "WITH_VIDEO_POST" && (
          <VideoPlayer videoUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
        )}
        <div className="flex justify-between">
          <div className="basis-1/3 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-chasescrollTextGrey">
              <div
                className="cursor-pointer transition-all"
                onClick={() => toggleLike(postID)}
              >
                {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
              </div>
              <span className="text-xs text-chasescrollTextGrey">
                {formatNumberWithK(numOfLikes)}{" "}
                like{numOfLikes > 1 || numOfLikes === 0 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="basis-1/3 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-chasescrollTextGrey">
              <CommentsIcon />
              <Link
                to={`${PATH_NAMES.comments}/${postID}`}
                className="text-xs"
              >
                {formatNumberWithK(commentCount)} comments
              </Link>
            </div>
          </div>
          <div className="basis-1/3 flex items-center justify-center">
            <div
              className="flex flex-col items-center justify-center text-chasescrollTextGrey"
              onClick={toggleShare}
            >
              <UploadIcon />
              <span className="cursor-pointer text-xs text-chasescrollTextGrey">
                {formatNumberWithK(shareCount)} shares
              </span>
            </div>
          </div>
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
  mediaRef: PropTypes.string,
  setThreadId: PropTypes.string,
  user: PropTypes.object,
  likeStatus: PropTypes.bool
}

export default Thread
