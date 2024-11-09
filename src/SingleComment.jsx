import { formatDate, formattedContent } from "./utils";

import BottomIcon from "./components/BottomIcon";
import { HiCheckBadge } from "react-icons/hi2";
import { MdMoreHoriz } from "react-icons/md";
import Modal from "./components/Modal";
import { replyToComment } from "./api/requests";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import usePostStore from "./store/usePostStore";
/* eslint-disable react/prop-types */
import { useState } from "react";

const Container = styled.div`
  margin-top: 20px;
  .name {
    font-size: 15px;
    font-weight: 500;
  }
  .top {
    padding: 10px;
  }
  .time {
    font-size: 12px;
  }
`;
const Middle = styled.div`
  flex: 1;
  font-size: 14px;
  color: #131313;
  line-height: 1.4;
  margin-bottom: 4px;
  margin-top: -5px;
`;

const CommentMessage = styled.div`
  margin-top: -5px;
  font-size: 14px;
  color: #131313;
  line-height: 1.4;
  margin-bottom: 4px;
`;
const Avi = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #313838;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const BarContainer = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Height = styled.div`
  width: 2px;
  height: calc(100%);
  background-color: rgba(40, 166, 158, 0.4);
`;

const SingleComment = ({ c, authorId }) => {
  //
  const [isOpen, setIsOpen] = useState(false);
  // const [like, setLike] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const { content } = usePostStore();

  const checkIfAuthorReplied = () => {
    const postAuthorId = authorId; // assuming authorId is passed as a prop to SingleComment
    return c?.replies?.find((reply) => reply.user._id === postAuthorId);
  };

  const [hasComment, setHasComment] = useState(false); // Track if post is liked by the current user
  const [hasBookmark, setHasBookmark] = useState(c?.isBookmarked); // Track if post is liked by the current user
  // const navigate = useNavigate();

  const handleBookmarkClick = async () => {};
  // console.log(c);

  const handleCommentClick = () => {
    setIsOpen(!isOpen);
    setSelectedComment("");
  };

  const replyComment = async () => {
    const formData = new FormData();
    formData.append("content", content);
    // if (file) {
    // formData.append("replyUpload", file);
    // }
    try {
      const response = await replyToComment(
        selectedComment ? selectedComment._id : c._id,
        formData
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  //
  const handleLikeClick = async () => {};

  //
  const sharePost = async () => {};

  if (checkIfAuthorReplied()) {
    const reply = checkIfAuthorReplied();

    // console.log(reply);
    // return (
    //   <div className="flex gap-sm mb-4 border-b-1 pb-3">
    //     <Modal
    //       isOpen={isOpen}
    //       closeModal={() => {
    //         setIsOpen(false);
    //         setSelectedComment("");
    //       }}
    //       data={selectedComment || c}
    //       handleSubmit={replyComment}
    //     />
    //     <div className="flex flex-col flex-1">
    //       <div className="flex gap-sm">
    //         <One>
    //           <Avi>
    //             <img src={c?.user?.profilePic} alt="User avatar" />
    //           </Avi>
    //         </One>
    //         <div className="flex flex-col flex-1">
    //           <div>
    //             <div className="flex-1 flex justify-between mt-1">
    //               <div className="mt-1">
    //                 <div>
    //                   <div className="name">{c.user.name}</div>
    //                 </div>
    //                 <div className="time">{formatDate(c?.createdAt)}</div>
    //               </div>
    //               <div className="pointer">
    //                 <MdMoreHoriz color="#36bbba" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex gap-sm">
    //         <One>
    //           <Line />
    //         </One>
    //         <div className="flex flex-col flex-1">
    //           <CommentMessage>{c?.content}</CommentMessage>
    //           <div className="pb-1">
    //             <BottomIcon
    //               toggleLike={handleLikeClick}
    //               onBookmarkClick={handleBookmarkClick}
    //               onReplyClick={handleCommentClick}
    //               sharePost={sharePost}
    //               hasComment={hasComment}
    //               hasBookmark={hasBookmark}
    //               replyCount={reply ? c.replies?.length - 1 : c.replies?.length}
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       {/* OVER HERE I WANT TO SHOW THE AUTHOR RESPONSE PICTURE AND ALL ABOUT */}
    //       <div className="flex gap-sm">
    //         <One className="up">
    //           <Avi>
    //             <img src={reply?.user?.profilePic} alt="User avatar" />
    //           </Avi>
    //         </One>
    //         <div className="flex flex-col flex-1">
    //           <div>
    //             <div className="flex-1 flex justify-between mb-2">
    //               <div className="mt-2">
    //                 <div>
    //                   <div className="name">{c.user.name}</div>
    //                 </div>
    //                 <div className="time">{formatDate(c?.createdAt)}</div>
    //               </div>
    //               <div className="pointer">
    //                 <MdMoreHoriz color="#36bbba" />
    //               </div>
    //             </div>
    //           </div>
    //           <CommentMessage>{reply?.content}</CommentMessage>
    //           <div className="pb-1">
    //             <BottomIcon
    //               // hasLiked={like}
    //               onLikeClick={handleLikeClick}
    //               onBookmarkClick={handleBookmarkClick}
    //               onCommentClick={() => {
    //                 setIsOpen(true);
    //                 setSelectedComment(reply);
    //               }}
    //               sharePost={sharePost}
    //               hasComment={hasComment}
    //               hasBookmark={hasBookmark}
    //               commentCount={reply?.replies?.length}
    //               // likeCount={c.likes.length === 0 ? "" : c.likes.length}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
    return (
      <Container className="flex gap-sm mb-4 border-b-1 pb-3">
        {/* Yes */}
        <Modal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          data={c}
          // handleSubmit={replyComment}
          // reply
        />
        <div className="flex-1">
          <div className="flex flex-col pt-2">
            <div className="flex gap-sm">
              <div>
                <Avi>
                  <img src={c?.user?.profilePic} alt="User avatar" />
                </Avi>
              </div>
              <div className="flex-1 flex justify-between">
                <div className="mt-1">
                  <div>
                    <div className="name flex">
                      {c?.user.name}
                      {c?.user.name === "admin" && (
                        <div className="center">
                          <HiCheckBadge color="#1b9d87" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="time">{formatDate(c?.createdAt)}</div>
                </div>
                <div className="pointer">
                  <MdMoreHoriz color="#36bbba" />
                </div>
              </div>
            </div>

            <div className="flex gap-sm">
              <div>
                <BarContainer>
                  <Height />
                </BarContainer>
              </div>
              <div className="flex flex-col flex-1">
                <Middle>{formattedContent(c?.content)}</Middle>
                <BottomIcon
                  noPadding
                  // hasLiked={like}
                  // onLikeClick={handleLikeClick}
                  // onBookmarkClick={handleBookmarkClick}
                  // onReplyClick={handleCommentClick}
                  // sharePost={sharePost}
                  //   post={post}
                  // hasComment={hasComment}
                  // hasBookmark={hasBookmark}
                  // likeCount={c?.likes?.length === 0 ? "" : c?.likes?.length}
                  // replyCount={c?.replies?.length === 0 ? "" : c?.replies?.length}
                  //   likeCount={post.likes.length === 0 ? "" : post.likes.length}
                />
              </div>
            </div>

            <div className="flex gap-sm">
              <div>
                <Avi>
                  <img src={reply?.user?.profilePic} alt="User avatar" />
                </Avi>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex-1 flex justify-between">
                  <div className="mt-1">
                    <div>
                      <div className="name flex">
                        {c?.user.name}
                        {c?.user.name === "admin" && (
                          <div className="center">
                            <HiCheckBadge color="#1b9d87" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="time">{formatDate(c?.createdAt)}</div>
                  </div>
                  <div className="pointer">
                    <MdMoreHoriz color="#36bbba" />
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <Middle>{formattedContent(reply?.content)}</Middle>
                  </div>
                  <BottomIcon
                    noPadding
                    // hasLiked={like}
                    // onLikeClick={handleLikeClick}
                    // onBookmarkClick={handleBookmarkClick}
                    // onReplyClick={handleCommentClick}
                    // sharePost={sharePost}
                    //   post={post}
                    // hasComment={hasComment}
                    // hasBookmark={hasBookmark}
                    // likeCount={c?.likes?.length === 0 ? "" : c?.likes?.length}
                    // replyCount={c?.replies?.length === 0 ? "" : c?.replies?.length}
                    //   likeCount={post.likes.length === 0 ? "" : post.likes.length}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex gap-sm mb-4 border-b-1 pb-3">
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        data={c}
        handleSubmit={replyComment}
        reply
      />
      <div>
        <Avi>
          <img src={c?.user?.profilePic} alt="User avatar" />
        </Avi>
      </div>
      <div className="flex flex-col flex-1">
        <div>
          <div className="flex-1 flex justify-between mb-2">
            <div className="mt-1">
              <div>
                <div className="name flex">
                  {c?.user.name}
                  {c?.user.name === "admin" && (
                    <div className="center">
                      <HiCheckBadge color="#1b9d87" />
                    </div>
                  )}
                </div>
              </div>
              <div className="time">{formatDate(c?.createdAt)}</div>
            </div>
            <div className="pointer">
              <MdMoreHoriz color="#36bbba" />
            </div>
          </div>
        </div>
        <Middle>{c?.content}</Middle>

        <BottomIcon
          noPadding
          // hasLiked={like}
          onLikeClick={handleLikeClick}
          onBookmarkClick={handleBookmarkClick}
          onReplyClick={handleCommentClick}
          sharePost={sharePost}
          //   post={post}
          hasComment={hasComment}
          hasBookmark={hasBookmark}
          likeCount={c?.likes?.length === 0 ? "" : c?.likes?.length}
          replyCount={c?.replies?.length === 0 ? "" : c?.replies?.length}
          //   likeCount={post.likes.length === 0 ? "" : post.likes.length}
        />
      </div>
    </Container>
  );
};

export default SingleComment;

const One = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.up {
    margin-top: -25px;
  }
`;

const Line = styled.div`
  width: 2px;
  background-color: #afafaf;
  height: 100%;
  margin-top: 3px;
`;
