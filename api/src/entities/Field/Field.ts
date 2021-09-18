import { FieldInterface } from "./FieldInterface";
import { Bomb } from "../Bomb/Bomb";
import { BombProximityIndicator } from "../BombProximityIndicator/BombProximityIndicator";
import { RandomIntUtil } from "../Utils/RandomIntGen";
import { Cell } from "../Cell/Cell";
import {
  FieldOutOfBoundsError,
  IllegalFieldHeightError,
  IllegalFieldWidthError,
  IllegalNumberOfBombsError,
} from "./Errors";

export class Field implements FieldInterface {
  private width: number;
  private height: number;
  private cells: Cell[][];
  private numberOfBombs: number;
  private numberOfFlags: number;
  private numberOfFlaggedBombs: number;
  private numberOfHiddenCells: number;
  private filled: boolean;
  private state: "safe" | "risk" | "exploded";

  readonly MIN_WIDTH = 5;
  readonly MIN_HEIGHT = 5;
  readonly MAX_WIDTH = 40;
  readonly MAX_HEIGHT = 40;
  readonly MIN_BOMBS_PERCENTAGE = 5;
  readonly MAX_BOMBS_PERCENTAGE = 98;

  public constructor(width: number, height: number, bombsPercentage: number) {
    this.validateConstructorParameters(width, height, bombsPercentage);

    this.numberOfHiddenCells = width * height;
    this.numberOfBombs = Math.ceil(
      (this.numberOfHiddenCells * bombsPercentage) / 100
    );
    this.width = width;
    this.height = height;
    this.numberOfFlags = 0;
    this.numberOfFlaggedBombs = 0;
    this.cells = this.makeField();
    this.filled = false;
    this.state = "risk";
  }

  private validateConstructorParameters(
    width: number,
    height: number,
    bombsPercentage: number
  ) {
    if (width < this.MIN_WIDTH || width > this.MAX_WIDTH) {
      throw new IllegalFieldWidthError(
        `A largura do campo deve estar entre ${this.MIN_WIDTH - 1} e ${
          this.MAX_WIDTH + 1
        }.`
      );
    } else if (height < this.MIN_HEIGHT || height > this.MAX_HEIGHT) {
      throw new IllegalFieldHeightError(
        `A altura do campo deve estar entre ${this.MIN_HEIGHT - 1} e ${
          this.MAX_HEIGHT + 1
        }.`
      );
    } else if (
      bombsPercentage < this.MIN_BOMBS_PERCENTAGE ||
      bombsPercentage > this.MAX_BOMBS_PERCENTAGE
    ) {
      throw new IllegalNumberOfBombsError(
        `O quantidade de bombas no campo deve estar entre ${this.MIN_BOMBS_PERCENTAGE}% e ${this.MAX_BOMBS_PERCENTAGE}%.`
      );
    }
  }

  private makeField(): Cell[][] {
    const fieldWidth = this.width;
    const fieldHeight = this.height;

    const field = [] as Cell[][];
    for (let i = 0; i < fieldHeight; i++) {
      field.push([] as Cell[]);
      for (let j = 0; j < fieldWidth; j++) {
        field[i].push(new Cell());
      }
    }

    return field;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getState(): string {
    return this.state;
  }

  public getNumberOfBombs(): number {
    return this.numberOfBombs;
  }

  public getNumberOfFlags(): number {
    return this.numberOfFlags;
  }

  public unhideCell(xAxis: number, yAxis: number): void {
    if (this.state !== "exploded") {
      if (this.areCoordinatesValid(xAxis, yAxis)) {
        const cell = this.getCell(xAxis, yAxis);

        if (cell.isHidden() && cell.getBombFlagState() !== 1) {
          if (!this.filled) {
            this.putBombs(this.numberOfBombs, xAxis, yAxis);
            this.filled = true;
          }

          if (cell.getContentType() === "bomb") {
            this.state = "exploded";
          }

          this.recursiveUnhideCell(xAxis, yAxis);
        } else if (cell.getContentType() === "bombProximityIndicator") {
          this.unHideCellNeighbors(xAxis, yAxis);
        }

        if (this.numberOfBombs === this.numberOfHiddenCells) {
          this.state = "safe";
        }

        if (this.state === "exploded") {
          this.unHideBombs();
        }
      } else {
        throw new FieldOutOfBoundsError();
      }
    }
  }

  private recursiveUnhideCell(xAxis: number, yAxis: number): void {
    const cell = this.getCell(xAxis, yAxis);

    
    cell.unHide();
    this.numberOfHiddenCells--;
    
    if (cell.getBombFlagState() !== 0) {
      cell.changeBombFlagState(0);
    }
    
    if (cell.getContentType() === "void") {
      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        for (let x = xAxis - 1; x <= xAxis + 1; x++) {
          if (this.areCoordinatesValid(x, y) && (x !== xAxis || y !== yAxis)) {
            const neighborCell = this.cells[y][x];
            if (neighborCell.isHidden()) {
              this.recursiveUnhideCell(x, y);
            }
          }
        }
      }
    }
  }

