import { Field } from "../Field/Field";
import { GameInterface } from "./GameInterface";

export class Game implements GameInterface {
  private field: Field;
  private gameOver: boolean;

  public constructor(field: Field) {
    this.field = field;
    this.gameOver = false;
  }

  public unHideBlock(xAxis: number, yAxis: number): string {
    let unHidedBlock = "";
    if (!this.gameOver) {
      unHidedBlock = this.field.unHideCell(xAxis, yAxis);

      if (unHidedBlock === "bomb") {
        this.gameOver = true;
      }
    }
    return unHidedBlock;
  }

  public putAndRemoveFlag(xAxis: number, yAxis: number): void {
    if (!this.gameOver) {
      this.field.putAndRemoveBombFlag(xAxis, yAxis);
    }
  }

  public getField(): string[][] {
    return this.field.getState();
  }

  public hasGameOver(): boolean {
    return this.gameOver;
  }
}
