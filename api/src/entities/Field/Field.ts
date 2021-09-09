import { FieldInterface } from "./FieldInterface";
import { Bomb } from "../Bomb/Bomb";
import { BombProximityIndicator } from "../BombProximityIndicator/BombProximityIndicator";
import { RandomIntUtil } from "../Utils/RandomIntGen";
import { Cell } from "../Cell/Cell";

export class Field implements FieldInterface {
  private width: number;
  private height: number;
  private cells: Cell[][];

  public constructor(width: number, height: number, numberOfBombs: number) {
    this.width = width;
    this.height = height;
    this.cells = this.makeField();
    this.putBombs(numberOfBombs);
  }

  private makeField(): Cell[][] {
    const field = [] as Cell[][];
    for (let i = 0; i < this.height; i++) {
      field.push([] as Cell[]);
      for (let j = 0; j < this.width; j++) {
        field[i].push(new Cell());
      }
    }

    return field;
  }

  private putBombs(numberOfBombs: number): void {
    if (numberOfBombs !== 0) {
      const xAxis = RandomIntUtil.getRandomInt(0, this.width);
      const yAxis = RandomIntUtil.getRandomInt(0, this.height);

      if (
        this.areCoordinatesValid(xAxis, yAxis) &&
        !this.hasBomb(xAxis, yAxis)
      ) {
        const newBomb = new Bomb();
        this.cells[yAxis][xAxis].insertContent(newBomb);
        this.putBombs(--numberOfBombs);
        this.putBombProximityIndicators(xAxis, yAxis);
      } else {
        this.putBombs(numberOfBombs);
      }
    }
  }

  private hasBomb(xAxis: number, yAxis: number): boolean {
    return (
      this.areCoordinatesValid(xAxis, yAxis) &&
      this.cells[yAxis][xAxis].getContentType() === "bomb"
    );
  }

  private putBombProximityIndicators(xAxis: number, yAxis: number): void {
    for (let x = xAxis - 1; x <= xAxis + 1; x++) {
      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        if (this.areCoordinatesValid(x, y) && !this.hasBomb(x, y)) {
          const bombProximityIndicator =
            this.getBombProximityIndicator(x, y) ||
            new BombProximityIndicator();

          bombProximityIndicator.incrementBombCounter();
          if (!this.hasBombProximityIndicator(x, y)) {
            this.cells[y][x].insertContent(bombProximityIndicator);
          }
        }
      }
    }
  }

  private hasBombProximityIndicator(xAxis: number, yAxis: number): boolean {
    return (
      this.areCoordinatesValid(xAxis, yAxis) &&
      this.cells[yAxis][xAxis].getContentType() === "bombProximityIndicator"
    );
  }

  private getBombProximityIndicator(
    xAxis: number,
    yAxis: number
  ): BombProximityIndicator | null {
    let response = null;
    if (this.areCoordinatesValid(xAxis, yAxis)) {
      const cell = this.cells[yAxis][xAxis];
      if (cell.getContentType() === "bombProximityIndicator") {
        response = cell.getContent() as BombProximityIndicator;
      }
    } else {
      throw new Error();
    }
    return response;
  }

  private getCell(xAxis: number, yAxis: number): Cell {
    if (this.areCoordinatesValid(xAxis, yAxis)) {
      return this.cells[yAxis][xAxis];
    } else {
      throw new Error();
    }
  }

  private areCoordinatesValid(xAxis: number, yAxis: number): boolean {
    return (
      xAxis >= 0 && xAxis < this.width && yAxis >= 0 && yAxis < this.height
    );
  }

  private recursiveUnHideCell(xAxis: number, yAxis: number): void {
    const cell = this.getCell(xAxis, yAxis);
    cell.unHide();

    if (cell.hasBombFlag()) {
      cell.changeBombFlag();
    }

    if (cell.getContentType() === "void") {
      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        for (let x = xAxis - 1; x <= xAxis + 1; x++) {
          if (this.areCoordinatesValid(x, y) && (x !== xAxis || y !== yAxis)) {
            const neighborCell = this.cells[y][x];
            if (neighborCell.isHidden()) {
              this.recursiveUnHideCell(x, y);
            }
          }
        }
      }
    }
  }

  public putAndRemoveBombFlag(xAxis: number, yAxis: number): void {
    if (this.areCoordinatesValid(xAxis, yAxis)) {
      const cell = this.getCell(xAxis, yAxis);
      cell.changeBombFlag();
    } else {
      throw new Error();
    }
  }

  public unHideCell(xAxis: number, yAxis: number): string {
    if (this.areCoordinatesValid(xAxis, yAxis)) {
      const cell = this.getCell(xAxis, yAxis);

      if (cell.isHidden() && !cell.hasBombFlag()) {
        this.recursiveUnHideCell(xAxis, yAxis);
      }

      return cell.hasBombFlag() ? "flag" : cell.getContentType();
    } else {
      throw new Error();
    }
  }

  public getWidth(): number {
    return this.width;
  }

  public getState(): string[][] {
    const fieldState = [] as string[][];

    for (let i = 0; i < this.cells.length; i++) {
      fieldState.push([]);
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        if (cell.hasBombFlag()) {
          fieldState[i][j] = "F";
        } else if (cell.isHidden()) {
          fieldState[i][j] = "*";
        } else {
          if (cell.getContentType() === "bomb") {
            fieldState[i][j] = "B";
          } else if (cell.getContentType() === "bombProximityIndicator") {
            fieldState[i][j] = `${(
              cell.getContent() as BombProximityIndicator
            ).getBombCounter()}`;
          } else if (cell.getContentType() === "void") {
            fieldState[i][j] = " ";
          }
        }
      }
    }

    return fieldState;
  }

  public getHeight(): number {
    return this.height;
  }

  public unHideAll(): void {
    for (let line of this.cells) {
      for (let cell of line) {
        if (cell.isHidden()) {
          cell.unHide();
        }
      }
    }
  }

  public toString(): string {
    const fieldRep = this.getState();

    let res = "";
    for (const list of fieldRep) {
      let line = "";
      for (const el of list) {
        line += el + "    ";
      }
      line += "\n\n";
      res += line;
    }

    return res;
  }
}
