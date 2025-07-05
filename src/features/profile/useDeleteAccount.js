import { useMutation } from "@tanstack/react-query";
import { deleteAccount as deleteAccountApi } from "../../services/api/apiProfile";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: deleteAccount,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => deleteAccountApi({ userId: user._id, token }),
    onSuccess: ({ msg }) => {
      toast.success("Sorry to see you go! Account deleted successfully.", {
        duration: 4000,
      });

      // Log out the user after successful deletion
      logout();

      // Redirect to the login page
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(
        `Error deleting account: ${error.message || "An error occurred"}`,
        {
          duration: 5000,
        },
      );
    },
  });

  return { deleteAccount, isLoading, error };
}
