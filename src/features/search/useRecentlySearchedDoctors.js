import { useQuery } from "@tanstack/react-query";
import { getRecentSearches } from "../../services/api/apiSearch";
import { useAuth } from "../auth/useAuth";

export function useRecentlySearchedDoctors() {
  const { token } = useAuth();

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["recentDoctorSearches"],
    queryFn: () => getRecentSearches({ token }),
  });

  return { recentlySearchedDoctors: data?.data, isLoading, error };
}
