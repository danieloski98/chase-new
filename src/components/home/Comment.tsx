import { useState } from "react"
import PropTypes from "prop-types"
import ProfilePhoto from "../ProfilePhoto"
import avatar from "@/assets/images/avatar.png"
import { EmptyHeartIcon, FilledHeartIcon } from "../Svgs"
import { formatNumberWithK } from "../../utils/helpers"
import { formatComment, formatTimeAgo } from "../../utils/helpers"
import { LIKE_FEED_COMMENT } from "../../constants/endpoints.constant"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../context/authContext"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "../../constants/paths.constant"
import PageWrapper from "../PageWrapper"
import { IComment, Subcomment } from "../../models/Comment"
import CONFIG from "../../config"
import { Avatar, Input, Spinner } from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import httpService from "../../utils/httpService"
import { toast } from "react-toastify"

interface IProps {
  replyPerson: (username: string) => void
}

const Comment = ({ comment, time, likeCount, id, user, replyPerson }: IComment & IProps) => {
  const [isLiked, setIsLiked] = useState(likeCount > 0)
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
  const [show, setShow] = useState(false);
  const  [value, setValue] = useState(`@${user.username} `);
  const [subcomments, setSubcomment] = useState<Array<Subcomment>>([]);
  const { token } = useAuth()
  const { sendRequest } = useFetch();

  const queryClient = useQueryClient(); 


  const { isLoading: subLoading,} = useQuery(['getSubcomment'], () => httpService.get(`/feed/get-all-sub-comments?commentID=${id}`), {
    onSuccess: (data) => {
      console.log(data.data.content);
      setSubcomment(data.data.content);
    }
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () => httpService.post(`/feed/add-sub-comment/`, { commentID: id, comment: value }),
    onSuccess: () => {
      queryClient.invalidateQueries(['getSubcomment']);
      toast.success('Comment saved');
      setShow(false);
    }
  });

  const toggleLike = async (id: string) => {
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
        {user.data.imgMain.value && <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${user.data.imgMain.value}`} />}
        { !user.data.imgMain.value && <Avatar name={`${user.firstName} ${user.lastName}`} />}
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
                onClick={() => setShow(prev => !prev)}
              >
                Reply
              </span>
            </div>
            <div className="cursor-pointer" onClick={() => toggleLike(id)}>
              {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
            </div>
          </div>

          { show && (
            <div className="flex mt-4">
              <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  mutate();
                }
              }} width='200px' height='40px' borderRadius='10px' bg='white' />
              { isLoading && <Spinner /> }
            </div>
          )}

          {
            !subLoading && subcomments.length > 0 && (
              <div className="ml-4">
                {subcomments.map((comment, i) => (
                  <SubComment
                    key={i}
                    {...comment}
                  />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

function SubComment({ user, comment, commentID, likeCount, time }: Subcomment) {
  const [isLiked, setIsLiked] = useState(likeCount > 0)
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
 

  const queryClient = useQueryClient(); 

  const { isLoading, mutate } = useMutation({
    mutationFn: () => httpService.post(`/feed/like-sub-comments/${commentID}`),
    onSuccess: () => {
      toast.success('liked');
      queryClient.invalidateQueries(['getSubcomment']);
    }
  });

  return (
    <div className="mt-4">
    <div className="flex gap-3 w-full">
    {user.data.imgMain.value && <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${user.data.imgMain.value}`} />}
    { !user.data.imgMain.value && <Avatar name={`${user.firstName} ${user.lastName}`} />}
    <div className="flex flex-col w-full">
      <div className="w-full text-sm">
        {comment}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4 text-[10px] items-center">
          <span>{formatTimeAgo(time?.millis)}</span>
          <span>{formatNumberWithK(numOfLikes)} like{numOfLikes > 1 || numOfLikes === 0 ? "s" : ""}</span>
          {/* <span
            className="text-chasescrollPurple cursor-pointer"
          >
            Reply
          </span> */}
        </div>
        <div className="cursor-pointer" onClick={() => mutate()}>
          { !isLoading && isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
          { isLoading && <Spinner color='brand.chasescrollBlue' />}
        </div>
      </div>

    </div>
  </div>
</div>
  )
}

export default Comment
