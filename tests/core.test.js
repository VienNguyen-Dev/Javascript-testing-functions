import { describe, it, expect } from "vitest";
import { calculateDiscount, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from "../src/core";

describe("getCoupons", () => {
  const coupons = getCoupons();
  it("Should return an array coupons", () => {

    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  })

  it("Should return an array with a coupon valid", () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof (coupon.code)).toBe('string');
      expect(coupon.code).toBeTruthy();//. "Truthy" đơn giản là một giá trị có thể đánh giá thành true trong ngữ cảnh Boolean. Cụ thể, nếu coupon.code tồn tại (không phải là null, undefined, false, 0, NaN, hoặc ''), thì kiểm tra sẽ được coi là thành công.
    })
  })

  it("Should rerturn an array with a discount valid", () => {
    coupons.map((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    })
  })
})

describe("calculateDiscount", () => {
  it("Should return discount if given an valid dicount code", () => {
    expect(calculateDiscount(20, "SAVE10")).toBe(18);
    expect(calculateDiscount(20, "SAVE20")).toBe(16);
  })

  it("Should hanlde non-numetric price", () => {
    expect(calculateDiscount('10', "SAVE10")).toMatch(/invalid/i)
  })

  it("Should hanlde negative or zero price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  })
  it("Should hanlde non-string discount price", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  })
  it("Should handle with an invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  })
})


//Test validateUserInput function

describe("validateUserInput", () => {
  it("Should return success if given valid input", () => {
    expect(validateUserInput('vien', 27)).toMatch(/success/i)
  })

  it("Should return an error if username is not a string", () => {
    expect(validateUserInput(27, 27)).toMatch(/invalid/i)
  })

  it("Should return an error if username less than 3 character", () => {
    expect(validateUserInput('vi', 27)).toMatch(/invalid/i);
  })

  it("Should return an error if username longer 255 character", () => {
    expect(validateUserInput('A'.repeat(256), 27)).toMatch(/invalid/i)
  })

  it("Should return an error if age is not a number", () => {
    expect(validateUserInput('vien', '27')).toMatch(/invalid/i);
  })

  it("Should return an error if age less than 18", () => {
    expect(validateUserInput('vien', 17)).toMatch(/invalid/i)
  })

  it("Should return an error if age greater than 100", () => {
    expect(validateUserInput('vien', 101)).toMatch(/invalid/i)
  })

  it("Should return an error if username and age is not valid", () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i)
    expect(validateUserInput('', 0)).toMatch(/invalid age/i)
  })
})

//Boundary testing
describe("isPriceInRange", () => {
  it.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price = min', price: 0, result: true }, {
      scenario: 'price bettwen min and max', price: 50, result: true
    },
    { scenario: 'price > max', price: 101, result: false },
    {
      scenario: 'price = max', price: 100, result: true
    },
  ])(`Should return $result when $scenario`, ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  })
})

//Exercise Bundary testing
describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  it("Should return false if username is too short", () => {
    expect(isValidUsername('v'.repeat(minLength - 1))).toBe(false);
  })

  it("Should return false if username is too long", () => {
    expect(isValidUsername('v'.repeat(maxLength + 1))).toBe(false)
  })

  it("Should return true if username with length at min or max", () => {
    expect(isValidUsername('.v'.repeat(minLength))).toBe(true);
    expect(isValidUsername('v'.repeat(maxLength))).toBe(true);
  })

  it("Should return true if username is within the length contraints", () => {
    expect(isValidUsername('v'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('v'.repeat(maxLength - 1))).toBe(true);
  })
  it("Should return false if username is invalid type", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  })
})

