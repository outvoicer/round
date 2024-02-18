
'use strict'

const roundOverTwoDecimals = require('./roundOverTwoDecimals')

module.exports = function round(input) {
  /*
    PPEPARE input
  */
  let output = '-0.00'
  if (input === 0) {
    // MAKE SURE 0 IS NOT HANDLED AS false
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
  // COMMA EXISTS
  if (comma > -1) {
    if (comma === 0) {
      // HANDLE MISSING INTEGER EXCEPTION (,254) FIRST
      // SET INTEGER AS ZERO
      integer = '0'
      // ADD A ZERO BEFORE ENTRY FOR CASES WHERE INTEGER IS NOT USED
      zero = '0'
    }
    /*
      PERFORM ROUNDING
    */
    // BUT HOW MANY DECIMALS DO WE HAVE?
    const decimals = entry.length - comma - 1
    if (decimals > 2) {
      // HAS OVER TWO DECIMALS
      output = roundOverTwoDecimals(entry, comma, integer)
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
      output = '-0.00'
    } else if (input == '') {
      output = '-0.00'
    } else {
      if (entry) {
        output = entry + '.00'
      } else {
        output = '-0.00'
      }
    }
  }
  return output
}
