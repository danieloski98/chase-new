import PropTypes from "prop-types"

const CarouselEvent = ({ image, caption }) => {
  return (
    <div className="flex flex-col mb-6 p-1 w-full">
      <img
        src={image}
        alt=""
        className={`w-full h-80 rounded-tl-[36px] object-cover ${
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
