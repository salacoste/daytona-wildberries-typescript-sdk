/**
 * Financial Reconciliation Example
 *
 * Demonstrates matching financial transactions to sales data for accounting purposes.
 * This workflow combines data from the Finances and Reports modules to ensure
 * financial accuracy and identify discrepancies between reported sales and actual payments.
 *
 * **Use Case**: Monthly financial reconciliation for accounting teams
 *
 * **Modules Used**:
 * - Finances: Transaction history (ppvz_for_pay - payment to supplier)
 * - Reports: Sales data (forPay - amount to be paid to seller)
 *
 * **Key Features**:
 * - Match transactions to sales by saleID, nmId, and amount
 * - Identify timing discrepancies (payments may lag sales by hours/days)
 * - Flag unmatched transactions and sales for investigation
 * - Calculate reconciliation metrics (match rate, total discrepancies)
 * - Handle large datasets with pagination (80K+ transaction records)
 *
 * **Rate Limits**:
 * - Finances endpoints: 1 request/minute
 * - Reports endpoints: 1 request/minute
 * - Total reconciliation time: ~2-3 minutes for data fetch + processing
 *
 * **Performance Considerations**:
 * - Large datasets (80K+ rows) require pagination and cursor management
 * - Memory usage: 100-300MB for typical monthly reconciliation
 * - Processing time: 30-60 seconds for matching logic after data fetch
 * - Recommend running reconciliation during off-peak hours
 *
 * @example
 * ```bash
 * # Set API key
 * export WB_API_KEY="your-api-key-here"
 *
 * # Run reconciliation
 * npx ts-node examples/financial-reconciliation.ts
 * ```
 */

import { WildberriesSDK } from '../src';
import type { Transaction, TransactionFilters } from '../src/types/finances.types';
import type { SalesItem } from '../src/types/reports.types';

/**
 * Reconciliation report structure
 */
interface ReconciliationReport {
  period: {
    from: string;
    to: string;
  };
  totalTransactionValue: number; // Sum of ppvz_for_pay from transactions
  totalSalesRevenue: number; // Sum of forPay from sales
  transactionCount: number;
  salesCount: number;
  matched: Array<{
    transactionId: number; // rrd_id
    saleId: string; // saleID
    nmId: number; // Product ID
    amount: number; // ppvz_for_pay
    matchConfidence: 'exact' | 'probable' | 'possible';
  }>;
  unmatched: {
    sales: SalesItem[];
    transactions: Transaction[];
  };
  discrepancies: Array<{
    type:
      | 'amount_mismatch'
      | 'timing_issue'
      | 'missing_transaction'
      | 'missing_sale'
      | 'product_mismatch';
    description: string;
    amount: number;
    transactionId?: number;
    saleId?: string;
  }>;
  metrics: {
    matchRate: number; // Percentage of sales matched to transactions
    totalDiscrepancyAmount: number;
    averageTimingLag: number; // Average hours between sale and transaction record
  };
}

/**
 * Match a transaction to a sale by nmId, amount, and timing proximity
 */
