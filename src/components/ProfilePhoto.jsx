import PropTypes from "prop-types"

const ProfilePhoto = ({ image }) => (
  <img
    src={image}
    alt="descriptive photograph"
    className="object-cover w-11 h-11 rounded-tl-full rounded-b-full border-2 border-chasescrollBlue"
  />
)

ProfilePhoto.propTypes = {
  image: PropTypes.node,
}

export default ProfilePhoto
