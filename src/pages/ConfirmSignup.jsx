import { useState } from "react";
import OTPInput from "../components/ui/OTPInput";
import { useSignupOTPStore } from "../features/signUp/signupOTPStore";

function ConfirmSignup() {
  const { otp, setOTP } = useSignupOTPStore();

  return <OTPInput code={otp} setCode={setOTP} />;
}

export default ConfirmSignup;
