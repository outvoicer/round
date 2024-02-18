
'use strict'

module.exports = function roundOverTwoDecimals (entry, comma, integer) {
  // HANDLE NUMBER, THAT HAS OVER TWO DECIMALS AFTER COMMA
  // ON ERROR RETURN -0.00
  let output = '-0.00'
  // MAP THE INPUT
  , first = entry[comma + 1]
  , second = entry[comma + 2]
  // THIRD DECIMAL, OUR ONLY CONSTANT
  const third = entry[comma + 3]
  if (third >= 5) {
    // IF THE THIRD DECIMAL IS 5 OR BIGGER, ADD + 1 TO SECOND DECIMAL
    second = Number(second) + 1
    if (second === 10) {
      // IF SECOND DECIMAL BECAME 10, MAKE IT A ZERO AND CALL THE MANAGER
      second = 0
      first = Number(first) + 1
      if (first === 10) {
        // IF THE FIRST DECIMAL BECAME 10, MAKE IT A ZERO AND INCREASE THE MAIN NUMBER
        first = 0
        // IS NUMBER POSITIVE OR NEGATIVE
        const positive = entry.indexOf('-') !== 0
        if (positive) {
          // IF IT'S POSITIVE, COUNT UP
          integer = Number(integer) + 1
        } else {
          // IF IT'S NEGATIVE, COUNT DOWN
          integer = Number(integer) - 1
        }
      }
    }
  }
  // COMPOSE THE ROUNDED NUMBER
  output = String(integer) + '.' + first + second
  return output
}
