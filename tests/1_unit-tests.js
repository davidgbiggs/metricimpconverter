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
    it("should return the correct return unit for mi.", function () {
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
    });
    it("should return the correct return unit for km.", function () {
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
    });
    it("should return the correct return unit for gal.", function () {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });
    it("should return the correct return unit for L.", function () {
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
    });
    it("should return the correct return unit for lbs.", function () {
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    });
    it("should return the correct return unit for kg.", function () {
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
  });
  describe("spellOutUnit", function () {
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    });
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    });
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    });
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
    });
    it("should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    });
  });
});
