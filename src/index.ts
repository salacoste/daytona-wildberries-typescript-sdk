/**
 * Wildberries API TypeScript SDK
 * Main entry point
 *
 * @packageDocumentation
 */

import { BaseClient } from './client/base-client';
import { GeneralModule } from './modules/general';
import { ProductsModule } from './modules/products';
import { OrdersFBSModule } from './modules/orders-fbs';
import { OrdersFBWModule } from './modules/orders-fbw';
import { FinancesModule } from './modules/finances';
import { AnalyticsModule } from './modules/analytics';
import { CommunicationsModule } from './modules/communications';
import { ReportsModule } from './modules/reports';
import { PromotionModule } from './modules/promotion';
import { TariffsModule } from './modules/tariffs';
import { InStorePickupModule } from './modules/in-store-pickup';
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
   * @see {@link OrdersFBSModule} for available methods
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
  public readonly ordersFBS: OrdersFBSModule;

  /**
   * Orders FBW (Fulfillment by Wildberries) API module
   *
   * Provides access to FBW warehouse supply and acceptance endpoints:
   * - Warehouse selection and availability
   * - Acceptance coefficient checking
   * - Supply planning and management
   * - Transit tariff calculation
   *
   * @see {@link OrdersFBWModule} for available methods
   *
   * @example
   * ```typescript
   * // Get available warehouses
   * const warehouses = await sdk.ordersFBW.getWarehouses();
   *
   * // Check acceptance coefficients for next 14 days
   * const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
   *
   * // Get acceptance options for goods
   * const goods = [{ barcode: '1234567891234', quantity: 10 }];
   * const options = await sdk.ordersFBW.getAcceptanceOptions(goods);
   *
   * // Get supply details
   * const details = await sdk.ordersFBW.getSupplyDetails(12345);
   * ```
   */
  public readonly ordersFBW: OrdersFBWModule;

  /**
   * Finances API module
   *
   * Provides access to financial data endpoints:
   * - Balance and transaction retrieval
   * - Financial reports (sales reports by period)
   * - Document management (categories, list, download)
   *
   * @see {@link FinancesModule} for available methods
   *
   * @example
   * ```typescript
   * // Get current balance
   * const balance = await sdk.finances.getBalance();
   * console.log(`Available: ${balance.for_withdraw} ${balance.currency}`);
   *
   * // Get transaction history
   * const transactions = await sdk.finances.getTransactions({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31',
   *   period: 'weekly'
   * });
   *
   * // Download documents
   * const docs = await sdk.finances.getDocuments();
   * ```
   */
  public readonly finances: FinancesModule;

  /**
   * Analytics API module
   *
   * Provides access to analytics and reporting endpoints:
   * - Sales funnel conversion metrics
   * - Product performance tracking
   * - Search query analysis
   * - Category-level analytics
   * - CSV report generation
   *
   * @see {@link AnalyticsModule} for available methods
   *
   * @example
   * ```typescript
   * // Get sales funnel metrics
   * const funnel = await sdk.analytics.getSalesFunnel({
   *   period: {
   *     begin: '2024-01-01 00:00:00',
   *     end: '2024-01-31 23:59:59'
   *   }
   * });
   *
   * // Track product performance
   * const performance = await sdk.analytics.getProductPerformance(
   *   [12345, 67890],
   *   { from: '2024-01-01', to: '2024-01-31' }
   * );
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
   *   placement_types: ['search', 'recommendations']
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

    // Initialize General module (Story 1.9 - implemented)
    this.general = new GeneralModule(this.client);

    // Initialize Products module (Stories 2.1-2.4 - implemented)
    this.products = new ProductsModule(this.client);

    // Initialize Orders FBS module (Stories 2.5-2.6 - implemented)
    this.ordersFBS = new OrdersFBSModule(this.client);

    // Initialize Orders FBW module (Story 2.7 - implemented)
    this.ordersFBW = new OrdersFBWModule(this.client);

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
  }
}

// ============================================================================
// Exports
// ============================================================================

/**
 * SDK version
 */
export const version = '0.1.0';

// Main SDK class
export { WildberriesSDK as default };

// Configuration types
export type { SDKConfig, RequestOptions } from './config/sdk-config';
export {
  ALL_RATE_LIMITS,
  generalRateLimits,
  ordersFBSRateLimits,
  ordersFBWRateLimits,
  promotionRateLimits,
  tariffsRateLimits
} from './config';
export type { RateLimitConfig, EndpointLimits } from './client/rate-limiter';

// Core infrastructure
export { BaseClient } from './client/base-client';

