import { useQuery } from "@tanstack/react-query";
import { getReports } from "../../services/api/apiScan";
import { useAuth } from "../auth/useAuth";
import { useUserQuery } from "../auth/useUserQuery";

export function useReports() {
  const { token } = useAuth();
  const { user, isLoading: isUserLoading } = useUserQuery();
  const userId = user?._id;

  const {
    data: reports,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: () => getReports({ token, userId }),
    enabled: !!token && !!userId,
  });

  return { reports, isLoading: isLoading || isUserLoading, error };
}
