import { BASE_URL } from "../../utils/constants";

// Talk  to the backend team to change the request body with query params
export async function getUVIndex({ lat, lon }) {
    const response = await fetch(`${BASE_URL}/api/v1/uvIndex/latest-uv`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lon }),
    });

    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].msg);
    }

    const data = await response.json();
    return data;
}