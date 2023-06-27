import PropTypes from "prop-types"

const OverlayWrapper = ({ children, handleClose }) => {
  const toggleVisibility = event => {
    if (event.target.id === "safe-zone") {
      handleClose()
    }
  }

  return (
    <div
      onClick={toggleVisibility}
      id="safe-zone"
      className="backdrop-blur-md fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
    >
      {children}
    </div>
  )
}

OverlayWrapper.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func,
}

export default OverlayWrapper
