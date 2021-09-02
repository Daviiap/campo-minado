import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Game } from "./entities/Game/Game";
import { Field } from "./entities/Field/Field";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`Socket ${socket.id} connected!`);

  const field = new Field(16, 16, 40);
  const game = new Game(field);

  socket.emit("gameInitiated", game.getField());

  socket.on("disconnect", () => {
    console.log("saiu");
  });
});

httpServer.listen(3000);
