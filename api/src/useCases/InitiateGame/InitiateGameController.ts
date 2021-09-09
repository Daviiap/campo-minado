import { InitiateGameUseCase } from "./InitiateGameUseCase";

export class InitiateGameController {
  private initiateGameUseCase: InitiateGameUseCase;

  constructor(initiateGameUseCase: InitiateGameUseCase) {
    this.initiateGameUseCase = initiateGameUseCase;
  }

  handle(): void {}
}
