import React, { ReactElement, useEffect } from "react";
import { FieldProps } from "./PropsInterface";

import { Colors } from "./ColorsEnum";

import { Cell, FieldContainer, CellContentImg } from "./styles";

import number1 from "../../assets/1.svg";
import number2 from "../../assets/2.svg";
import number3 from "../../assets/3.svg";
import number4 from "../../assets/4.svg";
import number5 from "../../assets/5.svg";
import number6 from "../../assets/6.svg";
import number7 from "../../assets/7.svg";
import number8 from "../../assets/8.svg";
import flag from "../../assets/flag.svg";
import bomb from "../../assets/bomb.svg";
import flagP from "../../assets/flagP.svg";
import { Socket } from "socket.io-client";

const getNumber = (cell: string) => {
  if (`number${cell}` === "number1") {
    return number1;
  } else if (`number${cell}` === "number2") {
    return number2;
  } else if (`number${cell}` === "number3") {
    return number3;
  } else if (`number${cell}` === "number4") {
    return number4;
  } else if (`number${cell}` === "number5") {
    return number5;
  } else if (`number${cell}` === "number6") {
    return number6;
  } else if (`number${cell}` === "number7") {
    return number7;
  } else if (`number${cell}` === "number8") {
    return number8;
  }
};

const getCellContent = (cell: string): ReactElement => {
  let cellContent;
  if (cell === "B") {
    cellContent = <CellContentImg src={bomb} alt="B" />;
  } else if (cell === "F") {
    cellContent = <CellContentImg src={flag} alt="F" />;
  } else if (cell === "PF") {
    cellContent = <CellContentImg src={flagP} alt="B" />;
  } else if (cell !== " " && cell !== "*") {
    cellContent = <CellContentImg src={getNumber(cell)} alt={cell} />;
  } else {
    cellContent = <></>;
  }

  return cellContent;
};

const getCellBackground = (cell: string): string => {
  let cellBackground: string;
  if (cell === "*" || cell === "F" || cell === "PF") {
    cellBackground = "#cdcdcd";
  } else if (cell === " ") {
    cellBackground = "#efefef";
  } else if (cell === "B") {
    cellBackground = "#f55656";
  } else {
    cellBackground =
      Colors[`color-${cell as "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"}`];
  }
  return cellBackground;
};

const handleRightClick = (
  socketConnection: Socket | null,
  i: number,
  j: number
) => {
  if (socketConnection) {
    socketConnection.emit("changeBombFlagState", {
      xAxis: j,
      yAxis: i,
    });
  }
};

const handleLeftClick = (
  socketConnection: Socket | null,
  i: number,
  j: number
) => {
  if (socketConnection) {
    socketConnection.emit("unhideCell", {
      xAxis: j,
      yAxis: i,
    });
  }
};

export const Field: React.FC<FieldProps> = ({ data, socketConnection }) => {
  useEffect(() => { }, [data]);

  return (
    <FieldContainer numberOfRows={data[0]?.length} numberOfColumns={data.length} onContextMenu={(e) => e.preventDefault()}>
      {data.map((line, i) => {
        return (
          line.map((cell, j) => {
            const cellBackground = getCellBackground(cell);
            return (
              <Cell
                onContextMenu={() => {
                  handleRightClick(socketConnection, i, j);
                }}
                onClick={() => {
                  handleLeftClick(socketConnection, i, j);
                }}
                backgroundColor={cellBackground}
                key={j}
              >
                {getCellContent(cell)}
              </Cell>
            );
          })
        );
      })}
    </FieldContainer>
  );
};
