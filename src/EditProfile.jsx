import { FaChevronLeft } from "react-icons/fa";
import Spinner from "./components/Spinner";
import styled from "styled-components";
import { updateProfile } from "./api/requests";
import useAuthStore from "./store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  input[type="file"] {
    display: none;
  }

  label {
    color: #36bbba;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #36bbba;
    font-size: 14px;

    &:hover {
      background: #cbfafa;
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
    font-size: 14px;
    outline: none;
    resize: none;
    font-family: "Poppins";

    &::placeholder {
      color: #999;
      font-family: "Poppins";
    }

    &:focus {
      border-color: #36bbba;
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
  background-color: #36bbba;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #28a69e;
  }
`;

const Scrollable = styled.div`
  flex: 1; /* Allow it to take remaining space in MainContainer */
  width: 100%;
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box;
  height: 90svh;
`;

const EditProfile = () => {
  const { user, setActiveUser } = useAuthStore();

  const [bio, setBio] = useState(user?.bio);
  const [name, setName] = useState(user?.name);
  const [link, setLink] = useState(user?.link);
  const [location, setLocation] = useState(user?.location);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(user?.bio?.length || 0); // For tracking character count

  const navigate = useNavigate();

  const handleChangePicture = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFile(file);
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    if (bio !== user.bio) {
      formData.append("bio", bio);
    }

    if (name !== user.name) {
      formData.append("name", name);
    }

    if (location !== user.location) {
      formData.append("location", location);
    }

    if (link !== user.link) {
      formData.append("link", link);
    }

    // formData.append("name", name);
    // formData.append("link", link);
    // formData.append("location", location);

    try {
      const response = await updateProfile(formData);
      console.log(response.user);
      const stories = user.stories;
      setActiveUser({ stories, ...response.user });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (newBio.length <= 200) {
      setBio(newBio);
      setCharCount(newBio.length);
    }
  };

  return (
    <MainContainer>
      <div className="flex align-center border-b-1 pb-2">
        <FaChevronLeft
          size={18}
          color="#000"
          className="mr-1 pointer"
          onClick={() => navigate(`/profile`)}
        />
        <ProfileHeader>Profile Page</ProfileHeader>
      </div>
      <Scrollable>
        <ProfileSection>
          <UserAvi>
            <img src={preview || user?.profilePic} alt="User avatar" />
            <div>
              <label htmlFor="file-upload">Change Picture</label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleChangePicture}
              />
            </div>
          </UserAvi>
        </ProfileSection>
        <ProfileSection>
          <FormItem>
            <p>Profile Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormItem>
          <FormItem>
            <p>Username</p>
            <input type="text" value={user?.username} readOnly />
          </FormItem>
          <FormItem>
            <p>Link</p>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter your location"
            />
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
            <p>About Me</p>
            <textarea
              value={bio}
              rows={3}
              onChange={handleBioChange}
              placeholder="Write something about yourself"
            ></textarea>
            <p className="text-xs">{200 - charCount} characters remaining</p>
            {/* Display remaining characters */}
          </FormItem>
          <SubmitButton onClick={handleSubmit}>
            {loading ? <Spinner /> : "Save Changes"}
          </SubmitButton>
        </ProfileSection>
      </Scrollable>
    </MainContainer>
  );
};

export default EditProfile;
