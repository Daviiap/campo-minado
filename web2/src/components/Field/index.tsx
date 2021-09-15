import React from "react";
import { FieldProps } from "./PropsInterface";

import { Cell, FieldContainer, Line } from "./styles";

import explosao from "../../assets/explosao.png";
import flag from "../../assets/flag.png";

export const Field: React.FC<FieldProps> = (props) => {
  const colors = {
    "1": "#dfeda6",
    "2": "#eaed91",
    "3": "#edd787",
    "4": "#ebcc86",
    "5": "#f2bc7e",
    "6": "#eba06e",
    "7": "#f29b7e",
    "8": "#f28d7c",
  };

  return (
    <FieldContainer>
      {props.data
        ? props.data.map((line, i) => {
            return (
              <Line key={i}>
                {line.map((cell, j) => {
                  let cellContent;

                  if (cell === "B") {
                    cellContent = <img src={explosao} alt="B" width="40px" />;
                  } else if (cell === "F") {
                    cellContent = <img src={flag} alt="F" width="30px" />;
                  } else if (cell === "PF") {
                    cellContent = <h3>?</h3>;
                  } else if (cell !== " " && cell !== "*") {
                    cellContent = <h3>{cell}</h3>;
                  } else {
                    cellContent = "";
                  }

                  const cellBackground: string =
                    cell === "*" || cell === "F" || cell === "PF"
                      ? "#cdcdcd"
                      : cell === " "
                      ? "#efefef"
                      : cell === "B"
                      ? "#f55656"
                      : colors[
                          cell as "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
                        ];

                  return (
                    <Cell backgroundColor={cellBackground} key={j}>
                      {cellContent}
                    </Cell>
                  );
                })}
              </Line>
            );
          })
        : null}
    </FieldContainer>
  );
};
