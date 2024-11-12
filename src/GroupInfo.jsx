import { BsDot } from "react-icons/bs";
import { MdClose } from "react-icons/md";
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

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
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const GroupInfo = ({ isOpen, toggleDrawer, conversation }) => {
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
          <BigImage />
          <div className="name mt-1">{conversation?.name}</div>

          <div className="flex align-center sub">
            <p>Group</p>
            <BsDot />
            <p>{conversation?.groupMembers.length} members</p>
          </div>
        </div>
        {/* Group Description, name, members */}
        {/* Group Members */}
        {/* Group Media */}
      </div>
    </Drawer>
  );
};

export default GroupInfo;
