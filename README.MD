
Library for safer rounding with two comma precision in JS for calculations representing monetary units.  

Performs half way up rounding (ties away from zero):  
Exports the number always as a string with two comma precision.   
On error rounds to '-0.00'.  

```
round(1.265) // returns '1.27'
round(-1.265) // returns '-1.27'
```

Reasoning for the library is that native toFixed() uses bankers rounding and ties towards an even number:  

```
Number(1.265).toFixed(2) // which returns 1.26
```

General logic  
This library, makes the input to string, trims it and replaces the first ',' with a '.'.  
Then it:  
performs a isNaN test,  
finds the position of comma (or let's say '.'),
and then performs the rounding operations based on number of decimals after comma.    

## Tests:
```
node test.js
// or with nodemon
npm run test
```

## Errors
Generally everything, that isNaN returns error ('-0.00'):   
✅ '', is -0.00               // empty entry  
✅ ',' is -0.00               // only comma  
✅   is -0.00                 // undefined  
✅ undefined is -0.00         // undefined  
✅ 33,333,900.987 is -0.00    // multiple commas is NaN  
✅ 'hello' is -0.00           // string is NaN  
✅ 1,a is -0.00               // input is NaN  
✅ [object Object] is -0.00   // object is NaN  
✅ '1 000 000 000'  is -0.00  // Numbers with spaces  
✅ €50 is -0.00               // Numbers with currency  
✅ 50% is -0.00               // Numbers with %  
✅ 12:30 is -0.00             // Numbers that are time  

Interesting exeptions:  
✅ '-0.00' is -0.00          // input '-0.00' also returns '-0.00'
✅ -0.00 is 0.00             // but -0.00 returns 0.00, as JS turns it into 0 in the process
