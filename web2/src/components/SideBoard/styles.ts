import styled from "styled-components";

export const Container = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10%;
  padding-bottom: 100px;
`;

export const InfosContainer = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  width: 50%;
  align-items: center;
  gap: 15px;
`;

export const Cronometre = styled.span`
  font-weight: bolder;
  font-size: 30px;
  text-align: center;
  display: flex;
  padding: 10px;
  color: #ffffff;
`;

export const CronometreImage = styled.img`
  width: 40px;
`;

export const FlagCounterImage = styled.img`
  width: 50px;
`;

export const BombCounter = styled.span`
  font-weight: bolder;
  font-size: 30px;
  text-align: center;
  display: flex;
  padding: 10px;
  color: #ffffff;
`;

export const ResetButton = styled.button`
  margin-top: 50px;
  height: 10%;
  max-height: 50px;
  width: 50%;
  background-color: #ffffff;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-weight: bolder;
  :hover {
    cursor: pointer;
    background-color: pink;
    color: #ffffff;
  }
  :focus {
    background-color: pink;
    color: #ffffff;
  }
`;
