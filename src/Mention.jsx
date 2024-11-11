import { FaHeart, FaReply } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { formatDate, formattedContent } from "./utils";
import { getUseNotifications, readNotification } from "./api/requests";

import { GiRapidshareArrow } from "react-icons/gi";
import { RiUserFollowFill } from "react-icons/ri";
import Spinner from "./components/Spinner";
import { VscMention } from "react-icons/vsc";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import { useNavigate } from "react-router-dom";
import usePostStore from "./store/usePostStore";

const Container = styled.div`
  flex: 2;
  .time {
    font-size: 12px;
    color: #999;
    margin-top: 3px;
  }

  .top {
    margin-top: 10px;
    margin-left: 10px;
  }
  /* padding-top: 80px; */
`;

const Item = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  border-bottom: 1px solid rgba(210, 210, 210, 0.5);

  display: flex;
  /* align-items: center; */

  .faint {
    color: #757575;
    margin-left: 5px;
  }

  .alert {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #1b9d87;
  }

  .info {
    display: flex;
    /* justify-content: space-between; */
    /* align-items: center; */
    /* flex: 1; */
    /* width: 100%; Allows content to stretch between the name and alert */
  }

  .details {
    display: flex;
    /* flex-direction: column; */
  }

  .name-message {
    display: flex;
    /* align-items: center; */
  }
`;

const Avi = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  margin-left: 9px;
  background-color: rgba(49, 56, 56, 0.4);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const ActionIcon = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  height: 16px;
  width: 16px;
  color: rgb(27, 157, 135);
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const Name = styled.div`
  font-weight: normal;
`;

const PostInfo = styled.div`
  padding: 6px;
  /* background-color: rgba(57, 75, 72, 0.2); */
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  margin-top: 8px;
  font-size: 13px;
  margin-right: 10px;

  .top_notify {
    padding: 9px 4px;
    border-left: 3px solid rgb(27, 157, 135);
    background-color: rgba(215, 212, 212, 0.5);
    border-radius: 4px;
    font-size: 12px;
  }

  .bottom {
    margin-top: 5px;
    font-size: 13px;
    padding: 3px 0;
  }
