import React, { useEffect, useState } from "react";
import { Field } from "../../components/Field";

import { io } from "socket.io-client";

import { Container } from "./styles";

export const Game: React.FC = () => {
  const [socket] = useState(io("http://localhost:3000/"));
  const [field, setField] = useState([] as string[][]);

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
