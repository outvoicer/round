const round = require('./index')

const tests = [
  [ 1.265, '1.27'],
  [ 1.999, '2.00'],
  [ 999.999, '1000.00' ],
  [ 0.008111, '0.01' ],
  [ 1, '1.00' ],
  [ 1.2, '1.20' ],
  [ '0,245', '0.25' ],
  [ 0.004999, '0.00'],
  [ 0.015001, '0.02'],
  [ -1.265, '-1.27' ],
  [ -2.001, '-2.00' ],
  [ -1.999, '-2.00' ],
  [ -2.999, '-3.00' ],
  [ '1.1000000000000000888', '1.10' ],
  [ '1.1999999999999999556', '1.20' ],
  [ -0.1111, '-0.11' ],
  [ -0.9375, '-0.94' ],
  [ -1111.001, '-1111.00' ],
  [ '0.11001100110011001100110011001100110011001100110011001101E1', '0.11' ],
  [ '0.0100', '0.01' ],
  [ -0.0100, '-0.01' ],
  [ -1111.001, '-1111.00' ],
  [ 12.345, '12.35' ],
  [ -12.345, '-12.35' ],
  [ 13.3451, '13.35' ],
  [ 23.4476, '23.45' ],
  [ '123,456', '123.46' ],
  [ undefined, '-0.00' ],
  [ '', '-0.00' ],
  [ 0.02, '0.02' ],
  [ 0.333333343, '0.33' ],
  [ 0.166666672, '0.17' ],
  [ 0.125, '0.13' ],
  [ 9999.994140625, '9999.99' ],
  [ 9999.9951171875, '10000.00' ],
  // CHAT GPT
  [ '1.264', '1.26' ],
  [ '1.265', '1.27' ],
  [ '1.266', '1.27' ],
  [ '1.261', '1.26' ],
  [ '1.269', '1.27' ],
  [ '1.26', '1.26' ],
  [ '1.27', '1.27' ],
  [ '1.275', '1.28' ],
  [ '1.28', '1.28' ],
  [ '1.285', '1.29' ],
  [ '1.29', '1.29' ],
  [ '1.295', '1.30' ],
  [ '1.30', '1.30' ],
  [ '1.305', '1.31' ],
  [ '1.31', '1.31' ],
  [ '1.315', '1.32' ],
  [ '1.32', '1.32' ],
  [ '1.325', '1.33' ],
  [ '1.33', '1.33' ],
  [ '1.264', '1.26' ],
  [ '1.265', '1.27' ],
  [ '1.266', '1.27' ],
  [ '-1.264', '-1.26' ],
  [ '-1.265', '-1.27' ],
  [ '-1.266', '-1.27' ],
  [ '0.004', '0.00' ],
  [ '0.005', '0.01' ],
  [ '0.006', '0.01' ],
  [ '-0.004', '-0.00' ],
  [ '-0.005', '-0.01' ],
  [ '-0.006', '-0.01' ],
  [ '2.499', '2.50' ],
  [ '2.500', '2.50' ],
  [ '2.501', '2.50' ],
  [ '-2.499', '-2.50' ],
  [ '-2.500', '-2.50' ],
  [ '-2.501', '-2.50' ],
  [ '9.995', '10.00' ],
  [ 'hello', '-0.00' ],
  [ [['1'], ['a']], '-0.00' ],
  [ {success: true}, '-0.00'],
  [ 0, '0.00'],
  [ '1,', '1.00'],
  [ '-1,', '-1.00'],
  [ -0.01, '-0.01'],
  [ '-0', '-0.00'],
  [ '-0.0', '-0.00'],
  [ '-0.00', '-0.00'],
  [ ',', '-0.00'],
  [ '0,0', '0.00'],
  [ '0', '0.00'],
  [ '59.1948', '59.19'],
  [ '4.4748', '4.47'],
  [ '3.456', '3.46' ],
  [ 0.005, '0.01' ],
  [ 1.009999, '1.01' ],
  [ 1.00499, '1.00'],
  [ 1.005, '1.01'],
  [ 1.105, '1.11'],
  [ 2.695, '2.70'],
  [ 8.00 + 1.60, '9.60'],
  [ 1.265 + 0.001, '1.27'],
  [ 0.7 + 0.1, '0.80'],
  // MULTIPLE COMMAS
  [ '33,333,9', '-0.00'],
  [ '33,333,900.987', '-0.00'],
  [ '33,333,900,987', '-0.00'],
  [ '33.333.900.987', '-0.00'],
  // NO INTEGER
  [ ',', '-0.00'],
  [ ' ', '-0.00'], // TRIMMED OUT
  [ , '-0.00'],  // NO INPUT AT ALL
  // WHITESPACE
  [ ' 123.465', '123.47'],
  [ '456.465 ', '456.47'],
  [ '1 000 000 000 ', '-0.00'],
  // IRREGULAR INPUT
  [ '€50', '-0.00'],
  [ '50%', '-0.00'],
  [ '12:30', '-0.00'],
  [ '700_000_000', '-0.00' ],
  [ '𑁖𑁔𑁗𑁙', '-0.00' ],
  [ '8. 501', '-0.00'],
  [ '8 .501', '-0.00'],
  [ '8 . 501', '-0.00'],
  [ '05.501', '05.50'], // TODO
  [ '05.501.23', '-0.00'],

  [ ',265', '-0.00'],
  [ ',26', '-0.00'],
  [ '.0', '-0.00'],
  [ ',0', '-0.00'],
  [ ',005', '-0.00'],
  [ '-,005', '-0.00'],
  [ '.2', '-0.00'],


//
/*
  // THESE TESTS CANNOT BE DISPLAYED, THE INPUT WILL BECOME 0 BEFORE IT REACHES THE FUNCTION
  [ -0, '-0.00'],
  [ -0.0, '-0.00'],
  [ -0.00, '-0.00'],
*/
//  [ console.log('trigger'), '-0.00' ],
]

function doTests(input, result) {
  if (round(input) === result) {
    let comment = false
    let type = typeof input
    if ( type === 'string') {
      comment = "✅ round('" + input + "') is '" + result + "'"
    } else if (type === 'number') {
      comment = "✅ round(" + input + ") is '" + result + "'"
    } else {
      comment = "✅ round(*" + input + "*) is '" + result + "'"
    }
    console.log(comment)
  } else {
    console.log('❌ ' + input +' should be ' + result + '. Is ' + round(input))
  }
}

for (let i = 0; i < tests.length; i++) {
  if (tests[i]) {
    doTests(tests[i][0], tests[i][1])
  } else {
    console.log('❌ missing input: ' + tests[i])
  }
}

// HANDLE SPECIAL CASES, WHICH CANNOT BE INVOKED FROM AN ARRAY
// LOOKS LIKE COMMA, BUT IS TWO INPUT PARAMS:
if (round(1,05) === '-0.00') {
  console.log("✅ round(1,05) is '-0.00'")
} else {
  console.log("❌ round(1,05) is not '-0.00'")
}

if (round(.2) === '0.20') {
  console.log("✅ round(.2) is '0.20'")
} else {
  console.log("❌ round(.2) is not '-0.20', but " + round(.2))
}
