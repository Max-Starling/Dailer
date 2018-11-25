import React from 'react';

const getRGBA = (degree, bound) => {
  const colorVal = degree >= bound ? 255 : 0;
  return `rgba(${colorVal}, ${colorVal}, ${colorVal}, 1)`;
}

export default ({
  fill = '#000',
  size = 16,
  bound = 45,
}) => {
  const rects = [];

  for (let i = 1; i <= 360; i++) {
    rects.push({ size, bound });
  }

  const renderRect = ({ size, bound }, index) => (
    <rect
      width={size}
      height={size}
      fill={getRGBA((index + 1) - 90, bound)}
      transform={`rotate(${index + 1} ${size} ${size})`}
    />
  );

  return (
    <svg
      viewBox={`0 0 ${size * 2} ${size * 2}`}
      height={size * 2}
      width={size * 2}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="angleX">
          <g id="partA">
            {rects.map(renderRect)}
          </g>
        </mask>
      </defs>
      <circle
        cx={size}
        cy={size}
        fill={fill}
        r={size}
        mask="url(#angleX)"
      />
    </svg>
  );
};
