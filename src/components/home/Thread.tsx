import { useState, forwardRef } from "react"
import { Link } from "react-router-dom"
import {
  CommentsIcon,
  EmptyHeartIcon,
  FilledHeartIcon,
  HollowEllipsisIcon,
} from "../Svgs"
import { formatNumberWithK } from "../../utils/helpers"
import { PATH_NAMES } from "../../constants/paths.constant"
import ProfilePhoto from "../ProfilePhoto"

import {
  GET_POST,
  LIKE_POST,
} from "../../constants/endpoints.constant"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import CONFIG from "../../config"
import BlurredImage from "../BlurredImage"
import { formatTimeAgo } from "../../utils/helpers"
import { COMPANY_NAME } from "../../constants"
import VideoPlayer from "../VideoPlayer"
import PhotoGallery from "../PhotoGallery"
import { Avatar, Spinner } from '@chakra-ui/react'
import { IMediaContent } from "../../models/MediaPost"
import { useMutation, useQuery, useQueryClient } from "react-query"
import httpService from "../../utils/httpService"
import { toast } from "react-toastify"

interface IProps {
  setThreadId: (id: string) => void;
  toggleMoreOptions: () => void;
  toggleShare: () => void;
  setPostId: (id: string) => void;
  setPostMakeId: (id: string) => void;
  post: IMediaContent
}

