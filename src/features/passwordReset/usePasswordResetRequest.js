import { useMutation } from "@tanstack/react-query";
import { forgotPassword as requestPasswordChangeApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";

export function usePasswordResetRequest() {
    const {
        mutate: requestPasswordChange,
        isPending: isLoading,
        error,
    } = useMutation({
        mutationFn: requestPasswordChangeApi,
        onSuccess: ({ token, message }) => {
            // Save to localStorage
            localStorage.setItem("passwordreset_otp_token", token);

            // Show toast
            toast.success(`Success! ${message}`, { duration: 8000 });
        },
    });

    return { requestPasswordChange, isLoading, error };
}