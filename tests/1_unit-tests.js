const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
const { describe, it } = require("mocha");

let convertHandler = new ConvertHandler();

describe("Unit Tests", function () {
  describe("getNum", function () {
    it("should correctly read a whole number input.", function () {
      assert.equal(convertHandler.getNum("4gal"), 4);
    });
    it("should correctly read a decimal number input.", function () {
      assert.equal(convertHandler.getNum("5.4km"), 5.4);
    });
    it("should correctly read a fractional input.", function () {
      assert.equal(convertHandler.getNum("3/3lbs"), 1);
    });
    it("should correctly read a fractional input with a decimal.", function () {
      assert.equal(convertHandler.getNum("5.4/3kg"), 1.8);
    });
    it("should correctly return an error on a double-fraction.", function () {
      assert.throws(() => convertHandler.getNum("3/2/3kg"), "invalid number");
    });
    it("should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      assert.equal(convertHandler.getNum("kg"), 1);
    });
  });
  describe("getUnit", function () {
    it("should correctly read each valid input unit.", function () {
      assert.equal(convertHandler.getUnit("4L"), "L");
    });
    it("should correctly return an error for an invalid input unit.", function () {
      assert.throws(
        () => convertHandler.getUnit("5.4kilometers"),
        "invalid unit"
      );
    });
  });
  describe("getReturnUnit", function () {
    it("should return the correct return unit for each valid input unit.", function () {
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
    });
  });
  describe("spellOutUnit", function () {
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
  });
  describe("convert", function () {
    it("should correctly convert gal to L", function () {
      //   assert.deepEqual(convertHandler.convert(10, "gal"), {
      //     initNum: 10,
      //     initUnit: "gal",
      //     returnNum: 37.8541,
      //     returnUnit: "L",
      //     string: "10 gallons converts to 37.85410 liters",
      //   });
      assert.strictEqual(convertHandler.convert(10, "gal"), 37.8541);
    });
    it("should correctly convert L to gal", function () {
      //   assert.deepEqual(convertHandler.convert(10, "l"), {
      //     initNum: 10,
      //     initUnit: "l",
      //     returnNum: 2.64172,
      //     returnUnit: "gal",
      //     string: "10 liters converts to 2.64172 gallons",
      //   });
      assert.strictEqual(convertHandler.convert(10, "l"), 2.64172);
    });
    it("should correctly convert mi to km", function () {
      //   assert.deepEqual(convertHandler.convert(10, "mi"), {
      //     initNum: 10,
      //     initUnit: "mi",
      //     returnNum: 16.0934,
      //     returnUnit: "km",
      //     string: "10 miles converts to 16.09340 kilometers",
      //   });
      assert.strictEqual(convertHandler.convert(10, "mi"), 16.0934);
    });
    it("should correctly convert km to mi", function () {
      //   assert.deepEqual(convertHandler.convert(10, "km"), {
      //     initNum: 10,
      //     initUnit: "km",
      //     returnNum: 6.21373,
      //     returnUnit: "mi",
      //     string: "10 kilometers converts to 6.21373 miles",
      //   });
      assert.strictEqual(convertHandler.convert(10, "km"), 6.21373);
    });
    it("should correctly convert lbs to kg", function () {
      //   assert.deepEqual(convertHandler.convert(10, "lbs"), {
      //     initNum: 10,
      //     initUnit: "lbs",
      //     returnNum: 4.53592,
      //     returnUnit: "kg",
      //     string: "10 pounds converts to 4.53592 kilograms",
      //   });
      assert.strictEqual(convertHandler.convert(10, "lbs"), 4.53592);
    });
    it("should correctly convert kg to lbs", function () {
      //   assert.deepEqual(convertHandler.convert(10, "kg"), {
      //     initNum: 10,
      //     initUnit: "kg",
      //     returnNum: 22.04624,
      //     returnUnit: "lbs",
      //     string: "10 kilograms converts to 22.04624 pounds",
      //   });
      assert.strictEqual(convertHandler.convert(10, "kg"), 22.04624);
    });
  });
});
