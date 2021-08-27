import { BombInterface } from "../Bomb/BombInterface";
import { BombProximityIndicatorInterface } from "../BombProximity/BombProximityIndicatorInterface";

export interface FieldInterface {
  getBombs(): BombInterface[];
  getBombProximityIndicators(): BombProximityIndicatorInterface[];
}
