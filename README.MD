
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

Known unhandled cases:  
No integer - ',0'  
multiple commas - '199,99.99'  
