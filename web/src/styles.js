import styled from 'styled-components';

export const Container = styled.div`
  height: 90vh;
  width: 90vw;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Field = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
`;

export const Line = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
`;

export const Cell = styled.div`
  border: 1px solid black;
  height: 5vh;
  width: 5vh;
  display: grid;
  place-items: center;
`;