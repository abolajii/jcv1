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
  height: calc(100svh - 120px);

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
  padding: 7px;
  border-radius: 9px;
  margin-top: 3px;
  font-size: 14px;
  position: relative;
  opacity: 1;
  transform: translateY(20px);
  animation: slideIn 0.3s ease-out forwards;

  .bottom {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: end;
    padding: 2px 4px;
    padding-top: 5px;
  }

  .message {
    font-size: 12px;
  }

  .time {
    font-size: 9.5px;
    color: #424141;
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

const Left = styled(Message)`
  align-self: flex-start;
  background-color: #c5c4c4;
`;

export const Right = styled(Message)`
  background-color: #c5c4c4;
  align-self: flex-end;
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
      {sortedMessages.map((m) => {
        const sender = m.sender._id === user.id;
        if (sender) {
          return (
            <>
              <Right key={m._id} ref={isFirstRender}>
                <div className="bottom">
                  <div className="message">{m.content}</div>
                  <div className="flex align-center">
                    <div className="time">{formattedTime(m.createdAt)}</div>
                    <MessageStatusIcon status={m.status} />
                  </div>
                </div>
              </Right>
              {/* {m.status === "sending" && (
                <RetryButton onClick={onRetry}>Retry</RetryButton>
              )} */}
            </>
          );
        }
        return <Left key={m._id}>{m.content}</Left>;
      })}
    </Main>
  );
};

export default MessageBody;

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
      return <SpinnerIcon />;
    case "sent":
      return <Seen fill="#676666" />;
    case "delivered":
      return <Seen fill="#676666" delivered />;

    default:
      return null;
  }
};
