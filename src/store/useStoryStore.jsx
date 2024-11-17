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

  handleViewStory: (storyId, userId) => {
    set((state) => {
      const updatedStories = state.allStories.map((storyGroup) => {
        const updatedGroupStories = storyGroup.stories.map((story) => {
          if (story._id === storyId && !story.views.includes(userId)) {
            // Add user to views if not already viewed
            return { ...story, views: [...story.views, userId] };
          }
          return story;
        });
        return { ...storyGroup, stories: updatedGroupStories };
      });
      return { allStories: updatedStories };
    });
  },

  // Action to clear the selected story
  clearSelectedStory: () =>
    set(() => ({
      selectedStory: null,
    })),
}));

export default useStoryStore;
