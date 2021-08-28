import { CellContentInterface } from '../CellContent/CellContentInterface';

export interface CellInterface {
  getContent(): CellContentInterface | null
  getContentType(): string;
  hasBombFlag(): boolean;
  changeBombFlag(): void;
  getXAxis(): number;
  getYAxis(): number;
}
