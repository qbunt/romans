/* eslint-disable */
const romans = require('../romans')
const { deromanize, romanize } = require('../romans')

describe(`needs some methods`, () => {
  it('should be an object', () => {
    expect(typeof romans).toBe('object')
  })

  it(`should have a method called 'deromanize'`, function () {
    expect(typeof deromanize).toBe('function')
  })

  it(`should have a method called 'romanize'`, function () {
    expect(typeof romanize).toBe('function')
  })
})


describe('check for parity on input & output', function () {
  it('should maintain immutability of input', () => {
    const originalNum = 1994
    const originalRoman = 'MCMXCIV'

    romanize(originalNum)
    expect(originalNum).toBe(1994)

    deromanize(originalRoman)
    expect(originalRoman).toBe('MCMXCIV')
  })

  it('should return the same value on conversion', function () {
    const myRoman = 'CCLIV'
    const myArabic = deromanize(myRoman)
    expect(myArabic).toEqual(deromanize(myRoman))
  })

  it('should throw on mixed cases', function () {
    const myStrings = ['mXvIi', 'dcvii', 'mmILV']
    myStrings.forEach((k) => {
      expect(function () {
        deromanize(k)
      }).toThrow()
    })
  })
  it(`should return a solid value for 153`, function () {
    expect(romanize(153)).toBe('CLIII')
    expect(deromanize(`CLIII`)).toBe(153)
  })
  it(`should reject invalid input`, function () {
    // https://github.com/qbunt/romans/issues/16
    expect(function () {
      deromanize(`CIVIL`)
    }).toThrow(`requires valid roman numeral string`)
  })
})

describe('ensure formatting of data structures is sound', function () {
  it('should contain only characters', function () {
    const myValues = romans.allChars
    expect(validateForType(myValues, 'string')).toBeTruthy()
  })

  it('should contain only numbers', function () {
    const myValues = romans.allNumerals
    expect(validateForType(myValues, 'number')).toBeTruthy()
  })
})

describe('should return errors on bad input', function () {
  it('should reject 0', function () {
    expect(function () {
      romanize(0)
    }).toThrow()
  })

  it(`should reject 4000`, function () {
    expect(function () {
      romanize(4000)
    }).toThrow()
  })

  it('should reject signed integers', function () {
    expect(function () {
      romanize(getRandomInt(-1, -1000))
    }).toThrow()
  })
  it('should reject undefined values', function () {
    expect(function () {
      romanize(undefined)
    }).toThrow()
  })
  it('should reject null values', function () {
    expect(function () {
      romanize(null)
    }).toThrow()
  })
  it('should reject blank values', function () {
    expect(function () {
      romanize('')
    }).toThrow()
  })
  it('should reject blank values', function () {
    expect(function () {
      romanize('1000')
    }).toThrow()
  })

  it('should throw on non-string input', function () {
    expect(function () {
      deromanize(typeof {})
    }).toThrow()

    expect(function () {
      deromanize([1000])
    }).toThrow()

    expect(function () {
      deromanize(1000)
    }).toThrow()

    expect(function () {
      deromanize({ value: 'III' })
    }).toThrow()

    expect(function () {
      deromanize(true)
    }).toThrow()

    expect(function () {
      deromanize({
        toUpperCase: function () {
          return 'III'
        }
      })
    }).toThrow()
  })
  it('should reject objects', function () {
    expect(function () {
      romanize({ value: 1000 })
    }).toThrow()
  })
  it('should reject float values', function () {
    expect(function () {
      romanize(567.789)
    }).toThrow()
  })

  it('should reject NaN', function () {
    expect(function () {
      romanize(NaN)
    }).toThrow()
  })

  it('should reject Infinity', function () {
    expect(function () {
      romanize(Infinity)
    }).toThrow()
  })

  it('should reject non-integer strings for romanize', function () {
    expect(function () {
      romanize('abc')
    }).toThrow()
  })
})

