import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

// Keyframes for top-to-bottom and bottom-to-top animations
const dropDown = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const riseUp = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

// Styled component for the animated number container
const NumberContainer = styled.div`
  font-size: 15px;
  background-color: #f3f3f3;
  color: #181818;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 50%;
  /* transform: translateX(-50%); */
  ${(props) =>
    props.animateDrop &&
    css`
      animation: ${dropDown} 0.5s forwards;
    `}
  ${(props) =>
    props.animateRise &&
    css`
      animation: ${riseUp} 0.5s forwards;
    `}
`;

// Main container with relative positioning to contain the animation
const CounterContainer = styled.div`
  position: relative;
  height: 15px;
  overflow: hidden;
`;

const AnimatedNumber = () => {
  const [current, setCurrent] = useState(0); // The visible count
  const [next, setNext] = useState(null); // The incoming count during animation
  const [isAnimating, setIsAnimating] = useState(false); // Track if an animation is active
  const [direction, setDirection] = useState(null); // Track animation direction: "up" or "down"

  useEffect(() => {
    // If next has updated, start the animation
    if (next !== null) setIsAnimating(true);
  }, [next]);

  const handleLike = () => {
    if (isAnimating) return; // Prevent action during animation
    setNext(current + 1);
    setDirection("down"); // Set direction to animate downwards
  };

  const handleUnlike = () => {
    if (isAnimating || current <= 0) return; // Prevent action below 1 or during animation
    setNext(current - 1);
    setDirection("up"); // Set direction to animate upwards
  };

  const handleAnimationEnd = () => {
    setCurrent(next); // Commit the next number as the current one
    setNext(null); // Clear the next state
    setIsAnimating(false); // Reset animation state
  };
  w;

  return (
    <div>
      <CounterContainer>
        {current > 0 && <NumberContainer>{current}</NumberContainer>}
        {next !== null && (
          <NumberContainer
            animateDrop={direction === "down"}
            animateRise={direction === "up"}
            onAnimationEnd={handleAnimationEnd}
          >
            {next}
          </NumberContainer>
        )}
      </CounterContainer>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleUnlike}>Unlike</button>
    </div>
  );
};

export default AnimatedNumber;
