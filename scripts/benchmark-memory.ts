/**
 * SDK Memory Benchmarking Script
 *
 * Measures memory usage patterns and detects potential memory leaks.
 *
 * Usage:
 *   node --expose-gc --loader tsx scripts/benchmark-memory.ts
 *
 * Environment Variables:
 *   WB_API_KEY - Wildberries API key (required)
 *   ITERATIONS - Number of iterations per test (default: 1000)
 *
 * Note: Requires --expose-gc flag to enable manual garbage collection
 */

import { WildberriesSDK } from '../src';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});

if (!process.env.WB_API_KEY) {
  console.error('❌ Error: WB_API_KEY environment variable not set');
  console.log('Set your API key: export WB_API_KEY="your_key_here"');
  process.exit(1);
}

if (!global.gc) {
  console.warn('⚠️  Warning: Garbage collection not exposed!');
  console.warn('   Run with: node --expose-gc --loader tsx scripts/benchmark-memory.ts');
  console.warn('   Results may be less accurate without manual GC control\n');
}

const ITERATIONS = parseInt(process.env.ITERATIONS || '1000');

interface MemoryStats {
  rss: number; // Resident set size (MB)
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
}

function getMemoryStats(): MemoryStats {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024),
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024),
    arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024),
  };
}

function formatMemory(mb: number): string {
  return `${mb}MB`;
}

interface MemoryBenchmarkResult {
  before: MemoryStats;
  after: MemoryStats;
  afterGC: MemoryStats;
  delta: {
    heapUsed: number;
    rss: number;
  };
  perRequest: number; // KB per request
  gcRecovered: number; // MB recovered by GC
  leakDetected: boolean;
}

