/**
 * @typedef {Object} RomanMap
 * @property {number} M
 * @property {number} CM
 * @property {number} D
 * @property {number} CD
 * @property {number} C
 * @property {number} XC
 * @property {number} L
 * @property {number} XL
 * @property {number} X
 * @property {number} IX
 * @property {number} V
 * @property {number} IV
 * @property {number} I
 */

/** @type {RomanMap} */
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

/** @type {string[]} */
const allChars = Object.keys(roman_map)

/** @type {number[]} */
const allNumerals = Object.values(roman_map)

/** @type {RegExp} */
const romanPattern =
  /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/

/**
 * Converts a decimal number to a Roman numeral.
 * @param {number} decimal - The decimal number to convert.
 * @returns {string} The Roman numeral representation of the decimal number.
 * @throws {Error} If the input is not a positive integer or is greater than or equal to 4000.
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

  // if input is padded with zeros, remove them
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

  return result.join('')
}

/**
 * Converts a Roman numeral to a decimal number.
 * @param {string} romanStr - The Roman numeral string to convert.
 * @returns {number} The decimal representation of the Roman numeral.
 * @throws {Error} If the input is not a valid Roman numeral string.
 */
const deromanize = (romanStr) => {
  if (typeof romanStr !== 'string' || !romanPattern.test(romanStr)) {
    throw new Error('requires valid roman numeral string')
  }

  const invalidPatterns = {
    'I': /I{4,}/,  // IIII or more
    'V': /V{2,}/,  // VV or more
    'X': /X{4,}/,  // XXXX or more
    'L': /L{2,}/,  // LL or more
    'C': /C{4,}/,  // CCCC or more
    'D': /D{2,}/,  // DD or more
    'M': /M{4,}/   // MMMM or more
  };

  for (const [_, pattern] of Object.entries(invalidPatterns)) {
    if (pattern.test(romanStr)) {
      throw new Error('requires valid roman numeral string');
    }
  }

  let result = 0
  let prevValue = 0
  for (let i = romanStr.length - 1; i >= 0; i--) {
    const currentValue = roman_map[romanStr[i]]
    result += currentValue < prevValue ? -currentValue : currentValue
    prevValue = currentValue
  }

  return result
}

module.exports = {
  deromanize,
  romanize,
  allChars,
  allNumerals
}
