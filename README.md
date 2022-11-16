# @daeinc/random

Random utilities. Mainly a collection of convenience functions. The functions are designed to be used with existing random libraries. It has no dependency on any particular random libraries but it's best to use with those seeded ones.

The function signatures are important. The chosen random functions have to support `randFn(min, max)`, `randFn(max)` and `shuffleFn(arr)`, etc. My current choice is [`canvas-sketch-util`](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md).


## Installation

```sh
npm i @daeinc/random
```

then, 

```ts
import { sample, ... } from "@daeinc/random"
```

## Types

```ts
declare type RandFn = (n: number) => number;
declare type ShuffleFn = <T>(arr: T[]) => T[];
```

## Functions

### boolean

```ts
function boolean<T>(prob: number, randFn: RandFn): boolean;
function boolean<T>(prob: number, randFn: RandFn, optTrue: NonNullable<T>, optFalse: NonNullable<T>): T;
```
Returns either `true` or `false` given a probability, `prob` between 0 and 1. It can also return custom value.

```ts
function booleanFnCreator(randFn: RandFn): (prob: number) => boolean;
function booleanFnCreator<T>(randFn: RandFn, optTrue: NonNullable<T>, optFalse: NonNullable<T>): (prob: number) => T;
```
Convenience function so as not to input the same seeded function all the time when using `boolean()`. It returns a seeded boolean function.

### sample
```ts
const sample: <T>(arr: NonNullable<T>[], randFn: RandFn) => T;
```
Samples a random element from array with seeded random function

### sampleGaussian
```ts
const sampleGaussian: <T>(arr: NonNullable<T>[], mean: number | undefined, stddev: number | undefined, gaussianFn: (mean: number, stddev: number) => number) => T;
```
(This function is not quite ready)

### sampleMultiple
```ts
const sampleMultiple: <T>(arr: NonNullable<T>[], numSamples: number, shuffleFn: ShuffleFn) => T[];
```
Samples multiple elements from the original array. Returns a new array.

### sampleWeighted
```ts
const sampleWeighted: <T>(values: T[], weights: number[], randFn: RandFn) => T;
```
Samples a random value based on `weights` array. The value returned can be any type, even an array.

### shuffle
```ts
const shuffle: <T>(arr: T[], shuffleFn: ShuffleFn) => T[];
```
Shuffles array. Returns a new array.

## To Dos

- try `random-js`
- REVIEW: https://attacomsian.com/blog/javascript-deep-clone-array

## License

MIT
