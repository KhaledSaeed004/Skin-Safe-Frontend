import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReport as deleteReportApi } from "../../services/api/apiScan";
import { useAuth } from "../auth/useAuth";

export function useDeleteReport() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate: deleteReport,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (reportId) => deleteReportApi({ reportId, token }),
    onSuccess: () => {
      toast.success("Report deleted successfully!");

      // Invalidate the user data in the query cache
      queryClient.invalidateQueries(["reports"]);
    },
    onError: (error) => {
      toast.error(`Failed to delete report: ${error.message}`);
    },
  });

  return { deleteReport, isLoading, error };
}
