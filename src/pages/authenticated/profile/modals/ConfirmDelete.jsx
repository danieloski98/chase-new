import PropTypes from "prop-types"
import React, { useState } from "react"
import OverlayWrapper from "@/components/OverlayWrapper"
import ConfirmDeleteImage from "@/assets/images/ConfirmDeleteIcon.png"

const ConfirmDelete = ({ handleModalState }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const toggleMoreOptions = () => {
    setShowMoreOptions(state => !state)
    handleModalState(showMoreOptions)
  }

  return (
    <div>
      <OverlayWrapper>
        <div className=" w-full mx-2 sm:w-[350px] border p-4 shadow-lg rounded-xl flex flex-col items-center ">
          <div>
            <img
              src={ConfirmDeleteImage}
              alt="delete"
              className="rounded-full w-24 h-24 mb-2"
            />
          </div>
          <h1 className="text-2xl text-black-700 font-bold text-center">
            Delete Account
          </h1>
          <p className="text-gray-500 text-center">
            {" "}
            Are you sure you want to delete this account? This action cannot be
            undone.
          </p>
          <div className="flex flex-col gap-2 justify-center items-center w-full mt-4">
            <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mr-2">
              Delete
            </button>
            <button
              className="w-full border  text-gray-500 px-4 py-2 rounded-lg "
              onClick={toggleMoreOptions}
            >
              Cancel
            </button>
          </div>
        </div>
      </OverlayWrapper>
    </div>
  )
}

export default ConfirmDelete

ConfirmDelete.propTypes = {
  handleModalState: PropTypes.func,
}
