import { createContext, useContext, useState } from "react";
import { useLoseFocus } from "../../hooks/useLoseFocus";
import { cn } from "../../utils/cn";

const MenusContext = createContext();

const useMenusContext = () => {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("Menus.* components must be used inside <Menus>");
  return context;
};

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const openMenu = (id) => setOpenId(id);
  const closeMenu = () => setOpenId("");

  return (
    <MenusContext.Provider value={{ openId, openMenu, closeMenu }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="relative flex items-center justify-end">{children}</div>
  );
}

function Toggle({ id, children, className, ...props }) {
  const { openId, openMenu, closeMenu } = useMenusContext(MenusContext);

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
      className={cn(
        "translate-x-2 rounded-sm p-2 transition-all hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function List({ id, children }) {
  const { openId, closeMenu } = useMenusContext(MenusContext);
  const { ref } = useLoseFocus({
    onClickAway: closeMenu,
    preventbubbling: false,
    id: id,
  });

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="absolute top-[calc(100%+8px)] right-0 z-[999] flex min-w-32 flex-col gap-1.5 rounded-md bg-gray-50 py-2 shadow-md"
    >
      {children}
    </ul>
  );
}

function Item({ children, icon, onClick, ...props }) {
  const { closeMenu } = useMenusContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    closeMenu();
  };

  return (
    <li className="relative px-2">
      <button
        {...props}
        onClick={handleClick}
        className="flex w-full cursor-pointer items-center gap-2 rounded-md border-none bg-none px-3 py-2 text-left text-sm transition-all hover:bg-gray-200"
      >
        {icon && <span className="h-5 w-5 text-gray-400">{icon}</span>}
        <span className="leading-5 whitespace-nowrap">{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Item = Item;

export default Menus;
