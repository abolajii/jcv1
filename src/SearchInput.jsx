import { FaSearch } from "react-icons/fa";
import React from "react";
import styled from "styled-components";
// Styles
const SearchContainer = styled.div`
  margin-top: 10px;
  flex: 1; /* Allow it to take up remaining space */
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.expanded ? "flex-start" : "center")};
  border: 1px solid #ccc;
  border-radius: ${(props) => (props.expanded ? "5px" : "50%")};
  width: ${(props) => (props.expanded ? "100%" : "30px")};
  height: 30px;
  transition: all 0.2s ease;
  background: #ddeded;
  padding-left: ${(props) => (props.expanded ? "10px" : "0")};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  padding: 0 5px;
  display: ${(props) => (props.expanded ? "block" : "none")};
  font-size: 13px;

  &::placeholder {
    font-size: 13px;
  }
`;

const SearchIcon = styled(FaSearch)`
  cursor: pointer;
`;

// SearchInput component
const SearchInput = () => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleSearch = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <SearchContainer>
      <SearchBox expanded={expanded}>
        <SearchIcon onClick={toggleSearch} color="#36bbba" size={15} />
        <Input
          type="text"
          placeholder="Search for anything..."
          expanded={expanded}
        />
      </SearchBox>
    </SearchContainer>
  );
};
export default SearchInput;
