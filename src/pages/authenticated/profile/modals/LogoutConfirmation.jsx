import React, { useState } from "react"
import OverlayWrapper from "@/components/OverlayWrapper"

const LogoutConfirmation = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(true)

  const toggleMoreOptions = () => setShowMoreOptions(state => !state)

  return (
    <div>
      {showMoreOptions && (
        <OverlayWrapper handleClose={toggleMoreOptions}>
          <div className=" w-full mx-2 sm:w-[350px] border p-4 shadow-lg rounded-xl flex flex-col items-center ">
            <div>
              <h2 className="w-full text-xl text-black px-4 py-2 rounded-lg">
                Logout ?
              </h2>
            </div>
            <p className="text-gray-500 text-center">
              {" "}
              Are you sure you want to logout of your account?
            </p>
            <div className="flex flex-col gap-2 justify-center items-center w-full mt-4">
              <button className="w-full text-lg text-chasescrollButtonBlue px-4 py-2 rounded-lg">
                Logout
              </button>
              <button
                className="w-full  text-gray-500 hover:text-gray-600 px-4 py-2 rounded-lg "
                onClick={toggleMoreOptions}
              >
                Cancel
              </button>
            </div>
          </div>
        </OverlayWrapper>
      )}
    </div>
  )
}

export default LogoutConfirmation
