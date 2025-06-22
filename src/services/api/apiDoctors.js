import { BASE_URL } from "../../utils/constants";

export async function getDoctors() {
  const response = await fetch(`${BASE_URL}/api/v1/doctors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const data = await response.json();
  return data;
}

export async function getDoctor(id) {
  const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const data = await response.json();
  return data;
}

export async function getDoctorReviews(id) {
  const response = await fetch(
    `${BASE_URL}/api/v1/reviews/doctorReviews/${id}`,
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
