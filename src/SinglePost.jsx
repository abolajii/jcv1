import { FaArrowLeft, FaReply } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainContainer from "./MainContainer";
import { Spinner } from "./components";
import { getPostById } from "./api/requests";
import styled from "styled-components";
import useAuthStore from "./store/useAuthStore";
import usePostStore from "./store/usePostStore";

const Top = styled.div`
  height: 60px;
  background-color: rgba(232, 239, 239, 0.95);

  position: sticky;
  top: 0px;

  svg {
    color: #36bbba;
    margin-right: 5px;
  }
`;

const SinglePost = () => {
  const { selectedPost } = usePostStore();
  const [singlePost, setSinglePost] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming user ID is available somehow, e.g., from a route parameter
    getPostById(id).then((data) => {
      setLoading(false);
      setSinglePost(data);
    });
  }, [id]);

  useEffect(() => {
    if (selectedPost !== null) {
      setLoading(false);
    }
  }, [selectedPost]);

  if (loading) {
    return (
      <MainContainer noSidebar>
        <div className="mt-4 ml-4">
          <Spinner />
        </div>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <Top className="flex justify-between align-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex align-center cursor"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={() => {
            // setIsOpen(true);
          }}
          className="flex align-center"
        >
          <FaReply /> Reply
        </button>
      </Top>
    </MainContainer>
  );
};

export default SinglePost;
