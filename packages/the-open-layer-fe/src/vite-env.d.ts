/// <reference types="vite/client" />

declare module '*.svg?react' {
  import React from 'react';
  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
