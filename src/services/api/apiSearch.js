import { BASE_URL } from "../../utils/constants";

export async function saveRecentSearch({ doctorId, token }) {
  const response = await fetch(`${BASE_URL}/api/v1/recentSearch/addDoctor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ doctorId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save recent search");
  }

  const data = await response.json();
  return data;
}

export async function getRecentSearches({ token }) {
  const response = await fetch(`${BASE_URL}/api/v1/recentSearch/getDoctors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message || "Failed to fetch recent searches");
  }

  const data = await response.json();
  return data;
}
