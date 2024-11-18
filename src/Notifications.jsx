import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const App = () => {
  const [notifications, setNotifications] = useState([]);

  // Add Notification
  const addNotification = (type, message) => {
    const id = Date.now(); // Unique ID based on timestamp
    const newNotification = { id, type, message };
    setNotifications((prev) => [...prev, newNotification]);

    // Remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remove Notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <Container>
      {/* Buttons to trigger notifications */}
      <Button
        onClick={() => addNotification("success", "Operation successful!")}
      >
        Show Success
      </Button>
      <Button onClick={() => addNotification("error", "Something went wrong.")}>
        Show Error
      </Button>

      {/* Notification Container */}
      <NotificationContainer>
        {notifications.map((notif, index) => (
          <Notification
            key={notif.id}
            type={notif.type}
            style={{ top: 0 + index * 20 + "px" }} // Stack notifications with offset
          >
            {notif.message}
          </Notification>
        ))}
      </NotificationContainer>
    </Container>
  );
};

export default App;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  gap: 20px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  right: 20px;
  height: 100vh;
  z-index: 1000;
  pointer-events: none; // Allow clicks to pass through to other elements
`;

const Notification = styled.div`
  position: absolute;
  right: 0;
  background-color: ${({ type }) =>
    type === "success" ? "rgba(46, 204, 113, 0.9)" : "rgba(231, 76, 60, 0.9)"};
  color: white;
  padding: 15px 20px;
  /* margin: 10px 0; */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  pointer-events: auto; // Ensure notification is clickable
  width: 300px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  cursor: default;
`;
