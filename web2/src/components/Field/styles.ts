import styled from "styled-components";
import { CellProps } from "./PropsInterface";

export const FieldContainer = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  gap: 2px;
  padding: 2px;
  background-color: #333;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
`;

export const Line = styled.div`
  gap: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
`;

export const Cell = styled.div<CellProps>`
  border-radius: 3px;
  border: 1px solid black;
  height: 5vh;
  width: 5vh;
  display: grid;
  place-items: center;
  padding: 0px;
  background-color: ${(props) => props.backgroundColor || "#FFF"};
`;
