const romans = require('./romans')
const { deromanize, romanize } = require('./romans')

// Benchmark configuration
const ITERATIONS = {
  WARMUP: 1000,
  SMALL: 10000,
  MEDIUM: 100000,
  LARGE: 1000000
}

// Common test values
const TEST_VALUES = {
  SIMPLE: [1, 5, 10, 50, 100, 500, 1000],
  COMPLEX: [444, 999, 1994, 2023, 3999],
  RANDOM: Array.from({ length: 100 }, () => Math.floor(Math.random() * 3999) + 1)
}

const TEST_ROMANS = {
  SIMPLE: ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
  COMPLEX: ['CDXLIV', 'CMXCIX', 'MCMXCIV', 'MMXXIII', 'MMMCMXCIX'],
  RANDOM: TEST_VALUES.RANDOM.map(n => romanize(n))
}

function benchmark(name, fn, iterations = ITERATIONS.MEDIUM) {
  // Warmup
  for (let i = 0; i < ITERATIONS.WARMUP; i++) {
    fn()
  }

  const start = process.hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    fn()
  }
  const end = process.hrtime.bigint()
  
  const durationMs = Number(end - start) / 1000000
  const opsPerSec = (iterations / durationMs) * 1000
  
  console.log(`${name}:`)
  console.log(`  ${iterations.toLocaleString()} ops in ${durationMs.toFixed(2)}ms`)
  console.log(`  ${opsPerSec.toLocaleString()} ops/sec`)
  console.log(`  ${(durationMs / iterations * 1000).toFixed(3)}μs per op`)
  console.log()
  
  return { duration: durationMs, opsPerSec }
}

function benchmarkRomanize() {
  console.log('=== ROMANIZE BENCHMARKS ===\n')
  
  // Simple numbers
  benchmark('Simple numbers (1-1000)', () => {
    TEST_VALUES.SIMPLE.forEach(n => romanize(n))
  })
  
  // Complex numbers
  benchmark('Complex numbers', () => {
    TEST_VALUES.COMPLEX.forEach(n => romanize(n))
  })
  
  // Random numbers
  benchmark('Random numbers', () => {
    TEST_VALUES.RANDOM.forEach(n => romanize(n))
  })
  
  // Sequential 1-3999
  benchmark('Sequential 1-3999', () => {
    for (let i = 1; i < 4000; i++) {
      romanize(i)
    }
  }, 100)
  
  // Single value repeated
  benchmark('Single value (1994) repeated', () => {
    romanize(1994)
  })
}

function benchmarkDeromanize() {
  console.log('=== DEROMANIZE BENCHMARKS ===\n')
  
  // Simple romans
  benchmark('Simple romans', () => {
    TEST_ROMANS.SIMPLE.forEach(r => deromanize(r))
  })
  
  // Complex romans
  benchmark('Complex romans', () => {
    TEST_ROMANS.COMPLEX.forEach(r => deromanize(r))
  })
  
  // Random romans
  benchmark('Random romans', () => {
    TEST_ROMANS.RANDOM.forEach(r => deromanize(r))
  })
  
  // Single value repeated
  benchmark('Single value (MCMXCIV) repeated', () => {
    deromanize('MCMXCIV')
  })
}

function benchmarkRoundTrip() {
  console.log('=== ROUND-TRIP BENCHMARKS ===\n')
  
  benchmark('Round-trip conversion', () => {
    TEST_VALUES.RANDOM.forEach(n => {
      const roman = romanize(n)
      deromanize(roman)
    })
  })
  
  benchmark('Sequential round-trip 1-1000', () => {
    for (let i = 1; i <= 1000; i++) {
      const roman = romanize(i)
      deromanize(roman)
    }
  }, 1000)
}

function memoryBenchmark() {
  console.log('=== MEMORY BENCHMARKS ===\n')
  
  const before = process.memoryUsage()
  
  // Create lots of conversions
  const results = []
  for (let i = 0; i < 100000; i++) {
    const num = Math.floor(Math.random() * 3999) + 1
    results.push(romanize(num))
  }
  
  for (let i = 0; i < results.length; i++) {
    deromanize(results[i])
  }
  
  const after = process.memoryUsage()
  
  console.log('Memory usage:')
  console.log(`  Heap Used: ${((after.heapUsed - before.heapUsed) / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  Heap Total: ${((after.heapTotal - before.heapTotal) / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  External: ${((after.external - before.external) / 1024 / 1024).toFixed(2)} MB`)
  console.log()
}

function profileSpecificCases() {
  console.log('=== SPECIFIC CASE PROFILES ===\n')
  
  // Worst case scenarios
  const worstCases = {
    'Maximum value (3999)': () => romanize(3999),
    'Complex subtractive (444)': () => romanize(444),
    'Many Ms (3000)': () => romanize(3000),
    'Long roman (MMMCMXCIX)': () => deromanize('MMMCMXCIX'),
    'Complex roman (CDXLIV)': () => deromanize('CDXLIV')
  }
  
  Object.entries(worstCases).forEach(([name, fn]) => {
    benchmark(name, fn, ITERATIONS.LARGE)
  })
}

function main() {
  console.log('Romans Library Performance Benchmark')
  console.log('====================================\n')
  
  console.log(`Node.js ${process.version}`)
  console.log(`Platform: ${process.platform} ${process.arch}`)
  console.log(`Memory: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB\n`)
  
  benchmarkRomanize()
  benchmarkDeromanize()
  benchmarkRoundTrip()
  profileSpecificCases()
  memoryBenchmark()
  
  console.log('Benchmark complete!')
}

if (require.main === module) {
  main()
}

module.exports = {
  benchmark,
  benchmarkRomanize,
  benchmarkDeromanize,
  benchmarkRoundTrip,
  memoryBenchmark,
  profileSpecificCases
}