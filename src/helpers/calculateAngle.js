export const calculateAngle = (startDate, frequency) => {
  const now = new Date();
  const nowTime = now.getTime() + 100000000;
  const startTime = new Date(startDate).getTime();
  const endDate = new Date(startTime + frequency * 24 * 60 * 60 * 1000);
  endDate.setHours(23, 59, 59, 0);
  const endTime = endDate.getTime();
  const ratio = (nowTime - startTime) / (endTime - startTime);
  const angle = Math.floor(ratio * 360);
  return angle;
};
