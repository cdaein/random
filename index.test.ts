import {
  describe,
  expect,
  test,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
const { random } = require("canvas-sketch-util");
import {
  boolean,
  booleanFnCreator,
  sample,
  sampleGaussian,
  sampleMultiple,
  sampleWeighted,
  shuffle,
} from "./index";

const seed = 123456;
const seeded = random.createRandom(seed);

describe("boolean()", () => {
  beforeEach(() => {
    jest.spyOn(seeded, "range").mockReturnValue(0.45);
  });
  afterEach(() => {
    jest.spyOn(seeded, "range").mockRestore();
  });
  test("works with different probabilities", () => {
    expect(boolean(1.0, seeded.range)).toBe(true);
    expect(boolean(0.5, seeded.range)).toBe(true);
    expect(boolean(0.3, seeded.range)).toBe(false);
    expect(boolean(0.0, seeded.range)).toBe(false);
  });
  test("works with custom return values", () => {
    expect(boolean(1.0, seeded.range, "t", "f")).toBe("t");
    expect(boolean(0.4, seeded.range, "t", "f")).toBe("f");
  });
});

describe("booleanFnCreator()", () => {
  beforeEach(() => {
    jest.spyOn(seeded, "range").mockReturnValue(0.65);
  });
  afterEach(() => {
    jest.spyOn(seeded, "range").mockRestore();
  });
  test("works with different probabilities", () => {
    expect(booleanFnCreator(seeded.range)(1.0)).toEqual(true);
    expect(booleanFnCreator(seeded.range)(1.0)).toEqual(true);
    expect(booleanFnCreator(seeded.range)(0.5)).toEqual(false);
    expect(booleanFnCreator(seeded.range)(0.3)).toEqual(false);
  });
  test("works with custom return values", () => {
    expect(booleanFnCreator(seeded.range, "t", "f")(1.0)).toEqual("t");
    expect(booleanFnCreator(seeded.range, "t", "f")(0.4)).toEqual("f");
  });
});

describe("sample()", () => {
  test("returns a sampled element", () => {
    expect([0, 1, 2]).toContain(sample([0, 1, 2], seeded.range));
    expect([3, 4, 5, 6]).toContain(sample([3, 4, 5, 6], seeded.range));
    expect(["a", "b", "c"]).toContain(sample(["a", "b", "c"], seeded.range));
  });
  // prettier-ignore
  test("returns an array element", () => {
    expect([[0, 1], [2, 3]]).toContainEqual(sample([[0, 1],[2, 3]], seeded.range));
  });
  test("returns an object element", () => {
    expect([{ a: 1 }, { b: 2 }]).toContainEqual(
      sample([{ a: 1 }, { b: 2 }], seeded.range)
    );
  });
  test("returns a function element", () => {
    const fn1 = (a: number) => a;
    const fn2 = (a: string, b: string) => a + b;
    expect([fn1, fn2]).toContainEqual(sample([fn1, fn2], seeded.range));
  });
});

// REVIEW: can we do probability test with Jest?
describe("sampleGaussian()", () => {
  test("returns a sampled element", () => {
    expect([0, 1, 2]).toContain(
      sampleGaussian([0, 1, 2], 0.5, 1, seeded.gaussian)
    );
    expect([3, 4, 5]).toContain(
      sampleGaussian([3, 4, 5], 0.5, 1, seeded.gaussian)
    );
    expect(["a", "b", "c"]).toContain(
      sampleGaussian(["a", "b", "c"], 0.5, 1, seeded.gaussian)
    );
  });
});

describe("sampleMultiple()", () => {
  test("returns multiple sampled elements", () => {
    expect([0, 1, 2]).toEqual(
      expect.arrayContaining(sampleMultiple([0, 1, 2], 2, seeded.shuffle))
    );
    expect([3, 4, 5, 6]).toEqual(
      expect.arrayContaining(sampleMultiple([3, 4, 5, 6], 3, seeded.shuffle))
    );
    expect(["a", "b", "c"]).toEqual(
      expect.arrayContaining(sampleMultiple(["a", "b", "c"], 1, seeded.shuffle))
    );
  });
  // prettier-ignore
  test("returns multiple array elements", () => {
    expect([[0, 1], [2, 3]]).toEqual(expect.arrayContaining(sampleMultiple([[0, 1],[2, 3]], 2, seeded.shuffle)))
  });
  // prettier-ignore
  test("returns multiple object elements", () => {
    expect([{ a: 1 }, { b: 2 }, {a: 3}]).toEqual(
      expect.arrayContaining(sampleMultiple([{ a: 1 }, { b: 2 }, {a: 3}], 2, seeded.shuffle))
    );
  });
  test("returns multiple function elements", () => {
    const fn1 = (a: number) => a;
    const fn2 = (a: string, b: string) => a + b;
    const fn3 = (a: number, b: number) => a + b;
    expect([fn1, fn2, fn3]).toEqual(
      expect.arrayContaining(sampleMultiple([fn1, fn2, fn3], 2, seeded.shuffle))
    );
  });
});

describe("sampleWeighted()", () => {
  test("throws error when values.length !== weights.length", () => {
    expect(() => sampleWeighted([0, 1, 2], [1, 2], seeded.range)).toThrow(
      "values and weights must have same length"
    );
  });
  test("handles when all weights are zero", () => {
    expect([0, 1, 2]).toContain(
      sampleWeighted([0, 1, 2], [0, 0, 0], seeded.range)
    );
  });
  test("handles negative weight", () => {
    // REVIEW: need more testing.
    expect([1, 2]).toContain(
      sampleWeighted([0, 1, 2], [-1, 1, 2], seeded.range)
    );
  });
  test("returns a sampled element", () => {
    expect([0, 1, 2]).toContain(
      sampleWeighted([0, 1, 2], [1, 1, 1], seeded.range)
    );
    expect([3, 4, 5, 6]).toContain(
      sampleWeighted([3, 4, 5, 6], [1, 2, 2, 1], seeded.range)
    );
    expect(["b"]).toContain(
      sampleWeighted(["a", "b", "c"], [0, 3, 0], seeded.range)
    );
  });
  // prettier-ignore
  test("returns an array element", () => {
    expect([[0, 1], [2, 3]]).toContainEqual(sampleWeighted([[0, 1],[2, 3]], [1, 2], seeded.range));
  });
  test("returns an object element", () => {
    expect([{ a: 1 }, { b: 2 }]).toContainEqual(
      sampleWeighted([{ a: 1 }, { b: 2 }], [3, 2], seeded.range)
    );
  });
  test("returns a function element", () => {
    const fn1 = (a: number) => a;
    const fn2 = (a: string, b: string) => a + b;
    expect([fn1, fn2]).toContainEqual(
      sampleWeighted([fn1, fn2], [2, 10], seeded.range)
    );
  });
});

describe("shuffle()", () => {
  test("mixed array", () => {
    // TODO
  });

  test("shuffles a number array", () => {
    expect([0, 1, 2]).toEqual(
      expect.arrayContaining(shuffle([2, 1, 0], seeded.shuffle))
    );
    expect([3, 4, 5, 6]).toEqual(
      expect.arrayContaining(shuffle([6, 3, 5, 4], seeded.shuffle))
    );
  });
  test("shuffles a string array", () => {
    expect(["a", "b", "c"]).toEqual(
      expect.arrayContaining(shuffle(["c", "a", "b"], seeded.shuffle))
    );
  });
  // prettier-ignore
  test("shuffles an array of array", () => {
    const arr = [[1, 2], [3, 4], [5, 6]]
    expect(arr).toEqual(
      expect.arrayContaining(shuffle([[5, 6], [3, 4], [1, 2]], seeded.shuffle))
    );
  });
  test("shuffles an object array", () => {
    const arr = [{ a: 1 }, { b: 2 }, { a: 3 }];
    expect(arr).toEqual(
      expect.arrayContaining(
        shuffle([{ b: 2 }, { a: 3 }, { a: 1 }], seeded.shuffle)
      )
    );
  });
  test("shuffles a function array", () => {
    const fn1 = (a: number) => a;
    const fn2 = (a: string, b: string) => a + b;
    expect([fn1, fn2]).toEqual(
      expect.arrayContaining(shuffle([fn2, fn1], seeded.shuffle))
    );
  });
});
