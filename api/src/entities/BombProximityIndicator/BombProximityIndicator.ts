import { BombProximityIndicatorInterface } from "./BombProximityIndicatorInterface";

export class BombProximityIndicator implements BombProximityIndicatorInterface {
  private bombCounter: number;

  public constructor() {
    this.bombCounter = 0;
  }

  public incrementBombCounter(): void {
    this.bombCounter++;
  }

  public getBombCounter(): number {
    return this.bombCounter;
  }

  public getType(): string {
    return "bombProximityIndicator";
  }
}
