import React, { useState } from 'react'
import { CameraIcon } from '../../../components/Svgs'
import Toggle from 'react-toggle'
import { useFetch } from '../../../hooks/useFetch'
import { useAuth } from '../../../context/authContext'
import { CREATE_GROUP, UPLOAD_IMAGE } from '../../../constants/endpoints.constant'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateCommunity = ({ setaddfunnel, setFunnel, modal }) => {
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
	});
	const nav = useNavigate();

	const [image, setImage] = useState(null)
	const [selectedImage, setSelectedImage] = useState(null)
	const [loading, setLoading] = useState(false)

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

	const createCommunity =  React.useCallback(async event => {
		event.preventDefault();
		if (loading) {
			return;
		}
		if (communityInfo.data.name === '' || communityInfo.data.description === '') {
			toast.error("Please fill all the fields");
			return;
		}
		if (image === null) {
			toast.error("Please select an image");
			return;
		}
		setLoading(true)
		

		const formData = new FormData();
		formData.append("file", image);

		sendRequest(
			`${UPLOAD_IMAGE}${userId}`,
			"POST",
			formData,
			{ Authorization: `Bearer ${token}` },
			true
		).then((response) => {
			console.log(response);
			const obj = {
				data: {
					...communityInfo.data,
					imgSrc: response?.fileName
				}
			}
			console.log(obj);
			sendRequest(
				CREATE_GROUP,
				"POST",
				obj,
				{ Authorization: `Bearer ${token}` }
			).then((data) =>  
				{
					toast.success('Community Created'); 
					setLoading(false),
					// clickHandler()
					nav(-1)
				}
			)
		})
	}, [loading, communityInfo.data, image, sendRequest, userId, token, nav])

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			setImage(file)
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	}

	const clickHandler =()=> {
		//setFunnel()
		setaddfunnel(false)
		nav(-1);
	}

	return (
		<div className={`flex flex-col gap-20 items-center w-full ${modal ? "h-auto": "h-[100vh]"} py-16`}>
			{modal && (
				<div className=' w-full px-6 flex justify-end ' >
					<button onClick={()=> clickHandler()} > 
						<svg
							width="12"
							height="12"
							viewBox="0 0 26 26"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
							d="M24.9234 2.7557C25.3871 2.29196 25.3871 1.54007 24.9234 1.07633C24.4596 0.612579 23.7078 0.612579 23.244 1.07633L13.0003 11.32L2.75668 1.07633C2.29293 0.612583 1.54105 0.612583 1.0773 1.07633C0.613555 1.54008 0.613555 2.29196 1.0773 2.75571L11.321 12.9994L1.07735 23.243C0.613598 23.7067 0.613598 24.4586 1.07735 24.9224C1.54109 25.3861 2.29298 25.3861 2.75672 24.9224L13.0003 14.6788L23.244 24.9224C23.7077 25.3861 24.4596 25.3861 24.9233 24.9224C25.3871 24.4586 25.3871 23.7067 24.9233 23.243L14.6797 12.9994L24.9234 2.7557Z"
							fill="black"
							/>
						</svg>
					</button>
				</div>
			)}
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
							className="object-cover w-full object-center h-full rounded-b-full rounded-tl-full"
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
					{/* <div className="flex flex-col gap-8 text-center">
						<p className="text-xl text-chasescrollTextGrey">Mode Type</p>
						<div className="flex gap-10 justify-between items-center text-chasescrollGrey">
							Auto <Toggle className='custom-classname' />
						</div>
						<div className="flex gap-10 justify-between items-center text-chasescrollGrey">
							Request <Toggle className='custom-classname' />
						</div>
					</div> */}
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
				<button className="w-96 rounded-lg text-white text-center text-lg bg-chasescrollBlue p-2.5">
					{loading ? "Loading...": "Submit"}
				</button>
			</form>
		</div >
	)
}

export default CreateCommunity