import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "../../services/api/apiDoctors";

export function useDoctor(id) {
  const {
    data: doctorData,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["doctor", { id }],
    queryFn: () => getDoctor(id),
  });

  return { data: doctorData?.data, isLoading, error };
}
