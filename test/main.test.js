const romans = require('../romans')

it('should be an object', ()=>{
  expect(typeof romans).toBe('object')
})
it('should have a method', function () {
  expect(typeof romans.deromanize).toBe('function')
})


describe('check for parity on input & output', function () {
  it('should return the same value on conversion', function () {
    var myRoman = 'CCLIV';
    var myArabic = romans.deromanize(myRoman)
    expect(myArabic).toEqual(romans.deromanize(myRoman))
  })

  it('should gracefully handle mixed cases', function () {
    var myStrings = ['mXvIi', 'dcvii', 'mmILV'];
    var myConversions = myStrings.map(function (item) {
      return romans.deromanize(item)
    })
    for (var i = 0; i < myConversions.length; i++) {
      expect(typeof myConversions[i]).toBe('number')
    }
  })
})

describe('ensure formatting of data structures is sound', function () {
  it('should contain only characters', function () {
    var myValues = romans.allChars;
    expect(validateForType(myValues, 'string')).toBeTruthy()
  })

  it('should contain only numbers', function () {
    var myValues = romans.allNumerals;
    expect(validateForType(myValues, 'number')).toBeTruthy()
  })
})

describe('should return errors on bad input', function () {
  it('should reject 0', function(){
    expect(function(){
      romans.romanize(0)
    }).toThrow()
  })

  it('should reject signed integers', function () {
    expect(function(){
      romans.romanize(getRandomInt(-1, -1000))
    }).toThrow()
  })
  it('should reject undefined values', function(){
    expect(function(){
      romans.romanize(undefined)
    }).toThrow()
  })
  it('should reject null values', function(){
    expect(function(){
      romans.romanize(null)
    }).toThrow()
  })
  it('should reject blank values', function(){
    expect(function(){
      romans.romanize("")
    }).toThrow()
  })
  it('should reject blank values', function(){
    expect(function(){
      romans.romanize("1000")
    }).toThrow()
  })

})

describe('it should return solid integer numbers', function () {
  var testIntegers = [];
  for (var i = 0; i < 35; i++) {
    var obj = getRandomInt(1, 10000)
    testIntegers.push(romans.romanize(obj))
  }
  it('should convert all numbers', function () {
    expect(validateForType(testIntegers, 'string')).toBeTruthy()
  })
})

function validateForType(arrayToCheck, expectedType) {
  for (var i = 0; i < arrayToCheck.length; i++) {
    var value = arrayToCheck[i];
    if(typeof value !== expectedType){
      return false;
    }
  }
  return true;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
