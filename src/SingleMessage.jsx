import { MessageStatusIcon, Right } from "./MessageBody";
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const formattedTime = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SingleMessage = ({ m }) => {
  return (
    <Right key={m._id} hasAnimated={m.status === "sending"}>
      <div className="bottom">
        <div className="message">{m.content}</div>
        <div className="flex align-center">
          <div className="time">{formattedTime(m.createdAt)}</div>
          <MessageStatusIcon status={m.status} />
        </div>
      </div>
    </Right>
  );
};

export default SingleMessage;
