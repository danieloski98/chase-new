import React, { useState } from "react"
import OverlayWrapper from "@/components/OverlayWrapper"
import SuccessIcon from "@/assets/images/suggestion-success-icon.png"

const AppreciationPrompt = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(true)

  const toggleMoreOptions = () => setShowMoreOptions(state => !state)

  return (
    <div>
      {showMoreOptions && (
        <OverlayWrapper handleClose={toggleMoreOptions}>
          <div className=" w-full bg-white mx-2 sm:w-[350px] border p-4 shadow-lg rounded-xl flex flex-col items-center ">
            <div>
              <img
                src={SuccessIcon}
                alt="success"
                className="rounded-full w-24 h-24 mb-2"
              />
            </div>
            <h1 className="text-2xl text-black-700 font-bold text-center">
              Thanks for Suggesting
            </h1>
            <p className="text-gray-500 text-center">
              {" "}
              Your request is being processed.
            </p>
            <div className="flex flex-col gap-2 justify-center items-center w-full mt-4">
              <button
                className="w-full text-chasescrollButtonBlue px-4 py-2 rounded-lg "
                onClick={toggleMoreOptions}
              >
                Close
              </button>
            </div>
          </div>
        </OverlayWrapper>
      )}
    </div>
  )
}

export default AppreciationPrompt