async function benchmarkMemory(
  name: string,
  operation: () => Promise<any>,
  iterations: number = ITERATIONS
): Promise<MemoryBenchmarkResult> {
  console.log(`\n📊 Memory Benchmark: ${name}`);
  console.log(`   Iterations: ${iterations}`);

  // Force GC before test
  if (global.gc) {
    console.log('   Forcing GC before test...');
    global.gc();
    // Wait for GC to complete
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const memBefore = getMemoryStats();
  console.log(
    `   Memory before: ${formatMemory(memBefore.heapUsed)} heap, ${formatMemory(memBefore.rss)} RSS`
  );

  // Run operations
  for (let i = 0; i < iterations; i++) {
    try {
      await operation();
    } catch (error) {
      // Ignore errors, focus on memory usage
    }

    if ((i + 1) % 100 === 0) {
      const currentMem = getMemoryStats();
      process.stdout.write(
        `\r   Progress: ${i + 1}/${iterations} (${formatMemory(currentMem.heapUsed)} heap)`
      );
    }
  }

  console.log(); // New line

  const memAfter = getMemoryStats();
  console.log(
    `   Memory after: ${formatMemory(memAfter.heapUsed)} heap, ${formatMemory(memAfter.rss)} RSS`
  );

  const memDelta = {
    heapUsed: memAfter.heapUsed - memBefore.heapUsed,
    rss: memAfter.rss - memBefore.rss,
  };

  console.log(
    `   Memory delta: ${formatMemory(memDelta.heapUsed)} heap, ${formatMemory(memDelta.rss)} RSS`
  );
  console.log(
    `   Per-request overhead: ${((memDelta.heapUsed * 1024) / iterations).toFixed(2)}KB`
  );

  // Force GC after test
  if (global.gc) {
    console.log('   Forcing GC after test...');
    global.gc();
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const memAfterGC = getMemoryStats();
  console.log(
    `   Memory after GC: ${formatMemory(memAfterGC.heapUsed)} heap, ${formatMemory(memAfterGC.rss)} RSS`
  );

  const gcRecovered = memAfter.heapUsed - memAfterGC.heapUsed;
  const gcRecoveryRate =
    memAfter.heapUsed > 0 ? (gcRecovered / memAfter.heapUsed) * 100 : 0;

  console.log(
    `   Recovered by GC: ${formatMemory(gcRecovered)} (${gcRecoveryRate.toFixed(1)}%)`
  );

  // Leak detection
  const leakThreshold = 10; // MB
  const leakDetected = memAfterGC.heapUsed > memBefore.heapUsed + leakThreshold;

  if (leakDetected) {
    const leaked = memAfterGC.heapUsed - memBefore.heapUsed;
    console.warn(
      `   ⚠️  Potential memory leak detected! ${formatMemory(leaked)} not recovered by GC`
    );
  } else {
    console.log(`   ✅ No memory leak detected`);
  }

  return {
    before: memBefore,
    after: memAfter,
    afterGC: memAfterGC,
    delta: memDelta,
    perRequest: (memDelta.heapUsed * 1024) / iterations,
    gcRecovered,
    leakDetected,
  };
}

async function stressTestMemory(
  name: string,
  operation: () => Promise<any>,
  duration: number = 60000 // 1 minute
) {
  console.log(`\n📊 Memory Stress Test: ${name}`);
  console.log(`   Duration: ${duration / 1000}s`);

  const startTime = Date.now();
  const memorySnapshots: Array<{ time: number; memory: MemoryStats }> = [];
  let requests = 0;

  // Take initial snapshot
  memorySnapshots.push({
    time: 0,
    memory: getMemoryStats(),
  });

  while (Date.now() - startTime < duration) {
    try {
      await operation();
      requests++;
    } catch (error) {
      // Ignore errors
    }

    // Take snapshot every 5 seconds
    if (requests % 50 === 0) {
      const elapsed = Date.now() - startTime;
      memorySnapshots.push({
        time: elapsed,
        memory: getMemoryStats(),
      });

      const currentMem = getMemoryStats();
      process.stdout.write(
        `\r   Elapsed: ${(elapsed / 1000).toFixed(1)}s, ` +
          `Requests: ${requests}, ` +
          `Memory: ${formatMemory(currentMem.heapUsed)} heap`
      );
    }
  }

  console.log(); // New line

  // Analyze memory trend
  const firstSnapshot = memorySnapshots[0];
  const lastSnapshot = memorySnapshots[memorySnapshots.length - 1];

  const heapGrowth = lastSnapshot.memory.heapUsed - firstSnapshot.memory.heapUsed;
  const rssGrowth = lastSnapshot.memory.rss - firstSnapshot.memory.rss;

  console.log(`   Results:`);
  console.log(`     Total Requests: ${requests}`);
  console.log(`     Heap Growth: ${formatMemory(heapGrowth)}`);
  console.log(`     RSS Growth: ${formatMemory(rssGrowth)}`);

  // Check for steady growth (potential leak)
  const heapTrend =
    memorySnapshots.length > 1
      ? memorySnapshots
          .map((s, i) => (i > 0 ? s.memory.heapUsed - memorySnapshots[i - 1].memory.heapUsed : 0))
          .slice(1)
      : [];

  const averageGrowthPerSnapshot =
    heapTrend.reduce((a, b) => a + b, 0) / heapTrend.length;

  if (averageGrowthPerSnapshot > 2) {
    // >2MB growth per snapshot
    console.warn(`   ⚠️  Steady memory growth detected (avg ${averageGrowthPerSnapshot.toFixed(1)}MB per snapshot)`);
    console.warn(`   ⚠️  Possible memory leak - investigate with heap profiling`);
  } else {
    console.log(`   ✅ Memory usage stable`);
  }

  // Force GC and check recovery
  if (global.gc) {
    console.log('   Forcing GC...');
    global.gc();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const memAfterGC = getMemoryStats();
    const recovered = lastSnapshot.memory.heapUsed - memAfterGC.heapUsed;
    console.log(`   Recovered by GC: ${formatMemory(recovered)}`);

    if (memAfterGC.heapUsed > firstSnapshot.memory.heapUsed + 20) {
      console.warn(
        `   ⚠️  ${formatMemory(memAfterGC.heapUsed - firstSnapshot.memory.heapUsed)} not recovered - potential leak`
      );
    }
  }
}

async function main() {
  console.log('🚀 Wildberries SDK Memory Benchmarks\n');
  console.log(`SDK Version: ${sdk.version || '1.0.0'}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  console.log(`Heap Size: ${process.memoryUsage().heapTotal / 1024 / 1024}MB`);
  console.log(`Time: ${new Date().toISOString()}`);

  if (!global.gc) {
    console.log(`\n⚠️  Manual GC not available - results may be less accurate\n`);
  }

  const results: Record<string, MemoryBenchmarkResult> = {};

  try {
    // Benchmark General module
    console.log('\n=== General Module ===');
    results['General.ping'] = await benchmarkMemory(
      'General.ping()',
      () => sdk.general.ping(),
      Math.min(ITERATIONS, 500) // Reduced for rate limits
    );

    // Benchmark Products module
    console.log('\n=== Products Module ===');
    results['Products.getParentAll'] = await benchmarkMemory(
      'Products.getParentAll()',
      () => sdk.products.getParentAll(),
      Math.min(ITERATIONS, 200) // Reduced for rate limits
    );

    // Stress test (1 minute sustained load)
    console.log('\n=== Stress Test ===');
    await stressTestMemory('General.ping()', () => sdk.general.ping(), 30000); // 30 seconds
  } catch (error) {
    console.error('\n❌ Benchmark failed:', error);
    process.exit(1);
  }

  // Summary
  console.log('\n📈 Memory Usage Summary:\n');
  console.log('| Endpoint | Per-Request | Delta | Leak Detected |');
  console.log('|----------|-------------|-------|---------------|');
  Object.entries(results).forEach(([name, result]) => {
    console.log(
      `| ${name.padEnd(30)} | ${result.perRequest.toFixed(2)}KB | ${formatMemory(result.delta.heapUsed)} | ${result.leakDetected ? '⚠️  Yes' : '✅ No'} |`
    );
  });

  // Overall assessment
  const avgPerRequest =
    Object.values(results).reduce((sum, r) => sum + r.perRequest, 0) /
    Object.keys(results).length;
  const anyLeaks = Object.values(results).some((r) => r.leakDetected);

  console.log('\n📊 Overall Assessment:');
  console.log(`   Avg Per-Request Overhead: ${avgPerRequest.toFixed(2)}KB`);

  if (avgPerRequest < 1 && !anyLeaks) {
    console.log(`   ✅ Status: Excellent - Low memory overhead, no leaks`);
  } else if (avgPerRequest < 5 && !anyLeaks) {
    console.log(`   ⚠️  Status: Acceptable - Moderate overhead, no leaks`);
  } else {
    console.log(`   ❌ Status: Poor - High overhead or leaks detected`);
  }

  if (anyLeaks) {
    console.log('\n⚠️  Memory Leak Detected! Recommendations:');
    console.log('   1. Take heap snapshots before/after operations:');
    console.log('      const snapshot = v8.writeHeapSnapshot("before.heapsnapshot");');
    console.log('   2. Compare snapshots in Chrome DevTools (Memory tab)');
    console.log('   3. Look for retained objects and event listeners');
    console.log('   4. Ensure proper cleanup (timers, event listeners)');
  }

  console.log('\n💡 General Recommendations:');
  console.log('   - Monitor production memory usage with Prometheus');
  console.log('   - Set up alerting for high memory usage (>500MB)');
  console.log('   - Use connection pooling to reduce object creation');
  console.log('   - Implement bounded caches (LRU with max size)');

  console.log('\n✅ Memory benchmarks complete!');
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
