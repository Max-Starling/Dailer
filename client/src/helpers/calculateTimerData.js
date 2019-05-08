const colors = {
  green: '#00a722',
  lightGreen: '#94c200',
  yellow: '#ecd400',
  orange: '#ea8500',
  red: '#e70000',
}

export const calculateTimerColor = (angle) => {
  switch (true) {
    case angle < 90:
      return colors.green;
    case angle < 135:
      return colors.lightGreen;
    case angle < 225:
      return colors.yellow;
    case angle < 270:
      return colors.orange;
    default:
      return colors.red;
  }
};

export const calculateAngle = (startTime, endTime) => {
  const now = new Date();
  const nowTime = now.getTime();
  const ratio = (nowTime - startTime) / (endTime - startTime);
  const angle = Math.floor(ratio * 360);
  if (angle > 360) {
    return 360;
  } else if (angle < 0) {
    return 0;
  }
  return angle;
};

export const calculateRemainingTime = (startTime, endTime) => {
  const delta = endTime - startTime;

  const hours = Math.floor(delta / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${days}d`;
  } else if (hours >= 1) {
    return `${hours}h`;
  } else {
    return '<1h';
  }
};

export default (start, frequency) => {
  const now = new Date();
  const nowTime = now.getTime();
  const startTime = new Date(start).getTime();
  const endDate = new Date(startTime + frequency * 24 * 60 * 60 * 1000);
  endDate.setHours(23, 59, 59, 0);
  const endTime = endDate.getTime();
  
  const remainingTime = calculateRemainingTime(nowTime, endTime);
  const angle = calculateAngle(startTime, endTime);
  const color = calculateTimerColor(angle);

  return ({
    remainingTime,
    angle,
    color,
  });
};
