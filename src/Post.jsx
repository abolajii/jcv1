import NormalPost from "./NormalPost";
import QuotePost from "./QuotePost";
/* eslint-disable react/prop-types */
// import React from "react";
import SharePost from "./SharePost";

const Post = ({ post }) => {
  if (post.postType === "shared") {
    return <SharePost post={post} />;
  }

  if (post.postType === "quoted") {
    return <QuotePost post={post} />;
  }
  return <NormalPost post={post} />;
};

export default Post;
