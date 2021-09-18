import React, { useEffect, useState } from "react";
import { Field } from "../../components/Field";

import { io, Socket } from "socket.io-client";

import { Container } from "./styles";

export const Game: React.FC = () => {
  const [socket, setSocket] = useState({} as Socket);
  const [field, setField] = useState([] as string[][]);

  useEffect(() => {
    setSocket(io("http://localhost:3000/"));
  }, []);

  useEffect(() => {
    if (Object.keys(socket).length) {
      socket.on("connect", () => {
        console.log(`Your id: ${socket.id}`);
        socket.on("initiateGameState", (gameState) => {
          if (!field.length) {
            setField(gameState);
          }
        });
        socket.on("updateGameState", (gameState) => {
          setField(gameState);
        });
      });
    }
  }, [socket, field]);

  return (
    <Container>
      <Field socketConnection={socket} data={field} />
    </Container>
  );
};
