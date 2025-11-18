[Wildberries API TypeScript SDK](../modules.md) / FinancesModule

# Class: FinancesModule

Defined in: [modules/finances/index.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L57)

FinancesModule

Manages financial operations for Wildberries sellers including:
- Balance retrieval
- Transaction history
- Financial reports
- Document management

## Example

```typescript
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Get current balance
const balance = await sdk.finances.getBalance();
console.log(`Available: ${balance.for_withdraw} ${balance.currency}`);

// Get transaction history
const transactions = await sdk.finances.getTransactions({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  limit: 100
});
```

## Constructors

### Constructor

```ts
new FinancesModule(client: BaseClient): FinancesModule;
```

Defined in: [modules/finances/index.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L58)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`FinancesModule`

## Methods

### getBalance()

```ts
getBalance(): Promise<BalanceResponse>;
```

Defined in: [modules/finances/index.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L80)

Get current account balance

Retrieves the balance widget data from the seller portal main page,
including current balance and amount available for withdrawal.

Rate limit: 1 request per minute

#### Returns

`Promise`\<[`BalanceResponse`](../interfaces/BalanceResponse.md)\>

Promise resolving to balance information

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
const balance = await sdk.finances.getBalance();
console.log(`Current: ${balance.current} ${balance.currency}`);
console.log(`Available to withdraw: ${balance.for_withdraw} ${balance.currency}`);
```

***

### getTransactions()

```ts
getTransactions(filters: TransactionFilters): Promise<TransactionListResponse>;
```

Defined in: [modules/finances/index.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L139)

Get sales report details by period

Retrieves detailed sales reports (реализация) with financial transaction data.
Data is available from January 29, 2024.

The report must be fetched in parts if results exceed 100,000 rows:
1. Start with rrdid=0
2. Use the last rrd_id from response for next request
3. Continue until response is empty []

Rate limit: 1 request per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters` | [`TransactionFilters`](../interfaces/TransactionFilters.md) | Date range and pagination filters |

#### Returns

`Promise`\<[`TransactionListResponse`](../type-aliases/TransactionListResponse.md)\>

Promise resolving to array of transaction/report items

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When request parameters invalid (400)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get this week's transactions
const transactions = await sdk.finances.getTransactions({
  dateFrom: '2024-01-15',
  dateTo: '2024-01-22',
  limit: 10000,
  period: 'weekly'
});

// Paginate through large dataset
let allTransactions = [];
let rrdid = 0;
let hasMore = true;

while (hasMore) {
  const batch = await sdk.finances.getTransactions({
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31',
    rrdid,
    limit: 100000
  });

  if (batch.length === 0) {
    hasMore = false;
  } else {
    allTransactions.push(...batch);
    rrdid = batch[batch.length - 1].rrd_id;
  }
}
```

***

### getTransactionById()

```ts
getTransactionById(transactionId: number, dateRange: {
  dateFrom: string;
  dateTo: string;
}): Promise<Transaction>;
```

Defined in: [modules/finances/index.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L183)

Get single transaction details by ID

Retrieves complete details for a specific transaction using its rrd_id.
This is a convenience method that filters the transaction list for a specific ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transactionId` | `number` | Unique transaction ID (rrd_id) |
| `dateRange` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Date range to search within |
| `dateRange.dateFrom` | `string` | - |
| `dateRange.dateTo` | `string` | - |

#### Returns

`Promise`\<[`Transaction`](../interfaces/Transaction.md)\>

Promise resolving to transaction details

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When transaction ID invalid or not found

#### Throws

When network request fails or times out

#### Example

```typescript
const transaction = await sdk.finances.getTransactionById(
  1232610467,
  { dateFrom: '2024-01-01', dateTo: '2024-01-31' }
);
console.log(`Amount: ${transaction.ppvz_for_pay} ${transaction.currency_name}`);
```

***

### getDocumentCategories()

```ts
getDocumentCategories(locale: "ru" | "en" | "zh"): Promise<DocumentCategoriesResponse>;
```

Defined in: [modules/finances/index.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L234)

Get document categories

Retrieves the list of available document categories for filtering documents.

Rate limit: 1 request per 10 seconds (burst: 5 requests)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `locale` | `"ru"` \| `"en"` \| `"zh"` | `'en'` | Language for category titles ('ru', 'en', or 'zh') |

#### Returns

`Promise`\<[`DocumentCategoriesResponse`](../interfaces/DocumentCategoriesResponse.md)\>

Promise resolving to document categories

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
const categories = await sdk.finances.getDocumentCategories('ru');
categories.data.categories.forEach(cat => {
  console.log(`${cat.name}: ${cat.title}`);
});
```

***

### getDocuments()

```ts
getDocuments(filters?: DocumentListFilters): Promise<DocumentsListResponse>;
```

Defined in: [modules/finances/index.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L273)

Get list of documents

Retrieves the seller's document list with optional filtering by date range and category.

Rate limit: 1 request per 10 seconds (burst: 5 requests)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`DocumentListFilters`](../interfaces/DocumentListFilters.md) | Optional filters for document list |

#### Returns

`Promise`\<[`DocumentsListResponse`](../interfaces/DocumentsListResponse.md)\>

Promise resolving to documents list

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get all documents
const docs = await sdk.finances.getDocuments();

// Filter by date range
const recentDocs = await sdk.finances.getDocuments({
  beginTime: '2024-07-09',
  endTime: '2024-07-15',
  sort: 'date',
  order: 'desc'
});
```

***

### downloadDocument()

```ts
downloadDocument(serviceName: string, extension: string): Promise<DocumentDownloadResponse>;
```

Defined in: [modules/finances/index.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L311)

Download a single document

Downloads a specific document by its service name in the requested format.
The document is returned as base64-encoded content.

Rate limit: 1 request per 10 seconds (burst: 5 requests)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serviceName` | `string` | Unique document ID |
| `extension` | `string` | Document format (e.g., 'pdf', 'zip', 'xlsx') |

#### Returns

`Promise`\<[`DocumentDownloadResponse`](../interfaces/DocumentDownloadResponse.md)\>

Promise resolving to document download response with base64 content

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When document not found or format invalid

#### Throws

When network request fails or times out

#### Example

```typescript
const doc = await sdk.finances.downloadDocument(
  'redeem-notification-44841941',
  'zip'
);

// Decode base64 and save to file
const buffer = Buffer.from(doc.data.document, 'base64');
fs.writeFileSync(doc.data.fileName, buffer);
```

***

### downloadDocuments()

```ts
downloadDocuments(documents: {
  serviceName: string;
  extension: string;
}[]): Promise<DocumentsDownloadResponse>;
```

Defined in: [modules/finances/index.ts:358](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L358)

Download multiple documents as archive

Downloads multiple documents in a single ZIP archive.
Maximum 50 documents per request.

Rate limit: 1 request per 10 seconds (burst: 5 requests)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `documents` | \{ `serviceName`: `string`; `extension`: `string`; \}[] | Array of document specifications (max 50 items) |

#### Returns

`Promise`\<[`DocumentsDownloadResponse`](../interfaces/DocumentsDownloadResponse.md)\>

Promise resolving to ZIP archive download with base64 content

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When request invalid (empty, too many docs, etc)

#### Throws

When network request fails or times out

#### Example

```typescript
const archive = await sdk.finances.downloadDocuments([
  { serviceName: 'doc-123', extension: 'pdf' },
  { serviceName: 'doc-456', extension: 'xlsx' }
]);

// Save the ZIP file
const buffer = Buffer.from(archive.data.document, 'base64');
fs.writeFileSync('documents.zip', buffer);
```

***

### getFinancialReport()

```ts
getFinancialReport(filters: {
  dateFrom: string;
  dateTo: string;
}): Promise<TransactionListResponse>;
```

Defined in: [modules/finances/index.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L421)

Get financial report for specified date range

Convenience method that retrieves financial transaction data (реализация) for the specified period.
This is an alias for getTransactions() providing a more intuitive name for financial reporting use cases.

The report includes detailed sales transactions, commissions, fees, and financial settlements.
For large datasets (>100,000 rows), results must be fetched in parts using rrdid pagination.

Rate limit: 1 request per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Date range filters (dateFrom and dateTo required) |
| `filters.dateFrom` | `string` | - |
| `filters.dateTo` | `string` | - |

#### Returns

`Promise`\<[`TransactionListResponse`](../type-aliases/TransactionListResponse.md)\>

Promise resolving to array of financial transactions

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When request parameters invalid (400)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get Q1 financial report
const report = await sdk.finances.getFinancialReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-03-31'
});

console.log(`Total transactions: ${report.length}`);
report.forEach(transaction => {
  console.log(`${transaction.date}: ${transaction.ppvz_for_pay} ${transaction.currency_name}`);
});
```

***

### generateReport()

```ts
generateReport(
   reportType: FinancialReportType, 
   dateRange: DateRange, 
format: ReportFormat): Promise<GenerateReportResponse>;
```

Defined in: [modules/finances/index.ts:478](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L478)

Generate financial report for specified period

Initiates asynchronous report generation. The report is generated in the background
and the method returns immediately with a report ID and status.

To get the completed report:
1. Call this method to initiate generation (returns reportId with 'pending' status)
2. Poll getReport(reportId) until status becomes 'completed'
3. Use downloadReport(reportId) to get the download URL

Rate limit: 2 requests per minute (resource-intensive operation)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `reportType` | [`FinancialReportType`](../type-aliases/FinancialReportType.md) | `undefined` | Type of report (sales_summary, tax_report, commission_breakdown, detailed_transactions) |
| `dateRange` | [`DateRange`](../interfaces/DateRange.md) | `undefined` | Date range for report data (from/to dates) |
| `format` | [`ReportFormat`](../type-aliases/ReportFormat.md) | `'pdf'` | Optional output format (defaults to PDF) |

#### Returns

`Promise`\<[`GenerateReportResponse`](../interfaces/GenerateReportResponse.md)\>

Promise resolving to report generation status with reportId

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When request parameters invalid (400)

#### Throws

When network request fails or times out

#### Example

```typescript
// Generate sales summary report for Q1
const reportGen = await sdk.finances.generateReport(
  'sales_summary',
  { from: '2024-01-01', to: '2024-03-31' },
  'pdf'
);
console.log(`Report generation started: ${reportGen.reportId}`);
console.log(`Status: ${reportGen.status}`);

// Poll for completion
let report;
do {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  report = await sdk.finances.getReport(reportGen.reportId);
} while (report.status !== 'completed' && report.status !== 'failed');
```

***

### getReport()

```ts
getReport(reportId: string): Promise<Report>;
```

Defined in: [modules/finances/index.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L546)

Get report status and download URL

Retrieves current status and details for a report. When status is 'completed',
the response includes a download URL that expires after a certain period.

Report lifecycle:
- 'pending': Report generation queued
- 'processing': Report being generated
- 'completed': Report ready, download URL available
- 'failed': Report generation failed (check error field)

Note: Download URLs typically expire after 24 hours.

Rate limit: 10 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` | Report identifier from generateReport() |

#### Returns

`Promise`\<[`Report`](../interfaces/Report.md)\>

Promise resolving to report details with download URL if completed

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When report ID invalid or not found (404)

#### Throws

When network request fails or times out

#### Example

```typescript
// Check report status
const report = await sdk.finances.getReport('rpt_abc123');

