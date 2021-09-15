import { Socket } from "socket.io-client";

export interface FieldProps {
  data: string[][];
  socketConnection: Socket;
}
export interface CellProps {
  backgroundColor: string;
}
