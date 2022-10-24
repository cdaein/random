/**
 * ### array shuffling algorithm
 * https://stackoverflow.com/a/12646864/3125961
 * answered by Laurens Holst, edited by ashleedawg
 * The algorithm has been adapted to use a custom random function.
 *
 * CC BY-SA 4.0
 * https://creativecommons.org/licenses/by-sa/4.0/
 * full license terms are available in LICENSE file.
 */

import { clamp, map } from "@daeinc/math";
import { fillAndMap } from "@daeinc/array";

type RandFn = (n: number) => number;
type ShuffleFn = <T>(arr: T[]) => T[];
// type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * returns either true or false given a probability. it can also return custom value.
 * @param prob between 0..1
 * @param randFn seeded random function. ie. randFn(max)
 * @param optTrue return value when true
 * @param optFalse return value when false
 * @returns boolean or custom value
 */
export function boolean<T>(prob: number, randFn: RandFn): boolean;
export function boolean<T>(
  prob: number,
  randFn: RandFn,
  optTrue: NonNullable<T>,
  optFalse: NonNullable<T>
): T;
export function boolean<T>(
  prob: number,
  randFn: RandFn,
  optTrue?: NonNullable<T>,
  optFalse?: NonNullable<T>
) {
  if (optTrue !== undefined && optFalse !== undefined) {
    if (typeof optTrue === typeof optFalse) {
      return randFn(1) < prob ? optTrue : optFalse; // if options are present
    }
  } else if (optTrue === undefined && optFalse === undefined) {
    return randFn(1) < prob ? true : false; // if no options
  }
  throw new Error("boolean(): check the number or type of arguments");
}

/**
 * convenience function so as not to plugin seeded function all the time when using boolean(). this function returns a seeded boolean function.
 * @param randFn seeded random function. ie. randFn(max)
 * @param optTrue return value when true
 * @param optFalse return value when false
 * @returns seeded boolean function. ie. fn(prob)
 */
export function booleanFnCreator(randFn: RandFn): (prob: number) => boolean;
export function booleanFnCreator<T>(
  randFn: RandFn,
  optTrue: NonNullable<T>,
  optFalse: NonNullable<T>
): (prob: number) => T;

export function booleanFnCreator<T>(
  randFn: RandFn,
  optTrue?: NonNullable<T>,
  optFalse?: NonNullable<T>
) {
  if (optTrue !== undefined && optFalse !== undefined) {
    if (typeof optTrue === typeof optFalse) {
      return (prob: number) => boolean(prob, randFn, optTrue, optFalse);
    }
  } else if (optTrue === undefined && optFalse === undefined) {
    return (prob: number) => boolean(prob, randFn);
  }
  throw new Error("booleanFnCreator(): check the number or type of arguments");
}

/**
 * sample a random element from array with seeded random function
 * @param arr array to sample from
 * @param randFn seeded random function. ie. randFn(max)
 * @returns a sampled element from array
 */
export const sample = <T>(arr: NonNullable<T>[], randFn: RandFn): T => {
  if (randFn === undefined)
    throw new Error("sample(): needs a random function argument");
  return arr[Math.floor(randFn(arr.length))];
};

/**
 * REVIEW: haven't found good values to use for mean & stddev.
 * @param arr array of values to choose from
 * @param mean between 0..1
 * @param stddev higher will produce more diverse values
 * @param gaussianFn seeded random object. ie. gaussianFn(mean, stddev)
 * @returns an element from values array
 */
export const sampleGaussian = <T>(
  arr: NonNullable<T>[],
  mean = 0.5,
  stddev = 0.1,
  gaussianFn: (mean: number, stddev: number) => number
): T => {
  const val = gaussianFn(mean, stddev);
  const idx = clamp(
    Math.floor(map(val, 0, 1, 0, arr.length)),
    0,
    arr.length - 1
  );
  return arr[idx];
};

/**
 * sampling multiple items from original array. returns a new array.
 * @param arr array to sample from (not mutated)
 * @param numSamples how many samples to pick
 * @param shuffleFn seeded shuffle function. ie. shuffleFn(arr)
 * @returns new array with numSamples length
 */
export const sampleMultiple = <T>(
  arr: NonNullable<T>[],
  numSamples: number,
  shuffleFn: ShuffleFn
): T[] => {
  if (arr.length >= numSamples) {
    const copy = shuffle(arr, shuffleFn);
    return fillAndMap(numSamples, (_, i) => copy[i!]);
  } else {
    throw new Error("sampleMultiple(): arr.length must be >= numSamples");
  }
};

/**
 * sample a value by weights provided. the value returned can be any data, even an array.
 * @param values array to sample from.
 * @param weights corresponds to values array
 * @param randFn seeded random function. ie. randFn(max)
 * @returns a sampled value.
 */
export const sampleWeighted = <T>(
  values: T[],
  weights: number[],
  randFn: RandFn
): T => {
  if (values.length !== weights.length)
    throw new Error(
      "sampleWeighted(): values and weights must have same length"
    );

  // progressive sum of weights
  const weightsAccumulated = Array(weights.length).fill(0);
  let sumTemp = 0;
  for (let i = 0; i < weightsAccumulated.length; i++) {
    sumTemp += weights[i];
    weightsAccumulated[i] = sumTemp;
  }
  // where does random number fall? between one of weightsAccumulated
  const sumWeights = weights.reduce((p, c) => p + c);
  const r = randFn(sumWeights);
  for (let i = 0; i < weightsAccumulated.length; i++) {
    if (r < weightsAccumulated[i]) return values[i];
  }
  // fallback. random pick. ex. when all weights are zero.
  return values[Math.floor(randFn(values.length))];
};

/**
 *
 * @param arr array to shuffle (not mutated)
 * @param shuffleFn seeded shuffle function. ie. shuffleFn(max)
 * @returns new shuffled array
 */
export const shuffle = <T>(arr: T[], shuffleFn: ShuffleFn) => shuffleFn(arr);

// forgot what i was trying to do with this...
export const lookAhead = <T>(arr: T[]) => {
  //
};

const sampleCurve = (
  values: any[],
  curveFn: (n: number) => number,
  randFn: RandFn
) => {
  return;
};
