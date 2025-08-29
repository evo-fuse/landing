export type Vector = {
  r: 0 | 1 | -1;
  c: 0 | 1 | -1;
};

export const ArrowKey = {
  ArrowLeft: 0,
  ArrowUp: 1,
  ArrowRight: 2,
  ArrowDown: 3,
} as const;

export const Direction = {
  Left: 0,
  Right: 1,
  Up: 2,
  Down: 3,
} as const;

export type ArrowKeyType = keyof typeof ArrowKey;
export type DirectionType = keyof typeof Direction;
