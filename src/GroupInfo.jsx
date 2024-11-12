/* eslint-disable react/prop-types */
import { BiSolidNotepad } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import Files from "./Files";
import { MdClose } from "react-icons/md";
import Media from "./Media";
import Members from "./Members";
import group from "./group.png";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import { useState } from "react";
const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")}; // Slide in and out
  height: 100%;
  width: 300px;
  background-color: #eaf5f2;
  border-left: 1px solid #d3d3d3;
  z-index: 20;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;

  .radius {
    border-radius: 6px;
    overflow: hidden;
  }

  .subtitle {
    margin-left: 4px;
  }

  .description {
    font-size: 14px;
    color: #161616;
    line-height: 1.3;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const BigImage = styled.div`
  height: 50px;
  width: 50px;
  background: #bcc3c3;
  border-radius: 50%;
  margin-top: 10px;
  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const GroupInfo = ({ isOpen, toggleDrawer, conversation }) => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("media");

  return (
    <Drawer isOpen={isOpen}>
      <div className="drawer-header border-b-1 pb-2 pt-2 pl-3 pr-3">
        <p>Group Info</p>
        <MdClose
          size={20}
          style={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        />
      </div>
      <div className="drawer-body">
        <div className="center flex-col">
          <BigImage className="center">
            <img src={group} alt="Group" />
          </BigImage>
          <div className="flex align-center">
            <div className="text-sm">{conversation?.name}</div>
            {user.name === conversation?.createdBy?.name && (
              <div className="center ml-1 cursor">
                <FiEdit3 color="#36bbba" />
              </div>
            )}
          </div>
          <div className="flex align-center text-sm">
            <p>Group</p>
            <BsDot />
            <p>{conversation?.groupMembers.length} members</p>
          </div>
        </div>
        <div className="pl-3 pt-3 pr-3">
          <div className="flex align-center small mb-1">
            <BiSolidNotepad color="#5ababa" size={18} />
            <p className="text-sm ml-1">Description</p>
          </div>
          <div className="description border-b-1 pb-2">
            A dynamic community where creativity meets purpose. Join like-minded
            individuals to explore new ideas, share inspiration, and turn
            innovative thoughts into reality.
          </div>

          <div className="flex mt-3 radius" style={{ position: "relative" }}>
            <Slider activeTab={activeTab} />
            <Tab
              className="flex-1 flex center align-center"
              isActive={activeTab === "media"}
              onClick={() => setActiveTab("media")}
            >
              <TabContent>
                Media <div className="count center">20</div>
              </TabContent>
            </Tab>
            <Tab
              className="flex-1 flex center align-center"
              isActive={activeTab === "files"}
              onClick={() => setActiveTab("files")}
            >
              <TabContent>
                Files <div className="count center">24</div>
              </TabContent>
            </Tab>
          </div>
          <div className="mt-4">
            {activeTab === "media" && <Media />}
            {activeTab === "files" && <Files />}
          </div>
        </div>

        <div className="mt-4 pl-2 pr-2">
          <div className="flex justify-between align-center">
            <div className="center">
              <FaUserFriends color="#5ababa" size={18} />
              <p className="ml-1 text-sm">Members</p>
            </div>
            <button className="text-sm pointer">See All</button>
          </div>
          <MemberContainer>
            <Members members={conversation?.groupMembers} />
          </MemberContainer>
        </div>
      </div>
    </Drawer>
  );
};

export default GroupInfo;

const MemberContainer = styled.div`
  margin-top: 20px;
  .avi {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #a2a2a2;
  }

  .ml-1 {
    .text-sm {
      margin-top: -2px;
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background-color: #5ababa;
  border-radius: 4px;
  transition: transform 0.3s ease;
  z-index: 4; // Slider behind tabs
  transform: ${({ activeTab }) =>
    activeTab === "media" ? "translateX(0)" : "translateX(100%)"};
`;

const Tab = styled.div`
  background-color: #becfcf;
  padding: 5px;
  position: relative;
  cursor: pointer;
`;

const TabContent = styled.div`
  z-index: 5; // Higher z-index for text and count to be above slider
  display: flex;
  align-items: center;
  border-radius: 9px;
  font-size: 14px;

  .count {
    background-color: white;
    border-radius: 9px;
    height: 20px;
    width: 20px;
    font-size: 12px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
