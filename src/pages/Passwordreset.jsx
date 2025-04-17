import React from "react";
import RightsideImage from "../components/ui/rightsideimage";
import Header from "../components/Header";

const ForgotPassword = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Skin Safe</h1>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
          <p className="text-gray-500 mb-6">
            Enter your email address or phone number,<br />
            we will send you a confirmation code.
          </p>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
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
            className="w-full border border-blue-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
          >
            Send the code
          </button>
        </div>
      </div>

      <RightsideImage/>
    </div>
    </>
  );
};

export default ForgotPassword;
