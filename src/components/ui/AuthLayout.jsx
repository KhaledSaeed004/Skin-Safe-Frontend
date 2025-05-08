// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Logo */}
      <div className="absolute z-10 p-4">
        <img src="/skin-safe-web-logo.svg" alt="logo" className="h-12 w-auto" />
      </div>

      {/* Left Content - will hold Login, Signup, etc. */}
      <div className="z-20 w-full p-8 lg:w-1/2">
        <Outlet />
      </div>

      {/* Right Image */}
      <div className="hidden w-1/2 lg:block">
        <img
          src="/women.png"
          alt="Auth Visual"
          className="h-full w-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
