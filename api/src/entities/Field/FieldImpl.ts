import { FieldInterface } from "./FieldInterface";
import { Bomb } from "../Bomb/Bomb";
import { BombProximityIndicator } from "../BombProximity/BombProximityIndicator";
import { CellInterface } from "../Cell/CellInterface";
import { RandomIntUtil } from "../Utils/RandomIntGen";

export class Field implements FieldInterface {
  private width: number;
  private height: number;
  private cells: CellInterface[];

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
        const newBomb: Bomb = new Bomb(xAxis, yAxis);
        this.cells.push(newBomb);
        this.putBombs(--numberOfBombs);
        this.putBombProximityIndicators(newBomb);
      } else {
        this.putBombs(numberOfBombs);
      }
    }
  }

  private putBombProximityIndicators(bomb: Bomb): void {
    for (let x = bomb.getXAxis() - 1; x <= bomb.getXAxis() + 1; x++) {
      for (let y = bomb.getYAxis() - 1; y <= bomb.getYAxis() + 1; y++) {
        if (
          !this.hasBomb(x, y) &&
          x >= 0 &&
          x < this.width &&
          y >= 0 &&
          y < this.height
        ) {
          const bombProximityIndicator =
            this.getBombProximityIndicator(x, y) ||
            new BombProximityIndicator(x, y);

          bombProximityIndicator.incrementBombCounter();
          if (!this.hasBombProximityIndicator(x, y)) {
            this.cells.push(bombProximityIndicator);
          }
        }
      }
    }
  }

  private hasBomb(xAxis: number, yAxis: number): boolean {
    let hasBomb = false;
    for (const cell of this.cells) {
      if (
        cell instanceof Bomb &&
        cell.getXAxis() === xAxis &&
        cell.getYAxis() === yAxis
      ) {
        hasBomb = true;
        break;
      }
    }

    return hasBomb;
  }

  private hasBombProximityIndicator(xAxis: number, yAxis: number): boolean {
    let hasBomb = false;
    for (const cell of this.cells) {
      if (
        cell instanceof BombProximityIndicator &&
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
        cell instanceof BombProximityIndicator &&
        cell.getXAxis() === xAxis &&
        cell.getYAxis() === yAxis
      ) {
        bombProximityIndicator = cell as BombProximityIndicator;
        break;
      }
    }

    return bombProximityIndicator;
  }

  public getBombs(): Bomb[] {
    const result = [] as Bomb[];

    for (const cell of this.cells) {
      if (cell instanceof Bomb) {
        result.push(cell);
      }
    }

    return result;
  }

  public getBombProximityIndicators(): BombProximityIndicator[] {
    const result = [] as BombProximityIndicator[];

    for (const cell of this.cells) {
      if (cell instanceof BombProximityIndicator) {
        result.push(cell);
      }
    }

    return result;
  }
}
