import { AiOutlineUsergroupAdd } from "react-icons/ai";
import GroupModal from "./GroupModal";
import { IoFilterSharp } from "react-icons/io5";
import MainContainer from "./MainContainer";
import React from "react";
import SearchInput from "./SearchInput";
import UserConversation from "./UserConversation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .input {
    width: 100%;
  }
`;

const Top = styled.div`
  display: flex;
  /* gap: 1px; */
  /* justify-content: end; */
  align-items: center;
  margin-bottom: 10px;
  .box {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    &:hover {
      background-color: #c0e2e2;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .flex {
    display: flex;
    gap: 7px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  /* gap: 10px; */
`;

const Conversation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  return (
    <MainContainer>
      <Container className="pl-2 pr-2 pt-2 text-sm">
        <GroupModal
          isOpen={isOpen}
          isClosing={isClosing}
          setIsOpen={setIsOpen}
          setIsClosing={setIsClosing}
        />
        <Top className="flex justify-between align-center">
          <div className="input mr-1">
            <SearchInput />
          </div>

          <IconContainer>
            <div className="flex">
              <div className="pointer box center" onClick={openModal}>
                <AiOutlineUsergroupAdd color="#36bbba" size={23} />
              </div>
              <div className="pointer box center">
                <IoFilterSharp color="#36bbba" size={21} />
              </div>
            </div>
          </IconContainer>
        </Top>
        <div>
          <UserConversation />
        </div>
      </Container>
    </MainContainer>
  );
};

export default Conversation;
