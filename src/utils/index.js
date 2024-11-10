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

import React from "react";
import styled from "styled-components";

// Styled component for the mention
const Mention = styled.a`
  color: rgba(54, 187, 186, 1);
  display: inline-block;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const formatDate = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}mins ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}hrs ago`;

  const options = { hour: "numeric", minute: "numeric" };
  const postDateString = postDate.toLocaleTimeString([], options);
  const isToday = postDate.toDateString() === now.toDateString();
  const isYesterday =
    postDate.toDateString() === new Date(now - 86400000).toDateString();

  if (isToday) return `Today at ${postDateString}`;
  if (isYesterday) return `Yesterday at ${postDateString}`;
  return postDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

export const truncateWords = (text, maxWords) => {
  const wordsArray = text.split(" "); // Split the text by spaces to get words
  if (wordsArray.length <= maxWords) {
    return text; // If the number of words is less than or equal to maxWords, return the original text
  }

  return wordsArray.slice(0, maxWords).join(" ") + "..."; // Join back the first maxWords and add ellipsis
};

export const formattedContent = (post) => {
  const mentionRegex = /@\w+/g;

  return post?.split(mentionRegex).flatMap((part, index) => {
    const mentions = post.match(mentionRegex);

    const mention = mentions?.[index];

    return [
      React.createElement("span", { key: `part-${index}` }, part),
      mention
        ? React.createElement(Mention, { key: `mention-${index}` }, mention)
        : null,
    ];
  });
};
