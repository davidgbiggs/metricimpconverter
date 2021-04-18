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
      const validInputs = ["10mi", "10km", "10gal", "10L", "10lbs", "10kg"];
      const expected = ["mi", "km", "gal", "L", "lbs", "kg"];
      validInputs.forEach((el, i) => {
        assert.equal(convertHandler.getUnit(el), expected[i]);
      });
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
      const validInputs = ["mi", "km", "gal", "L", "lbs", "kg"];
      const expected = ["km", "mi", "L", "gal", "kg", "lbs"];
      validInputs.forEach((el, i) => {
        assert.equal(convertHandler.getReturnUnit(el), expected[i]);
      });
    });
  });
  describe("spellOutUnit", function () {
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      const validInputs = ["mi", "km", "gal", "L", "lbs", "kg"];
      const expected = [
        "miles",
        "kilometers",
        "gallons",
        "liters",
        "pounds",
        "kilograms",
      ];
      validInputs.forEach((el, i) => {
        assert.equal(convertHandler.spellOutUnit(el), expected[i]);
      });
    });
  });
  describe("convert", function () {
    it("should correctly convert gal to L", function () {
      assert.strictEqual(convertHandler.convert(10, "gal"), 37.8541);
    });
    it("should correctly convert L to gal", function () {
      assert.strictEqual(convertHandler.convert(10, "l"), 2.64172);
    });
    it("should correctly convert mi to km", function () {
      assert.strictEqual(convertHandler.convert(10, "mi"), 16.0934);
    });
    it("should correctly convert km to mi", function () {
      assert.strictEqual(convertHandler.convert(10, "km"), 6.21373);
    });
    it("should correctly convert lbs to kg", function () {
      assert.strictEqual(convertHandler.convert(10, "lbs"), 4.53592);
    });
    it("should correctly convert kg to lbs", function () {
      assert.strictEqual(convertHandler.convert(10, "kg"), 22.04624);
    });
  });
});
