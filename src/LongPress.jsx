/* eslint-disable react/prop-types */
import { useState } from "react";

const LongPressButton = ({ onLongPress, delay = 300 }) => {
  const [pressTimer, setPressTimer] = useState(null);

  const handleMouseDown = () => {
    // Start a timer for detecting a long press
    const timer = setTimeout(() => {
      onLongPress(); // Trigger the long press action
    }, delay);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    // If the press timer is still running, it's a short press
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
      // onClick(); // Trigger the short click action
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Prevent the timer from staying on when the cursor leaves
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      Press Me
    </button>
  );
};

export default function App() {
  // const handleClick = () => {
  //   console.log("Short click!");
  // };

  const handleLongPress = () => {
    console.log("Long press!");
  };

  return (
    <div>
      <LongPressButton onLongPress={handleLongPress} />
    </div>
  );
}
