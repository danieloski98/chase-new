import info from "../../../assets/svg/info-circle.svg"
import React, { useEffect, useRef, useState } from 'react'
import PageWrapper from '../../../components/PageWrapper'
import empty from '../../../assets/images/empty-community.png'
import { Link, useParams } from "react-router-dom"
import Message from "../message"
import CONFIG from "../../../config"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import { ADD_POST_COMMENT, GET_ALL_POST_COMMENTS, GET_ALL_PUBLIC_EVENTS, GET_ALL_PUBLIC_EVENTS_TO_JOIN, GET_CHAT, GET_GROUP_POSTS, GET_JOINED_GROUPS, GET_MESSAGES, GET_SAVED_EVENTS, REMOVE_SAVED_EVENT, SAVE_EVENT, UPLOAD_IMAGE } from "../../../constants/endpoints.constant"
import { AddIcon } from "../../../components/Svgs"
import OverlayWrapper from "../../../components/OverlayWrapper"
import ProfilePhoto from "../../../components/ProfilePhoto"
import profilePhoto from "../../../assets/images/avatar.png"
import selector from "../../../assets/svg/image.svg"
import smiley from "../../../assets/svg/smiley.svg"
import send from "../../../assets/svg/send-icon.svg"
import { formatTime, formatTimeAgo, isEven } from "../../../utils/helpers"
import { CHAT_MESSAGES, MESSAGE_MENU, PATH_NAMES } from "../../../constants"
import { Popover, Transition } from "@headlessui/react"
import ButtonSpinner from "../../../components/ButtonSpinners"
import Thread from "../../../components/communities/Thread"
import Share from "../home/Share"
import addEventBtn from "../../../assets/svg/add-event.svg"
import EventsToAdd from "../../../components/communities/EventsToAdd"
import { toast } from "react-toastify"

