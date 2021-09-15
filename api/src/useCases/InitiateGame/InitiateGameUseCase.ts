import { Field } from "../../entities/Field/Field";
import { Game } from "../../entities/Game/Game";
import { Player } from "../../entities/Player/Player";
import { InitiateGameDTO } from "./InitiateGameDTO";

export class InitiateGameUseCase {
  exec(data: InitiateGameDTO): Game {
    const player = new Player(data.playerId);
    const field = new Field(16, 16, 15.5);
    const game = new Game(player);
    game.initiate(field);

    return game;
  }
}
