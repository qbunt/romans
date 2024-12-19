declare module 'romans' {
  /**
   * Valid decimal range for Roman numerals (1 to 3999)
   * This ensures compile-time checking of valid input ranges
   */
  type ValidDecimal = number & {
    readonly __brand: 'ValidDecimal';
  };

  /**
   * Valid Roman numeral characters (single characters)
   */
  type SingleRomanChar = 'M' | 'D' | 'C' | 'L' | 'X' | 'V' | 'I';

  /**
   * Valid Roman numeral subtractive combinations
   */
  type SubtractiveRomanChar = 'CM' | 'CD' | 'XC' | 'XL' | 'IX' | 'IV';

  /**
   * All valid Roman numeral components
   */
  type RomanChar = SingleRomanChar | SubtractiveRomanChar;

  /**
   * A branded type representing a valid Roman numeral string.
   * This type ensures compile-time safety when working with Roman numerals.
   *
   * @example
   * // Valid Roman numerals
   * const valid: RomanNumeral = 'MCMLIV' as RomanNumeral // ✓
   * const invalid: RomanNumeral = 'ABC' as RomanNumeral  // ✗ (runtime error)
   */
  type RomanNumeral = string & {
    readonly __brand: 'RomanNumeral';
  };

  /**
   * A mapping of Roman numeral symbols to their decimal values.
   * The map is ordered from highest to lowest value to ensure proper conversion.
   */
  interface RomanMap {
    readonly M: 1000;
    readonly CM: 900;
    readonly D: 500;
    readonly CD: 400;
    readonly C: 100;
    readonly XC: 90;
    readonly L: 50;
    readonly XL: 40;
    readonly X: 10;
    readonly IX: 9;
    readonly V: 5;
    readonly IV: 4;
    readonly I: 1;
  }

  /**
   * An ordered array of valid Roman numeral symbols and combinations.
   * Arranged in descending order of their decimal values.
   *
   * @readonly
   */
  const allChars: ReadonlyArray<RomanChar>;

  /**
   * An ordered array of decimal values corresponding to Roman numerals.
   * Arranged in descending order, matching the order of `allChars`.
   *
   * @readonly
   */
  const allNumerals: ReadonlyArray<RomanMap[RomanChar]>;

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
  function romanize(decimal: number): RomanNumeral;

  /**
   * Converts a Roman numeral string to its decimal representation.
   *
   * @param romanStr - A string containing valid Roman numerals
   * @returns The decimal value of the Roman numeral (1-3999)
   * @throws {Error} When input contains invalid Roman numeral characters
   * @throws {Error} When input contains valid characters in an invalid sequence
   *
   * @example
   * deromanize('MCMXCIV') // Returns 1994
   * deromanize('MMXXIII') // Returns 2023
   * deromanize('INVALID') // Throws Error: requires valid roman numeral string
   * deromanize('IC')      // Throws Error: requires valid roman numeral string
   */
  function deromanize(romanStr: RomanNumeral | string): ValidDecimal;

  export {
    RomanNumeral,
    RomanMap,
    RomanChar,
    SingleRomanChar,
    SubtractiveRomanChar,
    ValidDecimal,
    deromanize,
    romanize,
    allChars,
    allNumerals
  };
}
