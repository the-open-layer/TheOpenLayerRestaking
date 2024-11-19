import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  className,
  src,
  alt,
  width,
  height,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      style={{ objectFit: 'cover' }}
      className={className}
    />
  );
};

export default Image;
