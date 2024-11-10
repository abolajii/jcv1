import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate for navigation

import Followers from "./Followers";
import Following from "./Following";
import { HiCheckBadge } from "react-icons/hi2";
import MainContainer from "./MainContainer";
import { MdArrowBack } from "react-icons/md";
import { getUserConnections } from "./api/requests";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: rgba(232, 239, 239, 1);
  z-index: 10;

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
  }
`;

const UserContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 4px;
  background-color: #879696;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  margin-top: 30px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const BackButton = styled.div`
  position: absolute;
  top: -5px; /* Adjust to position above UserAvi */
  left: -3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000000; /* Icon color */
  font-size: 24px; /* Adjust size as needed */
  z-index: 100;

  span {
    font-size: 15px; /* Adjust size as needed */
  }
`;

const Tabs = styled.div`
  display: flex;
  position: relative;
  gap: 20px;
  width: 100%;
  /* padding-top: 70px; Add padding to separate Tabs from Header */
`;

const Tab = styled.div`
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  color: ${(props) => (props.active ? "#28a69e" : "#9b9b9b")};
  transition: color 0.3s ease;
  text-align: center;
  flex: 1;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);

  &:hover {
    color: #28a69e;
  }
`;

const Slider = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #28a69e;
  transition: left 0.3s ease, width 0.3s ease;
`;

const Content = styled.div`
  margin-top: 120px; /* Offset for Header and Tabs */
  padding: 10px;
  overflow-y: auto;
  height: calc(100vh - 130px); /* Adjust height based on header and tabs */
`;

const Connections = () => {
  const { user } = useAuthStore();
  const { uid, tag } = useParams();
  const navigate = useNavigate(); // Initialize navigation hook

  const map = {
    fwn: "following",
    flr: "followers",
  };
  const [activeTab, setActiveTab] = useState(map[tag] || "followers");
  const [userConnections, setUserConnections] = useState({
    followers: [],
    following: [],
  });
  const tabsRef = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  // Fetch connections when the component mounts
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await getUserConnections(uid);
        setUserConnections(data.user);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [uid]);

  // Update slider position and width based on the active tab
  useEffect(() => {
    const activeTabIndex = activeTab === "followers" ? 0 : 1;
    if (tabsRef.current[activeTabIndex]) {
      const { offsetLeft, clientWidth } = tabsRef.current[activeTabIndex];
      setSliderStyle({ left: offsetLeft, width: clientWidth });
    }
  }, [activeTab]);

  return (
    <MainContainer noSidebar>
      <Header>
        <UserContainer>
          <BackButton onClick={() => navigate(-1)}>
            <MdArrowBack />
          </BackButton>
          <UserAvi>
            {userConnections.profilePic && (
              <img src={userConnections.profilePic} alt="User avatar" />
            )}
          </UserAvi>
          <div className="mt-3">
            {userConnections.name && (
              <>
                <div className="flex">
                  <p className="name">{userConnections.name}</p>
                  {userConnections?.isVerified && (
                    <div className="center">
                      <HiCheckBadge color="#1b9d87" />
                    </div>
                  )}
                </div>
                <p className="time">@{userConnections.username}</p>
              </>
            )}
          </div>
        </UserContainer>
        <Tabs>
          <Tab
            ref={(el) => (tabsRef.current[0] = el)}
            active={activeTab === "followers"}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </Tab>
          <Tab
            ref={(el) => (tabsRef.current[1] = el)}
            active={activeTab === "following"}
            onClick={() => setActiveTab("following")}
          >
            Following
          </Tab>
          <Slider style={sliderStyle} />
        </Tabs>
      </Header>
      <Content>
        {activeTab === "followers"
          ? userConnections.followers.map((f, i) => (
              <Followers user={f} key={i} loggedInUser={user.id} />
            ))
          : // <Following />
            userConnections.following.map((f, i) => (
              <Followers user={f} key={i} loggedInUser={user.id} />
            ))}
      </Content>
    </MainContainer>
  );
};

export default Connections;
