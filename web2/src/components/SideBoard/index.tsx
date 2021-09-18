import React, { useEffect, useState } from "react";

import {
  Container,
  Cronometre,
  InfoContainer,
  InfosContainer,
  CronometreImage,
  FlagCounterImage,
  BombCounter,
  ResetButton,
} from "./styles";

import clock from "../../assets/clock.svg";
import flagInfo from "../../assets/flagInfo.svg";

import { SideBoardPropsInterface } from "./PropsData";

const SideBoard: React.FC<SideBoardPropsInterface> = (props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log(props.start);
    if (props.start) {
      const myInterval = setInterval(() => {
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [seconds, minutes, props.start]);

  return (
    <Container>
      <InfosContainer>
        <InfoContainer>
          <CronometreImage src={clock} alt="clock" />
          <Cronometre>
            {`${minutes.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}:${seconds.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}`}
          </Cronometre>
        </InfoContainer>

        <InfoContainer>
          <FlagCounterImage src={flagInfo} alt="clock" />
          <BombCounter>
            {`${(0).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })} / ${(40).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}`}
          </BombCounter>
        </InfoContainer>
      </InfosContainer>

      <ResetButton>RESET</ResetButton>
    </Container>
  );
};

export default SideBoard;
