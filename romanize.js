"use strict";
var roman = (function(){
    var roman_map = {
        'M': 1000, 'CM': 900, 'D': 500, 'CD': 400, 'C': 100, 'XC': 90, 'L': 50, 'XL': 40, 'X': 10, 'IX': 9, 'V': 5, 'IV': 4, 'I': 1};

    var allChars = [];
    var allNumerals = [];

    /**
     * splits the object hash into several useful parts
     */
    function deriveCollections() {
        for(var character in roman_map){
            allChars.push(character);
        }

        for(var numeral in roman_map){
            allNumerals.push(roman_map[numeral]);
        }
    }

    function romanize(decimal) {
        console.time('roman:');
        var roman = '';
        for (var i = 0; i < allChars.length; i++) {
            while(decimal >= allNumerals[i]){
                decimal -= allNumerals[i];
                roman += allChars[i];
            }
        }
        console.timeEnd('roman:');
        return roman;
    }

    function deromanize(romanStr) {
        console.time('arabicize:');
        var romanString = romanStr.toUpperCase();
        var arabic = 0;
        var iteration = romanString.length;
        while(iteration--){
            var cumulative = roman_map[romanString[iteration]];
            if ( cumulative < roman_map[romanString[iteration+1]] ){
                arabic -= cumulative;
            } else {
                arabic += cumulative;
            }
        }
        console.timeEnd('arabicize:');
        return arabic;
    }
    deriveCollections();

    return {
        deromanize: deromanize,
        romanize: romanize
    }
})();
