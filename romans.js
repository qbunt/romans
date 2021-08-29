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

const romanize = (decimal) => {
  if (
    decimal <= 0 ||
    typeof decimal !== 'number' || // is number (e.g. not '1000' and not `{value: 1000}`)
    Math.floor(decimal) !== decimal // is not float (e.g. 23.567)
  ) {
    throw new Error('requires an unsigned integer')
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
  if (typeof romanStr !== 'string') {
    throw new Error('requires a string')
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
