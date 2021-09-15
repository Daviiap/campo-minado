import { InitiateGameUseCase } from "./InitiateGameUseCase";

import { Game } from "../../entities/Game/Game";

export class InitiateGameController {
  private initiateGameUseCase: InitiateGameUseCase;

  public constructor(initiateGameUseCase: InitiateGameUseCase) {
    this.initiateGameUseCase = initiateGameUseCase;
  }

  public handle(socketId: string): Game {
    return this.initiateGameUseCase.exec({ playerId: socketId });
  }
}
