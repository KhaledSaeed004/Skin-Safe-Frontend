import { useQuery } from "@tanstack/react-query";
import { getReport } from "../../services/api/apiScan";
import { useAuth } from "../auth/useAuth";

export function useReport(id) {
  const { token } = useAuth();

  const {
    data: report,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["report", id],
    queryFn: () => getReport({ token, reportId: id }),
    enabled: !!id,
  });

  return { report, isLoading, error };
}
