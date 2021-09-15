import { ChangeBombFlagStateDTO } from "./ChangeBombFlagStateDTO";

export class ChangeBombFlagStateUseCase {
  exec(data: ChangeBombFlagStateDTO): string[][] {
    const { game, yAxis, xAxis } = data;
    game.changeBombFlagState(xAxis, yAxis);
    return game.getFieldState();
  }
}
