export const lerp = (x: number, y: number, amount: number) =>
  x * (1 - amount) + y * amount;
