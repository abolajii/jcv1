import BottomIcon from "./components/BottomIcon";
/* eslint-disable react/prop-types */
import React from "react";

const ReplySection = ({ noReply }) => {
  if (noReply) {
    return (
      <div>
        <BottomIcon />
      </div>
    );
  }

  return <div>Reply</div>;
};

export default ReplySection;
