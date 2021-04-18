"use strict";

const express = require("express");
const app = express();

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", function (req, res) {
    const input = req.query.input;
    let initUnit;
    let initNum;

    try {
      initUnit = convertHandler.getUnit(input);
      initNum = convertHandler.getNum(input);

      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);

      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({
        initNum,
        initUnit,
        returnNum: parseFloat(returnNum),
        returnUnit,
        string,
      });
    } catch (error) {
      if (error.message === "invalid unit") {
        try {
          convertHandler.getNum(input);
          res.send("invalid unit");
        } catch (secondError) {
          res.send("invalid number and unit");
        }
      } else {
        res.send("invalid number");
      }
    }
  });
};
