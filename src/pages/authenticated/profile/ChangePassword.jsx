import React, { useState } from "react"
import chasescrollLogo from "@/assets/images/chasescroll-logo.png"
import { ChevronLeft } from "@/components/Svgs"
import PageWrapper from "@/components/PageWrapper"
import { previousPage } from "@/constants/index"
import { CHANGE_PASSWORD } from "../../../constants/endpoints.constant"
import { useFetch } from "../../../hooks/useFetch"
import ButtonSpinner from "../../../components/ButtonSpinners"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import httpService from "../../../utils/httpService"
import { Spinner, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FiEye, FiEyeOff } from "react-icons/fi"


function ChangePassword() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [oldShow, setOldShow] = React.useState(false);
  const [newShow, setNewShow] = React.useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails(info => ({
      ...info,
      [name]: value,
    }))
  }
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => httpService.put(`${CHANGE_PASSWORD}`, data),
    onSuccess: (data) => {
      toast.success('Password changed successfully!');
      navigate(-1);
    },
    onError: () => {
      toast.error(`An error occured`);
    }
  });

  const changePassword = React.useCallback((e) => {
    e.preventDefault();
    if (userDetails.oldPassword === "" || userDetails.newPassword === "") {
      toast.error('All fields are required');
      return;
    }
    if (userDetails.oldPassword === userDetails.newPassword) {
      toast.error('Old password and new password cannot be same');
      return;
    }
    if ((userDetails.oldPassword?.length < 8 || userDetails.newPassword?.length < 8)) {
      toast.error('Password must be more than 8 character');
      return;
    }
    const obj = {
      oldPassword: userDetails.oldPassword,
      newPassword: userDetails.newPassword,
    }
    mutate(obj);
  }, [mutate, userDetails.newPassword, userDetails.oldPassword]);

  return (
    <PageWrapper>
      {() => (
        <div className=" w-full flex flex-col p-4 bg-white">
          <div className="flex  w-full h-full mb-4 p-2 ">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {ChevronLeft()}{" "}
            </span>
            <p className="text-gray-600 text-lg">Change Password</p>
          </div>
          <div className="flex pt-0 justify-center w-full h-[70vh]">
            <form onSubmit={changePassword} className="w-full sm:w-1/2 overflow-auto">
              <div className="flex flex-col justify-center items-center mb-6">
                <img
                  src={chasescrollLogo}
                  alt="Profile Image"
                  className="w-1/4 h-25 sm:rounded-b-[32px] sm:rounded-tl-[32px]"
                />
                <span className="text-blue-800 text-lg">Chasescroll</span>
              </div>
              <div className="mb-4">
                <InputGroup>
                  <InputRightElement>
                    { !oldShow && <FiEye fontSize='20px' onClick={() => setOldShow(prev => !prev)} /> }
                    { oldShow && <FiEyeOff fontSize='20px' onClick={() => setOldShow(prev => !prev)} />}
                  </InputRightElement>
                  <input
                    type={oldShow ? 'text':"password"}
                    id="name"
                    name="oldPassword"
                    value={userDetails.oldPassword}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    placeholder="Old Password"
                  />
                </InputGroup>
                {userDetails?.oldPassword?.length > 0 && (
                  <> 
                    {userDetails.oldPassword?.length < 8 && (
                      <p className=" text-xs text-red-600 mt-1 " >Password must be more than 8 character</p>
                    )}
                  </>
                )}
              </div>
              <div className="mb-4">
                <InputGroup>
                  <InputRightElement>
                    { !newShow && <FiEye fontSize='20px' onClick={() => setNewShow(prev => !prev)} /> }
                    { newShow && <FiEyeOff fontSize='20px' onClick={() => setNewShow(prev => !prev)} />}
                  </InputRightElement>
                  <Input
                    type={newShow ? 'text':"password"}
                    name="newPassword"
                    value={userDetails.newPassword}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 rounded-lg w-full"
                    placeholder="New Password"
                  />
                </InputGroup>
                {userDetails?.newPassword?.length > 0 && (
                  <> 
                    {userDetails.newPassword?.length < 8  && (
                      <p className=" text-xs text-red-600 mt-1 " >Password must be more than 8 character</p>
                    )}
                  </>
                )}
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={(userDetails.oldPassword?.length < 8 || userDetails.newPassword?.length < 8) ? true : false}
                  className="w-full bg-chasescrollBlue border disabled:opacity-25 border-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {isLoading ? <Spinner />: "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default ChangePassword
