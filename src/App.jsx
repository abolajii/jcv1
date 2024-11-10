import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Bookmark from "./Bookmark";
import Connections from "./Connections";
import Conversation from "./Conversation";
import Dashboard from "./Dashboard";
import Login from "./pages/Login";
import Notification from "./Notification";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import Search from "./Search";
import Settings from "./Settings";
import SinglePost from "./SinglePost";
import UserProfile from "./UserProfile";
import { createGlobalStyle } from "styled-components";
import useAuthStore from "./store/useAuthStore";

// Global style to hide overflow on the body for mobile screens
const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    body {
      overflow: hidden;
    }
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
              path="/register"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
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
              path="/search"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Search />
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
              path="/profile/:uid"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SinglePost />
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
              path="/c/:uid/:tag"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Connections />
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
