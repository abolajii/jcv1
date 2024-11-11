import { AiOutlineUsergroupAdd } from "react-icons/ai";
import GroupModal from "./GroupModal";
import { IoFilterSharp } from "react-icons/io5";
import MainContainer from "./MainContainer";
import React from "react";
import SearchInput from "./SearchInput";
import UserConversation from "./UserConversation";
import message from "./message.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: end;

  .box {
    height: 40px;
    width: 40px;
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
    margin-top: 15px;
  }
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
        <Top>
          <div className="flex">
            <div className="pointer box center" onClick={openModal}>
              <AiOutlineUsergroupAdd color="#36bbba" size={23} />
            </div>
            {/* <div className="pointer"> */}
            <div className="pointer box center">
              <IoFilterSharp color="#36bbba" size={21} />
            </div>
          </div>
        </Top>
        <SearchInput />
        <div>
          <UserConversation />
        </div>
      </Container>
    </MainContainer>
  );
};

export default Conversation;
