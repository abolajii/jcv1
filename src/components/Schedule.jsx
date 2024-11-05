/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

import DateInput from "./DatePicker";
import { FaTimes } from "react-icons/fa";

// Slide-in and Slide-out Animations
const slideDown = keyframes`
  from {
    top: 0px;
    opacity: 0;
  }
  to {
    top: 70px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    top: 70px;
    opacity: 1;
  }
  to {
    top: 0px;
    opacity: 0;
  }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  /* align-items: center;
  */
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  /* background-color: white; */
  background: #f9f9f9;

  border-radius: 10px;
  max-width: 500px;
  height: 350px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${({ isClosing }) =>
    isClosing
      ? css`
          ${slideUp} 0.3s forwards
        `
      : css`
          ${slideDown} 0.3s forwards
        `};
`;

const ModalInner = styled.div`
  padding: 20px;
  border-radius: 10px;

  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-top: 15px;
  flex: 1;

  p {
    font-size: 15px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const SendButton = styled.button`
  background-color: #28a69e;

  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #218881;
  }
`;

// Main Modal Component
const ScheduleModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Duration should match the slideUp animation time
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer isClosing={isClosing}>
        <ModalInner>
          {/* Header */}
          <ModalHeader>
            <Title>Schedule a Post</Title>
            <CloseButton onClick={handleClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            <div className="flex flex-col text-sm">
              <DateInput />
            </div>
          </ModalBody>

          {/* Footer */}
          <ModalFooter>
            <SendButton>Schedule Post</SendButton>
          </ModalFooter>
        </ModalInner>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ScheduleModal;
