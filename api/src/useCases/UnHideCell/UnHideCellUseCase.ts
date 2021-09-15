import { UnhideCellDTO } from "./UnHideCellDTO";

export class UnhideCellUseCase {
  exec(data: UnhideCellDTO): string[][] {
    const { game, yAxis, xAxis } = data;
    game.clickCell(xAxis, yAxis);
    return game.getFieldState();
  }
}
