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

const allChars = Object.keys(roman_map)
const allNumerals = Object.values(roman_map)
const romanPattern =
  /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/

const romanize = (decimal) => {
  if (
    decimal <= 0 ||
    typeof decimal !== 'number' ||
    Math.floor(decimal) !== decimal
  ) {
    throw new Error(`requires an unsigned integer`)
  }
  if (decimal >= 4000) {
    throw new Error(`requires max value of less than 3999 or less`)
  }
  let roman = ''
  for (let i = 0; i < allChars.length; i++) {
    while (decimal >= allNumerals[i]) {
      decimal -= allNumerals[i]
      roman += allChars[i]
    }
  }
  return roman
}

const deromanize = (romanStr) => {
  if (typeof romanStr !== `string`) {
    throw new Error(`requires a string`)
  }
  if (!romanPattern.test(romanStr)) {
    throw new Error(`requires valid roman numeral string`)
  }
  let romanString = romanStr.toUpperCase()
  let arabic = 0
  let iteration = romanString.length
  while (iteration--) {
    let cumulative = roman_map[romanString[iteration]]
    if (cumulative < roman_map[romanString[iteration + 1]]) {
      arabic -= cumulative
    } else {
      arabic += cumulative
    }
  }
  return arabic
}

module.exports = {
  deromanize,
  romanize,
  allChars,
  allNumerals
}
