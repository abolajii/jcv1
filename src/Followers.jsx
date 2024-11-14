import { HiCheckBadge } from "react-icons/hi2";
import Spinner from "./components/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import usePostStore from "./store/usePostStore";
import { useState } from "react";
/* eslint-disable react/prop-types */
import { userFollow } from "./api/requests";

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

  .tag {
    background-color: transparent;
    font-size: 10px;
    border-radius: 3px;
    margin-left: 2px;
    color: #178d85;
  }
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

// Styled components (same as your original code)

const Followers = ({ user, setUsers, loggedInUser }) => {
  const [loadingConnections, setLoadingConnections] = useState({});
  const [isFollowedByLoggedInUser, setIsFollowedByLoggedInUser] = useState(
    user.isFollowedByLoggedInUser
  );

  console.log(user);
  const { setSelectedUser } = usePostStore();
  const navigate = useNavigate();

  const toggleFollowStatus = async () => {
    setLoadingConnections((prev) => ({ ...prev, [user.id]: true }));
    try {
      if (isFollowedByLoggedInUser) {
        // Unfollow the user if currently followed
        await userFollow(user.username);
      } else {
        // Follow the user if not currently followed
        await userFollow(user.username);
      }

      // Toggle the follow status in local state
      setIsFollowedByLoggedInUser(!isFollowedByLoggedInUser);

      // Optionally update the user list if necessary
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, isFollowedByLoggedInUser: !isFollowedByLoggedInUser }
            : u
        )
      );
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    } finally {
      setLoadingConnections((prev) => ({ ...prev, [user.id]: false }));
    }
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
        <ProfilePicture src={user?.profilePic} alt={`${user.name}'s profile`} />

        <UserInfo>
          <div className="flex align-center justify-between">
            <div>
              <div className="flex">
                <Name>{user.name}</Name>
                {user?.isVerified && (
                  <div className="center">
                    <HiCheckBadge color="#1b9d87" />
                  </div>
                )}
              </div>
              <div className="flex align-center">
                <UserName>@{user.username}</UserName>
                {user.isFollowingLoggedInUser && (
                  <div className="tag">follows you</div>
                )}
              </div>
            </div>
            {user.id === loggedInUser ? (
              ""
            ) : (
              <ConnectButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFollowStatus();
                }}
                disabled={loadingConnections[user.id]}
              >
                {loadingConnections[user.id] ? (
                  <Spinner />
                ) : isFollowedByLoggedInUser ? (
                  "Following"
                ) : (
                  "Follow"
                )}
              </ConnectButton>
            )}
          </div>
          <div>{user?.bio}</div>
        </UserInfo>
      </UserContainer>
    </Container>
  );
};

export default Followers;
