import React, { useEffect, useState, useRef, useCallback } from "react"
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
  GET_USER_FEED_DATA,
} from "../../../constants/endpoints.constant"
import imageIcon from "@/assets/svg/image.svg"
import profilePhoto from "@/assets/images/avatar.png"
import Share from "./Share"
import { toast } from "react-toastify"
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query"
import httpService from "@/utils/httpService"
import { Spinner, Stack, Skeleton, SkeletonCircle, HStack } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import {IUser} from '../../../models/User'
import { AxiosError, AxiosResponse } from "axios"
import InfiniteScroll from 'react-infinite-scroll-component';
import { IMediaContent, IMediaPost } from "src/models/MediaPost"
import UserPosts from "../profile/UserPosts"
import Loader from "@/components/Loader"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"

const Home = () => {
  const [isThreadMenuOpen, setIsThreadMenuOpen] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showFileUploader, setShowFileUploader] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [menuAction, setMenuAction] = useState(null)
  const [threadId, setThreadId] = useState(null)
  const [postId, setPostId] = useState(null)
  const [userFeedData, setUserFeedData] = useState<any[]>([])
  const [postFile, setPostFile] = useState()
  const [postInput, setPostInput] = useState("")
  const [user, setUser] = useState<IUser | null>(null);
  const [postMakerId, setPostMakerId] = useState(null)
  const { userName, token, userId } = useAuth();

  const threadListRef = useRef(null)

  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const toggleMoreOptions = () => setShowMoreOptions(state => !state)
  const toggleFileUploader = () => setShowFileUploader(state => !state)
  const toggleShare = () => setShowShareModal(state => !state);

  // pagination details
  const [pageParam, setPageParam] = useState(0);
 const { isError, isLoading, results, hasNextPage, error, mutate: loadMore, refresh  } = useInfiniteScroll({ pageParam, userID: userId as any })
 const intObserver = useRef<IntersectionObserver>();

 const lastChildRef = useCallback((post) => {
  if (isLoading) return;
  if (intObserver.current) intObserver.current.disconnect();
  intObserver.current = new IntersectionObserver((posts) => {
    if (posts[0].isIntersecting && hasNextPage) {
      setPageParam(prev => prev + 1);
    }
  });
  if (post) intObserver.current.observe(post);
 }, [isLoading, hasNextPage])

 const content = results.sort((a: IMediaContent, b: IMediaContent) => {
  if (a.time.millis > b.time.millis) {
    return 0;
  } else {
    return 1;
  }
 }).map((post: IMediaContent, i: number) => {
  if (results.length === i + 1) {
    return (
      <Thread
        ref={lastChildRef}
                    key={i}
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
                    setPostId={setPostId}
                  />
    )
  } else {
    return (
      <Thread
                    key={i}
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
                    setPostId={setPostId}
                  />
    )
  }
 })



  const userProfile = useQuery(['getUserDetails', userId], () => httpService.get(`/user/publicprofile/${userId}`), {
    onError: (error: AxiosError<any, any>) => {
      toast.error(JSON.stringify(error.response?.data));
    },
    onSuccess: (data) => {
      setUser(data.data);
    }
  })

  // mutation
  const { mutate, isLoading: postLoading } = useMutation({
    mutationFn: () => httpService.post(CREATE_POST, { text: postInput, type: "NO_IMAGE_POST", sourceId: userId }),
    onError: (error: AxiosError<any, any>) => {
      toast.error(JSON.stringify(error.response?.data));
    },
    onSuccess: (data) => {
      toast.success("Post created successfully");
      setPostInput("");
      loadMore()
      //queryClient.refetchQueries(['getFeedsPosts'])
    }
  })
  const handleItemClick = (action, route, threadId) => {
    setMenuAction(action)
    setIsThreadMenuOpen(!isThreadMenuOpen)
    setThreadId(threadId)
    navigate(`${route}/${threadId}`)
    console.log({ menuAction, threadId })
  }


  const handleEnterKeyPress = React.useCallback((e) => {
    if (postLoading) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();

      if (postInput === '') {
        alert('You cannot post empty');
        return;
      }
      mutate();
    }
  }, [mutate, postInput, postLoading]);

  const createPost = React.useCallback(() => {
    if (postLoading) {
      return;
    }
    if (postInput === '') {
      alert('You cannot post empty');
      return;
    }
   mutate();
  }, [mutate, postInput, postLoading])
 

  return (
    <PageWrapper toggleFileUploader={toggleFileUploader}>
      {() => (
          <div id="container" className="w-full h-full">
          {showMoreOptions && (
            <ThreadMenu
              handleItemClick={handleItemClick}
              showMoreOptions={showMoreOptions}
              toggleMoreOptions={toggleMoreOptions}
              threadId={threadId}
              postID={postId}
              refresh={refresh}
            />
          )}
          {showFileUploader && (
            <UploadImage toggleFileUploader={toggleFileUploader} loadMore={loadMore} />
          )}
          {isThreadMenuOpen && (
            userFeedData?.map((post, i) => (
              <ThreadMenu postID={postId} key={i} threadId={threadId} userId={userId} postMakerId={postMakerId} refresh={refresh} />
            ))
          )}
          {showShareModal && <Share closeShareModal={toggleShare} />}

            <div className="hidden md:flex flex-col gap-2 bg-white text-chasescrollBlue bg-opacity-25 w-full max-w-lg rounded-xl mx-4 lg:mx-28 mb-10 p-4 shadow-md">
               <div className="flex items-center bg-chasescrollPalePurple bg-opacity-30 rounded-xl pl-4">
                 <div className="w-8 h-7 rounded-b-full rounded-tr-full border-chasescrollBlue flex items-center justify-center">
                   
                   <Avatar 
                    // src={user.images.value ? user.images.value : ''}
                    name={`${user?.firstName} ${user?.lastName}` || 'UU' }
                    className="w-8 h-7 object-cover rounded-b-full rounded-tr-full border border-chasescrollBlue cursor-pointer"
                    onClick={() => navigate(`/profile/${userId}`)}
                    size='sm'
                   />
                 </div>
                 <input
                   type="text"
                   placeholder={`Add your thought ${userName}`}
                   value={postInput}
                   onKeyDown={handleEnterKeyPress}
                   onChange={e => setPostInput(e.target.value)}
                   className="outline-none bg-transparent w-full px-6 py-2.5"
                 />
                 <button
                   className="w-14 pl-2 pr-6 flex justify-center items-center cursor-pointer border-r border-white"
                   onClick={createPost}
                 >
                  {postLoading ? (
                    <Spinner color="brand.chasescrollButtonBlue" />
                  ) :  <SendIcon />}
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
      
      
          <div className="hidden md:flex flex-col gap-2 bg-white  w-full max-w-lg rounded-xl my-9 mx-4 lg:mx-28 mb-24 p-4">

          { results.length > 0 && content }

          { isLoading && (
            <div className="w-full h-24 flex items-center justify-center">
              <p>Loading feeds...</p>
              <Spinner color="brand.cchasescrollButtonBlue" size='md' />
            </div>
          )}
          </div>
      
        </div>
      )}
    </PageWrapper>
  )
}

export default Home
