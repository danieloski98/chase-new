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
 

const Posts = () => {
  const [showUserPosts, setShowUserPosts] = useState(false)
  const [postID, setPostID] = useState(null)
  const { userId } = useParams()
  const { sendRequest } = useFetch()
  const [posts, setPosts] = useState([])
  const { token, userId: currentUserId } = useAuth()

  // console.log(userId);

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
  const { results, isLoading, lastChildRef } = useInfinteScroller({url:'/feed/get-users-media-posts?userID='+userId, pageNumber:page, setPageNumber:setPage, search: true})


  return (
    <section className="mb-[100px] flex justify-center">

      {showUserPosts && (
        <UserPosts
          toggleUserPosts={closeUserPosts}
          userID={userId}
          postID={postID}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center w-fit">
        {results?.map((post, i) => {
          // <Link to={`${PATH_NAMES.posts}/${userId}/${post?.id}`}>

        if (results?.length === i + 1) {
          return( 
            <div ref={lastChildRef} >
              {post?.mediaRef || post?.multipleMediaRef > 0 ? 
                <img 
                  key={post?.id}
                  src={`${CONFIG.RESOURCE_URL}${post?.mediaRef ?? post?.multipleMediaRef[0]}`}
                  className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover"
                  alt="media from user post"
                  onClick={() => {
                    openUserPosts()
                    setPostID(post?.id)
                  }} 
                /> :
                <div  className="rounded-b-[32px] rounded-tl-[32px] bg-slate-400 w-48 h-48 object-cover"/>
              }
            </div>
          )
        }else { 
          return( 
            <div>
              {post?.mediaRef || post?.multipleMediaRef > 0 ? 
                <img 
                  key={post?.id}
                  src={`${CONFIG.RESOURCE_URL}${post?.mediaRef ?? post?.multipleMediaRef[0]}`}
                  className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover"
                  alt="media from user post"
                  onClick={() => {
                    openUserPosts()
                    setPostID(post?.id)
                  }} 
                /> :
                <div  className="rounded-b-[32px] rounded-tl-[32px] bg-slate-400 w-48 h-48 object-cover"/>
              }
            </div>
          )
        }
          // </Link>
        })}
      </div>
    </section>
  )
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts
