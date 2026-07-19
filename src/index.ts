/**
 * Wildberries API TypeScript SDK
 * Main entry point
 *
 * @packageDocumentation
 */

import pkg from '../package.json';
import { BaseClient } from './client/base-client';
import { GeneralModule } from './modules/general';
import { ProductsModule } from './modules/products';
import { OrdersFbsModule } from './modules/orders-fbs';
import { OrdersFbwModule } from './modules/orders-fbw';
import { FinancesModule } from './modules/finances';
import { AnalyticsModule } from './modules/analytics';
import { CommunicationsModule } from './modules/communications';
import { ReportsModule } from './modules/reports';
import { PromotionModule } from './modules/promotion';
import { TariffsModule } from './modules/tariffs';
import { InStorePickupModule } from './modules/in-store-pickup';
import { OrdersDbsModule } from './modules/orders-dbs';
import { UserManagementModule } from './modules/user-management';
import { ReturnsModule } from './modules/returns';
import { AuthenticationError } from './errors/auth-error';
import type { SDKConfig } from './config/sdk-config';

/**
 * Main SDK class providing access to all Wildberries API modules.
 *
 * This class serves as the primary entry point for interacting with the Wildberries API.
 * It manages authentication, configuration, and provides access to all API modules through
 * a single unified interface.
 *
 * @example Basic usage
 * ```typescript
 * import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
 *
 * const sdk = new WildberriesSDK({
 *   apiKey: process.env.WB_API_KEY!
 * });
 *
 * // Test connectivity
 * const response = await sdk.general.ping();
 * console.log('Status:', response.Status); // 'OK'
 * ```
 *
 * @example Advanced configuration
 * ```typescript
 * const sdk = new WildberriesSDK({
 *   apiKey: process.env.WB_API_KEY!,
 *   timeout: 60000, // 60 seconds for long operations
 *   retryConfig: {
 *     maxRetries: 5,
 *     retryDelay: 2000,
 *     exponentialBackoff: true
 *   },
 *   logLevel: 'debug'
 * });
 * ```
 *
 * @example Error handling
 * ```typescript
 * import { WildberriesSDK, AuthenticationError, RateLimitError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   const sdk = new WildberriesSDK({ apiKey: '' });
 * } catch (error) {
 *   if (error instanceof AuthenticationError) {
 *     console.error('Invalid API key:', error.message);
 *   }
 * }
 * ```
 */
export class WildberriesSDK {
  /**
   * Internal HTTP client shared across all modules
   * @private
   */
  private readonly client: BaseClient;

  /**
   * General API module
   *
   * Provides access to general utility endpoints:
   * - Ping (connectivity testing)
   * - Server timestamps
   *
   * @see {@link GeneralModule} for available methods
   *
   * @example
   * ```typescript
   * const response = await sdk.general.ping();
   * console.log('Server time:', response.TS);
   * ```
   */
  public readonly general: GeneralModule;

  /**
   * Products API module
   *
   * Provides access to product management endpoints:
   * - Product card creation and editing
   * - Category and characteristic management
   * - Media (images, videos) upload
   * - Pricing and stock management
   *
   * @see {@link ProductsModule} for available methods
   *
   * @example
   * ```typescript
   * // Get parent categories
   * const parents = await sdk.products.getParentAll();
   *
   * // Get categories by parent
   * const categories = await sdk.products.getObjectAll({ parentID: 479 });
   *
   * // Get characteristics for a category
   * const characteristics = await sdk.products.getObjectCharc(105);
   * ```
   */
  public readonly products: ProductsModule;

  /**
   * Orders FBS (Fulfillment by Seller) API module
   *
   * Provides access to FBS order management endpoints:
   * - New order retrieval
   * - Order listing with filters and pagination
   * - Order status tracking (supplier and WB system status)
   *
   * @see {@link OrdersFbsModule} for available methods
   *
   * @example
   * ```typescript
   * // Get new orders awaiting processing
   * const newOrders = await sdk.ordersFBS.getNewOrders();
   *
   * // Get orders from last 7 days
   * const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
   * const orders = await sdk.ordersFBS.getOrders({ dateFrom: sevenDaysAgo });
   *
   * // Check order statuses
   * const orderIds = orders.orders.map(o => o.id);
   * const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);
   * ```
   */
  public readonly ordersFBS: OrdersFbsModule;

