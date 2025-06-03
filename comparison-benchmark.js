const original = require('./romans')
const optimized = require('./romans-optimized')
const memoized = require('./romans-memoized')

// Test data
const TEST_NUMBERS = [
  // Common values
  1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000,
  // Complex values
  444, 999, 1994, 2023, 3999,
  // Random values
  ...Array.from({ length: 50 }, () => Math.floor(Math.random() * 3999) + 1)
]

const TEST_ROMANS = TEST_NUMBERS.map(n => original.romanize(n))

const ITERATIONS = {
  SMALL: 1000,
  MEDIUM: 10000,
  LARGE: 100000,
  XLARGE: 1000000
}

function benchmark(name, fn, iterations = ITERATIONS.MEDIUM) {
  // Warmup
  for (let i = 0; i < 100; i++) fn()
  
  const start = process.hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    fn()
  }
  const end = process.hrtime.bigint()
  
  const durationMs = Number(end - start) / 1000000
  const opsPerSec = (iterations / durationMs) * 1000
  
  return {
    name,
    duration: durationMs,
    opsPerSec,
    iterations
  }
}

function compareRomanize() {
  console.log('\n=== ROMANIZE COMPARISON ===')
  
  const tests = [
    {
      name: 'Single value (1994)',
      iterations: ITERATIONS.XLARGE,
      fn: (impl) => () => impl.romanize(1994)
    },
    {
      name: 'Test numbers array',
      iterations: ITERATIONS.LARGE,
      fn: (impl) => () => TEST_NUMBERS.forEach(n => impl.romanize(n))
    },
    {
      name: 'Sequential 1-1000',
      iterations: ITERATIONS.SMALL,
      fn: (impl) => () => {
        for (let i = 1; i <= 1000; i++) {
          impl.romanize(i)
        }
      }
    },
    {
      name: 'Random values',
      iterations: ITERATIONS.MEDIUM,
      fn: (impl) => () => {
        const num = Math.floor(Math.random() * 3999) + 1
        impl.romanize(num)
      }
    }
  ]
  
  tests.forEach(test => {
    console.log(`\n${test.name}:`)
    
    const originalResult = benchmark('Original', test.fn(original), test.iterations)
    const optimizedResult = benchmark('Optimized', test.fn(optimized), test.iterations)
    const memoizedResult = benchmark('Memoized', test.fn(memoized), test.iterations)
    
    console.log(`  Original:  ${originalResult.opsPerSec.toLocaleString()} ops/sec`)
    console.log(`  Optimized: ${optimizedResult.opsPerSec.toLocaleString()} ops/sec (${(optimizedResult.opsPerSec / originalResult.opsPerSec).toFixed(1)}x)`)
    console.log(`  Memoized:  ${memoizedResult.opsPerSec.toLocaleString()} ops/sec (${(memoizedResult.opsPerSec / originalResult.opsPerSec).toFixed(1)}x)`)
  })
}

function compareDeromanize() {
  console.log('\n=== DEROMANIZE COMPARISON ===')
  
  const tests = [
    {
      name: 'Single value (MCMXCIV)',
      iterations: ITERATIONS.XLARGE,
      fn: (impl) => () => impl.deromanize('MCMXCIV')
    },
    {
      name: 'Test romans array',
      iterations: ITERATIONS.LARGE,
      fn: (impl) => () => TEST_ROMANS.forEach(r => impl.deromanize(r))
    },
    {
      name: 'Complex romans',
      iterations: ITERATIONS.LARGE,
      fn: (impl) => () => {
        const complexRomans = ['MMMCMXCIX', 'CDXLIV', 'CMXCIX', 'DCCCXC']
        complexRomans.forEach(r => impl.deromanize(r))
      }
    },
    {
      name: 'Random romans',
      iterations: ITERATIONS.MEDIUM,
      fn: (impl) => () => {
        const randomRoman = TEST_ROMANS[Math.floor(Math.random() * TEST_ROMANS.length)]
        impl.deromanize(randomRoman)
      }
    }
  ]
  
  tests.forEach(test => {
    console.log(`\n${test.name}:`)
    
    const originalResult = benchmark('Original', test.fn(original), test.iterations)
    const optimizedResult = benchmark('Optimized', test.fn(optimized), test.iterations)
    const memoizedResult = benchmark('Memoized', test.fn(memoized), test.iterations)
    
    console.log(`  Original:  ${originalResult.opsPerSec.toLocaleString()} ops/sec`)
    console.log(`  Optimized: ${optimizedResult.opsPerSec.toLocaleString()} ops/sec (${(optimizedResult.opsPerSec / originalResult.opsPerSec).toFixed(1)}x)`)
    console.log(`  Memoized:  ${memoizedResult.opsPerSec.toLocaleString()} ops/sec (${(memoizedResult.opsPerSec / originalResult.opsPerSec).toFixed(1)}x)`)
  })
}

