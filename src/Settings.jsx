import MainContainer from "./MainContainer";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, logout } = useAuthStore(); // Accessing profile data and logout function from the store
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MainContainer>
      <UserDetailsContainer>
        {user?.profilePic && (
          <ProfilePic src={user?.profilePic} alt="User avatar" />
        )}
        <UserInfo>
          <UserName>{user.name}</UserName>
          <p>{user.username}</p>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      </UserDetailsContainer>
    </MainContainer>
  );
};

export default Settings;

// Styled components
const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  margin-bottom: 1rem;

  /* Display only on mobile */
  @media (min-width: 768px) {
    display: none;
  }
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;
