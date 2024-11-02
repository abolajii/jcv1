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
  const [email, setEmail] = useState("admin@god.com");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore(); // Access setUser function from auth store
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty email or password and show a toast
    if (!email) {
      return;
    }
    if (!password) {
      return;
    }

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        <p className="text-sm mb-3">Welcome back. Kindly log in.</p>

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
  margin-bottom: 1rem;
`;
