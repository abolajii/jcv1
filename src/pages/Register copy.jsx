import {
  AiOutlineCloudUpload,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";
import { register } from "../api/requests";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({}); // State for validation errors

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prevErrors) => ({ ...prevErrors, profilePic: null })); // Clear error on file upload
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prevErrors) => ({ ...prevErrors, profilePic: null })); // Clear error on drag-drop
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const usernamePattern = /^[A-Za-z0-9_]+$/; // Only allow letters, numbers, and underscores

    if (!name) newErrors.name = "Name is required";
    if (!username) newErrors.username = "Username is required";
    else if (!usernamePattern.test(username))
      newErrors.username = "Only letters, numbers, and underscores are allowed";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!profilePic) newErrors.profilePic = "Profile picture is required"; // Profile picture requirement

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate form and stop submission if errors exist

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      const response = await register(formData);
      setUser(response.user);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register</Title>
        <p className="text-sm mb-3">Create an account.</p>

        <InputContainer hasError={errors.username}>
          <AiOutlineUser size={20} />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username)
                setErrors((prevErrors) => ({ ...prevErrors, username: null }));
            }}
          />
        </InputContainer>
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

        <InputContainer hasError={errors.name}>
          <AiOutlineUser size={20} />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name)
                setErrors((prevErrors) => ({ ...prevErrors, name: null }));
            }}
          />
        </InputContainer>
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <InputContainer hasError={errors.email}>
          <AiOutlineMail size={20} />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prevErrors) => ({ ...prevErrors, email: null }));
            }}
          />
        </InputContainer>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <InputContainer hasError={errors.password}>
          <AiOutlineLock size={20} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prevErrors) => ({ ...prevErrors, password: null }));
            }}
          />
        </InputContainer>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <FileInputContainer
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("fileInput").click()}
          isDragging={isDragging}
          hasError={errors.profilePic}
        >
          <AiOutlineCloudUpload size={24} color="#4a90e2" />
          <p>Drag & drop or click to upload</p>
          <ProfilePicInput
            type="file"
            id="fileInput"
            onChange={handleFileChange}
          />
        </FileInputContainer>
        {errors.profilePic && <ErrorMessage>{errors.profilePic}</ErrorMessage>}
        {preview && <ProfilePicPreview src={preview} alt="Profile Preview" />}

        <RegisterButton type="submit">
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
  margin-bottom: 0.5rem;
  border: ${({ hasError }) =>
    hasError ? "1px solid red" : "1px solid transparent"};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: ${({ hasError }) =>
    hasError ? "2px dotted red" : "2px dotted #4a90e2"};
  border-radius: 8px;
  cursor: pointer;
  padding: 7px;
  color: #4a90e2;
  background-color: ${({ isDragging }) =>
    isDragging ? "#e3f7ff" : "transparent"};
`;

const ProfilePicInput = styled.input`
  display: none;
`;

const ProfilePicPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 1rem;
`;

const RegisterButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ab8;
  }
`;
