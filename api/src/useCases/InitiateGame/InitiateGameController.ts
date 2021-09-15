import { InitiateGameUseCase } from "./InitiateGameUseCase";

import { Game } from "../../entities/Game/Game";
import { Socket } from "socket.io";

export class InitiateGameController {
  private initiateGameUseCase: InitiateGameUseCase;

  public constructor(initiateGameUseCase: InitiateGameUseCase) {
    this.initiateGameUseCase = initiateGameUseCase;
  }

  public handle(socket: Socket): Game {
    return this.initiateGameUseCase.exec({ playerId: socket.id });
  }
}
