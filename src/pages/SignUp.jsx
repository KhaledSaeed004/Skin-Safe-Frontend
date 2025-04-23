import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useSearchParams } from "react-router-dom";
import Steptwo from "./Steptwo";

export default function SignUp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nextstep = Boolean(searchParams.get("passwordreset"));

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    setSearchParams({ passwordreset: true });
  };

  return nextstep ? (
    <Steptwo />
  ) : (
    <div className="mx-auto flex max-w-md flex-col gap-y-4 p-4 pt-10 text-center">
      <h3 className="text-4xl font-semibold">Sign Up</h3>
      <p className="text-gray-600">
        Glad to see you again 👋 Create your account
      </p>

      <form className="text-left space-y-4" onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name: <br />
            <Input placeholder="Enter Your Full Name" className="w-full" />
          </label>
        </div>

        <div>
          <label>
            Phone Number: <br />
            <Input
              type="tel"
              placeholder="(+20) 10 222 333 44"
              className="hover:shadow-gray w-full rounded-lg border border-black bg-white px-4 py-2 text-black transition-all duration-300 ease-out placeholder:text-[#837D7D] focus:border-[#4a90e2] focus:shadow-none focus:outline-none focus:placeholder:text-[#4a90e2]"
            />
          </label>
        </div>

        <div>
          <label>
            Date of Birth: <br />
            <Input type="date" className="w-full" />
          </label>
        </div>

        <div>
          <label className="mb-1 block">Gender:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" value="male" />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" value="female" />
              Female
            </label>
          </div>
        </div>

        <div>
          <label>
            Skin Tone: <br />
            <select className="w-full rounded-lg border px-2 pt-2">
              <option value="">Select Skin Tone</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        <Button variant="primary" type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
