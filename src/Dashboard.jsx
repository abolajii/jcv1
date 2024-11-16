import { createPost, getFeeds } from "./api/requests";
import { useEffect, useRef, useState } from "react";

import BottomTab from "./components/BottomTab";
import Drawer from "./Drawer";
import Feeds from "./Feeds";
import MainContainer from "./MainContainer";
import StoryContainer from "./Story";
import Textarea from "./components/Textarea";
import Top from "./Top";
import { createUniqueUsers } from "./utils";
import styled from "styled-components";
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

const Dashboard = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const { setPosts, setPostSent, posts } = usePostStore();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <StoryContainer isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <Top toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
      <Drawer isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
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
