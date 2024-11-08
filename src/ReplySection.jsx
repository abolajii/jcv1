import BottomIcon from "./components/BottomIcon";
/* eslint-disable react/prop-types */
import React from "react";
import { likePost } from "./api/requests";

const ReplySection = ({ noReply, post, share }) => {
  if (noReply) {
    return (
      <div>
        <BottomIcon
          post={post}
          likeCount={post.likes.length}
          shareCount={post.shares.length}
          replyCount={post.comments.length}
          toggleLike={async () => {
            try {
              await likePost(share ? post.originalPost._id : post._id);
              // console.log(response);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </div>
    );
  }

  return <div>Reply</div>;
};

export default ReplySection;
