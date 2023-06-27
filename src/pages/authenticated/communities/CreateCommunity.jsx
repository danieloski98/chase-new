import React, { useState } from 'react'
import { CameraIcon } from '../../../components/Svgs'
import Toggle from 'react-toggle'
import { useFetch } from '../../../hooks/useFetch'
import { useAuth } from '../../../context/authContext'
import { CREATE_GROUP, UPLOAD_IMAGE } from '../../../constants/endpoints.constant'
import { toast } from 'react-toastify'

const CreateCommunity = () => {
	const [communityInfo, setCommunityInfo] = useState({
		data: {
			address: "",
			contactNumber: "",
			email: "",
			name: "",
			isPublic: true,
			imgSrc: "",
			description: ""
		}
	})

	const [image, setImage] = useState(null)
	const [selectedImage, setSelectedImage] = useState(null)

	const { sendRequest } = useFetch()
	const { token, userId } = useAuth()

	const togglePublicity = () => setCommunityInfo(state => ({
		...state,
		data: {
			...state.data,
			isPublic: !state.data.isPublic
		}
	}))

	const handleChange = ({ target: { name, value } }) => setCommunityInfo(community => ({
		...community,
		data: {
			...community.data,
			[name]: value,
		}
	}))

	const createCommunity = async event => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("file", image);

		sendRequest(
			`${UPLOAD_IMAGE}${userId}`,
			"POST",
			formData,
			{ Authorization: `Bearer ${token}` },
			true
		).then((response) => {
			setCommunityInfo(info => ({
				...info,
				data: {
					...info.data,
					imgSrc: response?.fileName
				}
			}))
			sendRequest(
				CREATE_GROUP,
				"POST",
				communityInfo,
				{ Authorization: `Bearer ${token}` }
			).then((data) => toast.success(data.message))
		})
	}

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			setImage(file)
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	}

	return (
		<div className="flex flex-col gap-20 items-center h-[100vh] py-16">
			<label
				htmlFor="file"
				className="rounded-md"
			>
				<input
					id="file"
					type="file"
					onChange={handleFileInputChange}
					className="hidden"
				/>
				<div className="border-l-4 border-chasescrollBlue rounded-b-full rounded-tl-full">
					<div className="flex items-center justify-center w-32 h-32 bg-chasescrollGrey rounded-b-full rounded-tl-full border-l-4 border-white">
						{selectedImage ? <img
							src={selectedImage}
							alt="group image"
							className="object-cover w-full h-full rounded-b-full rounded-tl-full"
						/> : (
							<div className="flex items-center justify-center w-32 h-32 rounded-b-full rounded-tl-full bg-slate-500 cursor-pointer">
								<div className="rounded-full flex items-center justify-center bg-white w-5 h-5">
									<CameraIcon />
								</div>
							</div>
						)}
					</div>
				</div>
			</label>
			<form onSubmit={createCommunity} className="flex flex-col items-center gap-12 w-full max-w-2xl">
				<input
					type="text"
					name="name"
					value={communityInfo.data.name}
					className="rounded-lg border border-chasescrollGrey px-4 py-2 text-lg w-full"
					placeholder='community name'
					onChange={handleChange}
				/>
				<input
					type="text"
					name="description"
					value={communityInfo.data.description}
					className="rounded-lg border border-chasescrollGrey px-4 py-2 text-lg w-full"
					placeholder='community description'
					onChange={handleChange}
				/>
				<div className="flex justify-between w-full">
					<div className="flex flex-col gap-8 text-center">
						<p className="text-xl text-chasescrollTextGrey">Mode Type</p>
						<div className="flex gap-10 justify-between items-center text-chasescrollGrey">
							Auto <Toggle className='custom-classname' />
						</div>
						<div className="flex gap-10 justify-between items-center text-chasescrollGrey">
							Request <Toggle className='custom-classname' />
						</div>
					</div>
					<div className="flex flex-col gap-8 text-center">
						<p className="text-xl text-chasescrollTextGrey">Mode Type</p>
						<div className="flex gap-10 justify-between items-center text-chasescrollGrey">
							Private <Toggle className='custom-classname' checked={!communityInfo.data.isPublic} onChange={togglePublicity} />
						</div>
						<div className="flex gap-10 justify-between items-center text-chasescrollGrey">
							Public <Toggle className='custom-classname' checked={communityInfo.data.isPublic} onChange={togglePublicity} />
						</div>
					</div>
				</div>
				<button className="w-96 rounded-lg text-white text-center text-lg bg-chasescrollBlue p-2.5">Submit</button>
			</form>
		</div >
	)
}

export default CreateCommunity