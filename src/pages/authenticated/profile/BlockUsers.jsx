import React, { useState, useContext, useEffect } from "react"
import { MyConnect, previousPage } from "@/constants"
import { ChevronLeft } from "@/components/Svgs"
import PageWrapper from "@/components/PageWrapper"
import { BLOCK_USER, USER_BLOCKLIST } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import UserImages from "../../../components/exploreComponents/sharedComponent/userImages"
import InfiniteScrollerComponent from "../../../hooks/infiniteScrollerComponent"
import { toast } from "react-toastify"
import httpService from "../../../utils/httpService"
import { Spinner } from "@chakra-ui/react"

function BlockUsers() {
  const [blockList, setBlockList] = useState([])
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState("")
  const [checkID, setCheckID] = useState(null)

  const { sendRequest } = useFetch()
  const { token } = useAuth()

  function toggleBlockStatus(obj) {
    MyConnect.map(({ id }) => {
      if (id === obj.id) {
        setStatus(state => !state)
        setCheckID(id)
      }
    })
  } 

  const fetchBlockList = async () => {
    const data = await sendRequest(
      USER_BLOCKLIST,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data){
      console.log(data); 
    }
  }


  const RemoveBlockedUser = async (index) => {
    setLoading(index)
    const data = await sendRequest(
      "/user/delete-block/"+index,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data){
      console.log(data);
      toast.success(data?.message)
       setBlockList([...blockList, index])
    }
    setLoading("")
  } 

  const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({url:USER_BLOCKLIST, limit:10, filter: "id"}) 


  return (
    <PageWrapper>
      {() => (
        <div className="mb-[100px] ">
          <div className="flex items-center mb-4 py-4 px-4">
            <span
              className="pr-6 text-gray-500 cursor-pointer"
              onClick={() => previousPage()}
            >
              {" "}
              {ChevronLeft()}{" "}
            </span>
            <p className="text-gray-700 text-xl">Settings</p>
          </div>
          <div className="px-4 sm:px-6">
            {results.filter((item)=> !blockList.includes(item?.id)).map((item, index) => (
              <div
                className="flex flex-col sm:flex-row justify-between my-2 py-2 items-center"
                key={index} 
                ref={results.length === index + 1 ? ref : null}
              >
                <div className="flex items-center mb-4">
                  {/* <img src={image} alt="user" className="mr-4 w-10 h-10" /> */}

                  <UserImages data={item?.blockObject} size={"[57px]"} font={"[29px]"} />
                  <div className=" ml-3" >
                    <p className="my-0 font-medium ">{item?.blockObject?.firstName+" "+item?.blockObject?.lastName}</p>
                    <p className="my-0 text-xs text-gray-500 cursor-pointer">
                      {item?.blockObject?.email}
                    </p>
                  </div>
                </div>
                <div> 
                  {!blockList.includes(item?.id) && (
                    <button
                      className={`px-4 py-2 rounded text-center bg-opacity-50 text-gray-500 cursor-pointer bg-blue-100`}
                      onClick={() => RemoveBlockedUser(item?.id)}
                    >
                      {loading === item?.id ? "Loading..." : "Unblock"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {(isLoading || isRefetching) && (
              <div className="w-full h-32 flex justify-center items-center">
                <Spinner size='md' color='brand.chasescrollButtonBlue' />
              </div>
            )}
            {!isLoading && results.filter((item)=> !blockList.includes(item?.id)).length <= 0 && (
             <div className=' w-full py-5 flex justify-center font-bold text-2xl ' >
               No Records Found
             </div>
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  )
} 

export default BlockUsers
