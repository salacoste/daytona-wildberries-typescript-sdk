/**
 * SDK Latency Benchmarking Script
 *
 * Measures API call latency (p50, p95, p99) for various SDK modules.
 *
 * Usage:
 *   tsx scripts/benchmark-latency.ts
 *
 * Environment Variables:
 *   WB_API_KEY - Wildberries API key (required)
 */

import { WildberriesSDK } from '../src';
import { performance } from 'perf_hooks';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});

if (!process.env.WB_API_KEY) {
  console.error('❌ Error: WB_API_KEY environment variable not set');
  console.log('Set your API key: export WB_API_KEY="your_key_here"');
  process.exit(1);
}

interface LatencyResult {
  p50: number;
  p95: number;
  p99: number;
  avg: number;
  min: number;
  max: number;
  errorRate: number;
}

async function benchmarkLatency(
  name: string,
  operation: () => Promise<any>,
  iterations: number = 100
): Promise<LatencyResult> {
  console.log(`\n📊 Benchmarking: ${name}`);
  console.log(`   Iterations: ${iterations}`);

  const latencies: number[] = [];
  let errors = 0;

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    try {
      await operation();
      const end = performance.now();
      latencies.push(end - start);
    } catch (error) {
      errors++;
    }

    if ((i + 1) % 10 === 0) {
      process.stdout.write(`\r   Progress: ${i + 1}/${iterations}`);
    }
  }

  console.log(); // New line

  if (latencies.length === 0) {
    console.error('   ❌ All requests failed!');
    return {
      p50: 0,
      p95: 0,
      p99: 0,
      avg: 0,
      min: 0,
      max: 0,
      errorRate: 100,
    };
  }

  latencies.sort((a, b) => a - b);

  const result = {
    p50: latencies[Math.floor(latencies.length * 0.5)],
    p95: latencies[Math.floor(latencies.length * 0.95)],
    p99: latencies[Math.floor(latencies.length * 0.99)],
    avg: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    min: latencies[0],
    max: latencies[latencies.length - 1],
    errorRate: (errors / iterations) * 100,
  };

  console.log(`   Results:`);
  console.log(`     p50: ${result.p50.toFixed(2)}ms`);
  console.log(`     p95: ${result.p95.toFixed(2)}ms`);
  console.log(`     p99: ${result.p99.toFixed(2)}ms`);
  console.log(`     avg: ${result.avg.toFixed(2)}ms`);
  console.log(`     min: ${result.min.toFixed(2)}ms`);
  console.log(`     max: ${result.max.toFixed(2)}ms`);
  console.log(`     error rate: ${result.errorRate.toFixed(2)}%`);

  // Performance assessment
  if (result.p95 < 500) {
    console.log(`     ✅ Performance: Excellent`);
  } else if (result.p95 < 1000) {
    console.log(`     ⚠️  Performance: Acceptable`);
  } else {
    console.log(`     ❌ Performance: Needs improvement`);
  }

  return result;
}

async function main() {
  console.log('🚀 Wildberries SDK Latency Benchmarks\n');
  console.log(`SDK Version: ${sdk.version || '1.0.0'}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  console.log(`Time: ${new Date().toISOString()}`);

  const results: Record<string, LatencyResult> = {};

  try {
    // Benchmark General module
    console.log('\n=== General Module ===');
    results['General.ping'] = await benchmarkLatency(
      'General.ping()',
      () => sdk.general.ping(),
      50 // Reduced for rate limits
    );

    // Benchmark Products module
    console.log('\n=== Products Module ===');
    results['Products.getParentAll'] = await benchmarkLatency(
      'Products.getParentAll()',
      () => sdk.products.getParentAll(),
      20 // Reduced for rate limits
    );

    // Benchmark Orders module
    console.log('\n=== Orders Module ===');
    results['Orders.getNewOrders'] = await benchmarkLatency(
      'OrdersFBS.getNewOrders()',
      () => sdk.ordersFBS.getNewOrders(),
      20 // Reduced for rate limits
    );

    // Benchmark Finances module
    console.log('\n=== Finances Module ===');
    results['Finances.getBalance'] = await benchmarkLatency(
      'Finances.getBalance()',
      () => sdk.finances.getBalance(),
      20 // Reduced for rate limits
    );
  } catch (error) {
    console.error('\n❌ Benchmark failed:', error);
    process.exit(1);
  }

  // Summary table
  console.log('\n📈 Summary:\n');
  console.log('| Endpoint | p50 | p95 | p99 | avg | error rate |');
  console.log('|----------|-----|-----|-----|-----|------------|');
  Object.entries(results).forEach(([name, result]) => {
    console.log(
      `| ${name.padEnd(30)} | ${result.p50.toFixed(0)}ms | ${result.p95.toFixed(0)}ms | ${result.p99.toFixed(0)}ms | ${result.avg.toFixed(0)}ms | ${result.errorRate.toFixed(1)}% |`
    );
  });

  // Overall assessment
  const avgP95 =
    Object.values(results).reduce((sum, r) => sum + r.p95, 0) /
    Object.keys(results).length;
  const avgErrorRate =
    Object.values(results).reduce((sum, r) => sum + r.errorRate, 0) /
    Object.keys(results).length;

  console.log('\n📊 Overall Performance:');
  console.log(`   Average p95 Latency: ${avgP95.toFixed(2)}ms`);
  console.log(`   Average Error Rate: ${avgErrorRate.toFixed(2)}%`);

  if (avgP95 < 500 && avgErrorRate < 1) {
    console.log(`   ✅ Status: Excellent - SDK performing optimally`);
  } else if (avgP95 < 1000 && avgErrorRate < 5) {
    console.log(`   ⚠️  Status: Acceptable - Consider optimization`);
  } else {
    console.log(`   ❌ Status: Poor - Optimization required`);
  }

  console.log('\n💡 Recommendations:');
  if (avgP95 > 500) {
    console.log('   - Enable connection pooling (keep-alive)');
    console.log('   - Implement caching for frequently accessed data');
    console.log('   - Check network latency and connectivity');
  }
  if (avgErrorRate > 1) {
    console.log('   - Review API rate limits');
    console.log('   - Implement request queueing');
    console.log('   - Check API key permissions');
  }

  console.log('\n✅ Latency benchmarks complete!');
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