const Thread = forwardRef<any, IProps>
(({
  post: postData,
  setThreadId,
  toggleMoreOptions,
  setPostId,
  setPostMakeId,
}, ref) => {
  console.log(postData);
  const [post, setPost] = useState<any>(postData);
  const [isLiked, setIsLiked] = useState(postData?.likeStatus === "LIKED");
  const [numOfLikes, setNumOfLikes] = useState(postData?.likeCount);
  const [showMore, setShowMore] = useState(false)
  const { token, userId } = useAuth()
  const { sendRequest } = useFetch()
  const queryClient = useQueryClient();

  const { user, text, time, type, multipleMediaRef, mediaRef, id: postID, commentCount } = postData;

  const getPost = useQuery([`getPost-${postData.id}`, postData.id], () => httpService.get(`${GET_POST}/${postData.id}`), {
    onSuccess:  (data) => {
      //setPost(data.data);
    }
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: () => httpService.post(`${LIKE_POST}/${postData.id}`),
    onSuccess: (data) => {
      // console.log(data.data);
      // queryClient.invalidateQueries(['getFeedsPosts']);
      // queryClient.refetchQueries(['getFeedsPosts']);
      //setPost(data.data);
      setIsLiked(data.data.likeStatus === 'LIKED');
      setNumOfLikes(data.data.likeCount);
    },  
    onError: (data) => {
      toast.error('An error occured');
    },
  })

  const toggleLike = async () => {
    mutate();
  }  

  if (!ref) {
    return (
      <div id={postData.id} className="flex bg-white flex-col gap-4 justify-between p-5 w-full border border-opacity-50 border-gray-200 rounded-tl-[32px] rounded-b-[32px] shadow-xl h-fit  ">
        <div className="flex justify-between items-stretch text-black lg:w-full sm:w-full">
          <Link
            className="flex gap-2 items-center"
            to={`${PATH_NAMES.profile}/${userId}`}
          >
            { postData.user.data.imgMain?.value && (
              <ProfilePhoto image={postData.user.data.imgMain?.value ? `${CONFIG.RESOURCE_URL}/${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.firstName}&length=1`} />
            )}
            {
              !user?.data?.imgMain?.value && (
                <Avatar 
                  name={`${user?.firstName} ${user?.lastName}`}
                  size='md'
                />
              )
            }
            <div className="flex flex-col capitalize">
              <small>{user?.firstName} {user?.lastName}</small>
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
              setThreadId(postData.id);
              setPostId(postData.id);
              setPostMakeId(user.userId)
              console.log(`${postData.id} this is the post id`)
            }}
          >
            <HollowEllipsisIcon />
          </span>
        </div>
        <div
          className='text-md font-normal'
        >
          { text && text.length < 100 && (
            <span>{text}</span>
          )}
          {text && showMore && (
            <span>{ text } <span onClick={() => setShowMore(!showMore)} className="text-chasescrollBlue cursor-pointer">Show Less</span></span>
          )}
          {text && !showMore && text.length > 100 && (
            <span>{text.substring(0, 100)}... <span onClick={() => setShowMore(!showMore)} className="text-chasescrollBlue cursor-pointer">Show More</span></span>
          )}
        </div>
        <div className="flex flex-col gap-3"> 
          {type === "WITH_IMAGE" && multipleMediaRef?.length > 1 && (
            <div onDoubleClick={() => toggleLike()}>
              <PhotoGallery images={multipleMediaRef} />
            </div>
          )}
          {!multipleMediaRef && (
            <>
              {type === "WITH_IMAGE" && (
                <div onDoubleClick={() => toggleLike()}>
                  <BlurredImage imageUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
                </div>
              )}
            </>
          )}
          {multipleMediaRef && (
            <>
              {type === "WITH_IMAGE" && multipleMediaRef?.length <= 1 && (
                <div onDoubleClick={() => toggleLike()}>
                  <BlurredImage imageUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
                </div>
              )}
            </>
          )} 
          {type === "WITH_VIDEO_POST" && (
            <VideoPlayer videoUrl={mediaRef.startsWith('https') ? mediaRef: `${CONFIG.RESOURCE_URL}/${mediaRef}`} />
          )}
          <div className="flex justify-between ">
            <div className="basis-1/3 flex items-center justify-center">
            {
            !isLoading && (
              <div className="flex flex-col items-center justify-center text-chasescrollTextGrey">
              <div
                className="cursor-pointer transition-all"
                onClick={() => toggleLike()}
              >
                {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
              </div>
              <span className="text-xs text-chasescrollTextGrey">
                {formatNumberWithK(numOfLikes)}{" "}
                like{numOfLikes > 1 || numOfLikes === 0 ? "s" : ""}
              </span>
            </div>
            )
          }
          {
            isLoading && (
              <Spinner />
            )
          }
            </div>
            <div className="basis-1/3 flex items-center justify-center">
              <Link
                to={`${PATH_NAMES.comments}/${postID}`}
                className="text-xs"
              >
                <div className="flex flex-col items-center justify-center text-chasescrollTextGrey">
                  <CommentsIcon />
                    {formatNumberWithK(commentCount)} comments
                </div>
              </Link>
            </div>
            {/* <div className="basis-1/3 flex items-center justify-center">
              <div
                className="flex flex-col items-center justify-center text-chasescrollTextGrey"
                onClick={toggleShare}
              >
                <UploadIcon />
                <span className="cursor-pointer text-xs text-chasescrollTextGrey">
                  {formatNumberWithK(shareCount)} shares
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} id={postID} className="flex flex-col gap-4 justify-between p-5 w-full border border-opacity-50 border-gray-200 rounded-tl-[32px] rounded-b-[32px] shadow-xl h-fit bg-white ">
      <div className="flex justify-between items-stretch text-black lg:w-5/6 sm:w-full">
        <Link
          className="flex gap-2 items-center"
          to={`${PATH_NAMES.profile}/${userId}`}
        >
          <ProfilePhoto image={user?.data?.imgMain?.value ? `${CONFIG.RESOURCE_URL}/${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.firstName}&length=1`} />
          <div className="flex flex-col capitalize">
            <small>{user?.firstName} {user?.lastName}</small>
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
        className='text-md font-normal'
      >
        {text}
      </div>
      <div className="flex flex-col gap-3">
        {type === "WITH_IMAGE" && multipleMediaRef?.length > 1 && (
          <div onDoubleClick={() => toggleLike()}>
            <PhotoGallery images={multipleMediaRef} />
          </div>
        )}
        {!multipleMediaRef && (
          <>
            {type === "WITH_IMAGE" && (
              <div onDoubleClick={() => toggleLike()}>
                <BlurredImage imageUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
              </div>
            )}
          </>
        )}
        {multipleMediaRef && (
          <>
            {type === "WITH_IMAGE" && multipleMediaRef?.length <= 1 && (
              <div onDoubleClick={() => toggleLike()}>
                <BlurredImage imageUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
              </div>
            )}
          </>
        )}
        {type === "WITH_VIDEO_POST" && (
          <VideoPlayer videoUrl={`${CONFIG.RESOURCE_URL}/${mediaRef}`} />
        )}
        <div className="flex justify-between">
          <div className="basis-1/3 flex items-center justify-center">
          {
            !isLoading && (
              <div className="flex flex-col items-center justify-center text-chasescrollTextGrey">
              <div
                className="cursor-pointer transition-all"
                onClick={() => toggleLike()}
              >
                {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
              </div>
              <span className="text-xs text-chasescrollTextGrey">
                {formatNumberWithK(numOfLikes)}{" "}
                like{numOfLikes > 1 || numOfLikes === 0 ? "s" : ""}
              </span>
            </div>
            )
          }
          {
            isLoading && (
              <Spinner />
            )
          }
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
          {/* <div className="basis-1/3 flex items-center justify-center">
            <div
              className="flex flex-col items-center justify-center text-chasescrollTextGrey"
              onClick={toggleShare}
            >
              <UploadIcon />
              <span className="cursor-pointer text-xs text-chasescrollTextGrey">
                {formatNumberWithK(shareCount)} shares
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
})

export default Thread
