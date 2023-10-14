'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  app.get('/api/convert', (req, res) => {
    let data = req.query.input
    let answer
    const initNum = convertHandler.getNum(data)
    const initUnit = convertHandler.getUnit(data)

    if(!initNum && !initUnit){
      answer = 'invalid number and unit'
    } else if (!initNum){
      answer = 'invalid number'
    } else if (!initUnit){
      answer = 'invalid unit'
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      answer = { initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: string }
    }

    res.json(
      answer
    )
  })
};
