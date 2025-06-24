import { useMutation } from "@tanstack/react-query";
import { confirmSignup as confirmSignupApi } from "../../services/api/apiAuth";
import { setAuthData } from "../../utils/authStorage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useConfirmSignup() {
    const navigate = useNavigate();

    const {
        mutate: confirmSignup,
        isPending: isLoading,
        error,
    } = useMutation({
        mutationFn: confirmSignupApi,
        onSuccess: ({ token, data: user }) => {
            // Save full auth data now
            setAuthData(token, user);

            // Optionally remove temporary signup token
            localStorage.removeItem("signup_token");

            toast.success(`Account created. Welcome, ${user.name.split(" ")[0]}!`);
            navigate("/");
        },
    });

    return { confirmSignup, isLoading, error };
}