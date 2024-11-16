/* eslint-disable react/prop-types */
import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import LazyStoryImage from "./LazyLoad";
import { formatDate } from "./utils";
// import React from "react";
import progress from "./image.jpeg";
import useAuthStore from "./store/useAuthStore";
import useStoryStore from "./store/useStoryStore";
import { viewStory } from "./api/requests";

const fillProgress = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  inset: 0;
  z-index: 100;
`;

const Top = styled.div`
  position: fixed;
  top: 20px;
  left: 0px;
  z-index: 3;
  width: 100%;
  padding: 5px;
`;

const Bottom = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 2;
  /* padding: 10px; */

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
`;

const TextBg = styled.div`
  height: 100%;
  width: 100%;
  background-color: #2f7377;
  color: white;
`;

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(93, 75, 75, 1);
  /* background-image: ${({ src }) =>
    src && `url(${src})`}; Use the same background image */
  background-size: cover;
  background-position: center;

  z-index: 1;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 10px;
  z-index: 4;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #bcbcbc;
`;

const ReplyInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  margin-right: 10px;
  outline: none;
  background: #e4e3e3;
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

const Avi = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-right: 9px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Caption = styled.div`
  position: fixed;
  bottom: 70px;
  z-index: 5;
  left: 10px;
  color: white;
  font-size: 12px;
`;

const Username = styled.div`
  font-size: 13px;
  flex: 1;
  color: #ffffff;
  font-weight: 500;
`;

const Time = styled.div`
  font-size: 11px;
  flex: 1;
  color: #ffffff;
  margin-top: -3px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 2px;
  position: fixed;
  top: 5px;
  left: 0px;
  z-index: 3;
  width: 100%;
  padding: 5px;
`;

const ProgressSegment = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ isCompleted }) => (isCompleted ? "#0bdb8b" : "#ccc")};
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

const UserStory = ({ setIsOpen, isOpen }) => {
  //

  const { selectedStory } = useStoryStore();
  const [activeStory, setActiveStory] = useState(0);
  const [completedStories, setCompletedStories] = useState([]);
  const storyDuration = 5; // Duration per story in seconds
  const { user } = useAuthStore();

  useEffect(() => {
    if (isOpen && activeStory < selectedStory.stories.length) {
      const storyId = selectedStory.stories[activeStory]._id;
      const hasViewed = selectedStory.stories[activeStory]?.views?.includes(
        user.id
      );

      if (!hasViewed) {
        viewStory(storyId);
      }

      const timer = setTimeout(() => {
        setCompletedStories((prev) => [...prev, activeStory]); // Mark as completed
        setActiveStory((prev) => prev + 1);
      }, storyDuration * 1000);

      return () => clearTimeout(timer);
    }

    if (isOpen && activeStory >= selectedStory.stories.length) {
      setIsOpen(false); // Close modal
    }
  }, [isOpen, activeStory, selectedStory?.stories, setIsOpen, user]);

  const handleNextStory = async () => {
    if (activeStory < selectedStory.stories.length - 1) {
      // Update handleNextStory
      const nextStoryId = selectedStory.stories[activeStory + 1]._id;

      const hasViewed = selectedStory.stories[activeStory + 1].views.includes(
        user.id
      );

      if (!hasViewed) {
        // Mark the next story as viewed
        const response = await viewStory(nextStoryId);
        console.log(response);
      }

      setCompletedStories((prev) => [...prev, activeStory]);
      setActiveStory((prev) => prev + 1);
    } else {
      setIsOpen(false); // Close the modal when all stories are viewed
    }
  };

  const renderStoryContent = (story) => {
    if (story.media?.type === "image") {
      return (
        <BlurBackground className="h-100 w-100">
          {/* <BlurBackground src={story.media.url} /> */}
          <LazyStoryImage src={story.media.url} alt="Story" />;
          {story?.text && <Caption>All we need is love 🤗</Caption>}
        </BlurBackground>
      );
    } else if (story.media?.type === "video") {
      return (
        <video controls style={{ maxWidth: "100%", borderRadius: "10px" }}>
          <source src={story.media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (story.text) {
      return <TextBg className="center">{story.text}</TextBg>;
    } else {
      return <div>Unsupported content</div>;
    }
  };

  return (
    <Container onClick={handleNextStory}>
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
      <Top className="flex align-center justify-between">
        <div className="flex">
          <div className="flex align-center">
            <FaChevronLeft
              size={22}
              color="#fff"
              className="mr-1 pointer"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false); // Close modal
              }}
            />
            <Avi>
              <img src={selectedStory?.user?.profilePic} alt="User avatar" />
            </Avi>
          </div>
          <div>
            <Username>{selectedStory?.user?.name}</Username>
            <Time>
              {formatDate(selectedStory.stories[activeStory]?.createdAt)}
            </Time>
          </div>
        </div>
        {/* <div>B</div> */}
      </Top>
      <Bottom>
        {Object.keys(selectedStory).length > 0 &&
          selectedStory?.stories[activeStory] &&
          renderStoryContent(selectedStory.stories[activeStory])}

        {/* <p>Hello guys</p> */}
        {/* <BlurBackground /> */}
        {/* <StoryImage src={progress} />
        <Caption>All we need is love 🤗</Caption> */}
      </Bottom>
      <Footer>
        {/* <ReplyInput placeholder="Reply to story..." />
        <SendButton>
          <FiSend />
        </SendButton> */}
      </Footer>
    </Container>
  );
};

export default UserStory;
