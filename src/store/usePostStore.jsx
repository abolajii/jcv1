// src/store/usePostStore.js
import { create } from "zustand";

const usePostStore = create((set) => ({
  loading: true,
  postSent: false,
  posts: [],
  content: "",
  hasComment: false,
  setHasComment: (hasComment) => set({ hasComment }),
  setContent: (content) => set({ content }),
  selectedPost: null,
  // Set loading state
  setPostSent: (postSent) => set({ postSent }),
  setLoading: (loading) => set({ loading }),
  // Set all posts
  setPosts: (posts) => set({ posts, loading: false }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  // Reset posts
  resetPosts: () => set({ posts: [], selectedPost: null, loading: true }),
}));

export default usePostStore;
