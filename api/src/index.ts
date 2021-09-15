import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { CoordinatesInterface } from "./entities/Coordinates/CoordinatesInterface";

import {
  InitiateGameController,
  InitiateGameUseCase,
} from "./useCases/InitiateGame";

import { UnhideCellController, UnhideCellUseCase } from "./useCases/UnHideCell";

const unhideCellUseCase = new UnhideCellUseCase();
const unhideCellController = new UnhideCellController(unhideCellUseCase);

const initiateGameUseCase = new InitiateGameUseCase();
const initiateGameController = new InitiateGameController(initiateGameUseCase);

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`Player ${socket.id} connected!`);

  const game = initiateGameController.handle(socket);

  socket.on("unhideCell", (coordinates: CoordinatesInterface) => {
    const state = unhideCellController.handle(
      coordinates.xAxis,
      coordinates.yAxis,
      game
    );

    socket.emit("updateGameState", state);
  });

  socket.on("changeBombFlagState", (coordinates: CoordinatesInterface) => {});

  socket.on("disconnect", () => {
    console.log(`Player ${socket.id} disconnected!`);
  });
});

httpServer.listen(3000);
