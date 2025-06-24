import { useMutation } from "@tanstack/react-query";

import { login as loginApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";
import { setAuthData } from "../../utils/authStorage";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();

    const {
        mutate: login,
        isPending: isLoading,
        error,
        reset,
    } = useMutation({
        mutationFn: loginApi,
        onSuccess: ({ token, data }) => {
            // Save to localStorage
            setAuthData(token, data);

            // Show toast
            toast.success(`Welcome back, ${data.name.split(" ")[0]}!`);
            navigate("/");
        },
    });

    return { login, isLoading, error, reset };
}