import PageWrapper from "@/components/PageWrapper"
import { NOTIFICATION_FILTER } from "../../../constants"
import Notification from "../../../components/notifications/Notification"
import Loader from "../../../components/Loader"

const Notifications = () => {
  return (
    <PageWrapper>
      {(notifications, getNotifications, notificationsFilter, filterNotifications) => (
        <div className="flex flex-col justify-center gap-4 w-full h-full px-4 py-8 overflow-auto">
          <div className="flex flex-col gap-4 w-full h-full max-w-2xl self-center">
            <select
              className="outline-none w-80 px-4 py-2 rounded-lg text-sm bg-chasescrollBlue text-white relative"
              onChange={filterNotifications}
            >
              <option value="">All notifications</option>
              {NOTIFICATION_FILTER.map((filter, index) => (
                <option key={index} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            {!notifications?.content && (
              <Loader />
            )}
            {notifications?.content && notifications?.content?.length < 1 && (
              <div className="h-full w-full flex items-center gap-2 font-semibold text-xl justify-center text-chasescrollBlue">
                No <span className="!lowercase">{notificationsFilter}</span> notifications
              </div>
            )}
            {notifications?.content?.map((notification, index) => (
              <Notification
                key={index}
                notification={notification}
                getNotifications={getNotifications}
              />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default Notifications
