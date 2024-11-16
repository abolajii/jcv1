import { useEffect, useRef, useState } from "react";

export const useLazyLoadImage = (src) => {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("Is intersecting:", entry.isIntersecting); // Debug

        if (entry.isIntersecting) {
          setLoadedSrc(src); // Load image when visible
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the image is in view
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { loadedSrc, imgRef };
};
