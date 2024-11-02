import {
  AiOutlineCloudUpload,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"; // For redirecting

import Spinner from "../components/Spinner";
import { register } from "../api/requests";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore"; // Assuming you have a store for auth state
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore(); // Access setUser function from auth store
  const navigate = useNavigate(); // Hook for navigation

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !name) {
      // Add your error handling here
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      const response = await register(formData); // Assuming `register` is an API request function
      setUser(response.user);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Redirect to dashboard after a delay
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show an error toast or alert)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register</Title>
        <p className="text-sm mb-3">Create an account.</p>

        <InputContainer>
          <AiOutlineUser size={20} />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <AiOutlineUser size={20} />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <AiOutlineMail size={20} />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <AiOutlineLock size={20} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <div className="flex gap-md align-center mb-3 justify-center">
          <FileInputContainer
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <AiOutlineCloudUpload size={24} color="#4a90e2" />
            <p>Drag & drop or click to upload</p>
            <ProfilePicInput
              type="file"
              id="fileInput"
              onChange={handleFileChange}
            />
          </FileInputContainer>
          {preview && <ProfilePicPreview src={preview} alt="Profile Preview" />}
        </div>

        <RegisterButton type="submit" className="center">
          {loading ? <Spinner /> : "Register"}
        </RegisterButton>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </RegisterForm>
    </Container>
  );
};

export default Register;

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  /* justify-content: center;  */
  gap: 0.5rem;
  border: 2px dotted #4a90e2;
  border-radius: 8px;
  /* padding: 1rem; */
  cursor: pointer;
  text-align: center;
  padding: 7px;
  color: #4a90e2;
  width: fit-content;
  transition: background-color 0.2s ease;

  p {
    font-size: 10px;
  }
  &:hover {
    background-color: #f0f2f5;
  }
`;

const ProfilePicInput = styled.input`
  display: none; // Hide default input
`;

const ProfilePicPreview = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #4a90e2;
  object-fit: cover;
`;

const RegisterButton = styled.button`
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  width: 100%;

  &:hover {
    background-color: #357abd;
  }
`;
