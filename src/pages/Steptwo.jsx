import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Steptwo() {
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Submit your sign-up data here
    alert("Signed up successfully!");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-y-4 p-4 pt-10 text-center">
      <h3 className="text-3xl font-semibold">Sign Up</h3>
      <p className="text-gray-600"> Glad to see you again 👋 Create your account</p>

      <form className="text-left space-y-4" onSubmit={handleSubmit}>
        <div>
          <label>
            Username: <br />
            <Input type="text" placeholder="Enter username" className="w-full" />
          </label>
        </div>

        <div>
          <label>
            Email: <br />
            <Input type="email" placeholder="Enter email" className="w-full" />
          </label>
        </div>

        <div>
          <label>
            Password: <br />
            <Input type="password" placeholder="Enter password" className="w-full" />
          </label>
        </div>

        <div>
          <label>
            Confirm Password: <br />
            <Input type="password" placeholder="Re-enter password" className="w-full" />
          </label>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="agree" className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-primary">Terms of Service 
            and Privacy Policy</a>
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
