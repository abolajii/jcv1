import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import { FaUpload } from "react-icons/fa";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-out
    forwards;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  max-width: 600px;
  margin: 2% auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(${({ isOpen }) => (isOpen ? "0" : "-20%")});
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-out
    forwards;

  .title {
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  padding: 10px 15px;
  border: 1px solid #28a69e;
  color: #28a69e;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d4dbdb;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TextInput = styled.input`
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: #28a69e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StoryContainer = ({ isOpen, closeModal }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Story submitted:", { text, image });
    setText("");
    setImage(null);
    setPreview(null);
    closeModal();
  };

  return (
    <Overlay isOpen={isOpen} onClick={closeModal}>
      <ModalContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <p className="title">Create a Story</p>
        <form onSubmit={handleSubmit}>
          <FileUploadButton htmlFor="fileInput">
            <FaUpload style={{ marginRight: "8px" }} />
            Choose a file to upload
          </FileUploadButton>
          <HiddenFileInput
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          )}
          <TextInput
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Add a caption or text"
          />
          <SubmitButton type="submit">Post Story</SubmitButton>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default StoryContainer;
