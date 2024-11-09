import { useEffect, useRef, useState } from "react";

import Connects from "./tabs/Connect";
import Discover from "./tabs/Discover";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import MainContainer from "./MainContainer";
import SearchResults from "./SearchResults";
import Sports from "./tabs/Sports";
import Trends from "./tabs/Trends";
import { globalSearch } from "./api/requests";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
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
  color: ${(props) =>
    props.active ? "#28a69e" : "#979797"}; /* Dynamic color */
  transition: color 0.3s ease;
  text-align: center;
  flex: 1;

  &:hover {
    color: #28a69e; /* Color on hover */
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

const tabs = ["Discover", "Trends", "Connects", "Sports"];

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Discover");
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    if (tabsRef.current[activeTabIndex]) {
      const { offsetLeft, offsetWidth } = tabsRef.current[activeTabIndex];
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const handleClear = () => setSearchText("");
  const handleTabClick = (tab) => setActiveTab(tab);

  const handleSearch = async (e) => {
    try {
      const response = await globalSearch(e);
      console.log(response);
      setResults(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <Container>
        <div className="pr-2 pl-2 pt-2">
          <InputContainer>
            <SearchIcon />
            <Input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                e.target.value !== "" && handleSearch(e.target.value);
              }}
              placeholder="Search for connect, trends, anything"
            />
            <ClearIcon show={searchText} onClick={handleClear} />
          </InputContainer>
        </div>
        {searchText !== "" ? (
          <Scrollable>
            <SearchResults results={results} searchTerm={searchText} />
          </Scrollable>
        ) : (
          <>
            <Tabs>
              {tabs.map((tab, index) => (
                <Tab
                  active={activeTab === tab} // Pass active state to Tab
                  key={tab}
                  ref={(el) => (tabsRef.current[index] = el)}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </Tab>
              ))}
              <Slider style={sliderStyle} />
            </Tabs>
            <Scrollable>
              {activeTab === "Discover" && <Discover />}
              {activeTab === "Trends" && <Trends />}
              {activeTab === "Sports" && <Sports />}
              {activeTab === "Connects" && <Connects />}
            </Scrollable>
          </>
        )}
      </Container>
    </MainContainer>
  );
};

export default Search;
