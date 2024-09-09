import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  signup: async (credentials) => {
    try {
      let res = await axios.post("/api/auth/signup", credentials);
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      const errorResponse = error.response?.data?.errors;

      if (errorResponse) {
        Object.keys(errorResponse).forEach((key) => {
          toast.error(errorResponse[key]);
        });
      } else {
        toast.error(error.response?.data?.message || "Signup failed");
      }
      set({ isSigningUp: false, user: null });
    }
  },
  login: async () => {
    try {
      let res = await axios.post("/api/auth/login");
    } catch (error) {}
  },
  logout: async () => {
    try {
      let res = await axios.post("/api/auth/logout");
    } catch (error) {}
  },
  authCheck: async () => {},
}));
