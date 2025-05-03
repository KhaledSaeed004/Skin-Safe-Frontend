import React from "react";
import RightsideImage from "../components/ui/rightsideimage";
import Header from "../components/Header";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2">
          <div className="w-full max-w-md">
            {/* Logo */}
            <h1 className="mb-2 text-3xl font-bold text-blue-600">Skin Safe</h1>

            {/* Heading */}
            <h2 className="mb-2 text-2xl font-semibold">Forgot Password?</h2>
            <p className="mb-6 text-gray-500">
              Enter your email address or phone number,
              <br />
              we will send you a confirmation code.
            </p>

            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 00-6 6v2a2 2 0 01-1 1.732V13h14v-1.268A2 2 0 0116 10V8a6 6 0 00-6-6zM4 14h12a2 2 0 01-2 2H6a2 2 0 01-2-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Enter Your Email Or Phone Number"
              className="mb-4 w-full rounded-md border border-blue-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Button */}
            <button className="w-full rounded-md bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600">
              Send the code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