const Community = () => {
	const { id } = useParams()

	const [message, setMessage] = useState("")
	const [image, setImage] = useState(null)
	const [selectedImage, setSelectedImage] = useState(null)
	const [showMessages, setShowMessages] = useState(false)
	const [showChat, setShowChat] = useState(false)
	const [showMedia, setShowMedia] = useState(false)
	const [previewMedia, setPreviewMedia] = useState(null)
	const [chatList, setChatList] = useState([])
	const [currentUser, setCurrentUser] = useState(null)
	const [chatMessages, setChatMessages] = useState([])
	const [showShareModal, setShowShareModal] = useState(false)
	const [events, setEvents] = useState([])
	const [showEvents, setShowEvents] = useState(false)

	const containerRef = useRef(null);

	const toggleShare = () => setShowShareModal(state => !state)
	const toggleEvents = () => setShowEvents(state => !state)

	useEffect(() => {
		// if (showChat && chatMessages) {
		//   const container = containerRef.current;
		//   console.log({ container });
		//   container.scrollTop = container.scrollHeight;
		// }
	}, [showChat, chatMessages]);

	const { token, userId } = useAuth()
	const { sendRequest, isLoading } = useFetch()
	const { sendRequest: sendMessageRequest, isLoading: isMessageLoading } = useFetch()

	const handleChange = ({ target: { value } }) => {
		setMessage(value)
	}

	const getAllMyEvents = () => {
		sendRequest(
			`${GET_SAVED_EVENTS}?typeID=${id}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		).then(data => {
			setEvents(data?.content)
		})
	}

	const addEvent = (eventID) => {
		sendRequest(
			SAVE_EVENT,
			"POST",
			{
				eventID,
				typeID: id,
				type: "EVENT"
			},
			{ Authorization: `Bearer ${token}` }
		).then(response => {
			if (response?.updated) {
				toast.success(response?.message)
			} else {
				toast.error(response?.message)
			}
			getAllMyEvents()
		})
	}

	const removeEventFromGroup = (eventID) => {
		sendRequest(
			REMOVE_SAVED_EVENT,
			"DELETE",
			{
				eventID,
				typeID: id,
				type: "EVENT"
			},
			{ Authorization: `Bearer ${token}` }
		).then(response => {
			if (response?.updated) {
				toast.success(response?.message)
			} else {
				toast.error(response?.message)
			}
			getAllMyEvents()
		})
	}

	const fetchChatList = () => {
		sendRequest(
			`${GET_JOINED_GROUPS}?userID=${userId}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		).then(data => setChatList(data?.content))
	}

	const fetchChatMessages = (chatID) => {
		sendMessageRequest(
			`${GET_GROUP_POSTS}?groupID=${chatID}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		).then(data => {
			setChatMessages(data?.content)
		})
	}

	const sendChatMessage = (chatID) => {
		const formData = new FormData();
		formData.append("file", image);

		setMessage("")
		if (image !== null) {
			sendRequest(
				`${UPLOAD_IMAGE}${userId}`,
				"POST",
				formData,
				{ Authorization: `Bearer ${token}` },
				true
			).then((data) => {
				sendMessageRequest(
					GET_MESSAGES,
					"POST",
					{
						message,
						chatID: currentUser?.id,
						media: data?.fileName,
						mediaType: "PICTURE",
					},
					{ Authorization: `Bearer ${token}` },
				).then(() => {
					setImage(null)
					fetchChatMessages(chatID)
				})
			})
		} else {
			sendMessageRequest(
				GET_MESSAGES,
				"POST",
				{
					message,
					chatID: currentUser?.id,
				},
				{ Authorization: `Bearer ${token}` },
			).then(() => {
				setImage(null)
				fetchChatMessages(chatID)
			})
		}
	}

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			setImage(file)
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	}

	const toggleChatVisibility = (chatID) => {
		setShowMessages(state => !state)
		fetchChatMessages(chatID)
	}

	const toggleMediaVisibility = (blob = null) => {
		setPreviewMedia(blob)
		setShowMedia(state => !state)
	}

	useEffect(() => {
		fetchChatList()
		fetchChatMessages(id)
	}, [])

	useEffect(() => {
		if (chatList.length) {
			setCurrentUser(chatList?.find(chat => chat?.id === id))
		}
	}, [chatList])

	useEffect(() => {
		getAllMyEvents()
	}, [])

	return (
		<>
			{showShareModal && <Share closeShareModal={toggleShare} />}
			<PageWrapper>
				{() => (
					<>
						{showEvents ? (
							<EventsToAdd
								addEvent={addEvent}
								toggleEvents={toggleEvents}
							/>
						) : (
							<div className="w-full h-full flex">
								{!showChat ? (
									<>
										{showMedia && (
											<OverlayWrapper handleClose={toggleMediaVisibility}>
												<img
													alt="image preview"
													src={previewMedia}
													className="max-w-xl rounded-lg"
												/>
											</OverlayWrapper>
										)}
										<div className="lg:basis-4/12 bg-white w-full h-full border-r">
											<div className="flex flex-col">
												<div className="p-4 border-gray-200 flex items-center justify-between">
													<h1 className="text-2xl text-chasescrollBlue font-bold">
														Community
													</h1>
													<Link
														to={PATH_NAMES.createGroup}
														className="text-chasescrollPurple"
													>
														<AddIcon />
													</Link>
												</div>
												<div
													className="py-4 overflow-auto flex flex-col gap-4 h-full"
													style={{ maxHeight: "calc(100vh - 161px)" }}
												>
													<div className={`hidden lg:flex flex-col h-fit ${isLoading ? 'items-center justify-center' : ''}`}>
														{chatList?.map(thread => (
															<div
																key={thread.id}
																onClick={() => {
																	fetchChatMessages(thread.id)
																	setCurrentUser(thread)
																}}
																className={`flex items-center gap-4 border-b py-2 px-4 border-gray-100 cursor-pointer hover:hover:bg-slate-50 ${thread?.id === currentUser?.id ? 'bg-slate-100' : ''}`}
															>
																<div className='border-l-4 border-chasescrollBlue pl-0.5 rounded-b-full rounded-tl-full'>
																	<ProfilePhoto image={thread?.data?.imgSrc === "string" || !thread?.data?.imgSrc ? `https://ui-avatars.com/api/?background=random&name=${thread?.data?.name}&length=1` : `${CONFIG.RESOURCE_URL}${thread?.data?.imgSrc}`} />
																</div>
																<div className="flex flex-col">
																	<p className="font-bold text-sm text-gray-800">
																		{thread?.data?.name}
																	</p>
																	<small className="text-xs text-gray-400 truncate w-72">
																		{thread.data?.description}
																	</small>
																</div>
															</div>
														))}
													</div>
													<div className="lg:hidden">
														{chatList?.filter(item => item?.type === "COMMUNITY")?.map(thread => (
															<div
																key={thread.id}
																onClick={() => toggleChatVisibility(thread.id)}
																className={`flex items-center gap-4 border-b py-2 border-gray-100 cursor-pointer hover:bg-slate-50`}
															>
																<div className={`${thread?.type !== 'ONE_TO_ONE' ? 'border-l-4 border-chasescrollBlue pl-0.5 rounded-b-full rounded-tl-full' : ''}`}>
																	<ProfilePhoto image={thread?.data?.imgMain?.objectPublic ? `${CONFIG.RESOURCE_URL}${thread?.data?.imgMain?.value}}` : `https://ui-avatars.com/api/?background=random&name=${thread?.otherUser?.firstName}&length=1`} />
																</div>
																<div className="flex flex-col">
																	<p className="font-bold text-sm text-gray-800">
																		{thread?.type !== "ONE_TO_ONE" ? thread?.name : `${thread?.otherUser?.firstName} ${thread?.otherUser?.lastName}`}
																	</p>
																	<small className="text-xs text-gray-400 truncate w-72">
																		{`${thread.lastMessage}`}
																	</small>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
										<div className={`hidden lg:block basis-8/12 bg-[url('/src/assets/images/chat-bg.png')] w-full h-full relative pl-4 ${events?.length > 0 ? "pt-[228px]" : "pt-[76px]"} pb-[72px]`}>
											<div
												className="flex flex-col gap-4 overflow-auto"
												style={{ maxHeight: "calc(100vh - 242px)" }}
											>
												<div className="flex gap-5 items-center justify-center">
													{events.length < 1 && (
														<img
															src={addEventBtn}
															alt="add event"
															className="cursor-pointer"
															onClick={toggleEvents}
														/>
													)}
													<p className="w-full max-w-lg text-gray-400 text-xs">This community was created automatically for the upcoming Haven part, we want you to get know each try and connect with new friends in order to make the event much fun</p>
												</div>
												<p className="w-full p-4 text-center bg-transparent text-xs text-chasescrollTextGrey">
													{formatTimeAgo(currentUser?.lastMessageUpdate)}
												</p>
												<div className={`flex flex-col gap-4 pr-4 ${isLoading ? 'justify-center items-center' : ''}`}>
													{chatMessages?.map(message => (
														<div
															key={message?.id}
															ref={containerRef}
															className="rounded-t-xl p-3 text-sm w-fit bg-transparent text-gray-800 rounded-br-xl self-start"
														>
															<Thread
																user={message?.user}
																postID={message?.id}
																image={`${CONFIG.RESOURCE_URL}${message?.mediaRef}`}
																caption={message?.text}
																time={message?.timeInMilliseconds}
																likeStatus={message?.likeStatus}
																toggleShare={toggleShare}
															/>
															{/* {message?.media !== null ? (
															<div className="flex flex-col gap-2">
																<img
																	src={`${CONFIG.RESOURCE_URL}${message?.media}`}
																	alt="media"
																	className="cursor-pointer"
																	onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.media}`)}
																/>
																{message?.message ? message?.message : ''}
															</div>
														) : message?.message} */}
														</div>
													))}
												</div>
											</div>
											<div className="absolute top-0 left-0 w-full flex flex-col gap-4 bg-white">
												<div className="w-full p-4 bg-white flex justify-between items-center z-10">
													<div className="flex items-center gap-4">
														<ProfilePhoto image={currentUser?.data?.imgSrc === "string" || !currentUser?.data?.imgSrc ? `https://ui-avatars.com/api/?background=random&name=${currentUser?.data?.name}&length=1` : `${CONFIG.RESOURCE_URL}${currentUser?.data?.imgSrc}`} />
														<div className="flex flex-col">
															<p className="text-chasescrollBlue font-bold">
																{currentUser?.data?.name}
															</p>
															{/* <small className="text-xs">online</small> */}
														</div>
													</div>
													<Popover className="relative w-fit self-end">
														<Popover.Button className="flex outline-none">
															<div className="flex self-end text-chasescrollBlue">
																<span className="cursor-pointer p-1 -mr-1">
																	<img src={info} alt="" />
																</span>
															</div>
														</Popover.Button>
														<Transition
															enter="transition duration-100 ease-out"
															enterFrom="transform scale-95 opacity-0"
															enterTo="transform scale-100 opacity-100"
															leave="transition duration-75 ease-out"
															leaveFrom="transform scale-100 opacity-100"
															leaveTo="transform scale-95 opacity-0"
														>
															<Popover.Panel className="absolute z-10 right-0 bg-white w-32 border border-gray-200 rounded-lg shadow-lg">
																{MESSAGE_MENU.map((item, index) => (
																	<div
																		key={item.id}
																		className={`text-center text-sm w-full px-2 py-3 cursor-pointer border-gray-200
														${index !== MESSAGE_MENU.length - 1
																				? "border-b"
																				: "border-none"
																			} ${isEven(index) ? "text-black" : "text-red-500"}`}
																	>
																		{item.label}
																	</div>
																))}
															</Popover.Panel>
														</Transition>
													</Popover>
												</div>
												{events?.length > 0 && (
													<div className="bg-white flex items-center gap-5 px-4 py-3 overflow-x-auto">
														<img
															src={addEventBtn}
															alt="add event"
															className="cursor-pointer"
															onClick={toggleEvents}
														/>
														{events?.map(event => (
															<div className="relative cursor-pointer p-1 flex flex-col gap-2 border border-chasescrollBlue w-24 rounded-tl-lg rounded-b-lg">
																<span onClick={() => removeEventFromGroup(event?.id)} className="cursor-pointer font-bold bg-white text-red-600 text-xl w-6 h-6 rounded-full flex justify-center items-center absolute -top-2 -right-2 border border-red-400">
																	-
																</span>
																<img
																	src={`${CONFIG.RESOURCE_URL}${event?.currentPicUrl}`}
																	className="w-full h-12 object-cover rounded-tl-md rounded-b-md"
																	alt="event banner"
																/>
																<div className="flex flex-col">
																	<p className="text-[8px]">
																		{event?.eventName}
																	</p>
																	<p className="text-[6px] text-chasescrollBlue">
																		{event?.eventDescription}
																	</p>
																</div>
															</div>
														))}
													</div>
												)}
											</div>
											<input
												id="file"
												type="file"
												onChange={handleFileInputChange}
												className="hidden"
											/>
											<div className="absolute bottom-0 left-0 w-full p-4 bg-transparent flex gap-4 items-center">
												<div className="flex gap-4 items-center">
													<label
														htmlFor="file"
														className="rounded-md"
													>
														<div className="flex items-center gap-2">
															<img
																src={selector}
																alt=""
																className="cursor-pointer w-8 h-8"
															/>
															{selectedImage && <img
																src={selectedImage}
																alt=""
																className="cursor-pointer w-8 h-8 rounded-sm"
															/>}
														</div>

													</label>
													{/* <img src={smiley} alt="" /> */}
												</div>
												<div className="flex gap-4 items-center bg-white rounded-xl w-full pr-4">
													<input
														type="text"
														className="outline-none px-4 rounded-l-xl w-full text-sm text-chasescrollBlue"
														placeholder="Say Something..."
														value={message}
														onChange={handleChange}
													/>
													<img
														alt=""
														src={send}
														className="cursor-pointer"
														onClick={() => sendChatMessage(currentUser?.id)}
													/>
												</div>
											</div>
										</div>
									</>
								) : (
									<div
										className={`${showChat ? "block" : "hidden lg:block"
											} lg:block lg:basis-8/12 bg-[url('/src/assets/images/chat-bg.png')] w-full h-full relative pl-4 pt-[76px] pb-[72px]`}
									>
										<div
											className="flex flex-col gap-4 overflow-auto"
											style={{ maxHeight: "calc(100vh - 242px)" }}
										>
											<div className="flex gap-5 items-center justify-center">
												{events.length < 1 && (
													<img
														src={addEventBtn}
														alt="add event"
														className="cursor-pointer"
														onClick={toggleEvents}
													/>
												)}
											</div>
											<p className="w-full p-4 text-center bg-transparent text-xs text-chasescrollTextGrey">
												{formatTimeAgo(currentUser?.lastMessageUpdate)}
											</p>
											<div className={`flex flex-col gap-4 pr-4 ${isLoading ? 'justify-center items-center' : ''}`}>
												{chatMessages?.map(message => (
													<div
														key={message?.id}
														ref={containerRef}
														className={`rounded-t-xl p-3 text-sm w-fit max-w-[300px] ${message?.createdBy?.userId === userId || message?.self
															? "bg-chasescrollBlue text-white rounded-bl-xl self-end"
															: "bg-white text-gray-800 rounded-br-xl self-start"
															}`}
													>
														{message?.media !== null ? (
															<div className="flex flex-col gap-2">
																<img
																	src={`${CONFIG.RESOURCE_URL}${message?.media}`}
																	alt="media"
																	className="cursor-pointer"
																	onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.media}`)}
																/>
																{message?.message ? message?.message : ''}
															</div>
														) : message?.message}
													</div>
												))}
											</div>
										</div>
										<div className="absolute top-0 left-0 w-full flex flex-col gap-4 bg-white">
											<div className="w-full p-4 bg-white flex justify-between items-center z-10">
												<div className="flex items-center gap-4">
													<ProfilePhoto image={currentUser?.data?.imgSrc === "string" || !currentUser?.data?.imgSrc ? `https://ui-avatars.com/api/?background=random&name=${currentUser?.data?.name}&length=1` : `${CONFIG.RESOURCE_URL}${currentUser?.data?.imgSrc}`} />
													<div className="flex flex-col">
														<p className="text-chasescrollBlue font-bold">
															{currentUser?.data?.name}
														</p>
														{/* <small className="text-xs">online</small> */}
													</div>
												</div>
												<Popover className="relative w-fit self-end">
													<Popover.Button className="flex outline-none">
														<div className="flex self-end text-chasescrollBlue">
															<span className="cursor-pointer p-1 -mr-1">
																<img src={info} alt="" />
															</span>
														</div>
													</Popover.Button>
													<Transition
														enter="transition duration-100 ease-out"
														enterFrom="transform scale-95 opacity-0"
														enterTo="transform scale-100 opacity-100"
														leave="transition duration-75 ease-out"
														leaveFrom="transform scale-100 opacity-100"
														leaveTo="transform scale-95 opacity-0"
													>
														<Popover.Panel className="absolute z-10 right-0 bg-white w-32 border border-gray-200 rounded-lg shadow-lg">
															{MESSAGE_MENU.map((item, index) => (
																<div
																	key={item.id}
																	className={`text-center text-sm w-full px-2 py-3 cursor-pointer border-gray-200
														${index !== MESSAGE_MENU.length - 1
																			? "border-b"
																			: "border-none"
																		} ${isEven(index) ? "text-black" : "text-red-500"}`}
																>
																	{item.label}
																</div>
															))}
														</Popover.Panel>
													</Transition>
												</Popover>
											</div>
											{events?.length > 0 && (
												<div className="bg-white flex items-center gap-5 px-4 py-3 overflow-x-auto">
													<img
														src={addEventBtn}
														alt="add event"
														className="cursor-pointer"
														onClick={toggleEvents}
													/>
													{events?.map(event => (
														<div className="p-1 rounded-md border border-chasescrollBlue h-16 w-16">
															{event?.eventName}
														</div>
													))}
												</div>
											)}
										</div>
										<div className="absolute bottom-0 left-0 w-full p-4 bg-transparent flex gap-4 items-center">
											<div className="flex gap-4 items-center">
												<img src={image} alt="" />
												<img src={smiley} alt="" />
											</div>
											<div className="flex gap-4 items-center bg-white rounded-xl w-full pr-4">
												<input
													type="text"
													className="outline-none px-4 rounded-l-xl w-full text-sm text-chasescrollBlue"
													placeholder="Say Something..."
												/>
												<img src={send} alt="" />
											</div>
										</div>
									</div>
								)}
							</div>
						)}
					</>
				)}
			</PageWrapper>
		</>
	)
}

export default Community