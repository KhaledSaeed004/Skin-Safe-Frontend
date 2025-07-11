import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookAppointment as bookAppointmentApi } from "../../services/api/apiAppointments";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export function useBookAppointment() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: bookAppointment,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (appointmentData) =>
      bookAppointmentApi({ appointmentData, token }),
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      // Invalidate the appointments query to refresh the list
      queryClient.invalidateQueries(["appointments"]);
      // Redirect to appointments page after successful booking
      navigate("/user/appointments");
    },
    onError: (error) => {
      toast.error(
        `Failed to book appointment: ${error.message || "Unknown error"}`,
      );
    },
  });

  return { bookAppointment, isLoading, error };
}