  /**
   * Orders FBW (Fulfillment by Wildberries) API module
   *
   * Provides access to FBW warehouse supply and acceptance endpoints:
   * - Warehouse selection and availability
   * - Acceptance coefficient checking
   * - Supply planning and management
   * - Transit tariff calculation
   *
   * @see {@link OrdersFbwModule} for available methods
   *
   * @example
   * ```typescript
   * // Get available warehouses
   * const warehouses = await sdk.ordersFBW.warehouses();
   *
   * // Check acceptance coefficients for next 14 days
   * const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
   *
   * // Get acceptance options for goods
   * const goods = [{ barcode: '1234567891234', quantity: 10 }];
   * const options = await sdk.ordersFBW.createAcceptanceOption(goods);
   *
   * // Get supply details
   * const details = await sdk.ordersFBW.getSupply(12345);
   * ```
   */
  public readonly ordersFBW: OrdersFbwModule;

  /**
   * Finances API module
   *
   * Provides access to financial data endpoints:
   * - Account balance retrieval
   * - Sales reports by realization period
   * - Document management (categories, list, download)
   *
   * @see {@link FinancesModule} for available methods
   *
   * @example
   * ```typescript
   * // Get current balance
   * const balance = await sdk.finances.getAccountBalance();
   * console.log(`Available: ${balance.for_withdraw} ${balance.currency}`);
   *
   * // List seller documents
   * const docs = await sdk.finances.getDocumentsList();
   * ```
   */
  public readonly finances: FinancesModule;

  /**
   * Analytics API module
   *
   * Provides access to analytics and reporting endpoints:
   * - Sales funnel v3: product statistics, daily history, grouped history
   * - Search query analysis and product search texts
   * - Stock history (inventory tracking)
   * - CSV report generation and download
   *
   * **v3 Sales Funnel methods (replace deprecated v2):**
   * - `getSalesFunnelProducts()` — product statistics with conversion metrics
   * - `getSalesFunnelProductsHistory()` — daily/weekly time-series per product
   * - `getSalesFunnelGroupedHistory()` — daily/weekly time-series grouped by subject/brand/tag
   *
   * @see {@link AnalyticsModule} for available methods
   *
   * @example
   * ```typescript
   * // Get sales funnel metrics (v3)
   * const funnel = await sdk.analytics.getSalesFunnelProducts({
   *   selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
   *   orderBy: { field: 'orderCount', mode: 'desc' },
   *   limit: 10,
   *   offset: 0,
   * });
   * console.log(funnel.products[0].statistic.selected.openCount);
   *
   * // Get daily history for specific products (v3)
   * const history = await sdk.analytics.getSalesFunnelProductsHistory({
   *   selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
   *   nmIds: [12345, 67890],
   *   aggregationLevel: 'day',
   * });
   * ```
   */
  public readonly analytics: AnalyticsModule;

  /**
   * Communications API module
   *
   * Provides access to customer communication endpoints:
   *
   * **Chat Management:**
   * - Get all chat conversations
   * - Poll for new chat events
   * - Send messages to customers (with file attachments)
   * - Extract chat metadata (replySign, chatID)
   *
   * **Product Q&A Management:**
   * - Get product questions (answered/unanswered, with filtering)
   * - Answer or reject customer questions
   * - Mark questions as viewed
   *
   * **Customer Reviews Management:**
   * - Get customer reviews (answered/unanswered, with filtering)
   * - View review details (text, photos, videos, ratings)
   * - Respond to reviews
   * - Edit review responses
   *
   * @see {@link CommunicationsModule} for available methods
   *
   * @example
   * ```typescript
   * // Chat: Get all chats and send a message
   * const chats = await sdk.communications.getChats();
   * const replySign = chats.result[0].replySign;
   * await sdk.communications.sendMessage(replySign, 'Thank you for your message!');
   *
   * // Q&A: Get and answer product questions
   * const questions = await sdk.communications.getQuestions({
   *   isAnswered: false,
   *   take: 10,
   *   skip: 0,
   * });
   * await sdk.communications.answerQuestion(questions.data.questions[0].id, 'This product is made of cotton.');
   *
   * // Reviews: Get and respond to customer reviews
   * const reviews = await sdk.communications.getReviews({
   *   isAnswered: false,
   *   take: 10,
   *   skip: 0,
   * });
   * await sdk.communications.respondToReview(reviews.data.feedbacks[0].id, 'Thank you for your feedback!');
   * ```
   */
  public readonly communications: CommunicationsModule;

