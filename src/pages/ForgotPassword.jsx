import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { usePasswordResetRequest } from "../features/passwordReset/usePasswordResetRequest";
import { useForm } from "react-hook-form";
import FormFieldError from "../components/ui/FormFieldError";
import { useState } from "react";
import OTPForm from "./OTPForm";
import { usePasswordResetOTP } from "../features/passwordReset/usePasswordResetOTP";
import usePasswordResetStore from "../features/passwordReset/PasswordResetStore";
import Spinner from "../components/ui/Spinner";

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { requestPasswordChange, isLoading, error } = usePasswordResetRequest();
  const {
    submitPasswordResetOTP,
    isLoading: isConfirmingOTP,
    error: OTPError,
  } = usePasswordResetOTP();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setEmail } = usePasswordResetStore();

  const onSubmit = (formData) => {
    requestPasswordChange(
      { email: formData.email },
      {
        onSuccess: () => {
          setEmail(formData.email);
          setStep("otp");
        },
      },
    );
  };

  const onOTPSubmit = () => {
    submitPasswordResetOTP({
      resetCode: otp.join(""),
      token: localStorage.getItem("passwordreset_otp_token"),
    });
  };

  return step === "email" ? (
    <div className="relative mx-auto mt-8 flex max-w-2xl flex-col gap-y-4 overflow-hidden p-20 pt-10 text-center">
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
        className="text-primary w-[300px] self-center"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {error && (
          <FormFieldError
            message={
              error.message || "An error occurred. Please try again later."
            }
            className="text-left"
          />
        )}
        {OTPError && (
          <FormFieldError
            message={
              OTPError.message || "An error occurred. Please try again later."
            }
            className="text-left"
          />
        )}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            className={
              errors.email &&
              "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"
            }
            type="email"
          />
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="bg-blue-500 px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Verifying...</span>
              </>
            ) : (
              "Send code"
            )}
          </Button>
        </div>
        {errors.email && (
          <FormFieldError
            message={errors.email.message}
            className="text-left"
          />
        )}
      </form>
    </div>
  ) : (
    <OTPForm
      otp={otp}
      setOTP={setOtp}
      handleSubmit={handleSubmit(onOTPSubmit)}
      isConfirmingOTP={isConfirmingOTP}
    />
  );
};

export default ForgotPassword;
