import { useEffect, useRef, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import BottomTab from "./components/BottomTab";
import MainContainer from "./MainContainer";
import Textarea from "./components/Textarea";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 70px; /* Height of Header */
  margin-bottom: 70px; /* Height of MobileSidebar */

  .width {
    border: 1px solid #caf7e9;
    border-radius: 3px;
  }
`;

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 4px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;

  img {
    border-radius: 5px;
  }
`;

const OtherStory = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  max-width: calc(100vw - 90px);

  .avi {
    flex: 0 0 auto;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #f4f4f4;
  }
`;

const AddIcon = styled(AiOutlinePlus)`
  position: absolute;
  bottom: -3px;
  right: -5px;
  color: white;
  background-color: #36bbba;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  height: 15px;
  width: 15px;
  &:hover {
    background-color: #28a69e;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px; /* Adjust as needed */
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 10px;
  background-color: white; /* Optional background */
  z-index: 10;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Dashboard = () => {
  const { user } = useAuthStore();

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MainContainer>
      <Header>
        <div className="flex gap-md align-center">
          <UserAvi>
            <img src={user?.profilePic} alt="User avatar" />
            <AddIcon size={13} color="#fff" />
          </UserAvi>
          <OtherStory>{/* Additional elements here */}</OtherStory>
        </div>
      </Header>
      <Scrollable>
        <div className="width pl-2 pr-2 pt-2 pb-2">
          <div className="text" ref={contentRef}>
            <Textarea width={width} setText={setContent} text={content} />
            <BottomTab />
          </div>
        </div>
      </Scrollable>
    </MainContainer>
  );
};

export default Dashboard;
