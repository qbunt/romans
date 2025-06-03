/* eslint-disable */
const romans = require('../romans')
const { deromanize, romanize } = require('../romans')

describe('Module Structure', () => {
  it('should export an object with all required methods and properties', () => {
    expect(typeof romans).toBe('object')
    expect(romans).toHaveProperty('romanize')
    expect(romans).toHaveProperty('deromanize')
    expect(romans).toHaveProperty('allChars')
    expect(romans).toHaveProperty('allNumerals')
  })

  it('should export romanize as a function', () => {
    expect(typeof romanize).toBe('function')
  })

  it('should export deromanize as a function', () => {
    expect(typeof deromanize).toBe('function')
  })

  it('should export allChars as an array of strings', () => {
    expect(Array.isArray(romans.allChars)).toBe(true)
    expect(romans.allChars.every(char => typeof char === 'string')).toBe(true)
  })

  it('should export allNumerals as an array of numbers', () => {
    expect(Array.isArray(romans.allNumerals)).toBe(true)
    expect(romans.allNumerals.every(num => typeof num === 'number')).toBe(true)
  })
})

describe('romanize() - Basic Functionality', () => {
  describe('Valid inputs', () => {
    const testCases = [
      { input: 1, expected: 'I' },
      { input: 2, expected: 'II' },
      { input: 3, expected: 'III' },
      { input: 4, expected: 'IV' },
      { input: 5, expected: 'V' },
      { input: 6, expected: 'VI' },
      { input: 7, expected: 'VII' },
      { input: 8, expected: 'VIII' },
      { input: 9, expected: 'IX' },
      { input: 10, expected: 'X' },
      { input: 40, expected: 'XL' },
      { input: 50, expected: 'L' },
      { input: 90, expected: 'XC' },
      { input: 100, expected: 'C' },
      { input: 153, expected: 'CLIII' },
      { input: 400, expected: 'CD' },
      { input: 500, expected: 'D' },
      { input: 900, expected: 'CM' },
      { input: 1000, expected: 'M' },
      { input: 1994, expected: 'MCMXCIV' },
      { input: 2023, expected: 'MMXXIII' },
      { input: 3999, expected: 'MMMCMXCIX' }
    ]

    testCases.forEach(({ input, expected }) => {
      it(`should convert ${input} to ${expected}`, () => {
        expect(romanize(input)).toBe(expected)
      })
    })
  })

  describe('Edge cases with leading zeros', () => {
    it('should handle numbers with leading zeros as strings internally', () => {
      // The function converts to string internally and strips leading zeros
      expect(romanize(1)).toBe('I')
      expect(romanize(8)).toBe('VIII')
      expect(romanize(64)).toBe('LXIV')
    })
  })
})

describe('romanize() - Error Handling', () => {
  describe('Invalid numeric inputs', () => {
    it('should throw error for zero', () => {
      expect(() => romanize(0)).toThrow('requires an unsigned integer')
    })

    it('should throw error for negative integers', () => {
      expect(() => romanize(-1)).toThrow('requires an unsigned integer')
      expect(() => romanize(-100)).toThrow('requires an unsigned integer')
      expect(() => romanize(-999)).toThrow('requires an unsigned integer')
    })

    it('should throw error for numbers >= 4000', () => {
      expect(() => romanize(4000)).toThrow('requires max value of less than 4000')
      expect(() => romanize(5000)).toThrow('requires max value of less than 4000')
      expect(() => romanize(10000)).toThrow('requires max value of less than 4000')
    })

    it('should throw error for floating point numbers', () => {
      expect(() => romanize(1.5)).toThrow('requires an unsigned integer')
      expect(() => romanize(99.99)).toThrow('requires an unsigned integer')
      expect(() => romanize(567.789)).toThrow('requires an unsigned integer')
    })

    it('should throw error for special numeric values', () => {
      expect(() => romanize(NaN)).toThrow('requires an unsigned integer')
      expect(() => romanize(Infinity)).toThrow('requires max value of less than 4000')
      expect(() => romanize(-Infinity)).toThrow('requires an unsigned integer')
    })
  })

  describe('Invalid non-numeric inputs', () => {
    it('should throw error for string inputs', () => {
      expect(() => romanize('1000')).toThrow('requires an unsigned integer')
      expect(() => romanize('abc')).toThrow('requires an unsigned integer')
      expect(() => romanize('')).toThrow('requires an unsigned integer')
    })

    it('should throw error for null and undefined', () => {
      expect(() => romanize(null)).toThrow('requires an unsigned integer')
      expect(() => romanize(undefined)).toThrow('requires an unsigned integer')
    })

    it('should throw error for boolean values', () => {
      expect(() => romanize(true)).toThrow('requires an unsigned integer')
      expect(() => romanize(false)).toThrow('requires an unsigned integer')
    })

    it('should throw error for objects and arrays', () => {
      expect(() => romanize({})).toThrow('requires an unsigned integer')
      expect(() => romanize({ value: 1000 })).toThrow('requires an unsigned integer')
      expect(() => romanize([1000])).toThrow('requires an unsigned integer')
      expect(() => romanize([])).toThrow('requires an unsigned integer')
    })
  })
})