  /**
   * Reports API module
   *
   * Provides access to reporting and analytics data endpoints:
   * - Inbound shipments (incomes) with pagination
   * - Stock levels with quantity breakdown
   * - Customer orders tracking
   * - Sales and returns analysis
   * - Excise/compliance reports
   * - Async warehouse remains reports
   *
   * @see {@link ReportsModule} for available methods
   *
   * @example
   * ```typescript
   * // Get inbound shipments
   * const incomes = await sdk.reports.getIncomes('2024-01-01');
   *
   * // Get current stock levels
   * const stocks = await sdk.reports.getStocks('2024-01-01');
   *
   * // Generate and download warehouse remains report
   * const task = await sdk.reports.createWarehouseRemainsReport({ locale: 'ru' });
   * const status = await sdk.reports.checkReportStatus(task.data.taskId, 'warehouse_remains');
   * if (status.data.status === 'done') {
   *   const blob = await sdk.reports.downloadReport(task.data.taskId, 'warehouse_remains');
   * }
   * ```
   */
  public readonly reports: ReportsModule;

  /**
   * Promotion API module
   *
   * Provides access to promotional campaign endpoints:
   * - Campaign creation, management, and control
   * - Campaign count and information retrieval
   * - Auction (manual bid) campaign management
   * - Configuration values and minimum bids
   * - Budget deposits and management
   * - Product and category selection for campaigns
   * - Statistics and performance tracking
   *
   * @see {@link PromotionModule} for available methods
   *
   * @example
   * ```typescript
   * // Get campaign count summary
   * const summary = await sdk.promotion.getPromotionCount();
   *
   * // Create a new campaign
   * const campaignId = await sdk.promotion.createSeacatSaveAd({
   *   name: 'Winter Sale Campaign',
   *   nms: [12345, 67890],
   *   bid_type: 'manual',
   *   placement_types: ['search', 'recommendation']
   * });
   *
   * // Get minimum bids for products
   * const minBids = await sdk.promotion.createBidsMin({
   *   advert_id: campaignId,
   *   nm_ids: [12345, 67890],
   *   payment_type: 'cpm',
   *   placement_types: ['search', 'recommendation']
   * });
   * ```
   */
  public readonly promotion: PromotionModule;

  /**
   * Tariffs API module
   *
   * Provides access to tariff and commission information:
   * - Commission rates by category
   * - Box storage tariffs
   * - Pallet storage tariffs
   * - Return handling tariffs
   *
   * @see {@link TariffsModule} for available methods
   *
   * @example
   * ```typescript
   * // Get commission rates for all categories
   * const commissions = await sdk.tariffs.getTariffsCommission();
   *
   * // Get box storage tariffs
   * const boxTariffs = await sdk.tariffs.getTariffsBox();
   *
   * // Get pallet storage tariffs
   * const palletTariffs = await sdk.tariffs.getTariffsPallet();
   *
   * // Get return handling tariffs
   * const returnTariffs = await sdk.tariffs.getTariffsReturn();
   * ```
   */
  public readonly tariffs: TariffsModule;

