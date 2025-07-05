import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/api/apiArticles";

export function useArticles() {
  const {
    data: articles,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return { articles, isLoading, error };
}
