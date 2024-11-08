import UserPost from "./UserPost";
import styled from "styled-components";
/* eslint-disable react/prop-types */
import { useState } from "react";

// Tab container and styles
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  margin-top: 15px;
`;

const Tab = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ active }) => (active ? "#28a69e" : "#2f2f2f")};
  cursor: pointer;
  padding: 5px 0;
  border-radius: 5px;

  &:hover {
    background-color: #e6f7f6;
  }
`;

const ContentContainer = styled.div`
  padding: 5px 15px;
  overflow-y: auto; /* Allows scrolling if the content exceeds the height */
  max-height: calc(100svh - 280px);
`;

const ProfileTab = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("posts"); // Default active tab

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <div>
            <UserPost posts={posts} />
          </div>
        );
      case "media":
        return <div></div>;
      case "likes":
        return <div></div>;
      case "replies":
        return <div></div>;
      case "share":
        return <div></div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <TabContainer>
        <Tab
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </Tab>
        <Tab
          active={activeTab === "media"}
          onClick={() => setActiveTab("media")}
        >
          Media
        </Tab>
        <Tab
          active={activeTab === "likes"}
          onClick={() => setActiveTab("likes")}
        >
          Likes
        </Tab>
        <Tab
          active={activeTab === "replies"}
          onClick={() => setActiveTab("replies")}
        >
          Replies
        </Tab>
        <Tab
          active={activeTab === "share"}
          onClick={() => setActiveTab("share")}
        >
          Share
        </Tab>
      </TabContainer>

      {/* Render content based on active tab */}
      <ContentContainer>{renderTabContent()}</ContentContainer>
    </div>
  );
};

export default ProfileTab;
