import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Thread from '../../../components/home/Thread'
import UploadImage from '../../../components/home/UploadImage'
import ThreadMenu from '../../../components/home/ThreadMenu'
import { useFetch } from '../../../hooks/useFetch'
import { useAuth } from '../../../context/authContext'
import { GET_USER_POSTS } from '../../../constants/endpoints.constant'
import PageWrapper from '../../../components/PageWrapper'
import Share from '../home/Share'
import { CaretLeftIcon } from '../../../components/Svgs'
import { PATH_NAMES } from '../../../constants/paths.constant'
import OverlayWrapper from '../../../components/OverlayWrapper'

const UserPosts = ({ toggleUserPosts, userID, postID }) => {
	const [isThreadMenuOpen, setIsThreadMenuOpen] = useState(false)
	const [showMoreOptions, setShowMoreOptions] = useState(false)
	const [showShareModal, setShowShareModal] = useState(false)
	const [threadId, setThreadId] = useState(null)
	const [userFeedData, setUserFeedData] = useState([])

	// const { userID, postID } = useParams()
	const { sendRequest } = useFetch()
	const { token } = useAuth()
	const threadListRef = useRef(null)
	const itemRef = useRef(null)

	const toggleMoreOptions = () => setShowMoreOptions(state => !state)
	const toggleShare = () => setShowShareModal(state => !state)
	const handleItemClick = (action, route, threadId) => {
		// setMenuAction(action)
		setIsThreadMenuOpen(!isThreadMenuOpen)
		setThreadId(threadId)
		// navigate(`${route}/${threadId}`)
		// console.log({ menuAction, threadId })
	}

	const getUserFeedData = async () => {
		const userFeedData = await sendRequest(`${GET_USER_POSTS}?userID=${userID}`, "GET", null, {
			Authorization: `Bearer ${token}`,
		})
		if (userFeedData) {
			setUserFeedData(userFeedData?.content)
			const item = userFeedData?.content?.find(item => item.id === postID)
			if (item) {
				itemRef?.current?.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	useEffect(() => {
		itemRef?.current?.scrollIntoView({ behavior: 'smooth' });
	}, [userFeedData]);


	useEffect(() => {
		getUserFeedData()
	}, []) 

	return (
		<OverlayWrapper handleClose={toggleUserPosts}>
			<>
				{showMoreOptions && (
					<ThreadMenu
						handleItemClick={handleItemClick}
						showMoreOptions={showMoreOptions}
						toggleMoreOptions={toggleMoreOptions}
						threadId={threadId}
					/>
				)}
				{isThreadMenuOpen && (
					userFeedData?.map(post => (
						<ThreadMenu postID={post?.id} key={post?.id} />
					))
				)}
				{showShareModal && <Share closeShareModal={toggleShare} />}

				<div
					className="flex items-center flex-col gap-10 py-9 px-4 lg:px-28 pb-24 h-full w-full overflow-auto"
					ref={threadListRef}
					id='overlay'
					onClick={toggleUserPosts}
				>
					{/* <Link to={`${PATH_NAMES.profile}/${userID}`} className="self-start">
						<CaretLeftIcon />
					</Link> */}
					{userFeedData?.map(post => { 
						return( 
							<Thread
								ref={post?.id === postID ? itemRef : null}
								key={post?.id}
								postID={post?.id}
								text={post?.text}
								user={post?.user}
								time={post?.time} 
								shareCount={post?.shareCount}
								mediaRef={post?.mediaRef}
								multipleMediaRef={post?.multipleMediaRef}
								likeCount={post?.likeCount}
								commentCount={post?.commentCount}
								toggleMoreOptions={toggleMoreOptions}
								toggleShare={toggleShare}
								type={post?.type}
								setThreadId={setThreadId}
								likeStatus={post?.likeStatus}
							/>
						)
					})}
				</div>
			</>
		</OverlayWrapper>
	)
}

export default UserPosts