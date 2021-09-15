import React from "react";
import { Field } from "../../components/Field";

import { Container } from "./styles";

export const Game: React.FC = () => {
  return (
    <Container>
      <Field
        data={[
          ["F", "1", "2", "F", "2", "*", "*", "*"],
          ["1", "1", "1", "F", "2", "*", "PF", "*"],
          ["*", "*", "1", "1", "1", "*", "*", "*"],
          ["*", "*", "*", "*", "*", "*", "*", "*"],
          ["*", "*", "*", "*", "B", "B", "B", "*"],
          ["*", "*", "*", "*", "B", "8", "B", "*"],
          ["*", "*", "*", "*", "B", "B", "B", "*"],
          ["*", "*", "*", "*", "*", "*", "*", "*"],
        ]}
      />
    </Container>
  );
};
