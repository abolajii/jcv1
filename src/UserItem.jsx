/* eslint-disable react/prop-types */
import React, { useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  border-bottom: 1px solid rgba(54, 187, 186, 0.2);
  padding: 10px 0;
  cursor: pointer;
  .name {
    font-size: 13px;
  }
`;

const Image = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 6px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #36bbba;
  border-radius: 4px;
  transition: all 150ms ease-in-out;

  ${HiddenCheckbox}:checked + & {
    border-color: #36bbba;
    background-color: #36bbba;
  }
`;

const UserItem = ({ user, onClick, isSelected }) => {
  return (
    <Container
      className="flex align-center justify-between"
      onClick={() => onClick(user)}
    >
      <div>
        <div className="flex align-center">
          <Image>
            <img src={user.profilePic} alt="image" />
          </Image>
          <p className="name">{user.name}</p>
        </div>
      </div>
      <CheckboxContainer>
        <HiddenCheckbox checked={isSelected} readOnly />
        <StyledCheckbox />
      </CheckboxContainer>
    </Container>
  );
};

export default UserItem;
