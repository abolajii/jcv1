import { FiLogOut, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

import { AiOutlineBell } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
/* eslint-disable react/prop-types */
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import { useState } from "react";

// Sidebar styles with transition for sliding in
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) =>
    props.isOpen ? "0" : "-220px"}; /* Change 220px to your sidebar width */
  height: 100%;
  width: 220px; /* Width of the sidebar */
  background-color: rgba(232, 239, 239, 1);

  transition: left 0.3s ease-in-out; /* Smooth sliding transition */
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.02);

  .divider {
    height: 14px;
    width: 1px;
    background: #9c9c9c;
    margin: 0 3px;
  }
  .btn {
    padding: 7px;
    margin-top: 4px;
    margin-bottom: 10px;
    flex: 1;
    text-align: center;
  }
  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
    color: #393939;
  }

  .top {
    margin-top: 50px;
  }
`;

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 4px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;

  img {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ToggleButton = styled.div`
  background-color: rgba(28, 28, 28, 0.5);
  height: 100%;
  width: 50%;
  position: absolute;
  border-radius: 4px;
  top: 2px;
  left: ${(props) =>
    props.isDarkMode ? "0%" : "50%"}; /* Position based on mode */
  transition: left 0.3s ease-in-out; /* Smooth transition */
`;

const Bottom = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  margin-bottom: 30px;
  border-radius: 9px;
  border: 1px solid rgba(54, 187, 186, 0.09);
  margin-top: 20px;
  color: #36bbba;

  p {
    font-size: 10px;
  }

  svg {
    color: #36bbba;
  }
`;

const SidebarItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  font-size: 14px;
  /* max-width: 300px; */
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 6px;
  background-color: ${(props) =>
    props.active
      ? "rgba(54, 187, 186,.1)"
      : "transparent"}; /* Active background */
  color: ${(props) =>
    props.active ? "#36bbba" : "inherit"}; /* Active text color */

  &:hover {
    color: #36bbba;
  }

  & > svg {
    margin-right: 10px;
  }
`;

const SidebarItemContent = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 15px; /* Add spacing between icon and text */
  }
`;

const Drawer = ({ isOpen }) => {
  const { user } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const { logout } = useAuthStore();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle logout: remove token, clear user data, redirect to login
  const handleLogout = () => {
    // localStorage.removeItem("token"); // Assuming the token is stored in localStorage
    // localStorage.removeItem("user"); // Remove user data as well
    navigate("/login"); // Redirect to login page
    logout();
  };

  const sidebarItems = [
    {
      path: "/dashboard",
      label: "Home",
      icon: <IoIosHome />,
      // notifications: 3,
    },
    {
      path: "/search",
      label: "Search",
      icon: <IoSearchOutline />,
      // notifications: 5,
    },
    {
      path: "/notification",
      label: "Notification",
      icon: <AiOutlineBell />,
      // notifications: 5,
    },
    {
      path: "/conversation",
      label: "Conversation",
      icon: <BsChatDots />,
      // notifications: 2,
    },
    {
      path: "/bookmark",
      label: "Bookmark",
      icon: <FaRegBookmark />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <Sidebar isOpen={isOpen}>
      <div className="flex justify-between flex-col flex-1 h-100">
        <div className="top">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              className="btn flex gap-sm align-center"
              onClick={() => handleNavigation(item.path)}
              active={location.pathname === item.path} // Check if current path matches the item path
            >
              <SidebarItemContent>
                {item.icon} {item.label}
              </SidebarItemContent>
            </SidebarItem>
          ))}
        </div>
        <div className="bottom pl-2 pr-2">
          <div className="flex gap">
            <div>
              <UserAvi>
                <img src={user?.profilePic} alt="User avatar" />
              </UserAvi>
            </div>
            <div className="ml-2">
              <div className="name">{user.name}</div>
              <div className="time flex">
                <div>@{user.username}</div>
                <div className="divider"></div>
                <div>{user.postCount} posts</div>
              </div>
            </div>
          </div>
          <div>
            <Bottom className="flex flex-1 gap-md relative">
              <div
                className="flex-1 flex align-center gap-sm pointer pt-2 pb-2 pl-1 pr-1"
                onClick={toggleTheme}
              >
                <FiMoon size={18} />
                <p>Dark Mode</p>
              </div>
              <div
                className="flex-1 flex align-center gap-sm pointer"
                onClick={toggleTheme}
              >
                <FiSun size={18} />
                <p>Light Mode</p>
              </div>
              <ToggleButton isDarkMode={isDarkMode} />
            </Bottom>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Drawer;
