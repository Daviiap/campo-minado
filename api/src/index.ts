import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { CoordinatesInterface } from "./entities/Coordinates/CoordinatesInterface";

import {
  InitiateGameController,
  InitiateGameUseCase,
} from "./useCases/InitiateGame";

import {
  ChangeBombFlagStateController,
  ChangeBombFlagStateUseCase,
} from "./useCases/ChangeBombFlagState";

import { UnhideCellController, UnhideCellUseCase } from "./useCases/UnHideCell";

const changeBombFlagStateUseCase = new ChangeBombFlagStateUseCase();
const changeBombFlagStateController = new ChangeBombFlagStateController(
  changeBombFlagStateUseCase
);

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

  const game = initiateGameController.handle(socket.id);

  socket.emit("initiateGameState", game.getFieldState());

  socket.on("unhideCell", (coordinates: CoordinatesInterface) => {
    const state = unhideCellController.handle(
      coordinates.xAxis,
      coordinates.yAxis,
      game
    );

    socket.emit("updateGameState", state);

    if (game.getGameState() === "exploded") {
      socket.emit("exploded");
    } else if (game.getGameState() === "safe") {
      socket.emit("safe");
    }
  });

  socket.on("changeBombFlagState", (coordinates: CoordinatesInterface) => {
    const state = changeBombFlagStateController.handle(
      coordinates.xAxis,
      coordinates.yAxis,
      game
    );
    socket.emit("updateGameState", state);
  });

  socket.on("disconnect", () => {
    console.log(`Player ${socket.id} disconnected!`);
  });
});

httpServer.listen(3000);
