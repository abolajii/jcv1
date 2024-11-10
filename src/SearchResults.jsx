/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import CommentSection from "./CommentSection";
import { HiCheckBadge } from "react-icons/hi2";
import NormalPost from "./NormalPost";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import usePostStore from "./store/usePostStore";

const SearchResults = ({ results, searchTerm }) => {
  const [searchResults, setSearchResults] = useState({
    users: results?.users || [],
    posts: results?.posts || [],
    comments: results?.comments || [],
  });

  useEffect(() => {
    setSearchResults(results);
  }, [results]);

  // Check if all result arrays are empty
  const isEmptyResults =
    searchResults?.users?.length === 0 &&
    searchResults?.posts?.length === 0 &&
    searchResults?.comments?.length === 0;

  return (
    <Container>
      {isEmptyResults ? (
        <NoResultsMessage>
          There are no such results. Try searching for another word.
        </NoResultsMessage>
      ) : (
        <>
          {searchResults?.users?.length > 0 && (
            <>
              {/* <GroupTitle>People</GroupTitle> */}
              {searchResults.users.map((user) => (
                <People key={user._id} user={user} searchTerm={searchTerm} />
              ))}
            </>
          )}

          {searchResults?.posts?.length > 0 && (
            <>
              {/* <GroupTitle>Posts</GroupTitle> */}
              {searchResults.posts.map((post) => (
                <Post key={post._id} post={post} searchTerm={searchTerm} />
              ))}
            </>
          )}

          {searchResults?.comments?.length > 0 && (
            <>
              {/* <GroupTitle>Comments</GroupTitle> */}
              {searchResults.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  searchTerm={searchTerm}
                />
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResults;

// Styled components
const Container = styled.div`
  padding: 10px;
`;

const GroupTitle = styled.h3`
  margin-top: 20px;
`;

const NoResultsMessage = styled.p`
  color: #666;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
`;

const ItemContainer = styled.div`
  /* border-bottom: 1px solid #ddd; */
  display: flex;
  gap: 9px;
  .name {
    font-size: 15px;
    font-weight: 500;
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

const Name = styled.div`
  font-size: 1rem;
  color: #0a0909;
  font-weight: 500;
`;

const UserName = styled.div`
  font-size: 13px;
  color: #2f2f2f;
`;

// Helper function to highlight the search term
const highlightText = (text, searchTerm) => {
  console.log(searchTerm, text);
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text
    .split(regex)
    .map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
};

// Individual components for displaying each type of result
const People = ({ user, searchTerm }) => {
  const { setSelectedUser } = usePostStore();
  const navigate = useNavigate();

  return (
    <ItemContainer className="pt-2 pl-2 pb-3 border-b-1">
      <div>
        <Avi
          onClick={() => {
            navigate(`/profile/${user._id}`);
            setSelectedUser(user);
          }}
        >
          <img src={user?.profilePic} alt="User avatar" />
        </Avi>
      </div>
      <div>
        <Name className="flex align-center">
          {highlightText(user.name, searchTerm)}
          {user.name === "admin" && (
            <div className="center">
              <HiCheckBadge color="#1b9d87" />
            </div>
          )}
        </Name>
        <UserName>@{highlightText(user.username, searchTerm)}</UserName>
      </div>
      {/* <p>{highlightText(user.name, searchTerm)}</p>
    <p>@{highlightText(user.username, searchTerm)}</p> */}
    </ItemContainer>
  );
};

const Post = ({ post, searchTerm }) => (
  <div className="border-b-1">
    <NormalPost post={post} noBg />
  </div>
  //   <ItemContainer className="flex flex-1 w-100">
  //  </ItemContainer>
  //   <ItemContainer>
  //     <h4>{highlightText(post.user?.username, searchTerm)}</h4>
  //     <p>{highlightText(post.content, searchTerm)}</p>
  //   </ItemContainer>
);

const Comment = ({ comment, searchTerm }) => (
  <CommentSection comment={comment} searchTerm={searchTerm} />

  //   <ItemContainer>
  //     <h4>{highlightText(comment.user?.username, searchTerm)}</h4>
  //     <p>{highlightText(comment.content, searchTerm)}</p>
  //   </ItemContainer>
);
