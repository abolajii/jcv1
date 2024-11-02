import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Bookmark from "./Bookmark";
import Conversation from "./Conversation";
import Dashboard from "./Dashboard";
import Login from "./pages/Login";
import Notification from "./Notification";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "./Settings";
import useAuthStore from "./store/useAuthStore";

// Global style to hide overflow on the body for mobile screens
const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    body {
      overflow: hidden;
    }
  }
`;

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // Hide on desktop
  @media (min-width: 769px) {
    display: none;
  }
`;

const Scrollable = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  /* background-color: #f5f5f5; */
  padding: 10px;
  box-sizing: border-box;
  margin-top: 70px; /* Height of Header */
  margin-bottom: 70px; /* Height of MobileSidebar */
`;

const MobileSidebar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  /* background-color: #f2f2f2; */
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3); */

  // Hide on desktop
  @media (min-width: 769px) {
    display: none;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  /* background-color: #f2f2f2; */
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */
`;

const DeskTop = styled.div`
  display: none; /* Hidden by default */

  // Show only on desktop
  @media (min-width: 769px) {
    display: block;
    background-color: green;
    color: white;
    padding: 20px;
  }
`;

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <GlobalStyle />
      <div>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/conversation"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Conversation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Bookmark />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
