import { Field } from "../Field/Field";

export interface GameInterface {
  initiate(initialFieldState: Field): void;
  changeBombFlagState(xAxis: number, yAxis: number): void;
  isGameOver(): boolean;
  getId(): string;
  getTime(): number;
  getNumberOfBombs(): number;
  getNumberOfUnflaggedBombs(): number;
  getPlayerId(): string;
  getGameState(): string;
  getFieldState(): string[][];
  clickCell(xAxis: number, yAxis: number): string;
}
