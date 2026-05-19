import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, placeholder = 'https://via.placeholder.com/300' }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef();

  useEffect(() => {
    let observer;

    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                setImageSrc(src);
                setIsLoading(false);
              };
              img.onerror = () => {
                setImageSrc(placeholder);
                setIsLoading(false);
              };
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, placeholder]);

  return (
    <div ref={imgRef} className="relative">
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
