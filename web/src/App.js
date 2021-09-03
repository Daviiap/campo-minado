import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Container, Cell, Line, Field } from './styles';


function App() {
  const [socket, setSocket] = useState(null);
  const [field, setField] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(io("http://localhost:3000/"));
    } else {
      socket.on('connect', () => {
        console.log(`Your id: ${socket.id}`);
        socket.on("gameInitiated", (gameState) => {
          if (!field) {
            setField(gameState);
          }
        });
        socket.on("updateField", (gameState) => {
          setField(gameState);
        });
      });

      console.table(field);
    }
  }, [socket, field]);

  window.oncontextmenu = (event) => {
    event.preventDefault();
  }

  return (
    <div className="App">
      <Container>
        <Field>
          {field && socket ? field.map((line, i) => {
            return (
              <Line key={i}>
                {line.map((cell, j) => {
                  return (<Cell key={j} onContextMenu={event => {
                    socket.emit("putRemoveFlag", { x: j, y: i })
                    console.log(i, j);
                  }} onClick={event => {
                    socket.emit("unHideCell", { x: j, y: i })
                    console.log(i, j);
                  }} >{cell}</Cell>)
                })}
              </Line>
            )
          }) : null}
        </Field>
      </Container>
    </div>
  );
}

export default App;
