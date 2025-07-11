import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/api/apiNotifications";

export function useNotifications() {
  const {
    data: notifications,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 20000, // every 20 seconds
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 5000,
  });

  return { notifications, isLoading, error };
}
