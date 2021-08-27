import { CellInterface } from "../Cell/CellInterface";

export interface BombProximityIndicatorInterface extends CellInterface {
  incrementBombCounter(): void;
  getBombCounter(): number;
}
