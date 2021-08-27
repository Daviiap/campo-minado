import { BombInterface } from "./BombInterface";

export class Bomb implements BombInterface {
  private xAxis: number;
  private yAxis: number;

  public constructor(xAxis: number, yAxis: number) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }

  public getXAxis(): number {
    return this.xAxis;
  }

  public getYAxis(): number {
    return this.yAxis;
  }
}
