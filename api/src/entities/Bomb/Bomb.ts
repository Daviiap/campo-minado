import { BombInterface } from "./BombInterface";

export class Bomb implements BombInterface {
  public getType(): string {
    return "bomb";
  }
}
