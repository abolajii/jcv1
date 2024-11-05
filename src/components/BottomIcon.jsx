import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";

import { GiRapidshareArrow } from "react-icons/gi";
import React from "react";
import { keyframes } from "styled-components";
import styled from "styled-components";

const Container = styled.div`
  padding: 3px 10px 10px;

  .icons {
    display: flex;
    gap: 6px;
  }
`;

const heartbeat = keyframes`
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BottomIcon = () => {
  return (
    <Container className="flex align-center justify-between">
      <div className="icons">
        <FaRegComment color="#58a485" />
        <FaRegHeart color="rgba(213, 89, 89, 0.9)" />
        <GiRapidshareArrow color="rgba(49, 130, 251, .49)" />
      </div>
      <div>
        <FaRegBookmark color="rgb(222, 163, 38)" />
      </div>
    </Container>
  );
};

export default BottomIcon;
