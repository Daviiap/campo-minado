import styled from "styled-components";
import { CellProps, FieldContainerProps } from "./PropsInterface";

export const FieldContainer = styled.div<FieldContainerProps>`
  border-radius: 5px;
  width: 90vh;
  height: 90vh;
  max-width: 90vw;
  max-height: 90vw;
  display: grid;
  grid-template-columns: ${(props) => {
    let frs = '';
    for (let _ = 0; _ < props.numberOfColumns; _++) {
      frs += '1fr ';
    }
    console.log(frs);

    return frs;
  }};
  grid-template-rows: ${(props) => {
    let frs = '';
    for (let _ = 0; _ < props.numberOfRows; _++) {
      frs += '1fr ';
    }
    console.log(frs);

    return frs;
  }};
  gap: 0.3rem;
  padding: 2px;
  background-color: #454545;
`;

export const CellContentImg = styled.img`
  width: 90%;
`;

export const Cell = styled.div<CellProps>`
  border-radius: 3px;
  box-shadow: 0px 0px 2px black;
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
