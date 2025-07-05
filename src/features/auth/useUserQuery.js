import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import parseJwt from "../../utils/parseJWT";
import { getAuthenticatedUser } from "../../services/api/apiAuth";

export function useUserQuery() {
  const { token } = useAuth();
  const userId = parseJwt(token)?.userId; // Extract userId from the token

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getAuthenticatedUser({ token, userId }),
    enabled: !!token, // Only run the query if token is available
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });

  return { user: data?.data, isLoading, error };
}
