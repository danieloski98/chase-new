import React, { useEffect, useState } from "react"
import { SECONDARY_NAV } from "@/constants"

const SecondaryNavbar = ({
  handleButtonClick,
  activeComponent,
  postCount,
  networkCount,
  eventCount,
  communityCount,
}) => {
  const [menu, setMenu] = useState()

  useEffect(() => {
    setMenu(SECONDARY_NAV.map((item) => {
      if (item.name === "Posts") {
        return {
          ...item,
          count: postCount
        }
      } else if (item.name === "Network") {
        return {
          ...item,
          count: networkCount
        }
      } else if (item.name === "Events") {
        return {
          ...item,
          count: eventCount
        }
      } else if (item.name === "Communities") {
        return {
          ...item,
          count: communityCount
        }
      }
    }))
  }, [postCount, networkCount, eventCount, communityCount])

  return (
    <div className="grid grid-cols-4 gap-4 justify-center items-end w-full my-3 bg-white h-12 place-items-center">
      {menu?.map(item => (
        <div
          className={`grid place-items-center ${activeComponent == item.type ? "text-blue-500" : "text-gray-500"
            } cursor-pointer min-w-max`}
          key={item.id}
          onClick={() => handleButtonClick(item)}
        >
          <span className="text-xl font-bold">{item.count}</span>
          <item.icon />
          <small>{item.name}</small>
        </div>
      ))}
    </div>
  )
}

export default SecondaryNavbar