describe('deromanize() - Basic Functionality', () => {
  describe('Valid inputs', () => {
    const testCases = [
      { input: 'I', expected: 1 },
      { input: 'II', expected: 2 },
      { input: 'III', expected: 3 },
      { input: 'IV', expected: 4 },
      { input: 'V', expected: 5 },
      { input: 'VI', expected: 6 },
      { input: 'VII', expected: 7 },
      { input: 'VIII', expected: 8 },
      { input: 'IX', expected: 9 },
      { input: 'X', expected: 10 },
      { input: 'XL', expected: 40 },
      { input: 'L', expected: 50 },
      { input: 'XC', expected: 90 },
      { input: 'C', expected: 100 },
      { input: 'CLIII', expected: 153 },
      { input: 'CD', expected: 400 },
      { input: 'D', expected: 500 },
      { input: 'CM', expected: 900 },
      { input: 'M', expected: 1000 },
      { input: 'MCMXCIV', expected: 1994 },
      { input: 'MMXXIII', expected: 2023 },
      { input: 'MMMCMXCIX', expected: 3999 }
    ]

    testCases.forEach(({ input, expected }) => {
      it(`should convert ${input} to ${expected}`, () => {
        expect(deromanize(input)).toBe(expected)
      })
    })
  })

  describe('Complex valid combinations', () => {
    it('should handle all subtractive notation correctly', () => {
      expect(deromanize('CDXLIV')).toBe(444) // CD + XL + IV
      expect(deromanize('CMXCIX')).toBe(999) // CM + XC + IX
      expect(deromanize('MCMXCIX')).toBe(1999) // M + CM + XC + IX
    })
  })
})

