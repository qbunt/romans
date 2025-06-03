const romans = require('../romans')
const { deromanize, romanize } = require('../romans')

describe('Performance Tests', () => {
  describe('Conversion speed', () => {
    it('should convert all numbers from 1 to 3999 in under 1 second', () => {
      const start = performance.now()
      
      for (let i = 1; i < 4000; i++) {
        const roman = romanize(i)
        const decimal = deromanize(roman)
        expect(decimal).toBe(i)
      }
      
      const end = performance.now()
      const duration = end - start
      
      console.log(`Full range conversion took ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(1000)
    })

    it('should handle rapid repeated conversions efficiently', () => {
      const testNumber = 1994
      const iterations = 100000
      
      const start = performance.now()
      
      for (let i = 0; i < iterations; i++) {
        romanize(testNumber)
      }
      
      const end = performance.now()
      const duration = end - start
      
      console.log(`${iterations} romanize operations took ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(500)
    })

    it('should handle complex roman numeral parsing efficiently', () => {
      const complexRomans = [
        'MMMCMXCIX', // 3999
        'MCMXCIV',   // 1994
        'CDXLIV',    // 444
        'CMXCIX',    // 999
        'DCCCXC'     // 890
      ]
      const iterations = 10000
      
      const start = performance.now()
      
      for (let i = 0; i < iterations; i++) {
        complexRomans.forEach(roman => deromanize(roman))
      }
      
      const end = performance.now()
      const duration = end - start
      
      console.log(`${iterations * complexRomans.length} deromanize operations took ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(500)
    })
  })

  describe('Memory efficiency', () => {
    it('should not leak memory during extensive conversions', () => {
      const initialMemory = process.memoryUsage().heapUsed
      const iterations = 1000000
      
      for (let i = 0; i < iterations; i++) {
        const num = Math.floor(Math.random() * 3999) + 1
        const roman = romanize(num)
        deromanize(roman)
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }
      
      const finalMemory = process.memoryUsage().heapUsed
      const memoryIncrease = finalMemory - initialMemory
      const memoryIncreaseMB = memoryIncrease / (1024 * 1024)
      
      console.log(`Memory increase after ${iterations} conversions: ${memoryIncreaseMB.toFixed(2)}MB`)
      expect(memoryIncreaseMB).toBeLessThan(10)
    })

    it('should handle string allocations efficiently', () => {
      const numbers = Array.from({ length: 1000 }, (_, i) => i + 1)
      const iterations = 1000
      
      const start = performance.now()
      let totalLength = 0
      
      for (let i = 0; i < iterations; i++) {
        numbers.forEach(num => {
          const roman = romanize(num)
          totalLength += roman.length
        })
      }
      
      const end = performance.now()
      const duration = end - start
      
      console.log(`Generated ${totalLength} total characters in ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(2000)
    })
  })
})

describe('Boundary Value Tests', () => {
  describe('Lower boundaries', () => {
    const lowerBoundaryTests = [
      { num: 1, expected: 'I', description: 'minimum valid value' },
      { num: 4, expected: 'IV', description: 'first subtractive notation' },
      { num: 5, expected: 'V', description: 'first five unit' },
      { num: 9, expected: 'IX', description: 'maximum single digit' },
      { num: 10, expected: 'X', description: 'first ten unit' }
    ]

    lowerBoundaryTests.forEach(({ num, expected, description }) => {
      it(`should correctly convert ${num} (${description}) to ${expected}`, () => {
        expect(romanize(num)).toBe(expected)
        expect(deromanize(expected)).toBe(num)
      })
    })
  })

  describe('Upper boundaries', () => {
    const upperBoundaryTests = [
      { num: 3999, expected: 'MMMCMXCIX', description: 'maximum valid value' },
      { num: 3998, expected: 'MMMCMXCVIII', description: 'one below maximum' },
      { num: 3000, expected: 'MMM', description: 'maximum thousands only' },
      { num: 2999, expected: 'MMCMXCIX', description: 'maximum with CM' },
      { num: 1999, expected: 'MCMXCIX', description: 'maximum with MCM' }
    ]

    upperBoundaryTests.forEach(({ num, expected, description }) => {
      it(`should correctly convert ${num} (${description}) to ${expected}`, () => {
        expect(romanize(num)).toBe(expected)
        expect(deromanize(expected)).toBe(num)
      })
    })
  })

  describe('Subtractive notation boundaries', () => {
    const subtractiveTests = [
      { num: 4, expected: 'IV', description: 'IV boundary' },
      { num: 9, expected: 'IX', description: 'IX boundary' },
      { num: 40, expected: 'XL', description: 'XL boundary' },
      { num: 49, expected: 'XLIX', description: 'XL + IX combination' },
      { num: 90, expected: 'XC', description: 'XC boundary' },
      { num: 99, expected: 'XCIX', description: 'XC + IX combination' },
      { num: 400, expected: 'CD', description: 'CD boundary' },
      { num: 444, expected: 'CDXLIV', description: 'all subtractive notations' },
      { num: 490, expected: 'CDXC', description: 'CD + XC combination' },
      { num: 499, expected: 'CDXCIX', description: 'CD + XC + IX combination' },
      { num: 900, expected: 'CM', description: 'CM boundary' },
      { num: 949, expected: 'CMXLIX', description: 'CM + XL + IX combination' },
      { num: 990, expected: 'CMXC', description: 'CM + XC combination' },
      { num: 999, expected: 'CMXCIX', description: 'CM + XC + IX combination' },
      { num: 1444, expected: 'MCDXLIV', description: 'M + all subtractive notations' }
    ]

    subtractiveTests.forEach(({ num, expected, description }) => {
      it(`should correctly convert ${num} (${description}) to ${expected}`, () => {
        expect(romanize(num)).toBe(expected)
        expect(deromanize(expected)).toBe(num)
      })
    })
  })

  describe('Unit transitions', () => {
    const transitions = [
      { from: 3, to: 4, desc: 'III to IV' },
      { from: 8, to: 9, desc: 'VIII to IX' },
      { from: 39, to: 40, desc: 'XXXIX to XL' },
      { from: 89, to: 90, desc: 'LXXXIX to XC' },
      { from: 399, to: 400, desc: 'CCCXCIX to CD' },
      { from: 899, to: 900, desc: 'DCCCXCIX to CM' }
    ]

    transitions.forEach(({ from, to, desc }) => {
      it(`should handle transition from ${from} to ${to} (${desc})`, () => {
        const romanFrom = romanize(from)
        const romanTo = romanize(to)
        
        expect(deromanize(romanFrom)).toBe(from)
        expect(deromanize(romanTo)).toBe(to)
        
        // Verify the pattern change is significant
        expect(romanTo.length).toBeLessThanOrEqual(romanFrom.length)
      })
    })
  })

  describe('Century marks', () => {
    const centuries = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900]
    
    centuries.forEach(century => {
      it(`should correctly handle century mark ${century}`, () => {
        const roman = romanize(century)
        expect(deromanize(roman)).toBe(century)
      })
    })
  })
})

describe('Stress Tests', () => {
  it('should handle random conversions without errors', () => {
    const iterations = 10000
    const errors = []
    
    for (let i = 0; i < iterations; i++) {
      const num = Math.floor(Math.random() * 3999) + 1
      
      try {
        const roman = romanize(num)
        const backToNum = deromanize(roman)
        
        if (backToNum !== num) {
          errors.push({ num, roman, backToNum })
        }
      } catch (e) {
        errors.push({ num, error: e.message })
      }
    }
    
    expect(errors).toHaveLength(0)
  })

  it('should handle edge case patterns efficiently', () => {
    const edgeCases = [
      'MMMCMXCIX', // 3999 - maximum
      'CDXLIV',    // 444 - all subtractive
      'MMMDCCCLXXXVIII', // 3888 - many repeated characters
      'MCMXCIV',   // 1994 - common year format
      'MMXXIII'    // 2023 - another common year
    ]
    
    const start = performance.now()
    
    edgeCases.forEach(roman => {
      for (let i = 0; i < 10000; i++) {
        deromanize(roman)
      }
    })
    
    const end = performance.now()
    const duration = end - start
    
    console.log(`Edge case parsing took ${duration.toFixed(2)}ms`)
    expect(duration).toBeLessThan(200)
  })
})