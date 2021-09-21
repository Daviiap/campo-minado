import { Socket } from "socket.io-client";

export interface FieldProps {
  data: string[][];
  socketConnection: Socket | null;
}

export interface FieldContainerProps {
  numberOfColumns: number;
  numberOfRows: number;
}
export interface CellProps {
  backgroundColor: string;
}
