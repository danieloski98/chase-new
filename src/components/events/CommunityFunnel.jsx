import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../context/authContext'
import { GET_GROUP } from '../../constants/endpoints.constant'
import CONFIG from '../../config'
import { AddIcon, CloseIcon } from '../Svgs'
import { CLOSE_ENTITY } from '../../constants'

const CommunityFunnel = ({ toggleFunnel, funnel, setFunnel, setFormData, setaddfunnel, formData, addFunnel }) => {
	const { userId, token } = useAuth()
	const { sendRequest } = useFetch()

	const [communities, setCommunities] = useState([])

	const fetchMyCommunities = () => {
		sendRequest(
			`${GET_GROUP}?creatorID=${userId}`,
			"GET",
			null,
			{ Authorization: `Bearer ${token}` },
			true
		).then(data => {
			setCommunities(data?.content)
		})
	}

	useEffect(() => {
		fetchMyCommunities()
	}, [addFunnel])

	const clickHandler =()=> {
		toggleFunnel()
		setaddfunnel(true)
	} 

	return (
		<div className="flex flex-col gap-8 fixed overflow-auto bg-white inset-0 z-20 px-4 py-10">
			<div className="flex justify-between">
				<span className="cursor-pointer" onClick={toggleFunnel}>
					{CLOSE_ENTITY}
				</span>
				<span className="font-bold text-lg">
					Communities
				</span> 
				<div className=' flex gap-6  items-center' > 
					<button onClick={()=> clickHandler()}> 
						<AddIcon className=" cursor-pointer "  />
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-4 self-center w-full max-w-xl">
				{/* {formData?.eventFunnelGroupID && (
					<div className=' w-full flex justify-end  mb-6' > 
						<span className="text-chasescrollBlue cursor-pointer" onClick={toggleFunnel}>
							Done
						</span>
					</div>
				)} */}
				{communities?.map(community => (
					<div
						key={community?.id}
						className={`px-4 py-2 rounded-lg border border-chasescrollButtonBlue flex gap-4 cursor-pointer ${funnel?.id === community?.id ? 'bg-chasescrollBgBlue' : ''}`}
						onClick={() => {
							setFunnel(community)
							setFormData(data => ({
								...data,
								eventFunnelGroupID: community?.id
							}))
							toggleFunnel()
						}}
					>
						<img
							src={community?.data?.imgSrc === "string" || !community?.data?.imgSrc ? `https://ui-avatars.com/api/?background=random&name=${community?.data?.name}&length=1` : `${CONFIG.RESOURCE_URL}${community?.data?.imgSrc}`}
							alt="community banner"
							className="object-cover rounded-b-full w-10 h-10 rounded-tl-full border border-chasescrollBlue"
						/>
						<div className="flex flex-col">
							<p className="text-base">{community?.data?.name}</p>
							<p className="text-xs">{community?.data?.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CommunityFunnel