export const roundToDecimals = (value: number, count = 2) => {
  const multiplier = 10 ** count;

  return Math.round(value * multiplier) / multiplier;
};
