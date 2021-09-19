import { Field } from "../Field/Field";
import { GameNotInitializedError } from "./Errors";
import { GameInterface } from "./GameInterface";

import { v4 } from "uuid";
import { Player } from "../Player/Player";

export class Game implements GameInterface {
  private id: string;
  private player: Player;
  private field: Field | null;
  private initTime: number | null;
  private state: "created" | "initiated" | "exploded" | "safe";
  private gameOver: boolean;

  public constructor(player: Player) {
    this.id = v4();
    this.player = player;
    this.field = null;
    this.initTime = null;
    this.state = "created";
    this.gameOver = false;
  }

  public initiate(initialFieldState: Field): void {
    this.field = initialFieldState;
    this.initTime = new Date().getTime();
    this.state = "initiated";
  }

  public getId(): string {
    return this.id;
  }

  public changeBombFlagState(xAxis: number, yAxis: number): void {
    if (this.field) {
      if (!this.gameOver) {
        this.field.changeFlagState(xAxis, yAxis);

        if (
          this.field.getState() === "exploded" ||
          this.field.getState() === "safe"
        ) {
          this.gameOver = true;
          this.state = this.field.getState() as "exploded" | "safe";
        }
      }
    } else {
      throw new GameNotInitializedError();
    }
  }

  public isGameOver(): boolean {
    return this.gameOver;
  }

  public getTime(): number {
    let time: number = 0;
    if (this.initTime) {
      time = new Date().getTime() - this.initTime;
    }
    return time;
  }

  public getNumberOfBombs(): number {
    if (this.field) {
      return this.field.getNumberOfBombs();
    } else {
      throw new GameNotInitializedError();
    }
  }

  public getGameState(): string {
    return this.state;
  }

  public getFieldState(): string[][] {
    let fieldState: string[][] = [];
    if (this.field) {
      fieldState = this.field.getField();
    }
    return fieldState;
  }

  public getNumberOfFlags(): number {
    if (this.field) {
      return this.field.getNumberOfFlags();
    } else {
      throw new GameNotInitializedError();
    }
  }

  public getPlayerId(): string {
    return this.player.getId();
  }

  public clickCell(xAxis: number, yAxis: number): string {
    if (this.field) {
      if (!this.gameOver) {
        this.field.unhideCell(xAxis, yAxis);

        if (
          this.field.getState() === "exploded" ||
          this.field.getState() === "safe"
        ) {
          this.gameOver = true;
          this.state = this.field.getState() as "exploded" | "safe";
        }
        return this.state;
      }
    } else {
      throw new GameNotInitializedError();
    }
  }
}
