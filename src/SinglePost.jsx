import React, { useEffect, useState } from "react";

import MainContainer from "./MainContainer";
import { Spinner } from "./components";
import { getPostById } from "./api/requests";
import useAuthStore from "./store/useAuthStore";
import { useParams } from "react-router-dom";
import usePostStore from "./store/usePostStore";

const SinglePost = () => {
  const { selectedPost } = usePostStore();
  const [singlePost, setSinglePost] = useState(null);

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
  return <MainContainer>SinglePost</MainContainer>;
};

export default SinglePost;
