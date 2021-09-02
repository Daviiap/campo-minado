import { useEffect, useState } from "react";
import { io } from "socket.io-client";


function App() {
  const [socket, setSocket] = useState(null);
  const [table, setTable] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(io("http://localhost:3000/"));
    } else {
      socket.on('connect', () => {
        console.log(`Your id: ${socket.id}`);
        socket.on("gameInitiated", (gameState) => {
          if (!table) {
            setTable(gameState);
          }
        });
      });

      console.table(table);
    }
  }, [socket, table]);
  return (
    <div className="App">

    </div>
  );
}

export default App;
