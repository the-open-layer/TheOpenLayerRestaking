import { useEvent } from 'react-use';
import { useLayoutEffect, useState } from 'react';
const mobileQuery = '(max-width: 768px)';
const getIsMobile = () => window.matchMedia(mobileQuery).matches;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const mediaQueryList = window.matchMedia(mobileQuery);
  const handleResize = () => setIsMobile(getIsMobile());

  useLayoutEffect(handleResize, []);
  useEvent('change', handleResize, mediaQueryList);

  return isMobile;
};
