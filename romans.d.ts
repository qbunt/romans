declare module 'romans' {
  /**
   * A branded type representing a valid Roman numeral string.
   * This type ensures compile-time safety when working with Roman numerals.
   *
   * @example
   * // Valid Roman numerals
   * const valid: RomanNumeral = 'MCMLIV' // ✓ (if cast properly)
   * const invalid: RomanNumeral = 'ABC'   // ✗ (won't compile)
   */
  type RomanNumeral = string & { readonly __brand: unique symbol }

  /**
   * A mapping of Roman numeral symbols to their decimal values.
   * The map is ordered from highest to lowest value to ensure proper conversion.
   * Includes both single characters (I, V, X, etc.) and subtractive combinations (IV, IX, etc.).
   *
   * @readonly
   * @example
   * M: 1000  // Represents 1000
   * CM: 900  // Represents 900 (1000 - 100)
   * D: 500   // Represents 500
   */
  interface RomanMap {
    readonly M: 1000
    readonly CM: 900
    readonly D: 500
    readonly CD: 400
    readonly C: 100
    readonly XC: 90
    readonly L: 50
    readonly XL: 40
    readonly X: 10
    readonly IX: 9
    readonly V: 5
    readonly IV: 4
    readonly I: 1
  }

  /**
   * An ordered array of valid Roman numeral symbols and combinations.
   * Arranged in descending order of their decimal values.
   *
   * @readonly
   * @example
   * ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
   */
  const allChars: ReadonlyArray<keyof RomanMap>

  /**
   * An ordered array of decimal values corresponding to Roman numerals.
   * Arranged in descending order, matching the order of `allChars`.
   *
   * @readonly
   * @example
   * [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
   */
  const allNumerals: ReadonlyArray<RomanMap[keyof RomanMap]>

  /**
   * Converts a decimal number to its Roman numeral representation.
   *
   * @param decimal - A positive integer to convert (must be less than 4000)
   * @returns A valid Roman numeral string
   * @throws {Error} When input is not a positive integer
   * @throws {Error} When input is greater than or equal to 4000
   *
   * @example
   * romanize(1994) // Returns 'MCMXCIV'
   * romanize(2023) // Returns 'MMXXIII'
   * romanize(0)    // Throws Error: requires an unsigned integer
   * romanize(4000) // Throws Error: requires max value of less than 4000
   */
  function romanize(decimal: number): RomanNumeral

  /**
   * Converts a Roman numeral string to its decimal representation.
   * Accepts both the branded RomanNumeral type and regular strings for flexibility.
   *
   * @param romanStr - A string containing valid Roman numerals
   * @returns The decimal value of the Roman numeral
   * @throws {Error} When input contains invalid Roman numeral characters
   * @throws {Error} When input contains valid characters in an invalid sequence
   *
   * @example
   * deromanize('MCMXCIV') // Returns 1994
   * deromanize('MMXXIII') // Returns 2023
   * deromanize('INVALID') // Throws Error: requires valid roman numeral string
   * deromanize('IC')      // Throws Error: requires valid roman numeral string
   */
  function deromanize(romanStr: RomanNumeral | string): number

  export { RomanNumeral, RomanMap, deromanize, romanize, allChars, allNumerals }
}