// API Modules
export { GeneralModule } from './modules/general';
export { ProductsModule } from './modules/products';
export { OrdersFBSModule } from './modules/orders-fbs';
export { OrdersFBWModule } from './modules/orders-fbw';
export { FinancesModule } from './modules/finances';
export { AnalyticsModule } from './modules/analytics';
export { CommunicationsModule } from './modules/communications';
export { ReportsModule } from './modules/reports';
export { PromotionModule } from './modules/promotion';
export { TariffsModule } from './modules/tariffs';
export { InStorePickupModule } from './modules/in-store-pickup';

// Type definitions
export * from './types/products.types';
export * from './types/orders-fbs.types';
export * from './types/finances.types';
export * from './types/communications.types';

// Reports types exported explicitly to avoid conflicts with finances types
export type {
  IncomesItem,
  StocksItem,
  OrdersItem,
  SalesItem,
  ExciseReportRequest,
  ExciseReportDataItem,
  ExciseReportResponse,
  WarehouseRemainsParams,
  ReportTaskResponse,
  ReportStatus as ReportsReportStatus, // Renamed to avoid conflict with finances
  ReportType,
  ResponseErrorStatistics,
  ResponseErrorStatistics2,
  ErrorResponse4xx,
} from './types/reports.types';

// Analytics types exported with explicit names to avoid conflicts
export type {
  // Unique analytics types
  ConversionMetrics,
  PeriodStatistics,
  PeriodComparisonDynamics,
  ProductTag,
  ProductObject,
  CardStatistics,
  ProductCardAnalytics,
  ProductStatisticsRequest,
  ProductStatisticsResponse,
  TimeSeriesDataPoint,
  DailyStatistics,
  HistoricalStatisticsRequest,
  ProductCardHistory,
  HistoricalStatisticsResponse,
  GroupedHistory,
  GroupedHistoricalResponse,
  SearchQueryMetrics,
  SearchQueriesResponse,
  CategoryPerformanceMetrics,
  CategoryPerformanceResponse,
  ProductPerformanceMetrics,
  ProductPerformanceResponse,
  // Stock history types (Story 3.4)
  StockChangeReason,
  StockHistoryEntry,
  StockHistoryResponse,
  // CSV export types (Story 3.4)
  AnalyticsReportType,
  CSVFormatOptions,
  CSVExportRequest,
  CSVExportResponse,
  CSVReport,
  CSVReportStatus,
  // Shared types with analytics prefix for disambiguation
  ReportType as AnalyticsReportTypeEnum,
  Period as AnalyticsPeriod,
} from './types/analytics.types';

// FBW types exported with namespace to avoid conflicts with FBS
export type {
  ModelsHandySupplyStatus as FBWSupplyStatus,
  ModelsBox as FBWBox,
  ModelsGoodInBox as FBWGoodInBox,
  ModelsSuppliesFiltersRequest as FBWSupplyFilters,
  ModelsGoodInSupply as FBWGoodInSupply,
  ModelsDateFilterRequest as FBWDateFilter,
  ModelsSupplyDetails as FBWSupplyDetails,
  ModelsSupply as FBWSupply,
  ModelsAcceptanceCoefficient as FBWAcceptanceCoefficient,
  ModelsWarehousesResultItems as FBWWarehouse,
  ModelsGood as FBWGood,
  ModelsOptionsResultModel as FBWAcceptanceOptions,
  ModelsTransitTariff as FBWTransitTariff,
  ModelsVolumeTariff as FBWVolumeTariff,
  ModelsErrorModel as FBWErrorModel
} from './types/orders-fbw.types';

// Promotion and Tariffs types
export * from './types/promotion.types';
export * from './types/tariffs.types';

// In-Store Pickup types (Story 4.6) - Renamed to avoid conflicts with orders-fbs
export type {
  NewOrder as PickupNewOrder,
  NewOrdersResponse as PickupNewOrdersResponse,
  Order as PickupOrder,
  OrdersResponse as PickupOrdersResponse,
  OrderStatus as PickupOrderStatus,
  OrderStatusesResponse as PickupOrderStatusesResponse,
  OrderStatusRequest as PickupOrderStatusRequest,
  OrderClientInfo as PickupOrderClientInfo,
  OrderClientInfoResponse as PickupOrderClientInfoResponse,
  CheckIdentityRequest,
  CheckedIdentity,
  OrderMetadata,
  SGTINRequest,
  UINRequest,
  IMEIRequest,
  GTINRequest,
  APIError as PickupAPIError,
  GetOrdersParams as PickupGetOrdersParams,
} from './types/in-store-pickup.types';

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
  InvalidCampaignStateError
} from './errors/promotion-errors';
export {
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError
} from './errors/in-store-pickup-errors';
