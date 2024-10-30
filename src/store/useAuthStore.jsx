import { create } from "zustand";

// Check if user and token are stored in localStorage
const initialUser = JSON.parse(localStorage.getItem("user"));
const initialToken = localStorage.getItem("token");

const useAuthStore = create((set) => ({
  isAuthenticated: !!initialToken && !!initialUser,
  user: initialUser || null,

  // Login action
  setUser: (user) => {
    set({ isAuthenticated: true, user });
    localStorage.setItem("user", JSON.stringify(user)); // Ensure user data is in localStorage
  },

  // Logout action
  logout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is logged in
  isLoggedIn: () => set((state) => state.isAuthenticated),
}));

export default useAuthStore;
