import React, { useEffect, useState } from "react";
import { Field } from "../../components/Field";

import { io, Socket } from "socket.io-client";

import { Container } from "./styles";
import SideBoard from "../../components/SideBoard";

export const Game: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [field, setField] = useState([] as string[][]);
  const [startClock, setStartClock] = useState(false);
  const [numberOfBombs, setNumberOfBombs] = useState(0);
  const [numberOfFlags, setNumberOfFlags] = useState(0);

  useEffect(() => {
    setSocket(io("http://localhost:3000/"));
  }, []);

  useEffect(() => {}, [startClock]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on("initiateGameState", (gameState) => {
          if (!field.length) {
            setNumberOfBombs(gameState.numberOfBombs);
            setNumberOfFlags(gameState.numberOfFlags);
            setField(gameState.field);
          }
        });
        socket.on("updateGameState", (gameState) => {
          setNumberOfFlags(gameState.numberOfFlags);
          setStartClock(true);
          setField(gameState.field);
        });
        socket.on("resetGameState", (gameState) => {
          setNumberOfBombs(gameState.numberOfBombs);
          setNumberOfFlags(gameState.numberOfFlags);
          setStartClock(false);
          setField(gameState.field);
        });
        socket.on("exploded", () => {
          setStartClock(false);
        })
        socket.on("exploded", () => {
          setStartClock(false);
        })
      });
    }
  }, [socket, field, startClock]);

  return (
    <Container>
      <div></div>
      <Field socketConnection={socket} data={field} />
      <SideBoard
        numberOfBombs={numberOfBombs}
        numberOfFlags={numberOfFlags}
        socketConnection={socket}
        startClock={startClock}
      />
    </Container>
  );
};
