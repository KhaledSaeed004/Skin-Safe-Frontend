import Logo from "./ui/Logo";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavBarItems } from "../utils/constants";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

function Header() {
  const header = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        header.current.classList.add("bg-[#D6E7FB]");
        header.current.classList.add("border-b-blue-300");
      } else {
        header.current.classList.remove("bg-[#D6E7FB]");
        header.current.classList.remove("border-b-blue-300");
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            role="search"
            className="group relative flex transition-all duration-300 ease-in-out focus-within:grow"
          >
            <Input
              type="search"
              placeholder="Search for doctors, articles..."
              aria-label="Search doctors, articles..."
              className="w-full pl-10 transition-all duration-300 ease-in-out group-focus-within:w-full"
            />
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 transition-all duration-300 ease-out group-focus-within:text-[#4a90e2]" />
          </form>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center gap-8">
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

          <Link to="/login">
  <Button variant="primary">Login</Button>
</Link>
<Link to="/signup">
<Button variant="secondary">Sign up</Button>
</Link>
          </div>
        </div>
     
    </header>
  );
}

export default Header;
