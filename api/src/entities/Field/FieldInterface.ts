import { BombInterface } from "../Bomb/BombInterface";
import { BombProximityIndicatorInterface } from "../BombProximityIndicator/BombProximityIndicatorInterface";

export interface FieldInterface {
  getBombs(): BombInterface[];
  getBombProximityIndicators(): BombProximityIndicatorInterface[];
  toString(): string;
  putRemoveBombFlag(xAxis: number, yAxis: number): void;
}
