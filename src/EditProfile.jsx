import React, { useState } from "react";

import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";

const MainContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const ProfileSection = styled.div`
  margin: 20px 0;
`;

const UserAvi = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #0056b3;
    }
  }
`;

const FormItem = styled.div`
  margin-bottom: 20px;

  p {
    font-weight: 500;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }

    &:read-only {
      background: #f5f5f5;
      color: #999;
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #218838;
  }
`;

const EditProfile = () => {
  const { user, setUser } = useAuthStore(); // Assume `setUser` updates the user state
  const [profilePic, setProfilePic] = useState(user?.profilePic);
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleChangePicture = () => {
    const newPic = prompt("Enter the URL for the new profile picture:");
    if (newPic) {
      setProfilePic(newPic);
      setUser((prev) => ({ ...prev, profilePic: newPic })); // Update global store
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 3000); // Reset update message
    }
  };

  const handleSubmit = () => {
    setUser((prev) => ({
      ...prev,
      bio,
      location,
    }));
    alert("Profile updated successfully!");
  };

  return (
    <MainContainer>
      <ProfileHeader>Profile Page</ProfileHeader>
      <ProfileSection>
        <UserAvi>
          <img src={profilePic || "default-avatar.png"} alt="User avatar" />
          <div>
            <button onClick={handleChangePicture}>Change Picture</button>
          </div>
        </UserAvi>
        {isUpdated && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Profile picture updated!
          </p>
        )}
      </ProfileSection>
      <ProfileSection>
        <FormItem>
          <p>Profile Name</p>
          <input type="text" value={user?.name} />
        </FormItem>
        <FormItem>
          <p>Username</p>
          <input type="text" value={user?.username} readOnly />
        </FormItem>
        <FormItem>
          <p>Location</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
        </FormItem>
        <FormItem>
          <p>Bio</p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself"
          ></textarea>
        </FormItem>
        <SubmitButton onClick={handleSubmit}>Save Changes</SubmitButton>
      </ProfileSection>
    </MainContainer>
  );
};

export default EditProfile;
