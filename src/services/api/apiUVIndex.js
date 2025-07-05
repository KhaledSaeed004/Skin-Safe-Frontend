import { BASE_URL } from "../../utils/constants";

export async function getUVIndex({ lat, lon }) {
  const response = await fetch(
    `${BASE_URL}/api/v1/uvIndex/latest-uv?lat=${lat}&lon=${lon}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const data = await response.json();
  return data;
}
