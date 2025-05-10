import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ForgotPassword = () => {
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactInfo) {
      setError("Please enter your email or phone number.");
      return;
    }
    // Add logic to send confirmation code (e.g., API call)
    console.log("Sending code to:", contactInfo);
    // Navigate programmatically or handle success
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-y-4 p-4 pt-10 text-center">
      <h3 className="text-4xl font-semibold">Forgot Password?</h3>
      <p className="text-gray-600">
        Enter your email address or phone number, and we’ll send you a
        confirmation code.
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="text-primary w-full max-w-[300px] self-center"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <label htmlFor="contact-info" className="sr-only">
          Email or Phone Number
        </label>
        <Input
          id="contact-info"
          type="text"
          placeholder="Enter your email or phone number"
          value={contactInfo}
          onChange={(e) => {
            setContactInfo(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Link to="/login/password-confirmation">
          <Button type="submit" variant="primary">
            Send the code
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
