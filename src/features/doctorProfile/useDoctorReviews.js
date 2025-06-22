import { useQuery } from "@tanstack/react-query";
import { getDoctorReviews } from "../../services/api/apiDoctors";

export function useDoctroReviews(id) {
  const {
    data: reviewsData,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: [`doctor-${id}-reviews`],
    queryFn: () => getDoctorReviews(id),
  });

  return { reviews: reviewsData?.data, isLoading, error };
}