  /**
   * In-Store Pickup API module (Click & Collect)
   *
   * Provides comprehensive methods for managing click & collect orders:
   * - Order assembly lifecycle management (new → confirm → prepare → receive/reject)
   * - Customer verification at pickup
   * - Product metadata management (SGTIN, UIN, IMEI, GTIN)
   * - Order queries and status tracking
   *
   * @see {@link InStorePickupModule} for available methods
   *
   * @example Order processing workflow
   * ```typescript
   * // 1. Get new pickup orders
   * const newOrders = await sdk.inStorePickup.getNewOrders();
   * const order = newOrders.orders[0];
   *
   * // 2. Confirm and start assembly
   * await sdk.inStorePickup.confirmOrder(order.id);
   *
   * // 3. Complete assembly
   * await sdk.inStorePickup.prepareOrder(order.id);
   *
   * // 4. Customer arrives - verify identity
   * const verification = await sdk.inStorePickup.verifyCustomerIdentity({
   *   orderCode: order.orderCode,
   *   passcode: '1234' // From customer's app
   * });
   *
   * // 5. Complete handover
   * await sdk.inStorePickup.receiveOrder(order.id);
   * ```
   *
   * @example Metadata management for regulated products
   * ```typescript
   * // Set SGTIN codes (Честный знак marking)
   * await sdk.inStorePickup.setSGTINCode(orderId, ['1234567890123456']);
   *
   * // Set IMEI for electronics
   * await sdk.inStorePickup.setIMEICode(orderId, '123456789012345');
   *
   * // Get all metadata
   * const metadata = await sdk.inStorePickup.getOrderMetadata(orderId);
   * ```
   */
  public readonly inStorePickup: InStorePickupModule;

  /**
   * Orders DBS (Delivery by Seller) API module
   *
   * Provides comprehensive methods for managing DBS orders where sellers handle
   * both storage AND delivery directly to customers:
   *
   * **Core Operations:**
   * - Get new orders awaiting delivery with full delivery details
   * - Query completed orders with date range filtering and pagination
   * - Get customer contact information for delivery coordination
   *
   * **Status Management:**
   * - Bulk status operations: confirm, deliver, receive, reject, cancel
   * - Legacy single-order status methods (deprecated, disabled 13.04.2026)
   * - Status information retrieval for multiple orders
   *
   * **Metadata Operations:**
   * - SGTIN (marking codes), IMEI, UIN, GTIN management
   * - Customs declaration handling
   * - Metadata retrieval and deletion
   *
   * **B2B Support:**
   * - Get organizational buyer information (company name, INN, KPP)
   *
   * @see {@link OrdersDbsModule} for available methods
   *
   * @example Order processing workflow
   * ```typescript
   * // 1. Get new DBS orders
   * const newOrders = await sdk.ordersDBS.getNewOrders();
   * const order = newOrders.orders[0];
   *
   * // 2. Get customer contact for delivery coordination
   * const clientInfo = await sdk.ordersDBS.getClientInfo([order.id]);
   * console.log('Deliver to:', clientInfo.orders[0].fullName);
   *
   * // 3. Confirm order (bulk operation)
   * await sdk.ordersDBS.confirmOrdersBulk([order.id]);
   *
   * // 4. Mark as delivered
   * await sdk.ordersDBS.deliverOrdersBulk([order.id]);
   *
   * // 5. Complete handover with verification code
   * await sdk.ordersDBS.receiveOrdersBulk([{ orderId: order.id, code: '1234' }]);
   * ```
   *
   * @example Metadata management for regulated products
   * ```typescript
   * // Add SGTIN marking codes (Честный знак)
   * await sdk.ordersDBS.addOrderMeta(orderId, {
   *   sgtin: { value: ['1234567890123456', '9876543210987654'] }
   * });
   *
   * // Add IMEI for electronics
   * await sdk.ordersDBS.addOrderMeta(orderId, {
   *   imei: { value: 123456789012345 }
   * });
   *
   * // Get order metadata
   * const meta = await sdk.ordersDBS.getOrderMeta(orderId);
   * ```
   */
  public readonly ordersDBS: OrdersDbsModule;

