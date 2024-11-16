import { FaChevronLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import styled from "styled-components";

const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) =>
    props.color || "#1f1e1e"}; /* Default color for the whole component */

  &:hover {
    color: #555; /* Darker shade on hover */
  }

  .title {
    color: #1f1e1e;
    font-size: 13px;
  }
`;

const GoBack = ({ onClick, icon, title = "", color = "#1f1e1e", size }) => {
  return (
    <GoBackContainer
      onClick={onClick}
      color={color}
      className="flex align-center"
    >
      {icon || <FaChevronLeft size={size || 20} color={color} />}
      <span className="title">{title}</span>
    </GoBackContainer>
  );
};

GoBack.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  title: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default GoBack;
