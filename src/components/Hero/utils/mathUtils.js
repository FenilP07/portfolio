export const wrapPosition = (value, min, max) => {
  if (value > max) return min;
  if (value < min) return max;
  return value;
};