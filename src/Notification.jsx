import { useEffect, useRef, useState } from "react";

import MainContainer from "./MainContainer";
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
    props.active ? "#28a69e" : "#979797"}; /* Dynamic color */
  transition: color 0.3s ease;
  text-align: center;
  flex: 1;

  &:hover {
    color: #28a69e; /* Color on hover */
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

const tabs = ["All", "Mentions", "Interactions"];

const Notification = () => {
  const tabsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("All");
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

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
    </MainContainer>
  );
};

export default Notification;
