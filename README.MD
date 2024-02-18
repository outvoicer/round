
Library for rounding with two comma precision in JS for representation of monetary units.  

Performs half way up rounding (ties away from zero).  
Exports the number as a string with two comma precision.   
On error returns '-0.00'.  

```
round(1.265) // returns '1.27'
round(-1.265) // returns '-1.27'
```

Reasoning for the library is that JS native toFixed() uses bankers rounding and ties towards an even number:  

```
Number(1.265).toFixed(2) // which returns 1.26
```   

The other practical need for this library came from frontend often needing to convert Number 12.3 to '12.30'.  

Also my most suggested library for calculations in JS has a somewhat complex API, and practically all I needed was rounding.  

## Usage    
```
round('456.465')                        // returns '456.47'  
round(Number(subtotal) + Number(VAT))   // returns total  
```  

## General logic  

This library transforms the input to string,  
trims it,  
replaces the first ',' with a '.'  

Then it:  
performs isNaN test,  
finds the position of comma,  
and performs the rounding operation.      

## Tests:
```
node test.js
// or with nodemon
npm run test
```

## Errors
Generally all isNaN input returns error ('-0.00'):   
✅ '', is '-0.00'               // empty entry  
✅ ',' is '-0.00'               // only comma  
✅   is '-0.00'                 // undefined  
✅ undefined is '-0.00'         // undefined  
✅ 33,333,900.987 is '-0.00'    // multiple commas is NaN  
✅ 'hello' is '-0.00'           // string is NaN  
✅ 1,a is '-0.00'               // input is NaN  
✅ [object Object] is '-0.00'   // object is NaN  
✅ '1 000 000 000'  is '-0.00'  // Numbers with spaces  
✅ €50 is '-0.00'               // Numbers with currency  
✅ 50% is '-0.00'               // Numbers with %  
✅ 12:30 is '-0.00'             // Numbers that are time  
✅ 700_000_000 is '-0.00'       // Numbers with _ as thousand separator  
✅ 𑁖𑁔𑁗𑁙 is '-0.00'              // 5367 in Brahmi numberals is also NaN  

Interesting exeptions:  
✅ '-0.00' is '-0.00'          // input '-0.00' also returns '-0.00'  
✅ -0.00 is '0.00'             // but -0.00 returns 0.00, as JS seams to turn -0 into 0 in  transit
