import React, { useState } from "react";

import styled from "styled-components";

const Message = styled.div`
  max-width: 70%;
  padding: 7px;
  border-radius: 9px;
  margin-top: 3px;
  font-size: 14px;
  position: relative;

  opacity: 0;
  transform: translateY(0px); /* Start from below */
  animation: slideIn 0.5s ease-out forwards; /* Slightly longer animation */

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px); /* Start from below */
    }
    to {
      opacity: 1;
      transform: translateY(0); /* Move to original position */
    }
  }
`;

const Left = styled(Message)`
  align-self: flex-start;
  background-color: #c5c4c4;
`;

const Right = styled(Message)`
  background-color: #c5c4c4;
  align-self: flex-end;
`;

const DateText = styled.div`
  font-size: 10px;
  color: #666;
  margin-top: 5px;
`;

const Main = styled.div`
  height: calc(100vh - 50px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse; /* Start messages from the bottom */
  padding: 10px;
`;

const Footer = styled.div`
  bottom: 0;
  height: 50px;
  background-color: #ccc;
  left: 0;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #888;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #666;
  }
`;

const MenuContainer = () => {
  const [messages, setMessages] = useState([
    { id: 5, name: "Left 2", date: "2017-02-03T07:30:00" },
    { id: 6, name: "Left 3", date: "2017-02-03T09:30:00" },
    { id: 4, name: "Right 3", date: "2016-07-03T08:45:00" },
    { id: 3, name: "Right 2", date: "2016-07-03T08:30:00" },
    { id: 2, name: "Left 1", date: "2015-06-03T03:30:00" },
    { id: 1, name: "Right 1", date: "2015-01-01T07:10:00" },
    { id: 7, name: "Right 4", date: "2018-01-01T07:10:00" },
  ]);

  // Function to add a new message to the left or right
  const addMessage = (side) => {
    const newMessage = {
      id: messages.length + 1,
      name:
        side === "left"
          ? `Left ${messages.length + 1}`
          : `Right ${messages.length + 1}`,
      date: new Date().toISOString(),
    };
    setMessages([newMessage, ...messages]);
  };

  // Sort messages by date (earliest at the bottom)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <Main>
        {sortedMessages.map((item) => {
          const formattedDate = new Date(item.date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          return item.name.startsWith("Left") ? (
            <Left key={item.id}>
              {item.name}
              <DateText>{formattedDate}</DateText>
            </Left>
          ) : (
            <Right key={item.id}>
              {item.name}
              <DateText>{formattedDate}</DateText>
            </Right>
          );
        })}
      </Main>
      <Footer>
        <Button onClick={() => addMessage("left")}>Add Left</Button>
        <Button onClick={() => addMessage("right")}>Add Right</Button>
      </Footer>
    </div>
  );
};

export default MenuContainer;
