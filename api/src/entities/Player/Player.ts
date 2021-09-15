import { PlayerInterface } from "./PlayerInterface";

export class Player implements PlayerInterface {
  private id: string;

  public constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }
}
