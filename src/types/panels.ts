// Basic panel definition
export type Panel = {
  id: string;
  width: number;
  height: number;
  rotated?: boolean;
};

// Panel positioned by the nesting algorithm
export type PlacedPanel = Panel & {
  x: number;
  y: number;
};