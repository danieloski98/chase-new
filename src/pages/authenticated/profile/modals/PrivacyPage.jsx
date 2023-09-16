import React, { useState } from "react"
import OverlayWrapper from "@/components/OverlayWrapper"
import { ChevronLeft } from "@/components/Svgs"
import { previousPage } from "@/constants/index"
import Settings from "../../settings"
import { useMutation, useQuery, useQueryClient } from "react-query"
import httpService from "@/utils/httpService"
import { GET_USER_PUBLIC_PROFILE, UPDATE_PROFILE } from "@/constants/endpoints.constant"
import { toast } from "react-toastify"
import { useAuth } from "@/context/authContext"
import Loader from "@/components/Loader"
import { Flex } from "@chakra-ui/react"

const PrivacyPage = () => {
  const { userId } = useAuth();
  const [showMoreOptions, setShowMoreOptions] = useState(true);
  const [isPrivate, setIsPrivate] = React.useState();
  const queryClient = useQueryClient()

  const { isLoading } = useQuery(['getPublicProfile', userId], () => httpService.get(`${GET_USER_PUBLIC_PROFILE}/${userId}`), {
    onSuccess: (data) => {
      console.log(data.data);
      setIsPrivate(data?.data?.publicProfile === false ? true:false);
    }
  })

  const toggleMoreOptions = () => setShowMoreOptions(state => !state);

  const { mutate, isLoading: updating } = useMutation({
    mutationFn: (data) => httpService.put(`${UPDATE_PROFILE}`, data),
    onSuccess: (data) => {
      toast.success('Account privacy updated');
      queryClient.invalidateQueries(['getPublicProfile']);
    },
    onError: (error) => {
      toast.success('An error occured while updating the privacy, please try again later')
    }
  })

  if (isLoading || updating) {
    return (
     <Flex width='100%' height={'100%'} justifyItems={'center'} alignItems={'center'} padding='20px'>
       <Loader />
     </Flex>
    )
  }
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
            <p className="text-md font-sans text-gray-400 mt-3">Your account is currently { isPrivate ? 'Private':'Public'}</p>
            <form className="w-full max-w-lg overflow-auto">
              <div className=" mb-4 flex flex-col gap-4">
                <label
                  htmlFor="Public"
                  className="border border-gray-400 p-2 flex justify-between rounded-lg w-full"
                >
                  <span className="text-gray-400">Public</span>
                  <input
                    onChange={() => mutate({ publicProfile: true })}
                    type="radio"
                    id="Public"
                    name="privacy"
                    className="border border-r-red-400 pr-2 rounded-lg"
                    checked={!isPrivate}
                  />
                </label>
                <label
                  htmlFor="private"
                  className="border border-gray-400 p-2 flex justify-between rounded-lg w-full"
                >
                  <span className="text-gray-400">Private</span>
                  <input
                    onChange={() => mutate({ publicProfile: false })}
                    type="radio"
                    id="private"
                    name="privacy"
                    className="border border-r-red-400 pr-2 rounded-lg"
                    checked={isPrivate}
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
