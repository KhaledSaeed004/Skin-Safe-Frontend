import { useMutation } from "@tanstack/react-query";
import { updateUserPassword as updateUserPasswordApi } from "../../services/api/apiProfile";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";

export function useUpdateUserPassword() {
  const { token, updateToken } = useAuth();

  const {
    mutate: updatePassword,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (passwordData) =>
      updateUserPasswordApi({ token, passwordData }),
    onSuccess: ({ msg, token: newToken }) => {
      toast.success(msg);

      // If API returns a new token, update it
      if (newToken && newToken !== token) {
        updateToken(newToken);
      }
    },
    onError: (error) => {
      toast.error(
        `Error updating password: ${error.message || "An error occurred"}`,
        {
          duration: 5000,
        },
      );
    },
  });

  return { updatePassword, isLoading, error };
}
