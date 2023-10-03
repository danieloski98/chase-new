// import React from 'react'
import { SEND_FRIEND_REQUEST } from '../../../../../../constants/endpoints.constant'
import httpService from '../../../../../../utils/httpService'
import { AddProfileIcon } from '../../../../../../components/Svgs'
import { toast } from 'react-toastify'

interface Props { 
    data: any,
    userBy: any
}

function AddFriends(props: Props) {
    const { data, userBy } = props


  
  const friendPerson = async () => { 
    const response = await httpService.post(SEND_FRIEND_REQUEST, { toUserID: userBy },)
    if (response) {
        toast.success(data.message);  
    }
  }   

    return (
        <> 
            {data?.createdBy?.joinStatus !== "CONNECTED" && (
                <button onClick={friendPerson} className="p-2">
                    <AddProfileIcon />
                </button>
            )}
            {data?.createdBy?.joinStatus === "CONNECTED" && (
                <p className=" text-chasescrollBlue font-bold " >Connected</p>
            )}
            {data?.createdBy?.joinStatus === "FRIEND_REQUEST_SENT" && (
                <p className=" text-chasescrollBlue font-bold " >Pending</p>
            )}
        </>
    )
}

export default AddFriends
