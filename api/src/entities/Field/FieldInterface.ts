import { Cell } from "../Cell/Cell";

export interface FieldInterface {
  getWidth(): number;
  getHeight(): number;
  toString(): string;
  unHideCellNeighbors(xAxis: number, yAxis: number): string;
  putAndRemoveBombFlag(xAxis: number, yAxis: number): void;
  unHideCell(xAxis: number, yAxis: number): string;
  getState(): string[][];
  unHideAll(): void;
}
