import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import OverlayWrapper from "../OverlayWrapper"
import { isEven } from "@/utils/helpers"
import { REMOVE_POST } from "../../constants/endpoints.constant"
import { useAuth } from "../../context/authContext"
import { useFetch } from "../../hooks/useFetch"
import { PATH_NAMES } from "../../constants"

const ThreadMenu = ({
  handleItemClick,
  toggleMoreOptions,
  threadId,
  postID,
}) => {
  const { sendRequest } = useFetch()
  const { token } = useAuth()

  const deletePost = async () => {
    await sendRequest(`${REMOVE_POST}/${postID}`, "DELETE", null, {
      Authorization: `Bearer ${token}`,
    })
  }

  const HOME_MENU_ACTIONS = [
    {
      key: "share_post",
      label: "Share Post",
      route: PATH_NAMES.share,
    },
    {
      key: "report_user",
      label: "Report User",
      route: PATH_NAMES.report,
    },
    {
      key: "report_content",
      route: PATH_NAMES.report,
      label: "Report Content",
    },
  ]

  return (
    <OverlayWrapper handleClose={toggleMoreOptions}>
      <div className="flex flex-col rounded-lg bg-white text-center w-80 shadow-lg">
        <div className="py-3 cursor-pointer text-red-500" onClick={deletePost}>
          Delete
        </div>
        {HOME_MENU_ACTIONS.map((menuItem, index) => (
          <div
            key={menuItem.key}
            className={`py-3 cursor-pointer border-b border-gray-200 ${
              isEven(index) ? "text-red-500" : "text-black"
            }`}
            onClick={() =>
              handleItemClick(
                menuItem.key,
                menuItem.route,
                threadId,
                menuItem.action
              )
            }
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
  )
}

ThreadMenu.propTypes = {
  handleItemClick: PropTypes.func,
  toggleMoreOptions: PropTypes.func,
  threadId: PropTypes.string,
  postID: PropTypes.string,
}

export default ThreadMenu
