"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookAhead = exports.shuffle = exports.sampleWeighted = exports.sampleMultiple = exports.sampleGaussian = exports.sample = exports.booleanFnCreator = exports.boolean = void 0;
const math_1 = require("@daeinc/math");
const array_1 = require("@daeinc/array");
function boolean(prob, randFn, optTrue, optFalse) {
    if (optTrue !== undefined && optFalse !== undefined) {
        if (typeof optTrue === typeof optFalse) {
            return randFn(1) < prob ? optTrue : optFalse; // if options are present
        }
    }
    else if (optTrue === undefined && optFalse === undefined) {
        return randFn(1) < prob ? true : false; // if no options
    }
    throw new Error("boolean(): check the number or type of arguments");
}
exports.boolean = boolean;
function booleanFnCreator(randFn, optTrue, optFalse) {
    if (optTrue !== undefined && optFalse !== undefined) {
        if (typeof optTrue === typeof optFalse) {
            return (prob) => boolean(prob, randFn, optTrue, optFalse);
        }
    }
    else if (optTrue === undefined && optFalse === undefined) {
        return (prob) => boolean(prob, randFn);
    }
    throw new Error("booleanFnCreator(): check the number or type of arguments");
}
exports.booleanFnCreator = booleanFnCreator;
/**
 * sample a random element from array with seeded random function
 * @param arr array to sample from
 * @param randFn seeded random function. ie. randFn(max)
 * @returns a sampled element from array
 */
const sample = (arr, randFn) => {
    if (randFn === undefined)
        throw new Error("sample(): needs a random function argument");
    return arr[Math.floor(randFn(arr.length))];
};
exports.sample = sample;
/**
 * REVIEW: haven't found good values to use for mean & stddev.
 * @param arr array of values to choose from
 * @param mean between 0..1
 * @param stddev higher will produce more diverse values
 * @param gaussianFn seeded random object. ie. gaussianFn(mean, stddev)
 * @returns an element from values array
 */
const sampleGaussian = (arr, mean = 0.5, stddev = 0.1, gaussianFn) => {
    const val = gaussianFn(mean, stddev);
    const idx = (0, math_1.clamp)(Math.floor((0, math_1.map)(val, 0, 1, 0, arr.length)), 0, arr.length - 1);
    return arr[idx];
};
exports.sampleGaussian = sampleGaussian;
/**
 * sampling multiple items from original array. returns a new array.
 * @param arr array to sample from (not mutated)
 * @param numSamples how many samples to pick
 * @param shuffleFn seeded shuffle function. ie. shuffleFn(arr)
 * @returns new array with numSamples length
 */
const sampleMultiple = (arr, numSamples, shuffleFn) => {
    if (arr.length >= numSamples) {
        const copy = (0, exports.shuffle)(arr, shuffleFn);
        return (0, array_1.fillAndMap)(numSamples, (_, i) => copy[i]);
    }
    else {
        throw new Error("sampleMultiple(): arr.length must be >= numSamples");
    }
};
exports.sampleMultiple = sampleMultiple;
/**
 * sample a value by weights provided. the value returned can be any data, even an array.
 * @param values array to sample from.
 * @param weights corresponds to values array
 * @param randFn seeded random function. ie. randFn(max)
 * @returns a sampled value.
 */
const sampleWeighted = (values, weights, randFn) => {
    if (values.length !== weights.length)
        throw new Error("sampleWeighted(): values and weights must have same length");
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
        if (r < weightsAccumulated[i])
            return values[i];
    }
    // fallback. random pick. ex. when all weights are zero.
    return values[Math.floor(randFn(values.length))];
};
exports.sampleWeighted = sampleWeighted;
/**
 *
 * @param arr array to shuffle (not mutated)
 * @param shuffleFn seeded shuffle function. ie. shuffleFn(max)
 * @returns new shuffled array
 */
const shuffle = (arr, shuffleFn) => shuffleFn(arr);
exports.shuffle = shuffle;
// forgot what i was trying to do with this...
const lookAhead = (arr) => {
    //
};
exports.lookAhead = lookAhead;
const sampleCurve = (values, curveFn, randFn) => {
    return;
};
//# sourceMappingURL=index.js.map