  /**
   * User Management API module
   *
   * Provides access to seller profile user management endpoints:
   * - Create invitations for new users with access settings
   * - List active and invited users with pagination
   * - Update user access rights to seller profile sections
   * - Delete users from seller profile
   *
   * @see {@link UserManagementModule} for available methods
   *
   * @example
   * ```typescript
   * // Get all users
   * const result = await sdk.userManagement.getUsers({ limit: 50, offset: 0 });
   * console.log(result.total);
   *
   * // Invite a new user
   * const invite = await sdk.userManagement.createInvite({
   *   invite: { phoneNumber: '+79991234567', position: 'Manager' },
   *   access: [{ code: 'balance', disabled: false }],
   * });
   * console.log(invite.inviteUrl);
   *
   * // Update user access
   * await sdk.userManagement.updateUserAccess({
   *   usersAccesses: [{
   *     userId: 12345,
   *     access: [{ code: 'finance', disabled: true }],
   *   }],
   * });
   *
   * // Delete a user
   * await sdk.userManagement.deleteUser(12345);
   * ```
   */
  public readonly userManagement: UserManagementModule;

  /**
   * Returns aggregator module (since v3.10.0)
   *
   * Unified return analytics across FBO + FBS + Finance sources:
   * - Fetches FBO returns via `sdk.reports.getAnalyticsGoodsReturn()`
   * - Enriches records with financial amounts from `sdk.finances.getSalesReportsDetailed()`
   * - Partial-failure tolerant: one source failing does not abort the response
   *
   * @see {@link ReturnsModule} for available methods
   *
   * @example
   * ```typescript
   * const result = await sdk.returns.getReturns({
   *   dateFrom: '2026-04-01',
   *   dateTo: '2026-04-30',
   * });
   * console.log(result.data);           // ReturnItem[]
   * console.log(result.partialFailures); // per-source failures
   * console.log(result._meta.sources);  // telemetry
   * ```
   */
  public readonly returns: ReturnsModule;

  /**
   * Initialize the Wildberries SDK with configuration
   *
   * Creates a new SDK instance with the provided configuration.
   * The SDK uses a single shared HTTP client for all API modules to ensure
   * consistent authentication, rate limiting, and error handling.
   *
   * @param config - SDK configuration options
   * @throws {AuthenticationError} If API key is missing or invalid
   *
   * @example
   * ```typescript
   * const sdk = new WildberriesSDK({
   *   apiKey: process.env.WB_API_KEY!,
   *   timeout: 30000,
   *   logLevel: 'info'
   * });
   * ```
   */
  constructor(config: SDKConfig) {
    // Validate API key
    if (!config.apiKey || config.apiKey.trim() === '') {
      throw new AuthenticationError(
        'API key is required. Please provide a valid Wildberries API key in the configuration.',
        401
      );
    }

    // Create shared BaseClient instance
    this.client = new BaseClient(config);

    // Warn about reduced rate limits for Basic/Test tokens
    const tokenType = config.tokenType ?? 'personal';
    if (tokenType === 'basic' || tokenType === 'test') {
      // eslint-disable-next-line no-console -- One-time init warning for token type awareness
      console.warn(
        `[WildberriesSDK] ${tokenType.charAt(0).toUpperCase() + tokenType.slice(1)} token detected. ` +
          'Reduced rate limits apply. Consider upgrading to a Personal or Service token. ' +
          'See https://dev.wildberries.ru/news/281'
      );
    }

    // Initialize General module (Story 1.9 - implemented)
    this.general = new GeneralModule(this.client);

    // Initialize Products module (Stories 2.1-2.4 - implemented)
    this.products = new ProductsModule(this.client);

    // Initialize Orders FBS module (Stories 2.5-2.6 - implemented)
    this.ordersFBS = new OrdersFbsModule(this.client);

    // Initialize Orders FBW module (Story 2.7 - implemented)
    this.ordersFBW = new OrdersFbwModule(this.client);

    // Initialize Finances module (Stories 3.1-3.2 - implemented)
    this.finances = new FinancesModule(this.client);

    // Initialize Analytics module (Stories 3.3-3.4 - implemented)
    this.analytics = new AnalyticsModule(this.client);

    // Initialize Communications module (Stories 3.5-3.6 - implemented)
    this.communications = new CommunicationsModule(this.client);

    // Initialize Reports module (Story 3.7 - implemented)
    this.reports = new ReportsModule(this.client);

    // Initialize Promotion module (Story 4.5 - implemented)
    this.promotion = new PromotionModule(this.client);

    // Initialize Tariffs module (Story 4.5 - implemented)
    this.tariffs = new TariffsModule(this.client);

    // Initialize In-Store Pickup module (Story 4.6 - implemented)
    this.inStorePickup = new InStorePickupModule(this.client);

    // Initialize Orders DBS module (Epic 12 - implemented)
    this.ordersDBS = new OrdersDbsModule(this.client);

    // Initialize User Management module (Story 14.4 - implemented)
    this.userManagement = new UserManagementModule(this.client);

    // Initialize Returns aggregator module (Story 13.2 - implemented)
    // Must be last — depends on this.reports, this.ordersFBS, this.finances
    this.returns = new ReturnsModule(this.client, this.reports, this.ordersFBS, this.finances);
  }
}

