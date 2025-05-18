import { create } from "zustand";

export const useSignupOTPStore = create((set) => ({
    otp: ["", "", "", "", "", ""],
    setOTP: (otp) => set({ otp }),
}));