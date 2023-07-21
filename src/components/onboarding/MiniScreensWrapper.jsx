import PropTypes from "prop-types"
import chasescrollLogo from "@/assets/images/chasescroll-logo-large.png"
import { Spinner } from "@chakra-ui/react"

const MiniScreensWrapper = ({
  children,
  disabled,
  title,
	description,
  action,
  handleClick,
  isLoading
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center gap-5 p-8"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col gap-2 mb-4 items-center">
        <img src={chasescrollLogo} alt="" className="w-36" />
        <h1 className="font-medium text-3xl text-chasescrollBlue text-center">
          {title}
        </h1>
				<p className="text-chasescrollTextGrey text-center">{description}</p>
      </div>
      {children}
      <button
        disabled={disabled}
        onClick={() => handleClick()}
        className={`${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } w-full max-w-sm bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-xl`}
      >
        { !isLoading && action }
        { isLoading && <Spinner color="white" size='md' /> }
      </button>
    </div>
  )
}

MiniScreensWrapper.propTypes = {
  children: PropTypes.element,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.string,
  handleClick: PropTypes.func,
}

export default MiniScreensWrapper
