/* eslint-disable react/prop-types */
import { formatDate, formattedContent } from "./utils";

// import useAuthStore from "../store/useAuthStore";
import AnimatedNumber from "./AnimatedNumber";
// import React from "react";
// import ReplySection from "./ReplySection";
// import bg from "../assets/images.jpeg";
import { HiCheckBadge } from "react-icons/hi2";
import { MdMoreHoriz } from "react-icons/md";
import ReplySection from "./ReplySection";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import usePostStore from "./store/usePostStore";

const Container = styled.div`
  border-radius: 5px;
  /* background-color: #f3f3f3; */
  background-color: ${(props) => !props.noBg && "#f3f3f3"};

  .gap {
    gap: 3px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  margin-top: 9px;
  /* margin-bottom: 10px; */

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
  }
`;

const Middle = styled.div`
  padding: 0 10px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const Image = styled.div`
  margin-top: 10px;
  height: 600px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Avi = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #313838;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const NormalPost = ({ post, noBg }) => {
  const navigate = useNavigate();
  const { setSelectedUser, setSelectedPost } = usePostStore();
  return (
    <Container
      noBg={noBg}
      onClick={() => {
        navigate(`/post/${post._id}`);
        setSelectedPost(post);
      }}
    >
      <Top>
        <div className="flex gap-sm">
          <div>
            <Avi
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/profile/${post.user.username}`);
                setSelectedUser(post.user);
              }}
            >
              <img src={post?.user?.profilePic} alt="User avatar" />
            </Avi>
          </div>
          <div className="flex flex-col">
            <div className="name flex align-center">
              {post?.user.name}
              {post?.user.isVerified && <HiCheckBadge color="#1b9d87" />}
            </div>
            <div className="time">{formatDate(post?.createdAt)}</div>
          </div>
        </div>
        <div className="pointer">
          <MdMoreHoriz size={18} />
        </div>
      </Top>
      <Middle>{formattedContent(post?.content)}</Middle>

      {post?.imageUrl && (
        <Image className="mb-1">
          <img src={post?.imageUrl} alt="Project Update" />
        </Image>
      )}

      {/* <AnimatedNumber /> */}

      <ReplySection noReply post={post} />

      {/* REPLY */}
      {/* <ReplySection noReply post={post} single /> */}
    </Container>
  );
};

export default NormalPost;
