import React, { useState } from "react";
import Header from "../components/Header";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import RightSideImage from "../components/ui/rightsideimage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-15">
        <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white">
          {/* Left: Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-6">
              Glad to see you again 👋 Login to your account below
            </p>

            {/* Social Login */}
            <div className="relative mb-6 text-gray-500 text-sm text-center">
              <span className="absolute left-0 top-1/2 w-1/3 border-t border-gray-300 -translate-y-1/2"></span>
              Or Sign in with
              <span className="absolute right-0 top-1/2 w-1/3 border-t border-gray-300 -translate-y-1/2"></span>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
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
                  className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="w-full border rounded-md px-4 py-2 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
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
                <a href="#" className="text-red-500 font-medium">
                  Forget Password?
                </a>
              </div>

              {/* ✅ Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-500 font-semibold">
                Sign up
              </a>
            </p>
          </div>

          {/* Right: Image */}
<RightSideImage/>
        </div>
      </div>
    </>
  );
};

export default Login;
