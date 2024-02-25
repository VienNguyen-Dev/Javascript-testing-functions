import { describe, it, expect } from "vitest";
import { calculateAverage, fatorial, fizzBuzz, max } from "../src/intro";

describe("max", () => {
  it("Should return the first argument if it is greater", () => {
    expect(max(4, 3)).toBe(4);
  })
  it("Should return the second argument if it is smaller", () => {
    expect(max(3, 4)).toBe(4);
  })

  it("Should return the first argument if it is equal", () => {
    expect(max(3, 3)).toBe(3);
  })
})

//Execise:
describe("fizzBuzz", () => {
  it("Should return FizzBuzz if given a number divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  })
  it("Should return Fizz if arg only divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz")
  })
  it("Should return Buzz if arg only divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  })
  it("Should return a string if arg not divisibel by 3 or 5", () => {
    expect(fizzBuzz(1)).toBe('1');
  })
})

//Test-Driven Development (TDD)

describe("calculateAverage", () => {
  it("Should return NaN if given an array empty", () => {
    expect(calculateAverage([])).toBe(NaN);
  })
  it("Should return the average if given a array with single element", () => {
    expect(calculateAverage([1])).toBe(1);
  })
  it("Should return the avergare if given an array with two elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  })
})

describe("fatorial", () => {
  it("Should return 1 if given 0", () => {
    expect(fatorial(0)).toBe(1);
  })

  it("Shoud return 1 if given 1", () => {
    expect(fatorial(1)).toBe(1);
  })
  it("Should return 2 if given 2", () => {
    expect(fatorial(2)).toBe(2);
  })
  it("Should return 6 if given 3", () => {
    expect(fatorial(3)).toBe(6);
  })
})