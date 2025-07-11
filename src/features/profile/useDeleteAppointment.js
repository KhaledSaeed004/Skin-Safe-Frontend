import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment as deleteAppointmentApi } from "../../services/api/apiAppointments";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";

export function useDeleteAppointment() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate: deleteAppointment,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (appointmentId) =>
      deleteAppointmentApi({ appointmentId, token }),
    onSuccess: () => {
      toast.success("Appointment deleted successfully!");

      // Invalidate the user data in the query cache
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      toast.error(`Failed to delete appointment: ${error.message}`);
    },
  });

  return { deleteAppointment, isLoading, error };
}
