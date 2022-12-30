type RandFn = (minOrMax: number, max?: number) => number;
type ShuffleFn = <T>(arr: T[]) => T[];
/**
 * returns either true or false given a probability. it can also return custom value.
 * @param prob between 0..1
 * @param randFn seeded random function. ie. randFn(max)
 * @param optTrue return value when true
 * @param optFalse return value when false
 * @returns boolean or custom value
 */
export declare function boolean<T>(prob: number, randFn: RandFn): boolean;
export declare function boolean<T>(prob: number, randFn: RandFn, optTrue: NonNullable<T>, optFalse: NonNullable<T>): T;
/**
 * convenience function so as not to plugin seeded function all the time when using boolean(). this function returns a seeded boolean function.
 * @param randFn seeded random function. ie. randFn(max)
 * @param optTrue return value when true
 * @param optFalse return value when false
 * @returns seeded boolean function. ie. fn(prob)
 */
export declare function booleanFnCreator(randFn: RandFn): (prob: number) => boolean;
export declare function booleanFnCreator<T>(randFn: RandFn, optTrue: NonNullable<T>, optFalse: NonNullable<T>): (prob: number) => T;
/**
 * sample a random element from array with seeded random function
 * @param arr array to sample from
 * @param randFn seeded random function. ie. randFn(max)
 * @returns a sampled element from array
 */
export declare const sample: <T>(arr: NonNullable<T>[], randFn: RandFn) => T;
/**
 * pick a random number around target value with strength (0..1)
 * @param target must be between [min, max]
 * @param min minimum value
 * @param max maximum value
 * @param strength between 0..1. 0.75~1 seems to be good.
 * @param randFn
 */
export declare const randomTowards: (target: number, min: number, max: number, strength: number, randFn: RandFn) => number;
/**
 * REVIEW: haven't found good values to use for mean & stddev.
 * @param arr array of values to choose from
 * @param mean between 0..1
 * @param stddev higher will produce more diverse values
 * @param gaussianFn seeded random object. ie. gaussianFn(mean, stddev)
 * @returns an element from values array
 */
export declare const sampleGaussian: <T>(arr: NonNullable<T>[], mean: number | undefined, stddev: number | undefined, gaussianFn: (mean: number, stddev: number) => number) => T;
/**
 * sampling multiple items from original array. returns a new array.
 * @param arr array to sample from (not mutated)
 * @param numSamples how many samples to pick
 * @param shuffleFn seeded shuffle function. ie. shuffleFn(arr)
 * @returns new array with numSamples length
 */
export declare const sampleMultiple: <T>(arr: NonNullable<T>[], numSamples: number, shuffleFn: ShuffleFn) => T[];
/**
 * sample a value by weights provided. the value returned can be any type, even an array.
 * @param values array to sample from.
 * @param weights corresponds to values array
 * @param randFn seeded random function. ie. randFn(max)
 * @returns a sampled value.
 */
export declare const sampleWeighted: <T>(values: T[], weights: number[], randFn: RandFn) => T;
/**
 *
 * @param arr array to shuffle (not mutated)
 * @param shuffleFn seeded shuffle function. ie. shuffleFn(max)
 * @returns new shuffled array
 */
export declare const shuffle: <T>(arr: T[], shuffleFn: ShuffleFn) => T[];
export declare const lookAhead: <T>(arr: T[]) => void;
export {};
//# sourceMappingURL=index.d.ts.map