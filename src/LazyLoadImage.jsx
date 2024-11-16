/* eslint-disable react/prop-types */
// ProgressiveImage.js
import styled, { css, keyframes } from "styled-components";

// Keyframes
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "300px"};
  overflow: hidden;
  background-color: #f3f4f6;
`;

const ImageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const PlaceholderImage = styled.img`
  ${ImageStyles}
  filter: blur(20px);
  transform: scale(1.1);
  opacity: ${(props) => (props.isMainLoaded ? 0 : 1)};
  transition: opacity 0.3s ease-out;
`;

const MainImage = styled.img`
  ${ImageStyles}
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in;
  animation: ${fadeIn} 0.3s ease-in;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isLoaded ? 0 : 1)};
  transition: opacity 0.3s ease-out;
  pointer-events: none;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  text-align: center;
`;

const ProgressiveImage = ({ src, alt, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [placeholderSrc, setPlaceholderSrc] = useState("");

  useEffect(() => {
    const generatePlaceholder = async () => {
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 40;
        canvas.height = 40;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const placeholderData = canvas.toDataURL("image/jpeg", 0.1);
        setPlaceholderSrc(placeholderData);
      } catch (error) {
        console.error("Error generating placeholder:", error);
      }
    };

    generatePlaceholder();

    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <Wrapper width={width} height={height}>
        <ErrorMessage>Failed to load image</ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper width={width} height={height}>
      {placeholderSrc && (
        <PlaceholderImage src={placeholderSrc} alt="" isMainLoaded={isLoaded} />
      )}

      <MainImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <LoaderWrapper isLoaded={isLoaded}>
        <Spinner />
      </LoaderWrapper>
    </Wrapper>
  );
};

export default ProgressiveImage;
