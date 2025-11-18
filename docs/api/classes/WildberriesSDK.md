[Wildberries API TypeScript SDK](../modules.md) / WildberriesSDK

# Class: WildberriesSDK

Defined in: [index.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L70)

Main SDK class providing access to all Wildberries API modules.

This class serves as the primary entry point for interacting with the Wildberries API.
It manages authentication, configuration, and provides access to all API modules through
a single unified interface.

## Examples

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Test connectivity
const response = await sdk.general.ping();
console.log('Status:', response.Status); // 'OK'
```

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000, // 60 seconds for long operations
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true
  },
  logLevel: 'debug'
});
```

```typescript
import { WildberriesSDK, AuthenticationError, RateLimitError } from 'daytona-wildberries-typescript-sdk';

try {
  const sdk = new WildberriesSDK({ apiKey: '' });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key:', error.message);
  }
}
```

## Constructors

### Constructor

```ts
new WildberriesSDK(config: SDKConfig): WildberriesSDK;
```

Defined in: [index.ts:447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L447)

Initialize the Wildberries SDK with configuration

Creates a new SDK instance with the provided configuration.
The SDK uses a single shared HTTP client for all API modules to ensure
consistent authentication, rate limiting, and error handling.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`SDKConfig`](../interfaces/SDKConfig.md) | SDK configuration options |

#### Returns

`WildberriesSDK`

#### Throws

If API key is missing or invalid

