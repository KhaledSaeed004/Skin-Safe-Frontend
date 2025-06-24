import { create } from "zustand";

export const useSignupStore = create((set) => ({
    step: 0,
    data: {},
    setStep: (step) => set({ step }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    updateData: (fields) =>
        set((state) => ({ data: {...state.data, ...fields } })),
    reset: () => set({ step: 0, data: {} }),
}));