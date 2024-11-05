import { FaImage, FaSmile, FaTimes } from "react-icons/fa";
import React, { useState } from "react";

import { AiOutlineGif } from "react-icons/ai";
import { RiCalendarScheduleFill } from "react-icons/ri";
import ScheduleModal from "./Schedule";
import Spinner from "./Spinner";
import { createPost } from "../api/requests";
import styled from "styled-components";
import usePostStore from "../store/usePostStore";

const Container = styled.div`
  margin-top: 2px;
`;

const IconBox = styled.div`
  display: flex;
  gap: 10px;
  color: #555;
  position: relative;

  svg {
    cursor: pointer;
    transition: color 0.5s ease;

    &:hover {
      color: #28a69e; /* Change color on hover */
    }
  }
`;

const ShareButton = styled.button`
  background-color: #36bbba;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 9px;
  /* width: 70px; */
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #28a69e; /* Darken on hover */
  }
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 3px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 540px;
  object-fit: cover;
  border-radius: 4px;

  @media (max-width: 768px) {
    /* max-height: 500px; */
  }
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
`;

const BottomTab = ({ quote, reply, onSubmit, closeModal }) => {
  const [loading, setLoading] = useState(false); // To handle loading state
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const { content, setPostSent, setPosts, posts } = usePostStore();
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submitPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      if (content.trim() || selectedImage) {
        const formData = new FormData();

        mentionedUsers.forEach((user) => {
          formData.append("mention", user);
        });
        //
        formData.append("content", content.trim());
        //   // If there is a selected image, append it to the form data
        if (selectedImage) {
          formData.append("imagePost", file);
        }

        const response = await createPost(formData);
        const newPosts = [response, ...posts];
        setPosts(newPosts);
        setPostSent(true);
        setLoading(false);
        setFile(null);
        setSelectedImage(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (quote || reply) {
      setLoading(true);
      try {
        await onSubmit();
        setLoading(false);
        closeModal();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      console.log("clicked", quote);
      await submitPost();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFile(null);
  };

  return (
    <Container className="flex justify-between flex-col">
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div>
        {/* Image preview with close button */}
        {selectedImage && (
          <ImagePreview>
            <Image src={selectedImage} alt="Selected" />
            <CloseButton onClick={handleRemoveImage} title="Remove Image" />
          </ImagePreview>
        )}
      </div>
      <div className="flex justify-between align-center">
        <div>
          <IconBox>
            <FaImage
              title="Add Image"
              onClick={() => document.getElementById("imageUpload").click()}
            />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <FaSmile title="Add Emoji" className="relative" />
            {/* <AiOutlineGif title="GIF" /> */}
            <RiCalendarScheduleFill
              title="Schedule Post"
              onClick={() => setIsModalOpen(true)}
            />
          </IconBox>
        </div>
        <div>
          <ShareButton className="center" onClick={handleSubmit}>
            {loading ? <Spinner /> : "Share"}
          </ShareButton>
        </div>
      </div>
    </Container>
  );
};

export default BottomTab;
