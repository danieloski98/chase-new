import React, { useState } from "react"
import OverlayWrapper from "@/components/OverlayWrapper"
import { ChevronLeft } from "@/components/Svgs"
import { previousPage } from "@/constants/index"
import Settings from "../../settings"

const PrivacyPage = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(true)

  const toggleMoreOptions = () => setShowMoreOptions(state => !state)

  return (
    <div>
      <Settings />
      {showMoreOptions && (
        <OverlayWrapper handleClose={toggleMoreOptions}>
          <div className=" w-full pt-20  h-full items-center flex flex-col gap-8 p-4">
            <div className="flex items-center w-full max-w-lg  mb-4 p-2 -ml-8">
              <span
                className="pr-6 text-gray-500 cursor-pointer"
                onClick={() => previousPage()}
              >
                {ChevronLeft()}
              </span>
              <p className="text-gray-600 text-lg font-bold">Account Settings</p>
            </div>
            <form className="w-full max-w-lg overflow-auto">
              <div className=" mb-4 flex flex-col gap-4">
                <label
                  htmlFor="Public"
                  className="border border-gray-400 p-2 flex justify-between rounded-lg w-full"
                >
                  <span className="text-gray-400">Public</span>
                  <input
                    type="radio"
                    id="Public"
                    name="privacy"
                    className="border border-r-red-400 pr-2 rounded-lg"
                  />
                </label>
                <label
                  htmlFor="private"
                  className="border border-gray-400 p-2 flex justify-between rounded-lg w-full"
                >
                  <span className="text-gray-400">Private</span>
                  <input
                    type="radio"
                    id="private"
                    name="privacy"
                    className="border border-r-red-400 pr-2 rounded-lg"
                  />
                </label>
              </div>
            </form>
          </div>
        </OverlayWrapper>
      )}
    </div>
  )
}

export default PrivacyPage