#### Example

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000,
  logLevel: 'info'
});
```

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="general"></a> `general` | `readonly` | [`GeneralModule`](GeneralModule.md) | General API module Provides access to general utility endpoints: - Ping (connectivity testing) - Server timestamps **See** [GeneralModule](GeneralModule.md) for available methods **Example** `const response = await sdk.general.ping(); console.log('Server time:', response.TS);` | [index.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L92) |
| <a id="products"></a> `products` | `readonly` | [`ProductsModule`](ProductsModule.md) | Products API module Provides access to product management endpoints: - Product card creation and editing - Category and characteristic management - Media (images, videos) upload - Pricing and stock management **See** [ProductsModule](ProductsModule.md) for available methods **Example** `// Get parent categories const parents = await sdk.products.getParentAll(); // Get categories by parent const categories = await sdk.products.getObjectAll({ parentID: 479 }); // Get characteristics for a category const characteristics = await sdk.products.getObjectCharc(105);` | [index.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L117) |
| <a id="ordersfbs"></a> `ordersFBS` | `readonly` | [`OrdersFBSModule`](OrdersFBSModule.md) | Orders FBS (Fulfillment by Seller) API module Provides access to FBS order management endpoints: - New order retrieval - Order listing with filters and pagination - Order status tracking (supplier and WB system status) **See** [OrdersFBSModule](OrdersFBSModule.md) for available methods **Example** `// Get new orders awaiting processing const newOrders = await sdk.ordersFBS.getNewOrders(); // Get orders from last 7 days const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60); const orders = await sdk.ordersFBS.getOrders({ dateFrom: sevenDaysAgo }); // Check order statuses const orderIds = orders.orders.map(o => o.id); const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);` | [index.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L143) |
| <a id="ordersfbw"></a> `ordersFBW` | `readonly` | [`OrdersFBWModule`](OrdersFBWModule.md) | Orders FBW (Fulfillment by Wildberries) API module Provides access to FBW warehouse supply and acceptance endpoints: - Warehouse selection and availability - Acceptance coefficient checking - Supply planning and management - Transit tariff calculation **See** [OrdersFBWModule](OrdersFBWModule.md) for available methods **Example** `// Get available warehouses const warehouses = await sdk.ordersFBW.getWarehouses(); // Check acceptance coefficients for next 14 days const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients(); // Get acceptance options for goods const goods = [{ barcode: '1234567891234', quantity: 10 }]; const options = await sdk.ordersFBW.getAcceptanceOptions(goods); // Get supply details const details = await sdk.ordersFBW.getSupplyDetails(12345);` | [index.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L172) |
| <a id="finances"></a> `finances` | `readonly` | [`FinancesModule`](FinancesModule.md) | Finances API module Provides access to financial data endpoints: - Balance and transaction retrieval - Financial reports (sales reports by period) - Document management (categories, list, download) **See** [FinancesModule](FinancesModule.md) for available methods **Example** `// Get current balance const balance = await sdk.finances.getBalance(); console.log(`Available: ${balance.for_withdraw} ${balance.currency}`); // Get transaction history const transactions = await sdk.finances.getTransactions({ dateFrom: '2024-01-01', dateTo: '2024-01-31', period: 'weekly' }); // Download documents const docs = await sdk.finances.getDocuments();` | [index.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L201) |
| <a id="analytics"></a> `analytics` | `readonly` | [`AnalyticsModule`](AnalyticsModule.md) | Analytics API module Provides access to analytics and reporting endpoints: - Sales funnel conversion metrics - Product performance tracking - Search query analysis - Category-level analytics - CSV report generation **See** [AnalyticsModule](AnalyticsModule.md) for available methods **Example** `// Get sales funnel metrics const funnel = await sdk.analytics.getSalesFunnel({ period: { begin: '2024-01-01 00:00:00', end: '2024-01-31 23:59:59' } }); // Track product performance const performance = await sdk.analytics.getProductPerformance( [12345, 67890], { from: '2024-01-01', to: '2024-01-31' } );` | [index.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L232) |
| <a id="communications"></a> `communications` | `readonly` | [`CommunicationsModule`](CommunicationsModule.md) | Communications API module Provides access to customer communication endpoints: **Chat Management:** - Get all chat conversations - Poll for new chat events - Send messages to customers (with file attachments) - Extract chat metadata (replySign, chatID) **Product Q&A Management:** - Get product questions (answered/unanswered, with filtering) - Answer or reject customer questions - Mark questions as viewed **Customer Reviews Management:** - Get customer reviews (answered/unanswered, with filtering) - View review details (text, photos, videos, ratings) - Respond to reviews - Edit review responses **See** [CommunicationsModule](CommunicationsModule.md) for available methods **Example** `// Chat: Get all chats and send a message const chats = await sdk.communications.getChats(); const replySign = chats.result[0].replySign; await sdk.communications.sendMessage(replySign, 'Thank you for your message!'); // Q&A: Get and answer product questions const questions = await sdk.communications.getQuestions({ isAnswered: false, take: 10, skip: 0, }); await sdk.communications.answerQuestion(questions.data.questions[0].id, 'This product is made of cotton.'); // Reviews: Get and respond to customer reviews const reviews = await sdk.communications.getReviews({ isAnswered: false, take: 10, skip: 0, }); await sdk.communications.respondToReview(reviews.data.feedbacks[0].id, 'Thank you for your feedback!');` | [index.ts:282](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L282) |
| <a id="reports"></a> `reports` | `readonly` | [`ReportsModule`](ReportsModule.md) | Reports API module Provides access to reporting and analytics data endpoints: - Inbound shipments (incomes) with pagination - Stock levels with quantity breakdown - Customer orders tracking - Sales and returns analysis - Excise/compliance reports - Async warehouse remains reports **See** [ReportsModule](ReportsModule.md) for available methods **Example** `// Get inbound shipments const incomes = await sdk.reports.getIncomes('2024-01-01'); // Get current stock levels const stocks = await sdk.reports.getStocks('2024-01-01'); // Generate and download warehouse remains report const task = await sdk.reports.createWarehouseRemainsReport({ locale: 'ru' }); const status = await sdk.reports.checkReportStatus(task.data.taskId, 'warehouse_remains'); if (status.data.status === 'done') { const blob = await sdk.reports.downloadReport(task.data.taskId, 'warehouse_remains'); }` | [index.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L313) |
| <a id="promotion"></a> `promotion` | `readonly` | [`PromotionModule`](PromotionModule.md) | Promotion API module Provides access to promotional campaign endpoints: - Campaign creation, management, and control - Campaign count and information retrieval - Auction (manual bid) campaign management - Configuration values and minimum bids - Budget deposits and management - Product and category selection for campaigns - Statistics and performance tracking **See** [PromotionModule](PromotionModule.md) for available methods **Example** `// Get campaign count summary const summary = await sdk.promotion.getPromotionCount(); // Create a new campaign const campaignId = await sdk.promotion.createSeacatSaveAd({ name: 'Winter Sale Campaign', nms: [12345, 67890], bid_type: 'manual', placement_types: ['search', 'recommendations'] }); // Get minimum bids for products const minBids = await sdk.promotion.createBidsMin({ advert_id: campaignId, nm_ids: [12345, 67890], payment_type: 'cpm', placement_types: ['search', 'recommendation'] });` | [index.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L351) |
| <a id="tariffs"></a> `tariffs` | `readonly` | [`TariffsModule`](TariffsModule.md) | Tariffs API module Provides access to tariff and commission information: - Commission rates by category - Box storage tariffs - Pallet storage tariffs - Return handling tariffs **See** [TariffsModule](TariffsModule.md) for available methods **Example** `// Get commission rates for all categories const commissions = await sdk.tariffs.getTariffsCommission(); // Get box storage tariffs const boxTariffs = await sdk.tariffs.getTariffsBox(); // Get pallet storage tariffs const palletTariffs = await sdk.tariffs.getTariffsPallet(); // Get return handling tariffs const returnTariffs = await sdk.tariffs.getTariffsReturn();` | [index.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L379) |
| <a id="instorepickup"></a> `inStorePickup` | `readonly` | [`InStorePickupModule`](InStorePickupModule.md) | In-Store Pickup API module (Click & Collect) Provides comprehensive methods for managing click & collect orders: - Order assembly lifecycle management (new → confirm → prepare → receive/reject) - Customer verification at pickup - Product metadata management (SGTIN, UIN, IMEI, GTIN) - Order queries and status tracking **See** [InStorePickupModule](InStorePickupModule.md) for available methods **Examples** `// 1. Get new pickup orders const newOrders = await sdk.inStorePickup.getNewOrders(); const order = newOrders.orders[0]; // 2. Confirm and start assembly await sdk.inStorePickup.confirmOrder(order.id); // 3. Complete assembly await sdk.inStorePickup.prepareOrder(order.id); // 4. Customer arrives - verify identity const verification = await sdk.inStorePickup.verifyCustomerIdentity({ orderCode: order.orderCode, passcode: '1234' // From customer's app }); // 5. Complete handover await sdk.inStorePickup.receiveOrder(order.id);` `// Set SGTIN codes (Честный знак marking) await sdk.inStorePickup.setSGTINCode(orderId, ['1234567890123456']); // Set IMEI for electronics await sdk.inStorePickup.setIMEICode(orderId, '123456789012345'); // Get all metadata const metadata = await sdk.inStorePickup.getOrderMetadata(orderId);` | [index.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/index.ts#L426) |
