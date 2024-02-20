
'use strict'

const overTwoDecimals = require('./overTwoDecimals')

module.exports = function round(input, secondParam) {
  /*
    ERROR HANDLING
  */
  if (secondParam) {
    // HANDLE PURE COMMA INPUT ERROR LIKE round(0,05)
    return '-0.00'
  }
  // MAKE SURE 0 IS NOT HANDLED AS false
  if (input === 0) {
    input = '0.00'
  }
  // MAKE SURE TYPE IS STRING OR NUMBER
  const type = typeof input
  if (type !== 'string' && type !== 'number') {
    return '-0.00'
  }
  /*
    PPEPARE input
  */
  let output = '-0.00'
  // MAKE INPUT TO A STRING, TRIM IT AND REPLACE ',' WITH '.' JUST IN CASE
  const entry = String(input).trim().replace(',', '.')
  if (isNaN(entry)) {
    // IF IT'S STILL NOT A NUMBER, THEN RETURN ERROR
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
      // COMMA IS FIRST ERROR round('.265')
      return '-0.00'
    }
    if (comma === 1 && integer === '-') {
      // COMMA IS FIRST NEGATIVE NUMBER ERROR round('-.265')
      return '-0.00'
    }
    /*
      PERFORM ROUNDING
    */
    // HOW MANY DECIMALS DO WE HAVE AFTER COMMA?
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
