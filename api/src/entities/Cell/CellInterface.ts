import { CellContentInterface } from "../CellContent/CellContentInterface";

export interface CellInterface {
  getContent(): CellContentInterface | null;
  insertContent(content: CellContentInterface): void;
  getContentType(): "bombProximityIndicator" | "bomb" | "void";
  hasBombFlag(): boolean;
  getBombFlagState(): number;
  changeBombFlagState(state: 0 | 1 | 2 | undefined): void;
  isHidden(): boolean;
  unHide(): void;
}
