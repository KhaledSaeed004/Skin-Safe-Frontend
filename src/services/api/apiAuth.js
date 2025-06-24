import { BASE_URL } from "../../utils/constants";

export async function signup(userData) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.errors[0].msg || "Signup failed, please try again",
        );
    }

    const data = await response.json();
    return data;
}

export async function confirmSignup({ code, token }) {
    const res = await fetch(`${BASE_URL}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
    });

    if (!res.ok) throw new Error("Confirmation failed");

    return res.json();
}

export async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed, please try again");
    }

    const data = await response.json();
    return data;
}

export async function forgotPassword({ email }) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed");
    }

    const data = await response.json();
    return data;
}

export async function submitPasswordResetOTP({ resetCode, token }) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/verifyResetCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resetCode }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed");
    }

    const data = await response.json();
    return data;
}

export async function resetPassword({ passwordResetData, token }) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/resetPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordResetData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed");
    }

    const data = await response.json();
    return data;
}