export const createUniqueUsers = (mentionedUsers) => {
  // Use a Map to store unique users by their ID
  const uniqueUsersMap = new Map();

  mentionedUsers.forEach((user) => {
    // Add user to the map only if the ID is not already present
    if (!uniqueUsersMap.has(user.id)) {
      uniqueUsersMap.set(user.id, user);
    }
  });

  // Convert the map values back to an array and return
  return Array.from(uniqueUsersMap.values());
};
