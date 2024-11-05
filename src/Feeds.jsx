/* eslint-disable react/prop-types */

import Post from "./Post";
import Skeleton from "./components/Skeleton";
import styled from "styled-components";
import usePostStore from "./store/usePostStore";

const Container = styled.div`
  margin-top: 40px;
  overflow: hidden;

  .negate {
    margin-top: -4px;
  }

  .loading {
    height: 300px;
    width: 100%;
    /* background: red; */
    border-radius: 5px;
  }
`;

const LoadingAvi = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #ccc;
  overflow: hidden;
`;

const Feeds = ({ isLoading }) => {
  const { posts } = usePostStore();
  if (isLoading) {
    return (
      <Container>
        <div className="flex">
          <LoadingAvi className="mr-2">
            <Skeleton height="100%" width="100%" />
          </LoadingAvi>
          <div>
            <div>
              <Skeleton height="10px" width="80px" border={"4px"} />
            </div>
            <div className="negate">
              <Skeleton height="10px" width="50px" border={"4px"} />
            </div>
          </div>
        </div>
        <div className="loading mt-3">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="flex mt-3">
          <LoadingAvi className="mr-2">
            <Skeleton height="100%" width="100%" />
          </LoadingAvi>
          <div>
            <div>
              <Skeleton height="10px" width="80px" border={"4px"} />
            </div>
            <div className="negate">
              <Skeleton height="10px" width="50px" border={"4px"} />
            </div>
          </div>
        </div>
        <div className="loading mt-3">
          <Skeleton height="100%" width="100%" />
        </div>
      </Container>
    );
  }
  return (
    <Container>
      {!isLoading && posts.length === 0 && (
        <div className="text-sm mt-4">
          No post yet. Create one e.g "Hello World!👾"
        </div>
      )}

      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </Container>
  );
};

export default Feeds;
