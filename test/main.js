describe('check for parity on input & output', function () {
    it("should return the same value on conversion", function () {
        var myRoman = "CCLIV";
        var myArabic = deromanize(myRoman);
        expect(myArabic).toEqual(deromanize(myRoman))
    });
    
    it("should gracefully handle mixed cases", function () {
        var myStrings = ["mXvIi", "dcvii", "mmILV"];
        var myConversions = myStrings.map(function (item) {
            return deromanize(item);
        });
        for (var i = 0; i < myConversions.length; i++) {
            expect(typeof myConversions[i]).toBe("number")
        }
    });
});
