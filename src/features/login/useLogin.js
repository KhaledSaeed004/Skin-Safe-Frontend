import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";
import { setAuthToken } from "../../utils/authStorage";
import { useLocation, useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoading,
    error,
    reset,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ token, data }) => {
      // Save token to localStorage
      setAuthToken(token);
      queryClient.setQueryData(["user"], data);

      // Redirect to the page user was trying to access before login
      const redirectFromQuery = decodeURIComponent(
        new URLSearchParams(location.search).get("redirect") || "",
      );
      const redirectFromStorage = sessionStorage.getItem("redirectAfterLogin");
      const redirectTo = redirectFromQuery || redirectFromStorage || "/";

      // Show toast
      toast.success(`Welcome back, ${data.name.split(" ")[0]}!`);
      navigate(redirectTo, { replace: true });
      sessionStorage.removeItem("redirectAfterLogin");
    },
  });

  return { login, isLoading, error, reset };
}
