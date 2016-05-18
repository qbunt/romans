'use strict';
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

    /**
     * takes in a floating point number, returns a roman numeral string
     * @param decimal
     * @returns {string}
     */
    function romanize(decimal) {
        var roman = '';
        for (var i = 0; i < allChars.length; i++) {
            while(decimal >= allNumerals[i]){
                decimal -= allNumerals[i];
                roman += allChars[i];
            }
        }
        return roman;
    }

    function deromanize(romanStr) {
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
        return arabic;
    }

    function init() {
        deriveCollections();
        console.info('started Romanize');
    }

    init();

    return {
        deromanize: deromanize,
        romanize: romanize,
        allChars: allChars,
        allNumerals: allNumerals
    }
})();
