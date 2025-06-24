import { useEffect, useMemo, useRef, useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useSignupStore } from "../features/signUp/signupStore";
import { ResizablePanel } from "../components/ui/ResizablePanel";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Select from "../components/ui/Select";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import FormFieldError from "../components/ui/FormFieldError";
import { useSignup } from "../features/signUp/useSignUp";
import Spinner from "../components/ui/Spinner";
import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import { useSignupOTPStore } from "../features/signUp/signupOTPStore";
import { useConfirmSignup } from "../features/signUp/useConfirmSignup";
import OTPInput from "../components/ui/OTPInput";
import { format } from "date-fns";

const steps = [SignUpFirstStep, SignUpSecondStep, SignUpOTPStep];

export default function SignUp() {
  const {
    step,
    setStep,
    nextStep,
    prevStep,
    updateData,
    data: persistedData,
    reset,
  } = useSignupStore();
  const [stepDirection, setStepDirection] = useState(1); // 1 = right, -1 = left

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const SignUpStep = steps[step];

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    reset: resetForm,
  } = useForm({
    defaultValues: persistedData, // load from Zustand on mount
    mode: "onTouched",
  });

  const hasPushedStep = useRef(false);
  const prevStepRef = useRef();

  useEffect(() => {
    prevStepRef.current = step;
  }, [step]);

  const prevStepNum = prevStepRef.current;

  const { signup, isLoading, error } = useSignup();
  const {
    confirmSignup,
    isLoading: isConfirmingOTP,
    error: confirmError,
  } = useConfirmSignup();

  useEffect(() => {
    // Push current step to history when it changes
    resetForm(persistedData);

    if (!hasPushedStep.current) {
      hasPushedStep.current = true;
      console.log("Pushing initial step: 0");
      window.history.replaceState({ step: 0 }, "", "");
      return;
    }

    if (step > prevStepNum) {
      console.log(`Pushing step: ${step}`);
      window.history.pushState({ step }, "", "");
    }
  }, [step]);

  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;
      if (state?.step !== undefined) {
        setStep(state.step);
        setStepDirection(1);
      }
      console.log(`Popped step:`, state);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const onNextStep = (formData) => {
    setStepDirection(-1);
    updateData(formData); // save current values to Zustand
    nextStep();
  };

  const onSubmit = (formData) => {
    updateData(formData);
    const fullData = useSignupStore.getState().data;

    const formattedBirthDate = format(
      new Date(fullData.birthdate),
      "dd-MM-yyyy",
    );

    signup(
      {
        name: fullData.fullname,
        userName: fullData.username,
        email: fullData.email,
        dateOfBirth: formattedBirthDate,
        skinTone: fullData.skinTone,
        gender: fullData.gender,
        password: fullData.password,
        passwordConfirm: fullData.confirmPassword,
        phoneNumber: fullData.phone,
        role: "user",
      },
      {
        onSuccess: () => {
          nextStep();
        },
      },
    );
  };

  const onOTPConfirm = () => {
    confirmSignup({
      code: otp.join(""),
      token: localStorage.getItem("signup_token"),
    });
  };

  return (
    <div className="relative mx-auto mt-8 flex max-w-2xl flex-col gap-y-4 overflow-hidden p-20 pt-10 text-center">
      <h3 className="text-4xl font-semibold">
        {step === 2 ? (
          <span className="flex items-center justify-center gap-4">
            <EnvelopeOpenIcon className="size-10 text-slate-500" /> Check your
            Email!
          </span>
        ) : (
          "Sign Up"
        )}
      </h3>
      <p className="text-gray-600">
        {step === 2
          ? "Please check your email & enter the confirmation code that was sent to you to continue"
          : "Welcome 👋 Create an account"}
      </p>
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
        <form
          onSubmit={handleSubmit(
            step === 2 ? onOTPConfirm : step === 1 ? onSubmit : onNextStep,
          )}
        >
          {error && (
            <p className="mx-8 mb-2 text-left text-sm text-red-500">
              {error.message || "An error occurred. Please try again later."}
            </p>
          )}
          {confirmError && (
            <p className="mx-8 mb-2 text-left text-sm text-red-500">
              {confirmError.message ||
                "An error occurred. Please try again later."}
            </p>
          )}
          <ResizablePanel>
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={stepDirection}
            >
              <motion.div
                key={step}
                custom={stepDirection}
                initial="enter"
                animate="idle"
                exit="exit"
                variants={{
                  enter: (dir) => ({
                    opacity: 0,
                    x: `${-100 * dir}%`,
                  }),
                  idle: { opacity: 1, x: "0%" },
                  exit: (dir) => ({
                    opacity: 0,
                    x: `${100 * dir}%`,
                  }),
                }}
              >
                <div className="mx-8 space-y-4 text-left">
                  <SignUpStep
                    register={register}
                    control={control}
                    getValues={getValues}
                    errors={errors}
                    otp={otp}
                    setOTP={setOtp}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
          <div className="mt-8 text-center">
            {step === 2 ? (
              <Button
                variant="primary"
                type="submit"
                disabled={otp.join("").length !== 6 || isConfirmingOTP}
                className="w-48 bg-blue-500 py-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {isConfirmingOTP ? (
                  <>
                    <Spinner />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify code"
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-48 bg-blue-500 py-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span>Loading...</span>
                  </>
                ) : step === 1 ? (
                  "Sign Up"
                ) : (
                  "Continue"
                )}
              </Button>
            )}
          </div>
        </form>
      </MotionConfig>
    </div>
  );
}

