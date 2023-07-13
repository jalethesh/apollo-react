export const numberFormatter = (num: number): string | number => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`; // convert to M for number from > 1 million
  } else {
    return num;
  }
};