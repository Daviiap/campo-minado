import { ChangeBombFlagStateUseCase } from "./ChangeBombFlagStateUseCase";

import { Game } from "../../entities/Game/Game";

export class ChangeBombFlagStateController {
  private changeBombFlagStateUseCase: ChangeBombFlagStateUseCase;

  public constructor(unhideCellUseCase: ChangeBombFlagStateUseCase) {
    this.changeBombFlagStateUseCase = unhideCellUseCase;
  }

  public handle(xAxis: number, yAxis: number, game: Game): string[][] {
    return this.changeBombFlagStateUseCase.exec({ xAxis, yAxis, game });
  }
}
