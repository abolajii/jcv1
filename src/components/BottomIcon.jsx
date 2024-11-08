/* eslint-disable react/prop-types */
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import { GiRapidshareArrow } from "react-icons/gi";
import useAuthStore from "../store/useAuthStore";

const Container = styled.div`
  padding: 3px 10px 10px;

  .icons {
    display: flex;
    gap: 10px;
    align-items: center;

    .icon-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    span {
      font-size: 0.9em;
      color: #555; // Adjust color as needed
    }
  }
`;

const heartbeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
`;

const HeartIcon = styled.div`
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${heartbeat} 0.5s ease-in-out;
    `}
`;

const BottomIcon = ({
  likeCount,
  replyCount,
  shareCount,
  toggleLike,
  post,
}) => {
  const [liked, setLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (post?.likes.includes(user?.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post?.likes, user?.id]);

  const handleHeartClick = () => {
    setLiked(!liked);
    setIsAnimating(true);
    setCurrentLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    toggleLike();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleReplyClick = () => {};

  return (
    <Container className="flex align-center justify-between">
      <div className="icons">
        <div className="icon-item">
          <FaRegComment color="#58a485" onClick={handleReplyClick} />
          <span>{replyCount > 0 ? replyCount : ""}</span>
        </div>
        <HeartIcon isAnimating={isAnimating} onClick={handleHeartClick}>
          <div className="icon-item">
            {liked ? (
              <FaHeart color="rgba(213, 89, 89, 0.9)" />
            ) : (
              <FaRegHeart color="rgba(213, 89, 89, 0.9)" />
            )}
            <span>{currentLikeCount > 0 ? currentLikeCount : ""}</span>
          </div>
        </HeartIcon>
        <div className="icon-item">
          <GiRapidshareArrow color="rgba(49, 130, 251, .49)" />
          <span>{shareCount > 0 ? shareCount : ""}</span>
        </div>
      </div>
      <div>
        <FaRegBookmark color="rgb(222, 163, 38)" />
      </div>
    </Container>
  );
};

export default BottomIcon;
