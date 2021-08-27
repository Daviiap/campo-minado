import { Field } from "./entities/Field/FieldImpl";

const field = new Field(10, 10, 5);
const bombs = field.getBombs();
const indicators = field.getBombProximityIndicators();

const fieldRep = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
];

for (const bomb of bombs) {
  fieldRep[bomb.getYAxis()][bomb.getXAxis()] = "x";
}
for (const indicator of indicators) {
  fieldRep[indicator.getYAxis()][
    indicator.getXAxis()
  ] = `${indicator.getBombCounter()}`;
}

let res = "";
for (const list of fieldRep) {
  let line = "";
  for (const el of list) {
    line += el + "    ";
  }
  line += "\n";
  res += line;
}

console.log(res);
