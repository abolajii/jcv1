/* eslint-disable react/prop-types */
import styled from "styled-components";

export const SkeletonPulse = styled.div`
  display: inline-block;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  background: linear-gradient(
    -90deg,
    rgba(185, 194, 194, 0.4) 0%,
    rgba(232, 239, 239, 0.5) 50%,
    rgba(185, 194, 194, 0.4) 100%
  );
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  overflow: hidden;
  border-radius: ${({ border }) => border && `${border}px`};
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -140% 0%;
    }
  }
`;

export const SkeletonText = styled.div`
  height: 25px;
  width: 25px;
  margin: 13px 0;
`;

export const SkeletonInput = styled.div`
  margin-bottom: 20px;
  height: 40px;
  width: 280px;
`;

const Skeleton = ({ border, height, width }) => {
  return <SkeletonPulse border={border} height={height} width={width} />;
};

export default Skeleton;
