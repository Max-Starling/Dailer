import React from 'react';

import { getTimerColor } from '../helpers/getTimerColor';

const getRGBA = value => `rgba(${value}, ${value}, ${value}, 1)`;

const renderRect = ({ rotateTo = 0, isTransparent = false }, index) => (
  <rect
    key={index}
    width={120}
    height={120}
    fill={isTransparent ? getRGBA(0) : getRGBA(255)}
    transform={rotateTo ? `rotate(${rotateTo} 120 120)` : ''}
  />
);

export default ({
  size = 24,
  angle = 45,
}) => {
  const timerColor = getTimerColor(angle);

  const rightTopRect = { rotateTo: 90, isTransparent: angle > 90 };
  const rightBottomRect = { rotateTo: 180, isTransparent: angle > 180 };
  const leftBottomRect = { rotateTo: 270, isTransparent: angle > 270 };
  const leftTopRect = { rotateTo: 0 };
  const angularRect = { rotateTo: angle, isTransparent: true };

  const rects = [];
  rects.push(rightTopRect, rightBottomRect);
  if (angle < 180) {
    rects.push(angularRect, leftBottomRect, leftTopRect);
  } else {
    rects.push(leftBottomRect, leftTopRect, angularRect);
  }

  return (
    <svg
      viewBox="0 0 240 240"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="mask">
          {rects.map(renderRect)}
        </mask>
      </defs>
      <circle
        cx={120}
        cy={120}
        r={80}
        fill={timerColor}
        mask="url(#mask)"
      />
      <circle
        cx={120}
        cy={120}
        r={104}
        fill="transparent"
        strokeWidth={16}
        stroke={timerColor}
      />
    </svg>
  );
};
