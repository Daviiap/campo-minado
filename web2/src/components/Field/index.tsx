import React, { ReactElement, useEffect } from "react";
import { FieldProps } from "./PropsInterface";

import { Colors } from "./ColorsEnum";

import { Cell, FieldContainer, Line, NumberSpan } from "./styles";

import flag from "../../assets/flag.svg";
import bomb from "../../assets/bomb.svg";
import flagP from "../../assets/flagP.svg";
import { Socket } from "socket.io-client";

const getCellContent = (cell: string): ReactElement => {
  let cellContent;
  if (cell === "B") {
    cellContent = <img src={bomb} alt="B" width="90%" />;
  } else if (cell === "F") {
    cellContent = <img src={flag} alt="F" width="60%" />;
  } else if (cell === "PF") {
    cellContent = <img src={flagP} alt="B" width="60%" />;
  } else if (cell !== " " && cell !== "*") {
    cellContent = <NumberSpan>{cell}</NumberSpan>;
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

const handleRightClick = (socketConnection: Socket, i: number, j: number) => {
  socketConnection.emit("changeBombFlagState", {
    xAxis: j,
    yAxis: i,
  });
};

const handleLeftClick = (socketConnection: Socket, i: number, j: number) => {
  socketConnection.emit("unhideCell", {
    xAxis: j,
    yAxis: i,
  });
};

export const Field: React.FC<FieldProps> = ({ data, socketConnection }) => {
  useEffect(() => {}, [data]);
  return (
    <FieldContainer onContextMenu={(e) => e.preventDefault()}>
      {data.map((line, i) => {
        return (
          <Line key={i}>
            {line.map((cell, j) => {
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
            })}
          </Line>
        );
      })}
    </FieldContainer>
  );
};
