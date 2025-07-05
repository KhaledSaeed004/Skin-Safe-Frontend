import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../../services/api/apiArticles";

export function useArticle(id) {
  const {
    data: article,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
    enabled: !!id,
  });

  return { article, isLoading, error };
}
