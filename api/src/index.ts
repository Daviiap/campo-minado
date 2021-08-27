import { Field } from "./entities/Field/FieldImpl";

const height = 16;
const width = 16;
const numberOfBombs = 40;
const field = new Field(width, height, numberOfBombs);

console.log(field.toString());