// ============================================================================
// Exports
// ============================================================================

/**
 * SDK version
 */
export const version = pkg.version;

// Main SDK class
export { WildberriesSDK as default };

// Configuration types
export type { SDKConfig, RequestOptions } from './config/sdk-config';
export {
  ALL_RATE_LIMITS,
  generalRateLimits,
  productsRateLimits,
  ordersFbsRateLimits,
  ordersFbwRateLimits,
  ordersDbsRateLimits,
  userManagementRateLimits,
  financesRateLimits,
  promotionRateLimits,
  tariffsRateLimits,
  inStorePickupRateLimits,
  analyticsRateLimits,
  communicationsRateLimits,
  reportsRateLimits,
  // Operation metadata (x-readonly-method, x-category from Swagger)
  operationMetadata,
  isOperationReadonly,
  getOperationCategory,
  getOperationRateLimitKey,
  getOperationMetadata,
  getOperationsByCategory,
  getReadonlyOperations,
  getWriteOperations,
} from './config';
export type { RateLimitConfig, EndpointLimits } from './client/rate-limiter';
export type { OperationMetadata } from './config';

// Core infrastructure
export { BaseClient } from './client/base-client';

// API Modules
export { GeneralModule } from './modules/general';
export { ProductsModule, WITH_PHOTO_FILTER } from './modules/products';
export { OrdersFbsModule } from './modules/orders-fbs';
export { OrdersFbwModule } from './modules/orders-fbw';
export { FinancesModule } from './modules/finances';
export { AnalyticsModule } from './modules/analytics';
export { CommunicationsModule, COMMUNICATIONS_LIMITS } from './modules/communications';
export { ReportsModule } from './modules/reports';
export { PromotionModule } from './modules/promotion';
export { TariffsModule } from './modules/tariffs';
export { InStorePickupModule } from './modules/in-store-pickup';
export { OrdersDbsModule } from './modules/orders-dbs';
export { UserManagementModule } from './modules/user-management';

// Type definitions
// NOTE: Types are NOT re-exported from the main entry to avoid name conflicts (Error, Date, etc.)
//
// To import types, use the module subpath import for any module that has one
// (since v3.6.1 — finances, analytics, communications, reports re-export their types):
//   import type { SalesReportDetailedItem } from 'daytona-wildberries-typescript-sdk/finances';
//   import type { MainResponse } from 'daytona-wildberries-typescript-sdk/analytics';
//   import type { PinReviewItem } from 'daytona-wildberries-typescript-sdk/communications';
//   import type { IncomesItem } from 'daytona-wildberries-typescript-sdk/reports';
//
// Modules without subpath exports (products, orders-fbs, orders-fbw, orders-dbs,
// promotion, tariffs, in-store-pickup, general, user-management) currently have no public
// type access path — track via WL-4.

// Orders DBS types (no name conflicts with global types)
export type { MetaValidationDetail } from './types/orders-dbs.types';

// Orders FBS public types (since v3.15.0 — MetaDetail referenced in migration guide Pattern A)
export type {
  MetaDetail,
  OrderMetaResponse,
  OrderMetaItem,
  OrdersMetaResponse,
  APIError,
  APIErrorV2,
} from './types/orders-fbs.types';

