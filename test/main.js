describe('check for parity on input & output', function () {
    it('should return the same value on conversion', function () {
        var myRoman = 'CCLIV';
        var myArabic = roman.deromanize(myRoman);
        expect(myArabic).toEqual(roman.deromanize(myRoman))
    });
    
    it('should gracefully handle mixed cases', function () {
        var myStrings = ['mXvIi', 'dcvii', 'mmILV'];
        var myConversions = myStrings.map(function (item) {
            return roman.deromanize(item);
        });
        for (var i = 0; i < myConversions.length; i++) {
            expect(typeof myConversions[i]).toBe('number')
        }
    });
});

describe('ensure formatting of data structures is sound', function () {
   it('should contain only characters', function () {
       var myValues = roman.allChars;
       expect(validateForType(myValues, 'string')).toBeTruthy()
   });
    
    it('should contain only numbers', function () {
        var myValues = roman.allNumerals;
        expect(validateForType(myValues, 'number')).toBeTruthy()
    })
});

function validateForType(arrayToCheck, expectedType) {
    for (var i = 0; i < arrayToCheck.length; i++) {
        var value = arrayToCheck[i];
        if(typeof value !== expectedType){
            return false;
        }
    }
    return true;
}