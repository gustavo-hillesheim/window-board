export interface Position {
  x: number;
  y: number;
}

export interface FrameData extends Position {
  id: number;
  width: number;
  height: number;
}