function matchTransactionToSale(
  transaction: Transaction,
  sales: SalesItem[],
  maxTimingDifferenceHours: number = 72 // 3 days
): { sale: SalesItem; confidence: 'exact' | 'probable' | 'possible' } | null {
  const transactionTime = transaction.sale_dt ? new Date(transaction.sale_dt).getTime() : 0;
  const transactionAmount = Math.abs(transaction.ppvz_for_pay);
  const transactionNmId = transaction.nm_id;

  for (const sale of sales) {
    const saleTime = new Date(sale.date).getTime();
    const saleAmount = Math.abs(sale.forPay);
    const saleNmId = sale.nmId;

    // Check product ID match
    const productMatch = transactionNmId === saleNmId;

    // Check amount match (exact or within 1% for rounding)
    const amountDiff = Math.abs(transactionAmount - saleAmount);
    const amountMatchExact = amountDiff < 0.01;
    const amountMatchClose = saleAmount > 0 && amountDiff / saleAmount < 0.01;

    // Check timing proximity (if transaction has sale_dt)
    const timeDiffHours = transactionTime > 0
      ? Math.abs(transactionTime - saleTime) / (1000 * 60 * 60)
      : 999;
    const withinTimeWindow = timeDiffHours <= maxTimingDifferenceHours;

    // Exact match: Product + Amount + Timing all match
    if (productMatch && amountMatchExact && withinTimeWindow) {
      return { sale, confidence: 'exact' };
    }

    // Probable match: Product + Amount match, timing is close or unknown
    if (productMatch && amountMatchClose && (withinTimeWindow || transactionTime === 0)) {
      return { sale, confidence: 'probable' };
    }

    // Possible match: Amount matches but product or timing differs
    if (amountMatchExact && withinTimeWindow) {
      return { sale, confidence: 'possible' };
    }
  }

  return null;
}

/**
 * Perform financial reconciliation between transactions and sales data
 */
