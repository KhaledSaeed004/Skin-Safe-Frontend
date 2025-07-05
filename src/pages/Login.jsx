import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import FormFieldError from "../components/ui/FormFieldError";
import { useLogin } from "../features/login/useLogin";
import Spinner from "../components/ui/Spinner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, reset } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (formData) => {
    reset();
    login(formData);
  };

  return (
    <div className="relative mx-auto mt-8 max-w-2xl overflow-hidden p-20 pt-10">
      <h2 className="mb-2 pt-1 text-center text-[40px] font-semibold">
        Log In
      </h2>
      <p className="mb-6 text-center text-gray-500">
        Welcome back 👋 Login to your account below
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className="mb-2 text-sm text-red-500">
            {error.message || "An error occurred. Please try again later."}
          </p>
        )}
        <div>
          <label>
            <span className="mb-1 block">Email / Phone number</span>
            <Input
              {...register("email", {
                required: "This field cannot be empty",
                validate: (value) => {
                  const isEmail =
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);

                  return isEmail || "Invalid email address";
                },
              })}
              type="text"
              placeholder="Enter Your Email Or Phone Number"
              className={`w-full ${errors.email && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
            />
          </label>
          {errors.email && <FormFieldError message={errors.email.message} />}
        </div>

        <div>
          <label>
            <span className="mb-1 block">Password</span>
            <div className="relative">
              <Input
                {...register("password", {
                  required: "This field cannot be empty",
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className={`w-full pr-10 ${errors.password && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </label>
          {errors.password && (
            <FormFieldError message={errors.password.message} />
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 py-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
              Loading...
            </span>
          ) : (
            "Log In"
          )}
        </Button>
      </form>

      <div className="relative my-6 text-center text-sm text-gray-500">
        <span className="absolute top-1/2 left-0 w-1/3 -translate-y-1/2 border-t border-gray-300"></span>
        Or Sign in with
        <span className="absolute top-1/2 right-0 w-1/3 -translate-y-1/2 border-t border-gray-300"></span>
      </div>

      <div className="mb-6 space-y-4">
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-2 transition-all duration-300 active:scale-95">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Sign in with Google
        </button>
      </div>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
