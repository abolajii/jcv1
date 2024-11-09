import BottomIcon from "./components/BottomIcon";
import Modal from "./components/Modal";
import { likePost } from "./api/requests";
import usePostStore from "./store/usePostStore";
/* eslint-disable react/prop-types */
import { useState } from "react";

const ReplySection = ({ noReply, post, share, single }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedPost, setHasComment } = usePostStore();

  if (noReply) {
    return (
      <div>
        <Modal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          onSubmit={() => {}}
          onCancel={() => {}}
          data={post}
          share={share}
          single={single}
        />
        <BottomIcon
          post={post}
          likeCount={post?.likes?.length}
          shareCount={post?.shares?.length}
          replyCount={post?.comments?.length}
          onReplyClick={() => {
            setIsOpen(true);
            setSelectedPost(post);
            setHasComment(false);
          }}
          toggleLike={async () => {
            try {
              await likePost(share ? post?.originalPost._id : post?._id);
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
