import React, { useState } from "react"
import PropTypes from "prop-types"
import CONFIG from "../../../config"
import { Link, useParams } from "react-router-dom"
import { PATH_NAMES } from "../../../constants"
import UserPosts from "./UserPosts"

const Posts = ({ posts }) => {
  const [showUserPosts, setShowUserPosts] = useState(false)
  const [postID, setPostID] = useState(null)
  const { userId } = useParams()

  const openUserPosts = (event) => {
    setShowUserPosts(true)
  }

  const closeUserPosts = (event) => {
    if (event.target.id === "overlay") {
      setShowUserPosts(false)
    }
  }

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
        {posts?.map((post) => (
          // <Link to={`${PATH_NAMES.posts}/${userId}/${post?.id}`}>
          <img
            key={post?.id}
            src={`${CONFIG.RESOURCE_URL}${post?.mediaRef ?? post?.multipleMediaRef[0]}`}
            className="rounded-b-[32px] rounded-tl-[32px] w-48 h-48 object-cover"
            alt="media from user post"
            onClick={() => {
              openUserPosts()
              setPostID(post?.id)
            }}

          />
          // </Link>
        ))}
      </div>
    </section>
  )
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts
