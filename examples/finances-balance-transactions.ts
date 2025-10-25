/**
 * Wildberries SDK - Finances Module Example
 *
 * This example demonstrates financial data operations including:
 * - Retrieving account balance
 * - Fetching transaction history with pagination
 * - Searching for specific transactions
 * - Downloading financial documents
 * - Handling large datasets
 *
 * Prerequisites:
 * 1. Get your API key from the Wildberries seller portal: https://seller.wildberries.ru/
 * 2. Set the WB_API_KEY environment variable:
 *    export WB_API_KEY="your-api-key-here"
 *
 * Run this example:
 *    npx tsx examples/finances-balance-transactions.ts
 */

import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
} from '../src';

/**
 * Main function demonstrating Finances module usage
 */
async function main() {
  console.log('💰 Wildberries SDK - Finances Module Example\n');

  // ============================================================================
  // Step 1: Initialize the SDK
  // ============================================================================

  console.log('Step 1: Initializing SDK...');

  const apiKey = process.env.WB_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: WB_API_KEY environment variable is not set');
    console.log('\nPlease set your API key:');
    console.log('  export WB_API_KEY="your-api-key-here"\n');
    process.exit(1);
  }

  try {
    const sdk = new WildberriesSDK({
      apiKey,
      timeout: 30000,
      logLevel: 'info',
    });

    console.log('✅ SDK initialized successfully\n');

    // ============================================================================
    // Step 2: Get Account Balance
    // ============================================================================

    console.log('Step 2: Fetching account balance...');

    try {
      const balance = await sdk.finances.getBalance();

      console.log('✅ Balance retrieved successfully:');
      console.log(`   Currency: ${balance.currency}`);
      console.log(`   Current Balance: ${balance.current.toFixed(2)} ${balance.currency}`);
      console.log(
        `   Available for Withdrawal: ${balance.for_withdraw.toFixed(2)} ${balance.currency}`
      );

      const percentAvailable =
        ((balance.for_withdraw / balance.current) * 100).toFixed(1);
      console.log(`   (${percentAvailable}% available for withdrawal)\n`);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.error('⚠️  Rate limit exceeded. Please try again later.');
      } else {
        console.error('❌ Failed to fetch balance:', error);
      }
    }

    // ============================================================================
    // Step 3: Get Recent Transaction History
    // ============================================================================

    console.log('Step 3: Fetching recent transaction history...');

    try {
      // Get transactions from the last 7 days
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      const dateFrom = sevenDaysAgo.toISOString().split('T')[0];
      const dateTo = today.toISOString().split('T')[0];

      console.log(`   Date range: ${dateFrom} to ${dateTo}`);

      const transactions = await sdk.finances.getTransactions({
        dateFrom,
        dateTo,
        limit: 10, // Get first 10 transactions
        period: 'weekly',
      });

      console.log(`✅ Retrieved ${transactions.length} transactions\n`);

      if (transactions.length > 0) {
        console.log('   Recent transactions:');
        transactions.slice(0, 5).forEach((txn, index) => {
          console.log(`   ${index + 1}. ID: ${txn.rrd_id}`);
          console.log(`      Brand: ${txn.brand_name} (${txn.sa_name})`);
          console.log(`      Type: ${txn.doc_type_name}`);
          console.log(`      Amount: ${txn.ppvz_for_pay} ${txn.currency_name}`);
          console.log(`      Sale Date: ${txn.sale_dt}`);
          console.log('');
        });
      } else {
        console.log('   No transactions found for this period\n');
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error('❌ Invalid date range:', error.message);
      } else {
        console.error('❌ Failed to fetch transactions:', error);
      }
    }

    // ============================================================================
    // Step 4: Pagination Example - Fetch All Transactions
    // ============================================================================

    console.log('Step 4: Demonstrating pagination for large datasets...');

    try {
      const dateFrom = '2024-01-01';
      const dateTo = '2024-01-31';

      console.log(`   Fetching all transactions from ${dateFrom} to ${dateTo}...`);

      let allTransactions: typeof transactions = [];
      let rrdid = 0;
      let pageNumber = 1;
      let hasMore = true;

      while (hasMore) {
        const page = await sdk.finances.getTransactions({
          dateFrom,
          dateTo,
          rrdid,
          limit: 100000, // Max limit per request
        });

        if (page.length === 0) {
          hasMore = false;
        } else {
          console.log(`   ✓ Page ${pageNumber}: ${page.length} transactions`);
          allTransactions = allTransactions.concat(page);

          // Use the last transaction's rrd_id for next page
          rrdid = page[page.length - 1].rrd_id;
          pageNumber++;
        }

        // Safety limit to prevent infinite loops in this example
        if (pageNumber > 10) {
          console.log('   (Stopping after 10 pages for demo purposes)');
          hasMore = false;
        }
      }

      console.log(`✅ Total transactions fetched: ${allTransactions.length}\n`);

      // Calculate summary statistics
      if (allTransactions.length > 0) {
        const totalAmount = allTransactions.reduce(
          (sum, txn) => sum + txn.ppvz_for_pay,
          0
        );
        const avgAmount = totalAmount / allTransactions.length;

        console.log('   Transaction Summary:');
        console.log(`   Total Amount: ${totalAmount.toFixed(2)} руб`);
        console.log(`   Average Amount: ${avgAmount.toFixed(2)} руб`);
        console.log(`   Transaction Count: ${allTransactions.length}\n`);
      }
    } catch (error) {
      console.error('❌ Pagination failed:', error);
    }

    // ============================================================================
    // Step 5: Find Specific Transaction by ID
    // ============================================================================

    console.log('Step 5: Searching for specific transaction...');

    try {
      // This will search for a transaction with ID 1232610467
      // In a real scenario, you'd use an actual transaction ID from your data
      const transactionId = 1232610467;
      const searchDateFrom = '2024-01-01';
      const searchDateTo = '2024-01-31';

      console.log(`   Searching for transaction ID: ${transactionId}...`);

      const transaction = await sdk.finances.getTransactionById(transactionId, {
        dateFrom: searchDateFrom,
        dateTo: searchDateTo,
      });

      console.log('✅ Transaction found:');
      console.log(`   ID: ${transaction.rrd_id}`);
      console.log(`   Brand: ${transaction.brand_name}`);
      console.log(`   Article: ${transaction.sa_name}`);
      console.log(`   WB Article: ${transaction.nm_id}`);
      console.log(`   Type: ${transaction.doc_type_name}`);
      console.log(`   Quantity: ${transaction.quantity}`);
      console.log(
        `   Payment to Supplier: ${transaction.ppvz_for_pay} ${transaction.currency_name}`
      );
      console.log(`   Sale Date: ${transaction.sale_dt}\n`);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log('⚠️  Transaction not found in the specified date range\n');
      } else {
        console.error('❌ Transaction search failed:', error);
      }
    }

    // ============================================================================
    // Step 6: Document Management
    // ============================================================================

    console.log('Step 6: Managing financial documents...');

    try {
      // Get available document categories
      console.log('   Fetching document categories...');
      const categories = await sdk.finances.getDocumentCategories('en');

      console.log(`✅ ${categories.data.categories.length} categories available:`);
      categories.data.categories.forEach((cat) => {
        console.log(`   - ${cat.name}: ${cat.title}`);
      });
      console.log('');

      // Get list of documents
      console.log('   Fetching recent documents...');
      const documents = await sdk.finances.getDocuments({
        sort: 'date',
        order: 'desc',
      });

      console.log(`✅ ${documents.data.documents.length} documents found`);

      if (documents.data.documents.length > 0) {
        console.log('   Recent documents:');
        documents.data.documents.slice(0, 3).forEach((doc, index) => {
          console.log(`   ${index + 1}. ${doc.category}`);
          console.log(`      Service Name: ${doc.serviceName}`);
          console.log(`      Formats: ${doc.extensions.join(', ')}`);
          console.log(`      Created: ${new Date(doc.creationTime).toLocaleString()}`);
          console.log(`      Viewed: ${doc.viewed ? 'Yes' : 'No'}`);
          console.log('');
        });

        // Example: Download first document (commented out to avoid actual download)
        // const firstDoc = documents.data.documents[0];
        // console.log(`   Downloading ${firstDoc.serviceName}...`);
        // const download = await sdk.finances.downloadDocument(
        //   firstDoc.serviceName,
        //   firstDoc.extensions[0]
        // );
        // console.log(`   ✅ Downloaded: ${download.data.fileName}`);
        // // To save: Buffer.from(download.data.document, 'base64')
      }
    } catch (error) {
      console.error('❌ Document operations failed:', error);
    }

    // ============================================================================
    // Summary
    // ============================================================================

    console.log('\n' + '='.repeat(60));
    console.log('✅ Finances Module Example Completed Successfully!');
    console.log('='.repeat(60));
    console.log('\nKey Features Demonstrated:');
    console.log('  ✓ Account balance retrieval');
    console.log('  ✓ Transaction history with date filters');
    console.log('  ✓ Pagination for large datasets');
    console.log('  ✓ Specific transaction search by ID');
    console.log('  ✓ Document category browsing');
    console.log('  ✓ Document listing and filtering');
    console.log('\nFor more information, see:');
    console.log('  - API Documentation: https://dev.wildberries.ru/');
    console.log('  - SDK Documentation: https://github.com/your-repo/README.md');
    console.log('');
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('❌ Authentication failed:', error.message);
      console.log('\nPlease check your API key and try again.\n');
    } else if (error instanceof RateLimitError) {
      console.error('❌ Rate limit exceeded:', error.message);
      console.log(`\nPlease wait ${error.retryAfter / 1000} seconds and try again.\n`);
    } else {
      console.error('❌ Unexpected error:', error);
    }
    process.exit(1);
  }
}

// Run the example
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
