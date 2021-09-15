import { UnhideCellUseCase } from "./UnHideCellUseCase";

import { Game } from "../../entities/Game/Game";
import { Socket } from "socket.io";

export class UnhideCellController {
  private unhideCellUseCase: UnhideCellUseCase;

  public constructor(unhideCellUseCase: UnhideCellUseCase) {
    this.unhideCellUseCase = unhideCellUseCase;
  }

  public handle(xAxis: number, yAxis: number, game: Game): string[][] {
    return this.unhideCellUseCase.exec({ xAxis, yAxis, game });
  }
}
