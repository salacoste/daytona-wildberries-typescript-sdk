/**
 * SDK Throughput Benchmarking Script
 *
 * Measures maximum sustainable throughput (requests/second) for SDK operations.
 *
 * Usage:
 *   tsx scripts/benchmark-throughput.ts
 *
 * Environment Variables:
 *   WB_API_KEY - Wildberries API key (required)
 *   DURATION - Benchmark duration in seconds (default: 10)
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

const BENCHMARK_DURATION_MS = parseInt(process.env.DURATION || '10') * 1000;

interface ThroughputResult {
  duration: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  requestsPerSecond: number;
  avgLatency: number;
  p50Latency: number;
  p95Latency: number;
  p99Latency: number;
}

async function benchmarkThroughput(
  name: string,
  operation: () => Promise<any>,
  durationMs: number = BENCHMARK_DURATION_MS
): Promise<ThroughputResult> {
  console.log(`\n📊 Throughput Benchmark: ${name}`);
  console.log(`   Duration: ${durationMs / 1000}s`);

  const startTime = Date.now();
  const latencies: number[] = [];
  let successful = 0;
  let failed = 0;

  while (Date.now() - startTime < durationMs) {
    const reqStart = performance.now();
    try {
      await operation();
      const reqEnd = performance.now();
      latencies.push(reqEnd - reqStart);
      successful++;
    } catch (error) {
      failed++;
    }

    if ((successful + failed) % 10 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const currentRate = ((successful + failed) / (Date.now() - startTime)) * 1000;
      process.stdout.write(
        `\r   Elapsed: ${elapsed}s, Requests: ${successful + failed}, Rate: ${currentRate.toFixed(1)} req/s`
      );
    }
  }

  console.log(); // New line

  const actualDuration = Date.now() - startTime;
  const totalRequests = successful + failed;

  if (latencies.length === 0) {
    console.error('   ❌ All requests failed!');
    return {
      duration: actualDuration / 1000,
      totalRequests,
      successfulRequests: successful,
      failedRequests: failed,
      requestsPerSecond: 0,
      avgLatency: 0,
      p50Latency: 0,
      p95Latency: 0,
      p99Latency: 0,
    };
  }

  latencies.sort((a, b) => a - b);

  const result = {
    duration: actualDuration / 1000,
    totalRequests,
    successfulRequests: successful,
    failedRequests: failed,
    requestsPerSecond: totalRequests / (actualDuration / 1000),
    avgLatency: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    p50Latency: latencies[Math.floor(latencies.length * 0.5)],
    p95Latency: latencies[Math.floor(latencies.length * 0.95)],
    p99Latency: latencies[Math.floor(latencies.length * 0.99)],
  };

  console.log(`   Results:`);
  console.log(`     Throughput: ${result.requestsPerSecond.toFixed(2)} req/s`);
  console.log(`     Total Requests: ${result.totalRequests}`);
  console.log(`     Successful: ${result.successfulRequests}`);
  console.log(`     Failed: ${result.failedRequests}`);
  console.log(`     Error Rate: ${((failed / totalRequests) * 100).toFixed(2)}%`);
  console.log(`     Avg Latency: ${result.avgLatency.toFixed(2)}ms`);
  console.log(`     p50 Latency: ${result.p50Latency.toFixed(2)}ms`);
  console.log(`     p95 Latency: ${result.p95Latency.toFixed(2)}ms`);
  console.log(`     p99 Latency: ${result.p99Latency.toFixed(2)}ms`);

  // Performance assessment
  if (result.requestsPerSecond > 100) {
    console.log(`     ✅ Throughput: Excellent (>${100} req/s)`);
  } else if (result.requestsPerSecond > 50) {
    console.log(`     ⚠️  Throughput: Acceptable (>${50} req/s)`);
  } else {
    console.log(`     ❌ Throughput: Low (<${50} req/s)`);
  }

  return result;
}

async function benchmarkConcurrency(
  name: string,
  operation: () => Promise<any>,
  concurrency: number,
  totalRequests: number = 100
): Promise<{
  concurrency: number;
  totalTime: number;
  throughput: number;
  errorRate: number;
  p95Latency: number;
}> {
  console.log(
    `\n📊 Concurrency Benchmark: ${name} (concurrency=${concurrency})`
  );

  const results: Array<{ latency: number; error: boolean }> = [];
  const startTime = performance.now();

  // Create batches of concurrent requests
  for (let i = 0; i < totalRequests; i += concurrency) {
    const batch = Array(Math.min(concurrency, totalRequests - i))
      .fill(null)
      .map(async () => {
        const reqStart = performance.now();
        try {
          await operation();
          const reqEnd = performance.now();
          results.push({ latency: reqEnd - reqStart, error: false });
        } catch (error) {
          results.push({ latency: 0, error: true });
        }
      });

    await Promise.all(batch);

    if ((i + concurrency) % 20 === 0) {
      process.stdout.write(`\r   Progress: ${i + concurrency}/${totalRequests}`);
    }
  }

  console.log(); // New line

  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // seconds

  const latencies = results
    .filter((r) => !r.error)
    .map((r) => r.latency)
    .sort((a, b) => a - b);

  const errors = results.filter((r) => r.error).length;

  const result = {
    concurrency,
    totalTime,
    throughput: totalRequests / totalTime,
    errorRate: (errors / totalRequests) * 100,
    p95Latency: latencies[Math.floor(latencies.length * 0.95)] || 0,
  };

  console.log(`   Results:`);
  console.log(`     Total Time: ${result.totalTime.toFixed(2)}s`);
  console.log(`     Throughput: ${result.throughput.toFixed(2)} req/s`);
  console.log(`     p95 Latency: ${result.p95Latency.toFixed(2)}ms`);
  console.log(`     Error Rate: ${result.errorRate.toFixed(2)}%`);

  return result;
}

async function main() {
  console.log('🚀 Wildberries SDK Throughput Benchmarks\n');
  console.log(`SDK Version: ${sdk.version || '1.0.0'}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  console.log(`Duration: ${BENCHMARK_DURATION_MS / 1000}s per benchmark`);
  console.log(`Time: ${new Date().toISOString()}`);

  const results: Record<string, ThroughputResult> = {};

  try {
    // Benchmark sustained throughput
    console.log('\n=== Sustained Throughput ===');

    results['General.ping'] = await benchmarkThroughput(
      'General.ping()',
      () => sdk.general.ping(),
      BENCHMARK_DURATION_MS
    );

    // Benchmark concurrency levels
    console.log('\n=== Concurrency Analysis ===');

    const concurrencyLevels = [1, 5, 10, 25];
    const concurrencyResults: Array<{
      concurrency: number;
      throughput: number;
      errorRate: number;
      p95Latency: number;
    }> = [];

    for (const concurrency of concurrencyLevels) {
      const result = await benchmarkConcurrency(
        'General.ping()',
        () => sdk.general.ping(),
        concurrency,
        50 // Reduced for rate limits
      );
      concurrencyResults.push(result);
    }

    // Concurrency summary
    console.log('\n📊 Concurrency Analysis Results:\n');
    console.log('| Concurrency | Throughput | p95 Latency | Error Rate |');
    console.log('|-------------|------------|-------------|------------|');
    concurrencyResults.forEach((result) => {
      console.log(
        `| ${result.concurrency.toString().padStart(11)} | ${result.throughput.toFixed(2).padStart(10)} req/s | ${result.p95Latency.toFixed(2).padStart(11)}ms | ${result.errorRate.toFixed(2).padStart(10)}% |`
      );
    });

    // Find optimal concurrency
    const optimalConcurrency = concurrencyResults
      .filter((r) => r.errorRate < 5) // Less than 5% errors
      .sort((a, b) => b.throughput - a.throughput)[0];

    if (optimalConcurrency) {
      console.log(
        `\n💡 Optimal Concurrency: ${optimalConcurrency.concurrency} ` +
          `(${optimalConcurrency.throughput.toFixed(2)} req/s, ` +
          `${optimalConcurrency.errorRate.toFixed(2)}% errors)`
      );
    }
  } catch (error) {
    console.error('\n❌ Benchmark failed:', error);
    process.exit(1);
  }

  // Summary
  console.log('\n📈 Sustained Throughput Summary:\n');
  console.log('| Endpoint | Throughput | Error Rate | Avg Latency |');
  console.log('|----------|------------|------------|-------------|');
  Object.entries(results).forEach(([name, result]) => {
    console.log(
      `| ${name.padEnd(30)} | ${result.requestsPerSecond.toFixed(2)} req/s | ${((result.failedRequests / result.totalRequests) * 100).toFixed(2)}% | ${result.avgLatency.toFixed(2)}ms |`
    );
  });

  // Overall assessment
  const avgThroughput =
    Object.values(results).reduce((sum, r) => sum + r.requestsPerSecond, 0) /
    Object.keys(results).length;

  console.log('\n📊 Overall Performance:');
  console.log(`   Average Throughput: ${avgThroughput.toFixed(2)} req/s`);

  if (avgThroughput > 100) {
    console.log(`   ✅ Status: Excellent - High throughput achieved`);
  } else if (avgThroughput > 50) {
    console.log(`   ⚠️  Status: Acceptable - Room for optimization`);
  } else {
    console.log(`   ❌ Status: Low - Optimization required`);
  }

  console.log('\n💡 Recommendations:');
  if (avgThroughput < 100) {
    console.log('   - Use batch operations for bulk processing');
    console.log('   - Implement parallel requests to different endpoints');
    console.log('   - Enable connection pooling (keep-alive)');
    console.log('   - Implement intelligent request queueing');
  }

  console.log('\n✅ Throughput benchmarks complete!');
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
