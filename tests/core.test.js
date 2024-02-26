import { describe, it, expect, beforeEach } from "vitest";
import { Stack, calculateDiscount, canDrive, fetchData, getCoupons, isPriceInRange, isValidUsername, validateUserInput, } from "../src/core";

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

//Exercise: Boundary testing
describe("canDrive", () => {

  it("should return an error if invalid countryCode", () => {
    expect(canDrive(16, 'VN')).toMatch(/invalid/i)
  })
  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true }
  ])("Should return $result for $age,  $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  })
})

//Lessson: Testing asynchronous code
describe("fetchData", () => {
  it("Should return a promise that will resolve to an array of number", async () => {
    try {
      await fetchData();
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error).toMatch(/fail/i)
    }
  })
})

//Lesson: Stup and teardown

describe("Stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  })

  it("push should add an item to the stack", () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  })

  it("Pop should remove and return the top item from the stack", () => {
    stack.push(10);
    stack.push(20);
    const poppedItem = stack.pop();

    expect(poppedItem).toBe(20);
    expect(stack.size()).toBe(1);
  })

  it("pop should return an error if stack is empty", () => {
    expect(() => stack.pop()).toThrow(/empty/i)
  })

  it("peek should return the top item from the stack without removing it", () => {
    stack.push(100);
    stack.push(200);
    stack.push(300);

    const peekedItem = stack.peek();
    expect(peekedItem).toBe(300);
    expect(stack.size()).toBe(3);
  })

  it("peek should return an error if stack is empty", () => {
    expect(() => stack.peek()).toThrow(/empty/i)
  })

  it("should return true if array is empty", () => {
    expect(stack.isEmpty()).toBe(true);
  })
  it("should return false if array is not empty", () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  })

  it("Should return the number of items in the stack", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  })

  it("clear should remove all items from the stack", () => {
    stack.push(10);
    stack.push(20);
    stack.clear();
    expect(stack.size()).toBe(0);
  })
})
