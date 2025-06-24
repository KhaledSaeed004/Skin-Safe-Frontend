import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const {
        mutate: signup,
        isPending: isLoading,
        error,
    } = useMutation({
        mutationFn: signupApi,
        onSuccess: ({ token, message }) => {
            // Save to localStorage
            localStorage.setItem("signup_token", token);

            // Show toast
            toast.success(`Success! ${message}`, { duration: 15000 });
        },
    });

    return { signup, isLoading, error };
}