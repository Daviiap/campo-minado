import { BombProximityIndicatorInterface } from "./BombProximityIndicatorInterface";

export class BombProximityIndicator implements BombProximityIndicatorInterface {
  private xAxis: number;
  private yAxis: number;
  private bombCounter: number;

  public constructor(xAxis: number, yAxis: number) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.bombCounter = 0;
  }

  public incrementBombCounter(): void {
    this.bombCounter++;
  }

  public getBombCounter(): number {
    return this.bombCounter;
  }

  public getXAxis(): number {
    return this.xAxis;
  }

  public getYAxis(): number {
    return this.yAxis;
  }
}
