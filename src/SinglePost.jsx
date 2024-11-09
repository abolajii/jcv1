import { FaArrowLeft, FaReply } from "react-icons/fa";
import { formatDate, formattedContent } from "./utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Comments from "./Comment";
import { HiCheckBadge } from "react-icons/hi2";
import MainContainer from "./MainContainer";
import { MdMoreHoriz } from "react-icons/md";
import ReplySection from "./ReplySection";
import { Spinner } from "./components";
import { getPostById } from "./api/requests";
import styled from "styled-components";
import usePostStore from "./store/usePostStore";

const Top = styled.div`
  height: 40px;
  background-color: rgba(232, 239, 239, 0.95);
  padding: 0 10px;
  position: sticky;
  top: 0px;
  border-bottom: 1px solid #e1e1e1;

  svg {
    color: #36bbba;
    margin-right: 5px;
  }
`;

const Body = styled.div`
  background-color: rgba(232, 239, 239, 0.95);
`;

const Inner = styled.div`
  background-color: rgba(254, 254, 254, 0.55);
  margin: 0 10px;
  margin-top: 20px;

  border-radius: 4px;

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

const Middle = styled.div`
  padding: 0 10px;
  font-size: 14.5px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const Image = styled.div`
  margin-top: 10px;
  height: 600px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const SinglePost = () => {
  const { selectedPost, setSelectedUser } = usePostStore();
  const [singlePost, setSinglePost] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (selectedPost?.user !== undefined) {
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
      <div>
        <Top className="flex justify-between align-center">
          <button
            onClick={() => navigate(location.state?.from || -1)}
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
        <Body>
          <Inner>
            <div className="flex top">
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(
                    `/profile/${
                      selectedPost?.user?._id || singlePost?.user?._id
                    }`
                  );
                  setSelectedUser(selectedPost?.user || singlePost?.user);
                }}
              >
                <Avi>
                  <img
                    src={
                      selectedPost?.user?.profilePic ||
                      singlePost?.user?.profilePic
                    }
                    alt="User avatar"
                  />
                </Avi>
              </div>
              <div className="ml-3 flex-1 flex justify-between">
                <div>
                  <div className="flex flex-col">
                    {/* <div className="name">
                      {selectedPost?.user?.name || singlePost?.user.name}
                    </div> */}

                    <div className="name flex">
                      {selectedPost?.user?.name || singlePost?.user.name}
                      {(selectedPost?.user.name === "admin" ||
                        singlePost?.user.name === "admin") && (
                        <div className="center">
                          <HiCheckBadge color="#1b9d87" />
                        </div>
                      )}
                    </div>
                    <div className="time">
                      {formatDate(
                        selectedPost?.createdAt || singlePost?.createdAt
                      )}
                    </div>
                  </div>
                </div>
                <div className="pointer">
                  <MdMoreHoriz color="#36bbba" />
                </div>
              </div>
            </div>

            <Middle className="">
              {formattedContent(selectedPost?.content || singlePost?.content)}
            </Middle>

            {singlePost?.imageUrl && (
              <Image className="mb-1">
                <img
                  src={selectedPost?.imageUrl || singlePost?.imageUrl}
                  alt="Project Update"
                />
              </Image>
            )}

            <ReplySection noReply post={selectedPost || singlePost} />
          </Inner>
          <Comments
            loading={loading}
            comments={singlePost?.comments}
            authorId={
              singlePost?.postType === "shared"
                ? singlePost?.originalPost.user._id
                : singlePost?.user?._id
            }
          />
        </Body>
      </div>
    </MainContainer>
  );
};

export default SinglePost;