`;

const Mention = styled.span`
  color: rgba(54, 187, 186, 1);
  display: inline-block;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MentionDashboard = () => {
  const { notifications, setNotifications } = useAuthStore();

  // const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  // const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { setSelectedPost } = usePostStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUseNotifications();
        setIsFetching(false);
        setNotifications(data.data.notifications);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const getActionIcon = (action) => {
    switch (action) {
      case "liked":
        return <FaHeart color="#fe5050" />;
      case "shared":
        return <GiRapidshareArrow size={10} color="#57aa7a" />;
      case "replied":
        return <FaReply />;
      case "connect":
        return <RiUserFollowFill color="#337689" />;
      case "mentioned":
        return <VscMention size={20} color="#18639d" />;
      default:
        return null;
    }
  };

  const handleRead = async (id) => {
    try {
      const response = await readNotification(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  if (isFetching) {
    return (
      <Container>
        <div className="top">
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {notifications.length === 0 && (
        <p className="text-sm pl-2 pt-2">No notifications yet 📣</p>
      )}
      {notifications.map((n) => {
        const { type, sender, createdAt, data, isRead } = n;

        if (type === "follow") {
          return (
            <Item
              className="flex gap-sm pt-3 pb-3 pointer"
              key={n._id}
              onClick={() => {
                navigate(`/post/${data.post._id}`);
                handleRead(n?._id);
              }}
            >
              <Avi>
                {sender?.profilePic && (
                  <img src={sender.profilePic} alt="User avatar" />
                )}
                <ActionIcon>{getActionIcon("connect")}</ActionIcon>
              </Avi>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Name>@{sender.username}</Name>
                    <div className="faint">connected with you</div>
                  </div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
              </div>
            </Item>
          );
        }

        if (type === "like") {
          const { post } = data;

          // console.log(n);
          return (
            <Item
              className="flex gap-sm pt-3 pb-3 pointer"
              key={n._id}
              onClick={() => {
                navigate(`/post/${data.post._id}`);
                setSelectedPost(data.post);
                !n.isRead && handleRead(n?._id);
              }}
            >
              <Avi>
                {sender?.profilePic && (
                  <img src={sender.profilePic} alt="User avatar" />
                )}
                <ActionIcon>{getActionIcon("liked")}</ActionIcon>
              </Avi>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Name>{sender.name}</Name>
                    <div className="faint">liked your post</div>
                  </div>
                  <div>{!n.isRead && <div className="alert"></div>}</div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
                <PostInfo className="mr-4">
                  {formattedContent(post?.content || "")}
                </PostInfo>
              </div>
            </Item>
          );
        }

        if (n.type === "reply") {
          const { post, comment } = data;

          return (
            <Item
              className="flex gap-sm pt-3 pb-3 pointer"
              key={n._id}
              onClick={() => {
                navigate(`/post/${data.post._id}`);
                handleRead(n?._id);
              }}
            >
              <Avi>
                {sender?.profilePic && (
                  <img src={sender.profilePic} alt="User avatar" />
                )}
                <ActionIcon>{getActionIcon("replied")}</ActionIcon>
              </Avi>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Name>{sender.name}</Name>
                    <div className="faint">replied your post</div>
                  </div>
                  <div>
                    <div>{!n.isRead && <div className="alert"></div>}</div>
                  </div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
                <PostInfo>
                  <div>
                    <div className="top_notify">
                      {formattedContent(post.content)}
                    </div>
                  </div>
                  <div className="bottom flex justify-between">
                    <div>{formattedContent(comment.content)}</div>
                    <div>
                      <button style={{ color: "rgb(27, 157, 135)" }}>
                        Reply
                      </button>
                    </div>
                  </div>
                </PostInfo>
              </div>
            </Item>
          );
        }

        if (n.type === "share") {
          const { post, comment } = data;

          return (
            <Item
              className="flex gap-sm pt-4 pb-4 pointer"
              key={n._id}
              onClick={() => {
                navigate(`/post/${data.post._id}`);
                handleRead(n?._id);
              }}
            >
              <Avi>
                {sender?.profilePic && (
                  <img src={sender.profilePic} alt="User avatar" />
                )}
                <ActionIcon>{getActionIcon("shared")}</ActionIcon>
              </Avi>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Name>{sender.name}</Name>
                    <div className="faint">shared your post</div>
                  </div>
                  <div>{!n.isRead && <div className="alert"></div>}</div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
                <PostInfo>{formattedContent(post.content)}</PostInfo>
              </div>
            </Item>
          );
        }

        if (n.type === "mention") {
          const { post, comment } = data;

          return (
            <Item
              className="flex gap-sm pt-4 pb-4 pointer"
              key={n._id}
              // onClick={() => handleRead(n?._id)}

              onClick={() => {
                navigate(`/post/${data.post._id}`);
                setSelectedPost(data.post);
                handleRead(n?._id);
              }}
            >
              <Avi>
                {sender?.profilePic && (
                  <img src={sender.profilePic} alt="User avatar" />
                )}
                <ActionIcon>{getActionIcon("mentioned")}</ActionIcon>
              </Avi>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Name>{sender.name}</Name>

                    <div className="faint">mention you on a post</div>
                  </div>
                  <div>
                    <div>{!isRead && <div className="alert"></div>}</div>
                  </div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
                <PostInfo>{formattedContent(post?.content)}</PostInfo>

                {/* <PostInfo>
                  <div>
                    <div className="top">
                      <PostInfo>{formattedContent(post.content)}</PostInfo>
                    </div>
                  </div>
                  {comment && (
                    <div className="bottom">
                      {formattedContent("@abolajiking come and see o 🤣")}
                    </div>
                  )}
                </PostInfo> */}
              </div>
            </Item>
          );
        }
      })}
    </Container>
  );
};

export default MentionDashboard;
