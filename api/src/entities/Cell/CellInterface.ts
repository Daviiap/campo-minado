import { CellContentInterface } from '../CellContent/CellContentInterface';

export interface CellInterface {
  getContent(): CellContentInterface | null;
  insertContent(content: CellContentInterface): void;
  getContentType(): string;
  hasBombFlag(): boolean;
  changeBombFlag(): void;
  isHidden(): boolean;
  unHide(): void;
}
