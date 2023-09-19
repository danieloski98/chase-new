import PageWrapper from "@/components/PageWrapper"
import { NOTIFICATION_FILTER } from "../../../constants"
import Notification from "../../../components/notifications/Notification"
import Loader from "../../../components/Loader"
import React from "react"
import MyNetwork from "../profile/MyNetwork"
import SecondaryCommunity from "../profile/SecondaryCommunity"
import { useNavigate } from "react-router-dom"
import Requests from "../../../components/communities/Requests"
import useInfinteScroller from "../../../hooks/useInfinteScroller"
import { Spinner } from "@chakra-ui/react"
import InfiniteScrollerComponent from "../../../hooks/infiniteScrollerComponent"
import httpService from "../../../utils/httpService"
import { useQuery } from 'react-query';
import lodash from "lodash"


const Notifications = () => {

	const [show, setShow] = React.useState(false)
	const [type, setType] = React.useState("") 
  const [notification, setNotification] = React.useState([]);
  const [notificationType, setNotificationType] = React.useState('')
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [prevPageNumber, setPrevPageNuber] = React.useState(0);
  const intObserver = React.useRef();

  const clickHandler =()=> {
    setShow((prev)=> !prev)
  }

  const noti = useQuery(['getNotiications', notificationType, pageNumber], () => httpService.get('/notifications/notification', {
    params: {
      status: notificationType,
      page: pageNumber,
    }
  }), {
    onError: (error) => {
      console.log('An error occured')
    },
    onSuccess: (data) => {
      const arr = [...notification, ...data.data.content];
      setHasNextPage(data.data.last ? false:true);
      setNotification(lodash.uniq(arr));
    }
  })

  const lastChildRef = React.useCallback((post) => {
    if (noti.isLoading) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPageNumber(prev => prev + 1); 
      }
    });
    if (post) intObserver.current.observe(post);
   }, [noti.isLoading, hasNextPage]);

   const handleFilterChange = React.useCallback((e) => {
    setNotificationType(e);
    setPageNumber(0)
    setNotification([]);
   }, [])


  return (
    <PageWrapper>
      {(notifications, getNotifications, notificationsFilter, filterNotifications) => (
        <div className="flex flex-col relative justify-center gap-4 w-full px-4 py-8 overflow-x-hidden overflow-y-auto pb-[100px]">
          {!show && (
            <div className="flex flex-col gap-4 w-full h-full max-w-2xl self-center">
              <select
                className="outline-none w-80 px-4 py-2 rounded-lg text-sm bg-chasescrollBlue text-white relative"
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                {NOTIFICATION_FILTER.map((filter, index) => (
                  <option key={index} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
              {/* {isLoading && (
                <Loader />
              )} */}
              {!noti.isLoading && notification.length < 1 && (
                <div className="h-full w-full flex items-center gap-2 font-semibold text-xl justify-center text-chasescrollBlue">
                  No <span className="!lowercase">{notificationsFilter}</span> notifications
                </div>
              )}
              {notification?.map((notif, index) => { 
                if (index === notification?.length  - 1) {
                  return(
                    <Notification
                      key={index}
                      ref={lastChildRef}
                      notification={notif}
                      getNotifications={getNotifications}
                      setShow={clickHandler} 
                      setType={setType}
                    />
                  )
                  } else {
                    return(
                      <Notification
                        key={index}
                        notification={notif}
                        getNotifications={getNotifications}
                        setShow={clickHandler} 
                        setType={setType}
                      />
                    )
                  }
              })}
              {( noti.isLoading || noti.isRefetching) && (
                <div className="w-full h-20 flex justify-center items-center">
                  <Spinner size='md' color='brand.chasescrollButtonBlue' />
                </div>
              )}
            </div>
          )}
          {show && (
            <div className="flex flex-col relative gap-4 w-full h-full max-w-2xl self-center">
              <div className=' w-full px-6 flex absolute top-0 justify-end ' >
                {/* <button onClick={()=> setShow(false)} > 
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                    d="M24.9234 2.7557C25.3871 2.29196 25.3871 1.54007 24.9234 1.07633C24.4596 0.612579 23.7078 0.612579 23.244 1.07633L13.0003 11.32L2.75668 1.07633C2.29293 0.612583 1.54105 0.612583 1.0773 1.07633C0.613555 1.54008 0.613555 2.29196 1.0773 2.75571L11.321 12.9994L1.07735 23.243C0.613598 23.7067 0.613598 24.4586 1.07735 24.9224C1.54109 25.3861 2.29298 25.3861 2.75672 24.9224L13.0003 14.6788L23.244 24.9224C23.7077 25.3861 24.4596 25.3861 24.9233 24.9224C25.3871 24.4586 25.3871 23.7067 24.9233 23.243L14.6797 12.9994L24.9234 2.7557Z"
                    fill="black"
                    />
                  </svg>
                </button> */}
              </div>
              {(type === "Friend Request Accepted") && ( 
                <MyNetwork active={"Requests"} />
              )}
              {(type === "Friend Request") && ( 
                <MyNetwork active={"Requests"} />
              )}
              {(type === "Join Request Accepted") && ( 
                <MyNetwork active={"Requests"} />
              )}
              {(type === "Group Invite") && ( 
                <Requests />
              )}
              {(type === "Group Join Request") && ( 
                <Requests />
              )}
              {/* {type === "New message" && ( 
                navigate("/message") 
              )}  */}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

export default Notifications
