import { FiSend, FiSmile } from "react-icons/fi";
import { MdAdd, MdClose, MdMoreVert } from "react-icons/md";
import {
  getConversation,
  getUserConversationMessages,
  sendTextMessage,
} from "./api/requests";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GoBack from "./GoBack";
import GroupInfo from "./GroupInfo";
import MainContainer from "./MainContainer";
import MessageBody from "./MessageBody";
import group from "./group.png";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
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
  background: #a8c7c7;

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
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
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

const SingleUserConversation = () => {
  const { selectedUser } = usePostStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [singleChat, setSingleChat] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility
  // const [conversation, setConversation] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMutualFollow = async () => {
      try {
        const response = await getUserConversationMessages(id);
        setAllMessages(response.messages);
        // setSingleChat(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMutualFollow();
  }, [id]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await getConversation(id);
        setSingleChat(response);
        // setSingleChat(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchConversation();
  }, [id]);

  const finalUser = selectedUser || singleChat;

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

  const sendMessage = async () => {
    const data = {
      conversationId: id,
      content: message,
      status: "sending",
    };

    const newMessage = {
      content: message,
      sender: {
        _id: user.id,
      },
      createdAt: Date.now(),
      status: "sending",
    };

    try {
      setAllMessages([newMessage, ...allMessages]);
      setMessage("");

      const response = await sendTextMessage(data);
      setAllMessages([response.data, ...allMessages]);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  if (loading) {
    return (
      <MainContainer noSidebar>
        <Header className="flex align-center justify-between">
          <div className="flex align-center gap-sm">
            <div>
              <GoBack onClick={() => navigate(`/conversation`)} />
            </div>
            <div className="flex gap-sm" onClick={toggleDrawer}>
              <Box></Box>
            </div>
          </div>
          <div>
            <MdMoreVert size={22} />
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
          <div className="icon-container" onClick={sendMessage}>
            <FiSend size={24} />
          </div>
        </Footer>
      </MainContainer>
    );
  }

  return (
    <MainContainer noSidebar>
      <GroupInfo
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        conversation={singleChat}
      />
      <Header className="flex align-center justify-between">
        <div className="flex align-center gap-sm">
          <div>
            <GoBack onClick={() => navigate(`/conversation`)} />
          </div>
          <div className="flex gap-sm" onClick={toggleDrawer}>
            <Box>
              {/* {finalUser?.profilePic !== null && (
                <img src={finalUser?.profilePic} alt="" />
              )} */}
              {finalUser?.profilePic !== null && (
                <img src={finalUser?.profilePic} alt="" />
              )}

              {finalUser?.profilePic && finalUser?.isGroup ? (
                <img src={finalUser?.profilePic} alt="User Avatar" />
              ) : (
                <img src={group} />
              )}
            </Box>
            <div>
              <div className="text-sm">{finalUser?.name}</div>
              {finalUser?.groupMembers?.length && (
                <p className="text-xs bold">
                  {finalUser?.groupMembers?.length} members
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <MdMoreVert size={22} />
        </div>
      </Header>

      <Body>
        <MessageBody messages={allMessages} />
      </Body>

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
        <div className="icon-container" onClick={sendMessage}>
          <FiSend size={24} />
        </div>
      </Footer>
    </MainContainer>
  );
};

export default SingleUserConversation;
