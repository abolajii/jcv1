/* eslint-disable react/prop-types */
import { FaEye } from "react-icons/fa"; // Importing the eye icon from React Icons
import { formatDate } from "./utils";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  width: 100%;
  display: flex;
  z-index: 10;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberText = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #fff;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  bottom: ${({ isVisible }) => (isVisible ? "0" : "-100%")};
  left: 0;
  width: 100%;
  max-height: 70vh;
  /* background: white; */
  /* background-color: rgba(255, 255, 255, 0.9); */
  background-color: #eaf5f2;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: bottom 0.3s ease-in-out;
  padding: 16px;
  z-index: 10000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const UserGroup = styled.div`
  margin-top: 20px;
`;

const UserItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  gap: 10px;

  .time {
    margin-top: -4px;
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

const EyeIconView = ({ views, toggleCurrent }) => {
  //
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    toggleCurrent();
  };

  return (
    <>
      <Container onClick={toggleModal}>
        <IconWrapper>
          <FaEye size={20} color="#fff" />
        </IconWrapper>
        <NumberText>{views.length}</NumberText>
      </Container>
      {/* Modal */}
      <ModalOverlay isVisible={isModalVisible} onClick={toggleModal} />
      <Modal isVisible={isModalVisible}>
        <CloseButton onClick={toggleModal}>&times;</CloseButton>
        <p>Views</p>
        <UserGroup>
          {views.map((v) => {
            return (
              <UserItem key={v._id}>
                <Avi>
                  <img src={v?.user.profilePic} alt="User avatar" />
                </Avi>
                <div>
                  <p className="name">{v.user.name}</p>
                  <p className="time">{formatDate(v.viewedAt)}</p>
                </div>
              </UserItem>
            );
          })}
        </UserGroup>
        {/* <p>This is where you can add your content!</p> */}
      </Modal>
    </>
  );
};

export default EyeIconView;
