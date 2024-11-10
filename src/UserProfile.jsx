import { IoArrowBackOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { getUserById, userFollow } from "./api/requests";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { AiOutlineLink } from "react-icons/ai";
import { BiEnvelope } from "react-icons/bi";
import { HiCheckBadge } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import MainContainer from "./MainContainer";
import ProfileTab from "./ProfileTab";
import { RiArrowDropDownLine } from "react-icons/ri";
import Spinner from "./components/Spinner";
import header from "./header.jpg";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import usePostStore from "./store/usePostStore";

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

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid #36bbba;
  }
`;

const FollowButton = styled.button`
  background-color: #36bbba;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #28a69e;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
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

const UserProfile = () => {
  const [singleUser, setSingleUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const { uid } = useParams();
  const { selectedUser } = usePostStore();
  const { user } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  console.log(selectedUser);
  useEffect(() => {
    if (selectedUser !== null) {
      setLoading(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    getUserById(uid).then((data) => {
      setLoading(false);
      setSingleUser(data.user);
      setPosts(data.posts);
      setIsConnected(data.user.followers.includes(user.id));
    });
  }, [uid, user.id]);

  const handleFollow = async () => {
    setFollowLoading(true);
    await userFollow(uid);
    setIsConnected(!isConnected);
    setFollowLoading(false);
  };

  const finalUser = selectedUser || singleUser;

  if (loading) {
    return (
      <MainContainer noSidebar>
        <div className="mt-4 ml-4">
          <Spinner />
        </div>
      </MainContainer>
    );
  }

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
          <IconWrapper style={{ right: "15px" }}>
            <MoreIcon />
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
                {finalUser?.name === "admin" && (
                  <div className="center">
                    <HiCheckBadge color="#1b9d87" />
                  </div>
                )}
              </Name>
              <UserName>@{finalUser?.username}</UserName>
            </div>
            <ActionContainer>
              {user.id !== uid && isConnected && (
                <div className="icon center">
                  <BiEnvelope size={19} color="#28a69e" />
                </div>
              )}
              {user.id !== uid && (
                <FollowButton onClick={handleFollow} disabled={followLoading}>
                  {followLoading ? (
                    <Spinner size="small" />
                  ) : isConnected ? (
                    <span className="center">
                      Following
                      <RiArrowDropDownLine size={20} />
                    </span>
                  ) : (
                    "Follow"
                  )}
                </FollowButton>
              )}
            </ActionContainer>
          </div>
          <Bio>{finalUser?.bio}</Bio>

          <LinkContainer>
            {singleUser?.link && (
              <div className="flex align-center">
                <AiOutlineLink size={18} color="#28a69e" />
                <a
                  href={finalUser?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {finalUser?.link}
                </a>
              </div>
            )}
            {singleUser?.location && (
              <div className="location">
                <IoLocationSharp size={18} color="#28a69e" />
                <span>{finalUser?.location}</span>
              </div>
            )}
          </LinkContainer>

          <StatsContainer>
            <div>
              <span>{finalUser?.following?.length}</span> Following
            </div>
            <div>
              <span>{finalUser?.followers?.length}</span> Followers
            </div>
          </StatsContainer>
        </div>
        <ProfileTab posts={posts} user={finalUser} />
      </Inner>
    </MainContainer>
  );
};

export default UserProfile;
