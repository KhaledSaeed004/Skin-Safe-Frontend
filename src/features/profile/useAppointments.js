import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/api/apiAppointments";
import { useAuth } from "../auth/useAuth";

export function useAppointments() {
  const { token } = useAuth();

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointments({ token }),
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  return { appointments: data?.data, isLoading, error };
}
