import { Field } from "./entities/Field/Field";

const height = 16;
const width = 16;
const numberOfBombs = 40;
const field = new Field(width, height, numberOfBombs);

field.unHiddeCell(0,0);
field.unHiddeCell(10, 7);
field.unHiddeCell(8, 7);

console.log(field.toString());
