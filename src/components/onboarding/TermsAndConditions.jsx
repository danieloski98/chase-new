import PropTypes from "prop-types"
import { useEffect } from "react"
import { TERMS_OF_USE } from "@/constants"

const TermsAndConditions = ({ handleClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div
      className="flex flex-col gap-10 px-4 py-10"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        <h1 className="font-medium text-3xl">Terms and Conditions</h1>
        <div className="flex flex-col gap-8 leading-6 text-lg text-chasescrollTextGrey">
          {TERMS_OF_USE.map(terms => (
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">{terms.label}</h3>
              <p>{terms.content}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-chasescrollBlue py-3 w-40 rounded-lg text-lg text-white mx-auto"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  )
}

TermsAndConditions.propTypes = {
  handleClose: PropTypes.func,
}

export default TermsAndConditions
