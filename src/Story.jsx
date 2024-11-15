/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { FaUpload } from "react-icons/fa";
import { Spinner } from "./components";
import { createStory } from "./api/requests";

// Keyframe for animation
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
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
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
    margin-bottom: 5px;
    font-weight: 500;
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
  margin-bottom: 4px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d4dbdb;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  padding: 10px 20px;
  background: #28a69e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TabButton = styled.button`
  margin-right: 15px;
  padding: 10px;
  background: ${({ active }) => (active ? "#28a69e" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#28a69e")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StoryContainer = ({ isOpen, closeModal }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("text"); // 'text', 'image', or 'video'

  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Matches animation duration
    }
  }, [isOpen]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideo(file);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (video) {
      formData.append("video", video);
    }
    formData.append("text", text);

    try {
      const response = await createStory(formData);
      console.log(response);
      setLoading(false);
      setText("");
      setImage(null);
      setVideo(null);
      setPreview(null);
      closeModal();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Overlay isOpen={isOpen} onClick={closeModal} isVisible={isVisible}>
      <ModalContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <p className="title">Create a Story</p>

        <div className="mb-2">
          <TabButton
            active={selectedTab === "text"}
            onClick={() => setSelectedTab("text")}
          >
            Text
          </TabButton>
          <TabButton
            active={selectedTab === "image"}
            onClick={() => setSelectedTab("image")}
          >
            Image
          </TabButton>
          {/* <TabButton
            active={selectedTab === "video"}
            onClick={() => setSelectedTab("video")}
          >
            Video
          </TabButton> */}
        </div>

        <form onSubmit={handleSubmit}>
          {selectedTab === "image" && (
            <>
              <FileUploadButton htmlFor="imageInput">
                <FaUpload style={{ marginRight: "8px" }} />
                Choose an image to upload
              </FileUploadButton>
              <HiddenFileInput
                id="imageInput"
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
              {/* <TextInput
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Add a caption or text"
              /> */}
            </>
          )}

          {selectedTab === "video" && (
            <>
              <FileUploadButton htmlFor="videoInput">
                <FaUpload style={{ marginRight: "8px" }} />
                Choose a video to upload
              </FileUploadButton>
              <HiddenFileInput
                id="videoInput"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
              <TextInput
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Add a caption or text"
              />
            </>
          )}

          {selectedTab === "text" && (
            <TextInput
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Add a caption or text"
            />
          )}

          <SubmitButton type="submit">
            {loading ? <Spinner /> : "Post Story"}
          </SubmitButton>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default StoryContainer;
