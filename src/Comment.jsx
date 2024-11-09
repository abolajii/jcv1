/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  padding: 0 10px;
  .title {
    font-size: 16px;
    font-weight: 500;
  }

  .no {
    /* padding: 5px 10px 9px 10px; */
    margin-top: -10px;
  }
`;

const Comments = ({ comments, loading }) => {
  if (comments?.length === 0 && !loading) {
    return (
      comments?.length === 0 && (
        <Container className="text-sm">
          <p className="no">No comments</p>
        </Container>
      )
    );
  }

  return (
    <Container>
      {comments?.length === 0 && (
        <div className="title">Comments ({comments?.length})</div>
      )}
    </Container>
  );
};

export default Comments;