if (report.status === 'completed') {
  console.log(`Download URL: ${report.url}`);
  console.log(`Expires at: ${report.expiresAt}`);
} else if (report.status === 'failed') {
  console.error(`Report failed: ${report.error}`);
} else {
  console.log(`Report ${report.status}... please wait`);
}
```

***

### downloadReport()

```ts
downloadReport(reportId: string): Promise<ReportDownloadResponse>;
```

Defined in: [modules/finances/index.ts:586](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L586)

Get download URL for completed report

Convenience method that validates the report is ready before returning the download URL.
Throws an error if the report is not yet completed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` | Report identifier |

#### Returns

`Promise`\<[`ReportDownloadResponse`](../interfaces/ReportDownloadResponse.md)\>

Download URL with expiration info

#### Throws

If report not completed (pending, processing, or failed)

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
try {
  const download = await sdk.finances.downloadReport('rpt_abc123');
  console.log(`Download from: ${download.url}`);
  console.log(`Format: ${download.format}`);
  console.log(`URL expires: ${download.expiresAt}`);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Report not ready yet, try again later');
  }
}
```

***

### getPayouts()

```ts
getPayouts(filters?: PayoutFilters): Promise<PayoutListResponse>;
```

Defined in: [modules/finances/index.ts:664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L664)

Get payout history with optional filtering

Retrieves paginated list of payouts with optional filters for date range,
status, and bank account. Includes pagination support for large datasets.

Payout statuses:
- 'pending': Payout scheduled
- 'processing': Transfer in progress
- 'completed': Successfully transferred
- 'failed': Transfer failed
- 'cancelled': Payout cancelled

Rate limit: 10 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`PayoutFilters`](../interfaces/PayoutFilters.md) | Optional filters for date range, status, bank account, pagination |

#### Returns

`Promise`\<[`PayoutListResponse`](../interfaces/PayoutListResponse.md)\>

Promise resolving to paginated payout list

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When filter parameters invalid (400)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get all completed payouts from last month
const payouts = await sdk.finances.getPayouts({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  status: 'completed',
  limit: 50
});

console.log(`Found ${payouts.data.length} payouts`);
payouts.data.forEach(payout => {
  console.log(`${payout.date}: ${payout.amount} ${payout.currency}`);
});

// Paginate through results
if (payouts.pagination?.hasMore) {
  const nextPage = await sdk.finances.getPayouts({
    ...filters,
    offset: payouts.pagination.offset + payouts.pagination.limit
  });
}
```

***

### getPayoutById()

```ts
getPayoutById(payoutId: string): Promise<PayoutDetailResponse>;
```

Defined in: [modules/finances/index.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/finances/index.ts#L712)

Get single payout details with fee breakdown

Retrieves complete payout information including detailed fee breakdown,
bank transfer information, and list of transactions included in the payout.

Fee breakdown includes:
- Marketplace commission
- Payment processing fee
- Total fees deducted
- Net amount transferred to seller

Rate limit: 20 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `payoutId` | `string` | Unique payout identifier |

#### Returns

`Promise`\<[`PayoutDetailResponse`](../interfaces/PayoutDetailResponse.md)\>

Promise resolving to complete payout details with fee breakdown

#### Throws

When API key is invalid (401)

#### Throws

When rate limit exceeded (429)

#### Throws

When payout ID invalid or not found (404)

#### Throws

When network request fails or times out

#### Example

```typescript
const payout = await sdk.finances.getPayoutById('payout_xyz789');

console.log(`Payout Amount: ${payout.amount} ${payout.currency}`);
console.log(`Status: ${payout.status}`);
console.log(`\nFee Breakdown:`);
console.log(`  Commission: ${payout.feeBreakdown.commission}`);
console.log(`  Processing Fee: ${payout.feeBreakdown.processingFee}`);
console.log(`  Total Fees: ${payout.feeBreakdown.totalFees}`);
console.log(`  Net Amount: ${payout.feeBreakdown.netAmount}`);
console.log(`\nBank Transfer:`);
console.log(`  Bank: ${payout.bankInfo.bankName}`);
console.log(`  Account: ${payout.bankInfo.accountNumber}`);
console.log(`  Transfer Date: ${payout.bankInfo.transferDate}`);
```
