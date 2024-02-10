
'use strict'

module.exports = function roundThreeDecimals (entry, comma, integer) {
  // HANDLE NUMBER NUMBER, THAT HAS OVER TWO DECIMALS
  // ON ERROR RETURN -0.00
  let output = '-0.00'
  // MAP THE INPUT
  , firstDecimal = entry[comma + 1]
  , secondDecimal = entry[comma + 2]
  // THIRD DECIMAL, OUR ONLY CONSTANT
  const thirdDecimal = entry[comma + 3]
  if (thirdDecimal >= 5) {
    // IF THE THIRD DECIMAL IS 5 OR BIGGER, ADD + 1 TO SECOND DECIMAL
    secondDecimal = Number(secondDecimal) + 1
    if (secondDecimal === 10) {
      // IF SECOND DECIMAL BECAME 10, MAKE IT A ZERO AND CALL THE MANAGER
      secondDecimal = 0
      firstDecimal = Number(firstDecimal) + 1
      if (firstDecimal === 10) {
        // IF THE FIRST DECIMAL BECAME 10, MAKE IT A ZERO AND INCREASE THE MAIN NUMBER
        firstDecimal = 0
        // IF DOES NOT START WITH -, EXPECT INPUT TO BE POSITIVE NUMBER
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
  output = String(integer) + '.' + firstDecimal + secondDecimal
  return output
}
