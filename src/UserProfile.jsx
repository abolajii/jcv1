import { IoArrowBackOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import { BiEnvelope } from "react-icons/bi";
import { FaRegMessage } from "react-icons/fa6";
import MainContainer from "./MainContainer";
import React from "react";
import header from "./header.jpg";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";

// Import follow icon

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  background-image: url(${header});
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); /* Dark overlay with 30% opacity */
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  top: 10px;
  padding: 0 10px;
  gap: 15px;
  z-index: 10;
`;

const BackIcon = styled(IoArrowBackOutline)`
  left: 0;
  cursor: pointer;
`;

const MoreIcon = styled(IoEllipsisHorizontal)`
  right: 0;
  cursor: pointer;
`;

const ProfileAvi = styled.div`
  position: absolute;
  bottom: -40px;
  left: 30px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 11;
  border: 2px solid rgba(232, 239, 239, 0.95);

  img {
    height: 100%;
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Inner = styled.div`
  .other {
    margin-top: 40px;
    padding: 0 30px;
  }
`;

const Name = styled.div`
  font-size: 1rem;
  color: #0a0909;
  margin-top: 5px;
  font-weight: 500;
`;

const UserName = styled.div`
  font-size: 0.7rem;
  color: #2f2f2f;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid #28a69e;
  }
`;

const FollowButton = styled.button`
  background-color: #28a69e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #2f2f2f;
  }
`;

const Bio = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
  color: #404040; /* Gray color for a subtle look */
  line-height: 1.35;
  color: #0a0909;
`;

const UserProfile = () => {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  return (
    <MainContainer>
      <Inner>
        <Header>
          <IconWrapper
            style={{ left: "15px" }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <BackIcon />
          </IconWrapper>
          <IconWrapper style={{ right: "15px" }}>
            <MoreIcon />
          </IconWrapper>

          {/* Profile Avatar */}
          <ProfileAvi>
            <img src={user?.profilePic || "default-avatar.jpg"} alt="Avatar" />
          </ProfileAvi>
        </Header>
        <div className="other">
          <div className="flex align-center justify-between">
            <div>
              <Name>{user?.name || "User Name"}</Name>
              <UserName>@{user?.username || "username"}</UserName>
            </div>
            <ActionContainer>
              <div className="icon center">
                <BiEnvelope size={19} color="#28a69e" /> {/* Follow icon */}
              </div>
              <FollowButton>Follow</FollowButton> {/* Follow button */}
            </ActionContainer>
          </div>
          <Bio>
            Experienced full-stack developer with a passion for creating
            interactive, user-centric applications. Skilled in React, Node.js,
            and TypeScript, dedicated to delivering high-quality digital
            experiences.
          </Bio>
        </div>
      </Inner>
    </MainContainer>
  );
};

export default UserProfile;
