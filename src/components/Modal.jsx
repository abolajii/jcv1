import { formatDate, formattedContent, truncateWords } from "../utils";
import { quotePost, replyToPost } from "../api/requests";
import styled, { keyframes } from "styled-components";
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import BottomTab from "./BottomTab";
import { MdClose } from "react-icons/md";
import Textarea from "./Textarea";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

const slideIn = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
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

const ModalContainer = styled.div`
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  z-index: 1000;
  display: flex;
  justify-content: center;

  svg {
    cursor: pointer;
    color: #555555; /* Set the default text color */

    transition: color 0.5s ease;

    &:hover {
      color: #28a69e; /* Change color on hover */
    }
  }
`;

const ModalContent = styled.div`
  width: 500px;
  padding: 20px 10px;
  background-color: #fefefe;
  margin-top: 20px;
  height: 400px;
  max-height: 700px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.5s ease
    forwards;

  .reply {
    font-size: 12px;
  }
`;

const UserDetails = styled.div`
  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
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

const PostContainer = styled.div`
  font-size: 13px;
  line-height: 1.31;
  margin-bottom: 2px;
  /* color: #525252; Set the default text color */
`;

const Inner = styled.div`
  border-radius: 5px;
  background-color: #ececec;
  margin: 6px 0;
  /* padding: 9px; */
`;

const Middle = styled.div`
  font-size: 14.5px;
  line-height: 1.4;
  margin-top: 2px;
  word-wrap: break-word;
`;

export const Top = styled.div`
  display: flex;
  &.second {
    padding: 9px;
  }

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
  }
`;

const MaxHeight = styled.div`
  height: calc(100% - 30px);
`;

const Modal = ({ isOpen, quote, children, closeModal, data, share }) => {
  const modalContentRef = useRef(null);
  const [modalWidth, setModalWidth] = useState(0);
  const { user } = useAuthStore();
  const [content, setContent] = useState("");
  const { setHasComment, setPosts, posts } = usePostStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set the initial width
    if (modalContentRef.current) {
      setModalWidth(modalContentRef.current.offsetWidth);
    }

    // Update width on window resize
    const handleResize = () => {
      if (isOpen)
        if (modalContentRef.current) {
          setModalWidth(modalContentRef.current.offsetWidth);
        }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  if (children) {
    return <ModalContainer>{children}</ModalContainer>;
  }

  if (quote) {
    return (
      <ModalContainer>
        <ModalContent>
          <div onClick={closeModal}>
            <MdClose size={24} />
          </div>
          <div className="flex flex-1 gap-sm pr-1 pl-1 mt-2 h-100">
            <Avi>
              {user?.profilePic && (
                <img src={user?.profilePic} alt="User avatar" />
              )}
            </Avi>
            <MaxHeight
              ref={modalContentRef}
              className="flex-1 h-100 flex-col flex"
            >
              <div className="flex flex-col flex-1">
                <Textarea width={modalWidth} setText={setContent} />
                <div>
                  <Inner>
                    <Top className="second">
                      <div className="flex gap-sm">
                        <div>
                          <Avi>
                            {(data?.originalPost?.user?.profilePic ||
                              data?.user.profilePic) && (
                              <img
                                src={
                                  data?.originalPost?.user?.profilePic ||
                                  data?.user.profilePic
                                }
                                alt="User avatar"
                              />
                            )}
                          </Avi>
                        </div>
                        <div className="flex flex-col">
                          <div className="name">
                            {data?.originalPost?.user.name || data?.user.name}
                          </div>
                          <div className="time">
                            {formatDate(
                              data?.originalPost?.createdAt || data?.createdAt
                            )}
                          </div>
                        </div>
                      </div>
                    </Top>
                    <Middle className="pl-4 pr-4 pb-3">
                      {formattedContent(
                        data?.originalPost?.content || data?.content
                      )}
                    </Middle>
                    {/* <Image>
              <img src={bg} alt="alt preview" />
            </Image> */}
                  </Inner>
                </div>
              </div>

              <BottomTab
                quote
                closeModal={closeModal}
                onSubmit={async () => {
                  const formData = new FormData();
                  formData.append("content", content);
                  // if (file) {
                  //   // formData.append("quoteUpload", file);
                  // }
                  const response = await quotePost(data._id, formData);
                  const newsPosts = [response, ...posts];
                  setPosts(newsPosts);
                }}
              />
            </MaxHeight>
          </div>
        </ModalContent>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ModalContent>
        <div className="flex flex-col flex-1 h-100">
          <div
            className="flex align-center w-100 mb-1 gap-md"
            onClick={(event) => {
              event.stopPropagation();
              closeModal();
            }}
          >
            <MdClose size={24} />
            <p>
              Reply to {share ? data.originalPost.user.name : data?.user?.name}
            </p>
          </div>
          <div className="flex-1">
            <div className="flex flex-col pt-2">
              <div className="flex gap-sm">
                <div>
                  <div>
                    <Avi>
                      {data?.user?.profilePic && (
                        <img
                          src={
                            share
                              ? data.originalPost.user.profilePic
                              : data?.user?.profilePic
                          }
                          alt="User avatar"
                        />
                      )}
                    </Avi>
                  </div>
                </div>
                <UserDetails className="flex-1">
                  <div>
                    <div>
                      <div className="name">
                        {share ? data.originalPost.user.name : data?.user.name}
                      </div>
                    </div>
                    <div className="time">{formatDate(data?.createdAt)}</div>
                  </div>
                </UserDetails>
              </div>
              <div className="flex gap-sm">
                <div>
                  <BarContainer>
                    <Height />
                  </BarContainer>
                </div>
                <div className="flex flex-col">
                  <PostContainer>
                    {formattedContent(
                      truncateWords(
                        share ? data.originalPost.content : data?.content,
                        59
                      )
                    )}
                  </PostContainer>

                  <div className="reply mb-2 mt-1">
                    <p className="text-xs">
                      Replying to
                      <span
                        style={{
                          color: "#41b2b2",
                          marginLeft: "3px",
                        }}
                      >
                        @{data?.user.username.toLowerCase()}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-sm">
                <div>
                  <div>
                    <Avi>
                      {user?.profilePic && (
                        <img src={user?.profilePic} alt="User avatar" />
                      )}
                    </Avi>
                  </div>
                </div>
                <div className="flex-1" ref={modalContentRef}>
                  {/* i want the mini text area to take the width of the parent container,  */}

                  <Textarea width={modalWidth} setText={setContent} />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <BottomTab
              loading={loading}
              onSubmit={async () => {
                setLoading(true);
                const formData = new FormData();
                formData.append("content", content);

                try {
                  await replyToPost(
                    share ? data.originalPost._id : data._id,
                    formData
                  );
                  closeModal();
                  setHasComment(true);
                  setLoading(false);
                } catch (e) {
                  console.log(e);
                  setLoading(false);
                }
              }}
            />
          </div>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
