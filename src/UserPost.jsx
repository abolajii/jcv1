import Post from "./Post";
import React from "react";

const UserPost = ({ posts }) => {
  if (posts.length > 0) {
    return posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  }
};

export default UserPost;
