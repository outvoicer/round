
Library for rounding with two comma precision in JS for representation of monetary units.  

Performs half way up rounding (ties away from zero).  
Accepts JS Strings and Numbers as input.  
Exports result as a string with two comma precision.   
On error returns '-0.00'.  

```
round(1.265) // returns '1.27'
round(-1.265) // returns '-1.27'
```

Reasoning for the library is that JS native toFixed() uses bankers rounding and ties towards an even number.  

This can rarely, yet consistently cause surprising results:  

```
Number(1.265).toFixed(2) // returns 1.26
Numbeer(2.695).toFixed(2) // returns 2.69
```   

The other practical need for this library came from frontend often needing to convert Number 12.3 to '12.30'.  

Also my most suggested library for calculations in JS has a somewhat complex API and practically all I needed was rounding.  

## Usage    
```

// Number input
round(456.465)        // returns '456.47'  

// String input
round('-9.999')       // returns '-10.00'

// String input with ',' as comma
round('-1111,001')    // returns '-1111.00'

// Use with calculation
round( Number(subtotal) + Number(VAT) ) // returns rounded total  

```  
## Tests:
```
node test.js
// or with nodemon
npm run test
```

## Input that returns error:
round(0,05) is '-0.00'                // sending two parameters to the function  
round('.2') is '-0.00'                // Missing integer
round() is '-0.00'                    // undefined  
round('1 000 000 000 ') is '-0.00'    // Numbers with spaces  
round('33,333,900.987') is '-0.00'    // Multiple comma
round('700_000_000') is '-0.00'       // Numbers with _ as thousand separator  
round('8. 501') is '-0.00'            // numbers with spaces
round('€50') is '-0.00'               // Numbers with currency  
round('50%') is '-0.00'               // Numbers with %  
round('12:30') is '-0.00'             // Numbers that are time  
round('𑁖𑁔𑁗𑁙') is '-0.00'              // 5367 in Brahmi numberals  

## Notable exceptions:  
round(.2)                   // returns '0.20', because JS turns .2 into 0.2. Don't rely on it    
round('-0.00')              // returns '-0.00'    
round('-0.001')             // returns '-0.00'    
round(-0.00) is '0.00'      // because String(-0.00) returns '0'
round('05.501') is '05.50'  // technically correct
