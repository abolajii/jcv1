import { FaChevronLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  color: ${(props) =>
    props.color || "#1f1e1e"}; /* Default color for the whole component */

  &:hover {
    color: #555; /* Darker shade on hover */
  }

  .title {
    color: #1f1e1e;
  }
`;

const GoBack = ({ onClick, icon, title = "", color = "#1f1e1e" }) => {
  return (
    <GoBackContainer
      onClick={onClick}
      color={color}
      className="flex align-center"
    >
      <span style={{ color }}>
        {icon || <FaChevronLeft size={20} color={color} />}
      </span>
      {title && <span className="title">{title}</span>}
    </GoBackContainer>
  );
};

GoBack.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  title: PropTypes.string,
  color: PropTypes.string,
};

export default GoBack;
