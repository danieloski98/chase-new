import PropTypes from "prop-types"

const CarouselEvent = ({ image, caption }) => {
  return (
    <div className="flex flex-col mb-6 p-1 pb-0 w-full relative mx-4 ">

			<div className="backdrop-blur-sm absolute inset-0 px-3 flex justify-center items-center rounded-tl-[32px] h-80">
				<img
					src={image}
					alt="Blurred Image"
					className="h-80 blur-md w-full object-cover mx-2 rounded-tl-[16px]"
				/>
			</div>
      <img
        src={image}
        alt=""
        className={`w-full h-80 z-30 rounded-tl-[36px] object-contain ${
          !caption ? "rounded-b-[36px]" : ""
        }`}
      />
      {caption && (
        <p className="text-center font-bold w-full h-4/5  bg-chasescrollBlue text-white p-2 rounded-b-[36px]">
          {caption}
        </p>
      )}
    </div>
  )
}

CarouselEvent.propTypes = {
  image: PropTypes.node,
  caption: PropTypes.string,
}

export default CarouselEvent
