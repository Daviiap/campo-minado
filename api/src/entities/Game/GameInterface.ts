import { Field } from "../Field/Field";

export interface GameInterface {
  unHideBlock(xAxis: number, yAxis: number): string;
  putAndRemoveFlag(xAxis: number, yAxis: number): void;
  getField(): string[][];
}
