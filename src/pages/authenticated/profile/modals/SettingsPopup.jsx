import PropTypes from "prop-types"
import React from "react"
import { useNavigate } from "react-router-dom"
import OverlayWrapper from "@/components/OverlayWrapper"
import { Options } from "@/constants/index"

export const SettingsOptionPopup = ({ handleShowOptions }) => {
  const navigate = useNavigate()

  const handleItemClick = Label => {
    Options.map(({ route, label }) => {
      label === Label && navigate(route)
    })
  }

  const toggleMoreOptions = () => handleShowOptions(state => !state)

  return (
    <div>
      <OverlayWrapper>
        <div className="relative z-50 flex flex-col rounded-lg bg-white text-center w-80 shadow-lg">
          {Options.map((menuItem, index) => (
            <div
              key={menuItem.key}
              className={`py-3 cursor-pointer border-b border-gray-200 ${
                index % 2 !== 0 ? "text-red-500" : "text-black"
              }`}
              onClick={() => handleItemClick(menuItem.label)}
            >
              {menuItem.label}
            </div>
          ))}
          <div
            className="py-3 cursor-pointer text-red-500"
            onClick={toggleMoreOptions}
          >
            Cancel
          </div>
        </div>
      </OverlayWrapper>
    </div>
  )
}

SettingsOptionPopup.propTypes = {
  handleShowOptions: PropTypes.func,
}
