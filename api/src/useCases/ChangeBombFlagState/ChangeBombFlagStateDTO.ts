import { Socket } from "socket.io";

export interface ChangeBombFlagStateDTO {
  xAxis: number;
  yAxis: number;
  socket: Socket;
}
