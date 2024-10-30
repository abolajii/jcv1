import { FaRegBookmark, FaRegEnvelopeOpen } from "react-icons/fa"; // Dashboard and Bookmark icons
import { FiLogOut, FiSettings } from "react-icons/fi"; // Settings and Logout icons
import { useLocation, useNavigate } from "react-router-dom"; // For navigation and getting current path

import { AiOutlineBell } from "react-icons/ai"; // Mention icon
import { BsChatDots } from "react-icons/bs"; // Conversation icon
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

const SidebarItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  font-size: 14px;
  max-width: 300px;
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

const NotificationCount = styled.div`
  background-color: #36bbba;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

// Sidebar items data array
export const sidebarItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <FaRegEnvelopeOpen />,
    // notifications: 3,
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
  { path: "/bookmark", label: "Bookmark", icon: <FaRegBookmark /> },
  { path: "/settings", label: "Settings", icon: <FiSettings /> },
];

const Sidebar = () => {
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

  return (
    <div className="main">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.path}
          onClick={() => handleNavigation(item.path)}
          active={location.pathname === item.path} // Check if current path matches the item path
        >
          <SidebarItemContent>
            {item.icon} {item.label}
          </SidebarItemContent>
          {/* {item.notifications && (
            <NotificationCount>{unread.length}</NotificationCount>
          )} */}
        </SidebarItem>
      ))}
      <SidebarItem onClick={handleLogout}>
        <SidebarItemContent>
          <FiLogOut /> Logout
        </SidebarItemContent>
        {/* No notification for Logout */}
      </SidebarItem>
    </div>
  );
};

export default Sidebar;
