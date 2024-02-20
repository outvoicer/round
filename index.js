
'use strict'

const overTwoDecimals = require('./overTwoDecimals')

module.exports = function round(input, secondParamater) {
  if (secondParamater) {
    // HANDLE PURE COMMA INPUT round(0,05)
    return '-0.00'
  }
  /*
    PPEPARE input
  */
  let output = '-0.00'
  // MAKE SURE 0 IS NOT HANDLED AS false
  if (input === 0) {
    input = '0.00'
  }
  // MAKE INPUT TO A STRING, TRIM IT AND REPLACE ',' WITH '.' JUST IN CASE
  const entry = String(input).trim().replace(',', '.')
  if (isNaN(entry)) {
    // AND RETURN WITH "ERROR" IF IT AIN'T A NUMBER
    return '-0.00'
  }
  // FIND COMMA POSITION
  const comma = entry.indexOf('.')
  // INTEGER IS WHOLE NUMBER, DATA BERFORE THE COMMA
  let integer = entry.substring(0, comma)
  let zero = ''
  if (comma > -1) {
    // COMMA EXISTS
    if (comma === 0) {
      // BUT THERE IS NO NUMBER BEFORE COMMA (,254)
      // WE ASSIME IT'S A ZERO
      integer = '0'
      // FOR CASES WHEN INTEGER IS NOT USED:
      zero = '0'
    }
    /*
      PERFORM ROUNDING
    */
    // BUT HOW MANY DECIMALS DO WE HAVE?
    const decimals = entry.length - comma - 1
    if (decimals > 2) {
      // HAS OVER TWO DECIMALS
      output = overTwoDecimals(entry, comma, integer)
    } else if (decimals === 2) {
      // HAS TWO DECIMALS, EVERYTHING IS PERFECT
      output = zero + entry
    } else if (decimals === 1) {
      // IT HAS 1 DECIMAL, ADD A ZERO TO IT
      output = zero + entry + '0'
    } else {
      // ZERO PLACE AFTER COMMA, PRESUMABLY '1,'
      output = integer + '.00'
    }
  } else {
    // NO COMMA
    if (input == undefined) {
      // NO INPUT
      output = '-0.00'
    } else if (input == '') {
      // NO INPUT
      output = '-0.00'
    } else {
      if (entry) {
        // NORMAL NUMBER WITHOUT COMMA - LIKE 42
        output = entry + '.00'
      } else {
        // FOR EVERYTHING ELSE
        output = '-0.00'
      }
    }
  }
  return output
}
