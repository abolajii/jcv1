import { create } from "zustand";

const useStoryStore = create((set) => ({
  allStories: [], // Array to store all stories
  selectedStory: {}, // Object to store the currently selected story

  // Action to set all stories
  setAllStories: (stories) =>
    set(() => ({
      allStories: stories,
    })),

  // Action to add a new story
  addStory: (newStory) =>
    set((state) => ({
      allStories: [...state.allStories, newStory],
    })),

  // Action to update a story
  updateStory: (storyId, updatedStory) =>
    set((state) => ({
      allStories: state.allStories.map((story) =>
        story.id === storyId ? { ...story, ...updatedStory } : story
      ),
    })),

  // Action to delete a story
  deleteStory: (storyId) =>
    set((state) => ({
      allStories: state.allStories.filter((story) => story.id !== storyId),
    })),

  // Action to select a story
  selectStory: (story) =>
    set(() => ({
      selectedStory: story,
    })),

  // Action to clear the selected story
  clearSelectedStory: () =>
    set(() => ({
      selectedStory: null,
    })),
}));

export default useStoryStore;
