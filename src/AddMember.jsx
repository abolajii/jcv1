/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { addToGroup, getNonparticipants } from "./api/requests";
import styled, { keyframes } from "styled-components";

import SelectUsers from "./SelectUsers";
import Spinner from "./components/Spinner";
import { useParams } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateY(-100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100px); opacity: 0; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.3s ease-out;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: visibility 0.3s ease;
  z-index: 100000;
`;

const ModelContent = styled.div`
  width: 350px;
  border-radius: 10px;
  background-color: #eaf5f2;

  position: relative;
  height: 620px;
  overflow: hidden;
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.3s
    ease-out;
`;

const ShareButton = styled.button`
  background-color: #36bbba;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 9px;
  font-size: 13px;
  cursor: pointer;
  margin-top: ${(props) => (props.selected ? "30px" : "20px")};

  &:hover {
    background-color: #28a69e; /* Darken on hover */
  }
`;

const Model = ({ isVisible, onClose }) => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const response = await getNonparticipants(id);
        setUsers(response.nonParticipants);
        // setSingleChat(response);
        // setLoading(false);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };
    fetchOtherUsers();
  }, [id]);
  return (
    <Overlay isVisible={isVisible} onClick={onClose}>
      <ModelContent
        isVisible={isVisible}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        <SelectUsers
          users={users}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUser}
        />
        <div>
          <div className="flex justify-end pr-4">
            <ShareButton
              selected={selectedUsers.length > 0}
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await addToGroup({
                    conversationId: id,
                    selectedUsers,
                  });
                  console.log(response);
                  setLoading(false);
                } catch (error) {
                  console.log(error);
                  setLoading(false);
                }
              }}
            >
              {loading ? <Spinner /> : "Add member"}
            </ShareButton>
          </div>
        </div>
      </ModelContent>
    </Overlay>
  );
};

const AnimatedModal = ({ isModelVisible, closeModel }) => {
  return (
    <div>
      <Model isVisible={isModelVisible} onClose={closeModel} />
    </div>
  );
};

export default AnimatedModal;