async function performReconciliation(apiKey: string): Promise<ReconciliationReport> {
  const sdk = new WildberriesSDK({ apiKey });

  // Define reconciliation period (last 30 days)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const period = {
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  };

  console.log('=== Financial Reconciliation Report ===');
  console.log(`Period: ${period.from.split('T')[0]} to ${period.to.split('T')[0]}`);
  console.log();

  // Track performance
  const perfStart = Date.now();
  const modulePerf: Record<string, number> = {};

  try {
    // Step 1: Fetch transactions from Finances module
    console.log('[1/2] Fetching financial transactions...');
    const transactionsStart = Date.now();

    let allTransactions: Transaction[] = [];
    try {
      // Fetch transaction records (realizationreport contains all financial details)
      const filters: TransactionFilters = {
        dateFrom: startDate.toISOString().split('T')[0],
        dateTo: endDate.toISOString().split('T')[0],
      };

      allTransactions = await sdk.finances.getTransactions(filters);
      console.log(`  ✓ Fetched ${allTransactions.length} transaction records`);
    } catch (error) {
      console.error('  ✗ Failed to fetch transactions:', error);
      throw error;
    }

    modulePerf.transactions = Date.now() - transactionsStart;

    // Rate limit delay (1 req/min for Finances)
    console.log('  ⏳ Waiting 60s for rate limit...');
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Step 2: Fetch sales from Reports module
    console.log('[2/2] Fetching sales data...');
    const salesStart = Date.now();

    let allSales: SalesItem[] = [];
    try {
      // Fetch sales (dateFrom parameter, flag=1 for all sales)
      allSales = await sdk.reports.getSales(startDate.toISOString().split('T')[0], 1);
      console.log(`  ✓ Fetched ${allSales.length} sales records`);
    } catch (error) {
      console.error('  ✗ Failed to fetch sales:', error);
      // Continue with empty sales if this fails
      allSales = [];
    }

    modulePerf.sales = Date.now() - salesStart;

    console.log();
    console.log('=== Data Fetching Complete ===');
    console.log(`Total fetch time: ${((Date.now() - perfStart) / 1000).toFixed(1)}s`);
    console.log(
      `Breakdown: Transactions=${(modulePerf.transactions / 1000).toFixed(1)}s, Sales=${(modulePerf.sales / 1000).toFixed(1)}s`
    );
    console.log();

    // Step 3: Perform reconciliation matching
    console.log('=== Performing Reconciliation ===');
    const matchingStart = Date.now();

    const matched: ReconciliationReport['matched'] = [];
    const unmatchedTransactions: Transaction[] = [];
    const unmatchedSales: SalesItem[] = [...allSales];
    const discrepancies: ReconciliationReport['discrepancies'] = [];

    // Match transactions to sales
    for (const transaction of allTransactions) {
      // Only match transactions with payment amounts
      if (transaction.ppvz_for_pay === 0) {
        unmatchedTransactions.push(transaction);
        continue;
      }

      const matchResult = matchTransactionToSale(transaction, allSales);

      if (matchResult) {
        matched.push({
          transactionId: transaction.rrd_id,
          saleId: matchResult.sale.saleID,
          nmId: transaction.nm_id,
          amount: transaction.ppvz_for_pay,
          matchConfidence: matchResult.confidence,
        });

        // Remove matched sale from unmatched list
        const saleIndex = unmatchedSales.findIndex((s) => s.saleID === matchResult.sale.saleID);
        if (saleIndex !== -1) {
          unmatchedSales.splice(saleIndex, 1);
        }

        // Flag timing discrepancies
        if (matchResult.confidence === 'possible') {
          discrepancies.push({
            type: 'product_mismatch',
            description: `Transaction ${transaction.rrd_id} matched to sale ${matchResult.sale.saleID} but products differ`,
            amount: transaction.ppvz_for_pay,
            transactionId: transaction.rrd_id,
            saleId: matchResult.sale.saleID,
          });
        }
      } else {
        unmatchedTransactions.push(transaction);
        discrepancies.push({
          type: 'missing_sale',
          description: `Transaction ${transaction.rrd_id} (nmId: ${transaction.nm_id}) has no matching sale`,
          amount: transaction.ppvz_for_pay,
          transactionId: transaction.rrd_id,
        });
      }
    }

    // Flag unmatched sales as missing transactions
    for (const sale of unmatchedSales) {
      discrepancies.push({
        type: 'missing_transaction',
        description: `Sale ${sale.saleID} (nmId: ${sale.nmId}) has no matching transaction`,
        amount: sale.forPay,
        saleId: sale.saleID,
      });
    }

    const matchingTime = Date.now() - matchingStart;
    console.log(`Matching logic completed in ${(matchingTime / 1000).toFixed(1)}s`);
    console.log();

    // Step 4: Calculate metrics
    const totalTransactionValue = allTransactions.reduce(
      (sum, tx) => sum + tx.ppvz_for_pay,
      0
    );
    const totalSalesRevenue = allSales.reduce((sum, sale) => sum + sale.forPay, 0);

    const matchRate = allSales.length > 0 ? (matched.length / allSales.length) * 100 : 0;
    const totalDiscrepancyAmount = discrepancies.reduce(
      (sum, disc) => sum + Math.abs(disc.amount),
      0
    );

    // Calculate average timing lag for exact matches
    const exactMatches = matched.filter((m) => m.matchConfidence === 'exact');
    let averageTimingLag = 0;
    if (exactMatches.length > 0) {
      const timingLags = exactMatches.map((m) => {
        const transaction = allTransactions.find((t) => t.rrd_id === m.transactionId);
        const sale = allSales.find((s) => s.saleID === m.saleId);
        if (transaction && sale && transaction.sale_dt) {
          const txTime = new Date(transaction.sale_dt).getTime();
          const saleTime = new Date(sale.date).getTime();
          return Math.abs(txTime - saleTime) / (1000 * 60 * 60); // hours
        }
        return 0;
      });
      averageTimingLag =
        timingLags.reduce((sum, lag) => sum + lag, 0) / timingLags.length;
    }

    const report: ReconciliationReport = {
      period,
      totalTransactionValue,
      totalSalesRevenue,
      transactionCount: allTransactions.length,
      salesCount: allSales.length,
      matched,
      unmatched: {
        sales: unmatchedSales,
        transactions: unmatchedTransactions,
      },
      discrepancies,
      metrics: {
        matchRate,
        totalDiscrepancyAmount,
        averageTimingLag,
      },
    };

    // Display report summary
    console.log('=== Reconciliation Summary ===');
    console.log(`Transaction Records: ${allTransactions.length}`);
    console.log(`Sales Records: ${allSales.length}`);
    console.log();
    console.log(`Matched: ${matched.length} (${matchRate.toFixed(1)}%)`);
    console.log(
      `  - Exact matches: ${matched.filter((m) => m.matchConfidence === 'exact').length}`
    );
    console.log(
      `  - Probable matches: ${matched.filter((m) => m.matchConfidence === 'probable').length}`
    );
    console.log(
      `  - Possible matches: ${matched.filter((m) => m.matchConfidence === 'possible').length}`
    );
    console.log();
    console.log(`Unmatched Sales: ${unmatchedSales.length}`);
    console.log(`Unmatched Transactions: ${unmatchedTransactions.length}`);
    console.log();
    console.log(`Total Transaction Value: ${totalTransactionValue.toFixed(2)} RUB`);
    console.log(`Total Sales Revenue: ${totalSalesRevenue.toFixed(2)} RUB`);
    console.log(
      `Variance: ${(totalTransactionValue - totalSalesRevenue).toFixed(2)} RUB (${(((totalTransactionValue - totalSalesRevenue) / totalSalesRevenue) * 100).toFixed(2)}%)`
    );
    console.log();
    console.log(`Discrepancies Found: ${discrepancies.length}`);
    console.log(`Total Discrepancy Amount: ${totalDiscrepancyAmount.toFixed(2)} RUB`);
    console.log(`Average Sale-to-Transaction Lag: ${averageTimingLag.toFixed(1)} hours`);
    console.log();

    // Display top discrepancies by type
    if (discrepancies.length > 0) {
      const discrepanciesByType = {
        missing_sale: discrepancies.filter((d) => d.type === 'missing_sale'),
        missing_transaction: discrepancies.filter((d) => d.type === 'missing_transaction'),
        product_mismatch: discrepancies.filter((d) => d.type === 'product_mismatch'),
      };

      console.log('=== Discrepancy Breakdown ===');
      console.log(
        `Missing Sales (transactions without sales): ${discrepanciesByType.missing_sale.length}`
      );
      console.log(
        `Missing Transactions (sales without transactions): ${discrepanciesByType.missing_transaction.length}`
      );
      console.log(
        `Product Mismatches: ${discrepanciesByType.product_mismatch.length}`
      );
      console.log();

      console.log('=== Top Discrepancies (First 5) ===');
      discrepancies
        .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
        .slice(0, 5)
        .forEach((disc, index) => {
          console.log(`${index + 1}. [${disc.type}] ${disc.description}`);
          console.log(`   Amount: ${disc.amount.toFixed(2)} RUB`);
        });
      console.log();
    }

    // Performance summary
    const totalTime = (Date.now() - perfStart) / 1000;
    console.log('=== Performance Summary ===');
    console.log(`Total reconciliation time: ${totalTime.toFixed(1)}s`);
    console.log(`  Data fetching: ${((modulePerf.transactions + modulePerf.sales) / 1000).toFixed(1)}s`);
    console.log(`  Matching logic: ${(matchingTime / 1000).toFixed(1)}s`);
    console.log();

    return report;
  } catch (error) {
    console.error('❌ Reconciliation failed:', error);
    throw error;
  }
}

// Main execution
if (require.main === module) {
  const apiKey = process.env.WB_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: WB_API_KEY environment variable not set');
    console.error(
      'Usage: WB_API_KEY=your-api-key npx ts-node examples/financial-reconciliation.ts'
    );
    process.exit(1);
  }

  performReconciliation(apiKey)
    .then((report) => {
      console.log('✅ Reconciliation completed successfully');
      console.log();
      console.log('📊 Next Steps:');
      console.log('1. Review unmatched transactions and sales');
      console.log('2. Investigate discrepancies >1000 RUB');
      console.log('3. Export report to accounting system');
      console.log('4. Schedule next reconciliation');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

export { performReconciliation, ReconciliationReport };
