# @daeinc/random

Random utilities. Mainly a collection of convenience functions. The functions are designed to be used with existing random libraries. It has no dependency on any particular random libraries but it's best to use with those seeded ones.

The function signatures are important. The chosen random functions have to support `randFn(min, max)`, `randFn(max)` and `shuffleFn(arr)`, etc. My current choice is [`canvas-sketch-util`](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md).

## To Dos

- try `random-js`
- REVIEW: https://attacomsian.com/blog/javascript-deep-clone-array

## License

MIT
