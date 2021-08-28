import { BombInterface } from "../Bomb/BombInterface";
import { BombProximityIndicatorInterface } from "../BombProximityIndicator/BombProximityIndicatorInterface";
import { CellContentInterface } from "../CellContent/CellContentInterface";

export interface FieldInterface {
  getWidth(): number;
  getHeight(): number;
  toString(): string;
  putRemoveBombFlag(xAxis: number, yAxis: number): void;
  unHiddeCell(xAxis: number, yAxis: number): string;
}
