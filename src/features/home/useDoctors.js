import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../../services/api/apiDoctors";

export function useDoctors() {
  const {
    data: doctors,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  return { doctors: doctors?.data, isLoading, error };
}
