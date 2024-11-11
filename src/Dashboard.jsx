import { createPost, getFeeds } from "./api/requests";
import { useEffect, useRef, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import BottomTab from "./components/BottomTab";
import Drawer from "./Drawer";
import { FaHamburger } from "react-icons/fa";
import Feeds from "./Feeds";
import { GiHamburgerMenu } from "react-icons/gi";
import MainContainer from "./MainContainer";
import Textarea from "./components/Textarea";
import { createUniqueUsers } from "./utils";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import usePostStore from "./store/usePostStore";

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: ${(props) => (props.isLoading ? "hidden" : "auto")};
  padding: 10px;
  box-sizing: border-box;
  margin-top: 70px; /* Height of Header */
  margin-bottom: 60px; /* Height of MobileSidebar */

  .width {
    border: 1px solid #c8e2da;
    border-radius: 3px;
  }
`;

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 4px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;

  img {
    border-radius: 5px;
  }
`;

const OtherStory = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  max-width: calc(100vw - 90px);

  .avi {
    flex: 0 0 auto;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #f4f4f4;
  }
`;

const AddIcon = styled(AiOutlinePlus)`
  position: absolute;
  bottom: -3px;
  right: -5px;
  color: white;
  background-color: #36bbba;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  height: 15px;
  width: 15px;
  &:hover {
    background-color: #28a69e;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px; /* Adjust as needed */
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 10px;
  background-color: rgba(232, 239, 239, 1);
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);

  .box {
    border: 1px solid #28a69e;
    height: 28px;
    width: 28px;
    border-radius: 3px;
    background-color: #ccf3f0;
  }

  z-index: 10;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Dashboard = () => {
  const { user } = useAuthStore();

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const { setPosts, setPostSent, posts } = usePostStore();
  const [loading, setLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const submitPost = async () => {
    if (content.trim() || file) {
      const results = createUniqueUsers(mentionedUsers);

      setLoading(true);

      const formData = new FormData();

      results.forEach((user) => {
        formData.append("mention", user.username);
      });

      formData.append("content", content.trim());

      if (file) {
        formData.append("imagePost", file);
      }

      try {
        const response = await createPost(formData);
        const allPosts = [response, ...posts];
        setPosts(allPosts);
        setLoading(false);
        setContent("");
        setFile(null);
        setPostSent(true);
      } catch (error) {
        setLoading(false);
        console.error("Error sending post:", error);
      }
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getFeeds();
        setIsLoading(false);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [setPosts]);

  return (
    <MainContainer>
      <Header>
        <div className="flex gap-md justify-between w-100">
          <div className="box center">
            <GiHamburgerMenu
              size={19}
              color="#36bbba"
              onClick={toggleSidebar}
            />
          </div>

          <OtherStory className="flex-1 flex">
            {/* Additional elements here */}
          </OtherStory>
          <UserAvi>
            <img src={user?.profilePic} alt="User avatar" />
            <AddIcon size={13} color="#fff" />
          </UserAvi>
        </div>
      </Header>
      <Drawer isOpen={isSidebarOpen} />
      <Scrollable isLoading={isLoading}>
        <div className="width pl-2 pr-2 pt-2 pb-2">
          <div className="text" ref={contentRef}>
            <Textarea
              width={width}
              setText={setContent}
              text={content}
              setMentionedUsers={setMentionedUsers}
            />
            <BottomTab
              file={file}
              setFile={setFile}
              onSubmit={submitPost}
              loading={loading}
            />
          </div>
        </div>
        <Feeds isLoading={isLoading} />
      </Scrollable>
    </MainContainer>
  );
};

export default Dashboard;
