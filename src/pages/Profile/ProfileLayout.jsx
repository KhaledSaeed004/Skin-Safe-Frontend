import {
  CalendarIcon,
  HistoryIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "../../utils/Icons";

import { Link, NavLink, Outlet } from "react-router-dom";
import avatar from "/doctor-full-body.png";
import Logo from "../../components/ui/Logo";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../features/auth/useAuth";
import Spinner from "../../components/ui/SpinnerLarge";
import { useUserQuery } from "../../features/auth/useUserQuery";

export default function ProfileLayout() {
  const { logout } = useAuth();
  const { user, isLoading, error } = useUserQuery();

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-16 w-16 text-blue-500" />
      </div>
    );
  }

  const { name } = user;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-20 items-center justify-center">
          <Link to="/">
            <Logo className="h-full w-40" />
          </Link>
        </div>
        <nav className="space-y-2 p-4">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md p-3 ${
                isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`
            }
          >
            <UserIcon size={18} />
            Profile
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md p-3 ${
                isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`
            }
          >
            <DocumentTextIcon className="h-5 w-5" />
            Reports
          </NavLink>
          <NavLink
            to="appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md p-3 ${
                isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`
            }
          >
            <CalendarIcon size={18} />
            Appointments
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md p-3 ${
                isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`
            }
          >
            <SettingsIcon size={18} />
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">
        {/* Top navbar */}
        <header className="flex items-center justify-end gap-5 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">{name}</span>
          </div>
          <button
            onClick={logout}
            className="cursor-pointer rounded-full p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOutIcon />
          </button>
        </header>

        {/* Nested route content */}
        <main className="flex-1 p-6">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}
