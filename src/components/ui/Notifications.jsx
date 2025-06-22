import NotificationMenu from "./NotificationMenu";
import { format, isToday, isYesterday, parseISO, subDays } from "date-fns";
import {
  BellIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Spinner from "./Spinner";
import { MeterIcon } from "../../utils/Icons";
import { useNotifications } from "../../features/notifications/useNotifications";
import { useReadNotifications } from "../../features/notifications/useReadNotifications";
import { useAuth } from "../../features/auth/useAuth";

function groupByDate(notifications) {
  const grouped = {};

  notifications?.forEach((notif) => {
    const date = parseISO(notif.createdAt);
    let label = format(date, "PPP");
    if (isToday(date)) label = "Today";
    else if (isYesterday(date)) label = "Yesterday";

    if (!grouped[label]) grouped[label] = { label, date, items: [] };
    grouped[label].items.push(notif);
  });

  return Object.values(grouped).sort((a, b) => b.date - a.date);
}

const iconTypes = {
  confirmation: <CheckIcon className="size-6" />,
  cancelled: <NoSymbolIcon className="size-6" />,
  uv: <MeterIcon />,
  alarm: <ExclamationTriangleIcon className="size-6" />,
};

export default function Notifications() {
  const { notifications, isLoading, error } = useNotifications();
  const { isRead, markAsRead, markAllAsRead } = useReadNotifications();

  // logic for filtering notifications by user

  // const { user } = useAuth();
  // const filteredNotifications = notifications?.filter(
  //   (n) => n.userId === user._id
  // );

  const notificationsWithStatus = notifications?.map((n) => ({
    ...n,
    read: isRead(n._id),
  }));

  const groupedNotifications = groupByDate(notificationsWithStatus);

  return (
    <NotificationMenu>
      <NotificationMenu.Menu>
        <NotificationMenu.Toggle
          id="notif"
          count={notificationsWithStatus?.filter((n) => !n.read).length}
        />
        <NotificationMenu.List
          id="notif"
          ActionButton={
            notificationsWithStatus?.some((n) => !n.read) && (
              <button
                onClick={() =>
                  markAllAsRead(notificationsWithStatus.map((n) => n._id))
                }
                className="cursor-pointer text-xs text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )
          }
          //   onLoadMore={() => {}}
        >
          {!notificationsWithStatus?.length && !isLoading && !error ? (
            <li className="p-4 text-center text-sm text-gray-500">
              No notifications available
            </li>
          ) : isLoading ? (
            <li className="p-4 text-center text-sm text-gray-500">
              <Spinner color="#6a7282" />
              Loading notifications...
            </li>
          ) : error ? (
            <li className="p-4 text-center text-sm text-gray-500">
              Error loading notifications: {error.message}
            </li>
          ) : (
            <>
              {groupedNotifications.map(({ label, items }) => (
                <li key={label}>
                  <div className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500">
                    {label}
                  </div>
                  <ul className="space-y-2">
                    {items.map((notif) => (
                      <NotificationMenu.Item
                        key={notif._id}
                        title={notif.title}
                        description={notif.message}
                        date={notif.createdAt}
                        read={notif.read}
                        icon={iconTypes[notif.iconType]}
                        onHover={() => {
                          markAsRead(notif._id);
                        }}
                      />
                    ))}
                  </ul>
                </li>
              ))}
            </>
          )}
        </NotificationMenu.List>
      </NotificationMenu.Menu>
    </NotificationMenu>
  );
}
