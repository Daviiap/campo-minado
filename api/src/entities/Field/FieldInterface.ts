export interface FieldInterface {
  readonly MIN_WIDTH: number;
  readonly MIN_HEIGHT: number;
  readonly MAX_WIDTH: number;
  readonly MAX_HEIGHT: number;
  readonly MIN_BOMBS_PERCENTAGE: number;
  readonly MAX_BOMBS_PERCENTAGE: number;
  getWidth(): number;
  getHeight(): number;
  getNumberOfBombs(): number;
  getNumberOfFlags(): number;
  getNumberOfHiddenCells(): number;
  unhideCell(xAxis: number, yAxis: number): void;
  changeFlagState(xAxis: number, yAxis: number): void;
  isSafe(): boolean;
  getState(): string;
  getField(): string[][];
}
