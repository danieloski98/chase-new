import PropTypes from 'prop-types'
import React from 'react';
import CONFIG from '../config';
import { isEven } from '../utils/helpers';

const PhotoGallery = ({ images }) => {
	return (
		<div className="flex gap-0.5 w-full">
			{images.map((imageUrl, index) => (
				<img
					key={index}
					src={`${CONFIG.RESOURCE_URL}/${imageUrl}`}
					alt={`Image ${index + 1}`}
					className="h-52 w-1/2 object-cover basis-1/2 rounded-md"
				/>
			))}
		</div>
	);
};

export default PhotoGallery;


PhotoGallery.propTypes = {
	imageUrl: PropTypes.arrayOf(PropTypes.string)
}