// Orders FBW / DBW bulk types (v3.11.0)
export type {
  DBWDeleteMetaBulkRequest,
  DBWDeleteMetaBulkResponse,
  DBWSetSgtinBulkRequest,
  DBWSetMetaBulkResponse,
  DBWBulkStatusChangeResponse,
  DBWStatusSetResponse,
  DBWMetaValidationDetail,
  DBWCheckMetaValidationRequest,
  DBWCheckMetaValidationResponse,
} from './types/orders-fbw.types';
// BulkStatusChangeResponse and StatusSetResponse are re-exported from orders-dbs.types via orders-fbw.types
// Export them here under the DBS canonical path to avoid duplicate export conflicts.
// (They are already available via orders-dbs.types if consumers need them directly.)
// DBW-prefixed aliases (DBWBulkStatusChangeResponse, DBWStatusSetResponse, DBWMetaValidationDetail)
// are exported from orders-fbw.types above for API symmetry.

// Communications types (v3.13.0 — createSellerMessage multipart body)
export type { SellerMessageRequest } from './types/communications.types';

// Products stock management types (v3.12.0 — sku → chrtId migration)
export type {
  StockItem,
  StocksRequest,
  UpdateStockRequest,
  GetStocksResponse,
} from './types/products.types';

// Products card trash management types (v3.13.1 — sandbox-first permanent delete)
export type {
  DeleteCardsFromTrashRequest,
  DeleteCardsFromTrashResponse,
} from './types/products.types';

// User Management types (no name conflicts with global types)
export type {
  AccessCode,
  AccessItem,
  InviteeInfo,
  UserInfo,
  GetUsersResponse,
  GetUsersParams,
  CreateInviteRequest,
  CreateInviteResponse,
  UserAccess,
  UpdateUserAccessRequest,
  UserManagementErrorResponse,
} from './types/user-management.types';

// Error classes
export { WBAPIError } from './errors/base-error';
export { AuthenticationError } from './errors/auth-error';
export { RateLimitError } from './errors/rate-limit-error';
export { ValidationError } from './errors/validation-error';
export { NetworkError } from './errors/network-error';
export {
  CampaignNotFoundError,
  InvalidBidError,
  BudgetExceededError,
  InvalidCampaignStateError,
} from './errors/promotion-errors';
export { BidOutOfRangeError, parseBidOutOfRangeDetail } from './errors/bid-out-of-range-error';
export {
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError,
} from './errors/in-store-pickup-errors';

// FBS marking-code validation error (since 3.15.0)
export { MetaValidationFailError } from './errors/meta-validation-fail-error';

// WB warehouse maintenance error (406 WarehouseStocksUpdateBlock — stocks PUT retryable)
export { WarehouseStocksUpdateBlockError } from './errors/warehouse-stocks-update-block-error';

// Utility functions
export {
  calculateSupplyCost,
  compareTariffs,
  parseMoneyAmount,
  validateRequiredCharacteristics,
  validateMergedCardVariants,
  classifyReturnReason,
  enrichReturnsWithType,
  reconcileBuyoutsAndReturns,
  classifyFbsReturnCategory,
  warnOnce,
  resetDeprecationWarnings,
  parseMetaValidationFail,
  type MetaValidationFailPayload,
  type SupplyCostInput,
  type SupplyCostResult,
  type CompareTariffsInput,
  type TariffComparison,
  type TariffData,
  type TariffDifference,
  type TariffRecommendation,
  type MergedCardVariant,
  type MergedCardValidationResult,
  type ReturnReasonCode,
  type WbReturn,
  type FbsReturnInput,
  type BuyoutInput,
  type ReconciliationAnomaly,
  type ReconciliationResult,
  type ReconcileOptions,
  type FbsStatusEvent,
  validateBid,
  clampBid,
  extractBidRange,
  type BidRange,
  computeROAS,
  type ROASResult,
  type ComputeROASOptions,
} from './utils';

// Returns module types (since v3.10.0 — populated by sdk.returns module in story 13.2)
export type { ReturnItem, ReturnStatus, ReturnCategory } from './types/returns.types';
export { ReturnsModule } from './modules/returns';
export type {
  ReturnsApiRequest,
  ReturnsApiResponse,
  PartialFailure,
  ReturnsMeta,
  ReturnByOrderIdParams,
  ReturnStatsParams,
  ReturnStatsResult,
  ReturnStatsBucket,
} from './types/returns.types';
