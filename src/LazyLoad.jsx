/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useLazyLoadImage } from "./hook/useLazyLoad";

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  object-fit: cover;
  z-index: 2; /* Ensure it is above the blur background */
`;

const LazyStoryImage = ({ src, alt }) => {
  const { loadedSrc, imgRef } = useLazyLoadImage(src);

  return (
    <StoryImage
      ref={imgRef}
      src={loadedSrc || "placeholder.png"} // Show a placeholder while loading
      alt={alt}
    />
  );
};

export default LazyStoryImage;
