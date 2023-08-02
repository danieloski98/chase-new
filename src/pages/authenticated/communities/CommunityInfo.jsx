import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageWrapper from '../../../components/PageWrapper'
import { ArrowRight, BellIcon, CameraIcon, CaretLeftIcon, LeaveIcon, SearchIcon, Settings2 } from '../../../components/Svgs'
import { useFetch } from '../../../hooks/useFetch'
import { useAuth } from '../../../context/authContext'
import { GET_GROUP, GET_GROUP_MEMBERS, GET_GROUP_POSTS } from '../../../constants/endpoints.constant'
import CONFIG from '../../../config'
import { PATH_NAMES } from '../../../constants/paths.constant'
import { FiEdit } from 'react-icons/fi'
import EditCommunity from '@/components/communities/EditModal'
import httpService from '@/utils/httpService'
import { useQuery } from 'react-query'

const CommunityInfo = () => {
	const [community, setCommunity] = useState(null)
	const [communityMembers, setCommunityMembers] = useState()
	const [communityPosts, setCommunityPosts] = useState()
	const [showModal, setShowModal] = React.useState(false);
	const { id } = useParams()
	const { sendRequest } = useFetch()
	const { token, userId } = useAuth()

	const { isLoading } = useQuery(['GetCom'], () => httpService.get(`${GET_GROUP}?groupID=${id}`), {
		onSuccess: (data) => {
			console.log(data.data.content);
			setCommunity(data.data.content[0])
		}
	});

	// const fetchCommunity = async () => {
	// 	const data = await sendRequest(
	// 		`${GET_GROUP}?groupID=${id}`,
	// 		"GET",
	// 		null,
	// 		{ Authorization: `Bearer ${token}` }
	// 	)
	// 	if (data) setCommunity(data?.content[0])
	// }

	const fetchCommunityMembers = async () => {
		const data = await sendRequest(
			`${GET_GROUP_MEMBERS}?groupID=${id}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		)
		if (data) setCommunityMembers(data?.content)
	}

	const fetchCommunityPosts = async () => {
		const data = await sendRequest(
			`${GET_GROUP_POSTS}?groupID=${id}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` }
		)
		if (data) setCommunityPosts(data?.content)
	}

	useEffect(() => {
		//fetchCommunity()
		fetchCommunityMembers()
		fetchCommunityPosts()
	}, [])


	const closeModal = () => {
		setShowModal(false);
	}
	return (
		<PageWrapper>
			{() => (
				<div className="flex justify-center">
					{ showModal && <EditCommunity community={community} onClose={closeModal} />}
					<div className="flex flex-col gap-5 w-full max-w-md py-8">
						<div className="flex flex-col gap-5 items-center w-full p-6 rounded-3xl border">
							<div className="flex justify-between items-center text-center w-full">
								<p className="">
									<CaretLeftIcon />
								</p>
								<p className="font-bold">Community Info</p>
								<p className="">
									<FiEdit fontSize={20} className="cursor-pointer" onClick={() => setShowModal(true)} />
								</p>
							</div>
							<div className="flex flex-col gap-4 w-full items-center">
								<div className="border-l-4 border-chasescrollBlue rounded-b-full rounded-tl-full w-32 h-32">
									<img
										src={community ? `${CONFIG.RESOURCE_URL}${community?.data?.imgSrc}` : `https://ui-avatars.com/api/?background=random&name=${community?.data?.name}&length=1`}
										alt=""
										className='w-full rounded-b-full rounded-tl-full'
									/>
								</div>
								<div className="flex flex-col gap-2">
									<p className="text-center text-xl font-bold text-chasescrollBlue capitalize">{community?.data?.name}</p>
									<p className="text-center text-xs text-chasescrollGrey">{community?.data?.memberCount} members</p>
								</div>
								<div className="flex items-center gap-4">
									
									<div className="w-[76px] h-16 cursor-pointer bg-chasescrollBgBlue rounded-lg text-chasescrollBlue text-center flex flex-col p-2 justify-between items-center text-sm font-medium">
										<LeaveIcon />
										Exit
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-center w-full pt-6 px-4 pb-1 rounded-3xl border relative">
							<div className="rounded-full absolute -top-3 py-1 px-3 font-semibold left-5 text-xs bg-white text-chasescrollBlue">
								Members
							</div>
							<div className="text-chasescrollButtonBlue w-full max-w-xs flex items-center gap-2 rounded-lg border pl-4">
								<SearchIcon />
								<input type="text" className="p-2 w-full outline-none rounded-r-lg text-sm" placeholder='Search' />
							</div>
							{communityMembers?.map((profile, index) => (
								<div
									className={`flex justify-between items-center w-full py-3 ${index !== communityMembers.length - 1 ? 'border-b' : ''}`}
									key={profile?.id}
								>
									<Link
										to={`${PATH_NAMES.profile}/${profile?.user?.userId}`}
										className="flex gap-2 items-center"
									>
										<img
											src={profile?.user?.data?.imgMain?.value?.endsWith('jpg') ? `${CONFIG.RESOURCE_URL}${profile?.user?.data?.imgMain?.value}` : `https://ui-avatars.com/api/?background=random&name=${profile?.user?.firstName}&length=1`}
											className="rounded-b-full rounded-tl-full object-cover w-10 h-10 border border-chasescrollBlue"
											alt="connection"
										/>
										<div className="inline-flex flex-col">
											<p className="text-l text-black-800 text-sm">
												{profile?.user?.firstName} {profile?.user?.lastName}
											</p>
											<small className="text-gray-500 text-xs">@{profile?.user?.username}</small>
										</div>
									</Link>
									{profile?.role === "ADMIN" && (
										<div className="text-xs text-chasescrollBlue font-semibold">Admin</div>
									)}
								</div>
							))}
						</div>
						<div className="flex flex-col">
							<div className="font-semibold text-sm bg-chasescrollBgBlue text-center flex justify-around py-3">
								<p className="text-chasescrollBlue">Media</p>
								<p className="text-chasescrollGrey">Files</p>
								<p className="text-chasescrollGrey">Links</p>
							</div>
							<div className="py-2 px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
								{community?.data?.picUrls?.map(post => (
									<img
										src={`${CONFIG.RESOURCE_URL}${post}`}
										alt=""
										className='rounded-md object-cover h-28 w-28'
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</PageWrapper>
	)
}

export default CommunityInfo