function SignUpFirstStep({ register, control, errors }) {
  const skinToneOptions = useMemo(
    () => [
      { name: "Light", value: "light" },
      { name: "Light to Medium", value: "light to medium" },
      { name: "Medium", value: "medium" },
      { name: "Medium to Dark", value: "medium to dark" },
      { name: "Dark", value: "dark" },
    ],
    [],
  );

  return (
    <>
      <div>
        <label>
          <span className="mb-1 block">Full Name</span>
          <Input
            {...register("fullname", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must have at least 3 characters",
              },
              pattern: {
                value: /^[\p{L}\s]+$/u,
                message: "Full name should only contain letters and spaces",
              },
            })}
            type="text"
            placeholder="Enter Your Full Name"
            className={`w-full ${errors.fullname && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
          />
        </label>
        {errors.fullname && (
          <FormFieldError message={errors.fullname.message} />
        )}
      </div>

      <div>
        <label>
          <span className="mb-1 block">Phone Number</span>
          <Input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^(?:\+20|01)[0-9]{9}$/,
                message:
                  "Invalid phone number. It should start with +20 or 01 followed by 9 digits.",
              },
            })}
            type="tel"
            placeholder="(+20) 10 222 333 44"
            className={`w-full ${errors.phone && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
          />
        </label>
        {errors.phone && <FormFieldError message={errors.phone.message} />}
      </div>

      <div>
        <label>
          <span className="mb-1 block">Date of Birth</span>
          <Input
            {...register("birthdate", {
              required: "Birthdate is required",
              validate: (value) => {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const ageLimit = 100;

                // Check for future date
                if (birthDate > today || age > ageLimit) {
                  return "Please enter a valid birthdate.";
                }

                return true; // Validation passes
              },
            })}
            type="date"
            className={`w-full ${errors.birthdate && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
          />
        </label>
        {errors.birthdate && (
          <FormFieldError message={errors.birthdate.message} />
        )}
      </div>

      <div>
        <label className="mb-1 block">Gender</label>
        <div className="flex gap-4">
          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center"
              htmlFor="male"
            >
              <input
                {...register("gender", {
                  required: "Please select a gender",
                })}
                id="male"
                type="radio"
                name="gender"
                value="male"
                className="peer checked:border-primary h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-600 transition-all"
              />
              <span className="bg-primary absolute top-1/2 left-0 ml-1 h-3 w-3 -translate-y-1/2 transform rounded-full opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
              <label
                className="ml-2 cursor-pointer text-sm text-slate-600 peer-checked:text-slate-950"
                htmlFor="male"
              >
                Male
              </label>
            </label>
          </div>

          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center"
              htmlFor="female"
            >
              <input
                {...register("gender", {
                  required: "Please select a gender",
                })}
                id="female"
                type="radio"
                name="gender"
                value="female"
                className="peer checked:border-primary h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-600 transition-all"
              />
              <span className="bg-primary absolute top-1/2 left-0 ml-1 h-3 w-3 -translate-y-1/2 transform rounded-full opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
              <label
                className="ml-2 cursor-pointer text-sm text-slate-600 peer-checked:text-slate-950"
                htmlFor="female"
              >
                Female
              </label>
            </label>
          </div>
        </div>
        {errors.gender && <FormFieldError message={errors.gender.message} />}
      </div>

      <Controller
        name="skinTone"
        control={control}
        defaultValue={null} // or one of the options if you have a default
        rules={{
          required: "Please select a skin tone",
        }}
        render={({ field }) => (
          <div>
            <label>
              <span className="mb-1 block">Skin Tone</span>
              <Select
                className="py-3 text-base"
                placeholder="Select Skin Tone"
                value={field.value}
                onChange={(val) => field.onChange(val)}
                options={skinToneOptions}
              />
            </label>
            {errors.skinTone && (
              <FormFieldError message={errors.skinTone.message} />
            )}
          </div>
        )}
      />
    </>
  );
}

function SignUpSecondStep({ register, getValues, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);

  return (
    <>
      <div>
        <label>
          <span className="mb-1 block">Username</span>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username can be at most 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            })}
            type="text"
            placeholder="Enter username"
            className={`w-full ${errors.username && "border-red-500 focus:border-red-500 focus:placeholder:text-slate-400"}`}
          />
        </label>
        {errors.username && (
          <FormFieldError message={errors.username.message} />
        )}
      </div>

      <div>
        <label>
          <span className="mb-1 block">Email</span>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="Enter email"
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
        </label>
        {errors.password && (
          <FormFieldError message={errors.password.message} />
        )}
      </div>

      <div>
        <label>
          <span className="mb-1 block">Confirm Password</span>
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
        </label>
        {errors.confirmPassword && (
          <FormFieldError message={errors.confirmPassword.message} />
        )}
      </div>

      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center"
          htmlFor="termsAndConditionsCheck"
        >
          <input
            {...register("agreesToTermsAndConditions", {
              required: "You must agree to the terms and conditions",
            })}
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className={`peer checked:bg-primary checked:border-primary h-5 w-5 cursor-pointer appearance-none rounded ${errors.agreesToTermsAndConditions ? "border-2 border-red-500 shadow-none" : "border border-slate-300 shadow"} transition-all hover:shadow-md`}
            id="termsAndConditionsCheck"
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          className="ml-2 cursor-pointer text-sm text-slate-600"
          htmlFor="termsAndConditionsCheck"
        >
          I agree to the{" "}
          <a href="#" className="text-primary">
            Terms of Service{" "}
          </a>
          and{" "}
          <a href="#" className="text-primary">
            Privacy Policy
          </a>
        </label>
      </div>
    </>
  );
}

function SignUpOTPStep({ otp, setOTP }) {
  return <OTPInput code={otp} setCode={setOTP} />;
}
