import { Field } from "./entities/Field/Field";

const height = 16;
const width = 16;
const numberOfBombs = 40;
const field = new Field(width, height, numberOfBombs);

field.unHideCell(0,0);
field.unHideCell(10, 7);
field.unHideCell(8, 7);

console.log(field.toString());
