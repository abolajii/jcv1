import styled, { keyframes } from "styled-components";

import { useState } from "react";

// Styles for the message container
const MessageContainer = styled.div`
  max-height: 100vh - 120px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Styles for individual message items with animation
const MessageItem = styled.div`
  background-color: red;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(0%);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const MessageSystem = () => {
  const [messages, setMessages] = useState([]);

  // Function to add a new message
  const addMessage = () => {
    const newMessage = {
      id: Date.now(), // Unique ID for each message
      message: `This is message ${messages.length + 1}`,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <MessageContainer>
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            style={{ top: `${index * 60 + 20}px` }} // Adjust the stacking offset
          >
            {message.message}
          </MessageItem>
        ))}
      </MessageContainer>

      <Button onClick={addMessage}>Add Message</Button>
    </div>
  );
};

export default MessageSystem;
