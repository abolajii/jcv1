/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { FiSend } from "react-icons/fi";
import useStoryStore from "./store/useStoryStore";

// Keyframes for animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20%);
  }
`;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-out
    forwards;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 5px;
`;

const ProgressSegment = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ active }) => (active ? "#2bc8c8" : "#ccc")};
  border-radius: 2px;
`;

const Body = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: #000;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const StoryImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
`;

const ReplyInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  margin-right: 10px;
  outline: none;
  background: #f0f0f0;
`;

const SendButton = styled.button`
  border: none;
  background: #2bc8c8;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1fa4a4;
  }
`;

const StoryModal = ({ isOpen, setIsOpen }) => {
  const { selectedStory } = useStoryStore();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Matches animation duration
    }
  }, [isOpen]);

  const handleNextStory = () => {
    if (selectedStory && currentStoryIndex < selectedStory.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setIsOpen(false); // Close modal when all stories are viewed
    }
  };

  //   const handlePreviousStory = () => {
  //     if (currentStoryIndex > 0) {
  //       setCurrentStoryIndex((prev) => prev - 1);
  //     }
  //   };

  const currentStory = {} || selectedStory?.stories[currentStoryIndex];

  return (
    <Overlay isOpen={isOpen} isVisible={isVisible}>
      <ModalContainer>
        {/* Header */}
        <Header>
          <ProfilePic src={selectedStory?.user?.profilePic} alt="Profile" />
          <Username>{selectedStory?.user?.name}</Username>
        </Header>
        {/* Progress Bar */}
        <ProgressBarContainer>
          {selectedStory?.stories?.map((_, index) => (
            <ProgressSegment key={index} active={index <= currentStoryIndex} />
          ))}
        </ProgressBarContainer>

        {/* Body */}
        <Body onClick={handleNextStory}>
          {currentStory?.media?.type === "image" ? (
            <StoryImage src={currentStory?.media?.url} alt="Story" />
          ) : (
            currentStory?.text || "No content available"
          )}
        </Body>

        {/* Footer */}
        <Footer>
          <ReplyInput placeholder="Reply to story..." />
          <SendButton>
            <FiSend />
          </SendButton>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default StoryModal;
