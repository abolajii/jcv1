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

import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

// Styled component for the mention
const Mention = styled(Link)`
  color: rgba(54, 187, 186, 1);
  display: inline-block;
  text-decoration: none;

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
  // Split the text into words
  const words = text.split(" ");

  // Check if the word count exceeds the maxWords limit
  if (words.length > maxWords) {
    // Join the first maxWords words and add an ellipsis at the end
    return words.slice(0, maxWords).join(" ") + "...";
  }

  // If the word count is within the limit, return the text as is
  return text;
};

// export const formattedContent = (post) => {
//   const mentionRegex = /@\w+/g;

//   return post?.split(mentionRegex).flatMap((part, index) => {
//     const mentions = post.match(mentionRegex);

//     const mention = mentions?.[index];

//     return [
//       React.createElement("span", { key: `part-${index}` }, part),
//       mention
//         ? React.createElement(Mention, { key: `mention-${index}` }, mention)
//         : null,
//     ];
//   });
// };

export const formattedContent = (post) => {
  const mentionRegex = /@\w+/g;

  return post?.split(mentionRegex).flatMap((part, index) => {
    const mentions = post.match(mentionRegex);
    const mention = mentions?.[index];

    return [
      React.createElement("span", { key: `part-${index}` }, part),
      mention
        ? React.createElement(
            Mention,
            {
              key: `mention-${index}`,
              to: `/profile/${mention.slice(1)}`,
              onClick: (event) => {
                event.stopPropagation(); // Prevents the container click event
              },
            },
            mention
          )
        : null,
    ];
  });
};

// Modify the formattedContent to handle dynamic links:
