import CircleBorder from "./CircleBorder";
import React from "react";
import styled from "styled-components";

// Styled components for the avatar image
const AvatarContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Avi = ({ imageSrc, segments = 1 }) => {
  return (
    <AvatarContainer>
      {/* Circle Border */}
      <CircleBorder segments={segments} />
      {/* Avatar Image */}
      <AvatarImage src={imageSrc} alt="User Avatar" />
    </AvatarContainer>
  );
};

export default Avi;
