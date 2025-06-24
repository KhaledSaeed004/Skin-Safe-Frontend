import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function usePasswordReset() {
    const navigate = useNavigate();

    const {
        mutate: resetPassword,
        isPending: isLoading,
        error,
    } = useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: () => {
            // Navigate to password reset page
            navigate("/login", { replace: true });

            toast.success("Password reset successfully");
        },
    });

    return { resetPassword, isLoading, error };
}