import React from "react"
import CONFIG from "../../../config"

const SecondaryCommunity = ({ communities }) => {
  return (
    <div className="mb-[100px] flex flex-col gap-4 items-center">
      {communities?.content?.map(community => (
        <div
          className="flex flex-col items-start p-4 bg-white shadow-md border rounded-b-[32px] rounded-tl-[32px] w-full max-w-xl"
          key={community.id}
        >
          <div className=" flex flex-row gap-4 md:gap-8 w-full items-center mb-2">
            <div className="overflow-hidden border-l-2 border-chasescrollBlue rounded-l-full">
              <img
                src={`${CONFIG.RESOURCE_URL}${community.data.imgSrc}`}
                alt="descriptive photograph"
                className="rounded-b-full rounded-tl-full w-20 h-20 border-l-2 border-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-left">{community.data.name}</h2>
              <div className="flex">
                <p className="text-gray-600 text-sm">{community.data.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SecondaryCommunity
