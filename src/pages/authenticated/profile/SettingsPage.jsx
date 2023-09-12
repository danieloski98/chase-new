import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SettingsPageList } from "@/constants"
import { ChevronLeft, ChevronRight } from "@/components/Svgs"
import { previousPage } from "@/constants/index"
import ConfirmDelete from "@/pages/authenticated/profile/modals/ConfirmDelete"
import PrivacyPage from "@/pages/authenticated/profile/modals/PrivacyPage"
import { useAuth } from "@/context/authContext"

const SettingsPage = () => {
  const [display, setDisplay] = useState(false)

  const { userId } = useAuth()
  const [showPrivacy, setShowPrivacy] = useState(false)

  const navigate = useNavigate()

  const handleSettingClick = elem => {
    if (elem.type === "Delete Account") {
      setDisplay(state => !state)
    }

    if (elem.type === "Privacy Policy") {
      setShowPrivacy(state => !state)
    }
  }

  //this function is passed to the modal to handle the state of the modal
  const handleStateFromModal = getState => {
    setDisplay(getState)
  }
  const handlePrivacyModalState = getState => {
    setShowPrivacy(getState)
  }

  return (
    <>
      <div className="flex items-center mb-4 py-4 px-4">
        <span
          className="pr-6 text-gray-500 cursor-pointer"
          onClick={() => navigate("/profile/"+userId)}
        >
          {ChevronLeft()}
        </span>
        <p className="text-gray-700 text-xl">Settings</p>
      </div>
      <div className="mb-[80px] px-4">
        {SettingsPageList.map(({ type, id, route, icon }) => {
          if (route?.startsWith('https://')) {
            return (
              <a href={route} key={id}>
            <div
              className={`flex justify-between ${type !== "Delete Account"
                ? " hover:bg-blue-100"
                : "hover:bg-red-100"
                }  hover:bg-opacity-30 items-center`}
              onClick={() => handleSettingClick({ type, id })}
            >
              <div className="flex items-center">
                {type !== "Support & Help" ? (
                  <img src={icon} alt="icon" className="w-4 h-4" />
                ) : null}
                <p
                  className={`pl-2 my-4 text-lg  ${type !== "Delete Account" ? "" : "text-red-500"
                    } cursor-pointer ${type === "Support & Help" ? "text-chasescrollBlue text-sm font-semibold" : "text-gray-500"}`}
                >
                  {type}
                </p>
              </div>
              {type !== "Support & Help" && <span className="pr-4 sm:pr-6 text-gray-500 cursor-pointer">
                <ChevronRight />
              </span>}
            </div>
          </a>
            )
          } else {
            return (
              <Link to={route} key={id}>
            <div
              className={`flex justify-between ${type !== "Delete Account"
                ? " hover:bg-blue-100"
                : "hover:bg-red-100"
                }  hover:bg-opacity-30 items-center`}
              onClick={() => handleSettingClick({ type, id })}
            >
              <div className="flex items-center">
                {type !== "Support & Help" ? (
                  <img src={icon} alt="icon" className="w-4 h-4" />
                ) : null}
                <p
                  className={`pl-2 my-4 text-lg  ${type !== "Delete Account" ? "" : "text-red-500"
                    } cursor-pointer ${type === "Support & Help" ? "text-chasescrollBlue text-sm font-semibold" : "text-gray-500"}`}
                >
                  {type}
                </p>
              </div>
              {type !== "Support & Help" && <span className="pr-4 sm:pr-6 text-gray-500 cursor-pointer">
                <ChevronRight />
              </span>}
            </div>
          </Link>
            )
          }
        })}
      </div>
      {display && <ConfirmDelete handleModalState={handleStateFromModal} />}
      {showPrivacy && (
        <PrivacyPage handlePrivacyModalState={handlePrivacyModalState} />
      )}
    </>
  )
}

export default SettingsPage
