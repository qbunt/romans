# romans
A no dependency, simple lib for converting from decimal notation to roman numerals and back again

## Usage:
```
var roman = require('romanize');
roman.romanize(454);
// returns:"CDLIV"

roman.deromanize("CDLIV")
//returns: 454

roman.allNumerals
// property containing [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ]

roman.allChars
// property containing all roman numeral characters
// [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ]
```

## Tests:
```
npm test
```