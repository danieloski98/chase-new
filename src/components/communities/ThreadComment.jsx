import React, { useState } from 'react'
import { ADD_POST_SUB_COMMENT, GET_ALL_POST_SUB_COMMENTS, LIKE_FEED_COMMENT, LIKE_FEED_SUB_COMMENT } from '../../constants/endpoints.constant'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../context/authContext'
import { CommentsIcon, EmptyHeartIcon, FilledHeartIcon } from '../Svgs'
import CONFIG from '../../config'
import { formatTime } from '../../utils/helpers'

const ThreadComment = ({ comment, getUserComments, user }) => {
	const [userSubComments, setUserSubComments] = useState([])
	const [showSubComments, setShowSubComments] = useState(false)
	const [subCommentInput, setSubCommentInput] = useState("")

	const { token } = useAuth()
	const { sendRequest } = useFetch()

	const getUserSubComments = async () => {
		const response = await sendRequest(
			`${GET_ALL_POST_SUB_COMMENTS}?commentID=${comment?.id}`,
			"GET",
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		)
		if (response) setUserSubComments(response?.content)
	}

	const addSubComment = async (event) => {
		if (event.key === 'Enter') {
			const response = await sendRequest(
				ADD_POST_SUB_COMMENT,
				"POST",
				{ commentID: comment?.id, comment: subCommentInput },
				{
					Authorization: `Bearer ${token}`,
				}
			)
			if (response) {
				setSubCommentInput("")
				getUserSubComments()
			}
		}
	}

	const likeComment = () => {
		sendRequest(`${LIKE_FEED_COMMENT}/${comment?.id}`, "POST", null, {
			Authorization: `Bearer ${token}`,
		}).then(() => {
			getUserComments()
		})
	}

	const likeSubComment = async (subCommentID) => {
		sendRequest(`${LIKE_FEED_SUB_COMMENT}/${subCommentID}`, "POST", null, {
			Authorization: `Bearer ${token}`,
		}).then(() => {
			getUserSubComments()
		})
	}

	const toggleSubComments = () => {
		if (!showSubComments) {
			getUserSubComments()
			setShowSubComments(state => !state)
		} else {
			setShowSubComments(state => !state)
		}
	}

	return (
		<>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex flex-col gap-1 rounded-t-xl rounded-bl-xl shadow-md border border-gray-200 bg-white p-2">
					<div className="flex gap-4">
						<img
							src={comment?.user?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.otherUser?.firstName}&length=1`}
							className="border border-chasescrollButtonBlue rounded-t-full rounded-bl-full w-4 h-4"
							alt=""
						/>
						<p className="text-xs text-chasescrollButtonBlue">~ {comment?.user?.username}</p>
					</div>
					<p className="text-xs">{comment?.comment}</p>
					<small className="text-[10px] text-chasescrollGrey self-end">
						{formatTime(new Date(comment?.timeInMilliseconds))}
					</small>
				</div>
				<div className="flex justify-between">
					<div className="bg-white flex gap-2 items-center p-1 rounded-t-full rounded-bl-full shadow-md text-[10px] w-36">
						<img
							src={comment?.user?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.otherUser?.firstName}&length=1`}
							className="border border-chasescrollButtonBlue rounded-t-full rounded-bl-full w-4 h-4"
							alt=""
						/>
						<input
							placeholder="Add sub comment..."
							value={subCommentInput}
							onChange={({ target: { value } }) => setSubCommentInput(value)}
							className="outline-none h-4 w-full rounded-tr-full"
							onKeyDown={addSubComment}
						/>
					</div>
					<div className="flex items-center gap-2">
						<div onClick={likeComment} className="cursor-pointer relative">
							{comment?.likeStatus === "LIKED" ? <FilledHeartIcon /> : <EmptyHeartIcon />}
						</div>
						<div className="cursor-pointer relative" onClick={toggleSubComments}>
							<CommentsIcon />
						</div>
					</div>
				</div>
			</div>
			{showSubComments && (
				<div className="w-64 bg-white flex flex-col gap-4 self-end p-4 rounded-tr-xl rounded-b-xl">
					{userSubComments?.map(subComment => (
						<div key={subComment?.id} className="flex gap-2 w-full">
							<img
								src={subComment?.user?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${user?.otherUser?.firstName}&length=1`}
								className="border border-chasescrollButtonBlue rounded-tr-full rounded-b-full w-6 h-6"
								alt=""
							/>
							<div className="flex flex-col gap-2 w-full">
								<div className="flex flex-col gap-1 rounded-t-xl rounded-bl-xl shadow-md border border-gray-200 bg-white p-2">
									<p className="text-xs text-chasescrollButtonBlue">~ {subComment?.user?.username}</p>
									<p className="text-xs">{subComment?.comment}</p>
								</div>
								<div className="flex justify-between">
									<small className="text-[10px] text-chasescrollGrey self-end">
										{formatTime(new Date(subComment?.timeInMilliseconds))}
									</small>
									<div className="flex items-center gap-2">
										<div onClick={() => likeSubComment(subComment?.id)} className="cursor-pointer relative">
											{subComment?.likeStatus === "LIKED" ? <FilledHeartIcon /> : <EmptyHeartIcon />}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default ThreadComment