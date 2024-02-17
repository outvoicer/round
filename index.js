
'use strict'

const roundThreeDecimals = require('./roundThreeDecimals')

module.exports = function round(input) {
  // INPUT: '1.265', OUTPUT: '1.27' OR '-0.00' ON ERROR
  let output = '-0.00'
  if (input === 0) {
    // MAKE SURE 0 IS NOT HANDLED AS false
    input = '0.00'
  }
  // MAKE INPUT TO A STRING, TRIM IT AND REPLACE ',' WITH '.' JUST IN CASE
  const entry = String(input).trim().replace(',', '.')

  // DETERMINE IF IT'S A NUMBER
  const notNumber = isNaN(entry)
  if (notNumber) {
    // AND RETURN WITH "ERROR"
    return '-0.00'
  }
  // FIND COMMA POSITION
  const comma = entry.indexOf('.')
  // INTEGER IS WHOLE NUMBER, DATA BERFORE THE COMMA
  let integer = entry.substring(0, comma)
  if (comma > -1) {
    // COMMA EXISTS
    // HANDLE POSSIBLE MISSING INTEGER FIRST
    let zero = ''
    if (comma === 0) {
      // NUMBER STARTS WITH COMMA, ADD INTEGER
      integer = '0'
      zero = '0'
    }
    // BUT HOW MANY DECIMALS DO WE HAVE?
    const decimals = entry.length - comma - 1
    if (decimals > 2) {
      // HAS OVER TWO DECIMALS
      output = roundThreeDecimals(entry, comma, integer)
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
