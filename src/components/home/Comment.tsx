import { useState, useCallback } from "react"
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
import { Avatar, HStack, Heading, Input, Spinner, Text } from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import httpService from "../../utils/httpService"
import { toast } from "react-toastify"
import { FiTrash } from 'react-icons/fi'


interface IProps {
  replyPerson: (username: string) => void
}

const Comment = ({ comment, time, likeCount, id, user, replyPerson }: IComment & IProps) => {
  const [isLiked, setIsLiked] = useState(likeCount > 0)
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
  const [show, setShow] = useState(false);
  const  [value, setValue] = useState(`@${user.username} `);
  const [subcomments, setSubcomment] = useState<Array<Subcomment>>([]);
  const [showR, setShowR] = useState(false);
  const { token, userId } = useAuth()
  const { sendRequest } = useFetch(); 

  const queryClient = useQueryClient(); 


  const { isLoading: subLoading,} = useQuery(['getSubcomment', id], () => httpService.get(`/feed/get-all-sub-comments?commentID=${id}`), {
    onSuccess: (data) => { 
      setSubcomment(data?.data?.content);
    }
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () => httpService.post(`/feed/add-sub-comment/`, { commentID: id, comment: value }),
    onSuccess: () => {
      queryClient.invalidateQueries(['getSubcomment']);
      toast.success('Comment saved');
      setShow(false);
      setValue(`@${user.username} `)
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

  const deleteComments = async (id: any) => {
    // setLoading(userId)
    const data = await sendRequest(
        "/feed/remove-comment/"+id,
        "DELETE",
        null,
        { Authorization: `Bearer ${token}` }
    ) 
    toast.success("comment has been deleted"); 
    queryClient.invalidateQueries(['getComments']); 

}

const onKeyDown = useCallback((e) => {
  if (e.key === 'Enter') {
    if (value === `@${user.username} ` || isLoading) {
      return;
    } else {
      mutate();
    }
  }
}, [value, user.username, isLoading, mutate]);

  return (
    <div className="sm:px-1 lg:px-0">
        <div className="flex gap-3 w-full">
        {user?.data?.imgMain?.value && <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${user?.data?.imgMain?.value}`} />}
        { !user?.data?.imgMain?.value && <Avatar name={`${user.firstName} ${user.lastName}`} />}
        <div className="flex flex-col w-full">
          <Link
            to={`/profile/${user.userId}`}
          >
            <Heading size='sm'>{user.firstName} {user.lastName}</Heading>
          </Link>
          <HStack>
            <div className="w-[305px] text-sm">
              {comment}
            </div>
            <div className="cursor-pointer ml-2" onClick={() => toggleLike(id)}>
              {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
            </div>
          </HStack>

          <div className="flex justify-between">
            <div className="flex gap-4 text-[10px] items-center">
              <span>{formatTimeAgo(time?.millis)}</span>
              <span>{formatNumberWithK(numOfLikes)} like{numOfLikes > 1 || numOfLikes === 0 ? "s" : ""}</span>
              <span
                className="text-chasescrollPurple cursor-pointer"
                onClick={() => setShow(prev => !prev)}
              >
                {subcomments.length} Reply
              </span>
              { user.userId === userId && <Text role="button" color='red' size='xs' onClick={()=> deleteComments(id)} >Delete</Text> }
              { subcomments.length > 0 && (
                  <span
                  className="text-chasescrollPurple cursor-pointer"
                  onClick={() => setShowR(prev => !prev)}
                >
                  { !showR && 'Show Replies' }
                  { showR && 'Hide Replies' }
                </span>
              )}
            </div>
            {/* <div className="cursor-pointer" onClick={() => toggleLike(id)}>
              {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
            </div> */}
          </div>

          { show && (
            <div className="flex mt-4">
              <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} width='200px' height='40px' borderRadius='10px' bg='white' fontSize={'12px'} />
              { isLoading && <Spinner /> }
            </div>
          )}

          {
            showR && !subLoading && subcomments.length > 0 && (
              <div className="ml-0">
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

function SubComment({ user, comment, commentID, likeCount, time, id }: Subcomment) {
  const [isLiked, setIsLiked] = useState(likeCount > 0)
  const [numOfLikes, setNumOfLikes] = useState(likeCount)
 

  const queryClient = useQueryClient(); 

  const { isLoading, mutate } = useMutation({
    mutationFn: () => httpService.post(`/feed/like-sub-comment/${id}`),
    onSuccess: (data) => {
      console.log(data.data);
      toast.success('liked');
      setIsLiked(data.data.likeStatus === 'LIKED');
      setNumOfLikes(data.data.likeCount);
      queryClient.invalidateQueries(['getSubcomment']);
    }
  });

  return (
    <div className="mt-4">
    <div className="flex gap-3 w-full">
    {user?.data?.imgMain?.value && <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${user?.data?.imgMain?.value}`} />}
    { !user?.data?.imgMain?.value && <Avatar name={`${user.firstName} ${user.lastName}`} />}
    <div className="flex flex-col w-full">
      <Text>{user.firstName} {user.lastName}</Text>
      <HStack>
        <div className="w-64 text-sm ">
          {comment}
        </div>
        <div className="cursor-pointer" onClick={() => mutate()}>
          { !isLoading && isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
          { isLoading && <Spinner color='brand.chasescrollBlue' />}
        </div>
      </HStack>

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
        {/* <div className="cursor-pointer" onClick={() => mutate()}>
          { !isLoading && isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
          { isLoading && <Spinner color='brand.chasescrollBlue' />}
        </div> */}
      </div>

    </div>
  </div>
</div>
  )
}

export default Comment
