export const roundToDecimals = (value: number, count = 2) => {
  const multiplier = 10 ** count;

  return Math.round(value * multiplier) / multiplier;
};

export const prettyId = (id: string | number) => {
  const idStr = id.toString();

  return `${idStr.substring(0, 4)}****${idStr.substring(idStr.length - 6)}`;
};

export const separateNumbers = (num: number, separator: string = ','): string => {
  const isNegative = num < 0;
  const reverseStr = (str: string): string => str.split('').reverse().join('');
  const [integerPart, decimalPart] = Math.abs(num).toString().split('.');
  const splitedIntegerPart = reverseStr(integerPart)
    .match(/.{1,3}/g)
    ?.join(separator);
  const formattedIntegerPart = splitedIntegerPart || integerPart;
  const formattedNumber = `${isNegative ? '-' : ''}${reverseStr(formattedIntegerPart)}.${decimalPart || '00'}`;
  return formattedNumber;
};

export const getDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleString();
};