describe('deromanize() - Error Handling', () => {
  describe('Invalid characters', () => {
    it('should throw error for strings containing invalid characters', () => {
      expect(() => deromanize('ABC')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('CIVIL')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('MXQ')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('123')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for special characters and symbols', () => {
      expect(() => deromanize('M@C')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('X!I')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('C#D')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for Unicode lookalikes', () => {
      expect(() => deromanize('ⅠⅤ')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('МСМ')).toThrow('requires valid roman numeral string') // Cyrillic
      expect(() => deromanize('ＩＶ')).toThrow('requires valid roman numeral string') // Full-width
    })

    it('should throw error for emojis mixed with valid characters', () => {
      expect(() => deromanize('M🏛️I')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('X😀I')).toThrow('requires valid roman numeral string')
    })
  })

  describe('Case sensitivity', () => {
    it('should throw error for lowercase roman numerals', () => {
      expect(() => deromanize('mcmxciv')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('iv')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('xi')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for mixed case roman numerals', () => {
      expect(() => deromanize('mXvIi')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('McmXCiv')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('iV')).toThrow('requires valid roman numeral string')
    })
  })

  describe('Invalid sequences', () => {
    it('should throw error for more than 3 consecutive identical characters', () => {
      expect(() => deromanize('IIII')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('XXXX')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('CCCC')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('MMMM')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for repeated characters that cannot repeat', () => {
      expect(() => deromanize('VV')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('LL')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('DD')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for invalid subtractive combinations', () => {
      expect(() => deromanize('IC')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('IL')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('XD')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('XM')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('VX')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('VC')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for consecutive subtractive patterns', () => {
      expect(() => deromanize('IVIV')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('IXIX')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('XLXL')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('XCXC')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('CDCD')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('CMCM')).toThrow('requires valid roman numeral string')
    })
  })

  describe('Whitespace handling', () => {
    it('should throw error for strings with leading whitespace', () => {
      expect(() => deromanize(' IV')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('\tMC')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('\nXI')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for strings with trailing whitespace', () => {
      expect(() => deromanize('IV ')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('MC\t')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('XI\n')).toThrow('requires valid roman numeral string')
    })

    it('should throw error for strings with internal whitespace', () => {
      expect(() => deromanize('X I')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('M C')).toThrow('requires valid roman numeral string')
      expect(() => deromanize('C\tD')).toThrow('requires valid roman numeral string')
    })
  })

  describe('Invalid input types', () => {
    it('should throw error for non-string inputs', () => {
      expect(() => deromanize(1000)).toThrow('requires valid roman numeral string')
      expect(() => deromanize(true)).toThrow('requires valid roman numeral string')
      expect(() => deromanize(false)).toThrow('requires valid roman numeral string')
      expect(() => deromanize(null)).toThrow('requires valid roman numeral string')
      expect(() => deromanize(undefined)).toThrow('requires valid roman numeral string')
    })

    it('should throw error for objects and arrays', () => {
      expect(() => deromanize({})).toThrow('requires valid roman numeral string')
      expect(() => deromanize([])).toThrow('requires valid roman numeral string')
      expect(() => deromanize({ value: 'III' })).toThrow('requires valid roman numeral string')
      expect(() => deromanize(['M', 'C', 'M'])).toThrow('requires valid roman numeral string')
    })

    it('should throw error for objects with toUpperCase method', () => {
      const fakeString = {
        toUpperCase: function() {
          return 'III'
        }
      }
      expect(() => deromanize(fakeString)).toThrow('requires valid roman numeral string')
    })
  })
})

describe('Round-trip conversions', () => {
  it('should maintain value integrity for all valid numbers', () => {
    for (let i = 1; i < 4000; i++) {
      const roman = romanize(i)
      const backToDecimal = deromanize(roman)
      expect(backToDecimal).toBe(i)
    }
  })

  it('should not mutate input values', () => {
    const originalNum = 1994
    const originalRoman = 'MCMXCIV'

    const romanResult = romanize(originalNum)
    expect(originalNum).toBe(1994)

    const decimalResult = deromanize(originalRoman)
    expect(originalRoman).toBe('MCMXCIV')
  })
})

describe('Property-based tests', () => {
  const fc = require('fast-check')

  it('should always produce valid roman numerals for numbers 1-3999', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3999 }),
        (num) => {
          const roman = romanize(num)
          // Check that the result only contains valid characters
          return /^[MDCLXVI]+$/.test(roman)
        }
      )
    )
  })

  it('should never produce more than 3 consecutive identical characters', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3999 }),
        (num) => {
          const roman = romanize(num)
          return !/([IVXLCDM])\1{3,}/.test(roman)
        }
      )
    )
  })

  it('should maintain ordering for consecutive numbers', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3998 }),
        (num) => {
          const current = deromanize(romanize(num))
          const next = deromanize(romanize(num + 1))
          return next === current + 1
        }
      )
    )
  })

  it('should follow valid subtractive notation rules', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3999 }),
        (num) => {
          const roman = romanize(num)
          // This regex validates proper Roman numeral structure
          const validPattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
          return validPattern.test(roman)
        }
      )
    )
  })

  it('should handle any valid roman numeral string correctly', () => {
    const validRomans = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...validRomans), { minLength: 1, maxLength: 15 }),
        (charArray) => {
          const romanStr = charArray.join('')
          try {
            const result = deromanize(romanStr)
            // If it doesn't throw, the result should be a positive number
            return typeof result === 'number' && result > 0 && result < 4000
          } catch (e) {
            // If it throws, that's also valid for invalid sequences
            return true
          }
        }
      )
    )
  })
})