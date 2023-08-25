import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import OverlayWrapper from "../OverlayWrapper"
import { isEven } from "@/utils/helpers"
import { REMOVE_POST } from "../../constants/endpoints.constant"
import { useAuth } from "../../context/authContext"
import { useFetch } from "../../hooks/useFetch"
import { PATH_NAMES } from "../../constants/paths.constant"
import { useMutation, useQueryClient } from "react-query"
import httpService from "@/utils/httpService"
import { toast } from "react-toastify"

const ThreadMenu = ({
  handleItemClick,
  toggleMoreOptions,
  threadId,
  postID,
  userId,
  creatorId,
  refresh
}) => {
  const { sendRequest } = useFetch()
  const { token, userId: id } = useAuth()

  console.log(`posterID ${creatorId}, myID ${id}`);

  // queryClient
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => httpService.delete(`${REMOVE_POST}/${postID}`),
    onSuccess: () => {
      console.log(`this is the postID ${postID}`);
      toast.success(`Post deleted`);
      toggleMoreOptions(false)
      refresh(postID);
    }
  })


  const HOME_MENU_ACTIONS = [
    // {
    //   key: "share_post",
    //   label: "Share Post",
    //   route: PATH_NAMES.share,
    // },
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
        {
          id === creatorId && (
            <div className="py-3 cursor-pointer text-red-500" onClick={mutate}>
            { isLoading && <>Deleting...</> }
            { !isLoading &&  'Delete' }
            </div>
          )
        }
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
