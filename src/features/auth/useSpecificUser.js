import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getSpecifiedUser } from "../../services/api/apiAuth";

export function useSpecificUser(userId) {
  const { token } = useAuth();

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["specific-user", userId],
    queryFn: () => getSpecifiedUser({ token, userId }),
    enabled: !!token && !!userId,
  });

  return { user: data?.data, isLoading, error };
}