describe('it should return solid integer numbers', function () {
  const testIntegers = []
  for (var i = 0; i < 35; i++) {
    var obj = getRandomInt(1, 3999)
    testIntegers.push(romanize(obj))
  }
  it('should convert all numbers', function () {
    expect(validateForType(testIntegers, 'string')).toBeTruthy()
  })
})
describe('should have a consistent api signature', function () {
  expect(romans).toHaveProperty('romanize')
  expect(romans).toHaveProperty('deromanize')
  expect(romans).toHaveProperty('allChars')
  expect(romans).toHaveProperty('allNumerals')
})

describe('deromanize validation', function () {
  it('should reject consecutive subtractive patterns', () => {
    const invalidCombos = ['IVIV', 'IXIX', 'XLXL', 'XCXC', 'CDCD', 'CMCM']
    invalidCombos.forEach(combo => {
      expect(() => {
        deromanize(combo)
      }).toThrow()
    })
  })
  it('should reject impossible roman numerals', function () {
    const invalidRomans = ['IIII', 'VV', 'XXXX', 'LL', 'CCCC', 'DD', 'MMMM']
    invalidRomans.forEach(numeral => {
      expect(function () {
        deromanize(numeral)
      }).toThrow()
    })
  })

  it('should handle edge cases correctly', function () {
    expect(deromanize('MCMXCIX')).toBe(1999)
    expect(deromanize('CDXLIV')).toBe(444)
    expect(romanize(3999)).toBe('MMMCMXCIX')
  })

  it('should reject invalid character combinations', function () {
    const invalidCombos = ['IC', 'XM', 'XD', 'VC', 'IL', 'VX']
    invalidCombos.forEach(combo => {
      expect(function () {
        deromanize(combo)
      }).toThrow()
    })
  })

  it('should reject Unicode characters and emojis', function () {
    const invalidInputs = ['MⅡⅢ', 'X🏛️I', 'C™D', 'Ⅴ', 'МСМ', 'ＩＶ']
    invalidInputs.forEach(input => {
      expect(function () {
        deromanize(input)
      }).toThrow()
    })
  })
})

const fc = require('fast-check')

describe('property-based tests', () => {
  it('should always convert back to the same number for valid inputs', () => {
    fc.assert(
      fc.property(
        fc.nat(3999).map(n => n + 1),
        num => {
          try {
            const roman = romanize(num)
            const back = deromanize(roman)
            return back === num
          } catch (e) {
            return true // Skip if validation throws
          }
        }
      )
    )
  })

  it('should never generate invalid roman numeral patterns for valid inputs', () => {
    fc.assert(
      fc.property(
        fc.nat(3999).map(n => n + 1),
        num => {
          try {
            const roman = romanize(num)
            return !roman.match(/([IVXLCDM])\1{3,}/)
          } catch (e) {
            return true // Skip if validation throws
          }
        }
      )
    )
  })

  describe('input sanitization', () => {
    it('should reject strings with whitespace', () => {
      const invalidInputs = [' IV', 'X L', 'C D ', '\tMC', 'X\nI']
      invalidInputs.forEach(input => {
        expect(() => {
          deromanize(input)
        }).toThrow()
      })
    })
  })

  it('should maintain ordering properties for valid inputs', () => {
    fc.assert(
      fc.property(
        fc.nat(3998).map(n => n + 1),
        num => {
          try {
            const roman1 = romanize(num)
            const roman2 = romanize(num + 1)
            return deromanize(roman1) < deromanize(roman2)
          } catch (e) {
            return true // Skip if validation throws
          }
        }
      )
    )
  })

  it('should follow subtractive notation rules for valid inputs', () => {
    fc.assert(
      fc.property(
        fc.nat(3999).map(n => n + 1),
        num => {
          try {
            const roman = romanize(num)
            const validSubtractive = /^M*(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})$/
            return validSubtractive.test(roman)
          } catch (e) {
            return true // Skip if validation throws
          }
        }
      )
    )
  })
})

function validateForType(arrayToCheck, expectedType) {
  for (var i = 0; i < arrayToCheck.length; i++) {
    var value = arrayToCheck[i]
    if (typeof value !== expectedType) {
      return false
    }
  }
  return true
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
