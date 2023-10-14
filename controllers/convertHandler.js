function ConvertHandler() {

  this.getNum = function (input) {
    let result
    const regexNum = /^[^a-zA-Z]+/
    const regexSimpleNum = /\d+\.?\d*/
    const regexSlashNum = /\d+\.?\d*\/\d+\.?\d*/
    let num = input.match(regexNum)

    if (num != null) {
      num = num[0]
    }

    if (num == null) {
      result = 1
    } else if (num.match(regexSimpleNum) != num && num.match(regexSlashNum) != num) {
      result = false
    } else {
      result = eval(num)
    }

    return result
  }

  this.getUnit = function (input) {
    let result = false
    const regex = /[a-zA-Z].*/
    let unit = input.match(regex)
    const unitList = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']

    if (unit != null) {
      unit = unit[0]
    }

    if (unit != null) {
      for (i in unitList) {
        const regex = new RegExp(`${unitList[i]}`, 'i')

        if (unit == unit.match(regex)) {
          result = unitList[i]
        }
      }
    }

    return result
  }

  this.getReturnUnit = function (initUnit) {
    let result
    const unitList = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']

    for (i in unitList) {
      i = Number.parseInt(i)

      if (initUnit == unitList[i]) {
        if (i % 2 == 0) {
          result = unitList[i + 1]
        } else {
          result = unitList[i - 1]
        }
      }
    }

    return result
  }

  this.convert = function (initNum, initUnit) {
    let result
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934

    if (initUnit == 'gal') {
      result = initNum * galToL
    } else if (initUnit == 'L') {
      result = initNum / galToL
    } else if (initUnit == 'mi') {
      result = initNum * miToKm
    } else if (initUnit == 'km') {
      result = initNum / miToKm
    } else if (initUnit == 'lbs') {
      result = initNum * lbsToKg
    } else {
      result = initNum / lbsToKg
    }

    result = Number.parseFloat(result.toFixed(5))
    return result
  }

  this.spellOutUnit = function (name) {
    const shortToLong = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    }

    return shortToLong[name]
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result
  }

}

module.exports = ConvertHandler
