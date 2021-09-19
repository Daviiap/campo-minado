import { Socket } from "socket.io-client";

export interface SideBoardPropsInterface {
  startClock: boolean;
  socketConnection: Socket | null;
  numberOfBombs: number;
  numberOfFlags: number;
}
