import Logo from "./ui/Logo";
import Input from "./ui/Input";
import Button from "./ui/Button";
import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { NavBarItems } from "../utils/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../features/auth/useAuth";
import Notifications from "./ui/Notifications";
import Menus from "./ui/Menus";
import Spinner from "./ui/Spinner";
import { useSearchStore } from "../features/search/searchStore";
import SearchDropdown from "./Search/SearchDropdown";

function Header() {
  const header = useRef(null);
  const searchRef = useRef(null);
  const { loading, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.scrollY > 0) {
      header.current.classList.add("bg-[#D6E7FB]");
      header.current.classList.add("border-b-blue-300");
    } else {
      header.current.classList.remove("bg-[#D6E7FB]");
      header.current.classList.remove("border-b-blue-300");
    }

    const onScroll = () => {
      if (window.scrollY > 0) {
        header.current.classList.add("bg-[#D6E7FB]");
        header.current.classList.add("border-b-blue-300");
      } else {
        header.current.classList.remove("bg-[#D6E7FB]");
        header.current.classList.remove("border-b-blue-300");
      }
    };

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const open = useSearchStore((s) => s.open);
  const setOpen = useSearchStore((s) => s.setOpen);
  const closeDropdown = useSearchStore((s) => s.closeDropdown);
  const loadData = useSearchStore((s) => s.loadData);

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
  };

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 border border-transparent py-4 transition-all duration-300 ease-out"
    >
      <div className="container mx-auto flex items-center justify-between gap-10 px-4">
        {/* Logo and Search */}
        <div className="flex grow items-center gap-8">
          <Link to="/">
            <Logo className="h-full w-40" />
          </Link>
          <form
            ref={searchRef}
            role="search"
            className="group relative flex transition-all duration-300 ease-in-out focus-within:grow"
          >
            <Input
              type="search"
              placeholder="Search for doctors, articles..."
              aria-label="Search doctors, articles..."
              className="w-full pl-10 transition-all duration-300 ease-in-out group-focus-within:w-full"
              value={query}
              onChange={handleSearchInput}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeDropdown();
              }}
            />
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 transition-all duration-300 ease-out group-focus-within:text-[#4a90e2]" />
            <SearchDropdown />
          </form>
        </div>

        {/* Main Navigation */}
        <div
          className={`flex items-center ${isAuthenticated ? "gap-20" : "gap-8"}`}
        >
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              {NavBarItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#4A90E2] hover:text-[#4a7fe2]"
                        : "text-gray-700 hover:text-gray-900"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              {/* <Link to="/profile" title="Profile">
                <UserCircleIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              </Link> */}
              <Menus>
                <Menus.Menu>
                  <Menus.Toggle
                    id="user-menu"
                    title="Profile"
                    className="relative cursor-pointer rounded-full border-none bg-none p-2 transition-all duration-200 hover:bg-gray-400/25"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                  </Menus.Toggle>
                  <Menus.List id="user-menu">
                    <Menus.Item
                      icon={<UserIcon className="text-gray-600" />}
                      onClick={() => navigate("/user")}
                      title="Profile"
                      aria-label="profiel link"
                    >
                      Profile
                    </Menus.Item>
                    <Menus.Item
                      icon={
                        <ArrowLeftStartOnRectangleIcon className="text-red-500" />
                      }
                      onClick={handleLogout}
                      title="Logout"
                      aria-label="logout button"
                    >
                      Logout
                    </Menus.Item>
                  </Menus.List>
                </Menus.Menu>
              </Menus>
              <span className="cursor-pointer" title="Notifications">
                <Notifications />
              </span>
            </div>
          ) : loading ? (
            <>
              <Spinner className="h-6 w-6 text-gray-500" />
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
