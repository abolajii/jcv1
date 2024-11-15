import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import { sidebarItems } from "./SidebarMenu";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

const Bottom = styled.div`
  position: fixed;
  height: 60px;
  background-color: #f0eded;
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: ${({ isActive }) => (isActive ? "#36bbba" : "#929292")};
  transition: color 0.3s;

  &:hover {
    color: #36bbba;
  }
`;

const Label = styled.span`
  font-size: 10px;
  margin-top: 4px;
  color: ${({ isActive }) => (isActive ? "#36bbba" : "#929292")};
`;

const Badge = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #36bbba;
  color: white;
  font-size: 10px;
  /* padding: 2px 6px; */
  border-radius: 50%;
  font-weight: bold;
  min-width: 9px;
  min-height: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications } = useAuthStore();

  // Example counts for notifications and conversations
  const notificationCount = notifications.filter(
    (notification) => !notification.isRead && notification.type !== "follow"
  ).length;

  const conversationCount = 0;

  return (
    <Bottom>
      {sidebarItems.map((item) => {
        const isActive = location.pathname === item.path;
        const showBadge =
          item.label === "Notification" || item.label === "Conversation";
        const badgeCount =
          item.label === "Notification"
            ? notificationCount
            : item.label === "Conversation"
            ? conversationCount
            : null;

        return (
          <IconWrapper
            key={item.path}
            isActive={isActive}
            onClick={() => navigate(item.path)}
          >
            {React.cloneElement(item.icon, { size: 21 })}
            {showBadge && badgeCount > 0 && <Badge />}
            {/* <Label isActive={isActive}>{item.label}</Label> */}
          </IconWrapper>
        );
      })}
    </Bottom>
  );
};

export default MobileSidebar;
