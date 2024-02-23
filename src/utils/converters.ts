export const roundToDecimals = (value: number, count = 2) => {
  const multiplier = 10 ** count;

  return Math.round(value * multiplier) / multiplier;
};

export const prettyId = (id: string | number) => {
  const idStr = id.toString();

  return `${idStr.substring(0, 4)}****${idStr.substring(idStr.length - 6)}`;
};
