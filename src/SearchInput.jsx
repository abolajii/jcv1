import { FaSearch } from "react-icons/fa";
import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-top: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.expanded ? "flex-start" : "center")};
  border: 1px solid #ccc;
  border-radius: ${(props) => (props.expanded ? "5px" : "50%")};
  width: ${(props) => (props.expanded ? "100%" : "40px")};
  height: 40px;
  transition: all 0.2s ease;
  background: #ddeded;
  padding-left: ${(props) =>
    props.expanded ? "10px" : "0"}; /* Add padding only when expanded */
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

const SearchInput = () => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleSearch = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <SearchContainer>
      <SearchBox expanded={expanded}>
        <SearchIcon onClick={toggleSearch} color="#36bbba" size={17} />
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
