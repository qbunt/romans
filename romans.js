/* eslint-disable function-call-argument-newline */
/**
 * A mapping of Roman numeral symbols to their decimal values.
 * Values are ordered from highest to lowest to ensure proper conversion.
 * @readonly
 * @type {Readonly<Record<import('./romans').RomanChar, number>>}
 */
const roman_map = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

/**
 * Array of valid Roman numeral symbols and combinations.
 * @type {ReadonlyArray<import('./romans').RomanChar>}
 */
const allChars = Object.keys(roman_map)

/**
 * Array of decimal values corresponding to Roman numerals.
 * @type {ReadonlyArray<number>}
 */
const allNumerals = Object.values(roman_map)

/**
 * Regular expression pattern for validating Roman numerals.
 * Ensures proper character combinations and repetition rules.
 * @type {RegExp}
 * @readonly
 */
const romanPattern =
  /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/

/**
 * Converts a decimal number to its Roman numeral representation.
 * @param {number} decimal - The decimal number to convert (must be a positive integer < 4000)
 * @returns {import('./romans').RomanNumeral} The Roman numeral representation
 * @throws {Error} When input is not a positive integer
 * @throws {Error} When input is greater than or equal to 4000
 * @example
 * romanize(1994) // Returns 'MCMXCIV'
 * romanize(2023) // Returns 'MMXXIII'
 * romanize(0)    // Throws Error: requires an unsigned integer
 * romanize(4000) // Throws Error: requires max value of less than 4000
 */
const romanize = (decimal) => {
  if (
    decimal <= 0 ||
    typeof decimal !== 'number' ||
    Math.floor(decimal) !== decimal
  ) {
    throw new Error('requires an unsigned integer')
  }
  if (decimal >= 4000) {
    throw new Error('requires max value of less than 4000')
  }

  // If input is padded with zeros, remove them
  decimal = decimal.toString().replace(/^0+/, '')

  const result = []

  for (let i = 0; i < allChars.length; i++) {
    const count = Math.floor(decimal / allNumerals[i])
    if (count > 0) {
      result.push(allChars[i].repeat(count))
      decimal %= allNumerals[i]
    }

    if (decimal === 0) break
  }

  return /** @type {import('./romans').RomanNumeral} */ (result.join(''))
}

/**
 * Converts a Roman numeral string to its decimal representation.
 * @param {string} romanStr - The Roman numeral string to convert
 * @returns {import('./romans').ValidDecimal} The decimal value (1-3999)
 * @throws {Error} When input contains invalid Roman numeral characters
 * @throws {Error} When input contains valid characters in an invalid sequence
 * @example
 * deromanize('MCMXCIV') // Returns 1994
 * deromanize('MMXXIII') // Returns 2023
 * deromanize('INVALID') // Throws Error: requires valid roman numeral string
 * deromanize('IC')      // Throws Error: requires valid roman numeral string (invalid sequence)
 */
const deromanize = (romanStr) => {
  if (typeof romanStr !== 'string' || !romanPattern.test(romanStr)) {
    throw new Error('requires valid roman numeral string')
  }

  /** @type {Record<string, RegExp>} */
  const invalidPatterns = {
    // IIII or more
    'I': /I{4,}/,
    // VV or more
    'V': /V{2,}/,
    // XXXX or more
    'X': /X{4,}/,
    // LL or more
    'L': /L{2,}/,
    // CCCC or more
    'C': /C{4,}/,
    // DD or more
    'D': /D{2,}/,
    // MMMM or more
    'M': /M{4,}/
  };

  for (const [_, pattern] of Object.entries(invalidPatterns)) {
    if (pattern.test(romanStr)) {
      throw new Error('requires valid roman numeral string')
    }
  }

  let result = 0
  let prevValue = 0
  for (let i = romanStr.length - 1; i >= 0; i--) {
    const currentValue = roman_map[/** @type {import('./romans').SingleRomanChar} */ (romanStr[i])]
    result += currentValue < prevValue ? -currentValue : currentValue
    prevValue = currentValue
  }

  return /** @type {import('./romans').ValidDecimal} */ (result)
}

module.exports = {
  deromanize,
  romanize,
  allChars,
  allNumerals
}