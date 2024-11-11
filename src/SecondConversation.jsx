import { FiSend, FiSmile } from "react-icons/fi";
import { MdAdd, MdMoreHoriz } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GoBack from "./GoBack";
import MainContainer from "./MainContainer";
import { getUserById } from "./api/requests";
import styled from "styled-components";
import usePostStore from "./store/usePostStore";

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  gap: 5px;
  padding: 10px;
  background-color: rgba(232, 239, 239, 1);
  z-index: 10;
  border: 1px solid #d3d3d3;

  .name {
    font-size: 16px;
    font-weight: 500;
  }

  .typing {
    font-size: 14px;
    color: #949494;
  }
`;

const Box = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  background: #d9d9ff;
  border-radius: 50%;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #d3d3d3;

  .icon-container {
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #36bbba;
  }

  .textarea-container {
    display: flex;
    align-items: center;
    flex: 1;
    border: 1px solid #d3d3d3;
    border-radius: 25px;
    padding: 5px;
    margin: 0 10px;
    background-color: #f9f9f9;

    textarea {
      flex: 1;
      border: none;
      outline: none;
      resize: none;
      background: transparent;
      padding: 5px;
      font-size: 14px;
      height: auto;
      font-family: "Poppins", system-ui;

      min-height: 24px;
      max-height: 65px;
      transition: height 0.2s ease; /* Smooth height transition */
    }

    .smiley-icon {
      cursor: pointer;
      color: #36bbba;
      margin-left: 5px;
    }
  }
`;

const SecondConversation = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [singleUser, setSingleUser] = useState(null);
  const { selectedUser } = usePostStore();
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");

  const finalUser = selectedUser || singleUser;

  useEffect(() => {
    getUserById(uid).then((data) => {
      setLoading(false);
      setSingleUser(data.user);
    });
  }, [uid]);

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to calculate scrollHeight
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`; // Set to scrollHeight or max height
    }
  };

  return (
    <MainContainer noSidebar>
      <Header className="flex align-center justify-between">
        <div className="flex align-center gap-sm">
          <div>
            <GoBack
              onClick={() => navigate(`/profile/${finalUser?.username}`)}
            />
          </div>
          <div className="flex gap-sm">
            <Box>
              <img src={finalUser?.profilePic} alt="User Avatar" />
            </Box>
            <div>
              <div className="name">{finalUser?.name}</div>
              <p className="typing">Recently seen</p>
            </div>
          </div>
        </div>
        <div>
          <MdMoreHoriz size={22} />
        </div>
      </Header>

      <Body>{/* Message content here */}</Body>

      <Footer>
        <div className="icon-container">
          <MdAdd size={24} />
        </div>
        <div className="textarea-container">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            placeholder="Type a message..."
            rows="1"
          />
          <FiSmile size={20} className="smiley-icon" />
        </div>
        <div className="icon-container">
          <FiSend size={24} />
        </div>
      </Footer>
    </MainContainer>
  );
};

export default SecondConversation;
