import React from "react"
import CONFIG from "../../../config"
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@chakra-ui/react'
import { GET_JOINED_GROUPS } from "../../../constants/endpoints.constant"
import { useFetch } from "../../../hooks/useFetch"
import { useAuth } from "../../../context/authContext"
import Loader from "../../../components/Loader"
import useInfinteScroller from "../../../hooks/useInfinteScroller"

const SecondaryCommunity = (
  props
) => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = React.useState(true)
  const [communities, setCommunities] = React.useState([])

  const { userId } = useParams()
  const { token, userId: currentUserId } = useAuth()
 
  const self = userId === currentUserId
  const { sendRequest } = useFetch()


  // const fetchCommunities = async () => {
  //   const data = await sendRequest(
  //     `${GET_JOINED_GROUPS}?userID=${props?.active ? currentUserId : userId}`,
  //     "GET",
  //     null,
  //     { Authorization: `Bearer ${token}` }
  //   )
  //   if (data) {setCommunities(data)
  //     setIsLoading(false)
  //   }
  // }

  // React.useEffect(()=> {
  //   fetchCommunities()
  // }, [])

  const [page, setPage] = React.useState(0) 

  const { results, isLoading, lastChildRef, data } = useInfinteScroller({url:`/group/joined-groups?userID=${props?.active ? currentUserId : userId}`, pageNumber:page, setPageNumber:setPage})

  return (
    <div className="mb-[100px] flex flex-col gap-4 items-center">

      {isLoading && (
        <> 
          {props?.active && ( 
            <div className=" w-full py-6 flex justify-center " >
                <Loader />
            </div>
          )}
        </>
      )}
      {!isLoading && (
        <>
          {results?.map((community, i) => {

            if (results.length === i + 1) {
              return (
                <div
                ref={lastChildRef}
                  className="flex flex-col items-start p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full max-w-xl"
                  key={community.id}
                >
                  <div className=" flex flex-row gap-4 md:gap-8 w-full items-center mb-2">
                    <div className=" border-l-2 border-chasescrollBlue rounded-l-full">
                      {/* <img
                        src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                        alt="descriptive photograph"
                        className="rounded-b-full rounded-tl-full w-20 h-20 border-l-2 border-white"
                      /> */}
                      <Avatar 
                        src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                        name={community.data.name}
                        size='xl'
                        className="cursor-pointer rounded-b-full rounded-tl-full w-20 h-20 border-l-2 border-white"
                        title={`${community.data.name}`}
                        onClick={() => navigate(`/communities/community/${community.id}`)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 
                      onClick={() => navigate(`/communities/community/${community.id}`)}
                      className="text-2xl font-medium text-left cursor-pointer">{community.data.name}</h2>
                      <div className="flex">
                        <p className="text-gray-600 text-sm">{community.data.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } else{
              return (
                <div
                  className="flex flex-col items-start p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full max-w-xl"
                  key={community.id}
                >
                  <div className=" flex flex-row gap-4 md:gap-8 w-full items-center mb-2">
                    <div className=" border-l-2 border-chasescrollBlue rounded-l-full">
                      {/* <img
                        src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                        alt="descriptive photograph"
                        className="rounded-b-full rounded-tl-full w-20 h-20 border-l-2 border-white"
                      /> */}
                      <Avatar 
                        src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                        name={community.data.name}
                        size='xl'
                        className="cursor-pointer rounded-b-full rounded-tl-full w-20 h-20 border-l-2 border-white"
                        title={`${community.data.name}`}
                        onClick={() => navigate(`/communities/community/${community.id}`)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 
                      onClick={() => navigate(`/communities/community/${community.id}`)}
                      className="text-2xl font-medium text-left cursor-pointer">{community.data.name}</h2>
                      <div className="flex">
                        <p className="text-gray-600 text-sm">{community.data.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </>
      )}
    </div>
  )
}

export default SecondaryCommunity
