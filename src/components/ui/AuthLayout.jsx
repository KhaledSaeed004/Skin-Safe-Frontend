// src/layouts/AuthLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Logo */}
      <div className="absolute z-40 p-8">
        <Link to="/">
          <img
            src="/skin-safe-web-logo.svg"
            alt="logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Left Content - will hold Login, Signup, etc. */}
      <div className="z-20 w-full p-8 lg:w-1/2">
        <Outlet />
      </div>

      {/* Right Image */}
      <div className="hidden h-screen w-1/2 lg:block">
        <img
          src="/women.png"
          alt="Auth Visual"
          className="h-full w-full object-cover object-top opacity-50"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
