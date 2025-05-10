import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Adjust based on your icon library
// import Button from './Button'; // Uncomment and adjust if you have a custom Button component

// Placeholder Button component if you don't have one
const Button = ({ type, variant, className, children, ...props }) => (
  <button
    type={type}
    className={`rounded-md px-4 py-2 ${
      variant === "primary" ? "bg-blue-500 text-white hover:bg-blue-600" : ""
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Passwordreset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // Placeholder for API call
      // Replace with actual API call, e.g.:
      // await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ password }),
      // }).then(res => res.json());

      console.log("Password reset:", { password });
      // On success, navigate to login
      navigate("/login");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="mb-2 text-4xl font-bold">Create a new password</h1>
      <p className="mb-4 text-gray-500">Create a new login password</p>

      {error && (
        <p className="text-red-500" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            New Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
            aria-label="New password"
          />
          <span
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </span>
        </div>

        <div className="relative">
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-md border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
            aria-label="Confirm password"
          />
          <span
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </span>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            className="w-full p-2.5"
            disabled={isLoading}
          >
            {isLoading ? "Setting Password..." : "Set Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Passwordreset;
