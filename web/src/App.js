import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Container, Cell, Line, Field } from './styles';

import explosao from './assets/explosao.png';
import flag from './assets/flag.png';

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

  const colors = {
    1: '#dfeda6',
    2: '#eaed91',
    3: '#edd787',
    4: '#ebcc86',
    5: '#f2bc7e',
    6: '#eba06e',
    7: '#f29b7e',
    8: '#f28d7c',
  }

  return (
    <div className="App">
      <Container>
        <Field>
          {field && socket ? field.map((line, i) => {
            return (
              <Line key={i}>
                {line.map((cell, j) => {
                  let cellContent;

                  if (cell === "B") {
                    cellContent = <img src={explosao} alt="B" width="40px" />
                  } else if (cell === "F") {
                    cellContent = <img src={flag} alt="B" width="30px" />
                  } else if (cell !== " " && cell !== "*") {
                    cellContent = <h3>{cell}</h3>
                  } else {
                    cellContent = ""
                  }

                  const cellBackground = cell === "*" || cell === "F" ? "#cdcdcd" : cell === " " ? "#efefef" : cell === "B" ? "#f55656" : colors[cell];

                  return (<Cell backgroundColor={cellBackground} key={j} onContextMenu={_ => {
                    socket.emit("putRemoveFlag", { x: j, y: i })
                    console.log(i, j);
                  }} onClick={_ => {
                    socket.emit("unHideCellNeighbors", { x: j, y: i });
                    socket.emit("unHideCell", { x: j, y: i })
                    console.log(i, j);
                  }} >{cellContent}</Cell>)
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
