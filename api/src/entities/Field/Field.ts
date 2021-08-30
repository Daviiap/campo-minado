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

      if (this.areCordinatesValid(xAxis, yAxis) && !this.hasBomb(xAxis, yAxis)) {
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
    return this.areCordinatesValid(xAxis, yAxis) && this.cells[yAxis][xAxis].getContentType() === 'bomb';
  }

  private putBombProximityIndicators(xAxis: number, yAxis: number): void {
    for (let x = xAxis - 1; x <= xAxis + 1; x++) {
      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        if (
          this.areCordinatesValid(x, y) &&
          !this.hasBomb(x, y)
        ) {
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
    return this.areCordinatesValid(xAxis, yAxis) && this.cells[yAxis][xAxis].getContentType() === 'bombProximityIndicator';
  }

  private getBombProximityIndicator(
    xAxis: number,
    yAxis: number
  ): BombProximityIndicator | null {
    let response = null;
    if (this.areCordinatesValid(xAxis, yAxis)) {
      const cell = this.cells[yAxis][xAxis];
      if (cell.getContentType() === 'bombProximityIndicator') {
        response = cell.getContent() as BombProximityIndicator;
      }
    } else {
      throw new Error();
    }
    return response;
  }

  private getCell(xAxis: number, yAxis: number): Cell {
    if (this.areCordinatesValid(xAxis, yAxis)) {
      return this.cells[yAxis][xAxis];
    } else {
      throw new Error();
    }
  }

  private areCordinatesValid(xAxis: number, yAxis: number): boolean {
    return xAxis >= 0 && xAxis < this.width && yAxis >= 0 && yAxis < this.height;
  }

  private recursiveUnhiddeCell(xAxis: number, yAxis: number): void {
    if (this.areCordinatesValid(xAxis, yAxis)) {
      const cell = this.getCell(xAxis, yAxis);
      cell.unHide();
      if (cell.getContentType() === 'void') {
        for (let y = yAxis - 1; y <= yAxis + 1; y++) {
          for (let x = xAxis - 1; x <= xAxis + 1; x++) {
            if (this.areCordinatesValid(x, y) && (x !== xAxis || y !== yAxis)) {
              const c = this.cells[y][x];
              if (c.isHidden()) {
                this.recursiveUnhiddeCell(x, y);
              }
            }
          }
        }
      }
    } else {
      throw new Error();
    }
  }

  public putRemoveBombFlag(xAxis: number, yAxis: number): void {
    if (this.areCordinatesValid(xAxis, yAxis)) {
      const cell = this.getCell(xAxis, yAxis);
      cell.changeBombFlag();
    } else {
      throw new Error();
    }
  }

  public unHiddeCell(xAxis: number, yAxis: number): string {
    const cell = this.getCell(xAxis, yAxis);

    if (!cell.hasBombFlag()) {
      this.recursiveUnhiddeCell(xAxis, yAxis);
    }

    return cell.hasBombFlag() ? 'flag' : cell.getContentType();
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public toString(): string {
    const fieldRep = [] as string[][];
    for (let i = 0; i < this.height; i++) {
      fieldRep.push([] as string[]);
      for (let j = 0; j < this.width; j++) {
        fieldRep[i].push(".");
      }
    }

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        if (cell.isHidden()) {
          fieldRep[i][j] = "*";
        } else {
          if (cell.hasBombFlag()) {
            fieldRep[i][j] = "F";
          } else if (cell.getContentType() === "bomb") {
            fieldRep[i][j] = "B";
          } else if (cell.getContentType() === "bombProximityIndicator") {
            fieldRep[i][j] = `${(cell.getContent() as BombProximityIndicator).getBombCounter()}`;
          }
        }
      }
    }

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
