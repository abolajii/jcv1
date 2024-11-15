import React from "react";
import styled from "styled-components";

// Styled components for the circle border
const CircleContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const CircleBorder = ({ segments = 1 }) => {
  const getSegmentPaths = () => {
    const radius = 19;
    const centerX = 20;
    const centerY = 20;
    const anglePerSegment = 360 / segments;
    const gapAngle = 2;

    const paths = [];
    for (let i = 0; i < segments; i++) {
      const startAngle = i * anglePerSegment - 90;
      const endAngle = (i + 1) * anglePerSegment - 90 - gapAngle;

      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const startX = centerX + radius * Math.cos(startRad);
      const startY = centerY + radius * Math.sin(startRad);
      const endX = centerX + radius * Math.cos(endRad);
      const endY = centerY + radius * Math.sin(endRad);

      const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

      const pathData = `
        M ${startX},${startY}
        A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}
      `;

      paths.push(
        <path
          key={`segment-${i}`}
          d={pathData}
          stroke="#36bbba"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    }

    return paths;
  };

  return (
    <CircleContainer>
      <CircleSvg viewBox="0 0 40 40">{getSegmentPaths()}</CircleSvg>
    </CircleContainer>
  );
};

export default CircleBorder;
