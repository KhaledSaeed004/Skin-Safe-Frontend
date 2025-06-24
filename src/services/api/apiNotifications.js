import { BASE_URL } from "../../utils/constants";

export async function getNotifications({ userId = null, token }) {
  const response = await fetch(`${BASE_URL}/api/v1/notifications/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : [];
  return data;
}
