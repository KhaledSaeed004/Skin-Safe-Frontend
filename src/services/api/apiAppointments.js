import { BASE_URL } from "../../utils/constants";

export async function bookAppointment({ appointmentData, token }) {
  const response = await fetch(`${BASE_URL}/api/v1/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to book appointment");
  }

  const data = await response.json();
  return data;
}

export async function getAppointments({ token }) {
  const response = await fetch(`${BASE_URL}/api/v1/appointments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch appointments");
  }

  const data = await response.json();
  return data;
}

export async function deleteAppointment({ appointmentId, token }) {
  const response = await fetch(
    `${BASE_URL}/api/v1/appointments/${appointmentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete appointment");
  }

  const data = await response.json();
  return data;
}
