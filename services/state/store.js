// store.js
import create from "zustand";

const useStore = create((set) => ({
  showPassword: false,
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
}));

export default useStore;
