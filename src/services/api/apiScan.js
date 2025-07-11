import { BASE_URL } from "../../utils/constants";

export function uploadScanXHR({ token, image, onProgress, signal }) {
  return new Promise((resolve, reject) => {
    if (image.size > 5 * 1024 * 1024) {
      return reject(new Error("File size exceeds the 5MB limit"));
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("scannedImage", image);

    xhr.open("POST", `${BASE_URL}/api/v1/reports/`, true);

    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    // Optional: wire cancellation
    if (signal) {
      signal.addEventListener("abort", () => {
        xhr.abort();
        reject(new Error("Upload cancelled"));
      });
    }

    // Progress event
    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error("Invalid JSON response"));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.message || "Upload failed"));
        } catch {
          reject(new Error("Upload failed"));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(formData);
  });
}

export async function getReport({ token, reportId }) {
  const response = await fetch(`${BASE_URL}/api/v1/reports/${reportId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch report");
  }

  const data = await response.json();
  return data;
}

export async function getReports({ token, userId }) {
  const response = await fetch(`${BASE_URL}/api/v1/reports/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch reports");
  }

  const data = await response.json();
  return data;
}

export async function deleteReport({ reportId, token }) {
  const response = await fetch(`${BASE_URL}/api/v1/reports/${reportId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete report");
  }

  const data = await response.json();
  return data;
}
