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
  console.clear();

  const field = new Field(16, 16, 40);
  const game = new Game(field);

  socket.emit("gameInitiated", game.getField());

  socket.on("unHideCell", (data) => {
    console.log(`Coordinates (${data.x}, ${data.y}) clicked! (UNHIDE)`);
    game.unHideBlock(data.x, data.y);
    console.log(field.toString());
    socket.emit("updateField", game.getField());
  });

  socket.on("putRemoveFlag", (data) => {
    console.log(`Coordinates (${data.x}, ${data.y}) clicked! (FLAG)`);
    game.putAndRemoveFlag(data.x, data.y);
    console.log(field.toString());
    socket.emit("updateField", game.getField());
  });

  socket.on("disconnect", () => {
    console.log("saiu");
  });
});

httpServer.listen(3000);
