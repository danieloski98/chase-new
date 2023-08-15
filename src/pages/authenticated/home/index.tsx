import React, { useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import CONFIG from "../../../config"
import PageWrapper from "../../../components/PageWrapper"
import Thread from "../../../components/home/Thread"
import ThreadMenu from "../../../components/home/ThreadMenu"
import { SendIcon } from "../../../components/Svgs"
import UploadImage from "../../../components/home/UploadImage"
import { useAuth } from "../../../context/authContext"
import {
  CREATE_POST,
} from "../../../constants/endpoints.constant"
import imageIcon from "@/assets/svg/image.svg"
import Share from "./Share"
import { toast } from "react-toastify"
import { useMutation, useQuery, useQueryClient } from "react-query"
import httpService from "../../../utils/httpService"
import { Spinner, Textarea } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import {IUser} from '../../../models/User'
import { AxiosError } from "axios"
import { IMediaContent } from "src/models/MediaPost"
import useInfiniteScroll from "../../../hooks/useInfiniteScroll"

const Home = () => {
  const [isThreadMenuOpen, setIsThreadMenuOpen] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showFileUploader, setShowFileUploader] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [menuAction, setMenuAction] = useState(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [postId, setPostId] = useState<string |  null>(null)
  const [userFeedData, setUserFeedData] = useState<any[]>([])
  const [postFile, setPostFile] = useState()
  const [postInput, setPostInput] = useState("")
  const [user, setUser] = useState<IUser | null>(null);
  const [postMakerId, setPostMakerId] = useState<string | null>(null)
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
 }, [isLoading, hasNextPage]);

 const handlePoster = React.useCallback((id: string) => {
    console.log(`this is poster id changing ${id}`);
    setPostMakerId(id);
  }, []);

 const content = React.useCallback(() => {
  return results.map((post: IMediaContent, i: number) => {
    if (results.length === i + 1) {
      return (
        <Thread
          ref={lastChildRef}
          key={i}
          post={post}
          toggleMoreOptions={toggleMoreOptions}
          toggleShare={toggleShare}
          setThreadId={(id) => setThreadId(id)}
          setPostId={ (id: string) => setPostId(id)}
          setPostMakeId={handlePoster}
        />
      )
    } else {
      return (
        <Thread
          key={i}
          post={post}
          toggleMoreOptions={toggleMoreOptions}
          toggleShare={toggleShare}
          setThreadId={(id) => setThreadId(id)}
          setPostId={ (id: string) => setPostId(id)}
          setPostMakeId={handlePoster}
        />
      )
    }
   })
 }, [handlePoster, lastChildRef, results])



  const userProfile = useQuery(['getUserDetails', userId], () => httpService.get(`/user/publicprofile/${userId}`), {
    onError: (error: AxiosError<any, any>) => {
      toast.error(JSON.stringify(error.response?.data));
    },
    onSuccess: (data) => {
      setUser(data.data);
      console.log(data);
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
      queryClient.invalidateQueries(['getFeedsPosts'])
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
  }, [mutate, postInput, postLoading]);

 

  return (
    <PageWrapper toggleFileUploader={toggleFileUploader}>
      {() => (
          <div id="container" className="w-full h-full overflow-x-hidden pt-5 sm:px-5 lg:px-0">
          {showMoreOptions && (
            <ThreadMenu
              handleItemClick={handleItemClick}
              showMoreOptions={showMoreOptions}
              toggleMoreOptions={toggleMoreOptions}
              threadId={threadId}
              postID={postId}
              refresh={refresh}
              creatorId={postMakerId}
            />
          )}
          {showFileUploader && (
            <UploadImage toggleFileUploader={toggleFileUploader} loadMore={loadMore} />
          )}
          {/* {isThreadMenuOpen && (
            results.map((post, i) => (
              <ThreadMenu postID={postId} key={i} threadId={threadId} userId={userId} postMakerId={post.user.userId} refresh={refresh} />
            ))
          )} */}
          {showShareModal && <Share closeShareModal={toggleShare} />}

            <div className="flex flex-col gap-2 bg-white text-chasescrollBlue bg-opacity-25 w-full lg:max-w-lg rounded-xl lg:mx-28 mb-10 p-4 shadow-md">
               <div className="flex items-center bg-chasescrollPalePurple bg-opacity-30 rounded-xl pl-4">
                 <div className="w-8 h-7 rounded-b-full rounded-tr-full border-chasescrollBlue flex items-center justify-center">
                   
                   <Avatar 
                    src={user?.data?.imgMain?.value ? `${CONFIG.RESOURCE_URL}${user?.data?.imgMain?.value}`: ''}
                    name={`${user?.firstName} ${user?.lastName}` || 'UU' }
                    className="w-8 h-7 object-cover rounded-b-full rounded-tr-full border border-chasescrollBlue cursor-pointer"
                    onClick={() => navigate(`/profile/${userId}`)}
                    size='sm'
                   />
                 </div>
                 <Textarea
                   placeholder={`Add your thought ${userName}`}
                   value={postInput}
                   onChange={e => setPostInput(e.target.value)}
                   borderWidth={0}
                   backgroundColor={'transparent'}
                   resize={'none'}
                   cols={1}
                   size='xs'
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
                //  onChange={e => setPostFile(e.target.value)}
                 className="flex gap-2 items-center text-chasescrollTextGrey cursor-pointer w-fit text-sm"
               >
                 <span className="flex justify-center items-center rounded-r-lg">
                   <img src={imageIcon} className="" alt="" />
                 </span>
                 Add Photos/Video to your post
               </div>
             </div>
      
      
          <div className="flex flex-col gap-2 bg-white  w-full max-w-lg rounded-xl my-9 lg:mx-28 mb-24">

          { results.length > 0 && content() }

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
