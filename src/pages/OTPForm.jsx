import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import OTPInput from "../components/ui/OTPInput";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

function OTPForm({ otp, setOTP, handleSubmit, isConfirmingOTP }) {
  return (
    <div className="relative mx-auto mt-8 flex max-w-2xl flex-col gap-y-4 overflow-hidden p-20 pt-10 text-center">
      <h3 className="text-4xl font-semibold">
        <span className="flex items-center justify-center gap-4">
          <EnvelopeOpenIcon className="size-10 text-slate-500" /> Check your
          Email!
        </span>
      </h3>
      <p className="text-gray-600">
        Please check your email & enter the code that was sent to you to
        continue
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mx-8 space-y-4 text-left">
          <OTPInput code={otp} setCode={setOTP} />
        </div>
        <div className="mt-8 text-center">
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
        </div>
      </form>
    </div>
  );
}

export default OTPForm;
