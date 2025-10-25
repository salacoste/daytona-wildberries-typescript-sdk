/**
 * Financial Reports and Payouts Example
 *
 * Demonstrates usage of the Wildberries SDK Finances Module for:
 * - Generating financial reports (sales, tax, commission)
 * - Async report generation with polling
 * - Downloading completed reports
 * - Retrieving payout history
 * - Getting payout details with fee breakdown
 *
 * Story 3.2: Finances Module - Financial Reports and Payouts
 */

import { WildberriesSDK } from '../src';

// Initialize SDK with API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
});

/**
 * Example 1: Generate and Download Financial Report
 *
 * Demonstrates the async report generation workflow:
 * 1. Initiate report generation
 * 2. Poll for completion
 * 3. Download completed report
 */
async function generateAndDownloadReport() {
  console.log('\n=== Generate and Download Financial Report ===\n');

  try {
    // Step 1: Initiate report generation
    console.log('Generating sales summary report for 2024...');
    const reportGen = await sdk.finances.generateReport(
      'sales_summary',
      {
        from: '2024-01-01',
        to: '2024-12-31',
      },
      'pdf'
    );

    console.log(`Report ID: ${reportGen.reportId}`);
    console.log(`Status: ${reportGen.status}`);
    console.log(`Created: ${reportGen.createdAt}\n`);

    // Step 2: Poll for completion (check every 5 seconds)
    console.log('Waiting for report to complete...');
    let report;
    let attempts = 0;
    const maxAttempts = 60; // Max 5 minutes

    do {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
      report = await sdk.finances.getReport(reportGen.reportId);

      attempts++;
      console.log(`  Attempt ${attempts}: Status = ${report.status}`);

      if (report.status === 'failed') {
        throw new Error(`Report generation failed: ${report.error}`);
      }

      if (attempts >= maxAttempts) {
        throw new Error('Report generation timeout after 5 minutes');
      }
    } while (report.status !== 'completed');

    // Step 3: Download completed report
    console.log('\nReport completed! Downloading...');
    const download = await sdk.finances.downloadReport(reportGen.reportId);

    console.log(`Download URL: ${download.url}`);
    console.log(`Format: ${download.format}`);
    console.log(`Expires at: ${download.expiresAt}`);
    console.log('\n✅ Report ready for download!');
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}

/**
 * Example 2: Generate Reports in Different Formats
 *
 * Demonstrates generating various report types in different formats
 */
async function generateMultipleReports() {
  console.log('\n=== Generate Multiple Report Types ===\n');

  const reportConfigs = [
    { type: 'sales_summary', format: 'pdf', period: 'Q1 2024' },
    { type: 'tax_report', format: 'xlsx', period: '2024' },
    { type: 'commission_breakdown', format: 'csv', period: 'January 2024' },
    { type: 'detailed_transactions', format: 'json', period: 'Last Week' },
  ] as const;

  try {
    for (const config of reportConfigs) {
      console.log(`Generating ${config.type} (${config.format})...`);

      const report = await sdk.finances.generateReport(
        config.type,
        {
          from: '2024-01-01',
          to: '2024-03-31',
        },
        config.format
      );

      console.log(`  ✓ Report ID: ${report.reportId}`);
      console.log(`    Status: ${report.status}\n`);
    }

    console.log('✅ All reports initiated successfully!');
  } catch (error) {
    console.error('Error generating reports:', error);
    throw error;
  }
}

/**
 * Example 3: Get Payout History
 *
 * Demonstrates retrieving payout history with filtering and pagination
 */
async function getPayoutHistory() {
  console.log('\n=== Get Payout History ===\n');

  try {
    // Get completed payouts from last month
    console.log('Fetching completed payouts from January 2024...');
    const payouts = await sdk.finances.getPayouts({
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31',
      status: 'completed',
      limit: 50,
      offset: 0,
    });

    console.log(`\nFound ${payouts.data.length} payouts`);
    console.log(`Total in database: ${payouts.pagination?.total || 'N/A'}`);
    console.log(`Has more: ${payouts.pagination?.hasMore || false}\n`);

    // Display payout summary
    payouts.data.forEach((payout, index) => {
      console.log(`${index + 1}. Payout ${payout.id}`);
      console.log(`   Amount: ${payout.amount} ${payout.currency}`);
      console.log(`   Date: ${payout.date}`);
      console.log(`   Status: ${payout.status}`);
      console.log(`   Bank: ${payout.bankInfo.bankName}`);
      console.log(`   Account: ${payout.bankInfo.accountNumber}`);
      console.log(`   Transactions: ${payout.transactionCount || 'N/A'}\n`);
    });

    // Pagination example
    if (payouts.pagination?.hasMore) {
      console.log('Fetching next page...');
      const nextPage = await sdk.finances.getPayouts({
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        status: 'completed',
        limit: 50,
        offset: payouts.pagination.offset + payouts.pagination.limit,
      });

      console.log(`Next page: ${nextPage.data.length} payouts\n`);
    }

    console.log('✅ Payout history retrieved successfully!');
  } catch (error) {
    console.error('Error fetching payout history:', error);
    throw error;
  }
}

/**
 * Example 4: Get Payout Details with Fee Breakdown
 *
 * Demonstrates retrieving detailed payout information including fees
 */
async function getPayoutDetails() {
  console.log('\n=== Get Payout Details with Fee Breakdown ===\n');

  try {
    // Get specific payout details
    const payoutId = 'payout_xyz789'; // Replace with actual payout ID
    console.log(`Fetching details for payout: ${payoutId}...\n`);

    const payout = await sdk.finances.getPayoutById(payoutId);

    // Display payout summary
    console.log('=== Payout Summary ===');
    console.log(`ID: ${payout.id}`);
    console.log(`Status: ${payout.status}`);
    console.log(`Date: ${payout.date}`);
    console.log(`Currency: ${payout.currency}\n`);

    // Display fee breakdown
    console.log('=== Fee Breakdown ===');
    console.log(`Gross Amount: ${payout.amount} ${payout.currency}`);
    console.log(`Commission: -${payout.feeBreakdown.commission} ${payout.currency}`);
    console.log(
      `Processing Fee: -${payout.feeBreakdown.processingFee} ${payout.currency}`
    );
    console.log(
      `Total Fees: -${payout.feeBreakdown.totalFees} ${payout.currency}`
    );
    console.log(
      `Net Amount: ${payout.feeBreakdown.netAmount} ${payout.currency}\n`
    );

    // Display bank transfer info
    console.log('=== Bank Transfer ===');
    console.log(`Bank: ${payout.bankInfo.bankName}`);
    console.log(`Account: ${payout.bankInfo.accountNumber}`);
    console.log(`Bank Code: ${payout.bankInfo.bankCode || 'N/A'}`);
    console.log(`Transfer Date: ${payout.bankInfo.transferDate}\n`);

    // Display transaction info
    console.log('=== Transactions ===');
    console.log(`Period: ${payout.periodFrom} to ${payout.periodTo}`);
    console.log(`Transaction Count: ${payout.transactionCount}`);
    if (payout.transactionIds) {
      console.log(
        `Transaction IDs: ${payout.transactionIds.slice(0, 5).join(', ')}${payout.transactionIds.length > 5 ? '...' : ''}`
      );
    }

    console.log('\n✅ Payout details retrieved successfully!');
  } catch (error) {
    console.error('Error fetching payout details:', error);
    throw error;
  }
}

/**
 * Example 5: Filter Payouts by Status
 *
 * Demonstrates filtering payouts by different statuses
 */
async function filterPayoutsByStatus() {
  console.log('\n=== Filter Payouts by Status ===\n');

  const statuses = ['pending', 'processing', 'completed', 'failed', 'cancelled'] as const;

  try {
    for (const status of statuses) {
      console.log(`Fetching ${status} payouts...`);

      const payouts = await sdk.finances.getPayouts({
        status,
        limit: 10,
      });

      console.log(`  Found ${payouts.data.length} ${status} payouts\n`);
    }

    console.log('✅ Status filtering completed successfully!');
  } catch (error) {
    console.error('Error filtering payouts:', error);
    throw error;
  }
}

/**
 * Example 6: Complete Workflow - Reports and Payouts Together
 *
 * Demonstrates a complete financial reconciliation workflow
 */
async function completeFinancialWorkflow() {
  console.log('\n=== Complete Financial Workflow ===\n');

  try {
    // Step 1: Generate financial report
    console.log('Step 1: Generating detailed transactions report...');
    const report = await sdk.finances.generateReport(
      'detailed_transactions',
      {
        from: '2024-01-01',
        to: '2024-01-31',
      },
      'csv'
    );
    console.log(`  ✓ Report initiated: ${report.reportId}\n`);

    // Step 2: Get payouts for the same period
    console.log('Step 2: Fetching payouts for January 2024...');
    const payouts = await sdk.finances.getPayouts({
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31',
      status: 'completed',
    });
    console.log(`  ✓ Found ${payouts.data.length} payouts\n`);

    // Step 3: Calculate total payout amounts
    console.log('Step 3: Calculating total payout amounts...');
    const totalGross = payouts.data.reduce((sum, p) => sum + p.amount, 0);
    console.log(`  Total Gross: ${totalGross} RUB\n`);

    // Step 4: Get detailed fee breakdown for first payout
    if (payouts.data.length > 0) {
      console.log('Step 4: Getting fee breakdown for first payout...');
      const firstPayout = await sdk.finances.getPayoutById(payouts.data[0].id);
      console.log(`  Commission: ${firstPayout.feeBreakdown.commission} RUB`);
      console.log(
        `  Processing Fee: ${firstPayout.feeBreakdown.processingFee} RUB`
      );
      console.log(`  Net Amount: ${firstPayout.feeBreakdown.netAmount} RUB\n`);
    }

    console.log('✅ Complete financial workflow executed successfully!');
  } catch (error) {
    console.error('Error in financial workflow:', error);
    throw error;
  }
}

/**
 * Main function - Run all examples
 */
async function main() {
  console.log('Wildberries SDK - Financial Reports and Payouts Examples');
  console.log('=======================================================');

  try {
    // Uncomment the examples you want to run:

    await generateAndDownloadReport();
    // await generateMultipleReports();
    // await getPayoutHistory();
    // await getPayoutDetails();
    // await filterPayoutsByStatus();
    // await completeFinancialWorkflow();

    console.log('\n🎉 All examples completed successfully!');
  } catch (error) {
    console.error('\n❌ Example failed:', error);
    process.exit(1);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  main();
}

// Export functions for use in other files
export {
  generateAndDownloadReport,
  generateMultipleReports,
  getPayoutHistory,
  getPayoutDetails,
  filterPayoutsByStatus,
  completeFinancialWorkflow,
};
