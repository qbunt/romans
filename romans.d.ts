declare module 'romans' {
  const allChars: string[]
  const allNumerals: number[]
  const romanize: (decimal: number) => string
  const deromanize: (romanStr: string) => number

  export { deromanize, romanize, allChars, allNumerals }
}
