import React from 'react';
import { cn } from '@/lib/utils';
interface ImageProps<T extends string | number> {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: T;
  height?: T;
  onClick?: () => void;
}
const Icon: React.FC<ImageProps<string | number>> = ({
  src,
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      className={cn('object-center object-cover', className)}
      {...props}
    />
  );
};

export default Icon;
