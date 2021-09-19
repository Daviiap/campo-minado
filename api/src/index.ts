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

  let game = initiateGameController.handle(socket.id);
  const numberOfBombs = game.getNumberOfBombs();
  const numberOfFlags = game.getNumberOfFlags();

  socket.emit("initiateGameState", {
    field: game.getFieldState(),
    numberOfBombs,
    numberOfFlags,
  });

  socket.on("unhideCell", (coordinates: CoordinatesInterface) => {
    const state = unhideCellController.handle(
      coordinates.xAxis,
      coordinates.yAxis,
      game
    );
    const numberOfBombs = game.getNumberOfBombs();
    const numberOfFlags = game.getNumberOfFlags();
    socket.emit("updateGameState", {
      field: state,
      numberOfBombs,
      numberOfFlags,
    });

    if (game.getGameState() === "exploded") {
      socket.emit("exploded");
    } else if (game.getGameState() === "safe") {
      socket.emit("safe");
    }
  });

  socket.on("resetGame", () => {
    game = initiateGameController.handle(socket.id);
    const numberOfBombs = game.getNumberOfBombs();
    const numberOfFlags = game.getNumberOfFlags();
    socket.emit("resetGameState", {
      field: game.getFieldState(),
      numberOfBombs,
      numberOfFlags,
    });
  });

  socket.on("changeBombFlagState", (coordinates: CoordinatesInterface) => {
    const state = changeBombFlagStateController.handle(
      coordinates.xAxis,
      coordinates.yAxis,
      game
    );
    const numberOfBombs = game.getNumberOfBombs();
    const numberOfFlags = game.getNumberOfFlags();

    socket.emit("updateGameState", {
      field: state,
      numberOfBombs,
      numberOfFlags,
    });

    if (game.getGameState() === "safe") {
      socket.emit("safe");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Player ${socket.id} disconnected!`);
  });
});

httpServer.listen(3000);
