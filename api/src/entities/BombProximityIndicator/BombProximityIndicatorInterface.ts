import { CellContentInterface } from "../CellContent/CellContentInterface";

export interface BombProximityIndicatorInterface extends CellContentInterface {
  incrementBombCounter(): void;
  getBombCounter(): number;
}
