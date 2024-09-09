import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isLoggingOut: true,
  signup: async (credentials) => {
    set({ isSigningUp: true });
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
      set({ user: null, isSigningUp: false });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      let res = await axios.post("/api/auth/login", credentials);
      set({ user: res.data.user, isLoggingIn: false });
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
      set({ user: null, isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout Failed");
    }
  },
  authCheck: async () => {
    try {
      let res = await axios.get("/api/auth/authCheck");
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
