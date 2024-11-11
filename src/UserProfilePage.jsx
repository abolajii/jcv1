import { IoArrowBackOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AiOutlineLink } from "react-icons/ai";
import { HiCheckBadge } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import MainContainer from "./MainContainer";
import { MdSettings } from "react-icons/md";
import ProfileTab from "./ProfileTab";
import { getUserById } from "./api/requests";
import header from "./header.jpg";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
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
    background-color: rgba(0, 0, 0, 0.3);
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
    object-fit: cover;
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

const Bio = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
  color: #404040;
  line-height: 1.35;
  color: #0a0909;
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: #0a0909;
  }

  span {
    font-weight: bold;
    color: #28a69e;
    margin-right: 3px;
  }
`;

const LinkContainer = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
  color: #0a0909;
  display: flex;
  flex-direction: column;
  gap: 5px;

  a {
    color: #28a69e;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  .location {
    color: #2f2f2f;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const UserProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [singleUser, setSingleUser] = useState(null);

  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    getUserById(user.username).then((data) => {
      setSingleUser(data.user);
      setPosts(data.posts);
    });
  }, [user.username, setUser]);

  const finalUser = user || singleUser;

  return (
    <MainContainer noSidebar>
      <Inner>
        <Header>
          <IconWrapper
            style={{ left: "15px" }}
            onClick={() => navigate(location.state?.from || -1)}
          >
            <BackIcon />
          </IconWrapper>
          <IconWrapper
            style={{ right: "15px" }}
            onClick={() => {
              navigate("/edit/profile");
            }}
          >
            <MdSettings />
          </IconWrapper>
          <ProfileAvi>
            <img src={finalUser?.profilePic} alt="Avatar" />
          </ProfileAvi>
        </Header>
        <div className="other">
          <div className="flex align-center justify-between">
            <div>
              <Name className="flex align-center">
                {finalUser?.name}
                {finalUser?.isVerified && (
                  <div className="center">
                    <HiCheckBadge color="#1b9d87" />
                  </div>
                )}
              </Name>
              <UserName>@{finalUser?.username}</UserName>
            </div>
          </div>
          <Bio>{user?.bio}</Bio>

          <LinkContainer>
            {finalUser?.link && (
              <div className="flex align-center">
                <AiOutlineLink size={18} color="#28a69e" />
                <a href={user?.link} target="_blank" rel="noopener noreferrer">
                  {finalUser?.link}
                </a>
              </div>
            )}
            {finalUser?.location && (
              <div className="location">
                <IoLocationSharp size={18} color="#28a69e" />
                <span>{finalUser?.location}</span>
              </div>
            )}
          </LinkContainer>

          <StatsContainer>
            <div
              onClick={() => {
                navigate(`/c/${finalUser.username}/fwn`);
              }}
            >
              <span>
                {finalUser?.following || finalUser?.following?.length}
              </span>{" "}
              Following
            </div>
            <div
              onClick={() => {
                navigate(`/c/${finalUser.username}/flr`);
              }}
            >
              <span>
                {finalUser?.followers || finalUser?.followers?.length}
              </span>
              Followers
            </div>
          </StatsContainer>
        </div>
        <ProfileTab posts={posts} user={finalUser} />
      </Inner>
    </MainContainer>
  );
};

export default UserProfilePage;
