import React from "react";
import styled from "styled-components";

const Tag = styled.div``;

const Members = ({ members }) => {
  return members?.map((m) => {
    return (
      <div key={m._id} className="flex mb-3 align-center justify-between">
        <div className="flex">
          <div>
            <div className="avi">
              <img src={m.profilePic} />
            </div>
          </div>
          <div className="ml-2">
            <p className="text-sm">{m.name}</p>
            <p className="text-sm">@{m.username}</p>
          </div>
        </div>
        <div>B</div>
      </div>
    );
  });
};

export default Members;
