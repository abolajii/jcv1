/* eslint-disable react/prop-types */
import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import ProgressiveImage from "./Progressive";
import { formatDate } from "./utils";
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

const ClickZone = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  z-index: 10;
  cursor: pointer;
`;

const LeftZone = styled(ClickZone)`
  left: 0;
`;

const RightZone = styled(ClickZone)`
  right: 0;
`;

const Top = styled.div`
  position: fixed;
  top: 20px;
  left: 0px;
  z-index: 10;

  width: 100%;
  padding: 5px;
`;

const Bottom = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TextBg = styled.div`
  height: 100%;
  width: 100%;
  background-color: #2f7377;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(18, 18, 18, 1);
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
  z-index: 10;
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
    animation-play-state: ${({ isPaused }) =>
      isPaused ? "paused" : "running"};
  }
`;

const UserStory = ({ setIsOpen, isOpen }) => {
  const { selectedStory } = useStoryStore();
  const [activeStory, setActiveStory] = useState(0);
  const [completedStories, setCompletedStories] = useState([]);
  const [canProgress, setCanProgress] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [justBlurred, setJustBlurred] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const storyDuration = 5;
  const { user } = useAuthStore();

  useEffect(() => {
    const currentStory = selectedStory?.stories[activeStory];
    if (currentStory?.media?.type === "image") {
      setCanProgress(false);
    } else {
      setCanProgress(true);
    }
  }, [activeStory, selectedStory?.stories]);

  useEffect(() => {
    if (
      !isOpen ||
      activeStory >= selectedStory?.stories?.length ||
      isInputFocused
    ) {
      return;
    }

    const currentStory = selectedStory.stories[activeStory];

    if (!canProgress) {
      return;
    }

    const storyId = currentStory._id;
    const hasViewed = currentStory?.views?.includes(user.id);

    if (!hasViewed) {
      viewStory(storyId);
    }

    if (isManualNavigation) {
      setIsManualNavigation(false);
      setCompletedStories((prevCompleted) => {
        const newCompleted = [...prevCompleted];
        const index = newCompleted.indexOf(activeStory);
        if (index > -1) {
          newCompleted.splice(index, 1);
        }
        return newCompleted;
      });
    }

    const timer = setTimeout(() => {
      setCompletedStories((prev) => [...prev, activeStory]);

      if (activeStory >= selectedStory.stories.length - 1) {
        setIsOpen(false);
      } else {
        setActiveStory((prev) => prev + 1);
      }
    }, storyDuration * 1000);

    return () => clearTimeout(timer);
  }, [
    isOpen,
    activeStory,
    selectedStory?.stories,
    setIsOpen,
    user.id,
    canProgress,
    isInputFocused,
    isManualNavigation,
  ]);

  useEffect(() => {
    if (justBlurred) {
      const timer = setTimeout(() => {
        setJustBlurred(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [justBlurred]);

  const handleNextStory = async () => {
    if (activeStory < selectedStory.stories.length - 1) {
      setIsManualNavigation(true);
      const nextStoryId = selectedStory.stories[activeStory + 1]._id;
      const hasViewed = selectedStory.stories[activeStory + 1].views.includes(
        user.id
      );

      if (!hasViewed) {
        await viewStory(nextStoryId);
      }

      setCompletedStories((prev) => [...prev, activeStory]);
      setActiveStory((prev) => prev + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handlePrevStory = () => {
    if (activeStory > 0) {
      setIsManualNavigation(true);
      setActiveStory((prev) => prev - 1);
      setCompletedStories((prev) =>
        prev.filter((index) => index !== activeStory - 1)
      );
    }
  };

  const handleImageLoad = () => {
    setCanProgress(true);
  };

  const handleSendReply = () => {
    // Add your reply submission logic here
    setReplyText("");
    setIsInputFocused(false);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    setJustBlurred(true);
  };

  const renderStoryContent = (story) => {
    if (story.media?.type === "image") {
      return (
        <BlurBackground className="h-100 w-100">
          <ProgressiveImage
            src={story.media.url}
            alt="Story"
            onLoad={handleImageLoad}
          />
          {story?.text && <Caption>{story.text}</Caption>}
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
      return <TextBg>{story.text}</TextBg>;
    }
    return <div>Unsupported content</div>;
  };

  if (!selectedStory || !selectedStory.stories) {
    return null;
  }

  return (
    <Container>
      <LeftZone
        onClick={(e) => {
          e.stopPropagation();
          if (!justBlurred && !isInputFocused) handlePrevStory();
        }}
      />
      <RightZone
        onClick={(e) => {
          e.stopPropagation();
          if (!justBlurred && !isInputFocused) handleNextStory();
        }}
      />

      <ProgressBarContainer>
        {selectedStory.stories.map((story, index) => (
          <ProgressSegment
            key={index}
            isActive={index === activeStory && canProgress}
            isCompleted={completedStories.includes(index)}
            duration={storyDuration}
            isPaused={isInputFocused}
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
                setIsOpen(false);
              }}
            />
            <Avi>
              <img src={selectedStory.user?.profilePic} alt="User avatar" />
            </Avi>
          </div>
          <div>
            <Username>{selectedStory.user?.name}</Username>
            <Time>
              {formatDate(selectedStory.stories[activeStory]?.createdAt)}
            </Time>
          </div>
        </div>
      </Top>

      <Bottom>{renderStoryContent(selectedStory.stories[activeStory])}</Bottom>

      <Footer>
        <ReplyInput
          placeholder="Reply to story..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={handleInputBlur}
        />
        <SendButton onClick={handleSendReply}>
          <FiSend />
        </SendButton>
      </Footer>
    </Container>
  );
};

export default UserStory;
