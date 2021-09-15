import { Game } from "../../entities/Game/Game";

export interface ChangeBombFlagStateDTO {
  xAxis: number;
  yAxis: number;
  game: Game;
}