function compareRoundTrip() {
  console.log('\n=== ROUND-TRIP COMPARISON ===')
  
  const tests = [
    {
      name: 'Test numbers round-trip',
      iterations: ITERATIONS.MEDIUM,
      fn: (impl) => () => TEST_NUMBERS.forEach(n => {
        const roman = impl.romanize(n)
        impl.deromanize(roman)
      })
    },
    {
      name: 'Sequential 1-500 round-trip',
      iterations: ITERATIONS.SMALL,
      fn: (impl) => () => {
        for (let i = 1; i <= 500; i++) {
          const roman = impl.romanize(i)
          impl.deromanize(roman)
        }
      }
    }
  ]
  
  tests.forEach(test => {
    console.log(`\n${test.name}:`)
    
    const originalResult = benchmark('Original', test.fn(original), test.iterations)
    const optimizedResult = benchmark('Optimized', test.fn(optimized), test.iterations)
    const memoizedResult = benchmark('Memoized', test.fn(memoized), test.iterations)
    
    console.log(`  Original:  ${originalResult.opsPerSec.toLocaleString()} ops/sec`)
    console.log(`  Optimized: ${optimizedResult.opsPerSec.toLocaleString()} ops/sec (${(optimizedResult.opsPerSec / originalResult.opsPerSec).toFixed(1)}x)`)
    console.log(`  Memoized:  ${memoizedResult.opsPerSec.toLocaleString()} ops/sec (${(memoizedResult.opsPerSec / originalResult.opsPerSec).toFixed(1)}x)`)
  })
}

function memoryComparison() {
  console.log('\n=== MEMORY COMPARISON ===')
  
  function measureMemory(impl, name) {
    global.gc && global.gc()
    const before = process.memoryUsage()
    
    // Generate conversions
    const results = []
    for (let i = 0; i < 50000; i++) {
      const num = Math.floor(Math.random() * 3999) + 1
      results.push(impl.romanize(num))
    }
    
    for (let i = 0; i < results.length; i++) {
      impl.deromanize(results[i])
    }
    
    global.gc && global.gc()
    const after = process.memoryUsage()
    
    const heapDiff = (after.heapUsed - before.heapUsed) / 1024 / 1024
    console.log(`  ${name}: ${heapDiff.toFixed(2)} MB heap increase`)
    return heapDiff
  }
  
  const originalMem = measureMemory(original, 'Original')
  const optimizedMem = measureMemory(optimized, 'Optimized')
  const memoizedMem = measureMemory(memoized, 'Memoized')
  
  console.log(`\nMemory efficiency:`)
  console.log(`  Optimized vs Original: ${(optimizedMem / originalMem).toFixed(2)}x`)
  console.log(`  Memoized vs Original: ${(memoizedMem / originalMem).toFixed(2)}x`)
}

function validateCorrectness() {
  console.log('\n=== CORRECTNESS VALIDATION ===')
  
  let errors = 0
  
  // Test all numbers 1-3999
  for (let i = 1; i < 4000; i++) {
    const originalRoman = original.romanize(i)
    const optimizedRoman = optimized.romanize(i)
    const memoizedRoman = memoized.romanize(i)
    
    if (originalRoman !== optimizedRoman) {
      console.error(`Romanize mismatch at ${i}: ${originalRoman} vs ${optimizedRoman}`)
      errors++
    }
    
    if (originalRoman !== memoizedRoman) {
      console.error(`Romanize mismatch at ${i}: ${originalRoman} vs ${memoizedRoman}`)
      errors++
    }
    
    const originalDecimal = original.deromanize(originalRoman)
    const optimizedDecimal = optimized.deromanize(originalRoman)
    const memoizedDecimal = memoized.deromanize(originalRoman)
    
    if (originalDecimal !== optimizedDecimal) {
      console.error(`Deromanize mismatch at ${originalRoman}: ${originalDecimal} vs ${optimizedDecimal}`)
      errors++
    }
    
    if (originalDecimal !== memoizedDecimal) {
      console.error(`Deromanize mismatch at ${originalRoman}: ${originalDecimal} vs ${memoizedDecimal}`)
      errors++
    }
  }
  
  console.log(`Validation complete: ${errors} errors found`)
  if (errors === 0) {
    console.log('✅ All implementations produce identical results')
  }
  
  return errors === 0
}

function main() {
  console.log('Romans Library Optimization Comparison')
  console.log('======================================')
  console.log(`Node.js ${process.version}`)
  console.log(`Platform: ${process.platform} ${process.arch}`)
  
  // Validate correctness first
  if (!validateCorrectness()) {
    console.error('❌ Correctness validation failed! Stopping benchmark.')
    return
  }
  
  compareRomanize()
  compareDeromanize()
  compareRoundTrip()
  memoryComparison()
  
  // Show cache stats for memoized version
  if (memoized.getCacheStats) {
    const stats = memoized.getCacheStats()
    console.log(`\nMemoized cache stats:`)
    console.log(`  Romanize cache: ${stats.romanizeSize} entries`)
    console.log(`  Deromanize cache: ${stats.deromanizeSize} entries`)
  }
  
  console.log('\n=== SUMMARY ===')
  console.log('🚀 Optimized version: Uses lookup tables for O(1) conversions')
  console.log('💾 Memoized version: Uses LRU cache for frequently accessed values')
  console.log('📊 Run with --expose-gc for accurate memory measurements')
}

if (require.main === module) {
  main()
}

module.exports = {
  compareRomanize,
  compareDeromanize,
  compareRoundTrip,
  memoryComparison,
  validateCorrectness
}