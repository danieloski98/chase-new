import React from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../../../components/PageWrapper'
import ProfilePhoto from '../../../components/ProfilePhoto'
import profilePhoto from "../../../assets/images/avatar.png"
import { CLOSE_ENTITY, EVENTS_ARRAY, PATH_NAMES } from '../../../constants'

const Attendees = () => {
	return (
		<PageWrapper>
			{() => (
				<div className="flex justify-center w-full h-full">
					<div className="flex flex-col gap-4 w-full max-w-2xl p-20 relative">
						<div className="">
							<Link to={PATH_NAMES.explore} className="absolute top-o left-0 p-4">
								{CLOSE_ENTITY}
							</Link>
							<h1 className="text-2xl font-bold text-center">People attending the oscars</h1>
						</div>
						{[1, 2, 3, 4, 5].map(item => (
							<div key={item} className="flex items-center gap-4">
								<ProfilePhoto image={profilePhoto} />
								<div className="flex items-center justify-between w-full text-chasescrollTextGrey">
									<div className="flex flex-col gap-2">
										<p className="font-semibold">Davido</p>
										<small className="text-xs">@davidoofficial</small>
									</div>
									<button className="rounded-lg px-4 py-2 bg-chasescrollPalePurple text-chasescrollDarkBlue">Add</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</PageWrapper>
	)
}

export default Attendees