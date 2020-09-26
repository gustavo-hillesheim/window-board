export interface Position {
  x: number;
  y: number;
}

export interface Rectangle extends Position {
  width: number;
  height: number;
}

export interface DisableableRectagle extends Rectangle {
  disabledBounds: string[];
}

export interface FrameData extends DisableableRectagle {
  id: number;
}
