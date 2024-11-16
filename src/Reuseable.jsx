import styled, { css, keyframes } from "styled-components";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// import { FiSend } from "react-icons/fi";
import useStoryStore from "./store/useStoryStore";

const fillProgress = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 1000;
`;

const ModalContainer = styled.div`
  margin: 2% auto;
  padding: 10px;
  border-radius: 10px;
`;

const ProgressSegment = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ isCompleted }) => (isCompleted ? "#0bdb8b" : "#f7f7f7")};
  border-radius: 2px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #0bdb8b;
    width: 0;
    animation: ${({ isActive, duration }) =>
      isActive &&
      css`
        ${fillProgress} ${duration}s linear forwards
      `};
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const StoryContent = styled.div`
  font-size: 18px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const StoryImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

const Username = styled.div`
  font-size: 12px;
  flex: 1;
  color: white;
`;

const Avi = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: red;
  margin-top: 10px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
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

const Body = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100svh - 180px);
  background: #000;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const Reuseable = ({ isOpen, setIsOpen }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [activeStory, setActiveStory] = useState(0);
  const [completedStories, setCompletedStories] = useState([]);
  const storyDuration = 30; // Duration per story in seconds
  const { selectedStory } = useStoryStore();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setActiveStory(0);
      setCompletedStories([]);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && activeStory < selectedStory.stories.length) {
      const timer = setTimeout(() => {
        setCompletedStories((prev) => [...prev, activeStory]); // Mark as completed
        setActiveStory((prev) => prev + 1);
      }, storyDuration * 1000);

      return () => clearTimeout(timer);
    }

    if (isOpen && activeStory >= selectedStory.stories.length) {
      setIsOpen(false); // Close modal
    }
  }, [isOpen, activeStory, selectedStory?.stories?.length, setIsOpen]);

  const handleNextStory = () => {
    if (activeStory < selectedStory.stories.length - 1) {
      setCompletedStories((prev) => [...prev, activeStory]);
      setActiveStory((prev) => prev + 1);
    } else {
      setIsOpen(false); // Close the modal when all stories are viewed
    }
  };

  const renderStoryContent = (story) => {
    if (story.media?.type === "image") {
      return <StoryImage src={story.media.url} alt="Story" />;
    } else if (story.media?.type === "video") {
      return (
        <video controls style={{ maxWidth: "100%", borderRadius: "10px" }}>
          <source src={story.media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (story.text) {
      return <div>{story.text}</div>;
    } else {
      return <div>Unsupported content</div>;
    }
  };

  return (
    <Overlay isVisible={isVisible}>
      <ModalContainer>
        {/* <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton> */}
        <ProgressBarContainer>
          {selectedStory?.stories?.map((_, index) => (
            <ProgressSegment
              key={index}
              isActive={index === activeStory}
              isCompleted={completedStories.includes(index)}
              duration={storyDuration}
            />
          ))}
        </ProgressBarContainer>
        {Object.keys(selectedStory).length > 0 &&
          selectedStory.stories[activeStory] && (
            <StoryContent>
              {selectedStory.stories[activeStory].content}
            </StoryContent>
          )}
        <Header>
          <Avi>
            <img src={selectedStory?.user?.profilePic} alt="User avatar" />
          </Avi>

          {/* <ProfilePic src={selectedStory?.user?.profilePic} alt="Profile" /> */}
          <Username>{selectedStory?.user?.name}</Username>
        </Header>
        <Body onClick={handleNextStory}>
          {Object.keys(selectedStory).length > 0 &&
            selectedStory?.stories[activeStory] &&
            renderStoryContent(selectedStory.stories[activeStory])}
        </Body>
        {/* Footer */}
        {/* <Footer>
          <ReplyInput placeholder="Reply to story..." />
          <SendButton>
            <FiSend />
          </SendButton>
        </Footer> */}
      </ModalContainer>
    </Overlay>
  );
};

export default Reuseable;
