/* eslint-disable react/prop-types */

const OtherUserStoryAvi = ({
  size = 50,
  strokeWidth = 2,
  imageSrc,
  stories = [], // Array of story objects
  loggedInUserId, // Current user's ID to check views
  color = "#0bdb8b",
  gapLength = 3,
  alt = "Story",
  innerPadding = 0.5,
  onClick,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // If there's only one segment or no stories, render a simple circle
  if (!stories.length) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="pointer"
        onClick={onClick}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} 0`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <clipPath id="circle-clip">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth - innerPadding}
          />
        </clipPath>
        <image
          href={imageSrc}
          x={strokeWidth + innerPadding}
          y={strokeWidth + innerPadding}
          width={size - 2 * (strokeWidth + innerPadding)}
          height={size - 2 * (strokeWidth + innerPadding)}
          clipPath="url(#circle-clip)"
          preserveAspectRatio="xMidYMid slice"
          alt={alt}
        />
      </svg>
    );
  }

  // Calculate segment lengths
  const segmentLength =
    (circumference - stories.length * gapLength) / stories.length;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="pointer"
      onClick={onClick}
    >
      {/* Render each story segment with appropriate color */}
      {stories.map((story, index) => {
        const isViewed = story.views.includes(loggedInUserId);
        const segmentColor = isViewed ? "#ccc" : color;
        const startAngle =
          (index * (segmentLength + gapLength) * 360) / circumference - 90;

        return (
          <circle
            key={story.id}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segmentColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference}`}
            transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
          />
        );
      })}

      {/* Clip Path for Circular Image */}
      <clipPath id="circle-clip">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth - innerPadding}
        />
      </clipPath>

      {/* Image Inside the Circle */}
      <image
        href={imageSrc}
        x={strokeWidth + innerPadding}
        y={strokeWidth + innerPadding}
        width={size - 2 * (strokeWidth + innerPadding)}
        height={size - 2 * (strokeWidth + innerPadding)}
        clipPath="url(#circle-clip)"
        preserveAspectRatio="xMidYMid slice"
        alt={alt}
      />
    </svg>
  );
};

export default OtherUserStoryAvi;
