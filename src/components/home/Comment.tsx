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
import { Avatar, HStack, Heading, Input, Spinner, Text } from "@chakra-ui/react"
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
  const [showR, setShowR] = useState(false);
  const { token } = useAuth()
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

  return (
    <div>
        <div className="flex gap-3 w-full">
        {user.data.imgMain.value && <ProfilePhoto image={`${CONFIG.RESOURCE_URL}/${user.data.imgMain.value}`} />}
        { !user.data.imgMain.value && <Avatar name={`${user.firstName} ${user.lastName}`} />}
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
            <div className="cursor-pointer" onClick={() => toggleLike(id)}>
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
              <svg role='button' onClick={()=> deleteComments(id)} xmlns="http://www.w3.org/2000/svg"  className=' fill-black w-4 ml-auto ' viewBox="0 0 30 30" >    
                  <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/>
              </svg> 
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
              <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  mutate();
                }
              }} width='200px' height='40px' borderRadius='10px' bg='white' />
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
