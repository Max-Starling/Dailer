const colors = {
  green: '#00a722',
  lightGreen: '#94c200',
  yellow: '#ecd400',
  orange: '#ea8500',
  red: '#e70000',
}

export const getTimerColor = (angle) => {
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
