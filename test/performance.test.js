const romans = require('../romans')
const { deromanize, romanize } = require('../romans')

describe('performance tests', () => {
  it('should convert large numbers efficiently', () => {
    const start = performance.now()
    for (let i = 1; i < 3999; i++) {
      const roman = romanize(i)
      const back = deromanize(roman)
      expect(back).toBe(i)
    }
    const end = performance.now()
    expect(end - start).toBeLessThan(1000) // Should complete within 1 second
  })
})

describe('boundary value tests', () => {
  it('should handle numbers near boundaries correctly', () => {
    const boundaryTests = [
      { num: 1, expected: 'I' },
      { num: 4, expected: 'IV' },
      { num: 5, expected: 'V' },
      { num: 9, expected: 'IX' },
      { num: 10, expected: 'X' },
      { num: 49, expected: 'XLIX' },
      { num: 50, expected: 'L' },
      { num: 99, expected: 'XCIX' },
      { num: 100, expected: 'C' },
      { num: 499, expected: 'CDXCIX' },
      { num: 500, expected: 'D' },
      { num: 999, expected: 'CMXCIX' },
      { num: 1000, expected: 'M' },
      { num: 3999, expected: 'MMMCMXCIX' }
    ]

    boundaryTests.forEach(({ num, expected }) => {
      expect(romanize(num)).toBe(expected)
      expect(deromanize(expected)).toBe(num)
    })
  })
})

describe('memory usage tests', () => {
  it('should not cause memory leaks with repeated conversions', () => {
    const initialMemory = process.memoryUsage().heapUsed
    for (let i = 0; i < 1000000; i++) {
      romanize(Math.floor(Math.random() * 3999) + 1)
    }
    const finalMemory = process.memoryUsage().heapUsed
    expect(finalMemory - initialMemory).toBeLessThan(10 * 1024 * 1024) // Less than 10MB increase
  })
})