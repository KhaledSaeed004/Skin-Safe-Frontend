import { BASE_URL } from "../../utils/constants";

export async function getArticles() {
  const response = await fetch(`${BASE_URL}/api/v1/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch articles");
  }

  return data;
}

export async function getArticle(id) {
  const response = await fetch(`${BASE_URL}/api/v1/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch article");
  }

  return data;
}
