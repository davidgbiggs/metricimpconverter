function ConvertHandler() {
  this.unitConversions = new Map();

  this.unitConversions.set("gal", {
    conversion: "L",
    spelledOut: "gallons",
    conversionRatio: 3.78541,
  });
  this.unitConversions.set("l", {
    conversion: "gal",
    spelledOut: "liters",
    conversionRatio: 0.264172,
  });
  this.unitConversions.set("mi", {
    conversion: "km",
    spelledOut: "miles",
    conversionRatio: 1.60934,
  });
  this.unitConversions.set("km", {
    conversion: "mi",
    spelledOut: "kilometers",
    conversionRatio: 0.621373,
  });
  this.unitConversions.set("lbs", {
    conversion: "kg",
    spelledOut: "pounds",
    conversionRatio: 0.453592,
  });
  this.unitConversions.set("kg", {
    conversion: "lbs",
    spelledOut: "kilograms",
    conversionRatio: 2.204624,
  });

  this.getNum = function (input) {
    const matches = input.match(/(\d\.{0,}\d{0,})/g);
    let result;

    if (!matches) {
      result = 1;
    } else if (matches.length >= 3 || input.split("/").length > 2) {
      throw new Error("invalid number");
    } else if (matches.length === 2) {
      result = Number.parseFloat(matches[0]) / Number.parseFloat(matches[1]);
    } else {
      result = Number.parseFloat(matches[0]);
    }

    return +Number.parseFloat(result).toFixed(5);
  };

  this.getUnit = function (input) {
    let match = input.match(/[A-Za-z]+$/);
    if (this.unitConversions.has(match[0].toLowerCase())) {
      return /^[lL]$/.test(match[0])
        ? match[0].toUpperCase()
        : match[0].toLowerCase();
    } else {
      throw new Error("invalid unit");
    }
  };

  this.getReturnUnit = function (initUnit) {
    return this.unitConversions.get(initUnit.toLowerCase()).conversion;
  };

  this.spellOutUnit = function (unit) {
    return this.unitConversions.get(unit.toLowerCase()).spelledOut;
  };

  this.convert = function (initNum, initUnit) {
    const conversionRatio = this.unitConversions.get(initUnit.toLowerCase())
      .conversionRatio;
    return (float = parseFloat((initNum * conversionRatio).toFixed(5)));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
