import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import CONFIG from "../../../config"
import { Link, useParams } from "react-router-dom"
import { PATH_NAMES } from "../../../constants/paths.constant"
import UserPosts from "./UserPosts"
import { useFetch } from "../../../hooks/useFetch"
import { GET_USER_MEDIA_POSTS } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import useInfinteScroller from "../../../hooks/useInfinteScroller"
import { Spinner } from "@chakra-ui/react";

const Posts = () => {
  const [showUserPosts, setShowUserPosts] = useState(false)
  const [postID, setPostID] = useState(null)
  const { userId } = useParams()
  const { sendRequest } = useFetch()
  const [posts, setPosts] = useState([])
  const { token, userId: currentUserId } = useAuth()

  const self = userId === currentUserId

  const openUserPosts = (event) => {
    setShowUserPosts(true)
  }

  const closeUserPosts = (event) => {
    if (event.target.id === "overlay") {
      setShowUserPosts(false)
    }
  }

  // const fetchPosts = async () => {
  //   const data = await sendRequest(
  //     `${GET_USER_MEDIA_POSTS}?userID=${userId}`,
  //     "GET",
  //     null,
  //     { Authorization: `Bearer ${token}` }
  //   )
  //   if (data) setPosts(data) 
  // }

  // useEffect(()=>{
  //   fetchPosts()
  // }, []) 
  
  const [page, setPage] = React.useState(0)
  const { results, isLoading, lastChildRef } = useInfinteScroller({url:'/feed/get-users-media-posts?userID='+userId, pageNumber:page, setPageNumber:setPage,})

  console.log(results?.filter((item) => item.mediaRef?.split('.')[1] === 'mp4'))

  const content = results.map((post, index) => {
    if (index === results.length -1 ) {
      return (
        <div ref={lastChildRef} key={index.toString()}>
              {post.type === 'WITH_IMAGE' && post?.mediaRef &&
                <img 
                  key={post?.id}
                  src={`${CONFIG.RESOURCE_URL}${post?.mediaRef }`}
                  className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover cursor-pointer"
                  alt="media from user post"
                  onClick={() => {
                    openUserPosts()
                    setPostID(post?.id)
                  }} 
                />
              }
              {post.type === 'WITH_VIDEO_POST' && post?.mediaRef &&
                <video 
                  key={post?.id}
                  className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover cursor-pointer"
                  alt="media from user post"
                  onClick={() => {
                    openUserPosts()
                    setPostID(post?.id)
                  }} 
                  controls
                >
                  <source src={`${CONFIG.RESOURCE_URL}${post?.mediaRef}`} type="video/mp4" />
                </video>
              }
            </div>
      )
    } else {
     return (
      <div ref={lastChildRef} key={index.toString()}>
      {post.type === 'WITH_IMAGE' && post?.mediaRef &&
        <img 
          key={post?.id}
          src={`${CONFIG.RESOURCE_URL}${post?.mediaRef }`}
          className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover cursor-pointer"
          alt="media from user post"
          onClick={() => {
            openUserPosts()
            setPostID(post?.id)
          }} 
        />
      }
      {post.type === 'WITH_VIDEO_POST' && post?.mediaRef &&
        <video 
          key={post?.id}
          className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover cursor-pointer"
          alt="media from user post"
          onClick={() => {
            openUserPosts()
            setPostID(post?.id)
          }} 
          controls
        >
          <source src={`${CONFIG.RESOURCE_URL}${post?.mediaRef}`} type="video/mp4" />
        </video>
      }
    </div>
     )
    }
  })


  return (
    <section className="mb-[100px] flex-col flex items-center">

      {showUserPosts && (
        <UserPosts
          toggleUserPosts={closeUserPosts}
          userID={userId}
          postID={postID}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center w-fit">
        {content}
      </div>

            
      {isLoading && (
          <div className="w-full h-32 flex justify-center items-center">
              <Spinner size='md' color='brand.chasescrollButtonBlue' />
          </div>
      )}
    </section>
  )
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts
