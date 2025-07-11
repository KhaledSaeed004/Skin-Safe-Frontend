import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveRecentSearch as saveRecentSearchApi } from "../../services/api/apiSearch";
import { useAuth } from "../auth/useAuth";

export function useSaveRecentDoctorSearch() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate: saveRecentSearch,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (doctorId) => saveRecentSearchApi({ doctorId, token }),
    onSuccess: () => {
      // Invalidate queries to refresh recent searches
      queryClient.invalidateQueries(["recentDoctorSearches"]);
      console.log("Recent doctor search saved successfully");
    },
    onError: (error) => {
      console.error("Error saving recent doctor search:", error);
    },
  });

  return { saveRecentSearch, isLoading, error };
}
