import { create } from "zustand";

const usePasswordResetStore = create((set) => ({
    email: "",
    password: "",
    confirmPassword: "",

    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
    resetStore: () => set({ email: "", password: "", confirmPassword: "" }),
}));

export default usePasswordResetStore;