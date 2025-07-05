import { BASE_URL } from "../../utils/constants";

export async function updateUser({ userId, token, updateData }) {
  const response = await fetch(`${BASE_URL}/api/v1/users/updateMe/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const data = await response.json();
  return data;
}

export async function updateUserPassword({ token, passwordData }) {
  const response = await fetch(`${BASE_URL}/api/v1/users/updateUserPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const data = await response.json();
  return data;
}

export async function deactivateAccount({ token }) {
  const response = await fetch(`${BASE_URL}/api/v1/users/deactivateMe`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0].msg);
  }

  const data = await response.json();
  return data;
}

export async function deleteAccount({ userId, token }) {
  const response = await fetch(`${BASE_URL}/api/v1/users/deleteMe/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }

  const data = await response.json();
  return data;
}
