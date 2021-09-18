import React, { useEffect, useState } from "react";
import { Field } from "../../components/Field";

import { io, Socket } from "socket.io-client";

import { Container } from "./styles";
import SideBoard from "../../components/SideBoard";

export const Game: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [field, setField] = useState([] as string[][]);
  const [startClock, setStartClock] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:3000/"));
  }, []);

  useEffect(() => {}, [startClock]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log(`Your id: ${socket.id}`);
        socket.on("initiateGameState", (gameState) => {
          if (!field.length) {
            setField(gameState);
          }
        });
        socket.on("updateGameState", (gameState) => {
          setStartClock(true);
          setField(gameState);
        });
        socket.on("exploded", () => {
          setStartClock(false);
          console.log("exploded");
        });
        socket.on("safe", () => {
          setStartClock(false);
          console.log("safe");
        });
      });
    }
  }, [socket, field, startClock]);

  return (
    <Container>
      <div></div>
      <Field socketConnection={socket} data={field} />
      <SideBoard start={startClock} />
    </Container>
  );
};
