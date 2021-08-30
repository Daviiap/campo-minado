import { Field } from "./entities/Field/Field";

const height = 16;
const width = 16;
const numberOfBombs = 40;
const field = new Field(width, height, numberOfBombs);

const start = new Date().getTime();

field.unHiddeCell(8, 4);

const end = new Date().getTime();

console.log(end - start);

console.log(field.toString());
