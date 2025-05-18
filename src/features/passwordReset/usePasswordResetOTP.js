import { useMutation } from "@tanstack/react-query";
import { submitPasswordResetOTP as submitPasswordResetOTPApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function usePasswordResetOTP() {
    const navigate = useNavigate();
    const {
        mutate: submitPasswordResetOTP,
        isPending: isLoading,
        error,
    } = useMutation({
        mutationFn: submitPasswordResetOTPApi,
        onSuccess: ({ token }) => {
            // Save to localStorage
            localStorage.removeItem("passwordreset_otp_token");
            localStorage.setItem("password_reset_token", token);

            // Show success toast
            toast.success(
                "OTP confirmed successfully, You can now reset your password",
            );

            // Navigate to password reset page
            navigate("/reset-password");
        },
    });

    return { submitPasswordResetOTP, isLoading, error };
}