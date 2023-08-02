import React, { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import { useNavigate, useParams } from "react-router-dom"
import PageWrapper from "@/components/PageWrapper"
import ProfilePhoto from "@/components/ProfilePhoto"
import { CaretLeftIcon } from "@/components/Svgs"
import image from "@/assets/images/avatar.png"
import { PATH_NAMES } from "@/constants/paths.constant"
import Comment from "@/components/home/Comment"
import {
  ADD_POST_COMMENT,
  GET_ALL_POST_COMMENTS,
} from "../../../constants/endpoints.constant"
import { useMutation, useQuery, useQueryClient } from "react-query"
import httpService from '../../../utils/httpService'
import { toast } from "react-toastify"
import { Spinner } from '@chakra-ui/react'

const Comments = () => {
  const [userComments, setUserComments] = useState([])
  const [commentInput, setCommentInput] = useState("")
  const { sendRequest } = useFetch()
  const { userName, token, userId } = useAuth()
  const { postID } = useParams()
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(['getComments', postID], () => httpService.get(`${GET_ALL_POST_COMMENTS}?postID=${postID}`), {
    onSuccess: (data) => {
      console.log(data.data);
      setUserComments(data.data.content);
    }
  });

  const addComment = useMutation({
    mutationFn: (data) => httpService.post('/feed/add-comment', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['getComments']);
      setCommentInput("");
      toast.success(`comment added`);
    }
  });

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

  const addCommentNew = async () => {
    toast.warn(`An errorr`);
    addComment.mutate({ postID: postID, comment: commentInput });
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
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        addCommentNew()
                      }
                    }}
                  />
                  <button
                    className="outline-none bg-transparent py-2 px-4 text-chasescrollPurple text-sm"
                    onClick={addCommentNew}
                  >
                    { addComment.isLoading && <Spinner /> }
                    { !addComment.isLoading && 'send' }
                  </button>
                </div>
              </div>
              {userComments.length > 0 && userComments?.map(comment => (
                <Comment key={comment.id} {...comment} replyPerson={replyPerson} />
              ))}

              {userComments.length < 1 && (
                <div className="w-full">
                  No comments
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default Comments
