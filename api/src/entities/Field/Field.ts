import { FieldInterface } from "./FieldInterface";
import { Bomb } from "../Bomb/Bomb";
import { BombProximityIndicator } from "../BombProximityIndicator/BombProximityIndicator";
import { RandomIntUtil } from "../Utils/RandomIntGen";
import { Cell } from "../Cell/Cell";

export class Field implements FieldInterface {
  private width: number;
  private height: number;
  private cells: Cell[];

  public constructor(width: number, height: number, numberOfBombs: number) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.putBombs(numberOfBombs);
  }

  private putBombs(numberOfBombs: number): void {
    if (numberOfBombs !== 0) {
      const xAxis = RandomIntUtil.getRandomInt(0, this.width);
      const yAxis = RandomIntUtil.getRandomInt(0, this.height);

      if (!this.hasBomb(xAxis, yAxis)) {
        const newCell: Cell = new Cell(xAxis, yAxis, new Bomb());
        this.cells.push(newCell);
        this.putBombs(--numberOfBombs);
        this.putBombProximityIndicators(xAxis, yAxis);
      } else {
        this.putBombs(numberOfBombs);
      }
    }
  }

  private hasBomb(xAxis: number, yAxis: number): boolean {
    let hasBomb = false;
    for (const cell of this.cells) {
      if (
        cell.getContentType() === "bomb" &&
        cell.getXAxis() === xAxis &&
        cell.getYAxis() === yAxis
      ) {
        hasBomb = true;
        break;
      }
    }

    return hasBomb;
  }

  private putBombProximityIndicators(xAxis: number, yAxis: number): void {
    for (let x = xAxis - 1; x <= xAxis + 1; x++) {
      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        if (
          !this.hasBomb(x, y) &&
          x >= 0 &&
          x < this.width &&
          y >= 0 &&
          y < this.height
        ) {
          const bombProximityIndicator =
            this.getBombProximityIndicator(x, y) ||
            new BombProximityIndicator();

          bombProximityIndicator.incrementBombCounter();
          if (!this.hasBombProximityIndicator(x, y)) {
            const newCell = new Cell(x, y, bombProximityIndicator);
            this.cells.push(newCell);
          }
        }
      }
    }
  }

  private hasBombProximityIndicator(xAxis: number, yAxis: number): boolean {
    let hasBomb = false;
    for (const cell of this.cells) {
      if (
        cell.getContentType() === "bombIndicator" &&
        cell.getXAxis() === xAxis &&
        cell.getYAxis() === yAxis
      ) {
        hasBomb = true;
        break;
      }
    }

    return hasBomb;
  }

  private getBombProximityIndicator(
    xAxis: number,
    yAxis: number
  ): BombProximityIndicator | null {
    let bombProximityIndicator: BombProximityIndicator | null = null;
    for (const cell of this.cells) {
      if (
        cell.getContentType() === "bombProximityIndicator" &&
        cell.getXAxis() === xAxis &&
        cell.getYAxis() === yAxis
      ) {
        bombProximityIndicator = cell.getContent() as BombProximityIndicator;
        break;
      }
    }

    return bombProximityIndicator;
  }

  private getCell(xAxis: number, yAxis: number): Cell | null {
    let returnedCell: Cell | null = null;

    for (const cell of this.cells) {
      if (cell.getXAxis() === xAxis && cell.getYAxis() === yAxis) {
        returnedCell = cell;

      }
    }

    return returnedCell;
  }

  public getCells(): Cell[] {
    return this.cells as Cell[];
  }

  public getBombs(): Bomb[] {
    const result = [] as Bomb[];

    for (const cell of this.cells) {
      if (cell.getContentType() === "bomb") {
        result.push(cell.getContent() as Bomb);
      }
    }

    return result;
  }

  public getBombProximityIndicators(): BombProximityIndicator[] {
    const result = [] as BombProximityIndicator[];

    for (const cell of this.cells) {
      if (cell.getContentType() === "bombProximityIndicator") {
        result.push(cell.getContent() as BombProximityIndicator);
      }
    }

    return result;
  }

  public putRemoveBombFlag(xAxis: number, yAxis: number): void {
    const cell = this.getCell(xAxis, yAxis);
    if (cell) {
      if (cell.getContentType() != 'void') {
        cell.changeBombFlag();
      } else {
        this.cells = this.cells.filter(cell => cell.getXAxis() != xAxis && cell.getYAxis() != yAxis);
      }
    } else {
      const newCell = new Cell(xAxis, yAxis, null);
      newCell.changeBombFlag();
      this.cells.push(newCell);
    }
  }

  public toString(): string {
    const fieldRep = [] as string[][];
    for (let i = 0; i < this.height; i++) {
      fieldRep.push([] as string[]);
      for (let j = 0; j < this.width; j++) {
        fieldRep[i].push(".");
      }
    }

    for (const cell of this.cells) {
      if (cell.hasBombFlag()) {
        fieldRep[cell.getYAxis()][cell.getXAxis()] = "F";
      } else if (cell.getContentType() === "bomb") {
        fieldRep[cell.getYAxis()][cell.getXAxis()] = "B";
      } else if (cell.getContentType() === "bombProximityIndicator") {
        fieldRep[cell.getYAxis()][
          cell.getXAxis()
        ] = `${(cell.getContent() as BombProximityIndicator).getBombCounter()}`;
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
