import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { Spinner } from "../components";
import { login } from "../api/requests";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  background-color: rgba(232, 239, 239, 0.95);

  /* color: black; */
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore(); // Access setUser function from auth store
  const navigate = useNavigate(); // Hook for navigation

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "This field is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return; // Validate form and stop submission if errors exist

    setLoading(true);

    try {
      const data = { identifier: email, password };
      const response = await login(data);

      // Assuming response includes user data upon successful login
      setUser(response.user); // Set the authenticated user in the store

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.response.data.message);
      // setErrors(error.data.response)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        <p className="text-sm mb-3">Welcome back. Kindly log in.</p>

        <InputContainer hasError={errors.email}>
          <AiOutlineMail size={20} />
          <Input
            type="text"
            placeholder="Email or username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
              setErrors((prevErrors) => ({ ...prevErrors, password: null }));
            }}
          />
        </InputContainer>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <ErrorMessage>{error}</ErrorMessage>

        <LoginButton type="submit" className="center mb-2">
          {loading ? <Spinner /> : "Log in"}
        </LoginButton>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </LoginForm>
    </Container>
  );
};

export default Login;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;

  a {
    text-decoration: none;
    color: #4a90e2;
  }
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

const LoginButton = styled.button`
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
  width: 100%; /* Ensures full width */

  &:hover {
    background-color: #357abd;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: -0.8rem;
  margin-bottom: 9px;
`;
