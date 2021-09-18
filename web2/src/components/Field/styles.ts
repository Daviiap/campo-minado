import styled from "styled-components";
import { CellProps } from "./PropsInterface";

export const FieldContainer = styled.div`
  border-radius: 5px;
  display: flex;
  gap: 4px;
  padding: 2px;
  background-color: #454545;
  flex-direction: column;
`;

export const Line = styled.div`
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
`;

export const CellContentImg = styled.img`
  width: 90%;
`;

export const Cell = styled.div<CellProps>`
  border-radius: 3px;
  height: 5vh;
  width: 5vh;
  display: grid;
  place-items: center;
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  :hover {
    cursor: ${(props) => {
      let cursor: string;
      if (props.backgroundColor === "#cdcdcd") {
        cursor = "pointer";
      } else {
        cursor = "default";
      }
      return cursor;
    }};

    background-color: ${(props) => {
      let color = props.backgroundColor;
      if (props.backgroundColor === "#cdcdcd") {
        color = "#dedede";
      }
      return color;
    }};
  }
`;
