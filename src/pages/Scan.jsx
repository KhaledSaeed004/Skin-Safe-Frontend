import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSearchParams, Link } from "react-router-dom";
// تأكد إنك عامل import لـ ForgotPassword component
import Passwordreset from "./Passwordreset";
function Scan() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isResettingPassword = Boolean(searchParams.get("forget-password"));
  return isResettingPassword ? (
    <Passwordreset />
  ) : (
    <>
      <div className="absolute p-1">
        <img
          src="../../public/skin-safe-web-logo.svg"
          alt="logo"
          className="mb-6 flex h-12 w-fit justify-start"
        />
      </div>
      <div className="flex w-full">
        {/* Login Form */}
        <div className="p-30 lg:w-1/2">
          <h2 className="mb-2 text-center text-[40px] font-semibold">
            Welcome back
          </h2>
          <p className="mb-6 text-center text-gray-500">
            Glad to see you again 👋 <br /> Login to your account below
          </p>

          {/* Social Login */}
          <div className="relative mb-6 text-center text-sm text-gray-500">
            <span className="absolute top-1/2 left-0 w-1/3 -translate-y-1/2 border-t border-gray-300"></span>
            Or Sign in with
            <span className="absolute top-1/2 right-0 w-1/3 -translate-y-1/2 border-t border-gray-300"></span>
          </div>

          <div className="mb-6 space-y-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border py-2">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="text"
                placeholder="Enter Your Email Or Phone Number"
                className="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="mt-1 w-full rounded-md border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" />
                Remember me
              </label>
              <p onClick={() => setSearchParams({ passwordreset: true })}>
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="../../public/women.png"
            alt=""
            className="w-full object-cover opacity-50"
          />
        </div>
      </div>
    </>
  );
}

export default Scan;