  private unHideCellNeighbors(xAxis: number, yAxis: number): string {
    let action = "nothing";
    const cell = this.getCell(xAxis, yAxis);

    if (
      !cell.isHidden() &&
      cell.getContentType() === "bombProximityIndicator"
    ) {
      const cellNumber = (
        cell.getContent() as BombProximityIndicator
      ).getBombCounter();

      let bombsAround = 0;

      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        for (let x = xAxis - 1; x <= xAxis + 1; x++) {
          if (this.areCoordinatesValid(x, y) && (x !== xAxis || y !== yAxis)) {
            const neighborCell = this.cells[y][x];
            if (neighborCell.hasBombFlag()) {
              bombsAround++;
            }
          }
        }
      }

      if (bombsAround === cellNumber) {
        for (let y = yAxis - 1; y <= yAxis + 1; y++) {
          for (let x = xAxis - 1; x <= xAxis + 1; x++) {
            if (
              this.areCoordinatesValid(x, y) &&
              (x !== xAxis || y !== yAxis)
            ) {
              const neighborCell = this.cells[y][x];
              if (
                neighborCell.getContentType() === "bomb" &&
                !neighborCell.hasBombFlag()
              ) {
                this.state = "exploded";
              }

              if (
                neighborCell.isHidden() &&
                neighborCell.getContentType() === "void"
              ) {
                this.recursiveUnhideCell(x, y);
              } else if (
                neighborCell.isHidden() &&
                !neighborCell.hasBombFlag()
              ) {
                neighborCell.unHide();
              }
            }
          }
        }
      }
    }

    return action;
  }

  public changeFlagState(xAxis: number, yAxis: number): void {
    if (this.state !== "exploded") {
      if (this.areCoordinatesValid(xAxis, yAxis)) {
        const cell = this.getCell(xAxis, yAxis);
        if (cell.isHidden()) {
          cell.changeBombFlagState();
          const forwardState = cell.getBombFlagState();

          if (forwardState === 1) {
            this.numberOfFlags++;
            if (cell.getContentType() === "bomb") {
              this.numberOfFlaggedBombs++;
              if (this.numberOfFlaggedBombs === this.numberOfBombs) {
                this.state = "safe";
              }
            }
          } else {
            if (forwardState === 2) {
              this.numberOfFlags--;
            }
            if (cell.getContentType() === "bomb") {
              this.numberOfFlaggedBombs--;
              if (this.isSafe()) {
                this.state = "risk";
              }
            }
          }
        }
      }
    }
  }

  public isSafe(): boolean {
    return this.state === "safe";
  }

  private canPutBomb(
    xAxis: number,
    yAxis: number,
    initialClickX: number,
    initialClickY: number
  ) {
    let isInitialClickNeighbor: boolean = false;
    for (let x = initialClickX - 1; x <= initialClickX + 1; x++) {
      if (isInitialClickNeighbor) {
        break;
      }

      for (let y = initialClickY - 1; y <= initialClickY + 1; y++) {
        if (xAxis === x && yAxis === y) {
          isInitialClickNeighbor = true;
          break;
        }
      }
    }

    return (
      !isInitialClickNeighbor &&
      this.areCoordinatesValid(xAxis, yAxis) &&
      !this.hasBomb(xAxis, yAxis)
    );
  }

  private putBombs(
    numberOfBombs: number,
    initialClickX: number,
    initialClickY: number
  ): void {
    if (numberOfBombs !== 0) {
      const xAxis = RandomIntUtil.getRandomInt(0, this.width);
      const yAxis = RandomIntUtil.getRandomInt(0, this.height);

      if (this.canPutBomb(xAxis, yAxis, initialClickX, initialClickY)) {
        const newBomb = new Bomb();
        this.cells[yAxis][xAxis].insertContent(newBomb);
        this.putBombs(--numberOfBombs, initialClickX, initialClickY);
        this.putBombProximityIndicators(xAxis, yAxis);
      } else {
        this.putBombs(numberOfBombs, initialClickX, initialClickY);
      }
    }
  }

  private putBombProximityIndicators(xAxis: number, yAxis: number): void {
    for (let x = xAxis - 1; x <= xAxis + 1; x++) {
      for (let y = yAxis - 1; y <= yAxis + 1; y++) {
        if (this.areCoordinatesValid(x, y) && !this.hasBomb(x, y)) {
          let bombProximityIndicator: BombProximityIndicator;

          if (this.hasBombProximityIndicator(x, y)) {
            bombProximityIndicator = this.getCell(
              x,
              y
            ).getContent() as BombProximityIndicator;
          } else {
            bombProximityIndicator = new BombProximityIndicator();
            this.cells[y][x].insertContent(bombProximityIndicator);
          }

          bombProximityIndicator.incrementBombCounter();
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

  private hasBomb(xAxis: number, yAxis: number): boolean {
    return (
      this.areCoordinatesValid(xAxis, yAxis) &&
      this.cells[yAxis][xAxis].getContentType() === "bomb"
    );
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

  public getField(): string[][] {
    const fieldState = [] as string[][];

    for (let i = 0; i < this.cells.length; i++) {
      fieldState.push([]);
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        if (cell.getBombFlagState() !== 0) {
          if (cell.getBombFlagState() === 1) {
            fieldState[i][j] = "F";
          } else {
            fieldState[i][j] = "PF";
          }
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

  private unHideBombs(): void {
    for (let line of this.cells) {
      for (let cell of line) {
        if (cell.isHidden() && cell.getContentType() === "bomb") {
          cell.changeBombFlagState(0);
          cell.unHide();
        }
      }
    }
  }

  public toString(): string {
    const fieldRep = this.getField();

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
