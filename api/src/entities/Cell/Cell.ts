import { CellContentInterface } from "../CellContent/CellContentInterface";
import { CellInterface } from "./CellInterface";

export class Cell implements CellInterface {
  private content: CellContentInterface | null;
  private bombFlag: number;
  private hidden: boolean;

  public constructor(content: CellContentInterface | null = null) {
    this.content = content;
    this.bombFlag = 0;
    this.hidden = true;
  }

  public hasBombFlag(): boolean {
    return this.bombFlag === 1;
  }

  public getBombFlagState(): number {
    return this.bombFlag;
  }

  public insertContent(content: CellContentInterface): void {
    if (!this.content) {
      this.content = content;
    }
  }

  public changeBombFlagState(state: 0 | 1 | 2 | undefined = undefined): void {
    if (state !== undefined) {
      this.bombFlag = state;
    } else {
      if (this.bombFlag < 2) {
        this.bombFlag++;
      } else {
        this.bombFlag = 0;
      }
    }
  }

  public unHide(): void {
    if (this.bombFlag !== 1) {
      this.bombFlag = 0;
      this.hidden = false;
    }
  }

  public isHidden(): boolean {
    return this.hidden;
  }

  public getContent(): CellContentInterface | null {
    return this.content;
  }

  public getContentType(): "bombProximityIndicator" | "bomb" | "void" {
    return (this.content ? this.content.getType() : "void") as
      | "bombProximityIndicator"
      | "bomb"
      | "void";
  }
}
