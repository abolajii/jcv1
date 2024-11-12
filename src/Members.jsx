import React from "react";

const Members = ({ members }) => {
  return members?.map((m) => {
    return (
      <div key={m._id} className="flex mt-3">
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
    );
  });
};

export default Members;
