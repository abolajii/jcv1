/* eslint-disable react/prop-types */
import { getSuggestedUsers, userFollow } from "../api/requests";
import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import usePostStore from "../store/usePostStore";

const Container = styled.div`
  margin-top: 10px;
`;

// Styled components
const UserContainer = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const UserName = styled.div`
  color: #666;
  font-size: 14px;
`;

const ConnectButton = styled.button`
  background-color: #28a69e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #219489;
  }
`;

const People = ({ user, setUsers }) => {
  const [loadingConnections, setLoadingConnections] = useState({});

  const { setSelectedUser } = usePostStore();

  const navigate = useNavigate();

  const connectWithUser = async (username) => {
    setLoadingConnections((prev) => ({ ...prev, [username]: true }));
    try {
      await userFollow(username);
      setUsers((prev) => prev.filter((user) => user.username !== username));
    } catch (error) {
      console.error("Failed to connect:", error);
    }
    setLoadingConnections((prev) => ({ ...prev, [username]: false }));
  };

  return (
    <Container>
      <UserContainer
        onClick={() => {
          navigate(`/profile/${user.username}`);
          setSelectedUser(user);
        }}
      >
        {/* Div A: User's Profile Picture */}
        <ProfilePicture src={user.profilePic} alt={`${user.name}'s profile`} />

        <UserInfo>
          <div className="flex align-center justify-between">
            <div>
              <Name>{user.name}</Name>
              <UserName>@{user.username}</UserName>
            </div>
            <ConnectButton
              onClick={(event) => {
                event.stopPropagation();
                connectWithUser(user.username);
              }}
              disabled={loadingConnections[user.username]}
            >
              {loadingConnections[user.username] ? <Spinner /> : "Connect"}
            </ConnectButton>
          </div>
          <div>{user?.bio}</div>
        </UserInfo>
      </UserContainer>
    </Container>
  );
};

export default People;
