import React, { useEffect, useRef, useState } from "react";

import Discover from "./tabs/Discover";
import Entertainment from "./tabs/Entertainment";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import MainContainer from "./MainContainer";
import Sports from "./tabs/Sports";
import Trends from "./tabs/Trends";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  width: 100%;
`;

const Tab = styled.div`
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  color: #28a69e;
  transition: color 0.3s ease;
  text-align: center;
  flex: 1;

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

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
`;

const ClearIcon = styled(IoMdClose)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
  cursor: pointer;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 35px 10px 35px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  color: #333;
  font-size: 14px;

  &::placeholder {
    color: #aaa;
    font-size: 14px;
  }

  &:focus {
    border-color: #28a69e;
  }
`;

const tabs = ["Discover", "Trends", "Connects", "Sports"];

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Discover");
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    if (tabsRef.current[activeTabIndex]) {
      const { offsetLeft, offsetWidth } = tabsRef.current[activeTabIndex];
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const handleClear = () => setSearchText("");
  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <MainContainer>
      <Container>
        <div className="pr-2 pl-2 pt-2">
          <InputContainer>
            <SearchIcon />
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for connect, trends, anything"
            />
            <ClearIcon show={searchText} onClick={handleClear} />
          </InputContainer>
        </div>
        <Tabs>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Tab>
          ))}
          <Slider style={sliderStyle} />
        </Tabs>
        {activeTab === "Discover" && <Discover />}
        {activeTab === "Trends" && <Trends />}
        {activeTab === "Sports" && <Sports />}
        {activeTab === "Entertainment" && <Entertainment />}
      </Container>
    </MainContainer>
  );
};

export default Search;
