import { HiCheckBadge } from "react-icons/hi2";
import React from "react";
import styled from "styled-components";

const AdminBadge = styled.div`
  color: #36bbba;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 5px;
`;

const Members = ({ members, createdBy }) => {
  return members?.map((m) => {
    return (
      <div key={m._id} className="flex mb-3 justify-between text-xs">
        <div className="flex">
          <div>
            <div className="avi">
              <img src={m.profilePic} />
            </div>
          </div>
          <div className="ml-2">
            <p className="text-xs flex">
              {m.name}
              <div className="verify">
                {m?.isVerified && <HiCheckBadge color="#1b9d87" />}
              </div>
            </p>
            <p className="text-xs">@{m.username}</p>
          </div>
        </div>
        <div>{m._id === createdBy?._id && <AdminBadge>Admin</AdminBadge>}</div>
      </div>
    );
  });
};

export default Members;
