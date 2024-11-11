import { FaChevronLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  color: #36bbba; /* You can customize the color */

  &:hover {
    color: #33aaaa; /* Darker shade on hover */
  }
`;

const GoBack = ({
  onClick,
  icon = <FaChevronLeft size={23} />,
  title = "",
}) => {
  return (
    <GoBackContainer onClick={onClick}>
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </GoBackContainer>
  );
};

GoBack.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default GoBack;
