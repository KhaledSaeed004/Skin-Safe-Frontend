import { useMutation } from "@tanstack/react-query";
import { deactivateAccount as deactivateAccountApi } from "../../services/api/apiProfile";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export function useDeactivateAccount() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: deactivateAccount,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => deactivateAccountApi({ token }),
    onSuccess: ({ msg }) => {
      toast.success("Account deactivated successfully");

      // Log out the user after successful deactivation
      logout();

      // Redirect to the login page
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(
        `Error deactivating account: ${error.message || "An error occurred"}`,
        {
          duration: 5000,
        },
      );
    },
  });

  return { deactivateAccount, isLoading, error };
}
