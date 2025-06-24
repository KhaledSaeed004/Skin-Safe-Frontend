import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useLoseFocus } from "../../hooks/useLoseFocus";
import Spinner from "./Spinner";
import { BellIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { cn } from "../../utils/cn";

const NotificationContext = createContext();

function NotificationMenu({ children }) {
  const [openId, setOpenId] = useState("");

  const openMenu = (id) => setOpenId(id);
  const closeMenu = () => setOpenId("");

  return (
    <NotificationContext.Provider value={{ openId, openMenu, closeMenu }}>
      {children}
    </NotificationContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="relative flex items-center justify-end">{children}</div>
  );
}

function Toggle({ id, count = 0 }) {
  const { openId, openMenu, closeMenu } = useContext(NotificationContext);

  const handleClick = (e) => {
    e.stopPropagation();

    if (openId === "" || openId !== id) {
      const menuOpenEvent = new CustomEvent("menu-open", { detail: id });
      window.dispatchEvent(menuOpenEvent);
      openMenu(id);
    } else {
      closeMenu();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative cursor-pointer rounded-full border-none bg-none p-2 transition-all duration-200 hover:bg-gray-400/25"
    >
      <BellIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute top-1 -right-[2px] flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

function List({ id, children, onLoadMore, ActionButton }) {
  const { openId, closeMenu } = useContext(NotificationContext);
  const { ref } = useLoseFocus({
    onClickAway: closeMenu,
    preventbubbling: false,
    id: id,
  });
  const listRef = useRef(null);

  useEffect(() => {
    if (!onLoadMore || !listRef.current) return;

    const el = listRef.current;

    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        onLoadMore();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onLoadMore]);

  if (openId !== id) return null;

  return (
    <div
      ref={(node) => {
        ref.current = node;
        listRef.current = node;
      }}
      className="absolute top-[calc(100%+16px)] right-0 z-[999] max-h-[400px] w-[400px] cursor-default overflow-y-auto rounded-lg bg-gray-100 shadow-md"
    >
      <div className="flex justify-between px-4 py-3 pt-4">
        <h3 className="text-lg font-bold text-slate-950">Notifications</h3>
        {ActionButton}
      </div>
      <ul className="px-2">{children}</ul>
    </div>
  );
}

function Item({
  title,
  description,
  date,
  icon,
  read = false,
  onClick,
  onHover,
  children,
}) {
  const { closeMenu } = useContext(NotificationContext);

  const handleClick = () => {
    onClick?.();
    closeMenu();
  };

  const handleHover = () => {
    onHover?.();
  };

  return (
    <li>
      <button
        onClick={handleClick}
        onMouseEnter={handleHover}
        className={cn(
          "flex w-full cursor-pointer items-start gap-4 rounded-md px-4 py-3 text-left transition-all hover:bg-gray-400/25",
          !read && "bg-gray-400/15",
        )}
      >
        {icon && (
          <div className={`pt-1 ${!read ? "text-primary" : "text-gray-600"}`}>
            {icon}
          </div>
        )}

        <div className="max-w-[18rem] flex-1 overflow-hidden text-sm">
          {children ?? (
            <>
              {title && (
                <h3
                  className={`font-${!read ? "semibold" : "medium"} truncate`}
                >
                  {title}
                </h3>
              )}
              {description && (
                <p className="line-clamp-2 text-gray-600">{description}</p>
              )}
              {date && (
                <div className="mt-1 text-xs text-gray-400">
                  {formatDistanceToNow(new Date(date), { addSuffix: true })}
                </div>
              )}
            </>
          )}
        </div>

        {!read && (
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
        )}
      </button>
    </li>
  );
}

NotificationMenu.Menu = Menu;
NotificationMenu.Toggle = Toggle;
NotificationMenu.List = List;
NotificationMenu.Item = Item;

export default NotificationMenu;
