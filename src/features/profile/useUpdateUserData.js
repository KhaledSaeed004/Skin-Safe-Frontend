import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/api/apiProfile";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";

export function useUpdateUserData() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (updateData) => updateUserApi({ ...updateData, token }),
    onSuccess: ({ data }) => {
      toast.success("Profile updated successfully!");

      // Invalidate the user data in the query cache
      queryClient.invalidateQueries(["user"]); // This will refetch the user data
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  return { updateUser, isLoading, error };
}
