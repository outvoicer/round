
'use strict'

module.exports = function round(input) {
  // INPUT: '1.265', OUTPUT: '1.27'
  // INPUT IS A NUMBER, POSSIBLY WITH COMMA
  // OUTPUT USES HALF WAY UP ROUNDING (TIES AWAY FROM ZERO) UNLIKE toFixed(), WHICH USES BANKERS ROUNDING
  // AND EXPORTS STRINGED VERSION OF NUMBER WITH TWO DECIMAL PRECISION,
  // AS ONE MIGHT EXPECT FROM THE REPRESENTATION OF MONEY
  let output = false
  // DETERMINE, IF NUMBER STARTS WITH A MINUS
  const negative = String(input).indexOf('-') === 0
  const positive = !negative
  // MAKE INPUT TO A STRING, AND REPLACE ',' WITH '.' JUST IN CASE
  const entry = String(input).replace(',', '.')
  // WHERE IS COMMA?
  const comma = entry.indexOf('.')
  if (comma > -1) {
    // COMMA EXISTS
    // BUT HOW MANY DECIMALS DO WE HAVE?
    const decimals = entry.length - comma - 1
    if (decimals > 2) {
      // IF OVER TWO DECIMALS, MAP THE INPUT
      let number = entry.substring(0, comma)
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
            if (positive) {
              // IF IT'S POSITIVE, COUNT UP
              number = Number(number) + 1
            } else {
              // IF IT'S NEGATIVE, COUNT DOWN
              number = Number(number) - 1
            }
          }
        }
      }
      // COMPOSE THE ROUNDED NUMBER
      output = String(number) + '.' + firstDecimal + secondDecimal
    } else if (decimals === 2) {
      // IT HAS TWO DECIMALS, EVERYTHING IS PERFECT
      output = entry
    } else if (decimals === 1) {
      // IT HAS 1 DECIMAL, ADD A ZERO TO IT
      output = entry + '0'
    }
  } else {
    // NO COMMA
    if (input == undefined) {
      output = '-0.00'
    } else if (input == '') {
      output = '-0.00'
    } else {
      output = entry + '.00'
    }
  }
  return output
}
