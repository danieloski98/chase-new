import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"
import chasescrollLogo from "@/assets/images/chasescroll-logo.png"
import avatar from "@/assets/svg/bitmoji-profile-avatar.svg"
import caretDown from "@/assets/svg/caret-down.svg"
import { NAVIGATION_ROUTES } from "@/constants/routes.constant"
import { AddIcon, PowerIcon, ExploreSearchIcon } from "./Svgs"
import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react"
import { NOTIFICATIONS } from "../constants/endpoints.constant"
import { useFetch } from "../hooks/useFetch"
import { PATH_NAMES } from "@/constants/paths.constant"
import LogoutModal from "./LogoutModal"

const PageWrapper = ({ children, toggleFileUploader }) => {
  const location = useLocation()
  const isExplorePage = location.pathname.includes("/explore")
  const [showLogout, setShowLogout] = useState(false); 

  const { logout, userId } = useAuth()

  const [notifications, setNotifications] = useState()
  const [notificationsFilter, setNotificationsFilter] = useState("")
  const { token, setSearchValue, searchValue } = useAuth()
  const { sendRequest } = useFetch()

  const getNotifications = async () => {
    const notifications = await sendRequest(
      `${NOTIFICATIONS}${notificationsFilter ? `?status=${notificationsFilter}` : ''}`,
      'GET',
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (notifications) setNotifications(notifications)
  }

  const filterNotifications = (event) => {
    setNotificationsFilter(event.target.value)
  }

  useEffect(() => {
    getNotifications()
  }, [notificationsFilter])

  return (
    <div
      className="flex flex-col relative h-full pt-[69px] md:pt-[97px] overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="flex justify-between items-center py-5 px-4 md:px-10 border-b border-gray-100 absolute top-0 left-0 w-full text-chasescrollDarkBlue bg-white">
        <div className="hidden lg:flex lg:gap-40">
          <img
            src={chasescrollLogo}
            alt=""
            className="w-14 hidden md:inline-block"
          />
          {isExplorePage && (
            <div className="hidden lg:flex">
              <Link to={PATH_NAMES.SearchExplore}>
                <div className="relative text-gray-400 border border-[#5D70F9] rounded-lg px-2 pr-20">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 pr-2">
                    <ExploreSearchIcon />
                  </span>
                  <input
                    value={searchValue}
                    onChange={(e)=> setSearchValue(e.target.value)}
                    className=" bg-white focus:outline-none focus:ring-0 font-medium text-sm placeholder-gray-500 pl-6 pr-3 py-2 "
                    type="text"
                    placeholder="Search for users, event or ..."
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
        {/* <div className="md:flex items-center gap-3 hidden">
          <img src={avatar} alt="" className="w-10" />
          <img src={caretDown} alt="" className="w-3 cursor-pointer" />
        </div> */}
        <h1 className="inline-block md:hidden font-bold text-lg">
          Chasescroll
        </h1>
        <div className="md:hidden flex gap-5 items-center w-fit">
          <span onClick={toggleFileUploader}>
            <AddIcon />
          </span>

          {NAVIGATION_ROUTES.filter(({ forMobile }) => forMobile).map(
            navLink => (
              <Link
                className="flex items-center gap-5 cursor-pointer font-bold"
                key={navLink.label}
                to={navLink.path}
              >
                <span className="">
                  <navLink.icon />
                </span>
              </Link>
            )
          )}
          <button onClick={logout} className="text-red-600 hover:text-slate-50">
            <PowerIcon />
          </button>
        </div>
      </div>
      <div className="fixed z-[100]  w-full bottom-0 left-0 right-0 md:hidden bg-white border-t border-opacity-10">
        <div className="flex gap-6 w-full justify-center p-4">
          {NAVIGATION_ROUTES.filter(({ withMobile }) => withMobile).map(
            navLink => (
              <Link
                className={`flex items-center gap-4 px-3 py-2.5 text-chasescrollGrey cursor-pointer font-bold ${window.location.pathname.includes(navLink.path)
                  ? "bg-chasescrollDarkBlue rounded-b-full rounded-tl-full text-white"
                  : ""
                  }`}
                key={navLink.label}
                to={
                  navLink.label === "Profile"
                    ? `${navLink.path}/${userId}`
                    : navLink.path
                }
              >
                <span className="">
                  <navLink.icon />
                </span>
              </Link>
            )
          )}
        </div>
      </div>
      <div className="md:flex w-full h-full">
        <div className="md:flex h-full hidden flex-col justify-between md:w-[320px] border-r border-gray-100 py-5 bg-white">
          <div className="flex flex-col overflow-auto">
            {NAVIGATION_ROUTES.map(navLink => (
              <Link
                className={`flex items-center gap-4 py-5 px-10 text-chasescrollGrey cursor-pointer font-bold hover:bg-slate-50 ${window.location.pathname.includes(navLink.path)
                  ? "text-chasescrollPurple"
                  : ""
                  }`}
                key={navLink.label}
                to={
                  navLink.label === "Profile"
                    ? `${navLink.path}/${userId}`
                    : navLink.path
                }
              >
                <span className="">
                  <navLink.icon />
                </span>
                <span className="flex items-center gap-4">
                  {navLink.label}
                  {navLink.label === "Notifications" && notifications?.content && (
                    <span className="text-white bg-chasescrollBlue rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {notifications?.content?.filter(notification => notification.status === "UNREAD").length}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
          <button onClick={() => setShowLogout(true)} className="mt-auto flex gap-4 py-5 px-10 text-chasescrollGrey cursor-pointer font-bold hover:bg-slate-50">
            <span className="">
              <PowerIcon />
            </span>
            <span>Logout</span>
          </button>
        </div>
        <div className="overflow-auto w-full flex flex-col h-full">
          {children(notifications, getNotifications, notificationsFilter, filterNotifications)}
        </div>
      </div>

      {showLogout && (
        <LogoutModal handleClose={() => setShowLogout(false)} logout={logout}  />
      )}
    </div>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.func,
  toggleFileUploader: PropTypes.func,
}

export default PageWrapper
