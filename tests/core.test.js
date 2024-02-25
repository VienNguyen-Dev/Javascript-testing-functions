import { describe, it, expect } from "vitest";
import { calculateDiscount, getCoupons } from "../src/core";

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

