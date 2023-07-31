import React from 'react'
import { Link } from 'react-router-dom'
import { PATH_NAMES } from '../../constants/paths.constant'
import { CancelIcon2 } from '../Svgs'
import CONFIG from '../../config'
import Loader from '../Loader'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpService from '../../utils/httpService'
import { toast } from 'react-toastify'
import { GET_GROUP_REQUESTS } from '../../constants/endpoints.constant'
import { useAuth } from '../../context/authContext'

// interface IProps {
//     communities: Array<any>;
//     loading: boolean;
//     hasError: boolean;
// }

const Request = ({ community }) => {
    const queryClient = useQueryClient();

    const approve = useMutation({
        mutationFn: () => httpService.post(`/group/resolve-request`, {
            id: community.id,
            resolve: true,
        }),
        onSuccess: (data) => {
            toast.success('Request approved');
            queryClient.refetchQueries(['getRequests']);
        }
    });

    const decline = useMutation({
        mutationFn: () => httpService.post(`/group/resolve-request`, {
            id: community.id,
            resolve: true,
        }),
        onSuccess: (data) => {
            toast.success('Request declined');
            queryClient.refetchQueries(['getRequests']);
        }
    });
    return (
        <div
        key={community.id}
        className="py-4 flex items-center gap-4 w-full max-w-2xl border-b border-blue-600 border-opacity-40"
      >
        <div className="border-chasescrollBlue border-l-8 rounded-b-full rounded-tl-full">
          <img
            src={community.requested.data.imgMain.value ? `${CONFIG.RESOURCE_URL}/${community.requested.data.imgMain.value}` : `https://ui-avatars.com/api/?background=random&name=${community.data.name}&length=1`}
            alt={community.name}
            className="flex-grow w-24 max-w-[96px] h-24 object-cover border-l-4 border-white rounded-b-full rounded-tl-full"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-3">
            <Link to={`${PATH_NAMES.community}/${community.id}`} className="font-medium text-lg md:text-2xl">
              {community.requested.firstName} {community.requested.lastName}
            </Link>
            <div className="text-sm md:text-base opacity-[50%]">
              {community.requested.username}
            </div>
          </div>

                  <div className="flex items-center ml-24">
              <button
               className="text-xs md:text-sm bg-[#5D70F9] hover:bg-blue-700 text-white font-bold px-4 py-2 md:py-[10px] md:px-[42px] rounded-lg"
                onClick={() => approve.mutate()}
              >
                { approve.isLoading && 'Loading...' }
                { !approve.isLoading && 'Accept' }
              </button>
              <button
                className=" pl-6"
                 onClick={() => decline.mutate()}
              >
                 { !decline.isLoading && <CancelIcon2 /> }
                 { decline.isLoading && 'Loading...' }
               </button>
             </div>
          
        </div>
      </div>
    )
}

function Requests() {
    const handleAcceptRequest = (com: any) => {
        console.log(com);
  }

  const handleDeclineRequest = (com: any) => {
    console.log(com);
  } 

  const {  userId } = useAuth()
  const [requestedCommunities, setRequestedCommunities] = React.useState<any[]>([])

  const getRequests = useQuery(['getRequests', userId], () => httpService.get(`${GET_GROUP_REQUESTS}${userId}`), {
    onSuccess: (data) => {
      setRequestedCommunities(data.data.content)
    }
  });

  if (getRequests.isLoading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Loader />
      </div>
    )
  }

  if (!getRequests.isLoading && getRequests.isError) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className='text-4xl'>An error occured</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center">
      {!getRequests?.isLoading && (
        <> 
          {requestedCommunities?.length < 1 ? (
            <div className="flex h-[80vh] justify-center items-center">
              <p className="text-center text-gray-500 text-[20px] md:text-[48px] whitespace-pre-line max-w-xl">
                You have no requests to join any of your communities
              </p>
            </div>
          ) : (
            <ul>
              {requestedCommunities?.map(community => (
                <Request community={community} />
              ))}
            </ul>
          )}
        </>
      )}
  </div>
  )
}

export default Requests