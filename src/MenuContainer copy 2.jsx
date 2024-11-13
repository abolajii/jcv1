import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const Message = styled.div`
  max-width: 70%;
  padding: 7px;
  border-radius: 9px;
  margin: 3px 0;
  font-size: 14px;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Left = styled(Message)`
  background-color: #c0adad;
  margin-right: auto; /* Aligns to the left */
  margin-left: 0;
`;

const Right = styled(Message)`
  background-color: #c5c4c4;
  margin-left: auto; /* Aligns to the right */
  margin-right: 0;
`;

const DateText = styled.div`
  font-size: 10px;
  color: #666;
  margin-top: 5px;
`;

const Main = styled.div`
  height: calc(100vh - 50px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  scroll-behavior: smooth;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  z-index: 10;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-out;
`;

const MenuContainer = () => {
  const [messages, setMessages] = useState([]);
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: -170,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const addMessage = (side) => {
    const newMessage = {
      id: Date.now(),
      name:
        side === "left"
          ? `Left ${messages.length + 1}`
          : `Right ${messages.length + 1}`,
      date: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]); // Add to the end of the array
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      <Main ref={mainRef}>
        <MessageContainer>
          {messages.map((item, index) => (
            <MessageWrapper
              key={item.id}
              style={{
                // Add a slight delay to the animation based on position
                animationDelay: `${index * 50}ms`,
              }}
            >
              {item.name.startsWith("Left") ? (
                <Left>
                  {item.name}
                  <DateText>{formatDate(item.date)}</DateText>
                </Left>
              ) : (
                <Right>
                  {item.name}
                  <DateText>{formatDate(item.date)}</DateText>
                </Right>
              )}
            </MessageWrapper>
          ))}
        </MessageContainer>
      </Main>
      <Footer>
        <Button onClick={() => addMessage("left")}>Add Left</Button>
        <Button onClick={() => addMessage("right")}>Add Right</Button>
      </Footer>
    </div>
  );
};

export default MenuContainer;
