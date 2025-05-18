import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import FormFieldError from "../components/ui/FormFieldError";
import { usePasswordReset } from "../features/passwordReset/usePasswordReset";
import usePasswordResetStore from "../features/passwordReset/PasswordResetStore";
import Spinner from "../components/ui/Spinner";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onTouched",
  });

  const { email, setPassword, setConfirmPassword, resetStore } =
    usePasswordResetStore();
  const { resetPassword, isLoading, error } = usePasswordReset();

  useEffect(() => {
    console.log("In second component, email is:", email);
  }, [email]);

  const onFormSubmit = (formData) => {
    setPassword(formData.password);
    setConfirmPassword(formData.confirmPassword);

    resetPassword(
      {
        passwordResetData: {
          email,
          newPassword: formData.password,
          passwordConfirm: formData.confirmPassword,
        },
        token: localStorage.getItem("password_reset_token"),
      },
      {
        onSuccess: () => {
          localStorage.removeItem("password_reset_token");
          resetStore();
        },
      },
    );
  };

  return (
    <div className="relative mx-auto mt-8 flex max-w-2xl flex-col items-center gap-y-4 overflow-hidden p-20 pt-10 text-center">
      <h3 className="text-4xl font-semibold">Create a new password</h3>
      <p className="text-gray-600">Create a new login password</p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        {error && (
          <FormFieldError
            message={
              error.message || "An error occurred. Please try again later."
            }
            className="text-left"
          />
        )}
        <div className="text-left">
          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className={`w-full pr-10 ${errors.password && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-sm text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {errors.password && (
            <FormFieldError message={errors.password.message} />
          )}
        </div>

        <div className="text-left">
          <div className="relative">
            <Input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              className={`w-full pr-10 ${errors.confirmPassword && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-sm text-gray-500 hover:text-gray-700"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <FormFieldError message={errors.confirmPassword.message} />
          )}
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-48 bg-blue-500 py-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Saving...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
