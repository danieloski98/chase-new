import React, { useState, useContext, useEffect } from "react"
import { MyConnect, previousPage } from "@/constants"
import { ChevronLeft } from "@/components/Svgs"
import PageWrapper from "@/components/PageWrapper"
import { USER_BLOCKLIST } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"

function BlockUsers() {
  const [blockList, setBlockList] = useState([])
  const [status, setStatus] = useState(false)
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
  console.log(status, checkID)

  const fetchBlockList = async () => {
    const data = await sendRequest(
      USER_BLOCKLIST,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (data) setBlockList(data)
  }

  useEffect(() => {
    fetchBlockList()
  }, [])

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
            {MyConnect.map(({ image, name, email, id }) => (
              <div
                className="flex flex-col sm:flex-row justify-between my-2 py-2 items-center"
                key={id}
              >
                <div className="flex items-center mb-4">
                  <img src={image} alt="user" className="mr-4 w-10 h-10" />
                  <div>
                    <p className="my-0">{name}</p>
                    <p className="my-0 text-xs text-gray-500 cursor-pointer">
                      {email}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className={`px-4 py-2 w-24 rounded text-center bg-opacity-50 text-gray-500 cursor-pointer ${checkID == id ? "bg-red-200" : "bg-blue-100"
                      }`}
                    onClick={() => toggleBlockStatus({ id, name })}
                  >
                    {checkID == id ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default BlockUsers
