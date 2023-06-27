import PropTypes from 'prop-types'

const BlurredImage = ({ imageUrl }) => {
	return (
		<div className="rounded-b-[32px] rounded-tl-[32px] h-[330px] relative">
			<img
				src={imageUrl}
				alt="descriptive photograph"
				className="object-cover w-full h-full rounded-b-[32px] rounded-tl-[32px]"
			/>
			<div className="backdrop-blur-sm absolute inset-0 flex justify-center items-center rounded-b-[32px] rounded-tl-[32px] h-[330px]">
				<img
					src={imageUrl}
					alt="Blurred Image"
					className="max-h-full max-w-full rounded-b-[16px] rounded-tl-[16px]"
				/>
			</div>
		</div>
	);
};

export default BlurredImage;

BlurredImage.propTypes = {
	imageUrl: PropTypes.string
}