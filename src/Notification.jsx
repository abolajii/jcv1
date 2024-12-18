import { useEffect, useRef, useState } from "react";

import AllMentions from "./AllMentions";
import Interactions from "./Interactions";
import MainContainer from "./MainContainer";
import MentionDashboard from "./Mention";
import Trends from "./tabs/Trends";
import styled from "styled-components";

const Tabs = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
  width: 100%;
`;

const Tab = styled.div`
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  color: ${(props) =>
    props.active ? "#28a69e" : "#9b9b9b"}; /* Dynamic color */
  transition: color 0.3s ease;
  text-align: center;
  flex: 1;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);

  &:hover {
    color: #28a69e; /* Color on hover */
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  background-color: rgba(232, 239, 239, 1);
  z-index: 10;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
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
  margin-top: 60px;
`;

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  margin-bottom: 60px; /* Height of MobileSidebar */

  .width {
    border: 1px solid #c8e2da;
    border-radius: 3px;
  }
`;
const tabs = ["All", "Mentions", "Interactions"];

const Notification = () => {
  const tabsRef = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    if (tabsRef.current[activeTabIndex]) {
      const { offsetLeft, offsetWidth } = tabsRef.current[activeTabIndex];
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <MainContainer>
      <Header>
        <Tabs>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              ref={(el) => (tabsRef.current[index] = el)}
              active={activeTab === tab} // Pass active state to Tab
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Tab>
          ))}
          <Slider style={sliderStyle} />
        </Tabs>
      </Header>
      <Scrollable>
        <Content>
          {activeTab === "All" && <MentionDashboard />}
          {activeTab === "Mentions" && <AllMentions />}
          {activeTab === "Interactions" && <Interactions />}
        </Content>
      </Scrollable>
    </MainContainer>
  );
};

export default Notification;
