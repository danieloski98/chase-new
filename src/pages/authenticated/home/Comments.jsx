import React, { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import { useNavigate, useParams } from "react-router"
import PageWrapper from "@/components/PageWrapper"
import ProfilePhoto from "@/components/ProfilePhoto"
import { CaretLeftIcon } from "@/components/Svgs"
import image from "@/assets/images/avatar.png"
import { COMMENTS, PATH_NAMES } from "@/constants"
import Comment from "@/components/home/Comment"
import {
  ADD_POST_COMMENT,
  GET_ALL_POST_COMMENTS,
} from "../../../constants/endpoints.constant"

const Comments = () => {
  const [userComments, setUserComments] = useState([])
  const [commentInput, setCommentInput] = useState("")
  const { sendRequest } = useFetch()
  const { userName, token } = useAuth()
  const navigate = useNavigate()
  const { postID } = useParams()

  const getUserComments = async () => {
    const response = await sendRequest(
      `${GET_ALL_POST_COMMENTS}?postID=${postID}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (response) setUserComments(response?.content)
  }

  const addComment = async () => {
    const response = await sendRequest(
      ADD_POST_COMMENT,
      "POST",
      { postID: postID, comment: commentInput },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (response) {
      setCommentInput("")
      getUserComments()
    }
  }

  const replyPerson = (username) => {
    setCommentInput(value => {
      if (value.includes(username)) {
        return value
      } else {
        return `@${username} ${value}`
      }
    })
  }

  useEffect(() => {
    getUserComments()
  }, [])

  return (
    <PageWrapper>
      {() => (
        <div className="h-full bg-chasescrollLightGrey overflow-auto pb-20">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div
                className="p-4 cursor-pointer"
                onClick={() => navigate(PATH_NAMES.home)}
              >
                <CaretLeftIcon />
              </div>
              <div className="p-4 w-full text-center">Comments</div>
            </div>
            <div className="flex items-center lg:items-start flex-col gap-10 py-4 px-4 lg:px-28">
              <div className="flex items-center gap-3 w-full">
                <ProfilePhoto image={image} />
                <div className="flex items-center bg-white w-full h-fit rounded-lg border border-blue-100">
                  <input
                    type="text"
                    className="outline-none bg-transparent py-2 px-4 w-full text-sm"
                    placeholder="Add Comment"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                  />
                  <button
                    className="outline-none bg-transparent py-2 px-4 text-chasescrollPurple text-sm"
                    onClick={addComment}
                  >
                    send
                  </button>
                </div>
              </div>
              {userComments?.map(comment => (
                <Comment key={comment.id} {...comment} replyPerson={replyPerson} />
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default Comments
