import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation

import React from "react";
import { sidebarItems } from "./SidebarMenu";
import styled from "styled-components";

const Bottom = styled.div`
  position: fixed;
  height: 60px;
  z-index: 999;
  background-color: #f3f3f3;

  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: ${({ isActive }) =>
    isActive ? "#36bbba" : "#929292"}; // Change color based on active status
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

const MobileSidebar = () => {
  const location = useLocation(); // Get the current path
  const navigate = useNavigate(); // Get the current
  return (
    <Bottom>
      {sidebarItems.map((item) => {
        const isActive = location.pathname === item.path; // Check if the current path matches the item's path

        return (
          <IconWrapper
            key={item.path}
            isActive={isActive}
            onClick={() => navigate(item.path)}
          >
            {React.cloneElement(item.icon, { size: 20 })}{" "}
            {/* Adjusted icon size */}
            <Label isActive={isActive}>{item.label}</Label>
          </IconWrapper>
        );
      })}
    </Bottom>
  );
};

export default MobileSidebar;
