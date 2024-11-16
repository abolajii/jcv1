/* eslint-disable react/prop-types */

const StoryAvi = ({
  size = 50,
  strokeWidth = 2,
  imageSrc,
  segments = 1,
  color = "#0bdb8b",
  gapLength = 3, // Fixed gap between the segments
  alt = "Story", // Alt text for the image
  innerPadding = 0.5, // Spacing between the border and the image
  onClick,
}) => {
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Full circumference of the circle

  const dashLength = (circumference - segments * gapLength) / segments; // Length of each segment
  const dashArray = `${dashLength} ${gapLength}`; // Dash array for dynamic segments

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="pointer"
      onClick={onClick}
    >
      {/* Circle with Segmented Border */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeDasharray={segments === 1 ? `${circumference} 0` : dashArray}
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start at the top
      />
      {/* Clip Path for Circular Image */}
      <clipPath id="circle-clip">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth - innerPadding} // Reduce radius to add spacing
        />
      </clipPath>
      {/* Image Inside the Circle */}
      <image
        href={imageSrc}
        x={strokeWidth + innerPadding}
        y={strokeWidth + innerPadding}
        width={size - 2 * (strokeWidth + innerPadding)} // Adjust for spacing
        height={size - 2 * (strokeWidth + innerPadding)} // Adjust for spacing
        clipPath="url(#circle-clip)" // Apply circular clipping to the image
        preserveAspectRatio="xMidYMid slice" // Ensure the image fills the circle
        alt={alt}
      />
    </svg>
  );
};

export default StoryAvi;
