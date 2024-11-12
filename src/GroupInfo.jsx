import { BiEdit, BiSolidMessageSquareDetail } from "react-icons/bi";

import { BiSolidNotepad } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
/* eslint-disable react/prop-types */
import React from "react";
import group from "./group.png";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")}; // Slide in and out
  height: 100%;
  width: 350px;
  background-color: #eaf5f2;
  border-left: 1px solid #d3d3d3;
  z-index: 20;
  transition: right 0.3s ease; // Smooth slide transition
  display: flex;
  flex-direction: column;

  .name {
    font-size: 14px;
    /* font-weight: 500; */
  }

  .mute {
    color: #444444;
    margin-left: 6px;
    font-size: 16px;
  }

  .sub {
    font-size: 13px;
    font-weight: 500;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .drawer-body {
    padding-top: 10px;
    // Add additional drawer content styling here
  }
`;

const BigImage = styled.div`
  height: 90px;
  width: 90px;
  background: #bcc3c3;
  border-radius: 50%;

  img {
    height: 90px;
    width: 90px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const GroupInfo = ({ isOpen, toggleDrawer, conversation }) => {
  console.log(conversation);
  const { user } = useAuthStore();
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
            <img src={group} />
          </BigImage>

          <div className="flex align-center">
            <div className="name mt-1">{conversation?.name}</div>
            {user.name === conversation?.createdBy?.name && (
              <div className="center mt-1 ml-1 cursor">
                <FiEdit3 color="#36bbba" />
              </div>
            )}
          </div>

          <div className="flex align-center sub">
            <p>Group</p>
            <BsDot />
            <p>{conversation?.groupMembers.length} members</p>
          </div>
        </div>
        <div className="flex align-center small pl-3 pt-3">
          <BiSolidNotepad color="#a9a9a9" size={20} />
          <p className="mute">Description</p>
        </div>
      </div>
    </Drawer>
  );
};

export default GroupInfo;
