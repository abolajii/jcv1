/* eslint-disable react/prop-types */
import { FaCheck, FaSpinner } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import { BsCheckAll } from "react-icons/bs";
import Seen from "./Seen";
import useAuthStore from "./store/useAuthStore";

const Main = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  height: calc(100svh - 130px);

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Message = styled.div`
  max-width: 100%;
  border-radius: 9px;
  font-size: 14px;
  position: relative;
  opacity: 1;
  transform: translateY(20px);
  animation: slideIn 0.3s ease-out forwards;
  padding: 0 4px;
  padding-bottom: 4px;

  .bottom {
    display: flex;
    /* justify-content: space-between;  */
    gap: 15px;
    /* color: #fff; */

    align-items: end;
    /* padding-top: 5px; */
  }

  .message {
    font-size: 12px;
  }

  .time {
    font-size: 9.5px;
    color: #000;
    /* color: #fff; */

    margin-right: 3px;
    /* color: rgba(255, 255, 255, 0.8); */
  }

  @keyframes slideIn {
    from {
      opacity: 0.9;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageInner = styled.div`
  /* background-color: rgb(196, 203, 203); */
  background-color: #c4cbcb;
  background-color: #1d6363;

  border-radius: 5px;
  padding: 9px;
  /* color: #fff; */

  background-color: ${({ left }) => (left ? `#e2e2e2` : "#92c6c6")};

  .username {
    font-size: 12px;
    font-weight: 500;
  }
`;

const Left = styled(Message)`
  align-self: flex-start;
  margin-top: ${({ isFirstMessage }) => (isFirstMessage ? "8px" : "2px")};

  /*  */
  display: flex;
  align-items: flex-start;

  ${({ hasAvatar }) =>
    !hasAvatar &&
    `
    margin-left: 30px; /* Adjust to align with messages that have an avatar */
  `}
`;

export const Right = styled(Message)`
  align-self: flex-end;
  /* margin-top: ${({ isFirstMessage }) => (isFirstMessage ? "8px" : "2px")}; */
`;

const Notification = styled.div`
  background-color: #c4c5c5;
  padding: 5px;
  border-radius: 4px;
`;

export const formattedTime = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MessageBody = ({ messages, onRetry }) => {
  const { user } = useAuthStore();
  const sortedMessages = messages?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, [messages]);

  return (
    <Main>
      {sortedMessages.map((m, index) => {
        const sender = m.sender._id === user.id;

        // Determine if avatar should be shown for the first message in a sequence
        const showAvi =
          !sender &&
          (index === sortedMessages.length - 1 ||
            sortedMessages[index + 1].sender._id !== m.sender._id);

        const isFirstMessageOfSender =
          index === sortedMessages.length - 1 ||
          sortedMessages[index + 1].sender._id !== m.sender._id;
        if (sender) {
          return (
            <Right key={m._id} isFirstMessageOfSender={isFirstMessageOfSender}>
              <div ref={isFirstRender}>
                <MessageInner>
                  <div className="bottom">
                    <div className="message">{m.content}</div>
                    <MessageStatusIcon status={m.status} />
                    {/* <div className="flex align-center">
                      <div className="time">{formattedTime(m.createdAt)}</div>
                    </div> */}
                  </div>
                </MessageInner>
              </div>
            </Right>
          );
        }

        return (
          <Left
            key={m._id}
            className="flex"
            hasAvatar={showAvi}
            isFirstMessageOfSender={isFirstMessageOfSender}
          >
            {showAvi && (
              <Avi>
                <img src={m.sender.profilePic} />
              </Avi>
            )}
            <div ref={isFirstRender}>
              <MessageInner left>
                <div className="username">{m.sender.name}</div>
                <div className="bottom">
                  <div className="message">{m.content}</div>
                  {/* <div className="flex align-center">
                    <div className="time">{formattedTime(m.createdAt)}</div>
                  </div> */}
                </div>
              </MessageInner>
            </div>
          </Left>
        );
      })}
    </Main>
  );
};

export default MessageBody;

const Avi = styled.div`
  margin-right: 5px;
  height: 25px;
  width: 25px;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const RetryButton = styled.button`
  margin-left: 8px;
  color: red;
  cursor: pointer;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
  font-size: 8px;
`;

const MessageStatusIcon = ({ status }) => {
  switch (status) {
    case "sending":
      return <SpinnerIcon color="#000" />;
    case "sent":
      return <Seen fill="#000" />;
    case "delivered":
      return <Seen fill="#676666" delivered />;

    default:
      return null;
  }
};
