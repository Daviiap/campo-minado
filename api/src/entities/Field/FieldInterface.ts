export interface FieldInterface {
  getWidth(): number;
  getHeight(): number;
  toString(): string;
  putAndRemoveBombFlag(xAxis: number, yAxis: number): void;
  unHiddeCell(xAxis: number, yAxis: number): string;
}
