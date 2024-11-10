import { formatDate, formattedContent } from "./utils";

import BottomIcon from "./components/BottomIcon";
import { HiCheckBadge } from "react-icons/hi2";
import { LuDot } from "react-icons/lu";
import { MdMoreHoriz } from "react-icons/md";
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  .mention {
    color: #1b9d87;
    margin-left: 3px;
  }

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
  }

  .title {
    font-size: 13px;
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

const Middle = styled.div`
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const highlightText = (text, searchTerm) => {
  console.log(searchTerm, text);
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text
    .split(regex)
    .map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
};

const CommentSection = ({ comment, searchTerm }) => {
  const navigate = useNavigate();

  return (
    <Container className="flex gap-sm border-b-1 pt-2 pb-2">
      <div>
        <Avi
          onClick={() => {
            navigate(`/profile/${comment?.user?.username}`);
            // setSelectedUser(user);
          }}
        >
          <img src={comment?.user?.profilePic} alt="User avatar" />
        </Avi>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex align-center justify-between ">
          <div className="name">
            {highlightText(comment?.user?.name, searchTerm)}
            {comment?.user.isVerified && <HiCheckBadge color="#1b9d87" />}
          </div>
          <div className="pointer">
            <MdMoreHoriz size={18} />
          </div>
        </div>
        <div className="flex">
          <div className="flex">
            <div className="title">
              <div className="time">{formatDate(comment.createdAt)}</div>
            </div>
          </div>
          <LuDot />
          <div className="flex">
            {/* <div className="time">{comment.user.username}</div> */}
            <div className="title">
              Replying to
              <span className="mention">@{comment.post.user.username}</span>
            </div>
          </div>
        </div>
        <Middle>{formattedContent(comment?.content)}</Middle>
        <BottomIcon noPadding />
      </div>
    </Container>
  );
};

export default CommentSection;
