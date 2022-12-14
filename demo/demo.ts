import {
  boolean,
  booleanFnCreator,
  randomTowards,
  sampleMultiple,
  sampleWeighted,
} from "../index";
const { random } = require("canvas-sketch-util");

const seed = Math.random() * 1000000;
const seeded = random.createRandom(seed);

//----- boolean()
// REVIEW: optTrue value of "e" is a type???
// console.log(boolean(1.0, seeded.range, "e", 3));

//----- booleanFnCreator()
const bool = booleanFnCreator(seeded.range, "a", "b");
console.log(bool(1.0));

//----- randomAround()
for (let i = 0; i < 100; i++) {
  const r = randomTowards(3, 0, 10, 0.9, seeded.range);
  console.log(r);
}

//----- sampleMultiple()
{
  const arr = [1, 2, 3, 4, 5];
  console.log(sampleMultiple(arr, 2, seeded.shuffle));
}

//----- sampleWeighted()
console.log(sampleWeighted([0, 100, 2], [-1, 1, -1], seeded.range));
