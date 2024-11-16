import { FaChevronLeft } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import React from "react";
import progress from "./image.jpeg";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
`;

const Top = styled.div`
  position: fixed;
  top: 10px;
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

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${progress}); /* Use the same background image */
  background-size: cover;
  background-position: center;
  filter: blur(10px); /* Apply blur */
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

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  object-fit: cover;
  z-index: 2; /* Ensure it is above the blur background */
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

const UserStory = () => {
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
    <Container>
      <Top className="flex align-center justify-between">
        <div className="flex">
          <div className="flex align-center">
            <FaChevronLeft size={22} color="#fff" className="mr-1" />
            <Avi>
              <img src={progress} alt="User avatar" />
            </Avi>
          </div>
          <div>
            <Username>Admin</Username>
            <Time>2mins ago</Time>
          </div>
        </div>
        {/* <div>B</div> */}
      </Top>
      <Bottom>
        {/* <p>Hello guys</p> */}
        {/* <BlurBackground /> */}
        <StoryImage src={progress} />
        <Caption>All we need is love 🤗</Caption>
      </Bottom>
      <Footer>
        <ReplyInput placeholder="Reply to story..." />
        <SendButton>
          <FiSend />
        </SendButton>
      </Footer>
    </Container>
  );
};

export default UserStory;
