[Wildberries API TypeScript SDK](../modules.md) / WildberriesSDK

# Class: WildberriesSDK

Defined in: [index.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L72)

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

Defined in: [index.ts:557](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L557)

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
| <a id="general"></a> `general` | `readonly` | [`GeneralModule`](GeneralModule.md) | General API module Provides access to general utility endpoints: - Ping (connectivity testing) - Server timestamps **See** [GeneralModule](GeneralModule.md) for available methods **Example** `const response = await sdk.general.ping(); console.log('Server time:', response.TS);` | [index.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L94) |
| <a id="products"></a> `products` | `readonly` | [`ProductsModule`](ProductsModule.md) | Products API module Provides access to product management endpoints: - Product card creation and editing - Category and characteristic management - Media (images, videos) upload - Pricing and stock management **See** [ProductsModule](ProductsModule.md) for available methods **Example** `// Get parent categories const parents = await sdk.products.getParentAll(); // Get categories by parent const categories = await sdk.products.getObjectAll({ parentID: 479 }); // Get characteristics for a category const characteristics = await sdk.products.getObjectCharc(105);` | [index.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L119) |
| <a id="ordersfbs"></a> `ordersFBS` | `readonly` | [`OrdersFbsModule`](OrdersFbsModule.md) | Orders FBS (Fulfillment by Seller) API module Provides access to FBS order management endpoints: - New order retrieval - Order listing with filters and pagination - Order status tracking (supplier and WB system status) **See** [OrdersFbsModule](OrdersFbsModule.md) for available methods **Example** `// Get new orders awaiting processing const newOrders = await sdk.ordersFBS.getNewOrders(); // Get orders from last 7 days const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60); const orders = await sdk.ordersFBS.getOrders({ dateFrom: sevenDaysAgo }); // Check order statuses const orderIds = orders.orders.map(o => o.id); const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);` | [index.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L145) |
| <a id="ordersfbw"></a> `ordersFBW` | `readonly` | [`OrdersFbwModule`](OrdersFbwModule.md) | Orders FBW (Fulfillment by Wildberries) API module Provides access to FBW warehouse supply and acceptance endpoints: - Warehouse selection and availability - Acceptance coefficient checking - Supply planning and management - Transit tariff calculation **See** [OrdersFbwModule](OrdersFbwModule.md) for available methods **Example** `// Get available warehouses const warehouses = await sdk.ordersFBW.warehouses(); // Check acceptance coefficients for next 14 days const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients(); // Get acceptance options for goods const goods = [{ barcode: '1234567891234', quantity: 10 }]; const options = await sdk.ordersFBW.createAcceptanceOption(goods); // Get supply details const details = await sdk.ordersFBW.getSupply(12345);` | [index.ts:174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L174) |
| <a id="finances"></a> `finances` | `readonly` | [`FinancesModule`](FinancesModule.md) | Finances API module Provides access to financial data endpoints: - Account balance retrieval - Sales reports by realization period - Document management (categories, list, download) **See** [FinancesModule](FinancesModule.md) for available methods **Example** `// Get current balance const balance = await sdk.finances.getAccountBalance(); console.log(`Available: ${balance.for_withdraw} ${balance.currency}`); // Get sales report by period const report = await sdk.finances.getSupplierReportDetailByPeriod({ dateFrom: '2024-01-01', dateTo: '2024-01-31', period: 'weekly' }); // List seller documents const docs = await sdk.finances.getDocumentsList();` | [index.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L203) |
| <a id="analytics"></a> `analytics` | `readonly` | [`AnalyticsModule`](AnalyticsModule.md) | Analytics API module Provides access to analytics and reporting endpoints: - Sales funnel v3: product statistics, daily history, grouped history - Search query analysis and product search texts - Stock history (inventory tracking) - CSV report generation and download **v3 Sales Funnel methods (replace deprecated v2):** - `getSalesFunnelProducts()` — product statistics with conversion metrics - `getSalesFunnelProductsHistory()` — daily/weekly time-series per product - `getSalesFunnelGroupedHistory()` — daily/weekly time-series grouped by subject/brand/tag **See** [AnalyticsModule](AnalyticsModule.md) for available methods **Example** `// Get sales funnel metrics (v3) const funnel = await sdk.analytics.getSalesFunnelProducts({ selectedPeriod: { start: '2026-01-01', end: '2026-01-31' }, orderBy: { field: 'orderCount', mode: 'desc' }, limit: 10, offset: 0, }); console.log(funnel.products[0].statistic.selected.openCount); // Get daily history for specific products (v3) const history = await sdk.analytics.getSalesFunnelProductsHistory({ selectedPeriod: { start: '2026-01-01', end: '2026-01-07' }, nmIds: [12345, 67890], aggregationLevel: 'day', });` | [index.ts:240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L240) |
| <a id="communications"></a> `communications` | `readonly` | [`CommunicationsModule`](CommunicationsModule.md) | Communications API module Provides access to customer communication endpoints: **Chat Management:** - Get all chat conversations - Poll for new chat events - Send messages to customers (with file attachments) - Extract chat metadata (replySign, chatID) **Product Q&A Management:** - Get product questions (answered/unanswered, with filtering) - Answer or reject customer questions - Mark questions as viewed **Customer Reviews Management:** - Get customer reviews (answered/unanswered, with filtering) - View review details (text, photos, videos, ratings) - Respond to reviews - Edit review responses **See** [CommunicationsModule](CommunicationsModule.md) for available methods **Example** `// Chat: Get all chats and send a message const chats = await sdk.communications.getChats(); const replySign = chats.result[0].replySign; await sdk.communications.sendMessage(replySign, 'Thank you for your message!'); // Q&A: Get and answer product questions const questions = await sdk.communications.getQuestions({ isAnswered: false, take: 10, skip: 0, }); await sdk.communications.answerQuestion(questions.data.questions[0].id, 'This product is made of cotton.'); // Reviews: Get and respond to customer reviews const reviews = await sdk.communications.getReviews({ isAnswered: false, take: 10, skip: 0, }); await sdk.communications.respondToReview(reviews.data.feedbacks[0].id, 'Thank you for your feedback!');` | [index.ts:290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L290) |
| <a id="reports"></a> `reports` | `readonly` | [`ReportsModule`](ReportsModule.md) | Reports API module Provides access to reporting and analytics data endpoints: - Inbound shipments (incomes) with pagination - Stock levels with quantity breakdown - Customer orders tracking - Sales and returns analysis - Excise/compliance reports - Async warehouse remains reports **See** [ReportsModule](ReportsModule.md) for available methods **Example** `// Get inbound shipments const incomes = await sdk.reports.getIncomes('2024-01-01'); // Get current stock levels const stocks = await sdk.reports.getStocks('2024-01-01'); // Generate and download warehouse remains report const task = await sdk.reports.createWarehouseRemainsReport({ locale: 'ru' }); const status = await sdk.reports.checkReportStatus(task.data.taskId, 'warehouse_remains'); if (status.data.status === 'done') { const blob = await sdk.reports.downloadReport(task.data.taskId, 'warehouse_remains'); }` | [index.ts:321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L321) |
| <a id="promotion"></a> `promotion` | `readonly` | [`PromotionModule`](PromotionModule.md) | Promotion API module Provides access to promotional campaign endpoints: - Campaign creation, management, and control - Campaign count and information retrieval - Auction (manual bid) campaign management - Configuration values and minimum bids - Budget deposits and management - Product and category selection for campaigns - Statistics and performance tracking **See** [PromotionModule](PromotionModule.md) for available methods **Example** `// Get campaign count summary const summary = await sdk.promotion.getPromotionCount(); // Create a new campaign const campaignId = await sdk.promotion.createSeacatSaveAd({ name: 'Winter Sale Campaign', nms: [12345, 67890], bid_type: 'manual', placement_types: ['search', 'recommendations'] }); // Get minimum bids for products const minBids = await sdk.promotion.createBidsMin({ advert_id: campaignId, nm_ids: [12345, 67890], payment_type: 'cpm', placement_types: ['search', 'recommendation'] });` | [index.ts:359](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L359) |
| <a id="tariffs"></a> `tariffs` | `readonly` | [`TariffsModule`](TariffsModule.md) | Tariffs API module Provides access to tariff and commission information: - Commission rates by category - Box storage tariffs - Pallet storage tariffs - Return handling tariffs **See** [TariffsModule](TariffsModule.md) for available methods **Example** `// Get commission rates for all categories const commissions = await sdk.tariffs.getTariffsCommission(); // Get box storage tariffs const boxTariffs = await sdk.tariffs.getTariffsBox(); // Get pallet storage tariffs const palletTariffs = await sdk.tariffs.getTariffsPallet(); // Get return handling tariffs const returnTariffs = await sdk.tariffs.getTariffsReturn();` | [index.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L387) |
| <a id="instorepickup"></a> `inStorePickup` | `readonly` | [`InStorePickupModule`](InStorePickupModule.md) | In-Store Pickup API module (Click & Collect) Provides comprehensive methods for managing click & collect orders: - Order assembly lifecycle management (new → confirm → prepare → receive/reject) - Customer verification at pickup - Product metadata management (SGTIN, UIN, IMEI, GTIN) - Order queries and status tracking **See** [InStorePickupModule](InStorePickupModule.md) for available methods **Examples** `// 1. Get new pickup orders const newOrders = await sdk.inStorePickup.getNewOrders(); const order = newOrders.orders[0]; // 2. Confirm and start assembly await sdk.inStorePickup.confirmOrder(order.id); // 3. Complete assembly await sdk.inStorePickup.prepareOrder(order.id); // 4. Customer arrives - verify identity const verification = await sdk.inStorePickup.verifyCustomerIdentity({ orderCode: order.orderCode, passcode: '1234' // From customer's app }); // 5. Complete handover await sdk.inStorePickup.receiveOrder(order.id);` `// Set SGTIN codes (Честный знак marking) await sdk.inStorePickup.setSGTINCode(orderId, ['1234567890123456']); // Set IMEI for electronics await sdk.inStorePickup.setIMEICode(orderId, '123456789012345'); // Get all metadata const metadata = await sdk.inStorePickup.getOrderMetadata(orderId);` | [index.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L434) |
| <a id="ordersdbs"></a> `ordersDBS` | `readonly` | [`OrdersDbsModule`](OrdersDbsModule.md) | Orders DBS (Delivery by Seller) API module Provides comprehensive methods for managing DBS orders where sellers handle both storage AND delivery directly to customers: **Core Operations:** - Get new orders awaiting delivery with full delivery details - Query completed orders with date range filtering and pagination - Get customer contact information for delivery coordination **Status Management:** - Bulk status operations: confirm, deliver, receive, reject, cancel - Legacy single-order status methods (deprecated, disabled 13.04.2026) - Status information retrieval for multiple orders **Metadata Operations:** - SGTIN (marking codes), IMEI, UIN, GTIN management - Customs declaration handling - Metadata retrieval and deletion **B2B Support:** - Get organizational buyer information (company name, INN, KPP) **See** [OrdersDbsModule](OrdersDbsModule.md) for available methods **Examples** `// 1. Get new DBS orders const newOrders = await sdk.ordersDBS.getNewOrders(); const order = newOrders.orders[0]; // 2. Get customer contact for delivery coordination const clientInfo = await sdk.ordersDBS.getClientInfo([order.id]); console.log('Deliver to:', clientInfo.orders[0].fullName); // 3. Confirm order (bulk operation) await sdk.ordersDBS.confirmOrdersBulk([order.id]); // 4. Mark as delivered await sdk.ordersDBS.deliverOrdersBulk([order.id]); // 5. Complete handover with verification code await sdk.ordersDBS.receiveOrdersBulk([{ orderId: order.id, code: '1234' }]);` `// Add SGTIN marking codes (Честный знак) await sdk.ordersDBS.addOrderMeta(orderId, { sgtin: { value: ['1234567890123456', '9876543210987654'] } }); // Add IMEI for electronics await sdk.ordersDBS.addOrderMeta(orderId, { imei: { value: 123456789012345 } }); // Get order metadata const meta = await sdk.ordersDBS.getOrderMeta(orderId);` | [index.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L498) |
| <a id="usermanagement"></a> `userManagement` | `readonly` | [`UserManagementModule`](UserManagementModule.md) | User Management API module Provides access to seller profile user management endpoints: - Create invitations for new users with access settings - List active and invited users with pagination - Update user access rights to seller profile sections - Delete users from seller profile **See** [UserManagementModule](UserManagementModule.md) for available methods **Example** `// Get all users const result = await sdk.userManagement.getUsers({ limit: 50, offset: 0 }); console.log(result.total); // Invite a new user const invite = await sdk.userManagement.createInvite({ invite: { phoneNumber: '+79991234567', position: 'Manager' }, access: [{ code: 'balance', disabled: false }], }); console.log(invite.inviteUrl); // Update user access await sdk.userManagement.updateUserAccess({ usersAccesses: [{ userId: 12345, access: [{ code: 'finance', disabled: true }], }], }); // Delete a user await sdk.userManagement.deleteUser(12345);` | [index.ts:536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/index.ts#L536) |
